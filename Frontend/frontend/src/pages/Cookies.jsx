import { useState } from 'react';
import { ArrowLeft, Cookie, CheckCircle, XCircle, Settings, Info, Shield, BarChart, Target, Users } from 'lucide-react';

export default function CookiePolicyPage() {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    functional: true,
    analytics: true,
    advertising: true
  });

  const [showBanner, setShowBanner] = useState(true);

  const handleToggle = (type) => {
    if (type === 'essential') return; // Essential cookies cannot be disabled
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleAcceptAll = () => {
    setCookiePreferences({
      essential: true,
      functional: true,
      analytics: true,
      advertising: true
    });
    setShowBanner(false);
    console.log('All cookies accepted');
  };

  const handleRejectNonEssential = () => {
    setCookiePreferences({
      essential: true,
      functional: false,
      analytics: false,
      advertising: false
    });
    setShowBanner(false);
    console.log('Only essential cookies accepted');
  };

  const handleSavePreferences = () => {
    setShowBanner(false);
    console.log('Cookie preferences saved:', cookiePreferences);
  };

  const cookieCategories = [
    {
      name: 'Essential Cookies',
      icon: <Shield className="text-green-500" size={32} />,
      type: 'essential',
      required: true,
      description: 'These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt-out of these cookies.',
      examples: [
        { name: 'session_id', purpose: 'Maintains your session across pages', duration: 'Session' },
        { name: 'auth_token', purpose: 'Keeps you logged in securely', duration: '30 days' },
        { name: 'csrf_token', purpose: 'Protects against cross-site request forgery', duration: 'Session' },
        { name: 'cookie_consent', purpose: 'Remembers your cookie preferences', duration: '1 year' }
      ]
    },
    {
      name: 'Functional Cookies',
      icon: <Settings className="text-blue-500" size={32} />,
      type: 'functional',
      required: false,
      description: 'These cookies enable enhanced functionality and personalization, such as remembering your preferences, language settings, and customizations you make.',
      examples: [
        { name: 'user_preferences', purpose: 'Stores your dashboard layout preferences', duration: '1 year' },
        { name: 'theme_mode', purpose: 'Remembers your dark/light mode preference', duration: '1 year' },
        { name: 'language', purpose: 'Stores your preferred language', duration: '1 year' },
        { name: 'workout_filters', purpose: 'Saves your workout filter settings', duration: '6 months' }
      ]
    },
    {
      name: 'Analytics Cookies',
      icon: <BarChart className="text-purple-500" size={32} />,
      type: 'analytics',
      required: false,
      description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our service.',
      examples: [
        { name: '_ga', purpose: 'Google Analytics - tracks unique visitors', duration: '2 years' },
        { name: '_gid', purpose: 'Google Analytics - distinguishes users', duration: '24 hours' },
        { name: 'page_views', purpose: 'Tracks which pages you visit', duration: '30 days' },
        { name: 'feature_usage', purpose: 'Monitors which features are most popular', duration: '90 days' }
      ]
    },
    {
      name: 'Advertising Cookies',
      icon: <Target className="text-orange-500" size={32} />,
      type: 'advertising',
      required: false,
      description: 'These cookies are used to deliver advertisements that are relevant to you and your interests. They also help limit the number of times you see an ad and measure the effectiveness of advertising campaigns.',
      examples: [
        { name: 'ad_id', purpose: 'Tracks ad impressions and clicks', duration: '90 days' },
        { name: 'retargeting', purpose: 'Enables personalized ads on other sites', duration: '1 year' },
        { name: 'conversion_tracking', purpose: 'Measures ad campaign effectiveness', duration: '30 days' },
        { name: 'third_party_ads', purpose: 'Third-party advertising networks', duration: 'Varies' }
      ]
    }
  ];

  const thirdPartyCookies = [
    { provider: 'Google Analytics', purpose: 'Website analytics and usage tracking', link: 'https://policies.google.com/privacy' },
    { provider: 'Facebook Pixel', purpose: 'Ad conversion tracking and audience building', link: 'https://www.facebook.com/privacy' },
    { provider: 'Stripe', purpose: 'Payment processing and fraud prevention', link: 'https://stripe.com/privacy' },
    { provider: 'YouTube', purpose: 'Video content delivery and engagement tracking', link: 'https://policies.google.com/privacy' },
    { provider: 'Hotjar', purpose: 'User behavior analytics and heatmaps', link: 'https://www.hotjar.com/privacy' }
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
          <div className="flex items-center gap-2 ml-8 text-2xl font-extrabold">
            <span className="text-pink-400">🦈</span> Fitness Sharks
          </div>
        </div>
      </header>

      {/* Cookie Consent Banner */}
      {showBanner && (
        <div className="fixed inset-x-0 bottom-0 z-50 p-6 bg-white border-t-4 border-pink-500 shadow-2xl">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-start gap-4 mb-4">
              <Cookie className="flex-shrink-0 text-pink-500" size={32} />
              <div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">We Value Your Privacy</h3>
                <p className="text-gray-600">
                  We use cookies to enhance your experience, analyze site traffic, and personalize content. 
                  You can customize your preferences or accept all cookies.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 font-semibold text-white transition transform bg-pink-500 rounded-full hover:bg-pink-600 hover:scale-105"
              >
                Accept All Cookies
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="px-6 py-2 font-semibold text-gray-700 transition transform bg-gray-200 rounded-full hover:bg-gray-300 hover:scale-105"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={() => setShowBanner(false)}
                className="px-6 py-2 font-semibold text-blue-600 transition transform border-2 border-blue-600 rounded-full hover:bg-blue-50 hover:scale-105"
              >
                Customize Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Title Section */}
          <div className="mb-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-pink-500 to-orange-600 rounded-2xl">
                <Cookie className="text-white" size={48} />
              </div>
            </div>
            <h1 className="mb-4 text-5xl font-extrabold text-blue-900">Cookie Policy</h1>
            <p className="text-lg text-gray-600">Last Updated: October 23, 2025</p>
            <div className="w-24 h-1 mx-auto mt-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"></div>
          </div>

          {/* Introduction */}
          <div className="p-8 mb-8 bg-white shadow-lg rounded-2xl">
            <h2 className="mb-4 text-2xl font-bold text-blue-900">What Are Cookies?</h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              Cookies are small text files that are placed on your device when you visit our website. They help us 
              provide you with a better experience by remembering your preferences, keeping you logged in, and 
              understanding how you use our service.
            </p>
            <p className="leading-relaxed text-gray-700">
              This Cookie Policy explains what cookies are, how we use them, what types of cookies we use, and how 
              you can control your cookie preferences.
            </p>
          </div>

          {/* Cookie Preference Manager */}
          <div className="p-8 mb-8 bg-gradient-to-br from-blue-50 to-pink-50 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="text-blue-600" size={32} />
              <h2 className="text-2xl font-bold text-blue-900">Manage Your Cookie Preferences</h2>
            </div>
            <p className="mb-6 text-gray-700">
              Choose which types of cookies you'd like to allow. Essential cookies cannot be disabled as they are 
              necessary for the website to function.
            </p>

            <div className="space-y-4">
              {cookieCategories.map((category, index) => (
                <div key={index} className="p-6 bg-white shadow-md rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {category.icon}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                        {category.required && (
                          <span className="text-sm font-semibold text-green-600">Always Active</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle(category.type)}
                      disabled={category.required}
                      className={`relative w-16 h-8 rounded-full transition ${
                        cookiePreferences[category.type]
                          ? 'bg-green-500'
                          : 'bg-gray-300'
                      } ${category.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                          cookiePreferences[category.type] ? 'transform translate-x-8' : ''
                        }`}
                      />
                    </button>
                  </div>
                  <p className="mb-4 text-sm text-gray-600">{category.description}</p>
                  <details className="cursor-pointer">
                    <summary className="font-semibold text-blue-600 hover:text-blue-800">
                      View Cookie Details
                    </summary>
                    <div className="mt-4 space-y-3">
                      {category.examples.map((cookie, idx) => (
                        <div key={idx} className="p-3 border-l-4 border-pink-500 bg-slate-50 rounded">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold text-gray-800">{cookie.name}</p>
                              <p className="text-sm text-gray-600">{cookie.purpose}</p>
                            </div>
                            <span className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                              {cookie.duration}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={handleSavePreferences}
                className="px-8 py-3 font-bold text-white transition transform bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105"
              >
                Save Preferences
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-8 py-3 font-bold text-white transition transform bg-pink-500 rounded-full shadow-lg hover:bg-pink-600 hover:scale-105"
              >
                Accept All
              </button>
            </div>
          </div>

          {/* Third-Party Cookies */}
          <div className="p-8 mb-8 bg-white shadow-lg rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-purple-500" size={32} />
              <h2 className="text-2xl font-bold text-blue-900">Third-Party Cookies</h2>
            </div>
            <p className="mb-6 text-gray-700">
              We use services from trusted third-party providers who may also set cookies on your device. 
              These partners help us improve our service and deliver better experiences.
            </p>
            <div className="space-y-3">
              {thirdPartyCookies.map((provider, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50">
                  <div>
                    <h4 className="font-bold text-gray-800">{provider.provider}</h4>
                    <p className="text-sm text-gray-600">{provider.purpose}</p>
                  </div>
                  <a
                    href={provider.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm font-semibold text-blue-600 transition border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white"
                  >
                    Privacy Policy
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* How to Control Cookies */}
          <div className="p-8 mb-8 bg-white shadow-lg rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Info className="text-blue-500" size={32} />
              <h2 className="text-2xl font-bold text-blue-900">How to Control Cookies</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded">
                <h4 className="mb-2 font-bold text-gray-800">Browser Settings</h4>
                <p className="text-gray-700">
                  Most browsers allow you to control cookies through their settings. You can set your browser to 
                  refuse cookies or delete certain cookies. Note that disabling cookies may affect website functionality.
                </p>
              </div>
              <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded">
                <h4 className="mb-2 font-bold text-gray-800">Opt-Out Tools</h4>
                <p className="text-gray-700">
                  You can opt out of interest-based advertising through industry opt-out tools like the Network 
                  Advertising Initiative (NAI) or Digital Advertising Alliance (DAA).
                </p>
              </div>
              <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded">
                <h4 className="mb-2 font-bold text-gray-800">Mobile Devices</h4>
                <p className="text-gray-700">
                  On mobile devices, you can adjust your privacy settings to limit ad tracking. For iOS, go to 
                  Settings {'>'} Privacy {'>'} Advertising. For Android, go to Settings {'>'} Google {'>'} Ads.
                </p>
              </div>
            </div>
          </div>

          {/* Browser-Specific Instructions */}
          <div className="p-8 mb-8 bg-gradient-to-br from-slate-100 to-blue-50 rounded-2xl">
            <h2 className="mb-6 text-2xl font-bold text-center text-blue-900">Browser-Specific Cookie Instructions</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="mb-2 font-bold text-gray-800">Google Chrome</h4>
                <p className="text-sm text-gray-600">Settings {'>'} Privacy and security {'>'} Cookies and site data</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="mb-2 font-bold text-gray-800">Mozilla Firefox</h4>
                <p className="text-sm text-gray-600">Options {'>'} Privacy & Security {'>'} Cookies and Site Data</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="mb-2 font-bold text-gray-800">Safari</h4>
                <p className="text-sm text-gray-600">Preferences {'>'} Privacy {'>'} Manage Website Data</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="mb-2 font-bold text-gray-800">Microsoft Edge</h4>
                <p className="text-sm text-gray-600">Settings {'>'} Privacy, search, and services {'>'} Cookies</p>
              </div>
            </div>
          </div>

          {/* Updates to Cookie Policy */}
          <div className="p-8 mb-8 bg-white shadow-lg rounded-2xl">
            <h2 className="mb-4 text-2xl font-bold text-blue-900">Updates to This Cookie Policy</h2>
            <p className="mb-4 text-gray-700">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other 
              operational, legal, or regulatory reasons. We will notify you of any material changes by updating 
              the "Last Updated" date at the top of this policy.
            </p>
            <p className="text-gray-700">
              We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies.
            </p>
          </div>

          {/* Contact Section */}
          <div className="p-8 text-center bg-gradient-to-r from-blue-600 to-blue-900 rounded-2xl">
            <Cookie className="mx-auto mb-4 text-white" size={48} />
            <h3 className="mb-4 text-2xl font-bold text-white">Questions About Cookies?</h3>
            <p className="mb-6 text-lg text-blue-100">
              If you have any questions about our use of cookies or this Cookie Policy, please don't hesitate to contact us.
            </p>
            <button 
              className="px-8 py-3 font-bold text-blue-900 transition transform bg-white rounded-full shadow-lg hover:bg-gray-100 hover:scale-105"
              onClick={() => window.location.href = 'mailto:privacy@fitnesssharks.com'}
            >
              Contact Us
            </button>
          </div>

          {/* Quick Summary Cards */}
          <div className="grid gap-6 mt-12 md:grid-cols-2">
            <div className="p-6 bg-white shadow-md rounded-xl">
              <CheckCircle className="mb-4 text-green-500" size={40} />
              <h4 className="mb-2 text-lg font-bold text-gray-800">What We Do</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Use cookies to improve your experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Give you control over your preferences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Be transparent about what data we collect</span>
                </li>
              </ul>
            </div>
            <div className="p-6 bg-white shadow-md rounded-xl">
              <XCircle className="mb-4 text-red-500" size={40} />
              <h4 className="mb-2 text-lg font-bold text-gray-800">What We Don't Do</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Sell your personal data to third parties</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Use cookies to track you across other websites without consent</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Hide our cookie practices from you</span>
                </li>
              </ul>
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
            <button className="text-gray-400 transition hover:text-pink-400">Cookie Policy</button>
          </div>
        </div>
      </footer>
    </div>
  );
}