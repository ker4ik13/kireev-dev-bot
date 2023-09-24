// Меню клавиатура
export const menuKeyboard = {
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

// Портфолио клавиатура
export const portfolioKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Dixie Palms", url: "https://dixie-palms.vercel.app/" }],
      [{ text: "Назад", callback_data: "/menu" }],
    ],
  },
};

// Клавиатура для заказа
export const orderKeyboard = {
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

// Клавиатура контакты
export const contactsKeyboard = {
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

// Клавиатура для вопроса
export const askKeyboard = {
  reply_markup: {
    inline_keyboard: [[{ text: "Назад", callback_data: "/menu" }]],
  },
};

// module.exports = {
//   menuKeyboard,
//   portfolioKeyboard,
//   orderKeyboard,
//   contactsKeyboard,
//   askKeyboard,
// };
