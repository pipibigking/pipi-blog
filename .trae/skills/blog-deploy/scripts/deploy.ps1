$ErrorActionPreference = "Continue"
$temp          = [System.IO.Path]::GetTempPath()
$localRepo     = "d:\GitHub开源\个人展示\二次元化个人博客开发"
$buildDir      = Join-Path $temp "pipi-blog-build"
$ffmpeg        = "D:\aamyWeb\myblog\tools\node_modules\ffmpeg-static\ffmpeg.exe"
$siteId        = "37lizvnkarogphg61vo"
$siteDomain    = "pipihome.traesite.cn"
$pluginRoot    = (Get-ChildItem "C:\Users\280738\.trae-cn\plugins\trae-remote-official\deployment" -Directory | Sort-Object Name -Descending | Select-Object -First 1).FullName
$deployCli     = Join-Path $pluginRoot "skills\deployment\bin\win32-x64\trae-deploy.exe"
$prepareScript = Join-Path $pluginRoot "skills\deployment\scripts\prepare-static-function.mjs"

if (Test-Path $buildDir) { Remove-Item $buildDir -Recurse -Force }
New-Item -ItemType Directory -Path $buildDir | Out-Null

$fetched = $false
for ($i = 0; $i -lt 3; $i++) {
    git -C $localRepo fetch origin main --depth 1 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) { $fetched = $true; break }
    Start-Sleep -Seconds 2
}
if (-not $fetched) { Write-Output "WARN fetch failed, using cached origin/main" }
$tar = Join-Path $temp "pipi-src.tar"
Remove-Item $tar -Force -ErrorAction SilentlyContinue
git -C $localRepo archive --format=tar origin/main -o $tar
if (-not (Test-Path $tar)) { throw "git archive failed" }
tar -xf $tar -C $buildDir
Remove-Item $tar -Force -ErrorAction SilentlyContinue
if (-not (Test-Path (Join-Path $buildDir "package.json"))) { throw "archive extraction failed" }

Set-Location $buildDir
npx --yes pnpm@9.14.4 install --frozen-lockfile --node-linker=hoisted 2>&1 | Out-Null

New-Item -ItemType Directory -Path (Join-Path $buildDir ".astro\fonts") -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $buildDir "node_modules\.astro") -Force | Out-Null
robocopy (Join-Path $localRepo ".astro\fonts")     (Join-Path $buildDir ".astro\fonts")     /E /NFL /NDL /NJH /NJS /NP | Out-Null
robocopy (Join-Path $localRepo "node_modules\.astro") (Join-Path $buildDir "node_modules\.astro") /E /NFL /NDL /NJH /NJS /NP | Out-Null

npx --yes pnpm@9.14.4 run build 2>&1 | Out-Null
if (-not (Test-Path (Join-Path $buildDir "dist\index.html"))) { throw "astro build failed" }

$src = Join-Path $temp ("trae-deploy-" + [guid]::NewGuid().ToString("N"))
$pub = Join-Path $src "public"
New-Item -ItemType Directory -Path $pub | Out-Null
robocopy (Join-Path $buildDir "dist") $pub /E /XD (Join-Path $buildDir "dist\assets\videos") (Join-Path $buildDir "dist\assets\music") /NFL /NDL /NJH /NJS /NP | Out-Null
New-Item -ItemType Directory -Path (Join-Path $pub "assets\videos") -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $pub "assets\music") -Force | Out-Null

Get-ChildItem (Join-Path $buildDir "dist\assets\videos") -Filter *.mp4 | ForEach-Object {
    & $ffmpeg -hide_banner -loglevel error -y -i $_.FullName -vf "scale='min(1920,iw)':-2" -c:v libx264 -preset faster -crf 26 -c:a aac -b:a 96k -movflags +faststart (Join-Path $pub ("assets\videos\" + $_.Name))
}
Get-ChildItem (Join-Path $buildDir "dist\assets\music") -Filter *.mp3 | ForEach-Object {
    & $ffmpeg -hide_banner -loglevel error -y -i $_.FullName -c:a libmp3lame -b:a 128k (Join-Path $pub ("assets\music\" + $_.Name))
}

$commit = git -C $localRepo log -1 --format="%h %s" origin/main
$mb = [math]::Round((((Get-ChildItem $pub -Recurse -File | Measure-Object Length -Sum).Sum) / 1MB), 2)

$rewriteScript = Join-Path $PSScriptRoot "rewrite-assets.mjs"
node $rewriteScript $src
if ($LASTEXITCODE -ne 0) { throw "asset rewrite failed" }

$adapt = node $prepareScript --source-dir $src | ConvertFrom-Json
if (-not $adapt.ok) { throw "prepare-static-function failed: $($adapt.error.message)" }

$create = & $deployCli deployments create `
    --site-id $siteId `
    --title "部署: $commit" `
    --description "Redeploy from main commit $commit; built from clean git archive; media compressed only in deployment copy." `
    --type function-web `
    --source-dir $adapt.data.source_dir `
    --execution-config $adapt.data.execution_config `
    --app-tags 267,167 | ConvertFrom-Json
if (-not $create.ok) { throw "deployment create failed" }
$depId = $create.data.deployment_id

& $deployCli deployments wait --deployment-id $depId | Out-Null

Remove-Item $buildDir -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item $src -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item $adapt.data.source_dir -Recurse -Force -ErrorAction SilentlyContinue

Write-Output "DEPLOY_OK id=$depId commit=$commit sizeMB=$mb url=https://$siteDomain"
