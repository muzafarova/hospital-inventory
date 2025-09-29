import { setActivePinia, createPinia } from "pinia";
import { describe, beforeEach, it, vi } from "vitest";
import { useAuth } from "./auth";
import { useSessionStore } from "@/stores/session";

describe("auth", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should throw an error if hospitalId is not available", ({ expect }) => {
    const sessionStore = useSessionStore();

    expect(sessionStore.getHospitalId()).toBeUndefined();
    expect(() => useAuth(() => Promise.resolve(null))).toThrow("Hospital ID is required");
  });

  it("should augument the callback with the hospitalId as first parameter", ({ expect }) => {
    const sessionStore = useSessionStore();

    vi.spyOn(sessionStore, "getHospitalId").mockReturnValue("hospitalId");
    const callback = vi.fn((...args: string[]) => Promise.resolve(args));

    useAuth(callback, "456");

    expect(sessionStore.getHospitalId()).toBe("hospitalId");
    expect(callback).toHaveBeenCalledWith("hospitalId", "456");
  });
});
