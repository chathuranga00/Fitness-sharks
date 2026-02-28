import { useState } from 'react';
import { Menu, X, ChevronDown, Apple, Droplet, Flame, Heart, Clock, Calculator, ChefHat, BookOpen, TrendingUp } from 'lucide-react';

export default function NutritionGuide() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [selectedMacro, setSelectedMacro] = useState('protein');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [goal, setGoal] = useState('maintain');
  const [calculatedCalories, setCalculatedCalories] = useState(null);

  const menuCategories = [
    'Workout Plans',
    'Nutrition Guide',
    'Exercise Library',
    'Progress Tracker',
    'Community Forum',
    'Blog Articles',
  ];

  const nutritionBasics = [
    {
      icon: <Flame className="w-12 h-12" />,
      title: 'Calories',
      color: 'from-orange-400 to-red-500',
      description: 'Energy units that fuel your body. Balance intake with expenditure for your goals.',
      details: 'Your daily calorie needs depend on age, gender, weight, height, and activity level. Create a deficit for weight loss, surplus for muscle gain.'
    },
    {
      icon: <Apple className="w-12 h-12" />,
      title: 'Macronutrients',
      color: 'from-green-400 to-emerald-500',
      description: 'Proteins, carbs, and fats - the building blocks of your diet.',
      details: 'Aim for 30% protein, 40% carbs, 30% fats as a starting point. Adjust based on your goals and how your body responds.'
    },
    {
      icon: <Droplet className="w-12 h-12" />,
      title: 'Hydration',
      color: 'from-blue-400 to-cyan-500',
      description: 'Water is essential for every bodily function and workout performance.',
      details: 'Drink at least 8 glasses (64oz) daily. Add more during workouts. Your urine should be light yellow.'
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: 'Micronutrients',
      color: 'from-pink-400 to-rose-500',
      description: 'Vitamins and minerals that support overall health and recovery.',
      details: 'Eat a colorful variety of fruits and vegetables. Consider a multivitamin if your diet lacks variety.'
    }
  ];

  const macronutrients = [
    {
      id: 'protein',
      name: 'Protein',
      icon: '🥩',
      color: 'bg-red-500',
      grams: '4 calories per gram',
      recommendation: '0.8-1g per lb of body weight',
      benefits: [
        'Builds and repairs muscle tissue',
        'Supports immune function',
        'Keeps you feeling full longer',
        'Essential for hormone production'
      ],
      sources: [
        'Chicken breast, turkey, lean beef',
        'Fish (salmon, tuna, tilapia)',
        'Eggs and egg whites',
        'Greek yogurt and cottage cheese',
        'Legumes (beans, lentils)',
        'Tofu and tempeh',
        'Protein powder supplements'
      ]
    },
    {
      id: 'carbs',
      name: 'Carbohydrates',
      icon: '🍞',
      color: 'bg-yellow-500',
      grams: '4 calories per gram',
      recommendation: '40-50% of total calories',
      benefits: [
        'Primary energy source for workouts',
        'Fuels brain and nervous system',
        'Supports muscle recovery',
        'Provides dietary fiber for digestion'
      ],
      sources: [
        'Whole grains (oats, brown rice, quinoa)',
        'Sweet potatoes and regular potatoes',
        'Fruits (bananas, berries, apples)',
        'Vegetables (especially starchy ones)',
        'Whole grain bread and pasta',
        'Legumes and beans',
        'Pre-workout: quick-digesting carbs'
      ]
    },
    {
      id: 'fats',
      name: 'Healthy Fats',
      icon: '🥑',
      color: 'bg-green-500',
      grams: '9 calories per gram',
      recommendation: '25-30% of total calories',
      benefits: [
        'Supports hormone production',
        'Essential for vitamin absorption',
        'Provides sustained energy',
        'Supports brain health and function'
      ],
      sources: [
        'Avocados and avocado oil',
        'Nuts (almonds, walnuts, cashews)',
        'Seeds (chia, flax, pumpkin)',
        'Olive oil and coconut oil',
        'Fatty fish (salmon, mackerel)',
        'Natural nut butters',
        'Dark chocolate (in moderation)'
      ]
    }
  ];

  const mealPlans = [
    {
      goal: 'Weight Loss',
      icon: '📉',
      color: 'border-blue-500',
      calories: '1,500-1,800 calories/day',
      meals: [
        { name: 'Breakfast', items: ['Greek yogurt with berries', 'Handful of almonds', 'Green tea'] },
        { name: 'Lunch', items: ['Grilled chicken salad', 'Olive oil dressing', 'Apple'] },
        { name: 'Snack', items: ['Protein shake', 'Carrot sticks'] },
        { name: 'Dinner', items: ['Baked salmon', 'Steamed broccoli', 'Quinoa'] }
      ]
    },
    {
      goal: 'Muscle Gain',
      icon: '💪',
      color: 'border-red-500',
      calories: '2,500-3,000 calories/day',
      meals: [
        { name: 'Breakfast', items: ['4 eggs scrambled', 'Oatmeal with banana', 'Whole grain toast'] },
        { name: 'Lunch', items: ['Chicken breast', 'Brown rice', 'Mixed vegetables', 'Avocado'] },
        { name: 'Snack', items: ['Protein shake', 'Peanut butter sandwich'] },
        { name: 'Dinner', items: ['Lean beef steak', 'Sweet potato', 'Spinach salad'] },
        { name: 'Before Bed', items: ['Cottage cheese', 'Berries'] }
      ]
    },
    {
      goal: 'Maintenance',
      icon: '⚖️',
      color: 'border-green-500',
      calories: '2,000-2,300 calories/day',
      meals: [
        { name: 'Breakfast', items: ['Oatmeal with protein powder', 'Mixed berries', 'Coffee'] },
        { name: 'Lunch', items: ['Turkey wrap', 'Sweet potato', 'Side salad'] },
        { name: 'Snack', items: ['Greek yogurt', 'Trail mix'] },
        { name: 'Dinner', items: ['Grilled fish', 'Quinoa', 'Roasted vegetables'] }
      ]
    }
  ];

  const nutritionTips = [
    {
      title: 'Meal Prep Sunday',
      tip: 'Prepare your meals for the week on Sunday. Cook proteins, chop vegetables, and portion meals into containers.',
      icon: <ChefHat className="w-8 h-8 text-purple-500" />
    },
    {
      title: 'Track Your Intake',
      tip: 'Use apps like MyFitnessPal to track calories and macros. Knowledge is power when it comes to nutrition.',
      icon: <BookOpen className="w-8 h-8 text-blue-500" />
    },
    {
      title: 'Timing Matters',
      tip: 'Eat protein and carbs within 2 hours post-workout for optimal recovery. Don\'t skip breakfast.',
      icon: <Clock className="w-8 h-8 text-orange-500" />
    },
    {
      title: 'Progressive Changes',
      tip: 'Make small changes gradually. Sudden drastic diets are hard to maintain. Focus on sustainable habits.',
      icon: <TrendingUp className="w-8 h-8 text-green-500" />
    }
  ];

  const handlePlaceholderClick = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    console.log("Placeholder action triggered.");
  };

  const calculateCalories = () => {
    if (!weight) {
      alert('Please enter your weight');
      return;
    }
    
    const weightNum = parseFloat(weight);
    let baseCalories = weightNum * 15; // Basic estimation
    
    // Activity level multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };
    
    baseCalories *= activityMultipliers[activityLevel];
    
    // Goal adjustment
    const goalAdjustments = {
      lose: -500,
      maintain: 0,
      gain: 500
    };
    
    const finalCalories = Math.round(baseCalories + goalAdjustments[goal]);
    setCalculatedCalories(finalCalories);
  };

  const selectedMacroData = macronutrients.find(m => m.id === selectedMacro);

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
      <section className="px-6 py-16 text-center text-white bg-gradient-to-r from-green-600 to-emerald-900">
        <Apple className="w-20 h-20 mx-auto mb-6 text-pink-400" />
        <h1 className="mb-4 text-5xl font-extrabold md:text-6xl">Nutrition Guide</h1>
        <p className="max-w-3xl mx-auto mb-8 text-xl md:text-2xl opacity-95">
          Fuel your body right. Learn the fundamentals of nutrition to maximize your fitness results.
        </p>
      </section>

      {/* Nutrition Basics */}
      <section className="px-6 py-16 bg-white">
        <h2 className="mb-12 text-4xl font-bold text-center text-gray-900">Nutrition Fundamentals</h2>
        <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-2 lg:grid-cols-4">
          {nutritionBasics.map((item, idx) => (
            <div key={idx} className="overflow-hidden transition bg-white border-t-4 shadow-lg cursor-pointer rounded-2xl hover:shadow-2xl hover:-translate-y-2" style={{ borderColor: item.color.split(' ')[1] }}>
              <div className="p-6">
                <div className={`inline-flex p-4 mb-4 text-white rounded-full bg-gradient-to-r ${item.color}`}>
                  {item.icon}
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">{item.title}</h3>
                <p className="mb-3 text-gray-600">{item.description}</p>
                <p className="text-sm text-gray-500">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Macronutrients Deep Dive */}
      <section className="px-6 py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-4 text-4xl font-bold text-center text-gray-900">Understanding Macronutrients</h2>
          <p className="mb-12 text-xl text-center text-gray-600">The three essential nutrients your body needs in large amounts</p>
          
          {/* Macro Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            {macronutrients.map((macro) => (
              <button
                key={macro.id}
                onClick={() => setSelectedMacro(macro.id)}
                className={`px-6 py-3 rounded-full font-bold text-lg transition ${
                  selectedMacro === macro.id
                    ? `${macro.color} text-white shadow-lg`
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {macro.icon} {macro.name}
              </button>
            ))}
          </div>

          {/* Selected Macro Details */}
          {selectedMacroData && (
            <div className="p-8 bg-white shadow-xl rounded-2xl">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-3xl font-bold text-gray-900">{selectedMacroData.name}</h3>
                  <div className="space-y-3 mb-6">
                    <p className="text-lg"><span className="font-semibold">Energy:</span> {selectedMacroData.grams}</p>
                    <p className="text-lg"><span className="font-semibold">Daily Target:</span> {selectedMacroData.recommendation}</p>
                  </div>
                  
                  <h4 className="mb-3 text-xl font-bold text-gray-900">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {selectedMacroData.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1 text-green-500">✓</span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 text-xl font-bold text-gray-900">Best Food Sources:</h4>
                  <div className="grid gap-3">
                    {selectedMacroData.sources.map((source, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 transition rounded-lg bg-slate-50 hover:bg-slate-100">
                        <span className="text-2xl">{selectedMacroData.icon}</span>
                        <span className="text-gray-700">{source}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Calorie Calculator */}
      <section className="px-6 py-16 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white shadow-2xl md:p-12 rounded-3xl">
            <div className="mb-8 text-center">
              <Calculator className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h2 className="mb-3 text-4xl font-bold text-gray-900">Calorie Calculator</h2>
              <p className="text-lg text-gray-600">Get a personalized estimate of your daily calorie needs</p>
            </div>

            <div className="grid gap-6 mb-8 md:grid-cols-2">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Weight (lbs)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter your weight"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">Activity Level</label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="sedentary">Sedentary (little/no exercise)</option>
                  <option value="light">Light (1-3 days/week)</option>
                  <option value="moderate">Moderate (3-5 days/week)</option>
                  <option value="active">Active (6-7 days/week)</option>
                  <option value="veryActive">Very Active (2x per day)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 font-semibold text-gray-700">Goal</label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setGoal('lose')}
                    className={`py-3 rounded-lg font-semibold transition ${
                      goal === 'lose' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Lose Weight
                  </button>
                  <button
                    onClick={() => setGoal('maintain')}
                    className={`py-3 rounded-lg font-semibold transition ${
                      goal === 'maintain' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Maintain
                  </button>
                  <button
                    onClick={() => setGoal('gain')}
                    className={`py-3 rounded-lg font-semibold transition ${
                      goal === 'gain' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Gain Muscle
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={calculateCalories}
              className="w-full py-4 mb-6 text-xl font-bold text-white transition transform bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105"
            >
              Calculate My Calories
            </button>

            {calculatedCalories && (
              <div className="p-6 text-center rounded-lg bg-gradient-to-r from-green-500 to-emerald-600">
                <p className="mb-2 text-lg font-semibold text-white">Your Daily Calorie Target:</p>
                <p className="text-5xl font-extrabold text-white">{calculatedCalories}</p>
                <p className="mt-2 text-sm text-white opacity-90">calories per day</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sample Meal Plans */}
      <section className="px-6 py-16 bg-white">
        <h2 className="mb-4 text-4xl font-bold text-center text-gray-900">Sample Meal Plans</h2>
        <p className="mb-12 text-xl text-center text-gray-600">Structured eating plans for different fitness goals</p>
        
        <div className="grid max-w-6xl gap-8 mx-auto lg:grid-cols-3">
          {mealPlans.map((plan, idx) => (
            <div key={idx} className={`bg-white border-2 ${plan.color} rounded-2xl shadow-lg p-6 hover:shadow-2xl transition`}>
              <div className="mb-4 text-center">
                <span className="text-5xl">{plan.icon}</span>
                <h3 className="mt-3 mb-2 text-2xl font-bold text-gray-900">{plan.goal}</h3>
                <p className="text-sm font-semibold text-gray-600">{plan.calories}</p>
              </div>

              <div className="space-y-4">
                {plan.meals.map((meal, mIdx) => (
                  <div key={mIdx} className="p-4 rounded-lg bg-slate-50">
                    <h4 className="mb-2 font-bold text-gray-900">{meal.name}</h4>
                    <ul className="space-y-1">
                      {meal.items.map((item, iIdx) => (
                        <li key={iIdx} className="text-sm text-gray-600">• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Nutrition Tips */}
      <section className="px-6 py-16 bg-slate-50">
        <h2 className="mb-12 text-4xl font-bold text-center text-gray-900">Pro Nutrition Tips</h2>
        <div className="grid max-w-6xl gap-6 mx-auto md:grid-cols-2">
          {nutritionTips.map((tip, idx) => (
            <div key={idx} className="flex gap-4 p-6 transition bg-white shadow-md rounded-2xl hover:shadow-xl">
              <div className="flex-shrink-0">{tip.icon}</div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">{tip.title}</h3>
                <p className="text-gray-600">{tip.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 text-center text-white bg-gradient-to-r from-blue-600 to-blue-900">
        <h2 className="mb-4 text-4xl font-bold">Ready to Transform Your Diet?</h2>
        <p className="max-w-2xl mx-auto mb-8 text-xl">
          Join Fitness Sharks today and get personalized meal plans, nutrition tracking, and expert guidance.
        </p>
        <button
          onClick={handlePlaceholderClick}
          className="px-10 py-4 text-xl font-bold text-white transition transform bg-pink-500 rounded-full shadow-2xl hover:bg-pink-600 hover:scale-105"
        >
          Start Your Journey
        </button>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-white bg-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <h4 className="mb-4 text-2xl font-bold text-blue-400">Fitness Sharks Nutrition</h4>
          <p className="mb-4 text-gray-400">Eat smart, train hard, achieve greatness.</p>
          <p className="text-sm text-gray-500">&copy; 2025 Fitness Sharks. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}