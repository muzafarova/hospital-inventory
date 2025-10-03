import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";

import BasePagination from "./BasePagination.vue";

const meta: Meta<typeof BasePagination> = {
  component: BasePagination,
  render: (args) => ({
    setup() {
      const offset = ref(0);
      return { args, offset };
    },
    components: { BasePagination },
    template: `<form class="flex flex-col gap-4">
                <BasePagination v-bind="args" :offset="offset" @update:offset="val => offset = val" />
                <output :value="'offset: ' + offset" class="block px-2 font-mono" />
            </form>`,
  }),
  args: { "onUpdate:offset": fn() },
};
export default meta;

type Story = StoryObj<typeof BasePagination>;

export const Endless: Story = {
  parameters: {
    docs: {
      description: {
        story: "Endless pagination to use when total-count is unknown.",
      },
    },
  },
  args: {
    count: 100,
    limit: 100,
  },
};

export const Finite: Story = {
  parameters: {
    docs: {
      description: {
        story: "Finite pagination to use when total-count is known.",
      },
    },
  },
  args: {
    count: 100,
    limit: 100,
    total: 2001,
  },
};
