import { TopBar } from "@/components/top-bar"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"
import { Shield, ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

  return (
    <div className="min-h-screen bg-black text-white">
      <TopBar />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-fram3-yellow transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-fram3-yellow mr-3" />
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-sm text-gray-400">Last Updated: {currentDate}</p>
        </div>

        <div className="prose prose-invert prose-yellow max-w-none">
          <p className="text-gray-300">
            Fram3 ("we," "us," or "our") is committed to safeguarding the privacy and personal data of our users
            ("user," "you," or "your"). This Privacy Policy explains what information we collect, how we use and protect
            it, and your rights regarding that information. By using our website, platform, or services (collectively,
            the "Services"), you agree to the terms of this Policy.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Scope & Acceptance</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>
              This Privacy Policy applies to all users of our Services, including visitors to our website and
              subscribers of our video creation platform.
            </li>
            <li>
              By accessing or using the Services, you acknowledge that you have read, understood, and agree to be bound
              by this Privacy Policy. If you do not agree, please discontinue use of our Services.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Information We Collect</h2>
          <p className="text-gray-300">
            We collect information to provide, improve, and secure our Services. This may include:
          </p>

          <div className="pl-5 mt-4">
            <h3 className="font-medium text-white">Personal Information:</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              <li>
                Identification Data: Name, email address, username, or any other information you provide when you
                register or update your account.
              </li>
              <li>
                Payment Information (if applicable): Payment card details or other billing information (processed
                securely by our third-party payment processors).
              </li>
            </ul>

            <h3 className="font-medium text-white mt-4">Usage Data:</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              <li>
                Interaction Data: Information about how you use our Services, including session duration, pages visited,
                links clicked, and user preferences.
              </li>
              <li>
                Script & Creative Data: Text, images, video content, or other media you upload or generate through our
                platform.
              </li>
              <li>
                Technical Data: IP addresses, browser type, device identifiers, operating system, and log files to help
                diagnose issues and administer our Services.
              </li>
            </ul>

            <h3 className="font-medium text-white mt-4">Communication Data:</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              <li>Support Requests: Emails, chat messages, and other communications sent to our support team.</li>
              <li>Feedback & Surveys: Responses to surveys, user feedback forms, or other submitted content.</li>
            </ul>
          </div>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. How We Use Your Information</h2>
          <div className="pl-5">
            <h3 className="font-medium text-white">Service Delivery:</h3>
            <p className="text-gray-300">
              To provide, maintain, and enhance our video creation platform, including generating, editing, and
              publishing your content.
            </p>

            <h3 className="font-medium text-white mt-4">Customer Support & Communication:</h3>
            <p className="text-gray-300">
              To respond to support tickets, inquiries, and feedback, ensuring a smoother user experience.
            </p>

            <h3 className="font-medium text-white mt-4">Platform Improvements & Analytics:</h3>
            <p className="text-gray-300">
              To analyze usage patterns, fix bugs, and develop new features that better serve our users.
            </p>

            <h3 className="font-medium text-white mt-4">Legal Compliance & Security:</h3>
            <p className="text-gray-300">
              To comply with applicable laws, enforce our Terms of Service, and protect the rights and safety of our
              users and the public.
            </p>
          </div>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. Data Retention</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>
              <span className="font-medium">Retention Period:</span> We retain your data only for as long as is
              necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is
              required or permitted by law.
            </li>
            <li>
              <span className="font-medium">Deletion Requests:</span> If you wish to have your personal information,
              creative content, or account deleted, please contact us (see Section 13: Contact Us). We will make
              reasonable efforts to comply with your request in accordance with applicable legal requirements.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">5. Security Measures</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>
              <span className="font-medium">Encryption & Secure Storage:</span> We use Secure Socket Layer (SSL)
              technology and other industry-standard security measures to protect information in transit and at rest.
            </li>
            <li>
              <span className="font-medium">Access Controls:</span> We limit access to personal data to employees,
              contractors, and agents who need it to operate, develop, or improve our Services. These individuals are
              subject to contractual confidentiality obligations.
            </li>
            <li>
              <span className="font-medium">No Absolute Guarantee:</span> While we take security seriously, no method of
              transmission over the Internet or electronic storage is completely secure. We cannot guarantee absolute
              security of your information.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">6. User Content & Intellectual Property</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>
              <span className="font-medium">Ownership of Scripts & Creative Content:</span> You retain all rights and
              intellectual property ownership of the scripts, videos, and any other content you create or upload ("User
              Content").
            </li>
            <li>
              <span className="font-medium">Liability for Stolen or Forged Scripts:</span> Fram3 is not liable for any
              intellectual property or ownership disputes regarding User Content. You warrant that the materials you
              upload or generate do not infringe on any third-party rights.
            </li>
            <li>
              <span className="font-medium">User Responsibility:</span> You are solely responsible for ensuring the
              originality and legality of your content. If we receive a complaint alleging infringement, we reserve the
              right to suspend or remove the disputed content and/or your account in accordance with our Terms of
              Service and applicable laws.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">7. Consent for Model Training</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>
              <span className="font-medium">Optional Data Training:</span> We will only use your User Content (scripts,
              images, videos) to improve our AI models if you explicitly opt-in. If you do not opt-in, your User Content
              will not be used to train or refine our AI algorithms.
            </li>
            <li>
              <span className="font-medium">Licensed Training Benefits & Royalties:</span> If you choose to license your
              User Content for training, you may receive added benefits such as enhanced features, access to exclusive
              tools, and potential royalties if other users generate derivative works based on models that include your
              licensed content. The terms of any royalty arrangement (if offered) will be outlined in a separate,
              optional licensing agreement.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">8. Sharing of Information</h2>
          <p className="text-gray-300">
            We do not sell or rent your personal information to third parties. We may share your data only under these
            circumstances:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>
              <span className="font-medium">With Your Consent:</span> We will disclose your information if you have
              expressly authorized us to do so.
            </li>
            <li>
              <span className="font-medium">Service Providers:</span> We work with trusted partners (e.g., cloud hosting
              services, payment processors) that process data on our behalf, subject to strict confidentiality
              obligations.
            </li>
            <li>
              <span className="font-medium">Legal Obligations:</span> If required by law, subpoena, or a valid legal
              process, we may disclose information to comply with legal obligations or protect our rights and the rights
              of our users.
            </li>
            <li>
              <span className="font-medium">Business Transactions:</span> In the event of a merger, acquisition,
              reorganization, or sale of assets, your information may be transferred as part of the transaction, subject
              to the same protections described in this Policy.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">9. User Rights & Choices</h2>
          <p className="text-gray-300">
            Depending on your jurisdiction, you may have the following rights regarding your personal information:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>
              <span className="font-medium">Right to Access:</span> You can request a copy of the personal data we hold
              about you.
            </li>
            <li>
              <span className="font-medium">Right to Correction:</span> You may update or correct inaccurate personal
              data.
            </li>
            <li>
              <span className="font-medium">Right to Deletion ("Right to Be Forgotten"):</span> You may request deletion
              of your personal data, subject to any legal obligations to retain it.
            </li>
            <li>
              <span className="font-medium">Right to Object or Restrict Processing:</span> You can object to or request
              restrictions on our processing of your personal data.
            </li>
            <li>
              <span className="font-medium">Right to Data Portability:</span> If applicable, you may request a
              machine-readable copy of the personal data you have provided to us.
            </li>
            <li>
              <span className="font-medium">Opt-Out of Marketing Communications:</span> You can opt-out of marketing or
              promotional emails at any time by clicking the "Unsubscribe" link or by contacting us directly.
            </li>
          </ul>
          <p className="text-gray-300 mt-2">To exercise these rights, please see Section 13: Contact Us below.</p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">10. International Data Transfers</h2>
          <p className="text-gray-300">
            Your information, including personal data, may be transferred to and maintained on servers located outside
            your state, province, country, or other governmental jurisdiction. We take steps to ensure that appropriate
            safeguards exist for all international data transfers.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">11. Liability & Indemnification</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>
              <span className="font-medium">Disclaimer of Liability:</span> Fram3 shall not be held liable for any
              misuse, theft, or unauthorized reproduction of User Content, including scripts that are stolen, forged, or
              infringing upon third-party rights.
            </li>
            <li>
              <span className="font-medium">Indemnification:</span> You agree to indemnify and hold harmless Fram3 and
              its affiliates from any claims, damages, or liabilities arising out of or related to your content,
              including, but not limited to, alleged or actual infringement of intellectual property rights.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">12. Changes to This Privacy Policy</h2>
          <p className="text-gray-300">
            We may update this Policy from time to time to reflect changes in our practices or applicable laws. We will
            notify you of any significant modifications by posting a notice on our website or contacting you directly.
            Your continued use of the Services after any updated version of this Policy becomes effective indicates your
            acceptance of the changes.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">13. Contact Us</h2>
          <p className="text-gray-300">
            If you have questions or concerns about this Privacy Policy or wish to exercise any legal rights, please
            contact us at:
          </p>
          <ul className="list-none pl-5 space-y-1 text-gray-300">
            <li>
              <span className="font-medium">Email:</span> support@fram3.ai
            </li>
            <li>
              <span className="font-medium">Address:</span> #1035, 3rd Floor, Vijaya Bank layout, Bilekahalli, Bangalore
              - 560076
            </li>
            <li>
              <span className="font-medium">Telephone:</span> +91 94489 08617
            </li>
          </ul>
          <p className="text-sm italic mt-4 text-gray-400">Effective Date: {currentDate}</p>
          <p className="text-sm text-gray-300">
            By using the Fram3 platform, you acknowledge that you have read and agree to this Privacy Policy.
          </p>

          <div className="mt-8 pt-6 border-t border-white/10"></div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}

