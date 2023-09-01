import { DotenvParseOutput, config } from "dotenv";
import { IConfigService } from "./config.interface";

export class ConfigService implements IConfigService {
    private config:DotenvParseOutput;

    constructor() {
        const {error, parsed} = config();
        if(error) {
            throw new Error("Файл .env не найден");
        }
        if(!parsed) {
            throw new Error("Файл .env пустой");
        }
        this.config = parsed;
    }

    get(key: string): string {
       const result = this.config[key];

       if(!result) {
        throw new Error('Нет такого ключа')
       }
       return result;
    }
}