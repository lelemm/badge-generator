"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configReader = void 0;
var process_1 = require("process");
var Config_1 = __importDefault(require("../models/Config"));
var yaml = require('js-yaml');
var fs = require('fs');
var ConfigReader = /** @class */ (function () {
    function ConfigReader() {
        this.lastReadTime = 0;
    }
    ConfigReader.prototype.readYmlFile = function () {
        if (!fs.existsSync('./config.yml')) {
            console.log("config.yml not found!");
            (0, process_1.exit)(-1);
        }
        if (this.doc == null || this.lastReadTime == 0 || (new Date().getTime() - this.lastReadTime) > 1000) {
            try {
                this.doc = yaml.load(fs.readFileSync('./config.yml', 'utf8'));
                this.lastReadTime = new Date().getTime();
                return this.doc || new Config_1.default();
            }
            catch (e) {
                console.log(e);
                return new Config_1.default();
            }
        }
        else if (this.doc != null) {
            return this.doc;
        }
        return new Config_1.default();
    };
    ConfigReader.prototype.getDoc = function () {
        return this.readYmlFile();
    };
    return ConfigReader;
}());
exports.configReader = new ConfigReader();
