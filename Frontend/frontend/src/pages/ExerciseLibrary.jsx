import React, { useState } from 'react';
import { Activity, TrendingUp, Users, Calendar, Clock, Heart, Zap, Target, Award, ChevronDown, ChevronUp } from 'lucide-react';

export default function ExerciseLibrary({ navigateTo }) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [expandedProgram, setExpandedProgram] = useState(null);

  // Real-time gym statistics
  const gymStats = [
    { icon: <Users className="w-8 h-8" />, label: 'Active Members', value: '247', change: '+12%', color: 'blue' },
    { icon: <Activity className="w-8 h-8" />, label: 'Live Sessions', value: '34', change: '+8%', color: 'green' },
    { icon: <Heart className="w-8 h-8" />, label: 'Avg Heart Rate', value: '142 bpm', change: '+3%', color: 'red' },
    { icon: <Zap className="w-8 h-8" />, label: 'Calories Burned', value: '45.2K', change: '+15%', color: 'orange' },
  ];

  // Customer activity data
  const customerActivities = [
    { id: 1, name: 'Sarah Johnson', activity: 'HIIT Training', duration: '42 min', calories: 385, heartRate: 156, status: 'active' },
    { id: 2, name: 'Mike Chen', activity: 'Strength Training', duration: '28 min', calories: 220, heartRate: 128, status: 'active' },
    { id: 3, name: 'Emma Davis', activity: 'Yoga Flow', duration: '55 min', calories: 145, heartRate: 98, status: 'active' },
    { id: 4, name: 'James Wilson', activity: 'Cardio Blast', duration: '35 min', calories: 412, heartRate: 165, status: 'active' },
    { id: 5, name: 'Lisa Brown', activity: 'Cycling', duration: '48 min', calories: 368, heartRate: 142, status: 'completed' },
    { id: 6, name: 'David Lee', activity: 'CrossFit', duration: '50 min', calories: 495, heartRate: 172, status: 'active' },
  ];

  // Weekly analytics data
  const weeklyData = [
    { day: 'Mon', members: 189, sessions: 42, calories: 38400 },
    { day: 'Tue', members: 203, sessions: 48, calories: 41200 },
    { day: 'Wed', members: 215, sessions: 51, calories: 43800 },
    { day: 'Thu', members: 198, sessions: 45, calories: 39600 },
    { day: 'Fri', members: 234, sessions: 56, calories: 48200 },
    { day: 'Sat', members: 267, sessions: 62, calories: 52100 },
    { day: 'Sun', members: 247, sessions: 58, calories: 45200 },
  ];

  // Training programs
  const trainingPrograms = [
    {
      id: 1,
      name: 'Beginner Full Body',
      level: 'Beginner',
      duration: '6 weeks',
      sessions: 12,
      enrolled: 87,
      description: 'Perfect introduction to strength training covering all major muscle groups',
      schedule: ['Monday: Upper Body', 'Wednesday: Lower Body', 'Friday: Full Body Circuit'],
      features: ['Form guidance', 'Progressive overload', 'Video demonstrations', 'Nutrition tips']
    },
    {
      id: 2,
      name: 'HIIT Intensive',
      level: 'Intermediate',
      duration: '4 weeks',
      sessions: 16,
      enrolled: 124,
      description: 'High-intensity interval training for maximum calorie burn and cardiovascular fitness',
      schedule: ['Mon/Thu: Cardio HIIT', 'Tue/Fri: Strength HIIT', 'Wed/Sat: Mixed HIIT'],
      features: ['Heart rate zones', 'Tabata protocols', 'Recovery tracking', 'Performance metrics']
    },
    {
      id: 3,
      name: 'Strength & Power',
      level: 'Advanced',
      duration: '8 weeks',
      sessions: 24,
      enrolled: 56,
      description: 'Advanced powerlifting and strength building program for experienced athletes',
      schedule: ['Mon: Squat Focus', 'Wed: Bench Press Focus', 'Fri: Deadlift Focus', 'Sat: Accessory Work'],
      features: ['1RM tracking', 'Periodization', 'Competition prep', 'Advanced techniques']
    },
    {
      id: 4,
      name: 'Yoga & Flexibility',
      level: 'All Levels',
      duration: '4 weeks',
      sessions: 12,
      enrolled: 143,
      description: 'Improve flexibility, balance, and mental wellness through guided yoga practice',
      schedule: ['Mon/Wed/Fri: Morning Flow', 'Tue/Thu: Evening Stretch', 'Sun: Power Yoga'],
      features: ['Meditation guides', 'Flexibility tracking', 'Stress monitoring', 'Breathing exercises']
    },
    {
      id: 5,
      name: 'CrossFit Fundamentals',
      level: 'Intermediate',
      duration: '6 weeks',
      sessions: 18,
      enrolled: 92,
      description: 'Master the fundamentals of CrossFit with Olympic lifts, gymnastics, and metabolic conditioning',
      schedule: ['Mon: Oly Lifting', 'Wed: Gymnastics', 'Fri: Metcon', 'Sat: Team WOD'],
      features: ['Skill progressions', 'WOD scaling', 'Community leaderboard', 'Benchmark tracking']
    }
  ];

  const maxMembers = Math.max(...weeklyData.map(d => d.members));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="sticky top-0 z-50 px-6 py-4 text-white shadow-2xl bg-gradient-to-r from-blue-700 to-blue-900">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-pink-400">🦈</span>
            <h1 className="text-2xl font-bold">Fitness Sharks Analytics</h1>
          </div>
          <button 
            onClick={() => navigateTo && navigateTo('home')}
            className="px-6 py-2 font-semibold transition bg-pink-500 rounded-full hover:bg-pink-600"
          >
            Back to Home
          </button>
        </div>
      </header>

      <section className="px-6 py-12 text-white bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-12 h-12 text-pink-400" />
            <h2 className="text-4xl font-extrabold md:text-5xl">Exercise Library</h2>
          </div>
          <p className="max-w-3xl text-xl opacity-90">
            Monitor live gym activity, analyze customer performance, and manage training programs all in one powerful dashboard.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 -mt-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {gymStats.map((stat, idx) => (
              <div key={idx} className="p-6 transition bg-white border-t-4 border-blue-500 shadow-xl rounded-2xl hover:shadow-2xl">
                <div className="mb-3 text-blue-600">{stat.icon}</div>
                <div className="mb-1 text-sm text-gray-500">{stat.label}</div>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm font-semibold text-green-600">{stat.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-2 p-2 overflow-x-auto bg-white shadow-lg rounded-xl">
            {['overview', 'activity', 'analytics', 'programs'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition ${
                  selectedTab === tab
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-8 pb-16">
        <div className="mx-auto max-w-7xl">
          {selectedTab === 'overview' && (
            <div className="space-y-8">
              <div className="p-8 bg-white shadow-xl rounded-2xl">
                <h3 className="flex items-center gap-2 mb-6 text-2xl font-bold text-gray-900">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  Quick Overview
                </h3>
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h4 className="mb-4 font-semibold text-gray-700">Today's Highlights</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                        <span className="text-gray-700">Peak Hours</span>
                        <span className="font-bold text-blue-900">6:00 PM - 8:00 PM</span>
                      </li>
                      <li className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                        <span className="text-gray-700">Most Popular Class</span>
                        <span className="font-bold text-green-900">HIIT Intensive</span>
                      </li>
                      <li className="flex items-center justify-between p-3 rounded-lg bg-orange-50">
                        <span className="text-gray-700">Total Check-ins</span>
                        <span className="font-bold text-orange-900">247 members</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-4 font-semibold text-gray-700">Performance Metrics</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center justify-between p-3 rounded-lg bg-red-50">
                        <span className="text-gray-700">Avg Session Duration</span>
                        <span className="font-bold text-red-900">43 minutes</span>
                      </li>
                      <li className="flex items-center justify-between p-3 rounded-lg bg-purple-50">
                        <span className="text-gray-700">Member Retention</span>
                        <span className="font-bold text-purple-900">94.2%</span>
                      </li>
                      <li className="flex items-center justify-between p-3 rounded-lg bg-pink-50">
                        <span className="text-gray-700">Goal Achievement</span>
                        <span className="font-bold text-pink-900">78.5%</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'activity' && (
            <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
              <div className="p-6 text-white bg-gradient-to-r from-blue-600 to-purple-600">
                <h3 className="flex items-center gap-2 text-2xl font-bold">
                  <Users className="w-6 h-6" />
                  Live Customer Activity
                </h3>
                <p className="mt-1 opacity-90">Real-time monitoring of all active gym sessions</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Member</th>
                      <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Activity</th>
                      <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Duration</th>
                      <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Calories</th>
                      <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Heart Rate</th>
                      <th className="px-6 py-4 text-sm font-semibold text-left text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {customerActivities.map(customer => (
                      <tr key={customer.id} className="transition hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">{customer.name}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{customer.activity}</td>
                        <td className="px-6 py-4 text-gray-700">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {customer.duration}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 text-sm font-semibold text-orange-800 bg-orange-100 rounded-full">
                            {customer.calories} cal
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-1 px-3 py-1 text-sm font-semibold text-red-800 bg-red-100 rounded-full w-fit">
                            <Heart className="w-4 h-4" />
                            {customer.heartRate}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            customer.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {customer.status === 'active' ? '🟢 Active' : '✓ Completed'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedTab === 'analytics' && (
            <div className="space-y-8">
              <div className="p-8 bg-white shadow-xl rounded-2xl">
                <h3 className="flex items-center gap-2 mb-6 text-2xl font-bold text-gray-900">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  Weekly Performance Analytics
                </h3>
                <div className="mb-12">
                  <h4 className="mb-4 font-semibold text-gray-700">Daily Member Check-ins</h4>
                  <div className="flex items-end justify-between h-64 gap-2">
                    {weeklyData.map((day, idx) => (
                      <div key={idx} className="flex flex-col items-center flex-1 gap-2">
                        <div className="relative w-full transition rounded-t-lg cursor-pointer bg-gradient-to-t from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 group"
                             style={{ height: `${(day.members / maxMembers) * 100}%` }}>
                          <div className="absolute px-2 py-1 text-xs font-semibold text-white transition transform -translate-x-1/2 bg-gray-900 rounded opacity-0 -top-8 left-1/2 group-hover:opacity-100 whitespace-nowrap">
                            {day.members} members
                          </div>
                        </div>
                        <div className="text-sm font-semibold text-gray-700">{day.day}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                    <div className="mb-2 text-sm font-semibold text-blue-700">Total Weekly Members</div>
                    <div className="text-3xl font-bold text-blue-900">{weeklyData.reduce((sum, d) => sum + d.members, 0)}</div>
                    <div className="mt-1 text-xs text-blue-600">Avg: {Math.round(weeklyData.reduce((sum, d) => sum + d.members, 0) / 7)} per day</div>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                    <div className="mb-2 text-sm font-semibold text-green-700">Total Sessions</div>
                    <div className="text-3xl font-bold text-green-900">{weeklyData.reduce((sum, d) => sum + d.sessions, 0)}</div>
                    <div className="mt-1 text-xs text-green-600">Avg: {Math.round(weeklyData.reduce((sum, d) => sum + d.sessions, 0) / 7)} per day</div>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                    <div className="mb-2 text-sm font-semibold text-orange-700">Total Calories Burned</div>
                    <div className="text-3xl font-bold text-orange-900">{(weeklyData.reduce((sum, d) => sum + d.calories, 0) / 1000).toFixed(1)}K</div>
                    <div className="mt-1 text-xs text-orange-600">Avg: {(weeklyData.reduce((sum, d) => sum + d.calories, 0) / 7 / 1000).toFixed(1)}K per day</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'programs' && (
            <div className="space-y-6">
              <div className="p-6 bg-white shadow-xl rounded-2xl">
                <h3 className="flex items-center gap-2 mb-2 text-2xl font-bold text-gray-900">
                  <Target className="w-6 h-6 text-blue-600" />
                  Training Programs
                </h3>
                <p className="mb-6 text-gray-600">Comprehensive workout programs tailored for every fitness level</p>
              </div>

              {trainingPrograms.map(program => (
                <div key={program.id} className="overflow-hidden transition bg-white shadow-xl rounded-2xl hover:shadow-2xl">
                  <div className="p-6 text-white bg-gradient-to-r from-blue-500 to-purple-500">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="mb-2 text-2xl font-bold">{program.name}</h4>
                        <p className="opacity-90">{program.description}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                        program.level === 'Beginner' ? 'bg-green-400' :
                        program.level === 'Intermediate' ? 'bg-yellow-400 text-gray-900' :
                        program.level === 'Advanced' ? 'bg-red-400' : 'bg-blue-400'
                      }`}>
                        {program.level}
                      </span>
                    </div>
                    
                    <div className="flex gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        <span>{program.sessions} sessions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{program.enrolled} enrolled</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <button
                      onClick={() => setExpandedProgram(expandedProgram === program.id ? null : program.id)}
                      className="flex items-center justify-between w-full mb-4 font-semibold text-left text-gray-700 transition hover:text-blue-600"
                    >
                      <span>View Program Details</span>
                      {expandedProgram === program.id ? <ChevronUp /> : <ChevronDown />}
                    </button>

                    {expandedProgram === program.id && (
                      <div className="space-y-6">
                        <div>
                          <h5 className="flex items-center gap-2 mb-3 font-semibold text-gray-900">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            Weekly Schedule
                          </h5>
                          <ul className="space-y-2">
                            {program.schedule.map((session, idx) => (
                              <li key={idx} className="flex items-center gap-2 p-3 text-gray-700 rounded-lg bg-blue-50">
                                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                {session}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="flex items-center gap-2 mb-3 font-semibold text-gray-900">
                            <Award className="w-5 h-5 text-blue-600" />
                            Program Features
                          </h5>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {program.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2 p-3 text-gray-700 rounded-lg bg-green-50">
                                <span className="text-green-600">✓</span>
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>

                        <button className="w-full py-3 font-bold text-white transition shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700">
                          Enroll in Program
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      <footer className="px-6 py-12 text-white bg-slate-900">
        <div className="mx-auto text-center max-w-7xl">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl font-bold text-pink-400">🦈</span>
            <span className="text-2xl font-bold">Fitness Sharks</span>
          </div>
          <p className="mb-4 text-gray-400">Empowering your fitness journey with data-driven insights</p>
          <p className="text-sm text-gray-500">&copy; 2025 Fitness Sharks. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}