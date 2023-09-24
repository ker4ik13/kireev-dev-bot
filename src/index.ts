import { config } from "dotenv";
import TelegramBot from "node-telegram-bot-api";

// Клавиатуры
import { menuKeyboard, portfolioKeyboard, askKeyboard, orderKeyboard, contactsKeyboard } from "./keyboards";

import type { IUserState } from "./userState";
import { States } from "./states";

// Варианты ответов
// const {
//   voiceAnswers,
//   videoAnswers,
//   audioAnswers,
//   contactAnswers,
//   locationAnswers,
//   photoAnswers,
//   videoNoteAnswers,
//   stickerAnswers,
// } = require("./src/toxicAnswers");

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

// admin username
const ADMIN_USERNAME = "ker4ik13";
const ADMIN_CHAT_ID = 785206267;

// Команды
const commands = bot.setMyCommands([
  { command: "/menu", description: "Меню" },
  { command: "/portfolio", description: "Портфолио" },
  { command: "/ask", description: "Задать вопрос" },
  { command: "/contacts", description: "Контакты" },
]);

let userStates: IUserState[] = [];

const findUser = (chatId: number) => {
  let user;
  let index: any = "not found";
  for (let i = 0; i < userStates.length; i++) {
    if (userStates[i].chatId === chatId) {
      user = userStates[i].chatId;
      index = i;
      break;
    }
  }
  if (user) {
    return {
      userChatId: chatId,
      userIndex: index,
    };
  } else {
    return false;
  }
};

const setUserState = (chatId: number, state: States) => {
  const user = findUser(chatId);

  if (user) {
    for (let i = 0; i < userStates.length; i++) {
      if (userStates[i].chatId === chatId) {
        userStates[i].state = state;
      }
    }
  } else {
    userStates.push({
      chatId: chatId,
      state: state,
    });
  }
  console.log(userStates);
  
};

const start = async (chatId: number, name: string) => {
  setUserState(chatId, States.Menu);

  const returnText = `Привет ${name}, рад видеть тебя в моем уголке разработки! Я - Кирилл, Frontend разработчик. С моей помощью ты сможешь ознакомиться с моими проектами, удобно оформить заказ или задать любой вопрос. Давай вместе создадим что-то интересное и полезное! 🚀\nМожешь пользоваться кнопками для удобной навигации.`;
  return await bot.sendMessage(chatId, returnText, menuKeyboard);
};

const menu = async (chatId: number) => {
  setUserState(chatId, States.Menu);

  return await bot.sendMessage(chatId, "Меню", menuKeyboard);
};

const order = async (chatId: number) => {
  setUserState(chatId, States.Order);

  return await bot.sendMessage(
    chatId,
    "Какой продукт вы хотите заказать?",
    orderKeyboard,
  );
};

const sendOrder = async (userName: string, chatId: number, product: string) => {
  const result = `Пользователь @${userName} сделал новый заказ! Подробности заказа:\n\n<b>Пользователь:</b> @${userName}\n<b>Чат id:</b> ${chatId}\n<b>Продукт:</b> ${product}`;

  setUserState(chatId, States.Menu);

  return await bot.sendMessage(ADMIN_CHAT_ID, result, { parse_mode: "HTML" });
};

const contacts = async (chatId: number) => {
  setUserState(chatId, States.Contacts);

  return await bot.sendMessage(
    chatId,
    "Мои контакты. Жду сообщения",
    contactsKeyboard,
  );
};

const portfolio = async (chatId: number) => {
  setUserState(chatId, States.Portfolio);

  return await bot.sendMessage(chatId, "Портфолио", portfolioKeyboard);
};

const ask = async (chatId: number) => {
  setUserState(chatId, States.Ask);

  return await bot.sendMessage(
    chatId,
    "Задайте любой интересующий вас вопрос и я свяжусь с вами позже",
    askKeyboard,
  );
};

const askSend = async (chatId: number, userName: string, userMessage: string) => {
  setUserState(chatId, States.Menu);

  const message = `Пользователь @${userName} задал вопрос:\n\n"${userMessage}"`;

  await bot.sendMessage(ADMIN_CHAT_ID, message);

  return await bot.sendMessage(
    chatId,
    "Ваше сообщение отправлено. Спасибо за вопрос, ожидайте ответа.",
    menuKeyboard,
  );
};

bot.on("message", async (message) => {
  const chatId = message.chat.id;
  const text = message.text;
  const audio = message.audio;
  const video = message.video;
  const photo = message.photo;
  const voice = message.voice;
  const videoNote = message.video_note;
  const contact = message.contact;
  const location = message.location;
  const sticker = message.sticker;
  const userName = message.chat.username || 'Пользователь';
  const firstName = message.chat.first_name || 'Пользователь';

  switch (text) {
    case "/start":
      return await start(chatId, firstName);

    case "/menu":
      return await menu(chatId);

    case "/portfolio":
      return await portfolio(chatId);

    case "/order":
      return await order(chatId);

    case "/contacts":
      return await contacts(chatId);

    case "/ask":
      return await ask(chatId);

    default:
      const user = findUser(chatId);

      if (user && userStates[user.userIndex].state === States.Ask && text) {
        return await askSend(chatId, userName, text);
      } else {
        return await menu(chatId);
      }
  }
});

bot.on("callback_query", async (message) => {
  const data = message.data;
  const chatId = message.message?.chat.id;
  const userName = message.message?.chat.username;
  const firstName = message.message?.chat.first_name || 'Пользователь';

  if(chatId && userName){

    switch (data) {
      case "/start":
        return await start(chatId, firstName);
  
      case "/menu":
        return await menu(chatId);
  
      case "/portfolio":
        return await portfolio(chatId);
  
      case "/order":
        return await order(chatId);
  
      case "/contacts":
        return await contacts(chatId);
  
      case "/ask":
        return await ask(chatId);
  
      case "#design":
        await sendOrder(userName, chatId, "Дизайн");
        return await bot.sendMessage(
          chatId,
          "Заявка успешно отправлена. Напишите @ker4ik13 по поводу заказа, либо ждите сообщение.",
          menuKeyboard,
        );
  
      case "#website":
        await sendOrder(userName, chatId, "Веб-сайт");
        return await bot.sendMessage(
          chatId,
          "Заявка успешно отправлена. Напишите @ker4ik13 по поводу заказа, либо ждите сообщение.",
          menuKeyboard,
        );
  
      case "#chat-bot":
        await sendOrder(userName, chatId, "Чат-бот");
        return await bot.sendMessage(
          chatId,
          "Заявка успешно отправлена. Напишите @ker4ik13 по поводу заказа, либо ждите сообщение.",
          menuKeyboard,
        );
  
      case "#design+site":
        await sendOrder(userName, chatId, "Дизайн + сайт");
        return await bot.sendMessage(
          chatId,
          "Заявка успешно отправлена. Напишите @ker4ik13 по поводу заказа, либо ждите сообщение.",
          menuKeyboard,
        );
  
      default:
        return await start(chatId, userName);
    }
  }

});
