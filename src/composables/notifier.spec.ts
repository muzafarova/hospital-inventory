import { describe, it, expect, vi } from "vitest";
import { useNotifier } from "./notifier";

describe("useNotifier", () => {
  it("should initialize with default values", () => {
    const { notifications } = useNotifier(vi.fn());
    expect(notifications.value).toEqual([]);
  });

  it("should add a user friendly error message", () => {
    const { notifications, reportError } = useNotifier(vi.fn());

    reportError(new Error("Shucks"), "User facing message");

    expect(notifications.value).toContainEqual("User facing message");
  });

  it("should report raw error", () => {
    const reporter = vi.fn().mockImplementation(vi.fn());
    const { reportError } = useNotifier(reporter);

    reportError(new Error("Shucks"), "User facing message");

    expect(reporter).toHaveBeenCalledWith(new Error("Shucks"));
  });

  it("should send error reports to various destinations, but display all messages to the user", () => {
    const reporter1 = vi.fn().mockImplementation(vi.fn());
    const reporter2 = vi.fn().mockImplementation(vi.fn());
    const { reportError: reportError1 } = useNotifier(reporter1);
    const { reportError: reportError2, notifications } = useNotifier(reporter2);

    reportError1(new Error("Shucks report 1"), "User facing message 1");
    reportError2(new Error("Shucks report 2"), "User facing message 2");

    expect(reporter1).toHaveBeenCalledWith(new Error("Shucks report 1"));
    expect(reporter2).toHaveBeenCalledWith(new Error("Shucks report 2"));
    expect(notifications.value).toContain("User facing message 1");
    expect(notifications.value).toContain("User facing message 2");
  });

  it("should clear all errors", () => {
    const { notifications, reportError, clearErrors } = useNotifier(vi.fn());

    reportError(new Error("Shucks"), "User facing message");
    reportError(new Error("Error!"), "Another user facing message");
    clearErrors();

    expect(notifications.value).toEqual([]);
  });
});
