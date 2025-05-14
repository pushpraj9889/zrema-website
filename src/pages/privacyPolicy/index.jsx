import { useState } from "react";

export default function PrivacyPolicy() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (sectionId) => {
    if (expandedSection === sectionId) {
      setExpandedSection(null);
    } else {
      setExpandedSection(sectionId);
    }
  };

  const sections = [
    {
      id: "principles",
      title: "Our Principles",
      content: (
        <div>
          <p className="mb-2">
            zrema Fashions Pvt Ltd has designed this policy to be consistent
            with the following principles:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Privacy policies should be human readable and easy to find.</li>
            <li>
              Data collection, storage, and processing should be simplified as
              much as possible to enhance security, ensure consistency, and make
              the practices easy for users to understand.
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
          <p className="mb-2">
            We will collect any information you provide to us. We may collect
            information from you in a variety of ways, such as when you:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Create an online account</li>
            <li>Make a purchase</li>
            <li>Contact us or provide feedback</li>
            <li>Subscribe to our newsletter</li>
          </ul>
          <p className="mt-2">
            This information may include but is not limited to your name, email
            address, phone number, mailing address, payment information and your
            geographic location.
          </p>

          <h4 className="font-semibold mt-4 mb-2">
            Information that Is Automatically Collected
          </h4>
          <h5 className="font-medium mt-3 mb-1">Device/Usage Information</h5>
          <p className="mb-2">
            We may automatically collect certain information about the computer
            or devices (including mobile devices or tablets) you use to access
            the Services. As described further below, we may collect and
            analyze:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Device information such as IP addresses, location information (by
              country and city), unique device identifiers, IMEI and TCP/IP
              address, browser types, browser language, operating system, mobile
              device carrier information
            </li>
            <li>
              Information related to the ways in which you interact with the
              Services, such as referring and exit web pages and URLs, platform
              type, the number of clicks, domain names, landing pages, pages and
              content viewed and the order of those pages, statistical
              information about the use of the Services, the amount of time
              spent on particular pages, the date and time you used the
              Services, the frequency of your use of the Services, error logs,
              and other similar information
            </li>
          </ul>

          <h5 className="font-medium mt-3 mb-1">
            Cookies and Other Tracking Technologies
          </h5>
          <p className="mb-2">
            We also collect data about your use of the Services through the use
            of Internet server logs and online tracking technologies, like
            cookies and/or tracking pixels. A web server log is a file where
            website activity is stored. A cookie is a small text file that is
            placed on your computer when you visit a website, that enables us
            to:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Recognize your computer</li>
            <li>Store your preferences and settings</li>
            <li>
              Understand the web pages of the Services you have visited and the
              referral sites that have led you to our Services
            </li>
            <li>
              Enhance your user experience by delivering content specific to
              your inferred interests
            </li>
            <li>Perform searches and analytics</li>
            <li>Assist with security administrative functions</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2">
            Information from Third Parties
          </h4>
          <p className="mb-2">
            The extent permitted by law, we may also collect information from
            third parties, including public sources, social media platforms, and
            marketing and market research firms. Depending on the source, this
            information collected from third parties could include name, contact
            information, demographic information, information about an
            individual's employer, information to verify identity or
            trustworthiness, and information for other fraud or safety
            protection purposes.
          </p>
        </div>
      ),
    },
    {
      id: "use-information",
      title: "How We Use Your Information",
      content: (
        <div>
          <p className="mb-2">
            We may use the information we collect from and about you to:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Fulfill the purposes for which you provided it.</li>
            <li>
              Provide and improve the product/service, including to develop new
              features, take steps to secure the Services, and for technical and
              customer support.
            </li>
            <li>Process transactions.</li>
            <li>
              Send you information about your interaction or transactions with
              us, account alerts, or other communications, such as newsletters
              to which you have subscribed.
            </li>
            <li>
              Process and respond to your inquiries or to request your feedback.
            </li>
            <li>
              Conduct analytics, research, and reporting, including to
              synthesize and derive insights from your use of our Services.
            </li>
            <li>
              Comply with the law and protect the safety, rights, property, or
              security of QA, the Services, our users, and the general public.
            </li>
            <li>
              Enforce our Terms of Use, including to investigate potential
              violations thereof.
            </li>
          </ul>
          <p className="mt-2">
            Please note that we may combine information that we collect from you
            and about you (including automatically collected information) with
            information we obtain about you from our affiliates and/or
            non-affiliated third parties, and use such combined information in
            accordance with this Privacy Policy. We may aggregate and/or
            de-identify information collected through the Services. We may use
            de-identified and/or aggregated data for any purpose, including
            without limitation for research and marketing purposes.
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
            We may disclose and/or share your information under the following
            circumstances:
          </p>

          <h4 className="font-semibold mt-4 mb-2">Service Providers</h4>
          <p className="mb-2">
            We may disclose your information with third parties who perform
            services on our behalf, including without limitation, event
            management, marketing, customer support, data storage, data analysis
            and processing, and legal services.
          </p>

          <h4 className="font-semibold mt-4 mb-2">
            Legal Compliance and Protection
          </h4>
          <p className="mb-2">
            We may disclose your information if required to do so by law or on a
            good faith belief that such disclosure is permitted by this Privacy
            Policy or reasonably necessary or appropriate for any of the
            following reasons:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>To comply with legal process</li>
            <li>
              To enforce or apply our Terms of Use and this Privacy Policy, or
              other contracts with you, including investigation of potential
              violations thereof
            </li>
            <li>
              To enforce our Charter including the Code of Conduct and policies
              contained and incorporated therein
            </li>
            <li>To respond to your requests for customer service</li>
            <li>
              To protect the rights, property, or personal safety of zrema
              Fashions Pvt Ltd, our agents and affiliates, our users, and the
              public
            </li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2">Business Transfers</h4>
          <p className="mb-2">
            As we continue to develop our business, we may engage in certain
            business transactions, such as the transfer or sale of our assets.
            In such transactions, your information may be disclosed. If any of
            our assets are sold or transferred to a third party, customer
            information (including your email address) would likely be one of
            the transferred business assets.
          </p>

          <h4 className="font-semibold mt-4 mb-2">Affiliated Companies</h4>
          <p className="mb-2">
            We may disclose your information with current or future affiliated
            companies.
          </p>

          <h4 className="font-semibold mt-4 mb-2">Consent</h4>
          <p className="mb-2">
            We may disclose your information to any third parties based on your
            consent to do so.
          </p>

          <h4 className="font-semibold mt-4 mb-2">
            Aggregate/De-identified Information
          </h4>
          <p className="mb-2">
            We may disclose de-identified and/or aggregated data for any purpose
            to third parties, including advertisers, promotional partners,
            and/or others.
          </p>
        </div>
      ),
    },
    {
      id: "legal-basis",
      title: "Legal Basis for Processing Personal Data",
      content: (
        <div>
          <p className="mb-2">
            The laws in some jurisdictions require companies to tell you about
            the legal ground they rely on to use or disclose information that
            can be directly linked to or used to identify you. To the extent
            those laws apply, our legal grounds for processing such information
            are as follows:
          </p>

          <h4 className="font-semibold mt-4 mb-2">
            To Honour Our Contractual Commitments to You
          </h4>
          <p className="mb-2">
            Much of our processing of information is to meet our contractual
            obligations to provide services to our users.
          </p>

          <h4 className="font-semibold mt-4 mb-2">Legitimate Interests</h4>
          <p className="mb-2">
            In many cases, we handle information on the ground that it furthers
            our legitimate interests in ways that are not overridden by the
            interests or fundamental rights and freedoms of the affected
            individuals, these include:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Customer service</li>
            <li>Marketing, advertising, and fundraising</li>
            <li>Protecting our users, personnel, and property</li>
            <li>Managing user accounts</li>
            <li>Organizing and running events and programs</li>
            <li>Analyzing and improving our business</li>
            <li>Managing legal issues</li>
          </ul>
          <p className="mt-2">
            We may also process information for the same legitimate interests of
            our users and business partners.
          </p>

          <h4 className="font-semibold mt-4 mb-2">Legal Compliance</h4>
          <p className="mb-2">
            We may need to use and disclose information in certain ways to
            comply with our legal obligations.
          </p>

          <h4 className="font-semibold mt-4 mb-2">Consent</h4>
          <p className="mb-2">
            Where required by law, and in some other cases where legally
            permissible, we handle information on the basis of consent. Where we
            handle your information on the basis of consent, you have the right
            to withdraw your consent, in accordance with applicable law.
          </p>
        </div>
      ),
    },
    {
      id: "analytics",
      title: "Online Analytics",
      content: (
        <div>
          <p className="mb-2">
            We may use third-party web analytics services (such as Google
            Analytics) on our Services to collect and analyze the information
            discussed above, and to engage in auditing, research, or reporting.
            The information (including your IP address) collected by various
            analytics technologies described in the "Cookies and Other Tracking
            Technologies" section above will be disclosed to or collected
            directly by these service providers, who use the information to
            evaluate your use of the Services, including by noting the
            third-party website from which you arrive to our Site, analyzing
            usage trends, assisting with fraud prevention, and providing certain
            features to you. To prevent Google Analytics from using your
            information for analytics, you may install the official Google
            Analytics Opt out Browser Add-on.
          </p>
        </div>
      ),
    },
    {
      id: "choices",
      title: "Your Choices and Data Subject Rights",
      content: (
        <div>
          <p className="mb-2">
            You have various rights with respect to the collection and use of
            your information through the Services. Those choices are as follows:
          </p>

          <h4 className="font-semibold mt-4 mb-2">Email Unsubscribe</h4>
          <p className="mb-2">
            You may unsubscribe from our marketing emails at any time by
            clicking on the "unsubscribe" link at the bottom of each newsletter
            or by emailing support@zrema.in with your request.
          </p>

          <h4 className="font-semibold mt-4 mb-2">Account Preferences</h4>
          <p className="mb-2">
            If you have registered for an account with us through our Services,
            you can update your account information or adjust your email
            communications preferences by logging into your account and updating
            your settings.
          </p>

          <h4 className="font-semibold mt-4 mb-2">EU Data Subject Rights</h4>
          <p className="mb-2">
            Individuals in other jurisdictions have certain legal rights
            (subject to applicable exceptions and limitations) to obtain
            confirmation of whether we hold certain information about them, to
            access such information, and to obtain its correction or deletion in
            appropriate circumstances. You may have the right to object to our
            handling of your information, restrict our processing of your
            information, and to withdraw any consent you have provided. To
            exercise these rights, please email us at support@zrema.in with the
            nature of your request. You also have the right to go directly to
            the relevant supervisory or legal authority, but we encourage you to
            contact us so that we may resolve your concerns directly as best and
            as promptly as we can.
          </p>
        </div>
      ),
    },
    {
      id: "international",
      title: "International Transfers",
      content: (
        <div>
          <p className="mb-2">
            As described above in the "When We Disclose Your Information"
            section, we may share your information with trusted service
            providers or business partners in countries other than your country
            of residence in accordance with applicable law. This means that some
            of your information may be processed in countries that may not offer
            the same level of protection as the privacy laws of your
            jurisdiction. By providing us with your information, you acknowledge
            any such transfer, storage or use. If we provide any information
            about you to any third parties information processors located
            outside of the EEA, we will take appropriate measures to ensure such
            companies protect your information adequately in accordance with
            this Privacy Policy and other data protection laws to govern the
            transfers of such data.
          </p>
        </div>
      ),
    },
    {
      id: "security",
      title: "Security Measures",
      content: (
        <div>
          <p className="mb-2">
            We have implemented technical, physical, and organizational security
            measures to protect against the loss, misuse, and/or alteration of
            your information. These safeguards vary based on the sensitivity of
            the information that we collect and store. However, we cannot and do
            not guarantee that these measures will prevent every unauthorized
            attempt to access, use, or disclose your information since despite
            our efforts, no Internet and/or other electronic transmissions can
            be completely secure.
          </p>
        </div>
      ),
    },
    {
      id: "children",
      title: "Children",
      content: (
        <div>
          <p className="mb-2">
            The Services are intended for users over the age of 18 and are not
            directed at children under the age of 13. If we become aware that we
            have collected personal information (as defined by the Children's
            Online Privacy Protection Act) from children under the age of 13, or
            personal data (as defined by the EU GDPR) from children under the
            age of 16, we will take reasonable steps to delete it as soon as
            practicable.
          </p>
        </div>
      ),
    },
    {
      id: "data-retention",
      title: "Data Retention",
      content: (
        <div>
          <p className="mb-2">
            We retain the information we collect for as long as necessary to
            fulfill the purposes set forth in this Privacy Policy or as long as
            we are legally required or permitted to do so. Information may
            persist in copies made for backup and business continuity purposes
            for additional time.
          </p>
        </div>
      ),
    },
    {
      id: "third-party",
      title: "Third-Party Links and Services",
      content: (
        <div>
          <p className="mb-2">
            The Services may contain links to third-party websites (e.g., social
            media sites like Facebook and Twitter), third party plug-ins (e.g.,
            the Facebook "like" button and Twitter "follow" button), and other
            services. If you choose to use these sites or features, you may
            disclose your information not just to those third-parties, but also
            to their users and the public more generally depending on how their
            services function. Creative Commons is not responsible for the
            content or privacy practices of such third party websites or
            services. The collection, use and disclosure of your information
            will be subject to the privacy policies of the third party websites
            or services, and not this Privacy Policy. We encourage you to read
            the privacy statements of each and every site you visit.
          </p>
        </div>
      ),
    },
    {
      id: "changes",
      title: "Changes to this Privacy Policy",
      content: (
        <div>
          <p className="mb-2">
            We will continue to evaluate this Privacy Policy as we update and
            expand our Services, and we may make changes to the Privacy Policy
            accordingly. We will post any changes here and revise the date last
            updated above. We encourage you to check this page periodically for
            updates to stay informed on how we collect, use and share your
            information. If we make material changes to this Privacy Policy, we
            will provide you with notice as required by law.
          </p>
        </div>
      ),
    },
    {
      id: "questions",
      title: "Questions About this Privacy Policy",
      content: (
        <div>
          <p className="mb-2">
            If you have any questions about this Privacy Policy or our privacy
            practices, you can contact us at: support@zrema.in
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="mt-2 text-gray-600">Last Updated: May 13, 2025</p>
          </div>

          <div className="mb-8">
            <p className="text-gray-700">
              This Privacy Policy ("Policy") explains the information
              collection, use, and sharing practices of zrema Fashions Pvt Ltd
              ("we," "us," and "our"). Unless otherwise stated, this Policy
              describes and governs the information collection, use, and sharing
              practices of zrema Fashions Pvt Ltd with respect to your use of
              our website www.zrema.in and the services ("Services") we provide
              and/or host on our servers.
            </p>
            <p className="mt-4 text-gray-700">
              Before you use or submit any information through or in connection
              with the Services, please carefully review this Privacy Policy. By
              using any part of the Services, you understand that your
              information will be collected, used, and disclosed as outlined in
              this Privacy Policy. If you do not agree to this privacy policy,
              please do not use our Services.
            </p>
          </div>

          <div className="space-y-4">
            {sections.map((section) => (
              <div
                key={section.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none"
                  onClick={() => toggleSection(section.id)}
                >
                  <h3 className="text-lg font-medium text-gray-900">
                    {section.title}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                      expandedSection === section.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {expandedSection === section.id && (
                  <div className="px-4 py-4 bg-white text-gray-700">
                    {section.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">
            © 2025 Zrema Fashions Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
