import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';

export default function TermsPage() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using Fitness Sharks ('the Service'), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these Terms of Service, please do not use this service."
    },
    {
      title: "2. Description of Service",
      content: "Fitness Sharks provides users with access to fitness tracking tools, workout plans, nutrition guides, and community features. The Service may include advertisements and promotional content. Fitness Sharks reserves the right to modify, suspend, or discontinue the Service at any time without notice."
    },
    {
      title: "3. User Accounts and Registration",
      content: "To access certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must notify us immediately of any unauthorized use of your account."
    },
    {
      title: "4. User Conduct and Responsibilities",
      content: "You agree not to use the Service to: (a) upload or transmit any harmful, threatening, abusive, or illegal content; (b) impersonate any person or entity; (c) interfere with or disrupt the Service; (d) attempt to gain unauthorized access to any portion of the Service; (e) use the Service for any commercial purposes without our written consent; (f) violate any applicable laws or regulations."
    },
    {
      title: "5. Health and Fitness Disclaimer",
      content: "The information provided by Fitness Sharks is for general informational purposes only. We are not medical professionals, and the Service does not provide medical advice. Always consult with a qualified healthcare professional before starting any fitness program. You use the Service at your own risk, and we are not responsible for any injuries or health issues that may arise from following our workout plans or nutrition advice."
    },
    {
      title: "6. Subscription and Payment Terms",
      content: "Some features of the Service require a paid subscription. By purchasing a subscription, you agree to pay all applicable fees. Subscriptions automatically renew unless cancelled before the renewal date. Free trial subscriptions may be cancelled at any time before the trial period ends to avoid charges. All fees are non-refundable except as required by law."
    },
    {
      title: "7. Intellectual Property Rights",
      content: "All content on Fitness Sharks, including text, graphics, logos, images, videos, and software, is the property of Fitness Sharks or its content suppliers and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission."
    },
    {
      title: "8. User-Generated Content",
      content: "You retain ownership of content you post to the Service, but you grant Fitness Sharks a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display your content in connection with the Service. You represent that you have all necessary rights to grant this license. We reserve the right to remove any content that violates these Terms."
    },
    {
      title: "9. Privacy and Data Collection",
      content: "Your use of the Service is also governed by our Privacy Policy. We collect and process personal data as described in the Privacy Policy, including fitness data, health metrics, and usage information. By using the Service, you consent to such collection and processing in accordance with our Privacy Policy."
    },
    {
      title: "10. Third-Party Services and Links",
      content: "The Service may contain links to third-party websites or services that are not owned or controlled by Fitness Sharks. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. You acknowledge and agree that we shall not be liable for any damage or loss caused by your use of any third-party content."
    },
    {
      title: "11. Limitation of Liability",
      content: "To the maximum extent permitted by law, Fitness Sharks shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses resulting from your use of the Service. Our total liability shall not exceed the amount you paid to us in the twelve months prior to the claim."
    },
    {
      title: "12. Warranty Disclaimer",
      content: "The Service is provided 'as is' and 'as available' without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the Service will be uninterrupted, secure, or error-free."
    },
    {
      title: "13. Indemnification",
      content: "You agree to indemnify, defend, and hold harmless Fitness Sharks and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the Service or violation of these Terms."
    },
    {
      title: "14. Termination",
      content: "We reserve the right to terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use the Service will immediately cease. Sections that by their nature should survive termination shall survive."
    },
    {
      title: "15. Changes to Terms",
      content: "Fitness Sharks reserves the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the 'Last Updated' date. Your continued use of the Service after changes constitutes acceptance of the modified Terms."
    },
    {
      title: "16. Governing Law and Dispute Resolution",
      content: "These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions. Any disputes arising from these Terms or the Service shall be resolved through binding arbitration, except where prohibited by law."
    },
    {
      title: "17. Contact Information",
      content: "If you have any questions about these Terms of Service, please contact us at: Email: legal@fitnesssharks.com, Address: Fitness Sharks Legal Department, [Your Address], Phone: [Your Phone Number]"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 px-6 py-4 text-white shadow-lg bg-gradient-to-r from-blue-700 to-blue-900">
        <div className="flex items-center max-w-6xl mx-auto">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 transition rounded-lg hover:bg-blue-800"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Back</span>
          </button>
          <div className="flex items-center gap-2 ml-8 text-2xl font-extrabold min-w-0 flex-shrink-0">
            <span className="text-pink-400">🦈</span> 
            <span className="whitespace-nowrap">Fitness Sharks</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-5xl font-extrabold text-blue-900">Terms of Service</h1>
            <p className="text-lg text-gray-600">Last Updated: October 23, 2025</p>
            <div className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-pink-500 to-blue-500"></div>
          </div>

          {/* Introduction */}
          <div className="p-8 mb-8 bg-white shadow-lg rounded-2xl">
            <h2 className="mb-4 text-2xl font-bold text-blue-900">Welcome to Fitness Sharks</h2>
            <p className="leading-relaxed text-gray-700">
              These Terms of Service ("Terms") govern your access to and use of the Fitness Sharks website,
              mobile applications, and related services (collectively, the "Service"). Please read these Terms
              carefully before using our Service. By accessing or using the Service, you agree to be bound by
              these Terms.
            </p>
          </div>

          {/* Accordion Sections */}
          <div className="space-y-4">
            {sections.map((section, index) => (
              <div
                key={index}
                className="overflow-hidden transition-all duration-300 bg-white shadow-md rounded-xl hover:shadow-lg"
              >
                <button
                  onClick={() => toggleSection(index)}
                  className="flex items-center justify-between w-full p-6 text-left transition hover:bg-slate-50"
                >
                  <h3 className="text-xl font-bold text-blue-900">{section.title}</h3>
                  {expandedSection === index ? (
                    <ChevronUp className="flex-shrink-0 text-pink-500" size={24} />
                  ) : (
                    <ChevronDown className="flex-shrink-0 text-blue-600" size={24} />
                  )}
                </button>

                <div
                  className={`transition-all duration-300 overflow-hidden ${expandedSection === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-gray-200">
                      <p className="leading-relaxed text-gray-700">{section.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Acceptance Section */}
          <div className="p-8 mt-12 text-center bg-gradient-to-r from-blue-600 to-blue-900 rounded-2xl">
            <h3 className="mb-4 text-2xl font-bold text-white">Questions About Our Terms?</h3>
            <p className="mb-6 text-lg text-blue-100">
              We're here to help. Contact our legal team if you have any questions or concerns.
            </p>
            <button
              className="px-8 py-3 font-bold text-blue-900 transition transform bg-white rounded-full shadow-lg hover:bg-gray-100 hover:scale-105"
              onClick={() => window.location.href = 'mailto:legal@fitnesssharks.com'}
            >
              Contact Legal Team
            </button>
          </div>

          {/* Agreement Checkbox */}
          <div className="p-6 mt-8 border-2 border-pink-200 bg-pink-50 rounded-xl">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 mt-1 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
              />
              <span className="text-gray-700">
                I have read and agree to the Terms of Service and understand that by using Fitness Sharks,
                I am bound by these terms.
              </span>
            </label>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 mt-16 text-white bg-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">© 2025 Fitness Sharks. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <button className="text-gray-400 transition hover:text-pink-400">Privacy Policy</button>
            <button className="text-gray-400 transition hover:text-pink-400">Terms of Service</button>
            <button className="text-gray-400 transition hover:text-pink-400">Contact Us</button>
          </div>
        </div>
      </footer>
    </div>
  );
}