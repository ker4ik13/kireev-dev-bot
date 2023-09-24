import type TelegramBot from "node-telegram-bot-api";
import type { ChatId } from "node-telegram-bot-api";
import type { Products } from "../Products";
import type { IUserState } from "../interfaces/IUserState";
import { States } from "../States";
import { setUserState } from "../features/setUserState";
import { Texts, greeting, newOrder } from "../texts";
import { askKeyboard, contactsKeyboard, menuKeyboard, orderKeyboard, portfolioKeyboard } from "../keyboards";
import { ADMIN_CHAT_ID } from "../consts";

export const start = async (chatId: ChatId, name: string, userStates: IUserState[], bot: TelegramBot) => {
  setUserState(chatId, States.Menu, userStates, name);

  const returnText = greeting(name);
  return await bot.sendMessage(chatId, returnText, menuKeyboard);
};

export const menu = async (chatId: ChatId, userName: string, userStates: IUserState[], bot: TelegramBot) => {
  setUserState(chatId, States.Menu, userStates, userName);

  return await bot.sendMessage(chatId, "Меню", menuKeyboard);
};

export const order = async (chatId: ChatId, userName: string, userStates: IUserState[], bot: TelegramBot) => {
  setUserState(chatId, States.Order, userStates, userName);

  return await bot.sendMessage(
    chatId,
    "Какой продукт вы хотите заказать?",
    orderKeyboard,
  );
};

export const sendOrder = async (userName: string, chatId: ChatId, product: Products, userStates: IUserState[], bot: TelegramBot) => {
  const result = newOrder(userName, chatId, product)

  setUserState(chatId, States.Menu, userStates, userName);

  await bot.sendMessage(ADMIN_CHAT_ID, result, { parse_mode: "HTML" });
  return await bot.sendMessage(
    chatId,
    Texts.OrderHasBeenSend,
    menuKeyboard,
  );
};

export const contacts = async (chatId: ChatId, userName: string, userStates: IUserState[], bot: TelegramBot) => {
  setUserState(chatId, States.Contacts, userStates, userName);

  return await bot.sendMessage(
    chatId,
    "Мои контакты. Жду сообщения",
    contactsKeyboard,
  );
};

export const portfolio = async (chatId: ChatId, userName: string, userStates: IUserState[], bot: TelegramBot) => {
  setUserState(chatId, States.Portfolio, userStates, userName);

  return await bot.sendMessage(chatId, "Портфолио", portfolioKeyboard);
};

export const ask = async (chatId: number, userName: string, userStates: IUserState[], bot: TelegramBot) => {
  setUserState(chatId, States.Ask, userStates, userName);

  return await bot.sendMessage(
    chatId,
    Texts.AskAnyQuestion,
    askKeyboard,
  );
};

export const askSend = async (chatId: ChatId, userName: string, userMessage: string, userStates: IUserState[], bot: TelegramBot) => {
  setUserState(chatId, States.Menu, userStates, userName);

  const message = `Пользователь @${userName} задал вопрос:\n\n"${userMessage}"`;

  await bot.sendMessage(ADMIN_CHAT_ID, message);

  return await bot.sendMessage(
    chatId,
    Texts.MessageHasBeenSend,
    menuKeyboard,
  );
};