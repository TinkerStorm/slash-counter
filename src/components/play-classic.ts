import { ComponentActionRow, ComponentButton, ComponentContext, ComponentType } from 'slash-create';
import { CounterState } from '../types';

export default async (ctx: ComponentContext) => {
  // get counter options from embed description
  const [embed] = ctx.message.embeds;

  const state: CounterState = JSON.parse(embed.description.slice(7, -3));

  if (!embed.fields) {
    return { content: `Invalid counter options`, ephemeral: true };
  }

  // get time left from embed field
  const [timeLeftField] = embed.fields!;
  const endTime = parseInt(timeLeftField.value!.slice(3, -3));

  if (endTime <= Date.now() / 1000) {
    // Assemble debug information
    const [component] = (ctx.message.components![0] as ComponentActionRow).components! as ComponentButton[];

    component.disabled = true;

    embed.fields[0] = {
      name: 'Ended at',
      value: `<t:${Math.round(Date.now() / 1000)}>`
    };

    return {
      embeds: [embed],
      components: [
        {
          type: ComponentType.ACTION_ROW,
          components: [component]
        }
      ]
    };
  }

  // update counter options
  embed.fields![0].value = `<t:${~~(ctx.invokedAt / 1000) + state.duration}:R>`;

  state.count = (state.count ?? 0) + 1;

  embed.description = ['```json', JSON.stringify(state, null, 2), '```'].join('\n');

  return {
    embeds: [embed]
  };
};
