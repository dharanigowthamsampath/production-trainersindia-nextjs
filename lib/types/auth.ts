export interface LoginResponse {
  access_token: string
}

export interface VerifyResponse {
  user: {
    id: string
    name: string
    email: string
    role: string
  }
  refresh_token: string
} 