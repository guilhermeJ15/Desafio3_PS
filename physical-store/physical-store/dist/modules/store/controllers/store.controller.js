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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const store_service_1 = require("../services/store.service");
const create_store_dto_1 = require("../../../core/model/store/dto/create-store.dto");
const update_store_dto_1 = require("../../../core/model/store/dto/update-store.dto");
let StoreController = class StoreController {
    storeService;
    constructor(storeService) {
        this.storeService = storeService;
    }
    findAll() {
        return this.storeService.findAll();
    }
    getByStateFiltered(uf, type, limit = 10, offset = 0) {
        return this.storeService.findByStateFiltered(uf, type, Number(limit), Number(offset));
    }
    findById(id) {
        return this.storeService.findById(id);
    }
    async findNearestByCep(cep) {
        return this.storeService.findNearestByCep(cep);
    }
    create(dto) {
        return this.storeService.create(dto);
    }
    update(id, dto) {
        return this.storeService.update(id, dto);
    }
    remove(id) {
        return this.storeService.remove(id);
    }
};
exports.StoreController = StoreController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todas as lojas' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('state/:uf'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar lojas por estado com filtros e paginação' }),
    __param(0, (0, common_1.Param)('uf')),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "getByStateFiltered", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar loja por ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('nearest/:cep'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar apenas a loja mais próxima pelo CEP' }),
    __param(0, (0, common_1.Param)('cep')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "findNearestByCep", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar nova loja' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Loja criada com sucesso.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_store_dto_1.CreateStoreDto]),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar loja existente' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Loja atualizada com sucesso.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_store_dto_1.UpdateStoreDto]),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Remover loja por ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "remove", null);
exports.StoreController = StoreController = __decorate([
    (0, swagger_1.ApiTags)('store'),
    (0, common_1.Controller)('store'),
    __metadata("design:paramtypes", [store_service_1.StoreService])
], StoreController);
//# sourceMappingURL=store.controller.js.map