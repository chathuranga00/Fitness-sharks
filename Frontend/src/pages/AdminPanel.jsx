import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  CreditCard, 
  Activity, 
  UserCheck, 
  LogOut, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/apiService';

export default function AdminPanel() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState('memberships');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Data states
  const [memberships, setMemberships] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [trainingPlans, setTrainingPlans] = useState([]);
  const [users, setUsers] = useState([]);

  // Form states
  const [showMembershipForm, setShowMembershipForm] = useState(false);
  const [showTrainerForm, setShowTrainerForm] = useState(false);
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [membershipForm, setMembershipForm] = useState({
    name: '',
    description: '',
    price: '',
    durationMonths: ''
  });

  const [trainerForm, setTrainerForm] = useState({
    name: '',
    specialization: '',
    experience: '',
    email: '',
    phone: '',
    description: '',
    photo: null
  });

  const [planForm, setPlanForm] = useState({
    name: '',
    description: '',
    duration: '',
    difficulty: '',
    trainerId: ''
  });

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    setError('');
    
    try {
      switch (activeTab) {
        case 'memberships':
          await loadMemberships();
          break;
        case 'trainers':
          await loadTrainers();
          break;
        case 'plans':
          await loadTrainingPlans();
          break;
        case 'users':
          await loadUsers();
          break;
      }
    } catch (err) {
      setError('Failed to load data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMemberships = async () => {
    const result = await apiService.getAllMemberships();
    if (result.success) {
      setMemberships(result.memberships);
    } else {
      throw new Error(result.message);
    }
  };

  const loadTrainers = async () => {
    try {
      // Load from backend first
      const result = await apiService.getAllTrainers();
      if (result.success) {
        // Merge photos from localStorage
        const trainerPhotos = JSON.parse(localStorage.getItem('trainerPhotos') || '{}');
        const trainersWithPhotos = result.trainers.map(trainer => ({
          ...trainer,
          photo: trainerPhotos[trainer.id] || trainer.photo
        }));
        setTrainers(trainersWithPhotos);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Failed to load trainers from backend:', error);
      setTrainers([]);
    }
  };

  const loadTrainingPlans = async () => {
    try {
      // Load from backend
      const result = await apiService.getAllPlans();
      if (result.success) {
        setTrainingPlans(result.plans);
      } else {
        setTrainingPlans([]);
      }
    } catch (error) {
      console.error('Failed to load training plans:', error);
      setTrainingPlans([]);
    }
    
    // Also load trainers if not already loaded
    if (trainers.length === 0) {
      await loadTrainers();
    }
  };

  const loadUsers = async () => {
    const result = await apiService.getAllUsers();
    if (result.success) {
      setUsers(result.users);
    } else {
      throw new Error(result.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const resetForms = () => {
    setMembershipForm({ name: '', description: '', price: '', durationMonths: '' });
    setTrainerForm({ name: '', specialization: '', experience: '', email: '', phone: '', description: '', photo: null });
    setPlanForm({ name: '', description: '', duration: '', difficulty: '', trainerId: '' });
    setEditingItem(null);
  };

  // Membership functions
  const handleMembershipSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearMessages();

    try {
      const membershipData = {
        ...membershipForm,
        price: parseFloat(membershipForm.price),
        durationMonths: parseInt(membershipForm.durationMonths)
      };

      let result;
      if (editingItem) {
        result = await apiService.updateMembership(editingItem.id, membershipData);
      } else {
        result = await apiService.createMembership(membershipData);
      }

      if (result.success) {
        setSuccess(result.message);
        setShowMembershipForm(false);
        resetForms();
        await loadMemberships();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Operation failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMembership = async (id) => {
    if (!window.confirm('Are you sure you want to delete this membership plan?')) return;

    setLoading(true);
    try {
      const result = await apiService.deleteMembership(id);
      if (result.success) {
        setSuccess(result.message);
        await loadMemberships();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Delete failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Trainer functions
  const handleTrainerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearMessages();

    // Separate photo from trainer data
    const { photo, ...trainerDataWithoutPhoto } = trainerForm;
    const trainerData = {
      ...trainerDataWithoutPhoto,
      experience: parseInt(trainerForm.experience) || 0
    };

    try {
      let result;
      let trainerId;
      
      if (editingItem) {
        // Update trainer in backend (without photo)
        result = await apiService.updateTrainer(editingItem.id, trainerData);
        if (result.success) {
          trainerId = editingItem.id;
          console.log('Successfully updated trainer in backend');
        } else {
          throw new Error(result.message || 'Failed to update trainer');
        }
      } else {
        // Create new trainer in backend (without photo)
        result = await apiService.addTrainer(trainerData);
        if (result.success) {
          trainerId = result.trainer?.id;
          console.log('Successfully added trainer to backend');
        } else {
          throw new Error(result.message || 'Failed to add trainer');
        }
      }

      // Save photo to localStorage if provided
      if (photo && trainerId) {
        const trainerPhotos = JSON.parse(localStorage.getItem('trainerPhotos') || '{}');
        trainerPhotos[trainerId] = photo;
        localStorage.setItem('trainerPhotos', JSON.stringify(trainerPhotos));
        console.log('Photo saved to localStorage for trainer:', trainerId);
      }

      setSuccess(`Trainer ${editingItem ? 'updated' : 'added'} successfully!`);
      setShowTrainerForm(false);
      resetForms();
      await loadTrainers(); // Reload from backend
      
    } catch (err) {
      setError('Operation failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTrainer = async (id) => {
    if (!window.confirm('Are you sure you want to delete this trainer?')) return;

    setLoading(true);
    try {
      const result = await apiService.deleteTrainer(id);
      if (result.success) {
        setSuccess('Trainer deleted successfully!');
        console.log('Successfully deleted trainer from backend');
        await loadTrainers(); // Reload from backend
      } else {
        throw new Error(result.message || 'Failed to delete trainer');
      }
    } catch (err) {
      setError('Delete failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Training Plan functions
  const handlePlanSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearMessages();

    try {
      if (editingItem) {
        // Update plan in backend
        const result = await apiService.updatePlan(editingItem.id, planForm);
        if (result.success) {
          setSuccess('Training plan updated successfully!');
          console.log('Successfully updated plan in backend');
          await loadTrainingPlans(); // Reload from backend
        } else {
          throw new Error(result.message || 'Failed to update plan');
        }
      } else {
        // Create new plan in backend
        const result = await apiService.createPlan(planForm);
        if (result.success) {
          setSuccess('Training plan added successfully!');
          console.log('Successfully added plan to backend');
          await loadTrainingPlans(); // Reload from backend
        } else {
          throw new Error(result.message || 'Failed to add plan');
        }
      }

      setShowPlanForm(false);
      resetForms();
      
    } catch (err) {
      setError('Operation failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlan = async (id) => {
    if (!window.confirm('Are you sure you want to delete this training plan?')) return;

    setLoading(true);
    try {
      const result = await apiService.deletePlan(id);
      if (result.success) {
        setSuccess('Training plan deleted successfully!');
        console.log('Successfully deleted plan from backend');
        await loadTrainingPlans(); // Reload from backend
      } else {
        throw new Error(result.message || 'Failed to delete plan');
      }
    } catch (err) {
      setError('Delete failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // User functions
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

    setLoading(true);
    clearMessages();
    
    try {
      console.log('Attempting to delete user:', userId);
      const result = await apiService.deleteUser(userId);
      console.log('Delete result:', result);
      
      if (result.success) {
        setSuccess('User deleted successfully!');
        // Reload users list
        await loadUsers();
      } else {
        setError(result.message || 'Failed to delete user - user may not exist or you may not have permission');
      }
    } catch (err) {
      console.error('Delete user error:', err);
      setError('Delete failed: ' + (err.message || 'Unknown error occurred'));
    } finally {
      setLoading(false);
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
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <div className="hidden md:block">
              <span className="px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full">
                Fitness Sharks Management
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.username || 'Admin'}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <div className="flex items-center justify-center w-8 h-8 font-bold text-white bg-purple-600 rounded-full">
                {(user?.username || 'A').charAt(0).toUpperCase()}
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
                onClick={() => setActiveTab('memberships')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                  activeTab === 'memberships' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <CreditCard size={20} />
                Membership Plans
              </button>
              <button
                onClick={() => setActiveTab('trainers')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                  activeTab === 'trainers' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <UserCheck size={20} />
                Trainers
              </button>
              <button
                onClick={() => setActiveTab('plans')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                  activeTab === 'plans' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Activity size={20} />
                Training Plans
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                  activeTab === 'users' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users size={20} />
                Users
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                  activeTab === 'applications' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users size={20} />
                Career Applications
                {(() => {
                  const applications = JSON.parse(localStorage.getItem('careerApplications') || '[]');
                  const pendingCount = applications.filter(app => app.status === 'pending').length;
                  return pendingCount > 0 ? (
                    <span className="px-2 py-1 ml-auto text-xs text-white bg-red-500 rounded-full">
                      {pendingCount}
                    </span>
                  ) : null;
                })()}
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                  activeTab === 'messages' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Settings size={20} />
                Contact Messages
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
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Messages */}
          {error && (
            <div className="mb-4 p-4 text-red-800 bg-red-100 border border-red-200 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 text-green-800 bg-green-100 border border-green-200 rounded-lg">
              {success}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center p-8">
              <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Membership Plans Tab */}
          {activeTab === 'memberships' && !loading && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Membership Plans</h2>
                <button
                  onClick={() => {
                    clearMessages();
                    setShowMembershipForm(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-white transition bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  <Plus size={16} />
                  Add Membership Plan
                </button>
              </div>

              {/* Membership Form */}
              {showMembershipForm && (
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    {editingItem ? 'Edit Membership Plan' : 'Add New Membership Plan'}
                  </h3>
                  <form onSubmit={handleMembershipSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Plan Name</label>
                      <input
                        type="text"
                        value={membershipForm.name}
                        onChange={(e) => setMembershipForm({ ...membershipForm, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Price (LKR)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={membershipForm.price}
                        onChange={(e) => setMembershipForm({ ...membershipForm, price: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Duration (Months)</label>
                      <input
                        type="number"
                        value={membershipForm.durationMonths}
                        onChange={(e) => setMembershipForm({ ...membershipForm, durationMonths: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        value={membershipForm.description}
                        onChange={(e) => setMembershipForm({ ...membershipForm, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        rows="3"
                        required
                      />
                    </div>
                    <div className="flex items-end gap-3 md:col-span-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 text-white transition bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                      >
                        {editingItem ? 'Update Plan' : 'Add Plan'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowMembershipForm(false);
                          resetForms();
                        }}
                        className="px-4 py-2 text-gray-600 transition border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Memberships List */}
              <div className="bg-white border shadow-sm rounded-xl">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Current Plans ({memberships.length})</h3>
                </div>
                <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
                  {memberships.map((membership) => (
                    <div key={membership.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{membership.name}</h4>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingItem(membership);
                              setMembershipForm({
                                name: membership.name,
                                description: membership.description,
                                price: membership.price.toString(),
                                durationMonths: membership.durationMonths.toString()
                              });
                              setShowMembershipForm(true);
                            }}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteMembership(membership.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{membership.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600">LKR {membership.price.toLocaleString()}</span>
                        <span className="text-sm text-gray-500">{membership.durationMonths} months</span>
                      </div>
                    </div>
                  ))}
                  {memberships.length === 0 && (
                    <div className="col-span-full text-center py-8 text-gray-500">
                      No membership plans found. Add one to get started!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Trainers Tab */}
          {activeTab === 'trainers' && !loading && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Trainers</h2>
                <button
                  onClick={() => {
                    clearMessages();
                    setShowTrainerForm(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-white transition bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  <Plus size={16} />
                  Add Trainer
                </button>
              </div>

              {/* Trainer Form */}
              {showTrainerForm && (
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    {editingItem ? 'Edit Trainer' : 'Add New Trainer'}
                  </h3>
                  <form onSubmit={handleTrainerSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        value={trainerForm.name}
                        onChange={(e) => setTrainerForm({ ...trainerForm, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Specialization</label>
                      <input
                        type="text"
                        value={trainerForm.specialization}
                        onChange={(e) => setTrainerForm({ ...trainerForm, specialization: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Experience (Years)</label>
                      <input
                        type="number"
                        value={trainerForm.experience}
                        onChange={(e) => setTrainerForm({ ...trainerForm, experience: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={trainerForm.email}
                        onChange={(e) => setTrainerForm({ ...trainerForm, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="tel"
                        value={trainerForm.phone}
                        onChange={(e) => setTrainerForm({ ...trainerForm, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        value={trainerForm.description}
                        onChange={(e) => setTrainerForm({ ...trainerForm, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        rows="3"
                        placeholder="Brief description of the trainer's background and expertise..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-700">Profile Photo</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            // Convert to base64 for storage
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              setTrainerForm({ ...trainerForm, photo: event.target.result });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      {trainerForm.photo && (
                        <div className="mt-2">
                          <img 
                            src={trainerForm.photo} 
                            alt="Preview" 
                            className="w-20 h-20 object-cover rounded-lg border"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex items-end gap-3 md:col-span-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 text-white transition bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                      >
                        {editingItem ? 'Update Trainer' : 'Add Trainer'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowTrainerForm(false);
                          resetForms();
                        }}
                        className="px-4 py-2 text-gray-600 transition border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Trainers List */}
              <div className="bg-white border shadow-sm rounded-xl">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Current Trainers ({trainers.length})</h3>
                </div>
                <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
                  {trainers.map((trainer) => (
                    <div key={trainer.id} className="p-4 border border-gray-200 rounded-lg">
                      {/* Trainer Photo */}
                      {trainer.photo && (
                        <div className="mb-3 flex justify-center">
                          <img 
                            src={trainer.photo} 
                            alt={trainer.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                          />
                        </div>
                      )}
                      
                      <div className="mb-3">
                        <h4 className="font-semibold text-gray-900">{trainer.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Specialization:</strong> {trainer.specialization}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Experience:</strong> {trainer.experience} years
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Email:</strong> {trainer.email}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Phone:</strong> {trainer.phone}
                      </p>
                      {trainer.description && (
                        <p className="text-sm text-gray-600 italic mb-3">
                          "{trainer.description}"
                        </p>
                      )}
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200">
                        <button
                          onClick={() => {
                            setEditingItem(trainer);
                            // Load photo from localStorage
                            const trainerPhotos = JSON.parse(localStorage.getItem('trainerPhotos') || '{}');
                            setTrainerForm({
                              name: trainer.name,
                              specialization: trainer.specialization,
                              experience: trainer.experience,
                              email: trainer.email,
                              phone: trainer.phone,
                              description: trainer.description || '',
                              photo: trainerPhotos[trainer.id] || trainer.photo || null
                            });
                            setShowTrainerForm(true);
                            clearMessages();
                          }}
                          className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 transition border border-blue-600 rounded hover:bg-blue-50"
                        >
                          <Edit size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTrainer(trainer.id)}
                          className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 transition border border-red-600 rounded hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  {trainers.length === 0 && (
                    <div className="col-span-full text-center py-8 text-gray-500">
                      No trainers found. Add one to get started!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Training Plans Tab */}
          {activeTab === 'plans' && !loading && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Training Plans</h2>
                <button
                  onClick={() => {
                    clearMessages();
                    setShowPlanForm(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-white transition bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  <Plus size={16} />
                  Add Training Plan
                </button>
              </div>

              {/* Plan Form */}
              {showPlanForm && (
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    {editingItem ? 'Edit Training Plan' : 'Add New Training Plan'}
                  </h3>
                  <form onSubmit={handlePlanSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Plan Name</label>
                      <input
                        type="text"
                        value={planForm.name}
                        onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Duration</label>
                      <input
                        type="text"
                        placeholder="e.g., 4 weeks, 8 weeks"
                        value={planForm.duration}
                        onChange={(e) => setPlanForm({ ...planForm, duration: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Difficulty</label>
                      <select
                        value={planForm.difficulty}
                        onChange={(e) => setPlanForm({ ...planForm, difficulty: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      >
                        <option value="">Select difficulty</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Assigned Trainer</label>
                      <select
                        value={planForm.trainerId}
                        onChange={(e) => setPlanForm({ ...planForm, trainerId: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">No trainer assigned</option>
                        {trainers.map((trainer) => (
                          <option key={trainer.id} value={trainer.id}>
                            {trainer.name} - {trainer.specialization}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        value={planForm.description}
                        onChange={(e) => setPlanForm({ ...planForm, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        rows="3"
                        required
                      />
                    </div>
                    <div className="flex items-end gap-3 md:col-span-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 text-white transition bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                      >
                        {editingItem ? 'Update Plan' : 'Add Plan'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowPlanForm(false);
                          resetForms();
                        }}
                        className="px-4 py-2 text-gray-600 transition border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Plans List */}
              <div className="bg-white border shadow-sm rounded-xl">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Current Plans ({trainingPlans.length})</h3>
                </div>
                <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
                  {trainingPlans.map((plan) => (
                    <div key={plan.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="mb-3">
                        <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
                      {plan.trainerId && (
                        <p className="text-sm text-blue-600 mb-2">
                          Trainer: {trainers.find(t => t.id == plan.trainerId)?.name || 'Unknown'}
                        </p>
                      )}
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-sm font-medium px-2 py-1 rounded ${
                          plan.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                          plan.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          plan.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {plan.difficulty}
                        </span>
                        <span className="text-sm text-gray-500">{plan.duration}</span>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200">
                        <button
                          onClick={async () => {
                            setEditingItem(plan);
                            setPlanForm({
                              name: plan.name,
                              description: plan.description || '',
                              duration: plan.duration || '',
                              difficulty: plan.difficulty || '',
                              trainerId: plan.trainerId || ''
                            });
                            // Load trainers if not already loaded
                            if (trainers.length === 0) {
                              await loadTrainers();
                            }
                            setShowPlanForm(true);
                            clearMessages();
                          }}
                          className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 transition border border-blue-600 rounded hover:bg-blue-50"
                        >
                          <Edit size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePlan(plan.id)}
                          className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 transition border border-red-600 rounded hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  {trainingPlans.length === 0 && (
                    <div className="col-span-full text-center py-8 text-gray-500">
                      No training plans found. Add one to get started!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && !loading && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Users Management</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => loadUsers()}
                    className="flex items-center gap-2 px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Refresh Users
                  </button>
                </div>
              </div>

              {/* Users List */}
              <div className="bg-white border shadow-sm rounded-xl">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Registered Users ({users.length})</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                  <span className="text-sm font-medium text-purple-600">
                                    {(user.fullName || user.username || user.email || 'U').charAt(0).toUpperCase()}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.fullName || user.username || 'Unknown User'}
                                </div>
                                <div className="text-sm text-gray-500">
                                  @{user.username || user.email?.split('@')[0] || 'unknown'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.email || 'No email'}</div>
                            <div className="text-sm text-gray-500">{user.phone || 'No phone'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.userType === 'admin' || user.role === 'ADMIN' 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {user.userType === 'admin' || user.role === 'ADMIN' ? 'Admin' : 'Member'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  // View user details
                                  alert(`User Details:\n\nName: ${user.fullName || user.username || 'Unknown'}\nEmail: ${user.email || 'No email'}\nPhone: ${user.phone || 'No phone'}\nType: ${user.userType === 'admin' || user.role === 'ADMIN' ? 'Admin' : 'Member'}\nJoined: ${user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}`);
                                }}
                                className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                title="View Details"
                              >
                                <Eye size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {users.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No users found. Users will appear here when they register.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Career Applications Tab */}
          {activeTab === 'applications' && !loading && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Career Applications</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const applications = JSON.parse(localStorage.getItem('careerApplications') || '[]');
                      const updatedApplications = applications.map(app => ({ ...app, status: 'reviewed' }));
                      localStorage.setItem('careerApplications', JSON.stringify(updatedApplications));
                      window.location.reload();
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Mark All Reviewed
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete all applications? This action cannot be undone.')) {
                        localStorage.removeItem('careerApplications');
                        window.location.reload();
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-white transition bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {(() => {
                const applications = JSON.parse(localStorage.getItem('careerApplications') || '[]');
                const pendingCount = applications.filter(app => app.status === 'pending').length;
                const totalCount = applications.length;

                if (totalCount === 0) {
                  return (
                    <div className="p-12 text-center bg-white border shadow-sm rounded-xl">
                      <div className="w-16 h-16 mx-auto mb-4 text-gray-300">📄</div>
                      <h3 className="mb-2 text-xl font-semibold text-gray-900">No Applications Yet</h3>
                      <p className="text-gray-600">Career applications will appear here when candidates apply for positions.</p>
                    </div>
                  );
                }

                return (
                  <>
                    {/* Application Stats */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div className="p-6 bg-white border shadow-sm rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Total Applications</p>
                            <p className="mt-1 text-2xl font-bold text-gray-900">{totalCount}</p>
                          </div>
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <div className="w-6 h-6 text-blue-600">📄</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-white border shadow-sm rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Pending Review</p>
                            <p className="mt-1 text-2xl font-bold text-gray-900">{pendingCount}</p>
                          </div>
                          <div className="p-3 bg-orange-100 rounded-lg">
                            <div className="w-6 h-6 text-orange-600">⏳</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-white border shadow-sm rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">This Month</p>
                            <p className="mt-1 text-2xl font-bold text-gray-900">
                              {applications.filter(app => {
                                const appDate = new Date(app.submittedAt);
                                const now = new Date();
                                return appDate.getMonth() === now.getMonth() && appDate.getFullYear() === now.getFullYear();
                              }).length}
                            </p>
                          </div>
                          <div className="p-3 bg-green-100 rounded-lg">
                            <div className="w-6 h-6 text-green-600">📈</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Applications List */}
                    <div className="bg-white border shadow-sm rounded-xl">
                      <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {applications.map((application) => (
                          <div key={application.id} className={`p-6 hover:bg-gray-50 transition ${application.status === 'pending' ? 'bg-orange-50 border-l-4 border-l-orange-500' : ''}`}>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="text-lg font-semibold text-gray-900">{application.fullName}</h4>
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    application.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                                    application.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                                    'bg-green-100 text-green-800'
                                  }`}>
                                    {application.status}
                                  </span>
                                </div>
                                <div className="grid grid-cols-1 gap-4 mb-3 md:grid-cols-2">
                                  <div>
                                    <p className="text-sm text-gray-600">
                                      <strong>Position:</strong> {application.jobTitle || application.position}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      <strong>Email:</strong> {application.email}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      <strong>Phone:</strong> {application.phone}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">
                                      <strong>Expected Salary:</strong> {application.expectedSalary || 'Not specified'}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      <strong>Availability:</strong> {application.availability || 'Not specified'}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      <strong>Applied:</strong> {new Date(application.submittedAt).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                                
                                {application.coverLetter && (
                                  <div className="p-4 rounded-lg bg-gray-50 mb-3">
                                    <p className="text-sm font-medium text-gray-700 mb-1">Cover Letter:</p>
                                    <p className="text-sm text-gray-600 line-clamp-3">{application.coverLetter}</p>
                                  </div>
                                )}

                                {(application.resume || application.portfolio) && (
                                  <div className="mb-3">
                                    <p className="text-sm font-medium text-gray-700 mb-2">Attachments:</p>
                                    <div className="flex gap-2">
                                      {application.resume && (
                                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                          📄 {application.resume.name}
                                        </span>
                                      )}
                                      {application.portfolio && (
                                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                                          📁 {application.portfolio.name}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-2 ml-4">
                                <button
                                  onClick={() => {
                                    const applications = JSON.parse(localStorage.getItem('careerApplications') || '[]');
                                    const updatedApplications = applications.map(app =>
                                      app.id === application.id ? { ...app, status: app.status === 'reviewed' ? 'pending' : 'reviewed' } : app
                                    );
                                    localStorage.setItem('careerApplications', JSON.stringify(updatedApplications));
                                    window.location.reload();
                                  }}
                                  className={`p-2 rounded-lg transition ${application.status === 'reviewed' ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                    }`}
                                  title={application.status === 'reviewed' ? 'Mark as pending' : 'Mark as reviewed'}
                                >
                                  {application.status === 'reviewed' ? '⏳' : '✅'}
                                </button>
                                <button
                                  onClick={() => window.location.href = `mailto:${application.email}?subject=Re: Application for ${application.jobTitle || application.position}&body=Dear ${application.fullName},%0D%0A%0D%0AThank you for your application for the ${application.jobTitle || application.position} position at Fitness Sharks.%0D%0A%0D%0A`}
                                  className="p-2 text-green-600 transition bg-green-100 rounded-lg hover:bg-green-200"
                                  title="Reply via email"
                                >
                                  📧
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this application?')) {
                                      const applications = JSON.parse(localStorage.getItem('careerApplications') || '[]');
                                      const updatedApplications = applications.filter(app => app.id !== application.id);
                                      localStorage.setItem('careerApplications', JSON.stringify(updatedApplications));
                                      window.location.reload();
                                    }
                                  }}
                                  className="p-2 text-red-600 transition bg-red-100 rounded-lg hover:bg-red-200"
                                  title="Delete application"
                                >
                                  🗑️
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

          {/* Contact Messages Tab */}
          {activeTab === 'messages' && !loading && (
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
                      <div className="w-16 h-16 mx-auto mb-4 text-gray-300">📧</div>
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
                            <div className="w-6 h-6 text-blue-600">📧</div>
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
                            <div className="w-6 h-6 text-red-600">🔔</div>
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
                            <div className="w-6 h-6 text-green-600">✅</div>
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
                                  {message.status === 'read' ? '📧' : '✅'}
                                </button>
                                <button
                                  onClick={() => window.location.href = `mailto:${message.email}?subject=Re: ${message.subject}&body=Dear ${message.name},%0D%0A%0D%0AThank you for contacting Fitness Sharks.%0D%0A%0D%0A`}
                                  className="p-2 text-green-600 transition bg-green-100 rounded-lg hover:bg-green-200"
                                  title="Reply via email"
                                >
                                  📧
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
                                  🗑️
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

          {/* Users Tab */}
          {activeTab === 'users' && !loading && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Users</h2>
                <div className="text-sm text-gray-600">
                  Total Users: {users.length}
                </div>
              </div>

              {/* Users List */}
              <div className="bg-white border shadow-sm rounded-xl">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Registered Users</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">User</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Roles</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                                {user.username.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{user.username}</div>
                                <div className="text-sm text-gray-500">ID: {user.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {user.roles && user.roles.map((role, index) => (
                                <span
                                  key={index}
                                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    role.name === 'ADMIN' 
                                      ? 'bg-red-100 text-red-800' 
                                      : 'bg-blue-100 text-blue-800'
                                  }`}
                                >
                                  {role.name}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <button 
                                className="text-blue-600 hover:text-blue-900" 
                                title="View Details"
                                onClick={() => {
                                  alert(`User Details:\nID: ${user.id}\nUsername: ${user.username}\nEmail: ${user.email}\nRoles: ${user.roles?.map(r => r.name).join(', ') || 'None'}`);
                                }}
                              >
                                <Eye size={16} />
                              </button>
                              {user.roles?.some(role => role.name !== 'ADMIN') && (
                                <button 
                                  className="text-red-600 hover:text-red-900" 
                                  title="Delete User"
                                  onClick={async () => {
                                    if (window.confirm(`Are you sure you want to delete user "${user.username}"? This action cannot be undone.`)) {
                                      try {
                                        setLoading(true);
                                        const result = await apiService.deleteUser(user.id);
                                        if (result.success) {
                                          setSuccess('User deleted successfully');
                                          await loadUsers();
                                        } else {
                                          setError(result.message || 'Failed to delete user');
                                        }
                                      } catch (err) {
                                        setError('Delete failed: ' + err.message);
                                      } finally {
                                        setLoading(false);
                                      }
                                    }
                                  }}
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {users.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No users found.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}