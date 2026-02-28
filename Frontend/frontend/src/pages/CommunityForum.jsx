import { useState } from 'react';
import { Menu, X, ChevronDown, Search, MessageCircle, ThumbsUp, User, Clock, TrendingUp, Users, Award, Send } from 'lucide-react';

export default function CommunityForum() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Topics');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [newComment, setNewComment] = useState('');

  const categories = [
    'All Topics',
    'Workout Tips',
    'Nutrition Advice',
    'Weight Loss',
    'Muscle Building',
    'Cardio',
    'Success Stories',
    'Equipment Reviews',
    'Motivation'
  ];

  const menuCategories = [
    'Workout Plans',
    'Nutrition Guide',
    'Exercise Library',
    'Progress Tracker',
    'Community Forum',
    'Blog Articles',
  ];

  const forumTopics = [
    {
      id: 1,
      category: 'Workout Tips',
      title: 'Best Morning Workout Routine for Beginners?',
      author: 'FitJourney23',
      avatar: 'FJ',
      timeAgo: '2 hours ago',
      replies: 24,
      likes: 45,
      views: 320,
      trending: true,
      excerpt: 'I just started my fitness journey and wondering what would be the best morning routine...',
      comments: [
        { author: 'HealthyLife', avatar: 'HL', time: '1 hour ago', text: 'Start with 10 minutes of light cardio, then some bodyweight exercises. Don\'t push too hard initially!' },
        { author: 'GymRat99', avatar: 'GR', time: '30 mins ago', text: 'I recommend trying yoga or stretching first thing in the morning. Really helps wake up the body.' }
      ]
    },
    {
      id: 2,
      category: 'Success Stories',
      title: 'Lost 30 pounds in 4 months - My Journey!',
      author: 'TransformQueen',
      avatar: 'TQ',
      timeAgo: '5 hours ago',
      replies: 67,
      likes: 234,
      views: 1250,
      trending: true,
      excerpt: 'I want to share my transformation story with this amazing community. Started at 180lbs...',
      comments: [
        { author: 'Motivated101', avatar: 'M1', time: '4 hours ago', text: 'This is so inspiring! What was your diet plan like?' },
        { author: 'FitnessFan', avatar: 'FF', time: '3 hours ago', text: 'Congratulations! You look amazing. Keep up the great work!' }
      ]
    },
    {
      id: 3,
      category: 'Nutrition Advice',
      title: 'High Protein Breakfast Ideas?',
      author: 'ProteinPower',
      avatar: 'PP',
      timeAgo: '8 hours ago',
      replies: 42,
      likes: 89,
      views: 560,
      excerpt: 'Looking for quick and easy high-protein breakfast recipes that I can prep...',
      comments: [
        { author: 'ChefFit', avatar: 'CF', time: '7 hours ago', text: 'Greek yogurt with berries and nuts is my go-to. 25g protein!' },
        { author: 'MealPrepper', avatar: 'MP', time: '6 hours ago', text: 'Egg muffins are great for meal prep. You can make a dozen on Sunday.' }
      ]
    },
    {
      id: 4,
      category: 'Muscle Building',
      title: 'How Long Before Seeing Muscle Gains?',
      author: 'NewLifter',
      avatar: 'NL',
      timeAgo: '12 hours ago',
      replies: 38,
      likes: 56,
      views: 445,
      excerpt: 'Been lifting for 3 weeks consistently. When should I expect to see results?',
      comments: [
        { author: 'VeteranLifter', avatar: 'VL', time: '11 hours ago', text: 'Usually takes 4-6 weeks to see noticeable changes. Stay consistent!' },
        { author: 'CoachMike', avatar: 'CM', time: '10 hours ago', text: 'Focus on progressive overload and proper nutrition. Results will come!' }
      ]
    },
    {
      id: 5,
      category: 'Weight Loss',
      title: 'Cardio vs Weight Training for Fat Loss?',
      author: 'FatLossFocus',
      avatar: 'FL',
      timeAgo: '1 day ago',
      replies: 91,
      likes: 167,
      views: 890,
      trending: true,
      excerpt: 'What is more effective for losing fat - cardio or weight training? Or should I do both?',
      comments: [
        { author: 'PersonalTrainerPro', avatar: 'PT', time: '23 hours ago', text: 'Both are important! Weight training builds muscle which increases metabolism.' },
        { author: 'CardioKing', avatar: 'CK', time: '22 hours ago', text: 'I do 3 days weights and 2 days cardio. Best results I\'ve seen!' }
      ]
    },
    {
      id: 6,
      category: 'Motivation',
      title: 'How Do You Stay Motivated on Tough Days?',
      author: 'StruggleBus',
      avatar: 'SB',
      timeAgo: '1 day ago',
      replies: 55,
      likes: 123,
      views: 670,
      excerpt: 'Some days I just don\'t feel like working out. How do you push through?',
      comments: [
        { author: 'NeverQuit', avatar: 'NQ', time: '20 hours ago', text: 'Remember why you started! Look at old photos for motivation.' },
        { author: 'DailyGrinder', avatar: 'DG', time: '18 hours ago', text: 'Just show up. Even a 10 minute workout is better than nothing.' }
      ]
    },
    {
      id: 7,
      category: 'Equipment Reviews',
      title: 'Best Budget Home Gym Equipment?',
      author: 'HomeGymmer',
      avatar: 'HG',
      timeAgo: '2 days ago',
      replies: 48,
      likes: 78,
      views: 520,
      excerpt: 'Looking to set up a home gym on a budget. What essential equipment should I get?',
      comments: [
        { author: 'GearExpert', avatar: 'GE', time: '1 day ago', text: 'Start with adjustable dumbbells and a bench. That covers most exercises!' },
        { author: 'BudgetFit', avatar: 'BF', time: '1 day ago', text: 'Resistance bands are super versatile and cheap. Highly recommend!' }
      ]
    },
    {
      id: 8,
      category: 'Cardio',
      title: 'Running vs Cycling - Which is Better?',
      author: 'CardioDebate',
      avatar: 'CD',
      timeAgo: '2 days ago',
      replies: 34,
      likes: 62,
      views: 410,
      excerpt: 'Trying to decide between taking up running or cycling for cardio. Thoughts?',
      comments: [
        { author: 'RunnerGirl', avatar: 'RG', time: '1 day ago', text: 'Running is free and you can do it anywhere! Plus great for bone density.' },
        { author: 'CyclePro', avatar: 'CP', time: '1 day ago', text: 'Cycling is easier on the joints and you can go further. Both are great though!' }
      ]
    }
  ];

  const communityStats = [
    { icon: <Users className="w-8 h-8" />, number: '25,000+', label: 'Active Members' },
    { icon: <MessageCircle className="w-8 h-8" />, number: '50,000+', label: 'Discussions' },
    { icon: <Award className="w-8 h-8" />, number: '1,500+', label: 'Success Stories' },
    { icon: <TrendingUp className="w-8 h-8" />, number: '100+', label: 'Daily Posts' }
  ];

  const filteredTopics = forumTopics.filter(topic => {
    const matchesCategory = selectedCategory === 'All Topics' || topic.category === selectedCategory;
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          topic.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePlaceholderClick = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    console.log("Placeholder action triggered.");
  };

  const handleAddComment = (topicId) => {
    if (newComment.trim()) {
      console.log(`Adding comment to topic ${topicId}: ${newComment}`);
      alert('Please log in to post comments!');
      setNewComment('');
    }
  };

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 text-white shadow-2xl bg-gradient-to-r from-blue-700 to-blue-900">
        <div className="flex items-center gap-2 text-2xl font-extrabold tracking-wide cursor-pointer">
          <span className="text-pink-400">🦈</span> Fitness Sharks
        </div>
        
        {/* Desktop Menu */}
        <div className="items-center hidden gap-8 text-lg font-medium md:flex">
          <a href="#home" className="transition duration-300 hover:text-pink-300">Home</a>
          <a href="#exercise" className="transition duration-300 hover:text-pink-300">Exercise Library</a>
          
          {/* More Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className="flex items-center gap-1 transition duration-300 hover:text-pink-300"
            >
              More <ChevronDown size={20} className={`transition-transform ${moreDropdownOpen ? 'rotate-180' : 'rotate-0'}`}/>
            </button>
            
            {moreDropdownOpen && (
              <div className="absolute right-0 w-56 mt-2 overflow-hidden bg-white rounded-lg shadow-2xl top-full">
                <div className="py-2">
                  {menuCategories.map((category, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        handlePlaceholderClick();
                        console.log(`Clicked: ${category}`);
                        setMoreDropdownOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-gray-700 transition hover:bg-pink-50 hover:text-pink-600"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={handlePlaceholderClick}
          className="hidden px-6 py-2 font-bold text-white transition transform bg-pink-500 rounded-full shadow-lg md:block hover:bg-pink-600 hover:scale-105"
        >
          LOG IN
        </button>

        {/* Mobile Menu Button */}
        <button 
          className="p-2 transition rounded-lg md:hidden hover:bg-blue-800" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} className="text-pink-300" /> : <Menu size={28} className="text-pink-300" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="relative z-40 flex flex-col gap-4 p-4 text-white bg-blue-900 shadow-xl md:hidden">
          <a href="#home" className="p-2 text-left transition rounded hover:text-pink-300" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#exercise" className="p-2 text-left transition rounded hover:text-pink-300" onClick={() => setMobileMenuOpen(false)}>Exercise Library</a>
          <button onClick={() => { handlePlaceholderClick(); setMobileMenuOpen(false); }} className="px-6 py-2 mt-2 font-semibold text-white transition bg-pink-500 rounded-full hover:bg-pink-600">LOG IN</button>
        </div>
      )}

      {/* Hero Section */}
      <section className="px-6 py-16 text-center text-white bg-gradient-to-r from-blue-600 to-blue-900">
        <MessageCircle className="w-20 h-20 mx-auto mb-6 text-pink-400" />
        <h1 className="mb-4 text-5xl font-extrabold md:text-6xl">Community Forum</h1>
        <p className="max-w-3xl mx-auto mb-8 text-xl md:text-2xl opacity-95">
          Connect with thousands of fitness enthusiasts. Share your journey, ask questions, and get inspired!
        </p>
      </section>

      {/* Community Stats */}
      <section className="px-6 py-12 bg-white">
        <div className="grid max-w-6xl gap-8 mx-auto sm:grid-cols-2 lg:grid-cols-4">
          {communityStats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center p-6 transition rounded-lg shadow-md bg-slate-50 hover:shadow-xl">
              <div className="mb-3 text-blue-600">{stat.icon}</div>
              <div className="mb-1 text-3xl font-bold text-blue-900">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Search and Filter */}
      <section className="px-6 py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-4 mb-8 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handlePlaceholderClick}
              className="px-8 py-3 font-bold text-white transition transform bg-pink-500 rounded-lg hover:bg-pink-600 hover:scale-105"
            >
              Start New Topic
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Forum Topics */}
      <section className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-4">
            {filteredTopics.map((topic) => (
              <div key={topic.id} className="overflow-hidden transition bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-xl">
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                      {topic.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {topic.trending && (
                              <span className="px-2 py-1 text-xs font-semibold text-pink-600 bg-pink-100 rounded-full">
                                🔥 Trending
                              </span>
                            )}
                            <span className="px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                              {topic.category}
                            </span>
                          </div>
                          <h3 className="mb-2 text-xl font-bold text-gray-900 hover:text-blue-600">
                            {topic.title}
                          </h3>
                          <p className="mb-3 text-gray-600">{topic.excerpt}</p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {topic.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {topic.timeAgo}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              {topic.replies} replies
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4" />
                              {topic.likes} likes
                            </span>
                            <span>{topic.views} views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                {selectedTopic === topic.id && (
                  <div className="px-6 py-4 border-t bg-gray-50">
                    <h4 className="mb-4 text-lg font-bold text-gray-900">Replies</h4>
                    <div className="mb-6 space-y-4">
                      {topic.comments.map((comment, idx) => (
                        <div key={idx} className="flex gap-3 p-4 bg-white rounded-lg">
                          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-sm font-bold text-white rounded-full bg-gradient-to-r from-green-400 to-blue-500">
                            {comment.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-gray-900">{comment.author}</span>
                              <span className="text-sm text-gray-500">{comment.time}</span>
                            </div>
                            <p className="text-gray-700">{comment.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Comment */}
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Add your reply..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleAddComment(topic.id)}
                        className="px-6 py-3 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-16 text-center text-white bg-gradient-to-r from-blue-600 to-blue-900">
        <h2 className="mb-4 text-4xl font-bold">Join the Conversation Today!</h2>
        <p className="max-w-2xl mx-auto mb-8 text-xl">
          Share your fitness journey, get expert advice, and connect with like-minded individuals.
        </p>
        <button
          onClick={handlePlaceholderClick}
          className="px-10 py-4 text-xl font-bold text-white transition transform bg-pink-500 rounded-full shadow-2xl hover:bg-pink-600 hover:scale-105"
        >
          Create Your Account
        </button>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-white bg-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <h4 className="mb-4 text-2xl font-bold text-blue-400">Fitness Sharks Community</h4>
          <p className="mb-4 text-gray-400">Your journey to better health starts here. Together, we're stronger.</p>
          <p className="text-sm text-gray-500">&copy; 2025 Fitness Sharks. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}