import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPolicy() {
  return (
    <main className="container relative min-h-screen py-6 lg:py-8">
      <div className="mx-auto flex w-full flex-col space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <h1 className="text-2xl font-bold">Trainers India</h1>
          <p className="text-balance text-muted-foreground">Privacy Policy</p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-muted-foreground">
                <strong>Effective Date:</strong> January 1, 2024
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Last Updated:</strong> January 1, 2024
              </p>
            </div>

            <div className="prose prose-gray max-w-none dark:prose-invert">
              <p>Welcome to <strong>Trainers India</strong> ("we," "our," "us"). Your privacy is important to us. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our website <strong>www.trainers-india.in</strong> ("Website" or "Platform").</p>

              <h2 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
              <p>We collect the following personal information when you register on our platform:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name</li>
                <li>Email Address</li>
                <li>Phone Number</li>
                <li>Resume</li>
                <li>Profile Image</li>
              </ul>
              <p>We do <strong>not</strong> collect government-issued IDs or any sensitive financial information.</p>

              <h3 className="text-lg font-semibold mt-6 mb-3">1.1 Data Minimization & Retention</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>We collect only the <strong>minimum required data</strong> necessary for job applications and recruitment.</li>
                <li>User data is <strong>retained only as long as necessary</strong> for providing services.</li>
                <li>Users may request deletion of their data by contacting us.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">2. Legal Basis for Data Processing</h2>
              <p>We process user data based on:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>User Consent</strong> (provided during account registration).</li>
                <li><strong>Legitimate Interest</strong> (to provide job-matching services and platform security).</li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
              <p>We use the collected information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Facilitate job applications and recruitment processes.</li>
                <li>Allow companies to view trainer profiles.</li>
                <li>Communicate with users regarding their accounts and job opportunities.</li>
                <li>Improve platform performance and user experience.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">4. User Registration & Verification</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Only <strong>Trainers</strong> and <strong>Companies</strong> can register on our platform.</li>
                <li>We verify user accounts via <strong>email verification</strong>, but we do <strong>not conduct background checks</strong>.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">5. Payments & Financial Transactions</h2>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Trainers India does not request, process, or facilitate any payments through our platform.</strong></li>
                  <li>We <strong>do not recommend</strong> making payments to any user on the platform.</li>
                  <li>Any financial transaction conducted between users is at their <strong>own risk</strong>, and <strong>we are not responsible</strong> for any disputes, fraud, or financial loss.</li>
                </ul>
              </div>

              <h2 className="text-xl font-semibold mt-8 mb-4">6. Fraud & Misrepresentation Disclaimer</h2>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Trainers India <strong>does not verify</strong> all job listings or trainer profiles for accuracy.</li>
                  <li>Users are <strong>responsible for verifying</strong> job postings, company details, and trainer credentials before engaging.</li>
                  <li>We are <strong>not liable for any false, misleading, or fraudulent information</strong> posted by users.</li>
                  <li>If you suspect fraudulent activity, please report it to us at <strong>support@trainers-india.in</strong>.</li>
                </ul>
              </div>

              <h2 className="text-xl font-semibold mt-8 mb-4">7. Contact Information</h2>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p>For any privacy concerns or data-related queries, users can contact our <strong>Privacy Officer</strong> at:</p>
                <p>📧 <strong>Email:</strong> support@trainers-india.in</p>
                <p>📅 <strong>Available:</strong> Monday – Friday, 10 AM – 5 PM (IST)</p>
              </div>

              <h2 className="text-xl font-semibold mt-8 mb-4">8. Policy Updates</h2>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p>We may update this Privacy Policy periodically. Significant changes will be <strong>notified via email</strong> and posted on our website.</p>
                <p className="text-sm text-muted-foreground mt-4">By using our platform, you agree to the terms outlined in this Privacy Policy.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
