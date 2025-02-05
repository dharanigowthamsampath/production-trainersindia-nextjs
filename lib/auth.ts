"use server"

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { LoginResponse, VerifyResponse } from '@/lib/types/auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error('Login failed')
  }

  return response.json()
}

export async function verifyToken(token: string): Promise<VerifyResponse> {
  const response = await fetch(`${API_URL}/auth/verify`, {
    headers: { 'Authorization': `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error('Token verification failed')
  }

  return response.json()
}

export async function logout() {
  // Clear tokens from localStorage (client-side)
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }
  
  redirect('/login')
} 