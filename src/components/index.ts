import { SlashCreator } from '../shim/creator';
import { MessageComponentCallback } from '../types';

import playClassicComponent from './play-classic';

export enum ComponentKeys {
  PLAY_CLASSIC = 'play-classic'
}

export const components: Record<string, MessageComponentCallback> = {
  [ComponentKeys.PLAY_CLASSIC]: playClassicComponent
};

export function registerComponents(creator: SlashCreator) {
  for (const [key, listener] of Object.entries(components)) {
    creator.registerGlobalComponent(key, async (ctx) => {
      const res = await listener(ctx);

      if (res) {
        if ('ephemeral' in res) {
          await ctx.send(res);
        }

        await ctx.editParent(res);
      }
    });
  }
}
