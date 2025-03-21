import Link from "next/link"

export default function TermsConditionsPage() {
  return (
    <div className="container max-w-4xl py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Terms & Conditions</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-8">Last updated: March 21, 2025</p>

        <p>
          Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the CHICHANOVA
          website (the "Service") operated by CHICHANOVA ("us", "we", or "our").
        </p>

        <p>
          Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
          These Terms apply to all visitors, users, and others who access or use the Service.
        </p>

        <p>
          By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the
          terms, then you may not access the Service.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">1. Purchases</h2>

        <p>
          If you wish to purchase any product or service made available through the Service ("Purchase"), you may be
          asked to supply certain information relevant to your Purchase including, without limitation, your credit card
          number, the expiration date of your credit card, your billing address, and your shipping information.
        </p>

        <p>
          You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment
          method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct,
          and complete.
        </p>

        <p>
          By submitting such information, you grant us the right to provide the information to third parties for
          purposes of facilitating the completion of Purchases.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. Availability, Errors, and Inaccuracies</h2>

        <p>
          We are constantly updating our offerings of products and services on the Service. The products or services
          available on our Service may be mispriced, described inaccurately, or unavailable, and we may experience
          delays in updating information on the Service and in our advertising on other websites.
        </p>

        <p>
          We cannot and do not guarantee the accuracy or completeness of any information, including prices, product
          images, specifications, availability, and services. We reserve the right to change or update information and
          to correct errors, inaccuracies, or omissions at any time without prior notice.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. Contests, Sweepstakes, and Promotions</h2>

        <p>
          Any contests, sweepstakes, or other promotions (collectively, "Promotions") made available through the Service
          may be governed by rules that are separate from these Terms. If you participate in any Promotions, please
          review the applicable rules as well as our Privacy Policy. If the rules for a Promotion conflict with these
          Terms, the Promotion rules will apply.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Content</h2>

        <p>
          Our Service allows you to post, link, store, share, and otherwise make available certain information, text,
          graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the
          Service, including its legality, reliability, and appropriateness.
        </p>

        <p>
          By posting Content to the Service, you grant us the right and license to use, modify, perform, display,
          reproduce, and distribute such Content on and through the Service. You retain any and all of your rights to
          any Content you submit, post, or display on or through the Service and you are responsible for protecting
          those rights.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">5. Prohibited Uses</h2>

        <p>
          You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the
          Service:
        </p>

        <ul className="list-disc pl-6 mb-4">
          <li>In any way that violates any applicable national or international law or regulation.</li>
          <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
          <li>
            To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail",
            "chain letter," "spam," or any other similar solicitation.
          </li>
          <li>
            To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person
            or entity.
          </li>
          <li>
            In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or
            harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">6. Termination</h2>

        <p>
          We may terminate or suspend your access immediately, without prior notice or liability, for any reason
          whatsoever, including without limitation if you breach the Terms.
        </p>

        <p>
          Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account,
          you may simply discontinue using the Service.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">7. Limitation of Liability</h2>

        <p>
          In no event shall CHICHANOVA, nor its directors, employees, partners, agents, suppliers, or affiliates, be
          liable for any indirect, incidental, special, consequential or punitive damages, including without limitation,
          loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of
          or inability to access or use the Service; (ii) any conduct or content of any third party on the Service;
          (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your
          transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal
          theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth
          herein is found to have failed of its essential purpose.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">8. Disclaimer</h2>

        <p>
          Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis.
          The Service is provided without warranties of any kind, whether express or implied, including, but not limited
          to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of
          performance.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">9. Governing Law</h2>

        <p>
          These Terms shall be governed and construed in accordance with the laws of the United States, without regard
          to its conflict of law provisions.
        </p>

        <p>
          Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
          If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of
          these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our
          Service, and supersede and replace any prior agreements we might have between us regarding the Service.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">10. Changes</h2>

        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
          material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What
          constitutes a material change will be determined at our sole discretion.
        </p>

        <p>
          By continuing to access or use our Service after those revisions become effective, you agree to be bound by
          the revised terms. If you do not agree to the new terms, please stop using the Service.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">11. Contact Us</h2>

        <p>
          If you have any questions about these Terms, please{" "}
          <Link href="/contact" className="text-primary hover:underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

