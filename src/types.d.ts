import { ComponentContext } from 'slash-create';

// secrets: wrangler secret put <name>
declare const DISCORD_APP_ID: string;
declare const DISCORD_PUBLIC_KEY: string;
declare const DISCORD_BOT_TOKEN: string;
declare const DEVELOPMENT_GUILD_ID: string;

// mode
export interface CounterOptions {
  duration: number;
}

export interface CounterState extends CounterOptions {
  count: number;
}

export type MessageComponentCallback<T = any> = (ctx: ComponentContext) => Promise<T> | T;
