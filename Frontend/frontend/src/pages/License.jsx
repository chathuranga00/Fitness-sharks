import { useState } from 'react';
import { ArrowLeft, FileText, Code, Award, Users, CheckCircle, XCircle, Download, ExternalLink, AlertTriangle } from 'lucide-react';

export default function LicensePage() {
  const [activeTab, setActiveTab] = useState('content');

  const contentLicenseTerms = [
    { allowed: true, term: 'View and access content for personal use' },
    { allowed: true, term: 'Share workout results and achievements on social media' },
    { allowed: true, term: 'Print materials for personal fitness tracking' },
    { allowed: true, term: 'Create personal backups of your data' },
    { allowed: false, term: 'Redistribute or sell Fitness Sharks content' },
    { allowed: false, term: 'Remove copyright notices or attribution' },
    { allowed: false, term: 'Use content for commercial purposes without permission' },
    { allowed: false, term: 'Create derivative works for public distribution' }
  ];

  const softwareLicenseTerms = [
    { allowed: true, term: 'Use the software for personal fitness tracking' },
    { allowed: true, term: 'Access software updates and new features' },
    { allowed: true, term: 'Use on multiple devices with same account' },
    { allowed: true, term: 'Export your personal data' },
    { allowed: false, term: 'Reverse engineer or decompile the software' },
    { allowed: false, term: 'Modify or create derivative versions' },
    { allowed: false, term: 'Distribute or sublicense the software' },
    { allowed: false, term: 'Use for competitive analysis' }
  ];

  const mediaLicenseTerms = [
    { allowed: true, term: 'Use logos for linking to our website' },
    { allowed: true, term: 'Include in reviews or educational content' },
    { allowed: true, term: 'Share screenshots with attribution' },
    { allowed: false, term: 'Use in your own branding or products' },
    { allowed: false, term: 'Modify logos or brand assets' },
    { allowed: false, term: 'Imply endorsement without permission' }
  ];

  const openSourceLibraries = [
    { name: 'React', version: '18.2.0', license: 'MIT License', url: 'https://github.com/facebook/react' },
    { name: 'Tailwind CSS', version: '3.4.0', license: 'MIT License', url: 'https://github.com/tailwindlabs/tailwindcss' },
    { name: 'Lucide React', version: '0.263.1', license: 'ISC License', url: 'https://github.com/lucide-icons/lucide' },
    { name: 'Chart.js', version: '4.4.0', license: 'MIT License', url: 'https://github.com/chartjs/Chart.js' },
    { name: 'React Router', version: '6.20.0', license: 'MIT License', url: 'https://github.com/remix-run/react-router' },
    { name: 'Axios', version: '1.6.0', license: 'MIT License', url: 'https://github.com/axios/axios' }
  ];

  const tabs = [
    { id: 'content', label: 'Content License', icon: <FileText size={20} /> },
    { id: 'software', label: 'Software License', icon: <Code size={20} /> },
    { id: 'media', label: 'Media & Brand', icon: <Award size={20} /> },
    { id: 'opensource', label: 'Open Source', icon: <Users size={20} /> }
  ];

  const renderLicenseTerms = (terms) => (
    <div className="space-y-3">
      {terms.map((term, index) => (
        <div
          key={index}
          className={`flex items-start gap-3 p-4 rounded-lg border-l-4 ${
            term.allowed
              ? 'bg-green-50 border-green-500'
              : 'bg-red-50 border-red-500'
          }`}
        >
          {term.allowed ? (
            <CheckCircle className="flex-shrink-0 text-green-600" size={24} />
          ) : (
            <XCircle className="flex-shrink-0 text-red-600" size={24} />
          )}
          <span className="text-gray-700">{term.term}</span>
        </div>
      ))}
    </div>
  );

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

      {/* Main Content */}
      <main className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Title Section */}
          <div className="mb-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                <FileText className="text-white" size={48} />
              </div>
            </div>
            <h1 className="mb-4 text-5xl font-extrabold text-blue-900">License Agreement</h1>
            <p className="text-lg text-gray-600">Effective Date: October 23, 2025</p>
            <div className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </div>

          {/* Introduction */}
          <div className="p-8 mb-8 bg-white shadow-lg rounded-2xl">
            <h2 className="mb-4 text-2xl font-bold text-blue-900">License Overview</h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              This License Agreement governs your use of Fitness Sharks' platform, including our software, content, 
              media assets, and intellectual property. By using our service, you agree to abide by the terms of this license.
            </p>
            <p className="leading-relaxed text-gray-700">
              We grant you a limited, non-exclusive, non-transferable license to access and use our service for 
              personal, non-commercial purposes, subject to the terms and conditions outlined below.
            </p>
          </div>

          {/* License Type Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-100 to-blue-100 rounded-2xl">
              <Award className="text-blue-600" size={32} />
              <div>
                <p className="text-sm font-semibold text-gray-600">License Type</p>
                <p className="text-xl font-bold text-blue-900">Proprietary Software License</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8 overflow-hidden bg-white shadow-lg rounded-2xl">
            <div className="flex overflow-x-auto border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold whitespace-nowrap transition ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-8">
              {activeTab === 'content' && (
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <FileText className="flex-shrink-0 text-blue-600" size={32} />
                    <div>
                      <h3 className="mb-2 text-2xl font-bold text-blue-900">Content License</h3>
                      <p className="text-gray-600">
                        All content on Fitness Sharks, including workout plans, nutrition guides, articles, videos, 
                        and educational materials are protected by copyright and other intellectual property laws.
                      </p>
                    </div>
                  </div>
                  <div className="p-6 mb-6 border-l-4 border-blue-500 rounded bg-blue-50">
                    <h4 className="mb-2 font-bold text-blue-900">Copyright Notice</h4>
                    <p className="text-gray-700">© 2025 Fitness Sharks. All Rights Reserved.</p>
                    <p className="mt-2 text-sm text-gray-600">
                      Unauthorized reproduction, distribution, or modification of content is strictly prohibited.
                    </p>
                  </div>
                  {renderLicenseTerms(contentLicenseTerms)}
                </div>
              )}

              {activeTab === 'software' && (
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <Code className="flex-shrink-0 text-purple-600" size={32} />
                    <div>
                      <h3 className="mb-2 text-2xl font-bold text-blue-900">Software License</h3>
                      <p className="text-gray-600">
                        The Fitness Sharks application, including all code, algorithms, and technical implementations, 
                        is proprietary software owned by Fitness Sharks.
                      </p>
                    </div>
                  </div>
                  <div className="p-6 mb-6 border-l-4 border-purple-500 rounded bg-purple-50">
                    <h4 className="mb-2 font-bold text-purple-900">Grant of License</h4>
                    <p className="text-gray-700">
                      Subject to your compliance with these terms, we grant you a limited, revocable, non-exclusive, 
                      non-transferable license to download, install, and use the software on devices you own or control.
                    </p>
                  </div>
                  {renderLicenseTerms(softwareLicenseTerms)}
                  <div className="p-6 mt-6 border border-yellow-300 rounded-lg bg-yellow-50">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="flex-shrink-0 text-yellow-600" size={24} />
                      <div>
                        <h4 className="mb-2 font-bold text-yellow-900">License Restrictions</h4>
                        <p className="text-sm text-yellow-800">
                          This license does not grant you any ownership rights to the software. We retain all rights, 
                          title, and interest in and to the software and all modifications, enhancements, and derivative works.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'media' && (
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <Award className="flex-shrink-0 text-pink-600" size={32} />
                    <div>
                      <h3 className="mb-2 text-2xl font-bold text-blue-900">Media & Brand Assets License</h3>
                      <p className="text-gray-600">
                        Our logos, trademarks, brand names, and other brand assets are the property of Fitness Sharks 
                        and are protected by trademark laws.
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-4 mb-6 md:grid-cols-2">
                    <div className="p-6 border-2 border-pink-200 bg-pink-50 rounded-xl">
                      <h4 className="mb-3 font-bold text-pink-900">Brand Assets Include</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                          <span className="text-pink-500">•</span> Fitness Sharks logo and shark emoji
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-pink-500">•</span> Brand name and taglines
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-pink-500">•</span> Color schemes and design elements
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-pink-500">•</span> Product screenshots and promotional images
                        </li>
                      </ul>
                    </div>
                    <div className="p-6 border-2 border-blue-200 bg-blue-50 rounded-xl">
                      <h4 className="mb-3 font-bold text-blue-900">Trademark Information</h4>
                      <p className="mb-2 text-sm text-gray-700">
                        <strong>Fitness Sharks™</strong> is a registered trademark.
                      </p>
                      <p className="text-sm text-gray-700">
                        Registration Number: <span className="font-mono">FS-2025-001</span>
                      </p>
                      <p className="mt-2 text-xs text-gray-600">
                        Unauthorized use of trademarks may violate trademark laws.
                      </p>
                    </div>
                  </div>
                  {renderLicenseTerms(mediaLicenseTerms)}
                </div>
              )}

              {activeTab === 'opensource' && (
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <Users className="flex-shrink-0 text-green-600" size={32} />
                    <div>
                      <h3 className="mb-2 text-2xl font-bold text-blue-900">Open Source Attributions</h3>
                      <p className="text-gray-600">
                        Fitness Sharks is built using various open source libraries and frameworks. We are grateful 
                        to the open source community and comply with all relevant licenses.
                      </p>
                    </div>
                  </div>
                  <div className="p-6 mb-6 border-l-4 border-green-500 rounded bg-green-50">
                    <h4 className="mb-2 font-bold text-green-900">Open Source Commitment</h4>
                    <p className="text-gray-700">
                      We respect and honor the licenses of all open source software we use. Each library listed below 
                      is licensed under its respective open source license.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {openSourceLibraries.map((lib, index) => (
                      <div key={index} className="p-6 transition bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">{lib.name}</h4>
                            <p className="text-sm text-gray-500">Version {lib.version}</p>
                          </div>
                          <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                            {lib.license}
                          </span>
                        </div>
                        <a
                          href={lib.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                        >
                          View on GitHub <ExternalLink size={16} />
                        </a>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <h4 className="mb-3 font-bold text-blue-900">Common Open Source Licenses</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <h5 className="mb-2 font-bold text-gray-800">MIT License</h5>
                        <p className="text-sm text-gray-600">
                          Permissive license allowing commercial use, modification, distribution, and private use.
                        </p>
                      </div>
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <h5 className="mb-2 font-bold text-gray-800">ISC License</h5>
                        <p className="text-sm text-gray-600">
                          Similar to MIT, functionally equivalent with simpler language.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* License Summary Cards */}
          <div className="grid gap-6 mb-8 md:grid-cols-3">
            <div className="p-6 text-center bg-white shadow-md rounded-xl">
              <CheckCircle className="mx-auto mb-4 text-green-500" size={40} />
              <h4 className="mb-2 text-lg font-bold text-gray-800">Personal Use</h4>
              <p className="text-sm text-gray-600">Use our service for your personal fitness journey</p>
            </div>
            <div className="p-6 text-center bg-white shadow-md rounded-xl">
              <XCircle className="mx-auto mb-4 text-red-500" size={40} />
              <h4 className="mb-2 text-lg font-bold text-gray-800">No Redistribution</h4>
              <p className="text-sm text-gray-600">Content and software cannot be redistributed</p>
            </div>
            <div className="p-6 text-center bg-white shadow-md rounded-xl">
              <Award className="mx-auto mb-4 text-blue-500" size={40} />
              <h4 className="mb-2 text-lg font-bold text-gray-800">Protected IP</h4>
              <p className="text-sm text-gray-600">All intellectual property is protected by law</p>
            </div>
          </div>

          {/* License Termination */}
          <div className="p-8 mb-8 bg-white shadow-lg rounded-2xl">
            <h2 className="mb-4 text-2xl font-bold text-blue-900">License Termination</h2>
            <p className="mb-4 text-gray-700">
              This license is effective until terminated. Your rights under this license will terminate automatically 
              without notice if you fail to comply with any of its terms.
            </p>
            <div className="p-4 border-l-4 border-orange-500 rounded bg-orange-50">
              <h4 className="mb-2 font-bold text-orange-900">Upon Termination</h4>
              <p className="text-gray-700">
                You must cease all use of the software and destroy all copies in your possession. Provisions regarding 
                intellectual property rights, disclaimers, and limitations of liability survive termination.
              </p>
            </div>
          </div>

          {/* Commercial Licensing */}
          <div className="p-8 mb-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
            <h2 className="mb-4 text-2xl font-bold text-blue-900">Commercial & Enterprise Licensing</h2>
            <p className="mb-6 text-gray-700">
              Interested in using Fitness Sharks for your business, gym, or organization? We offer custom commercial 
              licenses with additional features and support.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="mb-2 font-bold text-gray-800">Commercial Benefits</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={16} />
                    White-label options available
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={16} />
                    Dedicated support team
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={16} />
                    Custom integrations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={16} />
                    Volume discounts
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow">
                <button className="px-8 py-3 font-bold text-white transition transform rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105">
                  Contact Admin
                </button>
              </div>
            </div>
          </div>

          {/* Download License Documents */}
          <div className="p-8 mb-8 text-center bg-white shadow-lg rounded-2xl">
            <Download className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="mb-4 text-2xl font-bold text-blue-900">Download License Documents</h3>
            <p className="mb-6 text-gray-600">
              Need a copy of our license agreement for your records? Download the full legal documents below.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 font-semibold text-blue-600 transition border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white">
                Download License (PDF)
              </button>
              <button className="px-6 py-3 font-semibold text-blue-600 transition border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white">
                Download Attributions (TXT)
              </button>
            </div>
          </div>

          {/* Contact Section */}
          <div className="p-8 text-center bg-gradient-to-r from-blue-600 to-blue-900 rounded-2xl">
            <FileText className="mx-auto mb-4 text-white" size={48} />
            <h3 className="mb-4 text-2xl font-bold text-white">Questions About Licensing?</h3>
            <p className="mb-6 text-lg text-blue-100">
              Our legal team is here to help with any licensing questions or special requests.
            </p>
            <button 
              className="px-8 py-3 font-bold text-blue-900 transition transform bg-white rounded-full shadow-lg hover:bg-gray-100 hover:scale-105"
              onClick={() => window.location.href = 'mailto:legal@fitnesssharks.com'}
            >
              Contact Legal Team
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
            <button className="text-gray-400 transition hover:text-pink-400">License Agreement</button>
          </div>
        </div>
      </footer>
    </div>
  );
}