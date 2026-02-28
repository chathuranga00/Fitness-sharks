import { useState } from 'react';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();

    const categories = [
        { name: 'Workout Plans', path: '/workout-plans' },
        { name: 'Nutrition Guide', path: '/nutrition-guide' },
        { name: 'Exercise Library', path: '/exercise-library' },
        { name: 'Our Trainers', path: '/trainers' },

        { name: 'Community Forum', path: '/community-forum' }
    ];

    const handleCategoryClick = (path) => {
        setMoreDropdownOpen(false);
        setMobileMenuOpen(false);
        navigate(path);
    };

    const scrollToSection = (sectionId) => {
        if (window.location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handleLogout = () => {
        setProfileMenuOpen(false);
        logout();
        navigate('/');
    };

    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 text-white shadow-2xl bg-gradient-to-r from-blue-700 to-blue-900">
            {/* Logo */}
            <button 
                onClick={() => navigate('/')} 
                className="flex items-center gap-2 text-2xl font-extrabold tracking-wide"
            >
                <span className="text-pink-400">🦈</span>
                <span>Fitness Sharks</span>
            </button>

            {/* Desktop Menu */}
            <div className="items-center hidden gap-8 text-lg font-medium md:flex">
                <button onClick={() => navigate('/')} className="transition duration-300 hover:text-pink-300">Home</button>
                <button onClick={() => navigate('/trainers')} className="transition duration-300 hover:text-pink-300">Trainers</button>
                <button onClick={() => scrollToSection('features')} className="transition duration-300 hover:text-pink-300">Features</button>
                <button onClick={() => scrollToSection('pricing')} className="transition duration-300 hover:text-pink-300">Pricing</button>

                {/* More Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                        className="flex items-center gap-1 transition duration-300 hover:text-pink-300"
                    >
                        More <ChevronDown size={16} className={`transition-transform ${moreDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                    </button>
                    {moreDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50 transition-colors duration-300">
                            {categories.map((category, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleCategoryClick(category.path)}
                                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                >
                                    {category.name}
                                </button>
                            ))}
                            <hr className="my-2 dark:border-gray-600" />
                            <button
                                onClick={() => handleCategoryClick('/about')}
                                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            >
                                About Us
                            </button>
                            <button
                                onClick={() => handleCategoryClick('/careers')}
                                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            >
                                Careers
                            </button>
                            <button
                                onClick={() => handleCategoryClick('/contact')}
                                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            >
                                Contact
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Profile/Login Section */}
            <div className="flex items-center gap-4 hidden md:flex">
                {/* Dark Mode Toggle */}
                <button
                    onClick={() => {
                      console.log('Dark mode button clicked in Navigation, current state:', isDarkMode);
                      toggleTheme();
                    }}
                    className="p-2 transition duration-300 rounded-lg hover:bg-blue-800 border border-white/20"
                    title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-blue-200" />}
                </button>

                {isAuthenticated ? (
                <div className="relative hidden md:block">
                    <button
                        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                        className="flex items-center gap-3 px-3 py-2 transition rounded-full hover:bg-blue-800"
                    >
                        <div className="flex items-center justify-center font-bold text-blue-900 bg-pink-300 rounded-full w-9 h-9">
                            {(user?.username || user?.fullName || 'U').slice(0, 1).toUpperCase()}
                        </div>
                        <span className="font-semibold">{user?.username || user?.fullName || 'User'}</span>
                        <ChevronDown size={16} className={`transition-transform ${profileMenuOpen ? 'rotate-180' : 'rotate-0'}`} />
                    </button>
                    {profileMenuOpen && (
                        <div className="absolute right-0 w-48 mt-2 overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-2xl transition-colors duration-300">
                            <button
                                className="block w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 transition hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => {
                                    setProfileMenuOpen(false);
                                    navigate('/profile');
                                }}
                            >
                                My Profile
                            </button>

                            {user?.userType === 'admin' && (
                                <button
                                    className="block w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 transition hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => {
                                        setProfileMenuOpen(false);
                                        navigate('/admin-dashboard');
                                    }}
                                >
                                    Admin Dashboard
                                </button>
                            )}
                            <hr className="my-1 dark:border-gray-600" />
                            <button
                                className="block w-full px-4 py-2 text-left text-red-600 dark:text-red-400 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className="px-6 py-2 font-bold text-white transition transform bg-pink-500 rounded-full shadow-lg hover:bg-pink-600 hover:scale-105"
                    >
                        LOG IN
                    </button>
                )}
            </div>

            {/* Mobile Menu Button */}
            <button
                className="p-2 transition rounded-lg md:hidden hover:bg-blue-800"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-blue-900 shadow-xl md:hidden">
                    <div className="flex flex-col gap-2 p-4">
                        <button onClick={() => { navigate('/'); setMobileMenuOpen(false); }} className="p-2 text-left transition rounded hover:text-pink-300">Home</button>
                        <button onClick={() => { navigate('/trainers'); setMobileMenuOpen(false); }} className="p-2 text-left transition rounded hover:text-pink-300">Trainers</button>
                        <button onClick={() => { scrollToSection('features'); setMobileMenuOpen(false); }} className="p-2 text-left transition rounded hover:text-pink-300">Features</button>
                        <button onClick={() => { scrollToSection('pricing'); setMobileMenuOpen(false); }} className="p-2 text-left transition rounded hover:text-pink-300">Pricing</button>

                        {/* Mobile Dark Mode Toggle */}
                        <button 
                            onClick={() => { toggleTheme(); setMobileMenuOpen(false); }} 
                            className="flex items-center gap-2 p-2 text-left transition rounded hover:text-pink-300"
                        >
                            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>

                        <div className="pt-2 border-t border-blue-700">
                            <p className="px-2 mb-2 text-sm font-semibold text-pink-300">Categories</p>
                            {categories.map((category, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => handleCategoryClick(category.path)} 
                                    className="block w-full px-2 py-2 text-left transition rounded hover:text-pink-300"
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>

                        <div className="pt-2 border-t border-blue-700">
                            <button onClick={() => handleCategoryClick('/about')} className="block w-full px-2 py-2 text-left transition rounded hover:text-pink-300">About Us</button>
                            <button onClick={() => handleCategoryClick('/careers')} className="block w-full px-2 py-2 text-left transition rounded hover:text-pink-300">Careers</button>
                            <button onClick={() => handleCategoryClick('/contact')} className="block w-full px-2 py-2 text-left transition rounded hover:text-pink-300">Contact</button>
                        </div>

                        {isAuthenticated ? (
                            <div className="pt-2 border-t border-blue-700">
                                <div className="flex items-center gap-2 px-2 py-2 mb-2">
                                    <div className="flex items-center justify-center font-bold text-blue-900 bg-pink-300 rounded-full w-8 h-8">
                                        {(user?.username || user?.fullName || 'U').slice(0, 1).toUpperCase()}
                                    </div>
                                    <span className="font-semibold">{user?.username || user?.fullName || 'User'}</span>
                                </div>
                                <button onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }} className="block w-full px-2 py-2 text-left transition rounded hover:text-pink-300">My Profile</button>

                                {user?.userType === 'admin' && (
                                    <button onClick={() => { navigate('/admin-dashboard'); setMobileMenuOpen(false); }} className="block w-full px-2 py-2 text-left transition rounded hover:text-pink-300">Admin Dashboard</button>
                                )}
                                <button onClick={handleLogout} className="block w-full px-2 py-2 text-left text-red-300 transition rounded hover:text-red-200">Logout</button>
                            </div>
                        ) : (
                            <button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} className="px-6 py-2 mt-2 font-semibold text-white transition bg-pink-500 rounded-full hover:bg-pink-600">
                                LOG IN
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}