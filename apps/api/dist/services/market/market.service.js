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
exports.MarketService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const format_date_1 = require("../../utils/format-date");
const date_fns_1 = require("date-fns");
let MarketService = class MarketService {
    constructor(httpService, config) {
        this.httpService = httpService;
        this.config = config;
    }
    async getMarketInstrumentSearch(query) {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService
            .get("https://financialmodelingprep.com/api/v3/search", {
            params: {
                apikey: this.config.get("FINANCIAL_MODELING_API_KEY"),
                query,
            },
        })
            .pipe((0, rxjs_1.catchError)(e => {
            console.error(e);
            throw Error("Error fetching search instruments.");
        })));
        return data;
    }
    async getInstrumentBaseInfo(symbol) {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService
            .get(`https://financialmodelingprep.com/api/v3/search/${symbol.toUpperCase()}`, {
            params: {
                apikey: this.config.get("FINANCIAL_MODELING_API_KEY"),
            },
        })
            .pipe((0, rxjs_1.catchError)(() => {
            return (0, rxjs_1.of)(null);
        })));
        return (data?.find(({ symbol: currentSymbol }) => currentSymbol.toUpperCase() === currentSymbol.toUpperCase()) || null);
    }
    async getMarketInstrumentHistory({ symbol, from, to = new Date(), }) {
        if ((0, date_fns_1.isBefore)(to, from)) {
            throw new Error('"from" date must be before "to" date');
        }
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService
            .get(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}`, {
            params: {
                apikey: this.config.get("FINANCIAL_MODELING_API_KEY"),
                from: (0, format_date_1.formatDate)(from),
                to: (0, format_date_1.formatDate)(to),
            },
        })
            .pipe((0, rxjs_1.catchError)(e => {
            console.error(e);
            throw Error("Error fetching market instrument history");
        })));
        return data.historical;
    }
};
exports.MarketService = MarketService;
exports.MarketService = MarketService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], MarketService);
//# sourceMappingURL=market.service.js.map