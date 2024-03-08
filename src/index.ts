import Jimp from "jimp";
import { configReader } from "./helpers/ConfigReader"
const fs   = require('fs');
const QRLogo = require('qr-with-logo');
var sanitize = require("sanitize-filename");

var doc = configReader.getDoc()

// function makeIteratorThatFillsWithColor(color: any) {
//     return function (x:any, y:any, offset:any) {
//         baseImage.bitmap.data.writeUInt32BE(color, offset);
//     }
// };

var file: string =  fs.readFileSync('./arquivo.csv').toString();
var lines = file.split("\r\n");


for(var i: number = 0; i < lines.length; i++) {
    if(lines[i].split(',').length >= 2) {
        QRLogo.generateQRWithLogo(`https://instagram.com/${lines[i].split(',')[1]}`, doc.instagramLogoFileName, {}, "Base64", `qrlogo${lines[i].split(',')[0]}.png`, doIt(lines[i]));
    }
}

function doIt(line: string) {
    return function(b64: any) {
    let buffer = Buffer.from(b64, 'base64');
    Jimp.read(buffer).then(imageQRCode => {
        imageQRCode.resize(doc.qrCodePosition.w, doc.qrCodePosition.h);
        var baseImage: Jimp;
        Jimp.read(doc.baseImageFileName)
        .then(function (image: any) {
            baseImage = image;
            return Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
        })
        .then(function (font: any) {
            baseImage.print(font, doc.userNamePosition.x, 
                doc.userNamePosition.y, 
                {text: line.split(',')[0]},//,alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER}, 
                doc.userNamePosition.w, 
                doc.userNamePosition.h)
                .composite(imageQRCode, doc.qrCodePosition.x, doc.qrCodePosition.y)
                .print(font, doc.instagramPosition.x, 
                    doc.instagramPosition.y, 
                    {text: '@'+line.split(',')[1]},//,alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER}, 
                    doc.instagramPosition.w, 
                    doc.instagramPosition.h)
                                    .write(sanitize(`${line.split(',')[1]}.png`));
            })
            .catch(function (err) {
                console.error(err);
            });
    });
    };
}