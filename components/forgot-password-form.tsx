"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  async function onSubmit(data: ForgotPasswordInput) {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch(`${API_URL}/api/v1/auth/password/reset/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.status === 'SUCCESS') {
        setSuccess(true)
      } else {
        setError(result.message || 'Failed to send reset code. Please try again.')
      }
    } catch (error) {
      console.error('Password reset error:', error)
      setError('Network error. Please check your connection.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden">
        <CardContent className="p-6 md:p-8">
          {!success ? (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Forgot Password
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email address and we'll send you a code to reset your password.
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
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Reset Code"}
              </Button>
              <div className="text-center text-sm">
                Remember your password?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Sign in
                </a>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-4 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Check Your Email
              </h1>
              <p className="text-sm text-muted-foreground">
                We've sent a password reset code to your email address.
              </p>
              <Button asChild>
                <a href="/login">Return to Login</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 