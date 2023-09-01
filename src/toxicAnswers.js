const randomNumber = (length) => {
  return Math.floor(Math.random() * length);
};

const voiceAnswers = () => {
  const answers = [
    "Не заставляй меня больше слушать эту хуйню, прошу",
    "Если я когда нибудь еще раз это услышу, я за себя не отвечаю!",
    "БЛЯТЬ СКОЛЬКО МОЖНО??? ИДИ НА ХУЙ!!!",
  ];

  return answers[randomNumber(answers.length)];
};

const videoAnswers = (duration) => {
  const answers = [
    "Хуйня видос, переделывай",
    "Я не буду на это отвечать, ты совсем конченый если не понимаешь сразу...",
    "Я вижу... Вижу... Вижу что ты тупой уебан который кидает мне рандомные видосы",
    `Ты решил потратить ${duration} секунд моей жизни на это?`,
    "Очень круто, твои родители наверное гордятся тобой. Хотя было бы чем гордиться блять",
  ];

  return answers[randomNumber(answers.length)];
};

const audioAnswers = (title, size, duration) => {
  const answers = [
    "Я даже будучи тупым роботом не стану это слушать, а тебе видимо это нравится",
    "Звучит как понос, кстати как и твое имя",
    "Круто, больше такое не присылай",
    `Звучит интересно, но больше похоже на звук говна. Треки с названием ${title} обычно полное говно. Так он еще и весит ${(
      size / 1_048_576
    ).toFixed(2)} Мб`,
    `Хуйня длительностью ${duration} секунд. Не, это без меня`,
  ];

  return answers[randomNumber(answers.length)];
};

const photoAnswers = () => {
  const answers = [
    "АХХАХА БЛЯ ЧЕ ЭТО",
    "Фотка хуйня, убейся реал говорю",
    "Ты думаешь мне это нравится? Ты ошибаешься",
  ];

  return answers[randomNumber(answers.length)];
};

const videoNoteAnswers = (duration) => {
  const answers = [
    "Бляя иди нахуй пожалуйста со своими кружками",
    "Если там твой ебальник, то убейся реально ну чел...",
    `Cоре, я не выдержу ${duration} секунд этой хуйни`,
  ];

  return answers[randomNumber(answers.length)];
};

const contactAnswers = (name, number) => {
  const answers = [
    "Че за чел? Мне не интересно",
    "МНЕ ПОХУЙ НА НЕГО ИЛИ НЕЕ МНЕ ПОЕБАТЬ ПРОШУ ИДИ НАХУЙ",
    `Что за ${name}? Это твой друг? Я удивлен что у тебя в принципе есть друзья`,
    `Че за левый номер ${number}? Иди нахуй скам какой то`,
  ];

  return answers[randomNumber(answers.length)];
};

const locationAnswers = () => {
  const answers = [
    "Эт ты в какой пизде находишься?...",
    "Ты там живешь? Соболезную...",
    "Я бы сдох там",
    "Ебать, ты вообще где? Че за место похожее на жопу?",
  ];

  return answers[randomNumber(answers.length)];
};

const stickerAnswers = () => {
  const answers = [
    "Стикер говна",
    "Это ты на стике? Похож!👍",
    "Откуда ты это взял бляяяяяя",
  ];

  return answers[randomNumber(answers.length)];
};

module.exports = {
  audioAnswers,
  contactAnswers,
  locationAnswers,
  photoAnswers,
  videoAnswers,
  videoNoteAnswers,
  voiceAnswers,
  stickerAnswers,
};

// if (voice) {
//   return await bot.sendMessage(chatId, voiceAnswers());
// }
// if (photo) {
//   return await bot.sendMessage(chatId, photoAnswers());
// }
// if (video) {
//   return await bot.sendMessage(chatId, videoAnswers(video.duration));
// }
// if (videoNote) {
//   return await bot.sendMessage(chatId, videoNoteAnswers(videoNote.duration));
// }
// if (contact) {
//   return await bot.sendMessage(
//     chatId,
//     contactAnswers(contact.first_name, contact.phone_number),
//   );
// }
// if (audio) {
//   return await bot.sendMessage(
//     chatId,
//     audioAnswers(audio.title, audio.file_size, audio.duration),
//   );
// }
// if (location) {
//   return await bot.sendMessage(chatId, locationAnswers());
// }
// if (sticker) {
//   return await bot.sendAnimation(chatId, stickerAnswers());
// }
