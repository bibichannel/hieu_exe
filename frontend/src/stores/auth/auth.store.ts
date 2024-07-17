import { StateCreator, create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import api from '~/api'
import { AuthResponse, LoginRequest, SignUpRequest } from '~/api/v1'

export interface AuthState {
  status: 'authorized' | 'unauthorized' | 'pending'
  auth?: AuthResponse

  loginUser: (payload: LoginRequest) => Promise<void>
  logoutUser: () => void
  registerUser: (payload: SignUpRequest) => Promise<void>
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: 'unauthorized',
  auth: undefined,
  loginUser: async (payload: LoginRequest) => {
    const { data } = (await api.signin(payload)) as any
    const auth = data.data
    set({ status: 'authorized', auth: auth })
  },
  logoutUser: () => {
    set({ status: 'unauthorized', auth: undefined })
  },
  registerUser: async (payload: SignUpRequest) => {
    await api.signup(payload)
  }
})

export const useAuthStore = create<AuthState>()(devtools(persist(storeApi, { name: 'auth-storage' })))
