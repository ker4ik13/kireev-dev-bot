import { States } from "../States";
import { findUser } from "./findUser";
import type { IUserState } from "../interfaces/IUserState";
import type { ChatId } from "node-telegram-bot-api";

export const setUserState = (chatId: ChatId, state: States, userStates: IUserState[], userName: string) => {
  const user = findUser(chatId, userStates);

  if (user) {
    for (let i = 0; i < userStates.length; i++) {
      if (userStates[i].chatId === chatId) {
        userStates[i].state = state;
      }
    }
  } else {
    userStates.push({
      chatId: chatId,
      userName: userName,
      state: state,
    });
  }
};