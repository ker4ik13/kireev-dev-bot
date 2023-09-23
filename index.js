const { config } = require("dotenv");

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
const commadns = bot.setMyCommands([
  { command: "/menu", description: "Меню" },
  { command: "/portfolio", description: "Портфолио" },
  { command: "/ask", description: "Задать вопрос" },
  { command: "/contacts", description: "Контакты" },
]);

const states = {
  menu: "menu",
  portfolio: "portfolio",
  contacts: "contacts",
  ask: "ask",
  order: "order",
};

const userState = {
  chatId: "",
  state: states.menu,
};

let userStates = [];

const findUser = (chatId) => {
  let user = "";
  let index = "not found";
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

const setUserState = (chatId, state) => {
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
  console.log(user);
  console.log(userStates);
};

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

const contactsKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "VK", url: "https://vk.com/random_4el" },
        { text: "TG", url: "https://t.me/ker4ik13" },
        { text: "TG Channel", url: "https://t.me/kireev_dev" },
      ],
      [
        { text: "GitHub", url: "https://github.com/ker4ik13" },
        { text: "Twitter", url: "https://twitter.com/kireev_dev" },
      ],
      [{ text: "Назад", callback_data: "/menu" }],
    ],
  },
};

const askKeyboard = {
  reply_markup: {
    inline_keyboard: [[{ text: "Назад", callback_data: "/menu" }]],
  },
};

const start = async (chatId, name) => {
  setUserState(chatId, states.menu);

  const returnText = `Привет ${name}, рад видеть тебя в моем уголке разработки! Я - Кирилл, Frontend разработчик. С моей помощью ты сможешь ознакомиться с моими проектами, удобно оформить заказ или задать любой вопрос. Давай вместе создадим что-то интересное и полезное! 🚀\nМожешь пользоваться кнопками для удобной навигации.`;
  state = states.menu;
  return await bot.sendMessage(chatId, returnText, menuKeyboard);
};

const menu = async (chatId) => {
  setUserState(chatId, states.menu);

  return await bot.sendMessage(chatId, "Меню", menuKeyboard);
};

const order = async (chatId) => {
  setUserState(chatId, states.order);

  return await bot.sendMessage(
    chatId,
    "Какой продукт вы хотите заказать?",
    orderKeyboard,
  );
};

const sendOrder = async (userName, chatId, product) => {
  const result = `Пользователь @${userName} сделал новый заказ! Подробности заказа:\n\n<b>Пользователь:</b> @${userName}\n<b>Чат id:</b> ${chatId}\n<b>Продукт:</b> ${product}`;

  setUserState(chatId, states.menu);

  return await bot.sendMessage(ADMIN_CHAT_ID, result, { parse_mode: "HTML" });
};

const contacts = async (chatId) => {
  setUserState(chatId, states.contacts);

  return await bot.sendMessage(
    chatId,
    "Мои контакты. Жду сообщения",
    contactsKeyboard,
  );
};

const portfolio = async (chatId) => {
  setUserState(chatId, states.portfolio);

  return await bot.sendMessage(chatId, "Портфолио", portfolioKeyboard);
};

const ask = async (chatId) => {
  setUserState(chatId, states.ask);

  // return await bot.sendMessage(
  //   chatId,
  //   "Команда /ask временно не работает",
  //   menuKeyboard,
  // );

  return await bot.sendMessage(
    chatId,
    "Задайте любой интересующий вас вопрос и я свяжусь с вами позже",
    askKeyboard,
  );
};

const askSend = async (chatId, userName, userMessage) => {
  setUserState(chatId, states.menu);

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
  const userName = message.chat.username;
  const firstName = message.chat.first_name;

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

      if (user && userStates[user.userIndex].state === states.ask) {
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
  const firstName = message.message?.chat.first_name;

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
});
