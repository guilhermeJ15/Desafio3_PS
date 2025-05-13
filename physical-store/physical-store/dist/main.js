"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
const log_cleaner_1 = require("./core/utils/log-cleaner");
dotenv.config();
async function bootstrap() {
    (0, log_cleaner_1.cleanOldLogs)(4);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Physical Store API')
        .setDescription('API para localização de lojas físicas e cálculo de entrega')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
    console.log(` Server rodando em http://localhost:${PORT}`);
    console.log(` Swagger disponível em http://localhost:${PORT}/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map