import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-8">Last updated: March 21, 2025</p>

        <p>
          At CHICHANOVA, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you visit our website or make a purchase from us. Please read this policy
          carefully. By continuing to use our website, you acknowledge that you have read and understood this Privacy
          Policy.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">Personal Information</h3>

        <p>We may collect personal information that you voluntarily provide to us when you:</p>

        <ul className="list-disc pl-6 mb-4">
          <li>Register an account with us</li>
          <li>Place an order</li>
          <li>Sign up for our newsletter</li>
          <li>Contact us with inquiries or feedback</li>
          <li>Participate in promotions, contests, or surveys</li>
        </ul>

        <p>This information may include:</p>

        <ul className="list-disc pl-6 mb-4">
          <li>Name</li>
          <li>Email address</li>
          <li>Mailing address</li>
          <li>Phone number</li>
          <li>Payment information (we do not store complete credit card information)</li>
          <li>Order history</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Automatically Collected Information</h3>

        <p>
          When you visit our website, we may automatically collect certain information about your device and usage,
          including:
        </p>

        <ul className="list-disc pl-6 mb-4">
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Device information</li>
          <li>Pages visited and time spent on those pages</li>
          <li>Referring website</li>
          <li>Click patterns</li>
        </ul>

        <p>
          We collect this information using cookies, web beacons, and similar technologies. For more information about
          our use of cookies, please see our{" "}
          <Link href="/cookies" className="text-primary hover:underline">
            Cookie Policy
          </Link>
          .
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>

        <p>We may use the information we collect for various purposes, including to:</p>

        <ul className="list-disc pl-6 mb-4">
          <li>Process and fulfill your orders</li>
          <li>Communicate with you about your orders, account, or inquiries</li>
          <li>Send you marketing communications (if you've opted in)</li>
          <li>Improve our website, products, and services</li>
          <li>Personalize your shopping experience</li>
          <li>Detect and prevent fraud</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. Sharing Your Information</h2>

        <p>We may share your information with:</p>

        <ul className="list-disc pl-6 mb-4">
          <li>
            Service providers who help us operate our business (e.g., payment processors, shipping companies, marketing
            partners)
          </li>
          <li>Professional advisors (e.g., lawyers, accountants, insur marketing partners)</li>
          <li>Professional advisors (e.g., lawyers, accountants, insurers)</li>
          <li>Government authorities when required by law</li>
          <li>Business partners in the event of a merger, acquisition, or sale of all or part of our business</li>
        </ul>

        <p>We do not sell your personal information to third parties.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Security</h2>

        <p>
          We implement appropriate technical and organizational measures to protect your personal information from
          unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the
          internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">5. Your Rights</h2>

        <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>

        <ul className="list-disc pl-6 mb-4">
          <li>The right to access your personal information</li>
          <li>The right to correct inaccurate information</li>
          <li>The right to delete your personal information</li>
          <li>The right to restrict or object to processing</li>
          <li>The right to data portability</li>
          <li>The right to withdraw consent</li>
        </ul>

        <p>To exercise these rights, please contact us using the information provided at the end of this policy.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">6. Children's Privacy</h2>

        <p>
          Our website is not intended for children under 13 years of age. We do not knowingly collect personal
          information from children under 13. If you are a parent or guardian and believe that your child has provided
          us with personal information, please contact us immediately.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">7. International Transfers</h2>

        <p>
          Your information may be transferred to and processed in countries other than the one in which you reside.
          These countries may have different data protection laws than your country of residence. We will take
          appropriate measures to ensure that your personal information remains protected in accordance with this
          Privacy Policy.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">8. Changes to This Privacy Policy</h2>

        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices or for other
          operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated
          policy on our website with a new effective date. We encourage you to review this policy periodically.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">9. Contact Us</h2>

        <p>
          If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us
          at:
        </p>

        <p>
          CHICHANOVA
          <br />
          Email: privacy@chichanova.com
          <br />
          Address: 123 Fashion Street, Suite 500, New York, NY 10001
        </p>
      </div>
    </div>
  )
}

