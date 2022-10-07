// - No component listeners
// - Counter state is to be maintained within the message itself

import {
  ButtonStyle,
  CommandContext,
  CommandOptionType,
  ComponentType,
  MessageEmbedOptions,
  MessageOptions,
  SlashCommand,
  SlashCreator
} from 'slash-create';
import { CounterOptions } from '../types';

export default class CounterCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'counter',
      description: 'A simple counter',
      options: [
        {
          name: 'duration',
          description: 'The duration of the counter in seconds. (Default: 30, Min: 5)',
          type: CommandOptionType.INTEGER,
          required: false,
          min_value: 5
        }
      ],
      requiredPermissions: ['SEND_MESSAGES']
    });
  }

  async run(ctx: CommandContext): Promise<MessageOptions> {
    const counterOptions: CounterOptions = {
      duration: ctx.options.duration ?? 30
    };

    const embed: MessageEmbedOptions = {
      title: 'Counter',
      description: ['```json', JSON.stringify(counterOptions, null, 2), '```'].join('\n'),
      fields: [
        {
          name: 'Time left',
          value: `<t:${Math.round(ctx.invokedAt / 1000) + counterOptions.duration}:R>`
        }
      ]
    };

    return {
      embeds: [embed],
      components: [
        {
          type: ComponentType.ACTION_ROW,
          components: [
            {
              type: ComponentType.BUTTON,
              custom_id: `play-classic`,
              label: '',
              emoji: {
                name: '▶'
              },
              style: ButtonStyle.PRIMARY
            }
          ]
        }
      ]
    };
  }
}
