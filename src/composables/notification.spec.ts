import { describe, it, expect, vi } from "vitest";
import { useNotification } from "./notification";

describe("useNotification", () => {
  it("should initialize with default values", () => {
    const { notifications } = useNotification(vi.fn());
    expect(notifications.value).toEqual([]);
  });

  it("should add a user friendly error message", () => {
    const { notifications, reportError } = useNotification(vi.fn());

    reportError(new Error("Shucks"), "User facing message");

    expect(notifications.value).toContainEqual("User facing message");
  });

  it("should report raw error", () => {
    const reporter = vi.fn().mockImplementation(vi.fn());
    const { reportError } = useNotification(reporter);

    reportError(new Error("Shucks"), "User facing message");

    expect(reporter).toHaveBeenCalledWith(new Error("Shucks"));
  });

  it("should clear all errors", () => {
    const { notifications, reportError, clearErrors } = useNotification(vi.fn());

    reportError(new Error("Shucks"), "User facing message");
    reportError(new Error("Error!"), "Another user facing message");
    clearErrors();

    expect(notifications.value).toEqual([]);
  });
});
