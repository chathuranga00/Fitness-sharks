import { useState } from 'react';
import { Search, Filter, Play, Clock, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SharedNavigation from '../components/SharedNavigation';

export default function ExerciseLibrary() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');

    const categories = [
        { id: 'all', name: 'All Exercises' },
        { id: 'strength', name: 'Strength Training' },
        { id: 'cardio', name: 'Cardio' },
        { id: 'flexibility', name: 'Flexibility' },
        { id: 'core', name: 'Core' },
        { id: 'functional', name: 'Functional' }
    ];

    const exercises = [
        {
            id: 1,
            name: 'Push-ups',
            category: 'strength',
            difficulty: 'beginner',
            duration: '30 seconds',
            muscles: ['Chest', 'Shoulders', 'Triceps'],
            description: 'Classic bodyweight exercise for upper body strength',
            instructions: [
                'Start in plank position with hands shoulder-width apart',
                'Lower your body until chest nearly touches the floor',
                'Push back up to starting position',
                'Keep your core tight throughout the movement'
            ]
        },
        {
            id: 2,
            name: 'Squats',
            category: 'strength',
            difficulty: 'beginner',
            duration: '45 seconds',
            muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
            description: 'Fundamental lower body exercise for leg strength',
            instructions: [
                'Stand with feet shoulder-width apart',
                'Lower your body as if sitting back into a chair',
                'Keep your chest up and knees behind toes',
                'Return to standing position'
            ]
        },
        {
            id: 3,
            name: 'Burpees',
            category: 'cardio',
            difficulty: 'intermediate',
            duration: '60 seconds',
            muscles: ['Full Body'],
            description: 'High-intensity full-body exercise',
            instructions: [
                'Start standing, then squat down and place hands on floor',
                'Jump feet back into plank position',
                'Do a push-up, then jump feet back to squat',
                'Jump up with arms overhead'
            ]
        },
        {
            id: 4,
            name: 'Plank',
            category: 'core',
            difficulty: 'beginner',
            duration: '60 seconds',
            muscles: ['Core', 'Shoulders', 'Back'],
            description: 'Isometric core strengthening exercise',
            instructions: [
                'Start in push-up position on forearms',
                'Keep body in straight line from head to heels',
                'Engage core and hold position',
                'Breathe normally throughout'
            ]
        },
        {
            id: 5,
            name: 'Mountain Climbers',
            category: 'cardio',
            difficulty: 'intermediate',
            duration: '45 seconds',
            muscles: ['Core', 'Shoulders', 'Legs'],
            description: 'Dynamic cardio and core exercise',
            instructions: [
                'Start in plank position',
                'Alternate bringing knees to chest rapidly',
                'Keep hips level and core engaged',
                'Maintain steady rhythm'
            ]
        },
        {
            id: 6,
            name: 'Deadlifts',
            category: 'strength',
            difficulty: 'advanced',
            duration: '8-12 reps',
            muscles: ['Hamstrings', 'Glutes', 'Back'],
            description: 'Compound movement for posterior chain strength',
            instructions: [
                'Stand with feet hip-width apart, bar over mid-foot',
                'Hinge at hips and knees to grip the bar',
                'Keep chest up and back straight',
                'Drive through heels to stand up straight'
            ]
        },
        {
            id: 7,
            name: 'Yoga Flow',
            category: 'flexibility',
            difficulty: 'beginner',
            duration: '10 minutes',
            muscles: ['Full Body'],
            description: 'Gentle stretching and flexibility routine',
            instructions: [
                'Start in child\'s pose for 30 seconds',
                'Move to downward dog, hold for 1 minute',
                'Flow through cat-cow stretches',
                'End in savasana for relaxation'
            ]
        },
        {
            id: 8,
            name: 'Kettlebell Swings',
            category: 'functional',
            difficulty: 'intermediate',
            duration: '30 seconds',
            muscles: ['Glutes', 'Hamstrings', 'Core'],
            description: 'Dynamic functional movement exercise',
            instructions: [
                'Stand with feet wider than shoulders',
                'Hold kettlebell with both hands',
                'Hinge at hips and swing kettlebell up to chest level',
                'Use hip drive, not arms, to power the movement'
            ]
        }
    ];

    const filteredExercises = exercises.filter(exercise => {
        const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            exercise.muscles.some(muscle => muscle.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
        const matchesDifficulty = selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty;
        
        return matchesSearch && matchesCategory && matchesDifficulty;
    });

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'beginner': return 'bg-green-100 text-green-800';
            case 'intermediate': return 'bg-yellow-100 text-yellow-800';
            case 'advanced': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen font-sans bg-white dark:bg-gray-900 transition-colors duration-300">
            <SharedNavigation title="Exercise Library" />

            {/* Hero Section */}
            <section className="px-6 py-24 text-center text-white bg-gradient-to-r from-blue-600 to-blue-900">
                <h1 className="mb-6 text-5xl font-extrabold leading-tight md:text-6xl">
                    Exercise Library
                </h1>
                <p className="mb-8 text-xl md:text-2xl">
                    Comprehensive collection of exercises with detailed instructions and demonstrations
                </p>
            </section>

            {/* Filters Section */}
            <section className="px-6 py-8 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search exercises..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex gap-4">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>

                            <select
                                value={selectedDifficulty}
                                onChange={(e) => setSelectedDifficulty(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Levels</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Exercises Grid */}
            <section className="px-6 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6 text-center">
                        <p className="text-gray-600">
                            Showing {filteredExercises.length} of {exercises.length} exercises
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredExercises.map((exercise) => (
                            <div key={exercise.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-blue-900">{exercise.name}</h3>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                                            {exercise.difficulty}
                                        </span>
                                    </div>
                                    
                                    <p className="text-gray-600 mb-4">{exercise.description}</p>
                                    
                                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Clock size={16} />
                                            <span>{exercise.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Target size={16} />
                                            <span>{exercise.category}</span>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-900 mb-2">Target Muscles:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {exercise.muscles.map((muscle, index) => (
                                                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                    {muscle}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h4 className="font-semibold text-gray-900 mb-2">Instructions:</h4>
                                        <ol className="text-sm text-gray-600 space-y-1">
                                            {exercise.instructions.map((instruction, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center mt-0.5">
                                                        {index + 1}
                                                    </span>
                                                    {instruction}
                                                </li>
                                            ))}
                                        </ol>
                                    </div>


                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredExercises.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No exercises found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-12 text-white bg-slate-900">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="mb-6 text-2xl font-bold text-blue-400">Fitness Sharks</div>
                    <p className="mb-4 text-gray-400">Master your form, achieve your goals</p>
                    <div className="pt-6 mt-6 text-sm text-gray-500 border-t border-gray-800">
                        © 2025 Fitness Sharks. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}