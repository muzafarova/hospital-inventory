import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import BaseSelect from "./BaseSelect.vue";

// Type for component props including HTML input attributes
type BaseSelectProps = InstanceType<typeof BaseSelect>["$props"] & {
  disabled?: boolean;
  [key: string]: string | boolean | number | undefined;
};

const meta = {
  component: BaseSelect,
  parameters: {
    docs: {
      description: {
        component:
          "A flexible select wrapper component that provides consistent styling and behavior for form single-selects.\n\n**Features:**\n- ✅ supports initial value \n- ✅ accessibility compliant \n- ✅ supports `disabled` attribute \n- ✅ supports `required` attribute \n- ✅ HTML validation \n- 🚧 JS validation",
      },
    },
    a11y: {
      test: "error",
    },
  },
  args: {
    "onUpdate:modelValue": fn(),
    label: "Label",
    options: ["Option 1", "Option 2", "Option 3"],
  },
} satisfies Meta<typeof BaseSelect>;

export default meta;
type Story = StoryObj<Meta<BaseSelectProps>>;

export const Default: Story = {
  args: {
    id: "select-default",
  },
};

export const Required: Story = {
  args: {
    id: "select-required",
    required: true,
  },
};

export const Prefilled: Story = {
  args: {
    id: "select-prefilled",
    modelValue: "Option 2",
  },
};

export const Disabled: Story = {
  args: {
    id: "select-disabled",
    disabled: true,
  },
};

export const NoOptions: Story = {
  args: {
    id: "select-no-options",
  },
};
