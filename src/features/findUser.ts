import type { ChatId } from "node-telegram-bot-api";
import type { IUserState } from "../interfaces/IUserState";

export const findUser = (chatId: ChatId, userStates: IUserState[]) => {
  let user;
  let index: any = "not found";
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