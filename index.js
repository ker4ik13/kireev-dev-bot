const TelegramBot = require("node-telegram-bot-api");
const {
  voiceAnswers,
  videoAnswers,
  audioAnswers,
  contactAnswers,
  locationAnswers,
  photoAnswers,
  videoNoteAnswers,
  stickerAnswers,
} = require("./toxicAnswers");

const TOKEN = "6307435960:AAEs7bPrD0Gd_O72xcfw71uPhCn5L-pDYio";

const bot = new TelegramBot(TOKEN, { polling: true });
const commadns = bot.setMyCommands([
  { command: "/start", description: "Старт" },
  { command: "/info", description: "Информация о пользователе" },
  { command: "/order", description: "Отправить заявку" },
  { command: "/spam", description: "Спамить диману" },
]);

const inlineKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "Старт", callback_data: "/start" },
        {
          text: "Информация",
          //   callback_data: "/info",
          web_app: { url: "https://google.com" },
        },
      ],
      [
        { text: "Заказать продукт", callback_data: "/order" },
        { text: "Спам диману", callback_data: "/spam" },
      ],
    ],
  },
};
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

const start = async (chatId, userName) => {
  return await bot.sendMessage(
    chatId,
    `Привет ${userName}, это мой тестовый бот. Я его разрабатываю первый раз и тестирую на разные возможности. Вот список возможных комманд!`,
    inlineKeyboard,
  );
};

const info = async (chatId, userName) => {
  return await bot.sendMessage(
    chatId,
    `Информация о пользователе:
      Имя: ${userName}`,
  );
};

const spam = async (chatId) => {
  const dimaId = "dsabdas";
  try {
    await bot.sendMessage(dimaId, "Дима лох бля жиес");
    return await bot.sendMessage(
      chatId,
      `Сообщение пользователю ${dimaId} отправлено`,
    );
  } catch (error) {
    console.log(error);
    return await bot.sendMessage(
      chatId,
      `Произошла ошибка. Сообщение пользователю ${dimaId} не отправлено. Ошибка: ${error}`,
    );
  }
};

const order = async (chatId) => {
  return await bot.sendMessage(
    chatId,
    "Какой продукт вы хотите заказать?",
    orderKeyboard,
  );
};

const adminChatId = 785206267;

const sendOrder = async (userName, chatId, product) => {
  const result = `Пользователь @${userName} сделал новый заказ! Подробности заказа:\n\n<b>Пользователь:</b> @${userName}\n<b>Чат id:</b> ${chatId}\n<b>Продукт:</b> ${product}`;
  await bot.sendMessage(adminChatId, result, { parse_mode: "HTML" });
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

  if (voice) {
    return await bot.sendMessage(chatId, voiceAnswers());
  }
  if (photo) {
    return await bot.sendMessage(chatId, photoAnswers());
  }
  if (video) {
    return await bot.sendMessage(chatId, videoAnswers(video.duration));
  }
  if (videoNote) {
    return await bot.sendMessage(chatId, videoNoteAnswers(videoNote.duration));
  }
  if (contact) {
    return await bot.sendMessage(
      chatId,
      contactAnswers(contact.first_name, contact.phone_number),
    );
  }
  if (audio) {
    return await bot.sendMessage(
      chatId,
      audioAnswers(audio.title, audio.file_size, audio.duration),
    );
  }
  if (location) {
    return await bot.sendMessage(chatId, locationAnswers());
  }
  if (sticker) {
    return await bot.sendAnimation(chatId, stickerAnswers());
  }

  switch (text) {
    case "/start":
      return start(chatId, userName);

    case "/info":
      return info(chatId, userName);

    case "/order":
      return order(chatId);

    case "/spam":
      return spam(chatId);

    default:
      return start(chatId, userName);
  }
});

bot.on("callback_query", async (message) => {
  const data = message.data;
  const chatId = message.message.chat.id;
  const userName = message.message.chat.username;
  switch (data) {
    case "/start":
      return start(chatId, userName);

    case "/info":
      return info(chatId, userName);

    case "/order":
      return order(chatId);

    case "/spam":
      return spam(chatId);

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
