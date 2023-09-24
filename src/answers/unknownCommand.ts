import type { ChatId } from "node-telegram-bot-api";
import type TelegramBot from "node-telegram-bot-api";
import { menuKeyboard } from "../keyboards";

export const unknownCommand = async (chatId: ChatId, bot: TelegramBot) => {
    return await bot.sendMessage(chatId, 'Неизвестная команда, вот список всех команд:', menuKeyboard);
}