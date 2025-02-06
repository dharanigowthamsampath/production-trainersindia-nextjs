import { Suspense } from "react"
import { VerifyEmailForm } from "@/components/verify-email-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email address",
}

export default function VerifyEmailPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <Suspense fallback={
            <div className="flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
            </div>
          }>
            <VerifyEmailForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
} 