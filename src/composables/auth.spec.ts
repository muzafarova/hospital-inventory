import { setActivePinia, createPinia } from 'pinia'
import { describe, beforeEach, expect, it, vi } from 'vitest'
import { useAuth } from './auth'
import { useAuthStore } from '@/stores/auth'
// import { createApp } from 'vue'

describe('auth', () => {
  // let authStore: ReturnType<typeof useAuthStore>
  // let app: any

  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())

    // app = createApp({})
    // const pinia = createPinia()
    // app.use(pinia)
    // setActivePinia(pinia)
    // authStore = useAuthStore()
  })

  it('should throw an error if hospitalId is not available', () => {
    const authStore = useAuthStore()

    expect(authStore.getHospitalId()).toBeUndefined()
    expect(() => useAuth(() => Promise.resolve(null))).toThrow('Hospital ID is required')
  })

  it('should augument the callback with the hospitalId as first parameter', () => {
    const authStore = useAuthStore()

    vi.spyOn(authStore, 'getHospitalId').mockReturnValue('hospitalId')
    const callback = vi.fn((x: string) => Promise.resolve(x))

    useAuth(callback, '456')

    expect(authStore.getHospitalId()).toBe('hospitalId')
    expect(callback).toHaveBeenCalledWith('hospitalId', '456')
  })
})
