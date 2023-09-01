import TelegramBot = require('node-telegram-bot-api');
import { ConfigService } from './config.service';
import {IConfigService} from './config.interface';


class Bot {
    bot: TelegramBot;

    constructor(private readonly configService: IConfigService){
        this.bot = new TelegramBot(this.configService.get('TOKEN'));
    }

    init(){
        console.log('Bot has been init');
    }
}

const bot = new Bot(new ConfigService());

bot.init();