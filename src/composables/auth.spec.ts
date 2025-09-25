import { setActivePinia, createPinia } from 'pinia'
import { describe, beforeEach, it, vi } from 'vitest'
import { useAuth } from './auth'
import { useAuthStore } from '@/stores/auth'

describe('auth', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should throw an error if hospitalId is not available', ({ expect }) => {
    const authStore = useAuthStore()

    expect(authStore.getHospitalId()).toBeUndefined()
    expect(() => useAuth(() => Promise.resolve(null))).toThrow('Hospital ID is required')
  })

  it('should augument the callback with the hospitalId as first parameter', ({ expect }) => {
    const authStore = useAuthStore()

    vi.spyOn(authStore, 'getHospitalId').mockReturnValue('hospitalId')
    const callback = vi.fn((...args: string[]) => Promise.resolve(args))

    useAuth(callback, '456')

    expect(authStore.getHospitalId()).toBe('hospitalId')
    expect(callback).toHaveBeenCalledWith('hospitalId', '456')
  })
})
