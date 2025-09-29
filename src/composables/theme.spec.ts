import { describe, it, beforeEach } from "vitest";
import { useTheme } from "./theme";

describe("theme", () => {
  let useThemeComposable: ReturnType<typeof useTheme>;
  let root: HTMLElement;

  beforeEach(() => {
    root = document.documentElement;
    useThemeComposable = useTheme(root);
  });

  it("should apply the theme", ({ expect }) => {
    const { applyTheme, theme } = useThemeComposable;
    applyTheme();

    expect(theme.value).toBe("system");
    expect(root.classList.contains("dark")).toBe(
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    );
  });

  it("should switch between the themes", ({ expect }) => {
    const { applyTheme, theme, setTheme } = useThemeComposable;
    applyTheme();

    setTheme("dark");
    expect(theme.value).toBe("dark");
    expect(root.classList.contains("dark")).toBe(true);

    setTheme("light");
    expect(theme.value).toBe("light");
    expect(root.classList.contains("dark")).toBe(false);

    setTheme("system");
    expect(theme.value).toBe("system");
    expect(root.classList.contains("dark")).toBe(
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    );
  });
});
