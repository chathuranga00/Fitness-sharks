import { useState } from 'react';
import { Menu, X, Calendar, Download, ExternalLink, ArrowLeft, Newspaper, Award, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PressPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  // Debug log to confirm page loads
  console.log('Press page loaded successfully');

  const categories = ['All', 'Press Releases', 'Awards', 'Media Coverage', 'Company News'];

  const pressReleases = [
    {
      id: 1,
      category: 'Press Releases',
      title: 'Fitness Sharks Expands to 5 New Locations Across Sri Lanka',
      date: '2025-01-15',
      excerpt: 'Leading fitness chain announces major expansion with state-of-the-art facilities in Kandy, Galle, Negombo, Kurunegala, and Matara.',
      image: '/unleash-your-strength-at-4k-gym-mqz006pbxscrtjga.jpg',
      downloadUrl: '#',
      featured: true
    },
    {
      id: 2,
      category: 'Awards',
      title: 'Fitness Sharks Named "Best Gym Chain 2024" by Sri Lanka Fitness Awards',
      date: '2024-12-20',
      excerpt: 'Recognition for outstanding facilities, member satisfaction, and innovative fitness programs across all locations.',
      image: '/reward.png',
      downloadUrl: '#',
      featured: true
    },
    {
      id: 3,
      category: 'Company News',
      title: 'New Partnership with Olympic Training Center for Elite Athlete Programs',
      date: '2024-12-10',
      excerpt: 'Fitness Sharks partners with Sri Lanka Olympic Training Center to offer specialized training programs for competitive athletes.',
      image: '/pexels-victorfreitas-841130.jpg',
      downloadUrl: '#',
      featured: false
    },
    {
      id: 4,
      category: 'Media Coverage',
      title: 'Featured in Business Today: "The Future of Fitness in Sri Lanka"',
      date: '2024-11-25',
      excerpt: 'CEO Sarah Johnson discusses innovation in fitness technology and the company\'s vision for transforming health and wellness.',
      image: '/fitness-computer-desktop-backgrounds-wallpaper-preview.jpg',
      downloadUrl: '#',
      featured: false
    },
    {
      id: 5,
      category: 'Press Releases',
      title: 'Fitness Sharks Launches Revolutionary AI-Powered Personal Training',
      date: '2024-11-15',
      excerpt: 'First gym chain in Sri Lanka to integrate artificial intelligence with personal training for customized workout experiences.',
      image: '/pngtree-rows-of-dumbbells-in-the-gym-image_15662386.jpg',
      downloadUrl: '#',
      featured: false
    },
    {
      id: 6,
      category: 'Company News',
      title: 'Fitness Sharks Reaches 500,000 Member Milestone',
      date: '2024-10-30',
      excerpt: 'Celebrating half a million members across all locations with special promotions and community events.',
      image: '/360_F_827876077_k0EWo3jSiWZPR8fRgsSbZFT9SkrozNuj.jpg',
      downloadUrl: '#',
      featured: false
    },
    {
      id: 7,
      category: 'Awards',
      title: 'Environmental Excellence Award for Sustainable Gym Operations',
      date: '2024-10-15',
      excerpt: 'Recognized for eco-friendly practices including solar power, water recycling, and sustainable equipment choices.',
      image: '/reward.png',
      downloadUrl: '#',
      featured: false
    },
    {
      id: 8,
      category: 'Media Coverage',
      title: 'CNN International Features Fitness Sharks Success Story',
      date: '2024-09-20',
      excerpt: 'International recognition for innovative approach to fitness and community building in South Asia.',
      image: '/gettyimages-1410441629-640x640.jpg',
      downloadUrl: '#',
      featured: false
    }
  ];

  const stats = [
    { number: '500K+', label: 'Active Members', icon: <Users size={32} /> },
    { number: '25+', label: 'Locations', icon: <TrendingUp size={32} /> },
    { number: '15+', label: 'Awards Won', icon: <Award size={32} /> },
    { number: '50+', label: 'Media Features', icon: <Newspaper size={32} /> }
  ];

  const mediaKit = [
    { name: 'Company Logo Pack', type: 'ZIP', size: '2.5 MB', description: 'High-resolution logos in various formats' },
    { name: 'Brand Guidelines', type: 'PDF', size: '1.8 MB', description: 'Complete brand identity and usage guidelines' },
    { name: 'Executive Photos', type: 'ZIP', size: '15.2 MB', description: 'Professional headshots of leadership team' },
    { name: 'Facility Photos', type: 'ZIP', size: '45.7 MB', description: 'High-resolution images of gym facilities' },
    { name: 'Company Fact Sheet', type: 'PDF', size: '0.5 MB', description: 'Key statistics and company information' }
  ];

  const filteredPress = selectedCategory === 'All' 
    ? pressReleases 
    : pressReleases.filter(item => item.category === selectedCategory);

  const handleDownload = (item) => {
    alert(`Downloading: ${item.name}`);
  };

  return (
    <div className="min-h-screen font-sans bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 text-white shadow-2xl bg-gradient-to-r from-blue-700 to-blue-900">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-2xl font-extrabold tracking-wide">
          <span className="text-pink-400">🦈</span>
          <span>Fitness Sharks</span>
        </button>

        <div className="items-center hidden gap-8 text-lg font-medium md:flex">
          <button onClick={() => navigate('/')} className="transition duration-300 hover:text-pink-300">Home</button>
          <button onClick={() => navigate('/#features')} className="transition duration-300 hover:text-pink-300">Features</button>
          <button onClick={() => navigate('/#pricing')} className="transition duration-300 hover:text-pink-300">Pricing</button>
          <button onClick={() => navigate('/about')} className="transition duration-300 hover:text-pink-300">About</button>
          <button onClick={() => navigate('/contact')} className="transition duration-300 hover:text-pink-300">Contact</button>
        </div>

        <button
          onClick={() => navigate('/login')}
          className="hidden px-6 py-2 font-bold text-white transition transform bg-pink-500 rounded-full shadow-lg md:block hover:bg-pink-600 hover:scale-105"
        >
          LOG IN
        </button>

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
          <button onClick={() => { navigate('/'); setMobileMenuOpen(false); }} className="p-2 transition rounded hover:text-pink-300 text-left">Home</button>
          <button onClick={() => { navigate('/#features'); setMobileMenuOpen(false); }} className="p-2 transition rounded hover:text-pink-300 text-left">Features</button>
          <button onClick={() => { navigate('/#pricing'); setMobileMenuOpen(false); }} className="p-2 transition rounded hover:text-pink-300 text-left">Pricing</button>
          <button onClick={() => { navigate('/about'); setMobileMenuOpen(false); }} className="p-2 transition rounded hover:text-pink-300 text-left">About</button>
          <button onClick={() => { navigate('/contact'); setMobileMenuOpen(false); }} className="p-2 transition rounded hover:text-pink-300 text-left">Contact</button>
          <button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} className="px-6 py-2 mt-2 font-semibold text-center text-white transition bg-pink-500 rounded-full hover:bg-pink-600">LOG IN</button>
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
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 text-pink-400 bg-pink-100 rounded-full">
            <Newspaper size={40} />
          </div>
          <h1 className="mb-6 text-5xl font-extrabold leading-tight md:text-6xl">
            Press & Media Center
          </h1>
          <p className="mb-8 text-xl md:text-2xl">
            Latest news, press releases, and media resources from Fitness Sharks. Stay updated with our journey and achievements.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="p-6 text-center transition duration-300 bg-slate-50 rounded-2xl hover:shadow-lg">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-pink-600 bg-pink-100 rounded-full">
                  {stat.icon}
                </div>
                <div className="mb-2 text-4xl font-extrabold text-blue-900">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases Section */}
      <section className="px-6 py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-4 text-4xl font-bold text-center text-blue-900">Latest News & Press Releases</h2>
          <p className="mb-12 text-xl text-center text-gray-600">Stay informed about our latest developments and achievements</p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  selectedCategory === category
                    ? 'bg-pink-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Articles */}
          <div className="mb-12">
            <h3 className="mb-6 text-2xl font-bold text-blue-900">Featured Stories</h3>
            <div className="grid gap-8 md:grid-cols-2">
              {filteredPress.filter(item => item.featured).map((item) => (
                <div key={item.id} className="overflow-hidden bg-white shadow-lg rounded-2xl hover:shadow-xl transition">
                  <div className="relative h-48">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-sm font-semibold text-white bg-pink-500 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                      <Calendar size={16} />
                      {new Date(item.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <h4 className="mb-3 text-xl font-bold text-blue-900">{item.title}</h4>
                    <p className="mb-4 text-gray-600">{item.excerpt}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => alert('Full article would open here')}
                        className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition"
                      >
                        <ExternalLink size={16} />
                        Read More
                      </button>
                      <button
                        onClick={() => alert('Download would start here')}
                        className="flex items-center gap-2 px-4 py-2 text-pink-600 border border-pink-600 rounded-full hover:bg-pink-600 hover:text-white transition"
                      >
                        <Download size={16} />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Articles */}
          <div>
            <h3 className="mb-6 text-2xl font-bold text-blue-900">All Press Releases</h3>
            <div className="space-y-4">
              {filteredPress.filter(item => !item.featured).map((item) => (
                <div key={item.id} className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition md:flex-row">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-32 object-cover rounded-lg md:w-48"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="mb-2 text-lg font-bold text-blue-900">{item.title}</h4>
                    <p className="mb-3 text-gray-600">{item.excerpt}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => alert('Full article would open here')}
                        className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                      >
                        Read More →
                      </button>
                      <button
                        onClick={() => alert('Download would start here')}
                        className="text-pink-600 hover:text-pink-800 font-semibold text-sm"
                      >
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Media Kit Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-4xl font-bold text-blue-900">Media Kit & Resources</h2>
            <p className="text-xl text-gray-600">Download high-quality assets and company information for media use</p>
          </div>

          <div className="space-y-4">
            {mediaKit.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 text-pink-600 bg-pink-100 rounded-full">
                    <Download size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-blue-900">{item.name}</h4>
                    <p className="text-gray-600">{item.description}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span>{item.type}</span>
                      <span>•</span>
                      <span>{item.size}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(item)}
                  className="px-6 py-2 font-semibold text-white bg-pink-500 rounded-full hover:bg-pink-600 transition"
                >
                  Download
                </button>
              </div>
            ))}
          </div>

          <div className="p-8 mt-12 text-center bg-blue-50 rounded-2xl">
            <h3 className="mb-3 text-2xl font-bold text-blue-900">Media Inquiries</h3>
            <p className="mb-6 text-gray-600">
              For press inquiries, interview requests, or additional information, please contact our media relations team.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-3 font-bold text-white bg-pink-500 rounded-full hover:bg-pink-600 transition"
              >
                Contact Media Team
              </button>
              <a
                href="mailto:press@fitnesssharks.lk"
                className="px-8 py-3 font-bold text-blue-600 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition"
              >
                press@fitnesssharks.lk
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-white bg-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6 text-2xl font-bold text-blue-400">Fitness Sharks</div>
          <p className="mb-4 text-gray-400">Transforming lives through fitness excellence</p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <button onClick={() => navigate('/')} className="hover:text-pink-400">Home</button>
            <button onClick={() => navigate('/about')} className="hover:text-pink-400">About</button>
            <button onClick={() => navigate('/careers')} className="hover:text-pink-400">Careers</button>
            <button onClick={() => navigate('/contact')} className="hover:text-pink-400">Contact</button>
          </div>
          <div className="pt-6 mt-6 text-sm text-gray-500 border-t border-gray-800">
            © 2025 Fitness Sharks. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}