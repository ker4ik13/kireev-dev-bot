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
]);

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
      return await bot.sendMessage(
        chatId,
        `Привет ${userName}, это мой тестовый бот. Я его разрабатываю первый раз и тестирую на разные возможности. Посмотри список возможных комманд!`,
      );
    case "/info":
      return await bot.sendMessage(
        chatId,
        `Информация о пользователе:
      Имя: ${userName}`,
      );
    default:
      return await bot.sendMessage(
        chatId,
        "Я тебя не понимаю, ты говоришь хуйню какую-то",
      );
  }
});
