import { useState } from "react";

export default function PrivacyPolicy() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (sectionId) => {
    setExpandedSection((prev) => (prev === sectionId ? null : sectionId));
  };

  const sections = [
    {
      id: "principles",
      title: "Our Principles",
      content: (
        <div>
          <p className="mb-2">
            M S A SHAH CREATIONS has designed this policy to be consistent with
            the following principles:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Privacy policies should be human readable and easy to find.</li>
            <li>
              Data collection, storage, and processing should be simplified as
              much as possible to enhance security, ensure consistency, and make
              the practices easy for users to understand.
            </li>
            <li>
              We are committed to protecting your personal information. We
              collect your name, email, phone number, and address solely for
              order processing and communication. Your data is never shared with
              any third party without your consent. We use secure payment
              gateways to ensure your information is encrypted and safe.
            </li>
            <li>
              Data practices should meet the reasonable expectations of users.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "information-collected",
      title: "Information We Collect",
      content: (
        <div>
          <p className="mb-2">
            We collect information in multiple ways, including when you provide
            information directly to us; when we passively collect information
            from you, such as from your browser or device; and from third
            parties.
          </p>

          <h4 className="font-semibold mt-4 mb-2">
            Information You Provide Directly to Us
          </h4>
          <ul className="list-disc pl-6 space-y-1 mb-2">
            <li>Create an online account</li>
            <li>Make a purchase</li>
            <li>Contact us or provide feedback</li>
            <li>Subscribe to our newsletter</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2">
            Information that Is Automatically Collected
          </h4>
          <h5 className="font-medium mt-3 mb-1">Device/Usage Information</h5>
          <ul className="list-disc pl-6 space-y-1 mb-2">
            <li>
              Device info like IP addresses, location, IMEI, browser, OS, etc.
            </li>
            <li>
              Interaction info like visited pages, time spent, and errors.
            </li>
          </ul>

          <h5 className="font-medium mt-3 mb-1">
            Cookies and Other Tracking Technologies
          </h5>
          <ul className="list-disc pl-6 space-y-1 mb-2">
            <li>Recognize your device</li>
            <li>Store preferences</li>
            <li>Understand page visits</li>
            <li>Enhance user experience</li>
            <li>Security and analytics</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2">
            Information from Third Parties
          </h4>
          <p>
            We may also collect data from third parties like social media,
            public sources, or market research firms.
          </p>
        </div>
      ),
    },
    {
      id: "use-information",
      title: "How We Use Your Information",
      content: (
        <div>
          <p className="mb-2">We may use your information to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Fulfill the services you requested.</li>
            <li>Improve our products and services.</li>
            <li>Process transactions and support.</li>
            <li>Send alerts and newsletters.</li>
            <li>Respond to inquiries or feedback.</li>
            <li>Conduct analytics and reporting.</li>
            <li>Comply with legal obligations and protect rights.</li>
            <li>Enforce terms and investigate violations.</li>
          </ul>
          <p className="mt-2">
            We may combine and anonymize data to use for research and marketing.
          </p>
        </div>
      ),
    },
    {
      id: "disclose-information",
      title: "When We Disclose Your Information",
      content: (
        <div>
          <p className="mb-2">
            We may disclose your information in the following scenarios:
          </p>

          <h4 className="font-semibold mt-4 mb-2">Service Providers</h4>
          <p className="mb-2">
            With third parties performing services on our behalf.
          </p>

          <h4 className="font-semibold mt-4 mb-2">
            Legal Compliance and Protection
          </h4>
          <ul className="list-disc pl-6 space-y-1 mb-2">
            <li>To comply with law or legal requests</li>
            <li>To enforce policies or respond to requests</li>
            <li>To protect rights and safety</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2">Business Transfers</h4>
          <p className="mb-2">
            In case of merger, acquisition, or asset transfer, your info may be
            transferred as part of the transaction.
          </p>

          <h4 className="font-semibold mt-4 mb-2">Affiliated Companies</h4>
          <p className="mb-2">
            We may share with current or future affiliates.
          </p>

          <h4 className="font-semibold mt-4 mb-2">Consent</h4>
          <p className="mb-2">When you have given explicit permission.</p>

          <h4 className="font-semibold mt-4 mb-2">
            Aggregate/De-identified Information
          </h4>
          <p>We may share anonymized data for various purposes.</p>
        </div>
      ),
    },
    {
      id: "legal-basis",
      title: "Legal Basis for Processing Personal Data",
      content: (
        <div>
          <p className="mb-2">
            Where applicable by law, our legal grounds for processing personal
            data include:
          </p>

          <h4 className="font-semibold mt-4 mb-2">Contractual Commitments</h4>
          <p className="mb-2">
            We process your data to fulfill our contract with you.
          </p>

          <h4 className="font-semibold mt-4 mb-2">Legitimate Interests</h4>
          <p className="mb-2">
            We use your data for things like service improvement, fraud
            prevention, and security.
          </p>

          <h4 className="font-semibold mt-4 mb-2">Legal Obligations</h4>
          <p className="mb-2">
            To meet legal requirements like record-keeping and responding to
            lawful requests.
          </p>

          <h4 className="font-semibold mt-4 mb-2">Consent</h4>
          <p className="mb-2">
            Where required, we process data based on your consent, which you may
            withdraw anytime.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Privacy Policy</h2>
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="border rounded-md shadow-sm">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full text-left px-4 py-3 font-semibold bg-gray-100 hover:bg-gray-200"
            >
              {section.title}
            </button>
            {expandedSection === section.id && (
              <div className="px-4 py-3 text-sm text-gray-700">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
