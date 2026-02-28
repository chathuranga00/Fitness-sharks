import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Target, TrendingUp, User, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import apiService from '../services/apiService';

export default function WorkoutPlans() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [trainingPlans, setTrainingPlans] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [activatedPlans, setActivatedPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Load training plans from backend only
                try {
                    const plansResult = await apiService.getAllPlans();
                    if (plansResult.success && plansResult.plans) {
                        setTrainingPlans(plansResult.plans);
                    } else {
                        setTrainingPlans([]);
                    }
                } catch (planError) {
                    console.error('Failed to load plans:', planError);
                    setTrainingPlans([]);
                }

                // Load trainers from backend only
                try {
                    const trainersResult = await apiService.getAllTrainers();
                    if (trainersResult.success && trainersResult.trainers) {
                        setTrainers(trainersResult.trainers);
                    } else {
                        setTrainers([]);
                    }
                } catch (trainerError) {
                    console.error('Failed to load trainers:', trainerError);
                    setTrainers([]);
                }

                // Load activated plans from user purchases
                if (user?.purchases) {
                    const membershipPurchases = user.purchases.filter(p => p.type === 'membership' && p.trainingPlan);
                    setActivatedPlans(membershipPurchases.map(p => p.trainingPlan));
                }
            } catch (error) {
                console.error('Failed to load data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [user]);

    return (
        <div className="min-h-screen font-sans bg-white dark:bg-gray-900 transition-colors duration-300">
            <Navigation />
            
            {/* Back to Home Button */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition font-semibold"
                    >
                        <ArrowLeft size={20} />
                        Back to Home
                    </button>
                </div>
            </div>

            {/* Hero Section */}
            <section className="px-6 py-24 text-center text-white bg-gradient-to-r from-blue-600 to-blue-900">
                <h1 className="mb-6 text-5xl font-extrabold leading-tight md:text-6xl">
                    Workout Plans
                </h1>
                <p className="mb-8 text-xl md:text-2xl">
                    Personalized workout routines designed to help you achieve your fitness goals
                </p>
            </section>

            {/* Content Section */}
            <section className="px-6 py-20">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="mt-4 text-gray-600">Loading workout plans...</p>
                        </div>
                    ) : trainingPlans.length > 0 ? (
                        <>
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-blue-900 mb-4">Available Training Plans</h2>
                                <p className="text-lg text-gray-600">
                                    Choose from our professionally designed workout plans created by expert trainers
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {trainingPlans.map((plan) => {
                                    const assignedTrainer = trainers && trainers.length > 0 ? trainers.find(t => t.id == plan.trainerId) : null;
                                    const isActivated = activatedPlans && activatedPlans.includes(plan.name);
                                    
                                    return (
                                        <div key={plan.id} className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden ${isActivated ? 'ring-2 ring-green-500' : ''}`}>
                                            <div className="p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="text-xl font-bold text-blue-900">{plan.name}</h3>
                                                    <div className="flex items-center gap-2">
                                                        {isActivated && (
                                                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center gap-1">
                                                                <CheckCircle size={12} />
                                                                Activated
                                                            </span>
                                                        )}
                                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                            plan.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                                                            plan.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                                            plan.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                                                            'bg-blue-100 text-blue-800'
                                                        }`}>
                                                            {plan.difficulty}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <p className="text-gray-600 mb-4 line-clamp-3">{plan.description}</p>
                                                
                                                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <Clock size={16} />
                                                        <span>{plan.duration}</span>
                                                    </div>
                                                </div>

                                                {/* Trainer Information */}
                                                {assignedTrainer && (
                                                    <div className="bg-blue-50 p-3 rounded-lg mb-4">
                                                        <div className="flex items-center gap-3">
                                                            {assignedTrainer.photo ? (
                                                                <img 
                                                                    src={assignedTrainer.photo} 
                                                                    alt={assignedTrainer.name}
                                                                    className="w-10 h-10 rounded-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                                                    <User size={16} className="text-white" />
                                                                </div>
                                                            )}
                                                            <div>
                                                                <h5 className="font-semibold text-blue-900">{assignedTrainer.name}</h5>
                                                                <p className="text-sm text-blue-600">{assignedTrainer.specialization}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {isActivated && (
                                                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                                        <p className="text-green-800 text-sm font-medium">
                                                            ✅ This plan is activated in your membership! Check your profile for details.
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="p-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
                                <div className="text-6xl mb-6">🏋️‍♂️</div>
                                <h2 className="text-3xl font-bold text-blue-900 mb-4">No Training Plans Available</h2>
                                <p className="text-lg text-gray-600 mb-6">
                                    Our expert trainers are working on creating comprehensive workout plans for all fitness levels.
                                    Check back soon for personalized training routines!
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                    <div className="p-6 bg-white rounded-xl shadow-md">
                                        <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-3" />
                                        <h3 className="font-bold text-blue-900 mb-2">Beginner Plans</h3>
                                        <p className="text-gray-600">Perfect for those starting their fitness journey</p>
                                    </div>
                                    <div className="p-6 bg-white rounded-xl shadow-md">
                                        <Target className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                                        <h3 className="font-bold text-blue-900 mb-2">Intermediate Plans</h3>
                                        <p className="text-gray-600">Take your fitness to the next level</p>
                                    </div>
                                    <div className="p-6 bg-white rounded-xl shadow-md">
                                        <Clock className="w-8 h-8 text-red-500 mx-auto mb-3" />
                                        <h3 className="font-bold text-blue-900 mb-2">Advanced Plans</h3>
                                        <p className="text-gray-600">Challenge yourself with expert routines</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-12 text-white bg-slate-900">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="mb-6 text-2xl font-bold text-blue-400">Fitness Sharks</div>
                    <p className="mb-4 text-gray-400">Transform your life, one workout at a time</p>
                    <div className="pt-6 mt-6 text-sm text-gray-500 border-t border-gray-800">
                        © 2025 Fitness Sharks. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}