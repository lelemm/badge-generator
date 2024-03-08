"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Box_1 = __importDefault(require("./Box"));
var Config = /** @class */ (function () {
    function Config() {
        this.baseImageFileName = '';
        this.listFileName = '';
        this.userNamePosition = new Box_1.default();
        this.userNameFont = '';
        this.instagramPosition = new Box_1.default();
        this.qrCodePosition = new Box_1.default();
        this.instagramLogoFileName = '';
    }
    return Config;
}());
exports.default = Config;
