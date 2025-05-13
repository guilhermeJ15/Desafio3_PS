"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const store_controller_1 = require("./controllers/store.controller");
const store_service_1 = require("./services/store.service");
const store_repository_1 = require("./repositories/store.repository");
const store_schema_1 = require("./schemas/store.schema");
const viacep_service_1 = require("../../core/services/viacep.service");
const google_maps_service_1 = require("../../core/services/google-maps.service");
const melhor_envio_service_1 = require("../../core/services/melhor-envio.service");
let StoreModule = class StoreModule {
};
exports.StoreModule = StoreModule;
exports.StoreModule = StoreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: store_schema_1.Store.name, schema: store_schema_1.StoreSchema }]),
        ],
        controllers: [store_controller_1.StoreController],
        providers: [
            store_service_1.StoreService,
            store_repository_1.StoreRepository,
            viacep_service_1.ViaCepService,
            google_maps_service_1.GoogleMapsService,
            melhor_envio_service_1.MelhorEnvioService,
        ],
    })
], StoreModule);
//# sourceMappingURL=store.module.js.map