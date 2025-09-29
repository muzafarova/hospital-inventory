import { useSessionStore } from "@/stores/session";

export function useAuth<T, Args extends unknown[]>(
  cb: (hospitalId: string, ...args: Args) => Promise<T>,
  ...args: Args
) {
  const sessionStore = useSessionStore();
  const hospitalId = sessionStore.getHospitalId();
  if (!hospitalId) {
    throw new Error("Hospital ID is required");
  }
  return cb(hospitalId, ...args);
}
