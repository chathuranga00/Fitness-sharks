import { useState } from 'react';
import { Menu, X, MapPin, Clock, DollarSign, Users, Award, Heart, TrendingUp, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CareersPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [selectedJob, setSelectedJob] = useState(null);
    const navigate = useNavigate();

    const departments = ['All', 'Training', 'Operations', 'Sales', 'Customer Service', 'Management'];

    const benefits = [
        { icon: <Heart className="w-6 h-6" />, title: 'Health & Wellness', desc: 'Free gym membership, health insurance, and wellness programs' },
        { icon: <DollarSign className="w-6 h-6" />, title: 'Competitive Pay', desc: 'Industry-leading salaries with performance bonuses' },
        { icon: <Clock className="w-6 h-6" />, title: 'Flexible Schedule', desc: 'Work-life balance with flexible scheduling options' },
        { icon: <Award className="w-6 h-6" />, title: 'Career Growth', desc: 'Professional development and advancement opportunities' },
        { icon: <Users className="w-6 h-6" />, title: 'Team Culture', desc: 'Supportive, energetic team environment' },
        { icon: <TrendingUp className="w-6 h-6" />, title: 'Training Programs', desc: 'Continuous education and certification support' },
    ];

    const jobListings = [
        {
            id: 1,
            title: 'Personal Trainer',
            department: 'Training',
            location: 'Colombo, Sri Lanka',
            type: 'Full-time',
            salary: 'LKR 80,000 - 150,000/month',
            description: 'We are seeking passionate and certified personal trainers to join our elite training team. Help our members achieve their fitness goals through personalized workout programs and nutrition guidance.',
            requirements: [
                'Certified Personal Trainer (CPT) or equivalent certification',
                '2+ years of personal training experience',
                'Strong knowledge of exercise science and nutrition',
                'Excellent communication and motivational skills',
                'Ability to work with clients of all fitness levels',
            ],
            responsibilities: [
                'Design customized workout programs for clients',
                'Conduct fitness assessments and track progress',
                'Provide nutrition guidance and lifestyle coaching',
                'Demonstrate proper exercise techniques',
                'Maintain a safe and clean training environment',
            ]
        },
        {
            id: 2,
            title: 'Fitness Manager',
            department: 'Management',
            location: 'Colombo, Sri Lanka',
            type: 'Full-time',
            salary: 'LKR 150,000 - 250,000/month',
            description: 'Lead our fitness operations and training team. Oversee daily gym operations, staff management, and ensure exceptional member experiences.',
            requirements: [
                'Bachelor degree in Sports Management or related field',
                '5+ years in fitness management',
                'Strong leadership and organizational skills',
                'Experience with gym operations and staff management',
                'Excellent customer service skills',
            ],
            responsibilities: [
                'Oversee daily gym operations and staff',
                'Develop training programs and staff schedules',
                'Ensure facility maintenance and safety standards',
                'Drive membership growth and retention',
                'Handle member concerns and feedback',
            ]
        },
        {
            id: 3,
            title: 'Group Fitness Instructor',
            department: 'Training',
            location: 'Colombo, Sri Lanka',
            type: 'Part-time',
            salary: 'LKR 2,500 - 5,000/class',
            description: 'Lead energetic and engaging group fitness classes including Zumba, Yoga, Pilates, and CrossFit. Motivate and inspire members in a group setting.',
            requirements: [
                'Group fitness certification in your specialty',
                '1+ years teaching group classes',
                'High energy and motivational personality',
                'Ability to modify exercises for different fitness levels',
                'Strong music sense and timing',
            ],
            responsibilities: [
                'Lead engaging group fitness classes',
                'Create varied and challenging class formats',
                'Ensure participant safety and proper form',
                'Build community among class participants',
                'Maintain class equipment and space',
            ]
        },
        {
            id: 4,
            title: 'Front Desk Coordinator',
            department: 'Customer Service',
            location: 'Colombo, Sri Lanka',
            type: 'Full-time',
            salary: 'LKR 50,000 - 80,000/month',
            description: 'Be the welcoming face of Fitness Sharks. Manage front desk operations, member check-ins, and provide exceptional customer service.',
            requirements: [
                'High school diploma or equivalent',
                'Previous customer service experience preferred',
                'Strong communication and interpersonal skills',
                'Computer proficiency and administrative skills',
                'Friendly, professional demeanor',
            ],
            responsibilities: [
                'Greet members and guests warmly',
                'Process member check-ins and registrations',
                'Answer phones and respond to inquiries',
                'Maintain front desk cleanliness and organization',
                'Assist with membership sales and tours',
            ]
        },
        {
            id: 5,
            title: 'Membership Sales Consultant',
            department: 'Sales',
            location: 'Colombo, Sri Lanka',
            type: 'Full-time',
            salary: 'LKR 60,000 - 120,000/month + Commission',
            description: 'Drive membership growth by connecting with potential members and helping them find the perfect fitness solution. Earn competitive base salary plus generous commissions.',
            requirements: [
                'Previous sales experience, preferably in fitness',
                'Strong interpersonal and persuasion skills',
                'Goal-oriented with proven sales track record',
                'Knowledge of fitness and wellness',
                'Self-motivated and energetic',
            ],
            responsibilities: [
                'Conduct gym tours for potential members',
                'Present membership options and benefits',
                'Meet and exceed monthly sales targets',
                'Follow up with leads and referrals',
                'Build relationships with current members',
            ]
        },
        {
            id: 6,
            title: 'Facility Maintenance Technician',
            department: 'Operations',
            location: 'Colombo, Sri Lanka',
            type: 'Full-time',
            salary: 'LKR 70,000 - 100,000/month',
            description: 'Ensure our world-class facilities remain in top condition. Maintain equipment, facilities, and create a safe, clean environment for members.',
            requirements: [
                'Technical or vocational training in maintenance',
                'Experience with gym equipment repair',
                'Knowledge of HVAC, plumbing, and electrical systems',
                'Strong problem-solving skills',
                'Ability to work independently',
            ],
            responsibilities: [
                'Perform routine equipment maintenance and repairs',
                'Conduct facility inspections and safety checks',
                'Coordinate with vendors for specialized repairs',
                'Maintain inventory of parts and supplies',
                'Respond to maintenance requests promptly',
            ]
        },
    ];

    const filteredJobs = selectedDepartment === 'All'
        ? jobListings
        : jobListings.filter(job => job.department === selectedDepartment);

    const values = [
        { title: 'Passion for Fitness', desc: 'We live and breathe health and wellness' },
        { title: 'Member First', desc: 'Our members success is our success' },
        { title: 'Continuous Growth', desc: 'Always learning, always improving' },
        { title: 'Team Spirit', desc: 'We support and motivate each other' },
    ];

    return (
        <div className="min-h-screen font-sans bg-white">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 text-white shadow-2xl bg-gradient-to-r from-blue-700 to-blue-900">
                <a href="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-wide">
                    <span className="text-pink-400">🦈</span>
                    <span>Fitness Sharks</span>
                </a>

                <div className="items-center hidden gap-8 text-lg font-medium md:flex">
                    <a href="/" className="transition duration-300 hover:text-pink-300">Home</a>
                    <a href="/#features" className="transition duration-300 hover:text-pink-300">Features</a>
                    <a href="/#pricing" className="transition duration-300 hover:text-pink-300">Pricing</a>
                    <a href="/about" className="transition duration-300 hover:text-pink-300">About</a>
                </div>

                <a
                    href="/login"
                    className="hidden px-6 py-2 font-bold text-white transition transform bg-pink-500 rounded-full shadow-lg md:block hover:bg-pink-600 hover:scale-105"
                >
                    LOG IN
                </a>

                <button
                    className="p-2 transition rounded-lg md:hidden hover:bg-blue-800"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="relative z-40 flex flex-col gap-4 p-4 text-white bg-blue-900 shadow-xl md:hidden">
                    <a href="/" className="p-2 transition rounded hover:text-pink-300" onClick={() => setMobileMenuOpen(false)}>Home</a>
                    <a href="/#features" className="p-2 transition rounded hover:text-pink-300" onClick={() => setMobileMenuOpen(false)}>Features</a>
                    <a href="/#pricing" className="p-2 transition rounded hover:text-pink-300" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
                    <a href="/about" className="p-2 transition rounded hover:text-pink-300" onClick={() => setMobileMenuOpen(false)}>About</a>
                    <a href="/login" className="px-6 py-2 mt-2 font-semibold text-center text-white transition bg-pink-500 rounded-full hover:bg-pink-600">LOG IN</a>
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
            <section className="relative px-6 py-24 text-center text-white bg-gradient-to-r from-blue-600 to-blue-900">
                <div className="max-w-4xl mx-auto">
                    <h1 className="mb-6 text-5xl font-extrabold leading-tight md:text-6xl">
                        Join the Fitness Sharks Team
                    </h1>
                    <p className="mb-8 text-xl md:text-2xl">
                        Build your career while helping others transform their lives. We are looking for passionate individuals to join our growing team.
                    </p>
                    <button
                        onClick={() => document.getElementById('openings').scrollIntoView({ behavior: 'smooth' })}
                        className="px-10 py-4 text-xl font-bold text-blue-900 transition transform bg-pink-400 rounded-full shadow-2xl hover:bg-pink-500 hover:scale-105"
                    >
                        View Open Positions
                    </button>
                </div>
            </section>

            {/* Why Join Us */}
            <section className="px-6 py-20 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="mb-4 text-4xl font-bold text-center text-blue-900">Why Work With Us?</h2>
                    <p className="mb-12 text-xl text-center text-gray-600">More than just a job - it is a lifestyle</p>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {benefits.map((benefit, idx) => (
                            <div key={idx} className="p-6 transition duration-300 bg-slate-50 rounded-2xl hover:shadow-xl hover:-translate-y-1">
                                <div className="flex items-center justify-center w-12 h-12 mb-4 text-pink-500 bg-pink-100 rounded-full">
                                    {benefit.icon}
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-blue-900">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="px-6 py-20 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="mb-4 text-4xl font-bold text-center text-blue-900">Our Core Values</h2>
                    <p className="mb-12 text-xl text-center text-gray-600">What drives us every day</p>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {values.map((value, idx) => (
                            <div key={idx} className="p-6 text-center transition duration-300 bg-white border-t-4 border-pink-500 shadow-lg rounded-2xl hover:shadow-xl">
                                <h3 className="mb-3 text-xl font-bold text-blue-900">{value.title}</h3>
                                <p className="text-gray-600">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Job Openings */}
            <section id="openings" className="px-6 py-20 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="mb-4 text-4xl font-bold text-center text-blue-900">Open Positions</h2>
                    <p className="mb-12 text-xl text-center text-gray-600">Find your perfect role</p>

                    {/* Department Filter */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {departments.map((dept) => (
                            <button
                                key={dept}
                                onClick={() => setSelectedDepartment(dept)}
                                className={`px-6 py-2 rounded-full font-semibold transition ${selectedDepartment === dept
                                    ? 'bg-pink-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {dept}
                            </button>
                        ))}
                    </div>

                    {/* Job Listings */}
                    <div className="space-y-6">
                        {filteredJobs.map((job) => (
                            <div
                                key={job.id}
                                className="p-6 transition duration-300 bg-white border border-gray-200 shadow-lg cursor-pointer rounded-2xl hover:shadow-xl hover:border-pink-300"
                                onClick={() => setSelectedJob(selectedJob?.id === job.id ? null : job)}
                            >
                                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                                    <div className="flex-1">
                                        <h3 className="mb-2 text-2xl font-bold text-blue-900">{job.title}</h3>
                                        <div className="flex flex-wrap gap-4 mb-3 text-sm text-gray-600">
                                            <span className="flex items-center gap-1">
                                                <MapPin size={16} /> {job.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={16} /> {job.type}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <DollarSign size={16} /> {job.salary}
                                            </span>
                                        </div>
                                        <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">
                                            {job.department}
                                        </span>
                                    </div>
                                    <button
                                        className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition bg-pink-500 rounded-full hover:bg-pink-600"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            alert('Application form would open here. Integration with your application system needed.');
                                        }}
                                    >
                                        Apply Now <ArrowRight size={18} />
                                    </button>
                                </div>

                                {/* Expanded Job Details */}
                                {selectedJob?.id === job.id && (
                                    <div className="pt-6 mt-6 border-t border-gray-200">
                                        <div className="mb-6">
                                            <h4 className="mb-3 text-lg font-bold text-blue-900">About the Role</h4>
                                            <p className="leading-relaxed text-gray-700">{job.description}</p>
                                        </div>

                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div>
                                                <h4 className="mb-3 text-lg font-bold text-blue-900">Requirements</h4>
                                                <ul className="space-y-2">
                                                    {job.requirements.map((req, idx) => (
                                                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                                                            <span className="text-pink-500">•</span>
                                                            <span>{req}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="mb-3 text-lg font-bold text-blue-900">Responsibilities</h4>
                                                <ul className="space-y-2">
                                                    {job.responsibilities.map((resp, idx) => (
                                                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                                                            <span className="text-blue-500">•</span>
                                                            <span>{resp}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 py-20 text-center text-white bg-gradient-to-r from-pink-500 to-pink-700">
                <div className="max-w-4xl mx-auto">
                    <h2 className="mb-6 text-4xl font-bold">Do not See Your Role?</h2>
                    <p className="mb-8 text-xl">
                        We are always looking for talented individuals. Send us your resume and we will keep you in mind for future opportunities.
                    </p>
                    <button
                        onClick={() => alert('Contact form would open here')}
                        className="px-10 py-4 text-xl font-bold text-pink-600 transition transform bg-white rounded-full shadow-2xl hover:bg-gray-100 hover:scale-105"
                    >
                        Send Your Resume
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-12 text-white bg-slate-900">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="mb-6 text-2xl font-bold text-blue-400">Fitness Sharks</div>
                    <p className="mb-4 text-gray-400">Building careers, transforming lives</p>
                    <div className="flex justify-center gap-6 text-sm text-gray-400">
                        <a href="/" className="hover:text-pink-400">Home</a>
                        <a href="/about" className="hover:text-pink-400">About</a>
                        <a href="/#contact" className="hover:text-pink-400">Contact</a>
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