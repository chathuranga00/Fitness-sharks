import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, HelpCircle, ChevronDown, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [expandedFaq, setExpandedFaq] = useState(null);
    const navigate = useNavigate();

    const contactInfo = [
        {
            icon: <MapPin className="w-8 h-8" />,
            title: 'Visit Us',
            details: ['123 Galle Road', 'Colombo 03', 'Western Province, Sri Lanka'],
            color: 'bg-blue-100 text-blue-600'
        },
        {
            icon: <Phone className="w-8 h-8" />,
            title: 'Call Us',
            details: ['+94 11 234 5678', '+94 77 123 4567', 'Mon-Fri: 5am-11pm', 'Weekends: 6am-10pm'],
            color: 'bg-pink-100 text-pink-600'
        },
        {
            icon: <Mail className="w-8 h-8" />,
            title: 'Email Us',
            details: ['info@fitnesssharks.lk', 'support@fitnesssharks.lk', 'careers@fitnesssharks.lk'],
            color: 'bg-green-100 text-green-600'
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: 'Opening Hours',
            details: ['Monday - Friday: 5am - 11pm', 'Saturday - Sunday: 6am - 10pm', '24/7 for Premium Members'],
            color: 'bg-purple-100 text-purple-600'
        }
    ];

    const faqs = [
        {
            question: 'What are your membership plans?',
            answer: 'We offer flexible membership plans including Day Pass (LKR 7,500), Monthly Membership (LKR 14,700/month), and Annual Membership (LKR 149,700/year with 15% savings). Each plan includes different benefits and access levels.'
        },
        {
            question: 'Do you offer personal training sessions?',
            answer: 'Yes! We have certified personal trainers available for one-on-one sessions. Members get discounted rates, and we offer complimentary fitness assessments for new members.'
        },
        {
            question: 'What facilities do you have?',
            answer: 'Our premium facilities include state-of-the-art cardio and strength equipment, Olympic-size swimming pool, sauna, steam room, group fitness studios, locker rooms, and an on-site nutrition bar.'
        },
        {
            question: 'Can I try the gym before joining?',
            answer: 'Absolutely! We offer Day Passes for LKR 7,500 which gives you full access to all facilities. We also provide free guided tours - just call or visit us to schedule one.'
        },
        {
            question: 'Do you have group fitness classes?',
            answer: 'Yes, we offer a variety of group classes including Yoga, Pilates, Zumba, CrossFit, Spinning, and more. Monthly and Annual members get unlimited access to all classes.'
        },
        {
            question: 'Is parking available?',
            answer: 'Yes, we have ample free parking for all members and visitors. The parking area is well-lit and secure with 24/7 surveillance.'
        },
        {
            question: 'What should I bring for my first visit?',
            answer: 'Bring comfortable workout clothes, athletic shoes, a water bottle, and a towel (or use our complimentary towel service). We provide lockers and showers with toiletries.'
        },
        {
            question: 'Can I freeze my membership?',
            answer: 'Yes, members can freeze their membership for up to 3 months per year for medical reasons or extended travel. Contact our front desk for details.'
        }
    ];

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Create message object with timestamp and ID
        const newMessage = {
            id: Date.now(),
            name: formData.name,
            email: formData.email,
            phone: formData.phone || 'Not provided',
            subject: formData.subject,
            message: formData.message,
            timestamp: new Date().toISOString(),
            status: 'unread',
            priority: formData.subject === 'feedback' ? 'high' : 'normal'
        };

        // Get existing messages from localStorage
        const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        
        // Add new message to the beginning of the array
        const updatedMessages = [newMessage, ...existingMessages];
        
        // Store back to localStorage
        localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));

        alert(`Thank you ${formData.name}! We have received your message and will get back to you within 24 hours.`);
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
    };

    return (
        <div className="min-h-screen font-sans bg-white dark:bg-gray-900 transition-colors duration-300">
            <Navigation />

            {/* Back to Home Button */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition font-semibold"
                    >
                        <ArrowLeft size={20} />
                        Back to Home
                    </button>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative px-6 py-24 text-center text-white bg-gradient-to-r from-blue-600 to-blue-900">
                <div className="max-w-4xl mx-auto">
                    <h1 className="mb-6 text-5xl font-extrabold leading-tight md:text-6xl">
                        Get In Touch
                    </h1>
                    <p className="mb-8 text-xl md:text-2xl">
                        Have questions? We are here to help! Reach out to us and start your fitness journey today.
                    </p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="px-6 py-20 bg-slate-50 dark:bg-gray-800 transition-colors duration-300">
                <div className="max-w-6xl mx-auto">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {contactInfo.map((info, idx) => (
                            <div key={idx} className="p-6 transition duration-300 bg-white dark:bg-gray-700 shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-1">
                                <div className={`flex items-center justify-center w-16 h-16 mb-4 rounded-full ${info.color}`}>
                                    {info.icon}
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-blue-900 dark:text-blue-400">{info.title}</h3>
                                <div className="space-y-2">
                                    {info.details.map((detail, i) => (
                                        <p key={i} className="text-gray-600 dark:text-gray-300">{detail}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Map Section */}
            <section className="px-6 py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
                <div className="grid max-w-6xl gap-12 mx-auto lg:grid-cols-2">
                    {/* Contact Form */}
                    <div>
                        <h2 className="mb-4 text-4xl font-bold text-blue-900 dark:text-blue-400">Send Us a Message</h2>
                        <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">Fill out the form below and we will get back to you within 24 hours.</p>

                        <div className="space-y-6">
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors duration-300"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors duration-300"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors duration-300"
                                    placeholder="+94 77 123 4567"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Subject *</label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors duration-300"
                                >
                                    <option value="">Select a subject</option>
                                    <option value="membership">Membership Inquiry</option>
                                    <option value="tour">Schedule a Tour</option>
                                    <option value="personal-training">Personal Training</option>
                                    <option value="classes">Group Classes</option>
                                    <option value="facilities">Facilities Information</option>
                                    <option value="feedback">Feedback</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none transition-colors duration-300"
                                    placeholder="Tell us how we can help you..."
                                ></textarea>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="flex items-center justify-center w-full gap-2 px-8 py-4 text-lg font-bold text-white transition transform bg-pink-500 rounded-full shadow-lg hover:bg-pink-600 hover:scale-105"
                            >
                                <Send size={20} />
                                Send Message
                            </button>
                        </div>
                    </div>

                    {/* Map & Additional Info */}
                    <div>
                        <h2 className="mb-4 text-4xl font-bold text-blue-900">Find Us</h2>
                        <p className="mb-8 text-lg text-gray-600">Visit our state-of-the-art facility in the heart of Colombo.</p>

                        {/* Map Placeholder */}
                        <div className="mb-8 overflow-hidden bg-gray-200 shadow-lg rounded-2xl h-80">
                            <iframe
                                title="Fitness Sharks Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.80171051271!2d79.82303977910156!3d6.927078699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259698e5c0d43%3A0x5c12a99d9fc6fddf!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>

                        {/* Quick Contact Buttons */}
                        <div className="space-y-4">
                            <a
                                href="tel:+94112345678"
                                className="flex items-center gap-4 p-4 transition duration-300 bg-blue-50 rounded-xl hover:bg-blue-100"
                            >
                                <div className="flex items-center justify-center w-12 h-12 text-white bg-blue-600 rounded-full">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-gray-500">Call Us Now</div>
                                    <div className="text-lg font-bold text-blue-900">+94 11 234 5678</div>
                                </div>
                            </a>

                            <a
                                href="mailto:info@fitnesssharks.lk"
                                className="flex items-center gap-4 p-4 transition duration-300 bg-pink-50 rounded-xl hover:bg-pink-100"
                            >
                                <div className="flex items-center justify-center w-12 h-12 text-white bg-pink-600 rounded-full">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-gray-500">Email Us</div>
                                    <div className="text-lg font-bold text-blue-900">info@fitnesssharks.lk</div>
                                </div>
                            </a>

                            <div className="flex items-center gap-4 p-4 transition duration-300 bg-green-50 rounded-xl">
                                <div className="flex items-center justify-center w-12 h-12 text-white bg-green-600 rounded-full">
                                    <MessageSquare size={24} />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-gray-500">Live Chat</div>
                                    <div className="text-lg font-bold text-blue-900">Available Mon-Fri 9am-6pm</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="px-6 py-20 bg-slate-50">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12 text-center">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-pink-600 bg-pink-100 rounded-full">
                            <HelpCircle size={32} />
                        </div>
                        <h2 className="mb-4 text-4xl font-bold text-blue-900">Frequently Asked Questions</h2>
                        <p className="text-lg text-gray-600">Find quick answers to common questions</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="overflow-hidden bg-white shadow-md rounded-xl">
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                                    className="flex items-center justify-between w-full p-6 text-left transition hover:bg-gray-50"
                                >
                                    <span className="text-lg font-semibold text-blue-900">{faq.question}</span>
                                    <ChevronDown
                                        size={24}
                                        className={`text-pink-500 transition-transform flex-shrink-0 ml-4 ${expandedFaq === idx ? 'transform rotate-180' : ''
                                            }`}
                                    />
                                </button>
                                {expandedFaq === idx && (
                                    <div className="px-6 pb-6">
                                        <p className="leading-relaxed text-gray-700">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>


                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-12 text-white bg-slate-900">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="mb-6 text-2xl font-bold text-blue-400">Fitness Sharks</div>
                    <p className="mb-4 text-gray-400">Transform your life, one workout at a time</p>
                    <div className="flex justify-center gap-6 text-sm text-gray-400">
                        <a href="/" className="hover:text-pink-400">Home</a>
                        <a href="/about" className="hover:text-pink-400">About</a>
                        <a href="/careers" className="hover:text-pink-400">Careers</a>
                        <a href="/privacy" className="hover:text-pink-400">Privacy</a>
                    </div>
                    <div className="pt-6 mt-6 text-sm text-gray-500 border-t border-gray-800">
                        © 2025 Fitness Sharks. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}