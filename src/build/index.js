"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jimp_1 = __importDefault(require("jimp"));
var ConfigReader_1 = require("./helpers/ConfigReader");
var fs = require('fs');
var doc = ConfigReader_1.configReader.getDoc();
var baseImage;
jimp_1.default.read(doc.baseImageFileName)
    .then(function (image) {
    baseImage = image;
    return jimp_1.default.loadFont(jimp_1.default.FONT_SANS_16_BLACK);
})
    .then(function (font) {
    baseImage.print(font, doc.userNamePosition.x, doc.userNamePosition.y, { text: "OI MUNDO", alignmentX: jimp_1.default.HORIZONTAL_ALIGN_CENTER }, doc.userNamePosition.w, doc.userNamePosition.h)
        .write("teste.png");
})
    .catch(function (err) {
    console.error(err);
});
