import type { ChatId } from "node-telegram-bot-api";
import { States } from "../States";

export interface IUserState {
  chatId: ChatId,
  userName: string,
  state: States,
}