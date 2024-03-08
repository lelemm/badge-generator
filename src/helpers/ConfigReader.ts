import { exit } from "process";
import chalk from "chalk";
import boxen from "boxen";
import Config from "../models/Config";

const yaml = require('js-yaml');
const fs   = require('fs');

class ConfigReader {
    private doc?: Config;
    private lastReadTime: number;

    constructor() {
        this.lastReadTime = 0;
    }

    readYmlFile(): Config {
        if(!fs.existsSync('./config.yml')) {
            console.log("config.yml not found!");
            exit(-1);
        }
        if(this.doc == null || this.lastReadTime == 0 || (new Date().getTime() - this.lastReadTime) > 1000)
        {
            try {
                this.doc = yaml.load(fs.readFileSync('./config.yml', 'utf8'));
                this.lastReadTime = new Date().getTime();

                return this.doc || new Config();
            } catch (e) {
                console.log(e);
                return new Config();
            }
        } else if(this.doc != null) {
            return this.doc;
        }

        return new Config();
    }

    getDoc(): Config {
        return this.readYmlFile();
    }
}

export const configReader = new ConfigReader();