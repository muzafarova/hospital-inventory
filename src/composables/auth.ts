import { useAuthStore } from '@/stores/auth'

export function useAuth<T>(cb: (...args: unknown[]) => Promise<T>, ...args: unknown[]) {
  const authStore = useAuthStore()
  const hospitalId = authStore.getHospitalId()
  if (!hospitalId) {
    throw new Error('Hospital ID is required')
  }
  return cb(hospitalId, ...args)
}
