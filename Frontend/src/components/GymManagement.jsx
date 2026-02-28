import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Users, DollarSign, Activity, AlertCircle, CheckCircle } from 'lucide-react';
import apiService from '../services/apiService';

export default function GymManagement() {
  const [activeTab, setActiveTab] = useState('trainers');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Trainers state
  const [trainers, setTrainers] = useState([]);
  const [showTrainerForm, setShowTrainerForm] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [trainerForm, setTrainerForm] = useState({
    name: '',
    specialization: '',
    experience: '',
    email: '',
    phone: ''
  });

  // Memberships state
  const [memberships, setMemberships] = useState([]);
  const [showMembershipForm, setShowMembershipForm] = useState(false);
  const [editingMembership, setEditingMembership] = useState(null);
  const [membershipForm, setMembershipForm] = useState({
    name: '',
    description: '',
    price: '',
    durationMonths: ''
  });

  // Plans state
  const [plans, setPlans] = useState([]);
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [planForm, setPlanForm] = useState({
    name: '',
    description: '',
    duration: '',
    difficulty: ''
  });

  // Subscriptions state
  const [subscriptions, setSubscriptions] = useState([]);
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false);
  const [subscriptionForm, setSubscriptionForm] = useState({
    userId: '',
    membershipId: '',
    planId: ''
  });

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    setError('');
    
    try {
      switch (activeTab) {
        case 'trainers':
          await loadTrainers();
          break;
        case 'memberships':
          await loadMemberships();
          break;
        case 'plans':
          await loadPlans();
          break;
        case 'subscriptions':
          await loadSubscriptions();
          await loadMemberships(); // Need for dropdown
          await loadPlans(); // Need for dropdown
          break;
      }
    } catch (err) {
      setError('Failed to load data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadTrainers = async () => {
    const result = await apiService.getAllTrainers();
    if (result.success) {
      setTrainers(result.trainers);
    } else {
      throw new Error(result.message);
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

  const loadPlans = async () => {
    const result = await apiService.getAllPlans();
    if (result.success) {
      setPlans(result.plans);
    } else {
      throw new Error(result.message);
    }
  };

  const loadSubscriptions = async () => {
    const result = await apiService.getAllSubscriptions();
    if (result.success) {
      setSubscriptions(result.subscriptions);
    } else {
      throw new Error(result.message);
    }
  };

  // Trainer functions
  const handleTrainerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const trainerData = {
        ...trainerForm,
        experience: parseInt(trainerForm.experience)
      };

      let result;
      if (editingTrainer) {
        result = await apiService.updateTrainer(editingTrainer.id, trainerData);
      } else {
        result = await apiService.addTrainer(trainerData);
      }

      if (result.success) {
        setSuccess(result.message);
        setShowTrainerForm(false);
        setEditingTrainer(null);
        setTrainerForm({ name: '', specialization: '', experience: '', email: '', phone: '' });
        await loadTrainers();
      } else {
        setError(result.message);
      }
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
        setSuccess(result.message);
        await loadTrainers();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Delete failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Membership functions
  const handleMembershipSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const membershipData = {
        ...membershipForm,
        price: parseFloat(membershipForm.price),
        durationMonths: parseInt(membershipForm.durationMonths)
      };

      let result;
      if (editingMembership) {
        result = await apiService.updateMembership(editingMembership.id, membershipData);
      } else {
        result = await apiService.createMembership(membershipData);
      }

      if (result.success) {
        setSuccess(result.message);
        setShowMembershipForm(false);
        setEditingMembership(null);
        setMembershipForm({ name: '', description: '', price: '', durationMonths: '' });
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
    if (!window.confirm('Are you sure you want to delete this membership?')) return;

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

  // Plan functions
  const handlePlanSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await apiService.createPlan(planForm);
      if (result.success) {
        setSuccess(result.message);
        setShowPlanForm(false);
        setPlanForm({ name: '', description: '', duration: '', difficulty: '' });
        await loadPlans();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Operation failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlan = async (id) => {
    if (!window.confirm('Are you sure you want to delete this plan?')) return;

    setLoading(true);
    try {
      const result = await apiService.deletePlan(id);
      if (result.success) {
        setSuccess(result.message);
        await loadPlans();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Delete failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Subscription functions
  const handleSubscriptionSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await apiService.subscribeUser(
        parseInt(subscriptionForm.userId),
        parseInt(subscriptionForm.membershipId),
        subscriptionForm.planId ? parseInt(subscriptionForm.planId) : null
      );

      if (result.success) {
        setSuccess(result.message);
        setShowSubscriptionForm(false);
        setSubscriptionForm({ userId: '', membershipId: '', planId: '' });
        await loadSubscriptions();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Operation failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Gym Management</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              clearMessages();
              switch (activeTab) {
                case 'trainers':
                  setShowTrainerForm(true);
                  break;
                case 'memberships':
                  setShowMembershipForm(true);
                  break;
                case 'plans':
                  setShowPlanForm(true);
                  break;
                case 'subscriptions':
                  setShowSubscriptionForm(true);
                  break;
              }
            }}
            className="flex items-center gap-2 px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Plus size={16} />
            Add New {activeTab.slice(0, -1)}
          </button>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="flex items-center gap-2 p-4 text-red-800 bg-red-100 border border-red-200 rounded-lg">
          <AlertCircle size={20} />
          {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 p-4 text-green-800 bg-green-100 border border-green-200 rounded-lg">
          <CheckCircle size={20} />
          {success}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {['trainers', 'memberships', 'plans', 'subscriptions'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                clearMessages();
              }}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {loading && (
        <div className="flex items-center justify-center p-8">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Trainers Tab */}
      {activeTab === 'trainers' && !loading && (
        <div className="space-y-6">
          {/* Trainer Form */}
          {showTrainerForm && (
            <div className="p-6 bg-white border shadow-sm rounded-xl">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                {editingTrainer ? 'Edit Trainer' : 'Add New Trainer'}
              </h3>
              <form onSubmit={handleTrainerSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={trainerForm.name}
                    onChange={(e) => setTrainerForm({ ...trainerForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Specialization</label>
                  <input
                    type="text"
                    value={trainerForm.specialization}
                    onChange={(e) => setTrainerForm({ ...trainerForm, specialization: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Experience (Years)</label>
                  <input
                    type="number"
                    value={trainerForm.experience}
                    onChange={(e) => setTrainerForm({ ...trainerForm, experience: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={trainerForm.email}
                    onChange={(e) => setTrainerForm({ ...trainerForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={trainerForm.phone}
                    onChange={(e) => setTrainerForm({ ...trainerForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex items-end gap-3 md:col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {editingTrainer ? 'Update Trainer' : 'Add Trainer'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowTrainerForm(false);
                      setEditingTrainer(null);
                      setTrainerForm({ name: '', specialization: '', experience: '', email: '', phone: '' });
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
              <h3 className="text-lg font-semibold text-gray-900">Trainers ({trainers.length})</h3>
            </div>
            <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
              {trainers.map((trainer) => (
                <div key={trainer.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{trainer.name}</h4>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingTrainer(trainer);
                          setTrainerForm({
                            name: trainer.name,
                            specialization: trainer.specialization,
                            experience: trainer.experience.toString(),
                            email: trainer.email,
                            phone: trainer.phone
                          });
                          setShowTrainerForm(true);
                        }}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteTrainer(trainer.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
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
                  <p className="text-sm text-gray-600">
                    <strong>Phone:</strong> {trainer.phone}
                  </p>
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

      {/* Memberships Tab */}
      {activeTab === 'memberships' && !loading && (
        <div className="space-y-6">
          {/* Membership Form */}
          {showMembershipForm && (
            <div className="p-6 bg-white border shadow-sm rounded-xl">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                {editingMembership ? 'Edit Membership' : 'Add New Membership'}
              </h3>
              <form onSubmit={handleMembershipSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={membershipForm.name}
                    onChange={(e) => setMembershipForm({ ...membershipForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Duration (Months)</label>
                  <input
                    type="number"
                    value={membershipForm.durationMonths}
                    onChange={(e) => setMembershipForm({ ...membershipForm, durationMonths: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={membershipForm.description}
                    onChange={(e) => setMembershipForm({ ...membershipForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    required
                  />
                </div>
                <div className="flex items-end gap-3 md:col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {editingMembership ? 'Update Membership' : 'Add Membership'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowMembershipForm(false);
                      setEditingMembership(null);
                      setMembershipForm({ name: '', description: '', price: '', durationMonths: '' });
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
              <h3 className="text-lg font-semibold text-gray-900">Memberships ({memberships.length})</h3>
            </div>
            <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
              {memberships.map((membership) => (
                <div key={membership.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{membership.name}</h4>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingMembership(membership);
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
                    <span className="text-lg font-bold text-green-600">LKR {membership.price}</span>
                    <span className="text-sm text-gray-500">{membership.durationMonths} months</span>
                  </div>
                </div>
              ))}
              {memberships.length === 0 && (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No memberships found. Add one to get started!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Plans Tab */}
      {activeTab === 'plans' && !loading && (
        <div className="space-y-6">
          {/* Plan Form */}
          {showPlanForm && (
            <div className="p-6 bg-white border shadow-sm rounded-xl">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Add New Training Plan</h3>
              <form onSubmit={handlePlanSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={planForm.name}
                    onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Difficulty</label>
                  <select
                    value={planForm.difficulty}
                    onChange={(e) => setPlanForm({ ...planForm, difficulty: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select difficulty</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={planForm.description}
                    onChange={(e) => setPlanForm({ ...planForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    required
                  />
                </div>
                <div className="flex items-end gap-3 md:col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    Add Plan
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPlanForm(false);
                      setPlanForm({ name: '', description: '', duration: '', difficulty: '' });
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
              <h3 className="text-lg font-semibold text-gray-900">Training Plans ({plans.length})</h3>
            </div>
            <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <div key={plan.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                    <button
                      onClick={() => handleDeletePlan(plan.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">{plan.difficulty}</span>
                    <span className="text-sm text-gray-500">{plan.duration}</span>
                  </div>
                </div>
              ))}
              {plans.length === 0 && (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No training plans found. Add one to get started!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Subscriptions Tab */}
      {activeTab === 'subscriptions' && !loading && (
        <div className="space-y-6">
          {/* Subscription Form */}
          {showSubscriptionForm && (
            <div className="p-6 bg-white border shadow-sm rounded-xl">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Create New Subscription</h3>
              <form onSubmit={handleSubscriptionSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">User ID</label>
                  <input
                    type="number"
                    value={subscriptionForm.userId}
                    onChange={(e) => setSubscriptionForm({ ...subscriptionForm, userId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter user ID"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Membership Plan</label>
                  <select
                    value={subscriptionForm.membershipId}
                    onChange={(e) => setSubscriptionForm({ ...subscriptionForm, membershipId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select membership</option>
                    {memberships.map((membership) => (
                      <option key={membership.id} value={membership.id}>
                        {membership.name} - LKR {membership.price}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Training Plan (Optional)</label>
                  <select
                    value={subscriptionForm.planId}
                    onChange={(e) => setSubscriptionForm({ ...subscriptionForm, planId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">No training plan</option>
                    {plans.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name} - {plan.difficulty}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end gap-3 md:col-span-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    Create Subscription
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowSubscriptionForm(false);
                      setSubscriptionForm({ userId: '', membershipId: '', planId: '' });
                    }}
                    className="px-4 py-2 text-gray-600 transition border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Subscriptions List */}
          <div className="bg-white border shadow-sm rounded-xl">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Subscriptions ({subscriptions.length})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">User</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Membership</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Plan</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Start Date</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">End Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subscriptions.map((subscription) => (
                    <tr key={subscription.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{subscription.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {subscription.user ? subscription.user.username : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {subscription.membershipPlan ? subscription.membershipPlan.name : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {subscription.plan ? subscription.plan.name : 'No plan'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {subscription.startDate ? new Date(subscription.startDate).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {subscription.endDate ? new Date(subscription.endDate).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {subscriptions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No subscriptions found. Create one to get started!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}