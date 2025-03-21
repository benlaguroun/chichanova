import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-4xl py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-8">Last updated: March 21, 2025</p>

        <p>
          CHICHANOVA ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how
          your personal information is collected, used, and disclosed by CHICHANOVA.
        </p>

        <p>
          This Privacy Policy applies to our website, and its associated subdomains (collectively, our "Service"). By
          accessing or using our Service, you signify that you have read, understood, and agree to our collection,
          storage, use, and disclosure of your personal information as described in this Privacy Policy.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>

        <p>
          We collect information from you when you visit our website, register on our site, place an order, subscribe to
          our newsletter, respond to a survey, fill out a form, or otherwise contact us.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">1.1 Personal Information</h3>

        <p>When you visit our website, we may collect the following types of personal information:</p>

        <ul className="list-disc pl-6 mb-4">
          <li>Contact information (such as name, email address, mailing address, and phone number)</li>
          <li>Billing information (such as credit card details and billing address)</li>
          <li>Account information (such as username and password)</li>
          <li>Demographic information (such as age, gender, and location)</li>
          <li>Preferences and interests</li>
          <li>Any other information you choose to provide</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">1.2 Log Data</h3>

        <p>
          When you visit our website, our servers may automatically log the standard data provided by your web browser.
          This data may include your device's IP address, browser type and version, the pages you visit, the time and
          date of your visit, the time spent on each page, and other details.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">1.3 Device Data</h3>

        <p>
          We may also collect data about the device you're using to access our website. This data may include the device
          type, operating system, unique device identifiers, device settings, and geo-location data. What we collect can
          depend on the individual settings of your device and software.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>

        <p>We use the information we collect in various ways, including to:</p>

        <ul className="list-disc pl-6 mb-4">
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>
            Communicate with you, either directly or through one of our partners, including for customer service, to
            provide you with updates and other information relating to the website, and for marketing and promotional
            purposes
          </li>
          <li>Process your transactions</li>
          <li>Send you emails</li>
          <li>Find and prevent fraud</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. Cookies</h2>

        <p>
          We use "cookies" to collect information about you and your activity across our site. A cookie is a small piece
          of data that our website stores on your computer, and accesses each time you visit, so we can understand how
          you use our site. This helps us serve you content based on preferences you have specified.
        </p>

        <p>
          Please refer to our{" "}
          <Link href="/cookies" className="text-primary hover:underline">
            Cookie Policy
          </Link>{" "}
          for more information.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Third-Party Services</h2>

        <p>We may employ third-party companies and individuals due to the following reasons:</p>

        <ul className="list-disc pl-6 mb-4">
          <li>To facilitate our Service;</li>
          <li>To provide the Service on our behalf;</li>
          <li>To perform Service-related services; or</li>
          <li>To assist us in analyzing how our Service is used.</li>
        </ul>

        <p>
          We want to inform our Service users that these third parties have access to your Personal Information. The
          reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or
          use the information for any other purpose.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">5. Security</h2>

        <p>
          We value your trust in providing us your Personal Information, thus we are striving to use commercially
          acceptable means of protecting it. But remember that no method of transmission over the internet, or method of
          electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">6. International Transfer</h2>

        <p>
          Your information, including Personal Information, may be transferred to — and maintained on — computers
          located outside of your state, province, country or other governmental jurisdiction where the data protection
          laws may differ from those from your jurisdiction.
        </p>

        <p>
          If you are located outside the United States and choose to provide information to us, please note that we
          transfer the information, including Personal Information, to the United States and process it there.
        </p>

        <p>
          Your consent to this Privacy Policy followed by your submission of such information represents your agreement
          to that transfer.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">7. Children's Privacy</h2>

        <p>
          Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable
          information from children under 13. In the case we discover that a child under 13 has provided us with
          personal information, we immediately delete this from our servers. If you are a parent or guardian and you are
          aware that your child has provided us with personal information, please contact us so that we will be able to
          take necessary actions.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">8. Your Rights</h2>

        <p>
          If you are a resident of the European Economic Area (EEA), you have certain data protection rights. We aim to
          take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Information.
        </p>

        <p>
          If you wish to be informed what Personal Information we hold about you and if you want it to be removed from
          our systems, please contact us.
        </p>

        <p>In certain circumstances, you have the following data protection rights:</p>

        <ul className="list-disc pl-6 mb-4">
          <li>The right to access, update or delete the information we have on you</li>
          <li>
            The right of rectification - the right to have your information corrected if it is inaccurate or incomplete
          </li>
          <li>The right to object - the right to object to our processing of your Personal Information</li>
          <li>
            The right of restriction - the right to request that we restrict the processing of your personal information
          </li>
          <li>
            The right to data portability - the right to be provided with a copy of the information we have on you in a
            structured, machine-readable and commonly used format
          </li>
          <li>
            The right to withdraw consent - the right to withdraw your consent at any time where we relied on your
            consent to process your personal information
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">9. Changes to This Privacy Policy</h2>

        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page.
        </p>

        <p>
          We will let you know via email and/or a prominent notice on our Service, prior to the change becoming
          effective and update the "last updated" date at the top of this Privacy Policy.
        </p>

        <p>
          You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are
          effective when they are posted on this page.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">10. Contact Us</h2>

        <p>
          If you have any questions about this Privacy Policy, please{" "}
          <Link href="/contact" className="text-primary hover:underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

