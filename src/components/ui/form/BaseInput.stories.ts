import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn, within, expect, userEvent } from "storybook/test";

import BaseInput from "./BaseInput.vue";

// Type for component props including HTML input attributes
type BaseInputProps = InstanceType<typeof BaseInput>["$props"] & {
  placeholder?: string;
  disabled?: boolean;
  [key: string]: string | boolean | number | undefined;
};

const meta: Meta<typeof BaseInput> = {
  component: BaseInput,
  parameters: {
    docs: {
      description: {
        component:
          "A flexible input wrapper component that provides consistent styling and behavior for form inputs.\n\n**Features:**\n- ✅ supports initial value \n- ✅ accessibility compliant \n- ✅ supports `required` attribute\n- ✅ supports `disabled` attribute \n- ✅ HTML validation \n- 🚧 JS validation \n- 🚧 supports common [HTML input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types)",
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
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(args.label);
    await expect(input).toBeVisible();
    await expect(input).toBeEnabled();
    await expect(input).toHaveAttribute("id", args.id);
    await expect(input).toHaveAttribute("name", args.id);
    await expect(input).toHaveAttribute("type", args.type);
    await expect(input).toHaveAttribute("placeholder", args.placeholder);
    await expect(input).toHaveValue("");
    await expect(input).not.toBeRequired();
    await expect(input).not.toBeDisabled();
  },
};

export const Required: Story = {
  args: {
    id: "input-required",
    required: true,
    placeholder: "This field is required",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText(args.label)).toBeRequired();
  },
};

export const Disabled: Story = {
  args: {
    id: "input-disabled",
    disabled: true,
    placeholder: "This field is disabled",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(args.label);
    await expect(input).toBeDisabled();
  },
};

export const Prefilled: Story = {
  args: {
    id: "input-prefilled",
    label: "Label",
    required: true,
    modelValue: "initial value",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(args.label);
    await expect(input).toHaveValue("initial value");
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
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(args.label);
    await expect(input).toHaveValue("test@example.com");
    await expect(input).toHaveAttribute("type", "email");

    await userEvent.clear(input);
    await userEvent.type(input, "invalid[enter][tab]", { delay: 100 });

    await expect(input).toBeInvalid();
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
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(args.label);
    await expect(input).toHaveValue(123);
    await expect(input).toHaveAttribute("type", "number");
  },
};

export const Password: Story = {
  args: {
    id: "input-type-password",
    type: "password",
    modelValue: "password123",
    label: "Password",
    placeholder: "Enter your password",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(args.label);
    await expect(input).toHaveValue("password123");
    await expect(input).toHaveAttribute("type", "password");
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
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(args.label);
    await expect(input).toHaveValue("https://example.com");
    await expect(input).toHaveAttribute("type", "url");
    await expect(input).toBeValid();

    await userEvent.clear(input);
    await userEvent.type(input, "invalid[enter][tab]", { delay: 100 });

    await expect(input).toBeInvalid();
  },
};
