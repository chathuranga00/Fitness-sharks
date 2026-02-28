import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Activity,
  DollarSign,
  TrendingUp,
  Settings,
  LogOut,
  Bell,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  BarChart3,
  PieChart,
  Mail,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import UserManagement from '../components/UserManagement';
import GymManagement from '../components/GymManagement';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for gym admin dashboard
  const stats = [
    { id: 'members', title: 'Active Members', value: '2,847', change: '+12%', icon: Users, color: 'blue' },
    { id: 'sessions', title: 'Daily Check-ins', value: '421', change: '+8%', icon: Activity, color: 'green' },
    { id: 'revenue', title: 'Monthly Revenue', value: 'LKR 26,829,600', change: '+23%', icon: DollarSign, color: 'purple' },
    { id: 'growth', title: 'Member Growth', value: '15.3%', change: '+5%', icon: TrendingUp, color: 'pink' }
  ];

  const recentMembers = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@email.com', plan: 'Monthly', joined: '2025-01-15', status: 'Active' },
    { id: 2, name: 'Mike Chen', email: 'mike@email.com', plan: 'Annual', joined: '2025-01-14', status: 'Active' },
    { id: 3, name: 'Emma Davis', email: 'emma@email.com', plan: 'Day Pass', joined: '2025-01-13', status: 'Expired' },
    { id: 4, name: 'John Smith', email: 'john@email.com', plan: 'Monthly', joined: '2025-01-12', status: 'Active' },
    { id: 5, name: 'Lisa Wang', email: 'lisa@email.com', plan: 'Annual', joined: '2025-01-11', status: 'Active' }
  ];

  const recentActivities = [
    { id: 1, action: 'New member registration', user: 'Sarah Johnson', time: '2 minutes ago', type: 'success' },
    { id: 2, action: 'Membership payment processed', user: 'Mike Chen', time: '15 minutes ago', type: 'info' },
    { id: 3, action: 'Membership cancelled', user: 'Alex Brown', time: '1 hour ago', type: 'warning' },
    { id: 4, action: 'Equipment maintenance request', user: 'Emma Davis', time: '2 hours ago', type: 'info' },
    { id: 5, action: 'Staff login', user: 'Gym Manager', time: '3 hours ago', type: 'success' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Trial': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">👑</span>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="hidden md:block">
              <span className="px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full">
                Fitness Sharks Admin Panel
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.fullName || 'Admin User'}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <div className="flex items-center justify-center w-8 h-8 font-bold text-white bg-purple-600 rounded-full">
                {(user?.fullName || 'A').charAt(0)}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 transition rounded-lg hover:bg-red-50"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-white shadow-sm">
          <nav className="p-4">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${activeTab === 'overview' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <BarChart3 size={20} />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('members')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${activeTab === 'members' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Users size={20} />
                Members
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${activeTab === 'analytics' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <PieChart size={20} />
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('revenue')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${activeTab === 'revenue' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <DollarSign size={20} />
                Revenue
              </button>
              <button
                onClick={() => setActiveTab('gym')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${activeTab === 'gym' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Activity size={20} />
                Gym Management
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${activeTab === 'messages' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Mail size={20} />
                Messages
                {(() => {
                  const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
                  const unreadCount = messages.filter(msg => msg.status === 'unread').length;
                  return unreadCount > 0 ? (
                    <span className="px-2 py-1 ml-auto text-xs text-white bg-red-500 rounded-full">
                      {unreadCount}
                    </span>
                  ) : null;
                })()}
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${activeTab === 'settings' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Settings size={20} />
                Settings
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.id} className="p-6 bg-white border shadow-sm rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change} from last month
                        </p>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.color === 'blue' ? 'bg-blue-100' :
                        stat.color === 'green' ? 'bg-green-100' :
                          stat.color === 'purple' ? 'bg-purple-100' :
                            stat.color === 'pink' ? 'bg-pink-100' : 'bg-gray-100'
                        }`}>
                        <stat.icon className={`w-6 h-6 ${stat.color === 'blue' ? 'text-blue-600' :
                          stat.color === 'green' ? 'text-green-600' :
                            stat.color === 'purple' ? 'text-purple-600' :
                              stat.color === 'pink' ? 'text-pink-600' : 'text-gray-600'
                          }`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Member Growth</h3>
                  <div className="flex items-center justify-center h-64 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 mx-auto mb-2 text-blue-500" />
                      <p className="text-gray-600">Chart visualization would go here</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Revenue Breakdown</h3>
                  <div className="flex items-center justify-center h-64 rounded-lg bg-gradient-to-br from-green-50 to-blue-50">
                    <div className="text-center">
                      <PieChart className="w-16 h-16 mx-auto mb-2 text-green-500" />
                      <p className="text-gray-600">Revenue chart would go here</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Members</h3>
                    <button className="text-sm font-medium text-purple-600 hover:text-purple-700">
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {recentMembers.slice(0, 5).map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <div>
                          <p className="font-medium text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.email}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}>
                            {member.status}
                          </span>
                          <p className="mt-1 text-xs text-gray-500">{member.plan}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                    <button className="text-sm font-medium text-purple-600 hover:text-purple-700">
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                        <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === 'success' ? 'bg-green-500' :
                          activity.type === 'warning' ? 'bg-yellow-500' :
                            activity.type === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                          }`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-600">{activity.user} • {activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <UserManagement />
          )}

          {activeTab === 'gym' && (
            <GymManagement />
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
                <div className="flex items-center gap-3">
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 3 months</option>
                    <option>Last year</option>
                  </select>
                  <button className="flex items-center gap-2 px-4 py-2 text-white transition bg-purple-600 rounded-lg hover:bg-purple-700">
                    <Download size={16} />
                    Export Report
                  </button>
                </div>
              </div>

              {/* Analytics Cards */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-600">Monthly Visits</h3>
                    <Eye className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">8,473</p>
                  <p className="mt-1 text-sm text-green-600">+18% from last month</p>
                </div>
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-600">Active Members</h3>
                    <Users className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">2,345</p>
                  <p className="mt-1 text-sm text-green-600">+12% from last month</p>
                </div>
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-600">Retention Rate</h3>
                    <TrendingUp className="w-5 h-5 text-yellow-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">87.2%</p>
                  <p className="mt-1 text-sm text-green-600">+2% from last month</p>
                </div>
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-600">Avg. Workout Time</h3>
                    <Activity className="w-5 h-5 text-purple-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">1h 32m</p>
                  <p className="mt-1 text-sm text-green-600">+8% from last month</p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Traffic Sources</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Direct</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Search Engines</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-green-500 rounded-full" style={{ width: '32%' }}></div>
                        </div>
                        <span className="text-sm font-medium">32%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Social Media</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-purple-500 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Referrals</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-pink-500 rounded-full" style={{ width: '8%' }}></div>
                        </div>
                        <span className="text-sm font-medium">8%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Popular Pages</h3>
                  <div className="space-y-3">
                    {[
                      { page: '/dashboard', views: '45,231', percentage: '28%' },
                      { page: '/workout-plans', views: '32,145', percentage: '20%' },
                      { page: '/exercise-library', views: '28,934', percentage: '18%' },
                      { page: '/nutrition-guide', views: '21,567', percentage: '13%' },
                      { page: '/community-forum', views: '18,432', percentage: '11%' }
                    ].map((item) => (
                      <div key={item.page} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <div>
                          <p className="font-medium text-gray-900">{item.page}</p>
                          <p className="text-sm text-gray-600">{item.views} views</p>
                        </div>
                        <span className="text-sm font-medium text-purple-600">{item.percentage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Revenue Tab */}
          {activeTab === 'revenue' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Revenue Management</h2>
                <div className="flex items-center gap-3">
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>This Quarter</option>
                    <option>This Year</option>
                  </select>
                  <button className="flex items-center gap-2 px-4 py-2 text-white transition bg-green-600 rounded-lg hover:bg-green-700">
                    <Download size={16} />
                    Export Revenue
                  </button>
                </div>
              </div>

              {/* Revenue Stats */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
                    <DollarSign className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">LKR 38,235,000</p>
                  <p className="mt-1 text-sm text-green-600">+23% from last month</p>
                </div>
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-600">Subscriptions</h3>
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">8,432</p>
                  <p className="mt-1 text-sm text-green-600">+15% from last month</p>
                </div>
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-600">Avg. Revenue/User</h3>
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">LKR 4,536</p>
                  <p className="mt-1 text-sm text-green-600">+7% from last month</p>
                </div>
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-600">Churn Rate</h3>
                    <Activity className="w-5 h-5 text-red-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">2.4%</p>
                  <p className="mt-1 text-sm text-red-600">+0.3% from last month</p>
                </div>
              </div>

              {/* Revenue Breakdown */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Revenue by Plan</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
                      <div>
                        <p className="font-semibold text-blue-900">Pro Monthly</p>
                        <p className="text-sm text-blue-600">4,231 subscribers</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-blue-900">LKR 12,693,000</p>
                        <p className="text-sm text-blue-600">33% of total</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100">
                      <div>
                        <p className="font-semibold text-purple-900">Annual Pass</p>
                        <p className="text-sm text-purple-600">2,145 subscribers</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-purple-900">LKR 19,305,000</p>
                        <p className="text-sm text-purple-600">51% of total</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100">
                      <div>
                        <p className="font-semibold text-green-900">Free Trial Conversions</p>
                        <p className="text-sm text-green-600">2,056 conversions</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-900">LKR 6,237,000</p>
                        <p className="text-sm text-green-600">16% of total</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Recent Transactions</h3>
                  <div className="space-y-3">
                    {[
                      { user: 'Saman Perera', plan: 'Annual Pass', amount: 'LKR 149,700', status: 'Completed', time: '2 min ago' },
                      { user: 'Nimal Silva', plan: 'Monthly', amount: 'LKR 14,700', status: 'Completed', time: '15 min ago' },
                      { user: 'Kamala Fernando', plan: 'Monthly', amount: 'LKR 14,700', status: 'Pending', time: '1 hour ago' },
                      { user: 'Ruwan Jayasinghe', plan: 'Annual Pass', amount: 'LKR 149,700', status: 'Completed', time: '2 hours ago' },
                      { user: 'Priya Wickramasinghe', plan: 'Monthly', amount: 'LKR 14,700', status: 'Failed', time: '3 hours ago' }
                    ].map((transaction) => (
                      <div key={`${transaction.user}-${transaction.time}`} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <div>
                          <p className="font-medium text-gray-900">{transaction.user}</p>
                          <p className="text-sm text-gray-600">{transaction.plan} • {transaction.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{transaction.amount}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                            {transaction.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Trainers Tab */}
          {activeTab === 'trainers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Trainer Management</h2>
                <button className="flex items-center gap-2 px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700">
                  <Plus size={16} />
                  Add New Trainer
                </button>
              </div>

              {/* Trainer Stats */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-600">Total Trainers</h3>
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">24</p>
                  <p className="mt-1 text-sm text-green-600">+2 this month</p>
                </div>
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-600">Active Sessions</h3>
                    <Activity className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">156</p>
                  <p className="mt-1 text-sm text-green-600">+12 from yesterday</p>
                </div>
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-600">Avg. Rating</h3>
                    <TrendingUp className="w-5 h-5 text-yellow-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">4.8</p>
                  <p className="mt-1 text-sm text-green-600">+0.2 from last month</p>
                </div>
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-600">Specializations</h3>
                    <Settings className="w-5 h-5 text-purple-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                  <p className="mt-1 text-sm text-blue-600">Different areas</p>
                </div>
              </div>

              {/* Trainer Performance */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Top Performing Trainers</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Kasun Rajapaksa', specialty: 'Strength Training', rating: 4.9, sessions: 45, revenue: 'LKR 675,000' },
                      { name: 'Sanduni Perera', specialty: 'Yoga & Pilates', rating: 4.8, sessions: 38, revenue: 'LKR 570,000' },
                      { name: 'Chaminda Silva', specialty: 'CrossFit', rating: 4.7, sessions: 42, revenue: 'LKR 630,000' },
                      { name: 'Dilani Fernando', specialty: 'Cardio & HIIT', rating: 4.9, sessions: 35, revenue: 'LKR 525,000' }
                    ].map((trainer) => (
                      <div key={trainer.name} className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                            {trainer.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{trainer.name}</p>
                            <p className="text-sm text-gray-600">{trainer.specialty}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="text-yellow-500">★</span>
                            <span className="font-semibold">{trainer.rating}</span>
                          </div>
                          <p className="text-sm text-gray-600">{trainer.sessions} sessions</p>
                          <p className="text-sm font-semibold text-green-600">{trainer.revenue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Specialization Distribution</h3>
                  <div className="space-y-3">
                    {[
                      { specialty: 'Strength Training', count: 8, percentage: 33 },
                      { specialty: 'Cardio & HIIT', count: 6, percentage: 25 },
                      { specialty: 'Yoga & Pilates', count: 4, percentage: 17 },
                      { specialty: 'CrossFit', count: 3, percentage: 13 },
                      { specialty: 'Nutrition Coaching', count: 2, percentage: 8 },
                      { specialty: 'Rehabilitation', count: 1, percentage: 4 }
                    ].map((item) => (
                      <div key={item.specialty} className="flex items-center justify-between">
                        <span className="font-medium text-gray-700">{item.specialty}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                          <span className="w-8 text-sm font-medium text-gray-600">{item.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trainer Directory */}
              <div className="bg-white border shadow-sm rounded-xl">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Trainer Directory</h3>
                    <div className="flex items-center gap-3">
                      <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>All Trainers</option>
                        <option>Active</option>
                        <option>On Leave</option>
                        <option>Part-time</option>
                      </select>
                      <button className="flex items-center gap-2 px-3 py-2 text-sm transition border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Filter size={14} />
                        Filter
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 text-sm transition border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Download size={14} />
                        Export
                      </button>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Trainer</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Specialization</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Experience</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Rating</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Sessions/Month</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        {
                          name: 'Alex Rodriguez',
                          email: 'alex@fitnesssharks.com',
                          specialty: 'Strength Training',
                          experience: '8 years',
                          rating: 4.9,
                          status: 'Active',
                          sessions: 45,
                          certifications: 'NASM-CPT, CSCS'
                        },
                        {
                          name: 'Sarah Mitchell',
                          email: 'sarah@fitnesssharks.com',
                          specialty: 'Yoga & Pilates',
                          experience: '6 years',
                          rating: 4.8,
                          status: 'Active',
                          sessions: 38,
                          certifications: 'RYT-500, PMA-CPT'
                        },
                        {
                          name: 'Mike Johnson',
                          email: 'mike@fitnesssharks.com',
                          specialty: 'CrossFit',
                          experience: '5 years',
                          rating: 4.7,
                          status: 'Active',
                          sessions: 42,
                          certifications: 'CF-L2, USAW-L1'
                        },
                        {
                          name: 'Emma Chen',
                          email: 'emma@fitnesssharks.com',
                          specialty: 'Cardio & HIIT',
                          experience: '4 years',
                          rating: 4.9,
                          status: 'Part-time',
                          sessions: 35,
                          certifications: 'ACSM-CPT, TRX-STC'
                        },
                        {
                          name: 'David Wilson',
                          email: 'david@fitnesssharks.com',
                          specialty: 'Rehabilitation',
                          experience: '10 years',
                          rating: 4.6,
                          status: 'On Leave',
                          sessions: 0,
                          certifications: 'DPT, CSCS, CES'
                        }
                      ].map((trainer) => (
                        <tr key={trainer.email} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                                {trainer.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{trainer.name}</div>
                                <div className="text-sm text-gray-500">{trainer.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{trainer.specialty}</div>
                            <div className="text-xs text-gray-500">{trainer.certifications}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{trainer.experience}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-500">★</span>
                              <span className="text-sm font-medium text-gray-900">{trainer.rating}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${trainer.status === 'Active' ? 'bg-green-100 text-green-800' :
                              trainer.status === 'Part-time' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                              {trainer.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{trainer.sessions}</td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <button className="text-blue-600 hover:text-blue-900" title="View Profile">
                                <Eye size={16} />
                              </button>
                              <button className="text-green-600 hover:text-green-900" title="Edit Trainer">
                                <Edit size={16} />
                              </button>
                              <button className="text-purple-600 hover:text-purple-900" title="Schedule">
                                <Activity size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="p-6 text-white bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <h4 className="mb-2 text-lg font-semibold">Schedule Management</h4>
                  <p className="mb-4 text-blue-100">Manage trainer schedules and availability</p>
                  <button className="px-4 py-2 font-medium text-blue-600 transition bg-white rounded-lg hover:bg-blue-50">
                    View Schedules
                  </button>
                </div>
                <div className="p-6 text-white bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                  <h4 className="mb-2 text-lg font-semibold">Performance Reports</h4>
                  <p className="mb-4 text-green-100">Generate detailed trainer performance analytics</p>
                  <button className="px-4 py-2 font-medium text-green-600 transition bg-white rounded-lg hover:bg-green-50">
                    Generate Report
                  </button>
                </div>
                <div className="p-6 text-white bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                  <h4 className="mb-2 text-lg font-semibold">Training Programs</h4>
                  <p className="mb-4 text-purple-100">Manage certification and training programs</p>
                  <button className="px-4 py-2 font-medium text-purple-600 transition bg-white rounded-lg hover:bg-purple-50">
                    View Programs
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Contact Messages</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
                      const updatedMessages = messages.map(msg => ({ ...msg, status: 'read' }));
                      localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
                      window.location.reload();
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    <CheckCircle size={16} />
                    Mark All Read
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete all messages? This action cannot be undone.')) {
                        localStorage.removeItem('contactMessages');
                        window.location.reload();
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-white transition bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    <Trash2 size={16} />
                    Clear All
                  </button>
                </div>
              </div>

              {(() => {
                const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
                const unreadCount = messages.filter(msg => msg.status === 'unread').length;
                const totalCount = messages.length;

                if (totalCount === 0) {
                  return (
                    <div className="p-12 text-center bg-white border shadow-sm rounded-xl">
                      <Mail className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <h3 className="mb-2 text-xl font-semibold text-gray-900">No Messages Yet</h3>
                      <p className="text-gray-600">Contact form messages will appear here when users submit them.</p>
                    </div>
                  );
                }

                return (
                  <>
                    {/* Message Stats */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div className="p-6 bg-white border shadow-sm rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Total Messages</p>
                            <p className="mt-1 text-2xl font-bold text-gray-900">{totalCount}</p>
                          </div>
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <Mail className="w-6 h-6 text-blue-600" />
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-white border shadow-sm rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Unread Messages</p>
                            <p className="mt-1 text-2xl font-bold text-gray-900">{unreadCount}</p>
                          </div>
                          <div className="p-3 bg-red-100 rounded-lg">
                            <AlertCircle className="w-6 h-6 text-red-600" />
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-white border shadow-sm rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Response Rate</p>
                            <p className="mt-1 text-2xl font-bold text-gray-900">98%</p>
                          </div>
                          <div className="p-3 bg-green-100 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Messages List */}
                    <div className="bg-white border shadow-sm rounded-xl">
                      <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Messages</h3>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {messages.map((message) => (
                          <div key={message.id} className={`p-6 hover:bg-gray-50 transition ${message.status === 'unread' ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="text-lg font-semibold text-gray-900">{message.name}</h4>
                                  {message.status === 'unread' && (
                                    <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">
                                      New
                                    </span>
                                  )}
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${message.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {message.priority === 'high' ? 'High Priority' : 'Normal'}
                                  </span>
                                </div>
                                <div className="grid grid-cols-1 gap-4 mb-3 md:grid-cols-2">
                                  <div>
                                    <p className="text-sm text-gray-600">
                                      <strong>Email:</strong> {message.email}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      <strong>Phone:</strong> {message.phone}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">
                                      <strong>Subject:</strong> {message.subject}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      <strong>Received:</strong> {new Date(message.timestamp).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                                <div className="p-4 rounded-lg bg-gray-50">
                                  <p className="leading-relaxed text-gray-700">{message.message}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 ml-4">
                                <button
                                  onClick={() => {
                                    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
                                    const updatedMessages = messages.map(msg =>
                                      msg.id === message.id ? { ...msg, status: msg.status === 'read' ? 'unread' : 'read' } : msg
                                    );
                                    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
                                    window.location.reload();
                                  }}
                                  className={`p-2 rounded-lg transition ${message.status === 'read' ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                    }`}
                                  title={message.status === 'read' ? 'Mark as unread' : 'Mark as read'}
                                >
                                  {message.status === 'read' ? <Mail size={16} /> : <CheckCircle size={16} />}
                                </button>
                                <button
                                  onClick={() => window.location.href = `mailto:${message.email}?subject=Re: ${message.subject}&body=Dear ${message.name},%0D%0A%0D%0AThank you for contacting Fitness Sharks.%0D%0A%0D%0A`}
                                  className="p-2 text-green-600 transition bg-green-100 rounded-lg hover:bg-green-200"
                                  title="Reply via email"
                                >
                                  <Mail size={16} />
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this message?')) {
                                      const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
                                      const updatedMessages = messages.filter(msg => msg.id !== message.id);
                                      localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
                                      window.location.reload();
                                    }
                                  }}
                                  className="p-2 text-red-600 transition bg-red-100 rounded-lg hover:bg-red-200"
                                  title="Delete message"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
                <button className="flex items-center gap-2 px-4 py-2 text-white transition bg-green-600 rounded-lg hover:bg-green-700">
                  <Download size={16} />
                  Backup Data
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* General Settings */}
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">General Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Site Name</label>
                      <input
                        type="text"
                        defaultValue="Fitness Sharks"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Site Description</label>
                      <textarea
                        rows="3"
                        defaultValue="Best fitness site for beginners. Track calories, monitor heart rate, and achieve your goals with ease."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Contact Email</label>
                      <input
                        type="email"
                        defaultValue="admin@fitnesssharks.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Maintenance Mode</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Security Settings */}
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Security Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Two-Factor Authentication</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Login Notifications</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option>30</option>
                        <option>60</option>
                        <option>120</option>
                        <option>240</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Password Policy</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option>Strong (8+ chars, mixed case, numbers, symbols)</option>
                        <option>Medium (8+ chars, mixed case, numbers)</option>
                        <option>Basic (6+ chars)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Email Settings */}
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Email Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">SMTP Server</label>
                      <input
                        type="text"
                        defaultValue="smtp.fitnesssharks.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Port</label>
                        <input
                          type="number"
                          defaultValue="587"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Encryption</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                          <option>TLS</option>
                          <option>SSL</option>
                          <option>None</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Email Notifications</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* System Information */}
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">System Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Version</span>
                      <span className="text-sm font-medium text-gray-900">v2.1.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Database</span>
                      <span className="text-sm font-medium text-gray-900">PostgreSQL 14.2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Server</span>
                      <span className="text-sm font-medium text-gray-900">Ubuntu 22.04 LTS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Last Backup</span>
                      <span className="text-sm font-medium text-gray-900">2 hours ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Uptime</span>
                      <span className="text-sm font-medium text-green-600">99.9%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Settings Button */}
              <div className="flex justify-end">
                <button className="px-6 py-3 font-medium text-white transition bg-purple-600 rounded-lg hover:bg-purple-700">
                  Save All Settings
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}