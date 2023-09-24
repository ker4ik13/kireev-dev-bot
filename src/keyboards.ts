import type { SendMessageOptions } from "node-telegram-bot-api";
import { MenuButtons } from "./buttons/MenuButtons";
import { ProductsButtons } from "./buttons/ProductsButtons";
import { ContactsButton } from "./buttons/ContactsButtons";
import { ProjectsButtons } from "./buttons/ProjectsButtons";

// Меню клавиатура
export const menuKeyboard: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [
        MenuButtons.PortfolioButton,
        MenuButtons.ContactsButton,
      ],
      [
        MenuButtons.AskButton,
        MenuButtons.OrderButton,
      ],
    ],
  },
};

// Портфолио клавиатура
export const portfolioKeyboard: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [ProjectsButtons.DixiePalms],
      [MenuButtons.BackButton],
    ],
  },
};

// Клавиатура для заказа
export const orderKeyboard: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [
        ProductsButtons.DesignButton,
        ProductsButtons.SiteButton,
      ],
      [
        ProductsButtons.ChatBotButton,
        ProductsButtons.SiteAndDesignButton,
      ],
      [MenuButtons.BackButton],
    ],
  },
};

// Клавиатура контакты
export const contactsKeyboard: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [
        ContactsButton.VkButton,
        ContactsButton.TgButton,
        ContactsButton.TgGroupButton,
      ],
      [
        ContactsButton.GithubButton,
        ContactsButton.TwitterButton,
      ],
      [MenuButtons.BackButton],
    ],
  },
};

// Клавиатура для вопроса
export const askKeyboard: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [[MenuButtons.BackButton]],
  },
};