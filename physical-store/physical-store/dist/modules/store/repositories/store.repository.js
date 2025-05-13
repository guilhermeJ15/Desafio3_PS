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
exports.StoreRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const store_schema_1 = require("../schemas/store.schema");
let StoreRepository = class StoreRepository {
    storeModel;
    constructor(storeModel) {
        this.storeModel = storeModel;
    }
    async create(data) {
        return this.storeModel.create(data);
    }
    async findAll() {
        return this.storeModel.find().exec();
    }
    async findById(id) {
        return this.storeModel.findById(id).exec();
    }
    async findByState(state) {
        return this.storeModel.find({ state }).exec();
    }
    async update(id, data) {
        return this.storeModel
            .findByIdAndUpdate(id, data, { new: true })
            .exec();
    }
    async delete(id) {
        return this.storeModel.findByIdAndDelete(id).exec();
    }
    async findAllFiltered(type, limit = 10, offset = 0) {
        const query = {};
        if (type)
            query.type = type;
        return this.storeModel.find(query).skip(offset).limit(limit);
    }
    async findByStateFiltered(state, type, limit = 10, offset = 0) {
        const query = { state };
        if (type)
            query.type = type;
        return this.storeModel.find(query).skip(offset).limit(limit);
    }
};
exports.StoreRepository = StoreRepository;
exports.StoreRepository = StoreRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(store_schema_1.Store.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], StoreRepository);
//# sourceMappingURL=store.repository.js.map