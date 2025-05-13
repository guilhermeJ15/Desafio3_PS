"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleMapsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let GoogleMapsService = class GoogleMapsService {
    apiKey = process.env.GOOGLE_MAPS_API_KEY;
    async getCoordinatesFromAddress(address) {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`;
        const response = await axios_1.default.get(url);
        const location = response.data.results[0]?.geometry.location;
        if (!location) {
            throw new Error('Não foi possível obter coordenadas do endereço.');
        }
        return {
            lat: location.lat,
            lng: location.lng,
        };
    }
    async calculateDistance(origin, destination) {
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${this.apiKey}`;
        const response = await axios_1.default.get(url);
        const element = response.data.rows[0]?.elements[0];
        if (!element || element.status !== 'OK') {
            throw new Error('Não foi possível calcular a distância.');
        }
        return element.distance.value / 1000;
    }
};
exports.GoogleMapsService = GoogleMapsService;
exports.GoogleMapsService = GoogleMapsService = __decorate([
    (0, common_1.Injectable)()
], GoogleMapsService);
//# sourceMappingURL=google-maps.service.js.map