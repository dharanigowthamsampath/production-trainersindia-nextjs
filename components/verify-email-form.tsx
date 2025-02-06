"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export function VerifyEmailForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [otp, setOtp] = useState("")
  const [emailParam, setEmailParam] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const email = searchParams.get('email')
    setEmailParam(email)
  }, [searchParams])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!emailParam) return

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch(`${API_URL}/api/v1/auth/register/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: emailParam, 
          code: otp
        }),
      })

      const result = await response.json()

      if (result.status === 'SUCCESS') {
        setSuccess(result.message)
        // Wait for 3 seconds before redirecting
        setTimeout(() => {
          router.push('/login')
        }, 3000)
      } else {
        setError(result.message)
      }
    } catch (error) {
      console.error(error)
      setError('Verification failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!emailParam) {
    return (
      <Card className="w-full max-w-[400px]">
        <CardContent className="p-6">
          <p className="text-center text-sm text-muted-foreground">
            No email address provided. Please try signing up again.
          </p>
          <Button 
            className="mt-4 w-full"
            onClick={() => router.push('/signup')}
          >
            Back to Sign Up
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-full max-w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Verify Your Email</CardTitle>
          <p className="text-sm text-muted-foreground">
            Please enter the verification code sent to your email
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={emailParam}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength={6}
              />
            </div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            {success && (
              <p className="text-sm text-green-500">{success}</p>
            )}
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading || !otp || otp.length !== 6}
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 