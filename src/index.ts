import { config } from "dotenv";
import TelegramBot from "node-telegram-bot-api";

import { States } from "./States";
import { userCommands, adminCommands } from "./commands/commands";

// функции
import { ask, askSend, contacts, menu, order, portfolio, sendOrder, start } from "./answers/answers";
import { findUser } from "./features/findUser";

// Типы
import type { IUserState } from "./interfaces/IUserState";
import { Products } from "./Products";
import { ADMIN_CHAT_ID } from "./consts";
import { checkAllUsers } from "./features/checkAllUsers";
import { unknownCommand } from "./answers/unknownCommand";


// Импорт конфига
const envConfig = config().parsed;
if (!envConfig) {
  throw new Error("Файл .env пустой");
}
const TOKEN = envConfig["TOKEN"];

if (!TOKEN) {
  throw new Error("Ключ в файле .env не найден");
}

// Инициализация бота
const bot = new TelegramBot(TOKEN, { polling: true });
const userStates: IUserState[] = [];

bot.setMyCommands(userCommands);

bot.on("message", async (message) => {
  const chatId = message.chat.id;
  const text = message.text;
  // const audio = message.audio;
  // const video = message.video;
  // const photo = message.photo;
  // const voice = message.voice;
  // const videoNote = message.video_note;
  // const contact = message.contact;
  // const location = message.location;
  // const sticker = message.sticker;
  const userName = message.chat.username || 'Пользователь';
  const firstName = message.chat.first_name || 'Пользователь';

  switch (text) {
    case "/start":
      return await start(chatId, firstName, userStates, bot);

    case "/menu":
      return await menu(chatId, userName, userStates, bot);

    case "/portfolio":
      return await portfolio(chatId, userName, userStates, bot);

    case "/order":
      return await order(chatId, userName, userStates, bot);

    case "/contacts":
      return await contacts(chatId, userName, userStates, bot);

    case "/ask":
      return await ask(chatId, userName, userStates, bot);

    case '/users':
      if(chatId === ADMIN_CHAT_ID){
        return await checkAllUsers(userStates, bot);
      } else {
        return await unknownCommand(chatId, bot);
      }

    default:
      const user = findUser(chatId, userStates);

      if (user && text && userStates[user.userIndex].state === States.Ask) {
        return await askSend(chatId, userName, text, userStates, bot);
      } else {
        return await unknownCommand(chatId, bot);
      }
  }
});


bot.on("callback_query", async (message) => {
  const data = message.data;
  const chatId = message.message?.chat.id;
  const userName = message.message?.chat.username || 'Пользователь';
  const firstName = message.message?.chat.first_name || 'Пользователь';

  if(chatId && userName){

    switch (data) {
      case "/start":
        return await start(chatId, firstName, userStates, bot);
  
      case "/menu":
        return await menu(chatId, userName, userStates, bot);
  
      case "/portfolio":
        return await portfolio(chatId, userName, userStates, bot);
  
      case "/order":
        return await order(chatId, userName, userStates, bot);
  
      case "/contacts":
        return await contacts(chatId, userName, userStates, bot);
  
      case "/ask":
        return await ask(chatId, userName, userStates, bot);
  
      case "#design":
        return await sendOrder(userName, chatId, Products.Design, userStates, bot);
  
      case "#website":
        return await sendOrder(userName, chatId, Products.WebSite, userStates, bot);
  
      case "#chat-bot":
        return await sendOrder(userName, chatId, Products.ChatBot, userStates, bot);
  
      case "#design+site":
        return await sendOrder(userName, chatId, Products.DesignAndSite, userStates, bot);
  
      default:
        return await unknownCommand(chatId, bot);
    }
  }

});
