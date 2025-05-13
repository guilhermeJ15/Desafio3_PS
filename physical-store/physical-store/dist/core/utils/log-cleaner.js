"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanOldLogs = cleanOldLogs;
const fs = require("fs");
const path = require("path");
function cleanOldLogs(daysToKeep = 4) {
    const logDir = path.resolve(__dirname, '../../../logs');
    if (!fs.existsSync(logDir))
        return;
    const files = fs.readdirSync(logDir);
    const now = Date.now();
    const maxAge = daysToKeep * 24 * 60 * 60 * 1000;
    for (const file of files) {
        const filePath = path.join(logDir, file);
        const stats = fs.statSync(filePath);
        const age = now - stats.mtimeMs;
        if (age > maxAge) {
            fs.unlinkSync(filePath);
            console.log(`🧹 Log apagado: ${file}`);
        }
    }
}
//# sourceMappingURL=log-cleaner.js.map