"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreService = void 0;
const common_1 = require("@nestjs/common");
const store_repository_1 = require("../repositories/store.repository");
const viacep_service_1 = require("../../../core/services/viacep.service");
const google_maps_service_1 = require("../../../core/services/google-maps.service");
const melhor_envio_service_1 = require("../../../core/services/melhor-envio.service");
let StoreService = class StoreService {
    repo;
    viaCep;
    maps;
    melhor;
    constructor(repo, viaCep, maps, melhor) {
        this.repo = repo;
        this.viaCep = viaCep;
        this.maps = maps;
        this.melhor = melhor;
    }
    async create(dto) {
        return this.repo.create(dto);
    }
    async findAll() {
        return this.repo.findAll();
    }
    async findById(id) {
        const store = await this.repo.findById(id);
        if (!store)
            throw new common_1.NotFoundException('Loja não encontrada');
        return store;
    }
    async findByState(uf) {
        return this.repo.findByState(uf.toUpperCase());
    }
    async findNearestByCep(cep) {
        const cepInfo = await this.viaCep.getAddressByCep(cep);
        const origin = `${cepInfo.logradouro}, ${cepInfo.localidade} - ${cepInfo.uf}`;
        const stores = await this.repo.findAll();
        let nearest = null;
        for (const store of stores) {
            const dest = `${store.address1}, ${store.city} - ${store.state}`;
            const distance = await this.maps.calculateDistance(origin, dest);
            if (!nearest || distance < nearest.distance) {
                nearest = { store, distance };
            }
        }
        if (!nearest)
            throw new common_1.NotFoundException('Nenhuma loja encontrada');
        const store = nearest.store;
        let fretes = [];
        if (nearest.distance <= 50 && store.type === 'PDV') {
            fretes.push({
                prazo: `${store.shippingTimeInDays} dias úteis`,
                price: 'R$ 15,00',
                description: 'Motoboy',
            });
        }
        else {
            const melhor = await this.melhor.getFreight(store.postalCode, cep);
            fretes = melhor.map(f => ({
                prazo: `${f.delivery_time} dias úteis`,
                price: `R$ ${f.price}`,
                description: f.name,
                codProdutoAgencia: f.id,
            }));
        }
        return {
            name: store.storeName,
            city: store.city,
            postalCode: store.postalCode,
            type: store.type,
            distance: `${nearest.distance.toFixed(2)} km`,
            value: fretes,
        };
    }
    async update(id, dto) {
        const updated = await this.repo.update(id, dto);
        if (!updated)
            throw new common_1.NotFoundException('Loja não encontrada');
        return updated;
    }
    async remove(id) {
        const deleted = await this.repo.delete(id);
        if (!deleted)
            throw new common_1.NotFoundException('Loja não encontrada');
        return { deleted: true };
    }
    async findAllFiltered(type, limit = 10, offset = 0) {
        return this.repo.findAllFiltered(type, limit, offset);
    }
    async findByStateFiltered(uf, type, limit = 10, offset = 0) {
        return this.repo.findByStateFiltered(uf.toUpperCase(), type, limit, offset);
    }
};
exports.StoreService = StoreService;
exports.StoreService = StoreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [store_repository_1.StoreRepository,
        viacep_service_1.ViaCepService,
        google_maps_service_1.GoogleMapsService,
        melhor_envio_service_1.MelhorEnvioService])
], StoreService);
//# sourceMappingURL=store.service.js.map