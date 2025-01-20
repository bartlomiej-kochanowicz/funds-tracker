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
exports.CurrenciesService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let CurrenciesService = class CurrenciesService {
    constructor(httpService, config) {
        this.httpService = httpService;
        this.config = config;
    }
    async timeseries(base, currencies) {
        return await Promise.all(currencies.map(currency => this.getHistoricalPriceFull(this.createSymbol(base, currency))));
    }
    createSymbol(base, currency) {
        return `${base.toUpperCase()}${currency.toLocaleUpperCase()}`;
    }
    async getHistoricalPriceFull(symbol) {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService
            .get(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}`, {
            params: {
                apikey: this.config.get("FINANCIAL_MODELING_API_KEY"),
            },
        })
            .pipe((0, rxjs_1.catchError)(e => {
            console.error(e);
            throw Error("Error fetching currency timeseries");
        })));
        return data.historical;
    }
};
exports.CurrenciesService = CurrenciesService;
exports.CurrenciesService = CurrenciesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], CurrenciesService);
//# sourceMappingURL=currencies.service.js.map