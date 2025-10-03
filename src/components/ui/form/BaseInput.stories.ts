import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import BaseInput from "./BaseInput.vue";

// Type for component props including HTML input attributes
type BaseInputProps = InstanceType<typeof BaseInput>["$props"] & {
  placeholder?: string;
  [key: string]: string | boolean | number | undefined;
};

const meta: Meta<typeof BaseInput> = {
  component: BaseInput,
  parameters: {
    docs: {
      description: {
        component:
          "A flexible input wrapper component that provides consistent styling and behavior for form inputs.\n\n**Features:**\n- ✅ supports initial value \n- ✅ accessibility compliant \n- ✅ supports `required` attribute\n- 🚧 supports common [HTML input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types) \n- 🚧 HTML5 input validation",
      },
    },
    a11y: {
      test: "error",
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "number", "password", "url", "date"],
      defaultValue: "text",
    },
    modelValue: {
      control: "text",
      defaultValue: "",
    },
    label: {
      control: "text",
      defaultValue: "Label",
    },
    id: {
      control: "text",
      defaultValue: "input-id",
    },
    required: {
      control: "boolean",
      defaultValue: false,
    },
    // Event handlers for Storybook actions
    "onUpdate:modelValue": {
      action: "update:modelValue",
    },
  },
  args: {
    "onUpdate:modelValue": fn(),
    label: "Label",
    id: "input-default",
  },
};

export default meta;
type Story = StoryObj<Meta<BaseInputProps>>;

export const Default: Story = {
  args: {
    id: "input-default",
    placeholder: "Enter text...",
  },
};

export const Required: Story = {
  args: {
    id: "input-required",
    required: true,
    placeholder: "This field is required",
  },
};

export const Prefilled: Story = {
  args: {
    id: "input-prefilled",
    label: "Label",
    required: true,
    modelValue: "initial value",
  },
};

export const Email: Story = {
  args: {
    id: "input-type-email",
    type: "email",
    modelValue: "test@example.com",
    label: "Email",
    placeholder: "Enter your email",
  },
};

export const Number: Story = {
  args: {
    id: "input-type-number",
    type: "number",
    modelValue: "123",
    label: "Number",
    placeholder: "Enter a number",
  },
};

export const Password: Story = {
  args: {
    id: "input-type-password",
    type: "password",
    modelValue: "password",
    label: "Password",
    placeholder: "Enter your password",
  },
};

export const Url: Story = {
  args: {
    id: "input-type-url",
    type: "url",
    modelValue: "https://example.com",
    label: "URL",
    placeholder: "Enter a URL",
  },
};
