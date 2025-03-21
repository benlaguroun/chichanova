import Link from "next/link"

export default function CookiesPage() {
  return (
    <div className="container max-w-4xl py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-8">Last updated: March 21, 2025</p>

        <p>
          This Cookie Policy explains how CHICHANOVA ("we", "us", or "our") uses cookies and similar technologies on our
          website. This policy should be read alongside our{" "}
          <Link href="/privacy-policy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          , which explains how we use personal information.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">1. What Are Cookies?</h2>

        <p>
          Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit
          certain websites. They are widely used to make websites work more efficiently, provide a better user
          experience, and give website owners information about how their site is being used.
        </p>

        <p>
          Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device when you go
          offline, while session cookies are deleted as soon as you close your web browser.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. Types of Cookies We Use</h2>

        <p>We use the following types of cookies on our website:</p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Essential Cookies</h3>

        <p>
          These cookies are necessary for the website to function properly. They enable core functionality such as
          security, network management, and account access. You can disable these by changing your browser settings, but
          this may affect how the website functions.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Performance Cookies</h3>

        <p>
          These cookies help us understand how visitors interact with our website by collecting and reporting
          information anonymously. They help us improve the way our website works.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Functionality Cookies</h3>

        <p>
          These cookies enable the website to provide enhanced functionality and personalization. They may be set by us
          or by third-party providers whose services we have added to our pages.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Targeting/Advertising Cookies</h3>

        <p>
          These cookies are used to build a profile of your interests and show you relevant advertisements on other
          sites. They do not directly store personal information, but are based on uniquely identifying your browser and
          internet device.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. Specific Cookies We Use</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">Cookie Name</th>
                <th className="py-2 px-4 text-left">Type</th>
                <th className="py-2 px-4 text-left">Purpose</th>
                <th className="py-2 px-4 text-left">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4">_session_id</td>
                <td className="py-2 px-4">Essential</td>
                <td className="py-2 px-4">Maintains your session while you browse the website</td>
                <td className="py-2 px-4">Session</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4">cart</td>
                <td className="py-2 px-4">Essential</td>
                <td className="py-2 px-4">Stores items in your shopping cart</td>
                <td className="py-2 px-4">2 weeks</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4">_ga</td>
                <td className="py-2 px-4">Performance</td>
                <td className="py-2 px-4">Used by Google Analytics to distinguish users</td>
                <td className="py-2 px-4">2 years</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4">_gid</td>
                <td className="py-2 px-4">Performance</td>
                <td className="py-2 px-4">Used by Google Analytics to distinguish users</td>
                <td className="py-2 px-4">24 hours</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4">_fbp</td>
                <td className="py-2 px-4">Targeting</td>
                <td className="py-2 px-4">Used by Facebook to deliver advertisements</td>
                <td className="py-2 px-4">3 months</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4">recently_viewed</td>
                <td className="py-2 px-4">Functionality</td>
                <td className="py-2 px-4">Stores products you've recently viewed</td>
                <td className="py-2 px-4">1 month</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Third-Party Cookies</h2>

        <p>
          In addition to our own cookies, we may also use various third-party cookies to report usage statistics,
          deliver advertisements, and so on. These cookies may include:
        </p>

        <ul className="list-disc pl-6 mb-4">
          <li>Google Analytics cookies for website analytics</li>
          <li>Facebook Pixel for advertising and remarketing</li>
          <li>Shopify cookies for e-commerce functionality</li>
          <li>Instagram cookies for social media integration</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">5. Managing Cookies</h2>

        <p>Most web browsers allow you to manage your cookie preferences. You can:</p>

        <ul className="list-disc pl-6 mb-4">
          <li>Delete cookies from your device</li>
          <li>Block cookies by activating the setting on your browser that allows you to refuse all or some cookies</li>
          <li>Set your browser to notify you when you receive a cookie</li>
        </ul>

        <p>
          Please note that if you choose to block or delete cookies, you may not be able to access certain areas or
          features of our website, and some services may not function properly.
        </p>

        <p>
          To find out more about cookies, including how to see what cookies have been set and how to manage and delete
          them, visit{" "}
          <a
            href="https://www.allaboutcookies.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            www.allaboutcookies.org
          </a>
          .
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">6. Changes to This Cookie Policy</h2>

        <p>
          We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our
          business practices. Any changes will be posted on this page with an updated revision date. We encourage you to
          check this page periodically for any changes.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">7. Contact Us</h2>

        <p>If you have any questions about our use of cookies, please contact us at:</p>

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

