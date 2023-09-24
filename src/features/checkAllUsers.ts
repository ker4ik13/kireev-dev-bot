import type TelegramBot from "node-telegram-bot-api";
import type { IUserState } from "../interfaces/IUserState";
import { ADMIN_CHAT_ID } from "../consts";

export const checkAllUsers = async  (userStates: IUserState[], bot: TelegramBot) => {
    let allUsers: string = '';

    for(let i = 0; i < userStates.length; i++){
        allUsers += `Пользователь: @${userStates[i].userName}, chatId: ${userStates[i].chatId}.\n`;
    }

    const allUsersText = `<b>Все пользователи:</b>\n\n${allUsers}`;
    return await bot.sendMessage(ADMIN_CHAT_ID, allUsersText, {parse_mode: "HTML"});
}