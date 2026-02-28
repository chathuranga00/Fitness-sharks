import React, { useState } from 'react';
import { Dumbbell, Clock, TrendingUp, Users, Star, CheckCircle, ArrowRight, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WorkoutPlans() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');

  const workoutPlans = [
    {
      id: 1,
      title: '30-Day Full Body Transformation',
      level: 'Beginner',
      duration: '30 days',
      sessionsPerWeek: 4,
      minutesPerSession: 45,
      image: '💪',
      rating: 4.9,
      enrolled: 12543,
      description: 'Complete body transformation program designed for beginners. Build strength, lose fat, and boost confidence.',
      goals: ['Build Muscle', 'Lose Fat', 'Increase Energy'],
      equipment: ['Dumbbells', 'Resistance Bands', 'Mat'],
      features: [
        'Progressive overload system',
        'Video demonstrations for each exercise',
        'Nutrition guide included',
        'Weekly progress tracking',
        'Community support group'
      ]
    },
    {
      id: 2,
      title: 'HIIT Power Hour',
      level: 'Intermediate',
      duration: '21 days',
      sessionsPerWeek: 5,
      minutesPerSession: 30,
      image: '🔥',
      rating: 4.8,
      enrolled: 18234,
      description: 'High-intensity interval training to maximize calorie burn and improve cardiovascular fitness.',
      goals: ['Fat Loss', 'Endurance', 'Cardiovascular Health'],
      equipment: ['No Equipment Needed'],
      features: [
        'Tabata-style workouts',
        'Heart rate zone training',
        'Calorie burn calculator',
        'Rest day recovery routines',
        'Mobile app integration'
      ]
    },
    {
      id: 3,
      title: 'Strength Builder Pro',
      level: 'Advanced',
      duration: '90 days',
      sessionsPerWeek: 6,
      minutesPerSession: 60,
      image: '🏋️',
      rating: 4.9,
      enrolled: 8967,
      description: 'Advanced strength training program for serious athletes. Focus on compound movements and progressive overload.',
      goals: ['Strength Gain', 'Muscle Mass', 'Power Development'],
      equipment: ['Barbell', 'Squat Rack', 'Bench', 'Dumbbells'],
      features: [
        'Periodization training cycles',
        '1RM tracking and testing',
        'Advanced lifting techniques',
        'Competition preparation',
        'Personal form check service'
      ]
    },
    {
      id: 4,
      title: 'Yoga Flow & Flexibility',
      level: 'All Levels',
      duration: '28 days',
      sessionsPerWeek: 3,
      minutesPerSession: 40,
      image: '🧘',
      rating: 4.7,
      enrolled: 15432,
      description: 'Improve flexibility, balance, and mental wellness through guided yoga practice.',
      goals: ['Flexibility', 'Stress Relief', 'Balance'],
      equipment: ['Yoga Mat', 'Blocks (Optional)'],
      features: [
        'Morning and evening flows',
        'Meditation techniques',
        'Breathing exercises',
        'Flexibility tracking',
        'Relaxation music library'
      ]
    },
    {
      id: 5,
      title: 'Home Bodyweight Warrior',
      level: 'Beginner',
      duration: '45 days',
      sessionsPerWeek: 4,
      minutesPerSession: 35,
      image: '🤸',
      rating: 4.8,
      enrolled: 21098,
      description: 'No equipment needed! Build strength and endurance using only your bodyweight.',
      goals: ['Strength', 'Endurance', 'Mobility'],
      equipment: ['None - Bodyweight Only'],
      features: [
        'No gym membership required',
        'Follow-along videos',
        'Progression exercises',
        'Anywhere, anytime workouts',
        'Skill development tracking'
      ]
    },
    {
      id: 6,
      title: 'Runner\'s Conditioning',
      level: 'Intermediate',
      duration: '60 days',
      sessionsPerWeek: 5,
      minutesPerSession: 50,
      image: '🏃',
      rating: 4.7,
      enrolled: 9876,
      description: 'Build running endurance, speed, and prevent injuries with this comprehensive conditioning program.',
      goals: ['Running Endurance', 'Speed', 'Injury Prevention'],
      equipment: ['Running Shoes', 'Optional: Track'],
      features: [
        'Interval training plans',
        'Distance progression',
        'Strength training for runners',
        'Stretching routines',
        'Race preparation guides'
      ]
    },
    {
      id: 7,
      title: 'CrossFit Fundamentals',
      level: 'Intermediate',
      duration: '42 days',
      sessionsPerWeek: 5,
      minutesPerSession: 55,
      image: '⚡',
      rating: 4.9,
      enrolled: 11234,
      description: 'Master CrossFit basics with functional movements, Olympic lifts, and metabolic conditioning.',
      goals: ['Functional Fitness', 'Strength', 'Conditioning'],
      equipment: ['Barbell', 'Kettlebell', 'Pull-up Bar', 'Jump Rope'],
      features: [
        'WOD (Workout of the Day)',
        'Olympic lifting tutorials',
        'Gymnastics progressions',
        'Benchmark tracking',
        'Community leaderboard'
      ]
    },
    {
      id: 8,
      title: 'Senior Fitness & Mobility',
      level: 'Beginner',
      duration: '60 days',
      sessionsPerWeek: 3,
      minutesPerSession: 30,
      image: '👴',
      rating: 4.9,
      enrolled: 6543,
      description: 'Safe, effective workouts designed for seniors to maintain strength, balance, and independence.',
      goals: ['Balance', 'Strength', 'Independence'],
      equipment: ['Chair', 'Light Weights'],
      features: [
        'Low-impact exercises',
        'Fall prevention focus',
        'Joint-friendly movements',
        'Chair-based options',
        'Senior community support'
      ]
    }
  ];

  const filteredPlans = workoutPlans.filter(plan => {
    const levelMatch = selectedLevel === 'all' || plan.level === selectedLevel;
    const durationDays = parseInt(plan.duration);
    let durationMatch = true;
    
    if (selectedDuration === 'short') durationMatch = durationDays <= 30;
    else if (selectedDuration === 'medium') durationMatch = durationDays > 30 && durationDays <= 60;
    else if (selectedDuration === 'long') durationMatch = durationDays > 60;
    
    return levelMatch && durationMatch;
  });

  const getLevelColor = (level) => {
    switch(level) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-300';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 px-6 py-4 text-white shadow-2xl bg-gradient-to-r from-blue-700 to-blue-900">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-pink-400">🦈</span>
            <h1 className="text-2xl font-bold">Fitness Sharks</h1>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 font-semibold transition bg-pink-500 rounded-full hover:bg-pink-600"
          >
            Back to Home
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 text-white bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="mx-auto text-center max-w-7xl">
          <Dumbbell className="w-16 h-16 mx-auto mb-4 text-pink-400" />
          <h2 className="mb-4 text-5xl font-extrabold">Workout Plans</h2>
          <p className="max-w-3xl mx-auto text-xl opacity-90">
            Choose from our professionally designed workout programs tailored to your fitness level and goals.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 py-8 bg-white shadow-md">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Filter Plans</h3>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Fitness Level</label>
              <div className="flex gap-2">
                {['all', 'Beginner', 'Intermediate', 'Advanced'].map(level => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      selectedLevel === level
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {level === 'all' ? 'All Levels' : level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Duration</label>
              <div className="flex gap-2">
                {[
                  { value: 'all', label: 'All' },
                  { value: 'short', label: '≤30 Days' },
                  { value: 'medium', label: '31-60 Days' },
                  { value: 'long', label: '60+ Days' }
                ].map(duration => (
                  <button
                    key={duration.value}
                    onClick={() => setSelectedDuration(duration.value)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      selectedDuration === duration.value
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {duration.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workout Plans Grid */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPlans.map(plan => (
              <div key={plan.id} className="overflow-hidden transition transform bg-white shadow-xl rounded-2xl hover:shadow-2xl hover:-translate-y-1">
                <div className="p-6 text-center text-white bg-gradient-to-r from-blue-500 to-purple-500">
                  <div className="mb-3 text-6xl">{plan.image}</div>
                  <h3 className="mb-2 text-2xl font-bold">{plan.title}</h3>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{plan.rating}</span>
                    <span className="opacity-75">({plan.enrolled.toLocaleString()} enrolled)</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${getLevelColor(plan.level)}`}>
                      {plan.level}
                    </span>
                    <span className="px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 border-2 border-blue-300 rounded-full">
                      {plan.duration}
                    </span>
                  </div>

                  <p className="mb-4 leading-relaxed text-gray-600">{plan.description}</p>

                  <div className="mb-4 space-y-3">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">{plan.minutesPerSession} min/session</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="font-medium">{plan.sessionsPerWeek}x per week</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">{plan.enrolled.toLocaleString()} members</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="mb-2 font-semibold text-gray-900">Goals:</h4>
                    <div className="flex flex-wrap gap-2">
                      {plan.goals.map((goal, idx) => (
                        <span key={idx} className="px-2 py-1 text-sm text-green-700 rounded bg-green-50">
                          {goal}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="mb-2 font-semibold text-gray-900">Equipment:</h4>
                    <div className="flex flex-wrap gap-2">
                      {plan.equipment.map((item, idx) => (
                        <span key={idx} className="px-2 py-1 text-sm text-orange-700 rounded bg-orange-50">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="mb-2 font-semibold text-gray-900">Features:</h4>
                    <ul className="space-y-1">
                      {plan.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="flex items-center justify-center w-full gap-2 py-3 font-bold text-white transition shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700">
                    Start This Plan
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-white bg-slate-900">
        <div className="mx-auto text-center max-w-7xl">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl font-bold text-pink-400">🦈</span>
            <span className="text-2xl font-bold">Fitness Sharks</span>
          </div>
          <p className="mb-4 text-gray-400">Transform your body, transform your life</p>
          <p className="text-sm text-gray-500">&copy; 2025 Fitness Sharks. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}