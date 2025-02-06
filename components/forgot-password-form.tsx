"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const requestCodeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

const resetPasswordSchema = z.object({
  code: z.string().length(6, "Code must be exactly 6 digits"),
  newPassword: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type RequestCodeInput = z.infer<typeof requestCodeSchema>
type ResetPasswordInput = z.infer<typeof resetPasswordSchema>

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [emailSent, setEmailSent] = useState(false)
  const [resetComplete, setResetComplete] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  const {
    register: registerRequestCode,
    handleSubmit: handleRequestCode,
    formState: { errors: requestErrors },
  } = useForm<RequestCodeInput>({
    resolver: zodResolver(requestCodeSchema),
  })

  const {
    register: registerReset,
    handleSubmit: handleReset,
    formState: { errors: resetErrors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  })

  async function onRequestCode(data: RequestCodeInput) {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_URL}/api/v1/auth/password/reset/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.status === 'SUCCESS') {
        setEmailSent(true)
        setUserEmail(data.email)
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

  async function onResetPassword(data: ResetPasswordInput) {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_URL}/api/v1/auth/password/reset/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          code: data.code,
          newPassword: data.newPassword,
        }),
      })

      const result = await response.json()

      if (response.ok && result.status === 'SUCCESS') {
        setResetComplete(true)
      } else {
        setError(result.message || 'Failed to reset password. Please try again.')
      }
    } catch (error) {
      console.error('Password reset error:', error)
      setError('Network error. Please check your connection.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent className="p-6">
          {!emailSent ? (
            <form onSubmit={handleRequestCode(onRequestCode)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Trainers India</h1>
                  <p className="text-balance text-muted-foreground">
                    Reset your password
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-muted-foreground">
                    Enter your email address and we'll send you a code to reset your password.
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...registerRequestCode("email")}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    disabled={isLoading}
                  />
                  {requestErrors.email && (
                    <p className="text-sm text-red-500">{requestErrors.email.message}</p>
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
              </div>
            </form>
          ) : !resetComplete ? (
            <form onSubmit={handleReset(onResetPassword)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Trainers India</h1>
                  <p className="text-balance text-muted-foreground">
                    Reset your password
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-muted-foreground">
                    Enter the 6-digit code sent to your email and your new password.
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  Reset password for: <span className="font-medium text-foreground">{userEmail}</span>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="code">Reset Code</Label>
                  <Input
                    {...registerReset("code")}
                    id="code"
                    type="text"
                    placeholder="000000"
                    maxLength={6}
                    disabled={isLoading}
                  />
                  {resetErrors.code && (
                    <p className="text-sm text-red-500">{resetErrors.code.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    {...registerReset("newPassword")}
                    id="newPassword"
                    type="password"
                    disabled={isLoading}
                  />
                  {resetErrors.newPassword && (
                    <p className="text-sm text-red-500">{resetErrors.newPassword.message}</p>
                  )}
                  <ul className="text-sm text-muted-foreground list-disc pl-4">
                    <li>At least 8 characters long</li>
                    <li>Contains at least one uppercase letter</li>
                    <li>Contains at least one lowercase letter</li>
                    <li>Contains at least one number</li>
                    <li>Contains at least one special character</li>
                  </ul>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    {...registerReset("confirmPassword")}
                    id="confirmPassword"
                    type="password"
                    disabled={isLoading}
                  />
                  {resetErrors.confirmPassword && (
                    <p className="text-sm text-red-500">{resetErrors.confirmPassword.message}</p>
                  )}
                </div>
                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Resetting..." : "Reset Password"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Trainers India</h1>
                <p className="text-balance text-muted-foreground">
                  Password Reset Complete
                </p>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Your password has been successfully reset.
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