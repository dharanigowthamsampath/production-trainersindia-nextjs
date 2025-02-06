import { Card, CardContent } from "@/components/ui/card"

export default function TermsAndConditions() {
  return (
    <main className="container relative min-h-screen py-6 lg:py-8">
      <div className="mx-auto flex w-full flex-col space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <h1 className="text-2xl font-bold">Trainers India</h1>
          <p className="text-balance text-muted-foreground">Terms & Conditions</p>
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
              <p>Welcome to <strong>Trainers India</strong>! These Terms & Conditions (&quot;Terms&quot;) govern your access to and use of our job portal <strong>www.trainers-india.in</strong> (&quot;Platform&quot; or &quot;Website&quot;). By registering on our platform, you agree to comply with these Terms.</p>

              <h2 className="text-xl font-semibold mt-8 mb-4">1. Definitions</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>&quot;Platform&quot;</strong> refers to Trainers India, including its website and services.</li>
                <li><strong>&quot;User&quot;</strong> refers to <strong>Trainers (job seekers)</strong> and <strong>Companies (employers)</strong> registered on the platform.</li>
                <li><strong>&quot;We,&quot; &quot;our,&quot; &quot;us&quot;</strong> refers to Trainers India.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">2. User Eligibility &amp; Registration</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Only <strong>Trainers (job seekers)</strong> and <strong>Companies (employers)</strong> can create an account.</li>
                <li>Users must provide <strong>accurate</strong> information during registration.</li>
                <li>We conduct <strong>email verification</strong> but do <strong>not</strong> verify user-provided details.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">3. User Responsibilities</h2>
              <h3 className="text-lg font-semibold mt-6 mb-3">3.1 For Trainers (Job Seekers)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Must provide <strong>genuine</strong> personal and professional details.</li>
                <li>Must <strong>not</strong> submit <strong>fake resumes, misleading skills, or fraudulent applications</strong>.</li>
                <li>Should <strong>verify</strong> job offers before accepting any employment.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-3">3.2 For Companies (Employers)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Must post <strong>accurate</strong> job descriptions and <strong>genuine</strong> hiring needs.</li>
                <li>Must <strong>not</strong> post spam, misleading, or non-existent job listings.</li>
                <li>Should conduct their own <strong>background verification</strong> before hiring.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">4. Payments &amp; Financial Transactions</h2>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Trainers India <strong>does not</strong> request, facilitate, or process <strong>any payments</strong> through the platform.</li>
                  <li>Users should <strong>not</strong> make payments to others through our platform.</li>
                  <li>Any financial transactions between users are at their <strong>own risk</strong>, and we are <strong>not responsible</strong> for any losses, fraud, or disputes.</li>
                </ul>
              </div>

              <h2 className="text-xl font-semibold mt-8 mb-4">5. Prohibited Activities</h2>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p>Users are strictly prohibited from:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Creating <strong>fake profiles, misleading job posts, or fraudulent applications</strong>.</li>
                  <li>Posting or sharing <strong>offensive, defamatory, or illegal content</strong>.</li>
                  <li>Using the platform for <strong>spam, scams, or phishing attempts</strong>.</li>
                  <li>Violating <strong>intellectual property rights</strong> of others.</li>
                  <li>Engaging in <strong>harassment or discrimination</strong> against other users.</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">Violating these rules may lead to <strong>account suspension or permanent ban</strong>.</p>
              </div>

              <h2 className="text-xl font-semibold mt-8 mb-4">6. Platform Liability &amp; User Verification</h2>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <ul className="list-disc pl-6 space-y-2">
                  <li>We <strong>do not verify</strong> all job listings or trainer profiles.</li>
                  <li>Users are responsible for conducting <strong>due diligence</strong> before engaging with another user.</li>
                  <li>We are <strong>not liable</strong> for:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>Fake or misleading job posts</li>
                      <li>False trainer profiles</li>
                      <li>Fraudulent activities by users</li>
                    </ul>
                  </li>
                </ul>
                <p className="text-sm mt-4">If you encounter suspicious activity, <strong>report it immediately</strong> to <strong>support@trainers-india.in</strong>.</p>
              </div>

              <h2 className="text-xl font-semibold mt-8 mb-4">7. Contact Information</h2>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p>For any queries, contact our support team:</p>
                <p>📧 <strong>Email:</strong> support@trainers-india.in</p>
                <p>📅 <strong>Available:</strong> Monday – Friday, 10 AM – 5 PM (IST)</p>
              </div>

              <h2 className="text-xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <ul className="list-disc pl-6 space-y-2">
                  <li>We may update these Terms from time to time.</li>
                  <li>Users will be <strong>notified via email</strong> of major changes.</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">By using our platform, you agree to these Terms &amp; Conditions.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
} 