import { useState } from 'react';
import { ArrowLeft, Shield, Lock, Eye, Database, Users, Bell, Download, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const privacySections = [
    {
      title: "Information We Collect",
      icon: <Database className="text-pink-500" size={28} />,
      subsections: [
        {
          subtitle: "Personal Information",
          content: "When you create an account, we collect your name, email address, date of birth, gender, and contact information. This helps us personalize your experience and communicate with you effectively."
        },
        {
          subtitle: "Fitness and Health Data",
          content: "We collect data you provide about your workouts, exercise routines, calorie intake, weight, height, body measurements, heart rate, and fitness goals. This data is essential for tracking your progress and providing personalized recommendations."
        },
        {
          subtitle: "Usage Information",
          content: "We automatically collect information about how you use our Service, including pages visited, features used, time spent on the platform, and interaction with content. This helps us improve the user experience."
        },
        {
          subtitle: "Device and Technical Data",
          content: "We collect IP address, browser type, operating system, device identifiers, mobile network information, and location data (if you grant permission). This ensures optimal service performance across devices."
        },
        {
          subtitle: "Cookies and Tracking Technologies",
          content: "We use cookies, web beacons, and similar technologies to track user preferences, maintain sessions, and analyze usage patterns. You can control cookie settings through your browser."
        }
      ]
    },
    {
      title: "How We Use Your Information",
      icon: <Eye className="text-blue-500" size={28} />,
      subsections: [
        {
          subtitle: "Service Delivery and Personalization",
          content: "We use your information to provide and maintain the Service, create personalized workout plans, offer nutrition recommendations, track your fitness progress, and customize content to your preferences."
        },
        {
          subtitle: "Communication",
          content: "We send you service-related notifications, updates about new features, promotional materials (with your consent), and responses to your inquiries and support requests."
        },
        {
          subtitle: "Analytics and Improvement",
          content: "We analyze usage patterns to improve our Service, develop new features, enhance user experience, and conduct research on fitness trends and user behavior."
        },
        {
          subtitle: "Safety and Security",
          content: "Your data helps us detect and prevent fraud, protect against unauthorized access, enforce our Terms of Service, and ensure the safety of our community."
        },
        {
          subtitle: "Legal Compliance",
          content: "We may process your information to comply with legal obligations, respond to legal requests, and protect our rights and the rights of others."
        }
      ]
    },
    {
      title: "How We Share Your Information",
      icon: <Users className="text-purple-500" size={28} />,
      subsections: [
        {
          subtitle: "Service Providers",
          content: "We share data with third-party vendors who help us operate the Service, such as cloud hosting providers, payment processors, email service providers, and analytics platforms. These providers are bound by confidentiality agreements."
        },
        {
          subtitle: "Community Features",
          content: "If you participate in community forums or share your progress publicly, certain information (username, profile picture, shared workouts) may be visible to other users. You control what you share."
        },
        {
          subtitle: "Business Transfers",
          content: "In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity. We will notify you of any such change."
        },
        {
          subtitle: "Legal Requirements",
          content: "We may disclose your information if required by law, court order, or governmental request, or to protect the rights, property, or safety of Fitness Sharks, our users, or others."
        },
        {
          subtitle: "With Your Consent",
          content: "We may share your information with third parties when you explicitly consent to such sharing, such as connecting with fitness device manufacturers or social media platforms."
        }
      ]
    },
    {
      title: "Data Security and Protection",
      icon: <Lock className="text-green-500" size={28} />,
      subsections: [
        {
          subtitle: "Security Measures",
          content: "We implement industry-standard security measures including encryption of data in transit and at rest, secure authentication protocols, regular security audits and penetration testing, and access controls limiting employee access to personal data."
        },
        {
          subtitle: "Data Retention",
          content: "We retain your personal information for as long as your account is active or as needed to provide services. After account deletion, we retain certain data for legal compliance, fraud prevention, and legitimate business purposes for a limited period."
        },
        {
          subtitle: "Your Responsibility",
          content: "You are responsible for maintaining the confidentiality of your account credentials. Use strong passwords, enable two-factor authentication if available, and notify us immediately of any unauthorized access."
        }
      ]
    },
    {
      title: "Your Privacy Rights and Choices",
      icon: <Shield className="text-orange-500" size={28} />,
      subsections: [
        {
          subtitle: "Access and Correction",
          content: "You have the right to access your personal information and request corrections to any inaccurate data. You can view and edit most information directly in your account settings."
        },
        {
          subtitle: "Data Deletion",
          content: "You can request deletion of your account and personal data at any time. Some information may be retained as required by law or for legitimate business purposes. To delete your account, go to Settings > Account > Delete Account."
        },
        {
          subtitle: "Data Portability",
          content: "You have the right to receive a copy of your data in a structured, machine-readable format. You can export your fitness data from your account dashboard."
        },
        {
          subtitle: "Marketing Communications",
          content: "You can opt out of promotional emails by clicking the unsubscribe link in any marketing email or adjusting your notification preferences in account settings."
        },
        {
          subtitle: "Cookie Management",
          content: "You can control cookies through your browser settings. Note that disabling cookies may affect the functionality of certain features."
        },
        {
          subtitle: "Location Data",
          content: "You can enable or disable location services through your device settings. Some features may require location data to function properly."
        }
      ]
    },
    {
      title: "Children's Privacy",
      icon: <Users className="text-red-500" size={28} />,
      subsections: [
        {
          subtitle: "Age Restrictions",
          content: "Fitness Sharks is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately."
        },
        {
          subtitle: "Teen Accounts (13-17)",
          content: "Users aged 13-17 may use the Service with parental consent. We recommend parents monitor their teen's use of the Service and discuss online safety and privacy."
        }
      ]
    },
    {
      title: "International Data Transfers",
      icon: <Database className="text-indigo-500" size={28} />,
      subsections: [
        {
          subtitle: "Cross-Border Transfers",
          content: "Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy."
        },
        {
          subtitle: "EU and UK Users",
          content: "For users in the European Union and United Kingdom, we comply with GDPR requirements. We use standard contractual clauses and other approved mechanisms for international data transfers."
        }
      ]
    },
    {
      title: "Third-Party Services and Links",
      icon: <Eye className="text-cyan-500" size={28} />,
      subsections: [
        {
          subtitle: "Third-Party Integrations",
          content: "Our Service may integrate with third-party fitness devices, apps, and services (e.g., heart rate monitors, smartwatches). These third parties have their own privacy policies, and we are not responsible for their practices."
        },
        {
          subtitle: "External Links",
          content: "Our Service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies."
        }
      ]
    },
    {
      title: "Changes to This Privacy Policy",
      icon: <Bell className="text-yellow-500" size={28} />,
      subsections: [
        {
          subtitle: "Policy Updates",
          content: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the new policy on this page and updating the 'Last Updated' date."
        },
        {
          subtitle: "Continued Use",
          content: "Your continued use of the Service after changes to this Privacy Policy constitutes acceptance of the updated policy. We encourage you to review this policy periodically."
        }
      ]
    }
  ];

  const quickActions = [
    { icon: <Download size={20} />, label: "Download Your Data", action: "download" },
    { icon: <Trash2 size={20} />, label: "Delete Your Account", action: "delete" },
    { icon: <Bell size={20} />, label: "Manage Notifications", action: "notifications" },
    { icon: <Lock size={20} />, label: "Privacy Settings", action: "settings" }
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
        <div className="max-w-5xl mx-auto">
          {/* Title Section */}
          <div className="mb-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-pink-500 to-blue-600 rounded-2xl">
                <Shield className="text-white" size={48} />
              </div>
            </div>
            <h1 className="mb-4 text-5xl font-extrabold text-blue-900">Privacy Policy</h1>
            <p className="text-lg text-gray-600">Last Updated: October 23, 2025</p>
            <div className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-pink-500 to-blue-500"></div>
          </div>

          {/* Introduction */}
          <div className="p-8 mb-8 bg-white shadow-lg rounded-2xl">
            <h2 className="mb-4 text-2xl font-bold text-blue-900">Your Privacy Matters to Us</h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              At Fitness Sharks, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our fitness tracking platform and services. 
              We are committed to protecting your personal data and being transparent about our practices.
            </p>
            <p className="leading-relaxed text-gray-700">
              By using Fitness Sharks, you agree to the collection and use of information in accordance with this policy. 
              Please read this policy carefully to understand how we handle your data.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => console.log(`Action: ${action.action}`)}
                className="flex items-center gap-3 p-4 transition transform bg-white shadow-md rounded-xl hover:shadow-lg hover:-translate-y-1"
              >
                <div className="p-2 text-blue-600 rounded-lg bg-gradient-to-br from-pink-100 to-blue-100">
                  {action.icon}
                </div>
                <span className="font-semibold text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>

          {/* Privacy Sections */}
          <div className="space-y-4">
            {privacySections.map((section, index) => (
              <div 
                key={index}
                className="overflow-hidden transition-all duration-300 bg-white shadow-md rounded-xl hover:shadow-lg"
              >
                <button
                  onClick={() => toggleSection(index)}
                  className="flex items-center justify-between w-full p-6 text-left transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-4">
                    {section.icon}
                    <h3 className="text-xl font-bold text-blue-900">{section.title}</h3>
                  </div>
                  {expandedSection === index ? (
                    <ChevronUp className="flex-shrink-0 text-pink-500" size={24} />
                  ) : (
                    <ChevronDown className="flex-shrink-0 text-blue-600" size={24} />
                  )}
                </button>
                
                <div 
                  className={`transition-all duration-300 overflow-hidden ${
                    expandedSection === index ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <div className="pt-4 space-y-6 border-t border-gray-200">
                      {section.subsections.map((subsection, subIndex) => (
                        <div key={subIndex} className="pl-4 border-l-4 border-pink-500">
                          <h4 className="mb-2 text-lg font-bold text-gray-800">{subsection.subtitle}</h4>
                          <p className="leading-relaxed text-gray-700">{subsection.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="p-8 mt-12 text-center bg-gradient-to-r from-blue-600 to-blue-900 rounded-2xl">
            <Shield className="mx-auto mb-4 text-white" size={48} />
            <h3 className="mb-4 text-2xl font-bold text-white">Questions About Your Privacy?</h3>
            <p className="mb-6 text-lg text-blue-100">
              Our privacy team is here to help. Contact us if you have any questions, concerns, or requests 
              regarding your personal data.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button 
                className="px-8 py-3 font-bold text-blue-900 transition transform bg-white rounded-full shadow-lg hover:bg-gray-100 hover:scale-105"
                onClick={() => window.location.href = 'mailto:privacy@fitnesssharks.com'}
              >
                Email Privacy Team
              </button>
              <button 
                className="px-8 py-3 font-bold text-white transition transform border-2 border-white rounded-full hover:bg-white hover:text-blue-900 hover:scale-105"
                onClick={() => console.log('Opening help center')}
              >
                Visit Help Center
              </button>
            </div>
          </div>

          {/* Key Principles */}
          <div className="grid gap-6 mt-12 md:grid-cols-3">
            <div className="p-6 text-center bg-white shadow-md rounded-xl">
              <Lock className="mx-auto mb-4 text-green-500" size={40} />
              <h4 className="mb-2 text-lg font-bold text-gray-800">Secure & Encrypted</h4>
              <p className="text-gray-600">Your data is protected with industry-leading encryption.</p>
            </div>
            <div className="p-6 text-center bg-white shadow-md rounded-xl">
              <Eye className="mx-auto mb-4 text-blue-500" size={40} />
              <h4 className="mb-2 text-lg font-bold text-gray-800">Transparent</h4>
              <p className="text-gray-600">We're clear about what data we collect and how we use it.</p>
            </div>
            <div className="p-6 text-center bg-white shadow-md rounded-xl">
              <Shield className="mx-auto mb-4 text-purple-500" size={40} />
              <h4 className="mb-2 text-lg font-bold text-gray-800">Your Control</h4>
              <p className="text-gray-600">You decide what to share and can delete your data anytime.</p>
            </div>
          </div>

          {/* Compliance Badges */}
          <div className="p-6 mt-12 text-center bg-gradient-to-r from-slate-100 to-blue-50 rounded-xl">
            <p className="mb-4 text-sm font-semibold text-gray-600">WE COMPLY WITH</p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 font-bold text-blue-900 bg-white rounded-full shadow">GDPR</span>
              <span className="px-4 py-2 font-bold text-blue-900 bg-white rounded-full shadow">CCPA</span>
              <span className="px-4 py-2 font-bold text-blue-900 bg-white rounded-full shadow">HIPAA</span>
              <span className="px-4 py-2 font-bold text-blue-900 bg-white rounded-full shadow">SOC 2</span>
            </div>
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