import { useState, useEffect } from 'react';
import { Star, Award, Clock, Mail, Phone } from 'lucide-react';
import SharedNavigation from '../components/SharedNavigation';
import apiService from '../services/apiService';

export default function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrainers();
  }, []);

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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading trainers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <SharedNavigation title="Our Trainers" />

      {/* Hero Section */}
      <section className="px-6 py-16 text-center text-white bg-gradient-to-r from-blue-600 to-blue-900">
        <Award className="w-20 h-20 mx-auto mb-6 text-pink-400" />
        <h1 className="mb-4 text-5xl font-extrabold md:text-6xl">Meet Our Expert Trainers</h1>
        <p className="max-w-3xl mx-auto mb-8 text-xl md:text-2xl opacity-95">
          Our certified fitness professionals are here to guide you on your fitness journey with personalized training and expert advice.
        </p>
      </section>

      {/* Trainers Grid */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {trainers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainers.map((trainer) => (
                <div key={trainer.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  {/* Trainer Photo */}
                  <div className="relative h-64 bg-gradient-to-br from-blue-500 to-purple-600">
                    {trainer.photo ? (
                      <img 
                        src={trainer.photo} 
                        alt={trainer.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                          <span className="text-3xl font-bold text-blue-600">
                            {trainer.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold">4.9</span>
                    </div>
                  </div>

                  {/* Trainer Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{trainer.name || 'Unknown Trainer'}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">{trainer.specialization || 'General Fitness'}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{trainer.experience || 0} years experience</span>
                    </div>

                    {trainer.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">{trainer.description}</p>
                    )}

                    {/* Contact Info */}
                    <div className="space-y-2 mb-4">
                      {trainer.email && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Mail className="w-4 h-4" />
                          <span>{trainer.email}</span>
                        </div>
                      )}
                      {trainer.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Phone className="w-4 h-4" />
                          <span>{trainer.phone}</span>
                        </div>
                      )}
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {trainer.specialization && trainer.specialization.split(',').map((specialty, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {specialty.trim()}
                        </span>
                      ))}
                    </div>


                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">👨‍💼</div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">No Trainers Available</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                We're currently building our team of expert trainers. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-16 text-center text-white bg-gradient-to-r from-blue-600 to-blue-900">
        <h2 className="mb-4 text-4xl font-bold">Ready to Start Training?</h2>
        <p className="max-w-2xl mx-auto mb-8 text-xl">
          Our expert trainers are here to help you achieve your fitness goals with personalized training programs.
        </p>
        <button
          onClick={() => {
            // Navigate to home page and scroll to pricing section
            window.location.href = '/#pricing';
          }}
          className="px-10 py-4 text-xl font-bold text-white transition transform bg-pink-500 rounded-full shadow-2xl hover:bg-pink-600 hover:scale-105"
        >
          Explore Membership Plans
        </button>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-white bg-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <h4 className="mb-4 text-2xl font-bold text-blue-400">Fitness Sharks Trainers</h4>
          <p className="mb-4 text-gray-400">Expert guidance for your fitness journey</p>
          <p className="text-sm text-gray-500">&copy; 2025 Fitness Sharks. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}