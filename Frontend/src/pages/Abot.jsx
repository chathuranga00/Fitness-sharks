import { useState } from 'react';
import { ArrowLeft, Heart, Target, Users, Award, Zap, Globe, TrendingUp, Menu, X, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const categories = ['Workout Plans', 'Nutrition Guide', 'Exercise Library', 'Progress Tracker', 'Community Forum', 'Blog Articles'];

    const teamMembers = [
        { name: 'Sarah Johnson', role: 'CEO & Founder', image: '👩‍💼', bio: 'Former Olympic athlete with 15 years of fitness industry experience' },
        { name: 'Mike Chen', role: 'Head of Training', image: '👨‍🏫', bio: 'Certified personal trainer specializing in strength and conditioning' },
        { name: 'Emma Williams', role: 'Nutrition Expert', image: '👩‍⚕️', bio: 'Registered dietitian with expertise in sports nutrition' },
        { name: 'David Martinez', role: 'Tech Lead', image: '👨‍💻', bio: 'Building innovative fitness technology for 10+ years' },
        { name: 'Lisa Anderson', role: 'Community Manager', image: '👩‍🦰', bio: 'Passionate about building supportive fitness communities' },
        { name: 'James Taylor', role: 'Fitness Coach', image: '👨‍🦱', bio: 'Specializes in HIIT and functional training programs' }
    ];

    const milestones = [
        { year: '2020', title: 'Company Founded', description: 'Started with a vision to make fitness accessible to everyone' },
        { year: '2021', title: '10K Users', description: 'Reached our first 10,000 active members worldwide' },
        { year: '2022', title: 'Mobile App Launch', description: 'Launched iOS and Android apps for on-the-go fitness' },
        { year: '2023', title: '100K Community', description: 'Celebrated 100,000 users achieving their fitness goals' },
        { year: '2024', title: 'Global Expansion', description: 'Expanded to 180+ countries with multilingual support' },
        { year: '2025', title: '500K Strong', description: 'Now serving over 500,000 fitness enthusiasts globally' }
    ];

    const values = [
        { icon: <Heart size={40} />, title: 'Passion for Fitness', description: 'We believe fitness should be enjoyable, accessible, and sustainable for everyone, regardless of their starting point.' },
        { icon: <Users size={40} />, title: 'Community First', description: 'Building a supportive community where members motivate and inspire each other to reach their goals.' },
        { icon: <Target size={40} />, title: 'Results-Driven', description: 'Focused on delivering measurable results through science-backed training and nutrition programs.' },
        { icon: <Zap size={40} />, title: 'Innovation', description: 'Continuously evolving our platform with cutting-edge technology to enhance your fitness experience.' },
        { icon: <Globe size={40} />, title: 'Inclusivity', description: 'Creating a welcoming space for people of all fitness levels, backgrounds, and body types.' },
        { icon: <Award size={40} />, title: 'Excellence', description: 'Committed to providing the highest quality content, coaching, and support to our members.' }
    ];

    const stats = [
        { number: '500K+', label: 'Active Members', icon: '👥' },
        { number: '50M+', label: 'Workouts Completed', icon: '💪' },
        { number: '180+', label: 'Countries Served', icon: '🌍' },
        { number: '4.8★', label: 'User Rating', icon: '⭐' },
        { number: '1M+', label: 'Goals Achieved', icon: '🎯' },
        { number: '24/7', label: 'Support Available', icon: '🛟' }
    ];

    const handlePlaceholderClick = () => console.log("Action triggered");

    return (
        <div className="min-h-screen font-sans bg-white">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 text-white shadow-2xl bg-gradient-to-r from-blue-700 to-blue-900">
                <div className="flex items-center gap-2 text-2xl font-extrabold tracking-wide">
                    <span className="text-pink-400">🦈</span> Fitness Sharks
                </div>

                <div className="items-center hidden gap-8 text-lg font-medium md:flex">
                    <a href="#features" className="transition duration-300 hover:text-pink-300">Features</a>
                    <a href="#dashboard" className="transition duration-300 hover:text-pink-300">Dashboard</a>
                    <a href="#pricing" className="transition duration-300 hover:text-pink-300">Pricing</a>

                    <div className="relative">
                        <button onClick={() => setMoreDropdownOpen(!moreDropdownOpen)} className="flex items-center gap-1 transition duration-300 hover:text-pink-300">
                            More <ChevronDown size={20} className={`transition-transform ${moreDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                        </button>

                        {moreDropdownOpen && (
                            <div className="absolute right-0 w-56 mt-2 overflow-hidden bg-white rounded-lg shadow-2xl top-full">
                                <div className="py-2">
                                    {categories.map((category, idx) => (
                                        <button key={idx} onClick={() => { handlePlaceholderClick(); setMoreDropdownOpen(false); }} className="block w-full px-4 py-2 text-left text-gray-700 transition hover:bg-pink-50 hover:text-pink-600">
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <a href="#contact" className="transition duration-300 hover:text-pink-300">Contact</a>
                </div>

                <button onClick={handlePlaceholderClick} className="hidden px-6 py-2 font-bold text-white transition transform bg-pink-500 rounded-full shadow-lg md:block hover:bg-pink-600 hover:scale-105">
                    LOG IN
                </button>

                <button className="p-2 transition rounded-lg md:hidden hover:bg-blue-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X size={28} className="text-pink-300" /> : <Menu size={28} className="text-pink-300" />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="relative z-40 flex flex-col gap-4 p-4 text-white bg-blue-900 shadow-xl md:hidden">
                    <a href="#features" className="p-2 transition rounded hover:text-pink-300" onClick={() => setMobileMenuOpen(false)}>Features</a>
                    <a href="#dashboard" className="p-2 transition rounded hover:text-pink-300" onClick={() => setMobileMenuOpen(false)}>Dashboard</a>
                    <a href="#pricing" className="p-2 transition rounded hover:text-pink-300" onClick={() => setMobileMenuOpen(false)}>Pricing</a>

                    <div className="pt-2 border-t border-blue-700">
                        <p className="px-2 mb-2 text-sm font-semibold text-pink-300">More Categories</p>
                        {categories.map((category, idx) => (
                            <button key={idx} onClick={() => { handlePlaceholderClick(); setMobileMenuOpen(false); }} className="block w-full px-2 py-2 text-left transition rounded hover:text-pink-300">
                                {category}
                            </button>
                        ))}
                    </div>

                    <a href="#contact" className="p-2 transition rounded hover:text-pink-300" onClick={() => setMobileMenuOpen(false)}>Contact</a>
                    <button onClick={() => { setMobileMenuOpen(false); handlePlaceholderClick(); }} className="px-6 py-2 mt-2 font-semibold text-white transition bg-pink-500 rounded-full hover:bg-pink-600">
                        LOG IN
                    </button>
                </div>
            )}

            {/* Back to Home Button */}
            <div className="px-6 py-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 transition font-semibold"
                    >
                        <ArrowLeft size={20} />
                        Back to Home
                    </button>
                </div>
            </div>

            {/* Hero Section */}
            <section className="px-6 py-24 text-center text-white bg-gradient-to-r from-blue-600 to-blue-900">
                <h1 className="mb-6 text-5xl font-extrabold leading-tight md:text-6xl">About Fitness Sharks</h1>
                <p className="max-w-3xl mx-auto mb-8 text-xl md:text-2xl">
                    Empowering people worldwide to achieve their fitness goals through innovative technology, expert guidance, and a supportive community.
                </p>
                <div className="flex justify-center gap-4">
                    <TrendingUp className="text-pink-300" size={48} />
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="px-6 py-20 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid gap-12 md:grid-cols-2">
                        <div className="p-8 bg-white shadow-lg rounded-2xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-4 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl">
                                    <Target className="text-white" size={40} />
                                </div>
                                <h2 className="text-3xl font-bold text-blue-900">Our Mission</h2>
                            </div>
                            <p className="text-lg leading-relaxed text-gray-700">
                                To make fitness accessible, enjoyable, and effective for everyone by providing world-class training programs,
                                expert nutrition guidance, and a supportive community that celebrates every milestone on your fitness journey.
                            </p>
                        </div>

                        <div className="p-8 bg-white shadow-lg rounded-2xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl">
                                    <Globe className="text-white" size={40} />
                                </div>
                                <h2 className="text-3xl font-bold text-blue-900">Our Vision</h2>
                            </div>
                            <p className="text-lg leading-relaxed text-gray-700">
                                To become the world's most trusted fitness platform, helping millions of people transform their lives through
                                sustainable fitness habits, cutting-edge technology, and a global community that inspires positive change.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="px-6 py-20 bg-gradient-to-r from-blue-600 to-blue-900">
                <div className="max-w-6xl mx-auto">
                    <h2 className="mb-12 text-4xl font-bold text-center text-white">Our Impact in Numbers</h2>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {stats.map((stat, index) => (
                            <div key={index} className="p-8 text-center bg-white shadow-xl rounded-2xl">
                                <div className="mb-4 text-5xl">{stat.icon}</div>
                                <div className="mb-2 text-4xl font-extrabold text-blue-900">{stat.number}</div>
                                <div className="text-lg font-semibold text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Timeline */}
            <section className="px-6 py-20">
                <div className="max-w-6xl mx-auto">
                    <h2 className="mb-4 text-4xl font-bold text-center text-blue-900">Our Journey</h2>
                    <p className="mb-16 text-xl text-center text-gray-600">From a small startup to a global fitness community</p>

                    <div className="relative">
                        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 to-purple-600 transform -translate-x-1/2 hidden md:block"></div>

                        <div className="space-y-12">
                            {milestones.map((milestone, index) => (
                                <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition">
                                            <div className="mb-2 text-3xl font-bold text-pink-600">{milestone.year}</div>
                                            <h3 className="mb-3 text-2xl font-bold text-blue-900">{milestone.title}</h3>
                                            <p className="text-gray-600">{milestone.description}</p>
                                        </div>
                                    </div>
                                    <div className="relative z-10 flex items-center justify-center flex-shrink-0 w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full shadow-lg">
                                        <div className="text-2xl text-white font-bold">{index + 1}</div>
                                    </div>
                                    <div className="flex-1 hidden md:block"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="px-6 py-20 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="mb-4 text-4xl font-bold text-center text-blue-900">Our Core Values</h2>
                    <p className="mb-16 text-xl text-center text-gray-600">The principles that guide everything we do</p>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {values.map((value, index) => (
                            <div key={index} className="p-8 bg-white shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-2 transition duration-300">
                                <div className="flex justify-center mb-6 text-pink-600">
                                    {value.icon}
                                </div>
                                <h3 className="mb-4 text-2xl font-bold text-center text-blue-900">{value.title}</h3>
                                <p className="leading-relaxed text-center text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="px-6 py-20">
                <div className="max-w-6xl mx-auto">
                    <h2 className="mb-4 text-4xl font-bold text-center text-blue-900">Meet Our Team</h2>
                    <p className="mb-16 text-xl text-center text-gray-600">Passionate experts dedicated to your fitness success</p>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="p-6 text-center bg-white shadow-lg rounded-2xl hover:shadow-2xl transition">
                                <div className="flex justify-center mb-4 text-7xl">{member.image}</div>
                                <h3 className="mb-2 text-2xl font-bold text-blue-900">{member.name}</h3>
                                <p className="mb-4 text-lg font-semibold text-pink-600">{member.role}</p>
                                <p className="text-gray-600">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 py-20 text-center text-white bg-gradient-to-r from-pink-500 to-purple-600">
                <div className="max-w-4xl mx-auto">
                    <h2 className="mb-6 text-4xl font-bold md:text-5xl">Join the Fitness Sharks Family</h2>
                    <p className="mb-8 text-xl">
                        Become part of a global community of 500,000+ members transforming their lives through fitness
                    </p>
                    <div className="flex flex-col justify-center gap-4 md:flex-row">
                        <button onClick={handlePlaceholderClick} className="px-10 py-4 text-xl font-bold text-blue-900 transition transform bg-white rounded-full shadow-2xl hover:bg-gray-100 hover:scale-105">
                            Start Your Journey
                        </button>
                        <button onClick={handlePlaceholderClick} className="px-10 py-4 text-xl font-bold text-white transition transform border-2 border-white rounded-full hover:bg-white hover:text-pink-600 hover:scale-105">
                            Contact Us
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-8 text-white bg-slate-900">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-2 mb-4 text-2xl font-extrabold">
                        <span className="text-pink-400">🦈</span> Fitness Sharks
                    </div>
                    <p className="mb-4 text-gray-400">Premium gym and fitness center dedicated to helping you achieve your health and fitness goals.</p>
                    <p className="text-gray-400">© 2025 Fitness Sharks. All rights reserved. Built with passion and code.</p>
                </div>
            </footer>
        </div>
    );
}