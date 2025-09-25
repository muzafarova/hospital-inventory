import { useAuthStore } from '@/stores/auth'

export function useAuth<T, Args extends unknown[]>(
  cb: (hospitalId: string, ...args: Args) => Promise<T>,
  ...args: Args
) {
  const authStore = useAuthStore()
  const hospitalId = authStore.getHospitalId()
  if (!hospitalId) {
    throw new Error('Hospital ID is required')
  }
  return cb(hospitalId, ...args)
}
