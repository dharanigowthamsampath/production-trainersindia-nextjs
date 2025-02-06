"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginSchema, type LoginInput } from "@/lib/validations/auth"
import { useState, useEffect } from "react"
import { setCookie } from 'cookies-next'

const API_URL = process.env.NEXT_PUBLIC_API_URL
const REFRESH_TOKEN_BEFORE = 5 * 60 * 1000 // 5 minutes

interface VerifyResponse {
  username: string
  email: string
  userType: string
  refreshToken: string
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/dashboard'
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  // Reset login attempts after 30 minutes
  useEffect(() => {
    if (loginAttempts >= 5) {
      const timer = setTimeout(() => {
        setLoginAttempts(0)
      }, 30 * 60 * 1000)
      return () => clearTimeout(timer)
    }
  }, [loginAttempts])

  async function verifyToken(token: string) {
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Token verification failed')
      }

      const userData: VerifyResponse = await response.json()
      
      // Store user data
      localStorage.setItem('user', JSON.stringify({
        username: userData.username,
        email: userData.email,
        userType: userData.userType
      }))
      localStorage.setItem('refresh_token', userData.refreshToken)
      localStorage.setItem('last_activity', Date.now().toString())

      return true
    } catch (error) {
      console.error('Token verification failed:', error)
      return false
    }
  }

  async function onSubmit(data: LoginInput) {
    if (loginAttempts >= 5) {
      setError('Too many login attempts. Please try again later.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const loginResponse = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const loginResult = await loginResponse.json()

      switch (loginResponse.status) {
        case 200:
          if (loginResult.status === 'SUCCESS' && loginResult.data?.accessToken) {
            const accessToken = loginResult.data.accessToken
            
            // Store token with expiry
            setCookie('access_token', accessToken, {
              path: '/',
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              maxAge: 60 * 60 * 24,
              expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
            })

            const isVerified = await verifyToken(accessToken)
            
            if (isVerified) {
              // Reset login attempts on successful login
              setLoginAttempts(0)
              window.location.href = '/dashboard'
            } else {
              setError('Session verification failed')
              setCookie('access_token', '', { maxAge: 0 })
              setLoginAttempts(prev => prev + 1)
            }
            return
          }
          break

        case 401:
          setError('Invalid email or password')
          setLoginAttempts(prev => prev + 1)
          return

        case 403:
          setError('Account is locked. Please contact support.')
          return

        case 404:
          setError('Account not found')
          setLoginAttempts(prev => prev + 1)
          return

        case 429:
          setError('Too many requests. Please try again later.')
          return

        case 500:
          setError('Server error. Please try again later.')
          return

        default:
          setError('An unexpected error occurred')
          return
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Network error. Please check your connection.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Trainers India</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/login.webp"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
