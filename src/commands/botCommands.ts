import type { BotCommand } from "node-telegram-bot-api"

export const userCommands: BotCommand[] = [
    { command: "/menu", description: "Меню" },
    { command: "/portfolio", description: "Портфолио" },
    { command: "/ask", description: "Задать вопрос" },
    { command: "/contacts", description: "Контакты" },
]

export const adminCommands: BotCommand[] = [
    { command: "/menu", description: "Меню" },
    { command: "/portfolio", description: "Портфолио" },
    { command: "/ask", description: "Задать вопрос" },
    { command: "/contacts", description: "Контакты" },
    { command: "/users", description: "Список пользователей" },
]