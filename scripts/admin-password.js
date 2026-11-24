/* 生成站内内容管理入口的密码哈希：node scripts/admin-password.js 你的密码 */
import crypto from "node:crypto";

const password = process.argv.slice(2).join(" ");
if (!password) {
	console.error("用法: node scripts/admin-password.js 你的新密码");
	process.exit(1);
}
const hash = crypto.createHash("sha256").update(password, "utf8").digest("hex");
console.log(hash);
console.log("把上面的哈希填入 src/config/adminConfig.ts 的 passwordHash，然后重新部署。");
