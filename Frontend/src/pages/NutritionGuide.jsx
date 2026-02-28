import { useState } from 'react';
import { Apple, Droplets, Clock, Target, CheckCircle, Download } from 'lucide-react';
import SharedNavigation from '../components/SharedNavigation';

export default function NutritionGuide() {
    const [selectedMealPlan, setSelectedMealPlan] = useState('muscle-gain');
    const [selectedDay, setSelectedDay] = useState('monday');
    const [waterIntake, setWaterIntake] = useState(0);

    const nutritionPrinciples = [
        {
            icon: <Apple className="w-12 h-12 text-green-500" />,
            title: 'Balanced Macros',
            description: 'Proper ratio of proteins, carbs, and fats for optimal performance and recovery.'
        },
        {
            icon: <Droplets className="w-12 h-12 text-blue-500" />,
            title: 'Stay Hydrated',
            description: 'Drink 8-10 glasses of water daily to support metabolism and muscle function.'
        },
        {
            icon: <Clock className="w-12 h-12 text-purple-500" />,
            title: 'Meal Timing',
            description: 'Eat every 3-4 hours to maintain energy levels and support muscle growth.'
        },
        {
            icon: <Target className="w-12 h-12 text-pink-500" />,
            title: 'Calorie Control',
            description: 'Track your intake based on your goals - deficit for weight loss, surplus for muscle gain.'
        }
    ];

    const macroGuide = {
        'muscle-gain': {
            name: 'Muscle Gain',
            calories: '2,800-3,200',
            protein: '180-220g (30-35%)',
            carbs: '350-400g (45-50%)',
            fats: '70-90g (20-25%)',
            description: 'High protein and calorie surplus to support muscle growth and recovery.'
        },
        'weight-loss': {
            name: 'Weight Loss',
            calories: '1,800-2,200',
            protein: '140-180g (30-35%)',
            carbs: '180-220g (35-40%)',
            fats: '50-70g (25-30%)',
            description: 'Calorie deficit with high protein to preserve muscle while losing fat.'
        },
        'maintenance': {
            name: 'Maintenance',
            calories: '2,300-2,700',
            protein: '150-180g (25-30%)',
            carbs: '280-320g (45-50%)',
            fats: '60-80g (25-30%)',
            description: 'Balanced nutrition to maintain current weight and muscle mass.'
        }
    };

    const mealPlans = {
        'muscle-gain': {
            monday: [
                {
                    meal: 'Breakfast (7:00 AM)',
                    foods: [
                        '4 whole eggs scrambled',
                        '2 slices whole wheat toast',
                        '1 cup oatmeal with berries',
                        '1 banana',
                        'Protein shake (30g whey)'
                    ],
                    calories: 850,
                    protein: '65g',
                    carbs: '95g',
                    fats: '28g'
                },
                {
                    meal: 'Mid-Morning Snack (10:00 AM)',
                    foods: [
                        'Greek yogurt (200g)',
                        '1/4 cup almonds',
                        '1 apple'
                    ],
                    calories: 420,
                    protein: '28g',
                    carbs: '42g',
                    fats: '18g'
                },
                {
                    meal: 'Lunch (1:00 PM)',
                    foods: [
                        'Grilled chicken breast (200g)',
                        'Brown rice (1.5 cups)',
                        'Mixed vegetables (broccoli, carrots)',
                        'Olive oil (1 tbsp)',
                        'Side salad'
                    ],
                    calories: 720,
                    protein: '58g',
                    carbs: '82g',
                    fats: '16g'
                },
                {
                    meal: 'Pre-Workout (4:00 PM)',
                    foods: [
                        'Protein bar',
                        '1 banana',
                        'Pre-workout supplement'
                    ],
                    calories: 380,
                    protein: '25g',
                    carbs: '52g',
                    fats: '8g'
                },
                {
                    meal: 'Post-Workout (6:30 PM)',
                    foods: [
                        'Protein shake (40g whey)',
                        'Sweet potato (large)',
                        'Peanut butter (2 tbsp)'
                    ],
                    calories: 520,
                    protein: '48g',
                    carbs: '58g',
                    fats: '12g'
                },
                {
                    meal: 'Dinner (8:00 PM)',
                    foods: [
                        'Salmon fillet (200g)',
                        'Quinoa (1 cup)',
                        'Asparagus and spinach',
                        'Avocado (1/2)'
                    ],
                    calories: 680,
                    protein: '54g',
                    carbs: '48g',
                    fats: '28g'
                }
            ],
            tuesday: [
                {
                    meal: 'Breakfast (7:00 AM)',
                    foods: [
                        'Protein pancakes (3)',
                        'Maple syrup (2 tbsp)',
                        'Blueberries (1 cup)',
                        'Turkey bacon (3 strips)'
                    ],
                    calories: 780,
                    protein: '52g',
                    carbs: '88g',
                    fats: '24g'
                },
                {
                    meal: 'Mid-Morning Snack (10:00 AM)',
                    foods: [
                        'Cottage cheese (1 cup)',
                        'Pineapple chunks',
                        'Walnuts (1/4 cup)'
                    ],
                    calories: 440,
                    protein: '32g',
                    carbs: '38g',
                    fats: '20g'
                },
                {
                    meal: 'Lunch (1:00 PM)',
                    foods: [
                        'Lean beef stir-fry (200g)',
                        'Jasmine rice (1.5 cups)',
                        'Mixed Asian vegetables',
                        'Soy sauce and ginger'
                    ],
                    calories: 740,
                    protein: '62g',
                    carbs: '78g',
                    fats: '18g'
                },
                {
                    meal: 'Pre-Workout (4:00 PM)',
                    foods: [
                        'Rice cakes (2)',
                        'Almond butter (2 tbsp)',
                        'Protein shake (25g)'
                    ],
                    calories: 420,
                    protein: '32g',
                    carbs: '48g',
                    fats: '14g'
                },
                {
                    meal: 'Post-Workout (6:30 PM)',
                    foods: [
                        'Protein shake (40g)',
                        'White rice (1 cup)',
                        'Honey (1 tbsp)'
                    ],
                    calories: 480,
                    protein: '44g',
                    carbs: '62g',
                    fats: '6g'
                },
                {
                    meal: 'Dinner (8:00 PM)',
                    foods: [
                        'Turkey meatballs (200g)',
                        'Whole wheat pasta (1.5 cups)',
                        'Marinara sauce',
                        'Parmesan cheese',
                        'Side salad'
                    ],
                    calories: 720,
                    protein: '58g',
                    carbs: '82g',
                    fats: '18g'
                }
            ]
        },
        'weight-loss': {
            monday: [
                {
                    meal: 'Breakfast (7:00 AM)',
                    foods: [
                        '3 egg whites + 1 whole egg',
                        '1 slice whole wheat toast',
                        'Spinach and tomatoes',
                        'Black coffee or green tea'
                    ],
                    calories: 320,
                    protein: '28g',
                    carbs: '32g',
                    fats: '10g'
                },
                {
                    meal: 'Mid-Morning Snack (10:00 AM)',
                    foods: [
                        'Greek yogurt (150g, low-fat)',
                        'Berries (1/2 cup)',
                        '10 almonds'
                    ],
                    calories: 220,
                    protein: '20g',
                    carbs: '22g',
                    fats: '8g'
                },
                {
                    meal: 'Lunch (1:00 PM)',
                    foods: [
                        'Grilled chicken breast (150g)',
                        'Large mixed salad',
                        'Olive oil dressing (1 tbsp)',
                        'Quinoa (1/2 cup)'
                    ],
                    calories: 420,
                    protein: '48g',
                    carbs: '32g',
                    fats: '12g'
                },
                {
                    meal: 'Afternoon Snack (4:00 PM)',
                    foods: [
                        'Protein shake (25g)',
                        'Celery sticks',
                        'Hummus (2 tbsp)'
                    ],
                    calories: 220,
                    protein: '28g',
                    carbs: '18g',
                    fats: '6g'
                },
                {
                    meal: 'Dinner (7:00 PM)',
                    foods: [
                        'Baked white fish (180g)',
                        'Steamed broccoli and cauliflower',
                        'Sweet potato (small)',
                        'Lemon and herbs'
                    ],
                    calories: 380,
                    protein: '44g',
                    carbs: '38g',
                    fats: '8g'
                },
                {
                    meal: 'Evening Snack (9:00 PM)',
                    foods: [
                        'Casein protein shake',
                        'Cucumber slices'
                    ],
                    calories: 160,
                    protein: '28g',
                    carbs: '8g',
                    fats: '3g'
                }
            ],
            tuesday: [
                {
                    meal: 'Breakfast (7:00 AM)',
                    foods: [
                        'Protein oatmeal (1/2 cup oats + protein powder)',
                        'Cinnamon and stevia',
                        'Apple slices'
                    ],
                    calories: 340,
                    protein: '32g',
                    carbs: '42g',
                    fats: '8g'
                },
                {
                    meal: 'Mid-Morning Snack (10:00 AM)',
                    foods: [
                        'Hard-boiled eggs (2)',
                        'Cherry tomatoes',
                        'Cucumber slices'
                    ],
                    calories: 180,
                    protein: '14g',
                    carbs: '8g',
                    fats: '12g'
                },
                {
                    meal: 'Lunch (1:00 PM)',
                    foods: [
                        'Turkey breast wrap',
                        'Whole wheat tortilla',
                        'Lettuce, tomato, cucumber',
                        'Mustard',
                        'Side of carrot sticks'
                    ],
                    calories: 380,
                    protein: '42g',
                    carbs: '38g',
                    fats: '10g'
                },
                {
                    meal: 'Afternoon Snack (4:00 PM)',
                    foods: [
                        'Rice cakes (2)',
                        'Tuna (1 can)',
                        'Light mayo (1 tsp)'
                    ],
                    calories: 240,
                    protein: '32g',
                    carbs: '22g',
                    fats: '6g'
                },
                {
                    meal: 'Dinner (7:00 PM)',
                    foods: [
                        'Lean beef (120g)',
                        'Zucchini noodles',
                        'Tomato sauce',
                        'Mixed green salad'
                    ],
                    calories: 420,
                    protein: '46g',
                    carbs: '28g',
                    fats: '14g'
                },
                {
                    meal: 'Evening Snack (9:00 PM)',
                    foods: [
                        'Cottage cheese (100g)',
                        'Celery sticks'
                    ],
                    calories: 120,
                    protein: '14g',
                    carbs: '6g',
                    fats: '4g'
                }
            ]
        },
        'maintenance': {
            monday: [
                {
                    meal: 'Breakfast (7:00 AM)',
                    foods: [
                        '3 whole eggs scrambled',
                        '2 slices whole wheat toast',
                        'Avocado (1/2)',
                        'Orange juice'
                    ],
                    calories: 580,
                    protein: '32g',
                    carbs: '52g',
                    fats: '26g'
                },
                {
                    meal: 'Mid-Morning Snack (10:00 AM)',
                    foods: [
                        'Protein bar',
                        'Apple',
                        'Green tea'
                    ],
                    calories: 280,
                    protein: '20g',
                    carbs: '38g',
                    fats: '8g'
                },
                {
                    meal: 'Lunch (1:00 PM)',
                    foods: [
                        'Grilled chicken (150g)',
                        'Brown rice (1 cup)',
                        'Mixed vegetables',
                        'Olive oil (1 tbsp)'
                    ],
                    calories: 560,
                    protein: '48g',
                    carbs: '58g',
                    fats: '16g'
                },
                {
                    meal: 'Afternoon Snack (4:00 PM)',
                    foods: [
                        'Greek yogurt',
                        'Granola (1/4 cup)',
                        'Honey drizzle'
                    ],
                    calories: 320,
                    protein: '22g',
                    carbs: '42g',
                    fats: '10g'
                },
                {
                    meal: 'Dinner (7:00 PM)',
                    foods: [
                        'Salmon (150g)',
                        'Quinoa (3/4 cup)',
                        'Roasted vegetables',
                        'Side salad'
                    ],
                    calories: 580,
                    protein: '44g',
                    carbs: '48g',
                    fats: '22g'
                },
                {
                    meal: 'Evening Snack (9:00 PM)',
                    foods: [
                        'Casein shake',
                        'Small handful of nuts'
                    ],
                    calories: 280,
                    protein: '28g',
                    carbs: '18g',
                    fats: '12g'
                }
            ],
            tuesday: [
                {
                    meal: 'Breakfast (7:00 AM)',
                    foods: [
                        'Protein smoothie (banana, berries, protein powder)',
                        'Peanut butter (1 tbsp)',
                        'Whole grain toast'
                    ],
                    calories: 520,
                    protein: '38g',
                    carbs: '62g',
                    fats: '14g'
                },
                {
                    meal: 'Mid-Morning Snack (10:00 AM)',
                    foods: [
                        'Trail mix (1/3 cup)',
                        'String cheese',
                        'Orange'
                    ],
                    calories: 340,
                    protein: '16g',
                    carbs: '38g',
                    fats: '16g'
                },
                {
                    meal: 'Lunch (1:00 PM)',
                    foods: [
                        'Turkey and avocado sandwich',
                        'Whole wheat bread',
                        'Side of sweet potato fries',
                        'Mixed greens'
                    ],
                    calories: 620,
                    protein: '42g',
                    carbs: '68g',
                    fats: '20g'
                },
                {
                    meal: 'Afternoon Snack (4:00 PM)',
                    foods: [
                        'Protein shake',
                        'Banana',
                        'Almond butter (1 tbsp)'
                    ],
                    calories: 380,
                    protein: '32g',
                    carbs: '42g',
                    fats: '12g'
                },
                {
                    meal: 'Dinner (7:00 PM)',
                    foods: [
                        'Chicken stir-fry (180g)',
                        'Brown rice (1 cup)',
                        'Mixed Asian vegetables',
                        'Teriyaki sauce'
                    ],
                    calories: 580,
                    protein: '52g',
                    carbs: '58g',
                    fats: '14g'
                },
                {
                    meal: 'Evening Snack (9:00 PM)',
                    foods: [
                        'Cottage cheese',
                        'Pineapple chunks',
                        'Cinnamon'
                    ],
                    calories: 200,
                    protein: '22g',
                    carbs: '24g',
                    fats: '4g'
                }
            ]
        }
    };

    const supplementGuide = [
        {
            name: 'Whey Protein',
            timing: 'Post-workout, Breakfast',
            benefits: 'Fast-absorbing protein for muscle recovery and growth',
            dosage: '25-40g per serving'
        },
        {
            name: 'Creatine Monohydrate',
            timing: 'Daily (any time)',
            benefits: 'Increases strength, power, and muscle mass',
            dosage: '5g daily'
        },
        {
            name: 'BCAAs',
            timing: 'During workout',
            benefits: 'Reduces muscle breakdown and fatigue during training',
            dosage: '5-10g per workout'
        },
        {
            name: 'Omega-3 Fish Oil',
            timing: 'With meals',
            benefits: 'Reduces inflammation, supports heart and joint health',
            dosage: '2-3g daily'
        },
        {
            name: 'Multivitamin',
            timing: 'With breakfast',
            benefits: 'Fills nutritional gaps in your diet',
            dosage: '1 serving daily'
        },
        {
            name: 'Pre-Workout',
            timing: '30 min before workout',
            benefits: 'Increases energy, focus, and workout performance',
            dosage: 'As directed (usually 1 scoop)'
        }
    ];

    const nutritionTips = [
        'Meal prep on Sundays to stay consistent throughout the week',
        'Track your macros using apps like MyFitnessPal or Cronometer',
        'Eat protein with every meal to maintain muscle mass',
        'Choose complex carbs (brown rice, oats, quinoa) over simple sugars',
        'Include healthy fats from nuts, avocado, and olive oil',
        'Drink water before meals to control portion sizes',
        'Eat 80% clean and allow 20% flexibility for sustainability',
        'Time your carbs around workouts for optimal performance',
        'Get 7-9 hours of sleep for proper recovery and hormone balance',
        'Avoid liquid calories from sodas and sugary drinks'
    ];

    const selectedPlanData = macroGuide[selectedMealPlan];
    const currentMealPlan = mealPlans[selectedMealPlan]?.[selectedDay] || [];

    const totalDailyNutrition = currentMealPlan.reduce(
        (acc, meal) => ({
            calories: acc.calories + meal.calories,
            protein: acc.protein + parseInt(meal.protein),
            carbs: acc.carbs + parseInt(meal.carbs),
            fats: acc.fats + parseInt(meal.fats)
        }),
        { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <SharedNavigation title="Nutrition Guide" />
            
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-8 shadow-xl">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Nutrition Guide</h1>
                    <p className="text-xl text-blue-100">Fuel your body for peak performance and results</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Nutrition Principles */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Core Nutrition Principles</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {nutritionPrinciples.map((principle, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
                                <div className="mb-4">{principle.icon}</div>
                                <h3 className="text-xl font-bold text-blue-900 mb-2">{principle.title}</h3>
                                <p className="text-gray-600">{principle.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Macro Calculator */}
                <section className="mb-16 bg-white rounded-3xl shadow-2xl p-8">
                    <h2 className="text-3xl font-bold text-blue-900 mb-6">Personalized Macro Targets</h2>

                    <div className="flex flex-wrap gap-4 mb-8">
                        {Object.keys(macroGuide).map((plan) => (
                            <button
                                key={plan}
                                onClick={() => setSelectedMealPlan(plan)}
                                className={`px-6 py-3 rounded-full font-semibold transition ${selectedMealPlan === plan
                                        ? 'bg-pink-500 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {macroGuide[plan].name}
                            </button>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-pink-50 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-blue-900 mb-4">{selectedPlanData.name} Plan</h3>
                        <p className="text-gray-700 mb-6">{selectedPlanData.description}</p>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white p-4 rounded-xl shadow">
                                <div className="text-sm text-gray-500 mb-1">Daily Calories</div>
                                <div className="text-2xl font-bold text-blue-900">{selectedPlanData.calories}</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow">
                                <div className="text-sm text-gray-500 mb-1">Protein</div>
                                <div className="text-2xl font-bold text-pink-600">{selectedPlanData.protein}</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow">
                                <div className="text-sm text-gray-500 mb-1">Carbohydrates</div>
                                <div className="text-2xl font-bold text-green-600">{selectedPlanData.carbs}</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow">
                                <div className="text-sm text-gray-500 mb-1">Fats</div>
                                <div className="text-2xl font-bold text-yellow-600">{selectedPlanData.fats}</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sample Meal Plans */}
                <section className="mb-16 bg-white rounded-3xl shadow-2xl p-8">
                    <h2 className="text-3xl font-bold text-blue-900 mb-6">Sample Meal Plans</h2>

                    <div className="flex flex-wrap gap-3 mb-8">
                        {['monday', 'tuesday'].map((day) => (
                            <button
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`px-5 py-2 rounded-full font-semibold transition capitalize ${selectedDay === day
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>

                    {/* Daily Totals */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8">
                        <h3 className="text-xl font-bold text-blue-900 mb-4">Daily Totals</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div>
                                <div className="text-sm text-gray-600">Calories</div>
                                <div className="text-2xl font-bold text-blue-900">{totalDailyNutrition.calories}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Protein</div>
                                <div className="text-2xl font-bold text-pink-600">{totalDailyNutrition.protein}g</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Carbs</div>
                                <div className="text-2xl font-bold text-green-600">{totalDailyNutrition.carbs}g</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Fats</div>
                                <div className="text-2xl font-bold text-yellow-600">{totalDailyNutrition.fats}g</div>
                            </div>
                        </div>
                    </div>

                    {/* Meals */}
                    <div className="space-y-6">
                        {currentMealPlan.map((mealData, idx) => (
                            <div key={idx} className="border-l-4 border-pink-500 bg-gray-50 p-6 rounded-r-xl">
                                <h3 className="text-xl font-bold text-blue-900 mb-3">{mealData.meal}</h3>

                                <ul className="space-y-2 mb-4">
                                    {mealData.foods.map((food, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-700">
                                            <CheckCircle size={18} className="text-green-500 mt-1 flex-shrink-0" />
                                            <span>{food}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-4 text-sm">
                                    <div className="bg-white px-3 py-1 rounded-full">
                                        <span className="text-gray-600">Calories:</span>
                                        <span className="font-bold text-blue-900 ml-1">{mealData.calories}</span>
                                    </div>
                                    <div className="bg-white px-3 py-1 rounded-full">
                                        <span className="text-gray-600">Protein:</span>
                                        <span className="font-bold text-pink-600 ml-1">{mealData.protein}</span>
                                    </div>
                                    <div className="bg-white px-3 py-1 rounded-full">
                                        <span className="text-gray-600">Carbs:</span>
                                        <span className="font-bold text-green-600 ml-1">{mealData.carbs}</span>
                                    </div>
                                    <div className="bg-white px-3 py-1 rounded-full">
                                        <span className="text-gray-600">Fats:</span>
                                        <span className="font-bold text-yellow-600 ml-1">{mealData.fats}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Supplement Guide */}
                <section className="mb-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-blue-900 mb-6">Supplement Guide</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {supplementGuide.map((supplement, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg">
                                <h3 className="text-xl font-bold text-blue-900 mb-3">{supplement.name}</h3>
                                <div className="space-y-2 text-gray-700">
                                    <div>
                                        <span className="font-semibold text-pink-600">Timing:</span> {supplement.timing}
                                    </div>
                                    <div>
                                        <span className="font-semibold text-pink-600">Benefits:</span> {supplement.benefits}
                                    </div>
                                    <div>
                                        <span className="font-semibold text-pink-600">Dosage:</span> {supplement.dosage}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Hydration Tracker */}
                <section className="mb-16 bg-white rounded-3xl shadow-2xl p-8">
                    <h2 className="text-3xl font-bold text-blue-900 mb-6">Daily Water Tracker</h2>
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <div className="text-4xl font-bold text-blue-900">{waterIntake} / 8</div>
                                <div className="text-gray-600">Glasses of Water</div>
                            </div>
                            <Droplets className="w-16 h-16 text-blue-500" />
                        </div>

                        <div className="flex gap-2 mb-4">
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-12 flex-1 rounded-lg transition ${i < waterIntake ? 'bg-blue-500' : 'bg-gray-200'
                                        }`}
                                />
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setWaterIntake(Math.min(8, waterIntake + 1))}
                                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                            >
                                Add Glass
                            </button>
                            <button
                                onClick={() => setWaterIntake(Math.max(0, waterIntake - 1))}
                                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
                            >
                                Remove Glass
                            </button>
                            <button
                                onClick={() => setWaterIntake(0)}
                                className="px-6 bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </section>

                {/* Nutrition Tips */}
                <section className="mb-16 bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-blue-900 mb-6">Pro Nutrition Tips</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {nutritionTips.map((tip, idx) => (
                            <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow">
                                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-gray-700">{tip}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center bg-gradient-to-r from-blue-600 to-pink-600 text-white rounded-3xl p-12">
                    <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Nutrition?</h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Start implementing these nutrition strategies today and see the difference in your performance and results.
                    </p>
                    <div className="flex justify-center">
                        <button 
                            onClick={() => {
                                const link = document.createElement('a');
                                link.href = '/Fitness-Sharks-Meal-Plan.pdf';
                                link.download = 'Fitness-Sharks-Meal-Plan.pdf';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }}
                            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition flex items-center gap-2"
                        >
                            <Download size={20} />
                            Download Meal Plan PDF
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}