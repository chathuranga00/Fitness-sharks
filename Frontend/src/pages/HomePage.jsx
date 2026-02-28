import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Search, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import apiService from '../services/apiService';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [membershipPlans, setMembershipPlans] = useState([]);

  // Load membership plans from backend
  useEffect(() => {
    const loadMembershipPlans = async () => {
      try {
        const result = await apiService.getAllMemberships();
        if (result.success) {
          setMembershipPlans(result.memberships);
        }
      } catch (error) {
        console.error('Failed to load membership plans:', error);
      }
    };

    loadMembershipPlans();
  }, []);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Data Definitions
  const categories = [
    'Workout Plans',
    'Nutrition Guide',
    'Community Forum',
  ];

  // Comprehensive search data
  const searchData = [
    // Main Navigation
    { title: 'Features', type: 'section', target: '#features', description: 'Gym features and amenities' },
    { title: 'Trainers', type: 'page', target: '/trainers', description: 'Meet our expert fitness trainers' },
    { title: 'Dashboard', type: 'section', target: '#dashboard', description: 'Personal fitness dashboard' },
    { title: 'Pricing', type: 'section', target: '#pricing', description: 'Membership plans and pricing' },
    { title: 'Contact', type: 'section', target: '#contact', description: 'Contact information and location' },

    // Categories/Pages
    { title: 'About Us', type: 'page', target: '/about', description: 'Learn about Fitness Sharks mission, team, and values' },
    { title: 'Careers', type: 'page', target: '/careers', description: 'Join our team and build your fitness career' },
    { title: 'Contact Us', type: 'page', target: '/contact', description: 'Get in touch with our team for support and inquiries' },
    { title: 'Press & Media', type: 'page', target: '/press', description: 'Latest news, press releases, and media resources' },
    { title: 'Tour Our Gym', type: 'page', target: '/tour-our-gym', description: 'Virtual tour of our facilities with photos and videos' },
    { title: 'Workout Plans', type: 'page', target: '/workout-plans', description: 'Personalized workout routines' },
    { title: 'Nutrition Guide', type: 'page', target: '/nutrition-guide', description: 'Diet and nutrition advice' },
    { title: 'Exercise Library', type: 'page', target: '/exercise-library', description: 'Complete exercise database with instructions' },

    { title: 'Community Forum', type: 'page', target: '/community-forum', description: 'Connect with other members' },
    { title: 'Profile', type: 'page', target: '/profile', description: 'View your profile and subscriptions' },

    // Membership Plans
    { title: 'Day Pass', type: 'page', target: '/day-pass', description: 'Single day gym access' },
    { title: 'Monthly Membership', type: 'page', target: '/monthly', description: 'Monthly gym membership' },
    { title: 'Annual Membership', type: 'page', target: '/annual', description: 'Annual gym membership with benefits' },

    // Features
    { title: 'Premium Equipment', type: 'feature', target: '#features', description: 'State-of-the-art gym equipment' },
    { title: 'Expert Trainers', type: 'feature', target: '#features', description: 'Certified personal trainers' },
    { title: 'Full Facilities', type: 'feature', target: '#features', description: 'Swimming pool, sauna, steam room' },
    { title: 'Flexible Hours', type: 'feature', target: '#features', description: '24/7 gym access' },
    { title: 'Nutrition Bar', type: 'feature', target: '#features', description: 'Healthy meals and juices' },
    { title: 'Group Classes', type: 'feature', target: '#features', description: 'Yoga, Pilates, Zumba, CrossFit' },

    // Specific Topics
    { title: 'Cardio Machines', type: 'equipment', target: '#features', description: 'Treadmills, bikes, ellipticals' },
    { title: 'Free Weights', type: 'equipment', target: '#features', description: 'Dumbbells, barbells, plates' },
    { title: 'Swimming Pool', type: 'facility', target: '#features', description: 'Olympic-size swimming pool' },
    { title: 'Sauna', type: 'facility', target: '#features', description: 'Relaxing sauna facilities' },
    { title: 'Steam Room', type: 'facility', target: '#features', description: 'Steam room for recovery' },
    { title: 'Locker Rooms', type: 'facility', target: '#features', description: 'Clean and secure locker rooms' },
    { title: 'Yoga Classes', type: 'class', target: '#features', description: 'Various yoga class styles' },
    { title: 'Pilates', type: 'class', target: '#features', description: 'Core strengthening classes' },
    { title: 'Zumba', type: 'class', target: '#features', description: 'Dance fitness classes' },
    { title: 'CrossFit', type: 'class', target: '#features', description: 'High-intensity functional fitness' },
    { title: 'Personal Training', type: 'service', target: '#features', description: 'One-on-one training sessions' },
    { title: 'Nutrition Consultation', type: 'service', target: '#features', description: 'Professional diet advice' },
    { title: 'Guest Passes', type: 'benefit', target: '#pricing', description: 'Bring friends to the gym' },
    { title: 'Towel Service', type: 'benefit', target: '#pricing', description: 'Clean towels provided' },
  ];

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filtered.slice(0, 8)); // Limit to 8 results
    setShowSearchResults(true);
  };

  const handleSearchSelect = (item) => {
    setSearchQuery('');
    setShowSearchResults(false);

    if (item.type === 'section') {
      // Scroll to section
      const element = document.querySelector(item.target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to page
      navigate(item.target);
    }
  };

  const features = [
    { icon: '🏋️', title: 'Premium Equipment', desc: 'State-of-the-art cardio machines, free weights, and strength training equipment from top brands.' },
    { icon: '👨‍💼', title: 'Expert Trainers', desc: 'Certified personal trainers and fitness experts to guide your workout and nutrition plans.' },
    { icon: '🏊', title: 'Full Facilities', desc: 'Swimming pool, sauna, steam room, locker rooms, and group fitness studios.' },
    { icon: '📅', title: 'Flexible Hours', desc: '24/7 access for premium members with convenient scheduling and class bookings.' },
    { icon: '🥗', title: 'Nutrition Bar', desc: 'On-site juice bar and healthy meal options to fuel your workouts and recovery.' },
    { icon: '👥', title: 'Group Classes', desc: 'Yoga, Pilates, Zumba, CrossFit, and more group fitness classes for all skill levels.' },
  ];

  const stats = [
    { number: '5,000+', label: 'Active Members' },
    { number: '4.9★', label: 'Member Rating' },
    { number: '15+', label: 'Years Experience' },
    { number: '50+', label: 'Expert Trainers' },
  ];

  // Convert backend membership plans to pricing tiers format
  const pricingTiers = membershipPlans.length > 0 ? membershipPlans.map((plan, index) => ({
    id: plan.id,
    name: plan.name,
    price: `LKR ${plan.price.toLocaleString()}`,
    period: `${plan.durationMonths} month${plan.durationMonths > 1 ? 's' : ''}`,
    features: plan.description ? plan.description.split(',').map(f => f.trim()) : ['Full Gym Access', 'Professional Training', 'Modern Equipment'],
    cta: `Join ${plan.name}`,
    primary: index === 1 // Make the second plan primary
  })) : [
    // Fallback static plans if backend is not available
    {
      name: 'Day Pass',
      price: 'LKR 7,500',
      period: 'single visit',
      features: ['Full Gym Access', 'Locker Room Access', 'Basic Equipment Use', 'No Long-term Commitment'],
      cta: 'Buy Day Pass',
      primary: false
    },
    {
      name: 'Monthly',
      price: 'LKR 14,700',
      period: 'per month',
      features: ['Unlimited Gym Access', 'Group Classes Included', 'Personal Training Discount', 'Nutrition Consultation', 'Guest Pass (2/month)'],
      cta: 'Join Monthly',
      primary: true
    },
    {
      name: 'Annual',
      price: 'LKR 149,700',
      period: 'per year (save 15%)',
      features: ['All Monthly Features', '24/7 Access', 'Free Personal Training Session', 'Premium Locker', 'Unlimited Guest Passes'],
      cta: 'Join Annual',
      primary: false
    },
  ];

  const footerLinks = [
    { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies', 'License'] },
  ];

  const handlePlaceholderClick = (e) => {
    // Check if e is defined and has preventDefault, otherwise it's just a placeholder for a non-event click
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    console.log("Placeholder action triggered.");
  };

  return (
    <div className="min-h-screen font-sans bg-white dark:bg-gray-900 transition-colors duration-300">
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translate3d(0, -20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out;
        }
      `}</style>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 text-white shadow-2xl bg-gradient-to-r from-blue-700 to-blue-900 dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-center gap-2 text-2xl font-extrabold tracking-wide min-w-0 flex-shrink-0">
          <span className="text-pink-400">🦈</span>
          <span className="whitespace-nowrap">Fitness Sharks</span>
        </div>

        {/* Desktop Menu */}
        <div className="items-center hidden gap-8 text-lg font-medium md:flex">
          <a href="#features" className="transition duration-300 hover:text-pink-300">Features</a>
          <button onClick={() => navigate('/trainers')} className="transition duration-300 hover:text-pink-300">Trainers</button>
          <a href="#dashboard" className="transition duration-300 hover:text-pink-300">Dashboard</a>
          <a href="#pricing" className="transition duration-300 hover:text-pink-300">Pricing</a>

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className="flex items-center gap-1 transition duration-300 hover:text-pink-300"
            >
              More <ChevronDown size={16} />
            </button>
            {moreDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setMoreDropdownOpen(false);
                      navigate(`/${category.toLowerCase().replace(' ', '-')}`);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>



          {/* Search Bar */}
          <div className="relative" ref={searchRef}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
                className="w-64 px-4 py-2 pl-10 text-gray-900 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>

            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
                {searchResults.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearchSelect(item)}
                    className="block w-full text-left px-4 py-3 hover:bg-gray-50 transition border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {item.type}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => {
              console.log('Dark mode button clicked. Current state:', isDarkMode);
              toggleTheme();
            }}
            className="p-2 transition duration-300 rounded-lg hover:bg-blue-800 border border-white/20"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-blue-200" />}
          </button>

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-3 px-3 py-2 transition rounded-full hover:bg-blue-800"
              >
                <div className="flex items-center justify-center font-bold text-blue-900 bg-pink-300 rounded-full w-9 h-9">
                  {(user?.username || user?.email || 'U').slice(0, 1).toUpperCase()}
                </div>
                <span className="font-semibold">{user?.username || user?.email}</span>
              </button>
              {profileMenuOpen && (
                <div className="absolute right-0 w-48 mt-2 overflow-hidden bg-white rounded-lg shadow-2xl">
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 transition hover:bg-gray-100"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      navigate('/profile');
                    }}
                  >
                    Profile
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 transition hover:bg-gray-100"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      logout();
                      navigate('/');
                    }}
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
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={28} className="text-pink-300" /> : <Menu size={28} className="text-pink-300" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="relative z-40 flex flex-col gap-4 p-4 text-white bg-blue-900 shadow-xl md:hidden">
          <a href="#features" className="p-2 transition rounded hover:text-pink-300" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <button onClick={() => { navigate('/trainers'); setMobileMenuOpen(false); }} className="p-2 text-left transition rounded hover:text-pink-300">Trainers</button>
          <a href="#dashboard" className="p-2 transition rounded hover:text-pink-300" onClick={() => setMobileMenuOpen(false)}>Dashboard</a>
          <a href="#pricing" className="p-2 transition rounded hover:text-pink-300" onClick={() => setMobileMenuOpen(false)}>Pricing</a>

          {/* Mobile Dark Mode Toggle */}
          <button
            onClick={() => { toggleTheme(); setMobileMenuOpen(false); }}
            className="flex items-center gap-2 p-2 text-left transition rounded hover:text-pink-300"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>

          {/* Mobile Search */}
          <div className="relative mt-4 border-t border-blue-800 pt-4">
            <div className="text-sm text-blue-300 mb-2 px-2">Search</div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
                className="w-full px-4 py-2 pl-10 text-gray-900 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>

            {/* Mobile Search Results */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 max-h-64 overflow-y-auto">
                {searchResults.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleSearchSelect(item);
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 hover:bg-gray-50 transition border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{item.title}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {item.type}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile More Section */}
          <div className="border-t border-blue-800 pt-4 mt-2">
            <div className="text-sm text-blue-300 mb-2 px-2">More Options</div>
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate(`/${category.toLowerCase().replace(' ', '-')}`);
                }}
                className="block w-full text-left p-2 text-gray-300 hover:text-pink-300 transition"
              >
                {category}
              </button>
            ))}
          </div>

          {isAuthenticated ? (
            <div className="flex items-center justify-between gap-3 p-2 mt-2 bg-blue-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center font-bold text-blue-900 bg-pink-300 rounded-full w-9 h-9">
                  {(user?.username || user?.email || 'U').slice(0, 1).toUpperCase()}
                </div>
                <div className="font-semibold">{user?.username || user?.email}</div>
              </div>
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); navigate('/'); }}
                className="px-4 py-2 font-semibold text-white transition bg-pink-500 rounded-full hover:bg-pink-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}
              className="px-6 py-2 mt-2 font-semibold text-white transition bg-pink-500 rounded-full hover:bg-pink-600"
            >
              LOG IN
            </button>
          )}
        </div>
      )}

      {/* Hero Section */}
      <section
        className="relative px-6 py-24 text-center text-white md:py-32"
        style={{
          minHeight: '80vh',
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/fitness-sharks-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Content */}
        <div className="relative z-10">
          <h1 className="mb-6 text-5xl font-extrabold leading-tight md:text-7xl drop-shadow-2xl animate-fade-in-down" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            PREMIUM GYM<br />& FITNESS CENTER
          </h1>
          <p className="max-w-3xl mx-auto mb-10 text-xl md:text-2xl font-semibold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
            Transform your body at Fitness Sharks Gym. State-of-the-art equipment, expert trainers, and premium facilities await you.
          </p>
          <div className="flex flex-col justify-center gap-4 md:flex-row">
            <button
              onClick={() => navigate('/tour-our-gym')}
              className="px-10 py-4 text-xl font-bold text-white transition transform bg-pink-500 rounded-full shadow-2xl hover:bg-pink-600 hover:scale-105"
            >
              Tour Our Gym
            </button>
            <button
              onClick={() => {
                const pricingSection = document.querySelector('#pricing');
                if (pricingSection) {
                  pricingSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigate('/#pricing');
                }
              }}
              className="px-10 py-4 text-xl font-bold text-white transition transform border-2 border-white rounded-full hover:bg-white hover:text-blue-900 hover:scale-105"
            >
              View Memberships
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-24 bg-slate-50 dark:bg-gray-800 transition-colors duration-300">
        <h2 className="mb-4 text-4xl font-bold text-center text-blue-900 dark:text-blue-400 md:text-5xl">Why Choose Fitness Sharks?</h2>
        <p className="mb-16 text-xl text-center text-gray-500 dark:text-gray-400">Simple tools for complex goals.</p>
        <div className="grid gap-8 mx-auto sm:grid-cols-2 lg:grid-cols-3 max-w-7xl">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 transition duration-300 bg-white dark:bg-gray-700 border-t-4 border-pink-500 shadow-xl cursor-pointer rounded-2xl hover:shadow-2xl hover:-translate-y-2"
              onClick={handlePlaceholderClick} // Added placeholder handler
            >
              <div className="mb-4 text-5xl">{feature.icon}</div>
              <h3 className="mb-3 text-2xl font-bold text-blue-900 dark:text-blue-400">{feature.title}</h3>
              <p className="leading-relaxed text-gray-600 dark:text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard Preview */}
      <section id="dashboard" className="px-6 py-24">
        <div className="grid items-center gap-16 mx-auto lg:grid-cols-2 max-w-7xl">
          <div>
            <span className="block mb-2 text-lg font-semibold tracking-wider text-pink-500 uppercase">World-Class Facilities</span>
            <h2 className="mb-6 text-4xl font-bold text-blue-900 md:text-5xl">Premium Gym Experience</h2>
            <p className="mb-4 text-lg leading-relaxed text-gray-600">
              Experience our state-of-the-art equipment, spacious workout areas, and luxury amenities designed for your success.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              From cardio zones to strength training areas, swimming pools to group fitness studios - we have everything you need.
            </p>
            <button
              onClick={() => navigate('/tour-our-gym')}
              className="px-8 py-3 text-lg font-semibold text-white transition transform bg-blue-600 rounded-full shadow-md hover:bg-blue-700 hover:scale-105"
            >
              Virtual Tour
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 h-[400px]">
            {/* Top Left - Cardio Equipment */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg group">
              <img
                src="/fitness-computer-desktop-backgrounds-wallpaper-preview.jpg"
                alt="Cardio Equipment"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold">Cardio Zone</h3>
                <p className="text-sm opacity-90">Modern Equipment</p>
              </div>
            </div>

            {/* Top Right - Strength Training */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg group">
              <img
                src="/pngtree-rows-of-dumbbells-in-the-gym-image_15662386.jpg"
                alt="Strength Training"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold">Free Weights</h3>
                <p className="text-sm opacity-90">Complete Range</p>
              </div>
            </div>

            {/* Bottom Left - Functional Training */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg group">
              <img
                src="/pexels-victorfreitas-841130.jpg"
                alt="Functional Training"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold">Training Area</h3>
                <p className="text-sm opacity-90">Functional Fitness</p>
              </div>
            </div>

            {/* Bottom Right - Premium Facilities */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg group">
              <img
                src="/unleash-your-strength-at-4k-gym-mqz006pbxscrtjga.jpg"
                alt="Premium Facilities"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold">Elite Zone</h3>
                <p className="text-sm opacity-90">Premium Training</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-16 text-white bg-gradient-to-r from-blue-600 to-blue-900">
        <div className="grid max-w-6xl gap-8 mx-auto text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-4">
              <div className="mb-2 text-5xl font-extrabold text-pink-400 md:text-6xl drop-shadow-md">{stat.number}</div>
              <div className="text-xl font-medium opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 py-24 bg-slate-50 dark:bg-gray-800 transition-colors duration-300">
        <h2 className="mb-4 text-4xl font-bold text-center text-blue-900 dark:text-blue-400 md:text-5xl">Simple Pricing, Powerful Results</h2>
        <p className="mb-16 text-xl text-center text-gray-600 dark:text-gray-400">Choose the plan that fits your fitness journey.</p>

        <div className="grid max-w-6xl gap-8 mx-auto lg:grid-cols-3">
          {pricingTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`bg-white p-8 rounded-3xl shadow-2xl transition transform hover:-translate-y-1 ${tier.primary ? 'border-4 border-pink-500 scale-[1.02]' : 'border border-gray-100'}`}
            >
              <h3 className={`text-3xl font-bold mb-3 ${tier.primary ? 'text-pink-600' : 'text-blue-900'}`}>{tier.name}</h3>
              <p className="mb-6 font-medium text-gray-500">{tier.period}</p>

              <div className="mb-8 text-6xl font-extrabold text-blue-900">
                {tier.price}
                <span className="ml-1 text-xl font-medium text-gray-500">{tier.price !== 'LKR 0' && '/mo'}</span>
              </div>

              <ul className="mb-10 space-y-4 text-left">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className={`mr-3 ${tier.primary ? 'text-pink-500' : 'text-green-500'} text-xl`}>✓</span>
                    <span className="text-lg text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {(() => {
                // Check if user has this membership
                const userMembership = isAuthenticated && user?.purchases?.find(p =>
                  p.type === 'membership' &&
                  p.status === 'active' &&
                  (p.membershipId === tier.id || p.name === tier.name)
                );

                if (userMembership) {
                  return (
                    <div className="space-y-3">
                      <div className="w-full py-3 rounded-full font-bold text-lg bg-green-100 text-green-800 text-center">
                        ✓ Current Plan
                      </div>
                      <button
                        onClick={() => {
                          if (isAuthenticated) {
                            navigate(`/subscribe/${tier.id || tier.name.toLowerCase()}`);
                          } else {
                            navigate('/login');
                          }
                        }}
                        className="w-full py-2 rounded-full font-medium text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
                      >
                        Change Plan
                      </button>
                    </div>
                  );
                }

                return (
                  <button
                    onClick={() => {
                      if (isAuthenticated) {
                        // Navigate to subscription page with membership plan ID
                        navigate(`/subscribe/${tier.id || tier.name.toLowerCase()}`);
                      } else {
                        // Redirect to login first
                        navigate('/login');
                      }
                    }}
                    className={`w-full py-3 rounded-full font-bold text-lg transition transform hover:scale-[1.01] ${tier.primary
                      ? 'bg-pink-500 hover:bg-pink-600 text-white shadow-lg shadow-pink-500/50'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                  >
                    {tier.cta}
                  </button>
                );
              })()}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="px-6 py-16 text-white bg-slate-900">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 mb-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h4 className="mb-4 text-2xl font-bold tracking-wider text-blue-400">Fitness Sharks</h4>
              <p className="text-gray-400">Premium gym and fitness center dedicated to helping you achieve your health and fitness goals.</p>

            </div>

            {footerLinks.map((section, idx) => (
              <div key={idx}>
                <h4 className="mb-5 text-xl font-bold text-blue-400">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => {
                          console.log('Footer link clicked:', link);
                          if (link === 'About') {
                            console.log('Navigating to /about');
                            navigate('/about');
                          } else if (link === 'Careers') {
                            console.log('Navigating to /careers');
                            navigate('/careers');
                          } else if (link === 'Contact') {
                            console.log('Navigating to /contact');
                            navigate('/contact');
                          } else if (link === 'Press') {
                            console.log('Navigating to /press');
                            navigate('/press');
                          } else if (link === 'Terms') {
                            navigate('/terms');
                          } else if (link === 'Privacy') {
                            navigate('/privacy');
                          } else if (link === 'Cookies') {
                            navigate('/cookies');
                          } else if (link === 'License') {
                            navigate('/license');
                          } else {
                            handlePlaceholderClick();
                          }
                        }}
                        className="w-full text-base text-left text-gray-300 transition rounded-md hover:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 text-sm text-center text-gray-500 border-t border-gray-700">
            <p>&copy; 2025 Fitness Sharks. All rights reserved. Built with passion and code.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
