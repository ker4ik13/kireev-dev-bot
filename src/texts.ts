import type { ChatId } from "node-telegram-bot-api";
import { Products } from "./Products";

export enum Texts {
    OrderHasBeenSend = 'Заявка успешно отправлена. Напишите @ker4ik13 по поводу заказа, либо ждите сообщение.',
    MessageHasBeenSend = 'Ваше сообщение отправлено. Спасибо за вопрос, ожидайте ответа.',
    AskAnyQuestion = 'Задайте любой интересующий вас вопрос и я свяжусь с вами позже.',
}

export const greeting = (name: string) => {
    return `Привет ${name}, рад видеть тебя в моем уголке разработки! Я - Кирилл, Frontend разработчик. С моей помощью ты сможешь ознакомиться с моими проектами, удобно оформить заказ или задать любой вопрос. Давай вместе создадим что-то интересное и полезное! 🚀\nМожешь пользоваться кнопками для удобной навигации.`;
}

export const newOrder = (userName: string, chatId: ChatId, product: Products) => {
    return `Пользователь @${userName} сделал новый заказ! Подробности заказа:\n\n<b>Пользователь:</b> @${userName}\n<b>Чат id:</b> ${chatId}\n<b>Продукт:</b> ${product}`;
}