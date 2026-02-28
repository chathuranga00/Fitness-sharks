import { useState } from 'react';
import { Menu, X, Download, Calendar, ExternalLink, Award, TrendingUp, Users, Building } from 'lucide-react';

export default function PressPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Company News', 'Awards', 'Expansion', 'Community', 'Events'];

  const pressReleases = [
    {
      id: 1,
      title: 'Fitness Sharks Opens New 50,000 sq ft Flagship Location in Colombo',
      category: 'Expansion',
      date: 'October 15, 2025',
      excerpt: 'Premium fitness center expands with state-of-the-art facility featuring Olympic-size pool, advanced equipment, and luxury amenities.',
      image: '/fitness-computer-desktop-backgrounds-wallpaper-preview.jpg',
      content: 'Fitness Sharks, Sri Lanka\'s premier fitness destination, announced today the grand opening of its new flagship location...'
    },
    {
      id: 2,
      title: 'Fitness Sharks Reaches 5,000 Active Members Milestone',
      category: 'Company News',
      date: 'September 28, 2025',
      excerpt: 'Growing community of fitness enthusiasts celebrates achievement with special membership offers and community events.',
      image: '/pexels-victorfreitas-841130.jpg',
      content: 'We are thrilled to announce that Fitness Sharks has reached a significant milestone of 5,000 active members...'
    },
    {
      id: 3,
      title: 'Fitness Sharks Wins Best Gym Facility 2025 Award',
      category: 'Awards',
      date: 'August 12, 2025',
      excerpt: 'Recognized for outstanding facilities, customer service, and innovative fitness programs at the National Fitness Excellence Awards.',
      image: '/unleash-your-strength-at-4k-gym-mqz006pbxscrtjga.jpg',
      content: 'Fitness Sharks has been honored with the prestigious Best Gym Facility 2025 award at the National Fitness Excellence Awards...'
    },
    {
      id: 4,
      title: 'Free Fitness Programs Launched for Local Schools',
      category: 'Community',
      date: 'July 20, 2025',
      excerpt: 'Community initiative provides free fitness education and training sessions to promote youth health and wellness.',
      image: '/pngtree-rows-of-dumbbells-in-the-gym-image_15662386.jpg',
      content: 'As part of our commitment to community health, Fitness Sharks is launching free fitness programs for local schools...'
    },
    {
      id: 5,
      title: 'Annual Fitness Sharks Challenge Attracts 1,000+ Participants',
      category: 'Events',
      date: 'June 5, 2025',
      excerpt: 'Largest fitness competition in Sri Lanka brings together fitness enthusiasts from across the country for charity event.',
      image: '/fitness-computer-desktop-backgrounds-wallpaper-preview.jpg',
      content: 'The third annual Fitness Sharks Challenge concluded successfully with over 1,000 participants competing in various fitness categories...'
    },
    {
      id: 6,
      title: 'Partnership with National Sports Council Announced',
      category: 'Company News',
      date: 'May 18, 2025',
      excerpt: 'Strategic partnership aims to promote fitness and wellness across Sri Lanka with national training programs.',
      image: '/pexels-victorfreitas-841130.jpg',
      content: 'Fitness Sharks has entered into a strategic partnership with the National Sports Council to develop comprehensive fitness programs...'
    }
  ];

  const mediaKit = [
    {
      title: 'Company Logos',
      description: 'High-resolution logos in various formats (PNG, SVG, EPS)',
      icon: <Building className="w-6 h-6" />,
      size: '2.5 MB'
    },
    {
      title: 'Press Photos',
      description: 'Professional photography of facilities and equipment',
      icon: <Download className="w-6 h-6" />,
      size: '15 MB'
    },
    {
      title: 'Fact Sheet',
      description: 'Company information, statistics, and key facts',
      icon: <ExternalLink className="w-6 h-6" />,
      size: '500 KB'
    },
    {
      title: 'Brand Guidelines',
      description: 'Complete brand identity and usage guidelines',
      icon: <Award className="w-6 h-6" />,
      size: '3 MB'
    }
  ];

  const stats = [
    { number: '5,000+', label: 'Active Members', icon: <Users className="w-8 h-8" /> },
    { number: '15+', label: 'Years in Business', icon: <TrendingUp className="w-8 h-8" /> },
    { number: '50+', label: 'Expert Trainers', icon: <Award className="w-8 h-8" /> },
    { number: '4.9★', label: 'Member Rating', icon: <Award className="w-8 h-8" /> }
  ];

  const filteredReleases = selectedCategory === 'All' 
    ? pressReleases 
    : pressReleases.filter(release => release.category === selectedCategory);

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
          <a href="/careers" className="transition duration-300 hover:text-pink-300">Careers</a>
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
          <a href="/careers" className="p-2 transition rounded hover:text-pink-300" onClick={() => setMobileMenuOpen(false)}>Careers</a>
          <a href="/login" className="px-6 py-2 mt-2 font-semibold text-center text-white transition bg-pink-500 rounded-full hover:bg-pink-600">LOG IN</a>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative px-6 py-24 text-center text-white bg-gradient-to-r from-blue-600 to-blue-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6 text-5xl font-extrabold leading-tight md:text-6xl">
            Press & Media
          </h1>
          <p className="mb-8 text-xl md:text-2xl">
            Latest news, press releases, and media resources from Fitness Sharks
          </p>
          <a
            href="#contact"
            className="inline-block px-10 py-4 text-xl font-bold text-blue-900 transition transform bg-pink-400 rounded-full shadow-2xl hover:bg-pink-500 hover:scale-105"
          >
            Contact Media Team
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="p-6 text-center transition duration-300 bg-white shadow-lg rounded-2xl hover:shadow-xl">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-pink-500 bg-pink-100 rounded-full">
                  {stat.icon}
                </div>
                <div className="mb-2 text-4xl font-extrabold text-blue-900">{stat.number}</div>
                <div className="text-lg font-medium text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-4 text-4xl font-bold text-center text-blue-900">Latest Press Releases</h2>
          <p className="mb-12 text-xl text-center text-gray-600">Stay updated with our latest news and announcements</p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Press Release Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredReleases.map((release) => (
              <div key={release.id} className="overflow-hidden transition duration-300 bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={release.image}
                    alt={release.title}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-sm font-semibold text-blue-900 bg-white rounded-full shadow-md">
                      {release.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                    <Calendar size={16} />
                    <span>{release.date}</span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-blue-900 line-clamp-2">
                    {release.title}
                  </h3>
                  <p className="mb-4 leading-relaxed text-gray-600 line-clamp-3">
                    {release.excerpt}
                  </p>
                  <button
                    onClick={() => alert(`Full press release: ${release.title}\n\n${release.content}`)}
                    className="flex items-center gap-2 font-semibold text-pink-600 transition hover:text-pink-700"
                  >
                    Read More <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="px-6 py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-4 text-4xl font-bold text-center text-blue-900">Media Kit</h2>
          <p className="mb-12 text-xl text-center text-gray-600">Download our press resources and brand assets</p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mediaKit.map((item, idx) => (
              <div key={idx} className="p-6 transition duration-300 bg-white shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center justify-center w-12 h-12 mb-4 text-pink-500 bg-pink-100 rounded-full">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-blue-900">{item.title}</h3>
                <p className="mb-3 text-sm text-gray-600">{item.description}</p>
                <div className="mb-4 text-xs text-gray-500">File size: {item.size}</div>
                <button
                  onClick={() => alert(`Downloading ${item.title}...`)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition bg-blue-600 rounded-full hover:bg-blue-700"
                >
                  <Download size={16} />
                  Download
                </button>
              </div>
            ))}
          </div>

          <div className="p-8 mt-12 text-center bg-white shadow-lg rounded-2xl">
            <h3 className="mb-3 text-2xl font-bold text-blue-900">Need Complete Media Kit?</h3>
            <p className="mb-6 text-gray-600">Download all press resources in one comprehensive package</p>
            <button
              onClick={() => alert('Downloading complete media kit...')}
              className="inline-flex items-center gap-2 px-8 py-3 font-bold text-white transition transform bg-pink-500 rounded-full shadow-lg hover:bg-pink-600 hover:scale-105"
            >
              <Download size={20} />
              Download Complete Kit (25 MB)
            </button>
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section id="contact" className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="p-12 text-center text-white bg-gradient-to-r from-blue-600 to-blue-900 rounded-3xl shadow-2xl">
            <h2 className="mb-4 text-4xl font-bold">Media Inquiries</h2>
            <p className="mb-8 text-xl">
              For press inquiries, interviews, or additional information, please contact our media relations team
            </p>
            
            <div className="grid gap-6 mb-8 md:grid-cols-2">
              <div className="p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl">
                <div className="mb-2 text-sm font-semibold text-pink-300">Media Relations Manager</div>
                <div className="mb-1 text-xl font-bold">Sarah Johnson</div>
                <a href="mailto:press@fitnesssharks.lk" className="text-pink-300 hover:text-pink-200">
                  press@fitnesssharks.lk
                </a>
                <div className="mt-2 text-lg">+94 77 234 5678</div>
              </div>

              <div className="p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl">
                <div className="mb-2 text-sm font-semibold text-pink-300">Marketing Director</div>
                <div className="mb-1 text-xl font-bold">Michael Chen</div>
                <a href="mailto:marketing@fitnesssharks.lk" className="text-pink-300 hover:text-pink-200">
                  marketing@fitnesssharks.lk
                </a>
                <div className="mt-2 text-lg">+94 77 345 6789</div>
              </div>
            </div>

            <div className="p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl">
              <div className="mb-3 text-lg font-semibold">Press Office Hours</div>
              <div className="text-lg">Monday - Friday: 9:00 AM - 6:00 PM</div>
              <div className="mt-2 text-sm text-pink-300">We typically respond within 24 hours</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Coverage */}
      <section className="px-6 py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-4 text-4xl font-bold text-center text-blue-900">Recent Media Coverage</h2>
          <p className="mb-12 text-xl text-center text-gray-600">Featured in leading publications</p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { publication: 'Colombo Times', headline: 'Fitness Sharks Revolutionizes Gym Industry', date: 'Oct 2025' },
              { publication: 'Health & Wellness Magazine', headline: 'Best Gyms in Sri Lanka 2025', date: 'Sep 2025' },
              { publication: 'Business Today', headline: 'Success Story: Fitness Sharks Growth', date: 'Aug 2025' },
              { publication: 'Daily News', headline: 'Community Fitness Programs Launch', date: 'Jul 2025' },
              { publication: 'Lifestyle Asia', headline: 'Premium Fitness Experiences', date: 'Jun 2025' },
              { publication: 'Sports Weekly', headline: 'Annual Fitness Challenge Success', date: 'May 2025' }
            ].map((coverage, idx) => (
              <div key={idx} className="p-6 transition duration-300 bg-white border-l-4 border-pink-500 shadow-md rounded-xl hover:shadow-lg">
                <div className="mb-2 text-sm font-semibold text-pink-600">{coverage.publication}</div>
                <h3 className="mb-2 text-lg font-bold text-blue-900">{coverage.headline}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{coverage.date}</span>
                  <button
                    onClick={() => alert(`Opening article: ${coverage.headline}`)}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Read Article →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-white bg-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6 text-2xl font-bold text-blue-400">Fitness Sharks</div>
          <p className="mb-4 text-gray-400">Leading the fitness revolution in Sri Lanka</p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <a href="/" className="hover:text-pink-400">Home</a>
            <a href="/about" className="hover:text-pink-400">About</a>
            <a href="/careers" className="hover:text-pink-400">Careers</a>
            <a href="/contact" className="hover:text-pink-400">Contact</a>
          </div>
          <div className="pt-6 mt-6 text-sm text-gray-500 border-t border-gray-800">
            © 2025 Fitness Sharks. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}