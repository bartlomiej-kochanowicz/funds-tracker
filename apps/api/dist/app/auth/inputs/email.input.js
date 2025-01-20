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
exports.EmailInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const graphql_scalars_1 = require("graphql-scalars");
let EmailInput = class EmailInput {
};
exports.EmailInput = EmailInput;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, graphql_1.Field)(() => graphql_scalars_1.EmailAddressResolver),
    __metadata("design:type", String)
], EmailInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], EmailInput.prototype, "token", void 0);
exports.EmailInput = EmailInput = __decorate([
    (0, graphql_1.InputType)()
], EmailInput);
//# sourceMappingURL=email.input.js.map