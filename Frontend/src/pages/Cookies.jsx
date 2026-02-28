import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, Settings, Shield, Eye } from 'lucide-react';

export default function CookiesPage() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always true, cannot be disabled
    analytics: true,
    marketing: false,
    personalization: true
  });

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const handlePreferenceChange = (type) => {
    if (type === 'essential') return; // Essential cookies cannot be disabled
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const sections = [
    {
      title: "1. What Are Cookies?",
      content: "Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, keeping you logged in, and understanding how you use our Service. Cookies contain information that is transferred to your device's hard drive."
    },
    {
      title: "2. Types of Cookies We Use",
      content: "We use several types of cookies: Essential cookies (necessary for the website to function), Analytics cookies (help us understand how visitors use our site), Marketing cookies (used to deliver relevant advertisements), and Personalization cookies (remember your preferences and settings). Each type serves a different purpose in enhancing your experience."
    },
    {
      title: "3. Essential Cookies",
      content: "These cookies are necessary for our website to function properly and cannot be disabled. They include session cookies that keep you logged in, security cookies that protect against fraud, and functionality cookies that remember your language preferences and other settings you've chosen."
    },
    {
      title: "4. Analytics Cookies",
      content: "We use analytics cookies to understand how visitors interact with our website. These cookies collect information about pages visited, time spent on the site, bounce rates, and traffic sources. This data is aggregated and anonymous, helping us improve our Service and user experience."
    },
    {
      title: "5. Marketing and Advertising Cookies",
      content: "These cookies are used to deliver advertisements that are relevant to you and your interests. They track your browsing habits across websites and help us measure the effectiveness of our advertising campaigns. You can opt out of these cookies without affecting the core functionality of our Service."
    },
    {
      title: "6. Personalization Cookies",
      content: "Personalization cookies remember your preferences and settings to provide a customized experience. They store information like your workout preferences, dashboard layout, notification settings, and other personal choices to make your return visits more convenient and tailored to your needs."
    },
    {
      title: "7. Third-Party Cookies",
      content: "Some cookies on our site are set by third-party services we use, such as Google Analytics, social media platforms, and advertising networks. These third parties have their own privacy policies and cookie practices. We recommend reviewing their policies to understand how they use cookies."
    },
    {
      title: "8. Cookie Duration",
      content: "Cookies can be session cookies (deleted when you close your browser) or persistent cookies (remain on your device for a set period). Session cookies are used for essential functions like keeping you logged in during your visit. Persistent cookies remember your preferences between visits and typically expire after 1-2 years."
    },
    {
      title: "9. Managing Your Cookie Preferences",
      content: "You can control cookies through your browser settings and through our cookie preference center below. Most browsers allow you to block or delete cookies, but this may affect the functionality of our website. You can also opt out of specific types of cookies while keeping others enabled."
    },
    {
      title: "10. Browser Cookie Controls",
      content: "All modern browsers provide cookie management options in their settings. You can typically find these under Privacy or Security settings. Options include blocking all cookies, blocking third-party cookies only, or receiving notifications when cookies are set. Remember that blocking essential cookies may prevent the website from working properly."
    },
    {
      title: "11. Mobile App Data Collection",
      content: "Our mobile applications may use similar technologies to cookies, such as local storage, device identifiers, and SDKs from third-party services. These serve similar purposes to web cookies and are subject to the same privacy controls and preferences you set."
    },
    {
      title: "12. Updates to Cookie Policy",
      content: "We may update this Cookie Policy from time to time to reflect changes in our practices or legal requirements. When we make significant changes, we will notify you through our website or other communication methods. Your continued use of our Service constitutes acceptance of the updated policy."
    }
  ];

  const cookieTypes = [
    {
      name: 'Essential Cookies',
      key: 'essential',
      icon: <Shield className="w-5 h-5 text-green-600" />,
      description: 'Required for basic website functionality and security',
      examples: 'Login sessions, security tokens, language preferences',
      canDisable: false
    },
    {
      name: 'Analytics Cookies',
      key: 'analytics',
      icon: <Eye className="w-5 h-5 text-blue-600" />,
      description: 'Help us understand how you use our website',
      examples: 'Page views, time on site, user journey tracking',
      canDisable: true
    },
    {
      name: 'Marketing Cookies',
      key: 'marketing',
      icon: <Settings className="w-5 h-5 text-purple-600" />,
      description: 'Used to show you relevant advertisements',
      examples: 'Ad targeting, campaign tracking, social media integration',
      canDisable: true
    },
    {
      name: 'Personalization Cookies',
      key: 'personalization',
      icon: <Settings className="w-5 h-5 text-pink-600" />,
      description: 'Remember your preferences and settings',
      examples: 'Dashboard layout, workout preferences, notification settings',
      canDisable: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
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
            <h1 className="mb-4 text-5xl font-extrabold text-blue-900">Cookie Policy</h1>
            <p className="text-lg text-gray-600">Last Updated: October 24, 2025</p>
            <div className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-pink-500 to-blue-500"></div>
          </div>

          {/* Introduction */}
          <div className="p-8 mb-8 bg-white shadow-lg rounded-2xl">
            <h2 className="mb-4 text-2xl font-bold text-blue-900">Understanding Our Cookie Usage</h2>
            <p className="leading-relaxed text-gray-700">
              This Cookie Policy explains how Fitness Sharks uses cookies and similar technologies to recognize you when you visit our website. 
              It explains what these technologies are and why we use them, as well as your rights to control our use of them. 
              By continuing to use our website, you consent to our use of cookies as described in this policy.
            </p>
          </div>

          {/* Cookie Preference Center */}
          <div className="p-8 mb-8 bg-white shadow-lg rounded-2xl">
            <h2 className="mb-6 text-2xl font-bold text-blue-900">Cookie Preference Center</h2>
            <p className="mb-6 text-gray-700">
              Manage your cookie preferences below. Essential cookies cannot be disabled as they are necessary for the website to function.
            </p>
            
            <div className="space-y-4">
              {cookieTypes.map((type) => (
                <div key={type.key} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {type.icon}
                        <h3 className="text-lg font-semibold text-gray-900">{type.name}</h3>
                      </div>
                      <p className="mb-2 text-gray-600">{type.description}</p>
                      <p className="text-sm text-gray-500">Examples: {type.examples}</p>
                    </div>
                    <div className="ml-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cookiePreferences[type.key]}
                          onChange={() => handlePreferenceChange(type.key)}
                          disabled={!type.canDisable}
                          className="sr-only peer"
                        />
                        <div className={`relative w-11 h-6 rounded-full peer transition-colors ${
                          cookiePreferences[type.key] 
                            ? 'bg-blue-600' 
                            : 'bg-gray-200'
                        } ${!type.canDisable ? 'opacity-50 cursor-not-allowed' : 'peer-focus:ring-4 peer-focus:ring-blue-300'}`}>
                          <div className={`absolute top-[2px] left-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform ${
                            cookiePreferences[type.key] ? 'translate-x-full border-white' : ''
                          }`}></div>
                        </div>
                        {!type.canDisable && (
                          <span className="ml-2 text-xs text-gray-500">Required</span>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <button 
                onClick={() => {
                  setCookiePreferences({
                    essential: true,
                    analytics: true,
                    marketing: true,
                    personalization: true
                  });
                }}
                className="px-6 py-2 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Accept All
              </button>
              <button 
                onClick={() => {
                  setCookiePreferences({
                    essential: true,
                    analytics: false,
                    marketing: false,
                    personalization: false
                  });
                }}
                className="px-6 py-2 font-semibold text-blue-600 transition border border-blue-600 rounded-lg hover:bg-blue-50"
              >
                Essential Only
              </button>
              <button 
                className="px-6 py-2 font-semibold text-gray-600 transition border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Save Preferences
              </button>
            </div>
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
                  className={`transition-all duration-300 overflow-hidden ${
                    expandedSection === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
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

          {/* Browser Instructions */}
          <div className="p-8 mt-12 bg-gradient-to-r from-purple-600 to-purple-900 rounded-2xl">
            <h3 className="mb-4 text-2xl font-bold text-white">Browser Cookie Settings</h3>
            <p className="mb-6 text-lg text-purple-100">
              You can also manage cookies directly through your browser settings:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-white bg-opacity-10 rounded-lg">
                <h4 className="mb-2 font-semibold text-white">Chrome & Edge</h4>
                <p className="text-sm text-purple-100">Settings → Privacy and Security → Cookies</p>
              </div>
              <div className="p-4 bg-white bg-opacity-10 rounded-lg">
                <h4 className="mb-2 font-semibold text-white">Firefox</h4>
                <p className="text-sm text-purple-100">Options → Privacy & Security → Cookies</p>
              </div>
              <div className="p-4 bg-white bg-opacity-10 rounded-lg">
                <h4 className="mb-2 font-semibold text-white">Safari</h4>
                <p className="text-sm text-purple-100">Preferences → Privacy → Cookies</p>
              </div>
              <div className="p-4 bg-white bg-opacity-10 rounded-lg">
                <h4 className="mb-2 font-semibold text-white">Mobile Browsers</h4>
                <p className="text-sm text-purple-100">Settings → Site Settings → Cookies</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="p-8 mt-8 text-center bg-gradient-to-r from-blue-600 to-blue-900 rounded-2xl">
            <h3 className="mb-4 text-2xl font-bold text-white">Questions About Cookies?</h3>
            <p className="mb-6 text-lg text-blue-100">
              Contact us if you have any questions about our cookie usage or need help managing your preferences.
            </p>
            <button 
              className="px-8 py-3 font-bold text-blue-900 transition transform bg-white rounded-full shadow-lg hover:bg-gray-100 hover:scale-105"
              onClick={() => window.location.href = 'mailto:privacy@fitnesssharks.com'}
            >
              Contact Support
            </button>
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