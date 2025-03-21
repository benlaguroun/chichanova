import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="container max-w-4xl py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-8">Last updated: March 21, 2025</p>

        <p>
          Welcome to CHICHANOVA. These Terms of Service ("Terms") govern your use of the CHICHANOVA website and services
          (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms. If
          you do not agree to these Terms, please do not use our Services.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>

        <p>
          By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by
          these Terms, as well as our Privacy Policy. If you are using our Services on behalf of a company or other
          legal entity, you represent that you have the authority to bind such entity to these Terms.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. Changes to Terms</h2>

        <p>
          We reserve the right to modify these Terms at any time. We will provide notice of any material changes by
          posting the updated Terms on our website or by sending you an email. Your continued use of our Services after
          such modifications constitutes your acceptance of the modified Terms.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. Account Registration</h2>

        <p>
          To access certain features of our Services, you may need to create an account. You agree to provide accurate,
          current, and complete information during the registration process and to update such information to keep it
          accurate, current, and complete. You are responsible for safeguarding your password and for all activities
          that occur under your account.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Products and Orders</h2>

        <p>
          All products displayed on our website are subject to availability. We reserve the right to discontinue any
          product at any time. Prices for our products are subject to change without notice. We reserve the right to
          refuse any order you place with us.
        </p>

        <p>
          When you place an order, we will send you an email confirming receipt of your order. This email confirmation
          will constitute our acceptance of your order and will form a binding agreement between you and CHICHANOVA.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">5. Shipping and Delivery</h2>

        <p>
          We will make every effort to deliver your order within the estimated timeframes. However, delays may
          occasionally occur due to unforeseen circumstances. CHICHANOVA is not responsible for delays caused by events
          outside of our control, such as shipping carrier delays, customs processing, or natural disasters.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">6. Returns and Refunds</h2>

        <p>
          Please refer to our{" "}
          <Link href="/shipping-returns" className="text-primary hover:underline">
            Shipping & Returns
          </Link>{" "}
          page for information on our return and refund policies.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">7. Intellectual Property</h2>

        <p>
          All content on our website, including but not limited to text, graphics, logos, images, product designs, and
          software, is the property of CHICHANOVA or its content suppliers and is protected by international copyright,
          trademark, and other intellectual property laws.
        </p>

        <p>
          You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform,
          republish, download, store, or transmit any of the material on our website without our prior written consent.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">8. User Content</h2>

        <p>
          By submitting content to our website (such as product reviews, comments, or social media posts tagged with our
          brand), you grant CHICHANOVA a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable
          right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and
          display such content throughout the world in any media.
        </p>

        <p>
          You represent and warrant that you own or control all rights to the content you submit, that the content is
          accurate, and that use of the content does not violate these Terms or any law or regulation.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">9. Prohibited Activities</h2>

        <p>You agree not to:</p>

        <ul className="list-disc pl-6 mb-4">
          <li>
            Use our Services for any illegal purpose or in violation of any local, state, national, or international law
          </li>
          <li>
            Violate or encourage others to violate the rights of third parties, including intellectual property rights
          </li>
          <li>
            Attempt to interfere with, compromise the system integrity or security, or decipher any transmissions to or
            from the servers running our Services
          </li>
          <li>Use any robot, spider, crawler, scraper, or other automated means to access our Services</li>
          <li>Bypass measures we may use to prevent or restrict access to our Services</li>
          <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of our Services</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">10. Disclaimer of Warranties</h2>

        <p>
          OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR
          IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
          PURPOSE, OR NON-INFRINGEMENT.
        </p>

        <p>
          WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR
          THAT OUR SERVICES OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">11. Limitation of Liability</h2>

        <p>
          IN NO EVENT WILL CHICHANOVA, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS,
          OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN
          CONNECTION WITH YOUR USE, OR INABILITY TO USE, OUR SERVICES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL,
          INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">12. Indemnification</h2>

        <p>
          You agree to defend, indemnify, and hold harmless CHICHANOVA, its affiliates, and their respective officers,
          directors, employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses,
          costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation
          of these Terms or your use of our Services.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">13. Governing Law</h2>

        <p>
          These Terms and your use of our Services will be governed by and construed in accordance with the laws of the
          United States, without giving effect to any choice or conflict of law provision or rule.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">14. Dispute Resolution</h2>

        <p>
          Any legal action or proceeding arising out of or relating to these Terms or your use of our Services will be
          brought exclusively in the federal or state courts located in the United States, and you consent to the
          personal jurisdiction and venue of such courts.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">15. Severability</h2>

        <p>
          If any provision of these Terms is held to be invalid, illegal, or unenforceable, such provision will be
          eliminated or limited to the minimum extent necessary, and the remaining provisions will continue in full
          force and effect.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">16. Entire Agreement</h2>

        <p>
          These Terms, together with our Privacy Policy, constitute the entire agreement between you and CHICHANOVA
          regarding your use of our Services and supersede all prior and contemporaneous understandings, agreements,
          representations, and warranties.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">17. Contact Information</h2>

        <p>If you have any questions about these Terms, please contact us at:</p>

        <p>
          CHICHANOVA
          <br />
          Email: legal@chichanova.com
          <br />
          Address: 123 Fashion Street, Suite 500, New York, NY 10001
        </p>
      </div>
    </div>
  )
}

