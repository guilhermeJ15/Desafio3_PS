"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MelhorEnvioService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let MelhorEnvioService = class MelhorEnvioService {
    token = process.env.MELHOR_ENVIO_API_TOKEN;
    apiUrl = process.env.MELHOR_ENVIO_API_URL;
    async getFreight(originCep, destinationCep) {
        const body = {
            from: { postal_code: originCep },
            to: { postal_code: destinationCep },
            products: [
                {
                    width: 11,
                    height: 17,
                    length: 20,
                    weight: 0.3,
                    quantity: 1,
                },
            ],
            services: [],
            options: {
                own_hand: false,
                receipt: false,
                insurance_value: 0,
            },
        };
        const headers = {
            Authorization: this.token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        const response = await axios_1.default.post(`${this.apiUrl}/calculator`, body, { headers });
        return response.data;
    }
};
exports.MelhorEnvioService = MelhorEnvioService;
exports.MelhorEnvioService = MelhorEnvioService = __decorate([
    (0, common_1.Injectable)()
], MelhorEnvioService);
//# sourceMappingURL=melhor-envio.service.js.map