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
exports.Publication = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("./user");
const image_1 = require("./image");
const reaction_1 = require("./reaction");
const temoignage_1 = require("./temoignage");
const notification_1 = require("./notification");
let Publication = class Publication extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Publication.prototype, "pub_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Publication.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(30),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Publication.prototype, "titre", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(30),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Publication.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: true,
    }),
    __metadata("design:type", String)
], Publication.prototype, "entreprise", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Date)
], Publication.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Publication.prototype, "zone", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_1.User),
    __metadata("design:type", user_1.User)
], Publication.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => image_1.Image),
    __metadata("design:type", Array)
], Publication.prototype, "images", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => reaction_1.Reaction),
    __metadata("design:type", reaction_1.Reaction)
], Publication.prototype, "reaction", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => temoignage_1.Temoignage),
    __metadata("design:type", temoignage_1.Temoignage)
], Publication.prototype, "temoignage", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => notification_1.Notification),
    __metadata("design:type", notification_1.Notification)
], Publication.prototype, "notification", void 0);
Publication = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "publication",
        timestamps: false,
    })
], Publication);
exports.Publication = Publication;
