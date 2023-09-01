import { config } from "dotenv";
import { CallbackQuery, Message } from "node-telegram-bot-api";

const TelegramBot = require("node-telegram-bot-api");

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
if(!envConfig) {
  throw new Error('Файл .env пустой');
}
const TOKEN = envConfig['TOKEN']

if(!TOKEN){
  throw new Error('Ключ в файле .env не найден');
}

// Инициализация бота
const bot = new TelegramBot(TOKEN, { polling: true });

// admin username
const ADMIN_USERNAME = "ker4ik13";
const ADMIN_CHAT_ID = 785206267;

// Команды
const commadns = bot.setMyCommands([
  { command: "/start", description: "Старт" },
  { command: "/menu", description: "Меню" },
  { command: "/info", description: "Информация о обо мне" },
  { command: "/portfolio", description: "Портфолио" },
  { command: "/ask", description: "Задать вопрос" },
  { command: "/contacts", description: "Контакты" },
]);

// Menu
const menuKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "Портфолио", callback_data: "/portfolio" },
        { text: "Контакты", callback_data: "/contacts" },
      ],
      [
        { text: "Задать вопрос", callback_data: "/ask" },
        { text: "Сделать заказ", callback_data: "/order" },
      ],
      [{ text: "Информация обо мне", callback_data: "/info" }],
    ],
  },
};

const portfolioKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Dixie Palms", url: "https://dixie-palms.vercel.app/" }],
      [{ text: "Назад", callback_data: "/menu" }],
    ],
  },
};

// Клавиатура для заказа
const orderKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "Дизайн сайта", callback_data: "#design" },
        { text: "Разработка сайта", callback_data: "#website" },
      ],
      [
        { text: "Разработа чат-бота", callback_data: "#chat-bot" },
        { text: "Дизайн + сайт", callback_data: "#design+site" },
      ],
    ],
  },
};

const start = async (chatId: number, name: string) => {
  const returnText = `Привет ${name}, рад видеть тебя в моем уголке разработки! Я - Кирилл, Frontend разработчик. С моей помощью ты сможешь ознакомиться с моими проектами, удобно оформить заказ или задать любой вопрос. Давай вместе создадим что-то интересное и полезное! 🚀\nМожешь пользоваться кнопками для удобной навигации.`;
  return await bot.sendMessage(chatId, returnText, menuKeyboard);
};

const info = async (chatId: number, userName: string) => {
  return await bot.sendMessage(
    chatId,
    "брат, надо бы доработать команду /info",
    menuKeyboard,
  );
};

// const spam = async (chatId) => {
//   const dimaId = "dsabdas";
//   try {
//     await bot.sendMessage(dimaId, "Дима лох бля жиес");
//     return await bot.sendMessage(
//       chatId,
//       `Сообщение пользователю ${dimaId} отправлено`,
//     );
//   } catch (error) {
//     console.log(error);
//     return await bot.sendMessage(
//       chatId,
//       `Произошла ошибка. Сообщение пользователю ${dimaId} не отправлено. Ошибка: ${error}`,
//     );
//   }
// };

const order = async (chatId: number) => {
  return await bot.sendMessage(
    chatId,
    "Какой продукт вы хотите заказать?",
    orderKeyboard,
  );
};

const sendOrder = async (userName: string, chatId: number, product: string) => {
  const result = `Пользователь @${userName} сделал новый заказ! Подробности заказа:\n\n<b>Пользователь:</b> @${userName}\n<b>Чат id:</b> ${chatId}\n<b>Продукт:</b> ${product}`;
  await bot.sendMessage(ADMIN_CHAT_ID, result, { parse_mode: "HTML" });
};

bot.on("message", async (message: Message) => {
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
  const userName = message.chat.username;
  const firstName = message.chat.first_name;

  switch (text) {
    case "/start":
      return start(chatId, firstName);

    case "/menu":
      return await bot.sendMessage(chatId, "Меню", menuKeyboard);

    case "/portfolio":
      return await bot.sendMessage(chatId, "Портфолио", portfolioKeyboard);

    case "/info":
      return info(chatId, userName);

    case "/order":
      return order(chatId);

    default:
      return start(chatId, userName);
  }
});

bot.on("callback_query", async (message: CallbackQuery) => {
  const data = message.data;
  const chatId = message.message?.chat.id;
  const userName = message.message?.chat.username;
  const firstName = message.message?.chat.first_name;

  switch (data) {
    case "/start":
      return start(chatId, firstName);

    case "/menu":
      return await bot.sendMessage(chatId, "Меню", menuKeyboard);

    case "/portfolio":
      return await bot.sendMessage(chatId, "Портфолио", portfolioKeyboard);

    case "/info":
      return info(chatId, userName);

    case "/order":
      return order(chatId);

    case "#design":
      await sendOrder(userName, chatId, "Дизайн");
      return await bot.sendMessage(
        chatId,
        "Заявка успешно отправлена. Напишите @ker4ik13 по поводу заказа, либо ждите сообщение.",
      );

    case "#website":
      await sendOrder(userName, chatId, "Веб-сайт");
      return await bot.sendMessage(
        chatId,
        "Заявка успешно отправлена. Напишите @ker4ik13 по поводу заказа, либо ждите сообщение.",
      );

    case "#chat-bot":
      await sendOrder(userName, chatId, "Чат-бот");
      return await bot.sendMessage(
        chatId,
        "Заявка успешно отправлена. Напишите @ker4ik13 по поводу заказа, либо ждите сообщение.",
      );

    case "#design+site":
      await sendOrder(userName, chatId, "Дизайн + сайт");
      return await bot.sendMessage(
        chatId,
        "Заявка успешно отправлена. Напишите @ker4ik13 по поводу заказа, либо ждите сообщение.",
      );

    default:
      return start(chatId, userName);
  }
});
