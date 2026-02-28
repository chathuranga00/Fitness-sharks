import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, CreditCard, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/apiService';

export default function Subscribe() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { user, addPurchase } = useAuth();
  const [membership, setMembership] = useState(null);
  const [trainingPlans, setTrainingPlans] = useState([]);
  const [selectedTrainingPlan, setSelectedTrainingPlan] = useState('');
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Details, 2: Payment Method, 3: Card Details, 4: Processing, 5: Success
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  useEffect(() => {
    loadData();
  }, [planId]);

  const loadData = async () => {
    try {
      // Load membership plan
      if (planId && !isNaN(planId)) {
        const membershipResult = await apiService.getMembershipById(planId);
        if (membershipResult.success) {
          setMembership(membershipResult.membership);
        }
      }

      // Load training plans
      const plansResult = await apiService.getAllPlans();
      if (plansResult.success) {
        setTrainingPlans(plansResult.plans);
      }
    } catch (err) {
      setError('Failed to load subscription data');
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = () => {
    setError('');

    if (currentStep === 1) {
      // Move to payment method selection
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Validate payment method selection
      if (!paymentMethod) {
        setError('Please select a payment method');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Validate card details
      if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv || !cardDetails.cardholderName) {
        setError('Please fill in all card details');
        return;
      }
      // Move to processing
      setCurrentStep(4);
      processPayment();
    }
  };

  const processPayment = async () => {
    if (!user?.username) {
      setError('User information not available. Please log in again.');
      setCurrentStep(3);
      return;
    }

    // Check if user already has an active membership
    const existingMembership = user.purchases?.find(p => p.type === 'membership' && p.status === 'active');
    if (existingMembership) {
      const confirmReplace = window.confirm(
        `You already have an active ${existingMembership.name} membership. Do you want to replace it with ${membership.name}?`
      );
      if (!confirmReplace) {
        setCurrentStep(3);
        return;
      }
    }

    setSubscribing(true);

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Get selected training plan name if any
      const selectedPlan = trainingPlans.find(plan => plan.id === parseInt(selectedTrainingPlan));

      // Create purchase object
      const purchaseData = {
        type: 'membership',
        name: membership.name,
        price: `LKR ${membership.price.toLocaleString()}`,
        description: membership.description,
        validFor: `${membership.durationMonths} month${membership.durationMonths > 1 ? 's' : ''}`,
        features: [
          'Full gym access',
          'Professional equipment',
          'Expert trainer guidance',
          'Group classes included',
          ...(selectedPlan ? [`Training Plan: ${selectedPlan.name}`] : [])
        ],
        membershipId: membership.id,
        trainingPlan: selectedPlan ? selectedPlan.name : null,
        paymentMethod: paymentMethod,
        cardLast4: cardDetails.cardNumber.slice(-4)
      };

      // Add purchase using AuthContext
      addPurchase(purchaseData);

      setCurrentStep(5);
      setTimeout(() => {
        navigate('/profile');
      }, 4000);
    } catch (err) {
      setError('Payment failed: ' + err.message);
      setCurrentStep(3);
    } finally {
      setSubscribing(false);
    }
  };

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;

    if (field === 'cardNumber') {
      // Format card number with spaces
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return; // Max 16 digits + 3 spaces
    } else if (field === 'expiryDate') {
      // Format expiry date as MM/YY
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) return;
    } else if (field === 'cvv') {
      // Only allow numbers, max 4 digits
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) return;
    }

    setCardDetails(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading subscription details...</p>
        </div>
      </div>
    );
  }

  // Render success page
  if (currentStep === 5) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscription Successful!</h2>
          <p className="text-gray-600 mb-6">
            You have successfully subscribed to {membership?.name}.
            Redirecting to your profile...
          </p>
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!membership) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Membership Plan Not Found</h2>
          <p className="text-gray-600 mb-6">
            The membership plan you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* User Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subscriber
              </label>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900">{user?.fullName || user?.username}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>

            {/* Training Plan Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Training Plan (Optional)
              </label>
              <select
                value={selectedTrainingPlan}
                onChange={(e) => setSelectedTrainingPlan(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">No training plan</option>
                {trainingPlans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} - {plan.difficulty} ({plan.duration})
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Choose a training plan to get personalized workout routines
              </p>
            </div>

            {/* Payment Summary */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">{membership.name}</span>
                  <span className="font-medium">LKR {membership.price.toLocaleString()}</span>
                </div>
                {selectedTrainingPlan && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Training Plan</span>
                    <span className="font-medium">Included</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>LKR {membership.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h3>
            <div className="space-y-3">
              {[
                { id: 'credit', name: 'Credit Card', icon: '💳' },
                { id: 'debit', name: 'Debit Card', icon: '💳' },
                { id: 'visa', name: 'Visa', icon: '🔵' },
                { id: 'mastercard', name: 'Mastercard', icon: '🔴' }
              ].map((method) => (
                <label key={method.id} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <span className="text-2xl mr-3">{method.icon}</span>
                  <span className="font-medium">{method.name}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Enter Card Details</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardDetails.cardholderName}
                  onChange={(e) => handleCardInputChange('cardholderName', e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardDetails.cardNumber}
                  onChange={(e) => handleCardInputChange('cardNumber', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={cardDetails.expiryDate}
                    onChange={(e) => handleCardInputChange('expiryDate', e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cardDetails.cvv}
                    onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-800">
                <Lock className="w-4 h-4" />
                <span className="text-sm font-medium">Secure Payment</span>
              </div>
              <p className="text-xs text-blue-600 mt-1">
                Your payment information is encrypted and secure
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center py-8">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Payment</h3>
            <p className="text-gray-600">Please wait while we process your payment...</p>
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                Do not close this window or refresh the page
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => currentStep === 1 ? navigate('/') : setCurrentStep(currentStep - 1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft size={20} />
            {currentStep === 1 ? 'Back to Home' : 'Back'}
          </button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {[
              { step: 1, label: 'Details' },
              { step: 2, label: 'Payment Method' },
              { step: 3, label: 'Card Details' },
              { step: 4, label: 'Processing' }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= item.step
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                  }`}>
                  {currentStep > item.step ? '✓' : item.step}
                </div>
                <span className={`ml-2 text-sm ${currentStep >= item.step ? 'text-blue-600 font-medium' : 'text-gray-500'
                  }`}>
                  {item.label}
                </span>
                {index < 3 && (
                  <div className={`w-12 h-0.5 mx-4 ${currentStep > item.step ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Membership Details */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Membership Details</h2>

            <div className="border-2 border-blue-200 rounded-xl p-6 bg-blue-50">
              <h3 className="text-xl font-bold text-blue-900 mb-2">{membership.name}</h3>
              <p className="text-gray-700 mb-4">{membership.description}</p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-blue-900">
                  LKR {membership.price.toLocaleString()}
                </span>
                <span className="text-gray-600">
                  {membership.durationMonths} month{membership.durationMonths > 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Full gym access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Professional equipment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Expert trainer guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Group classes included</span>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {currentStep === 1 && 'Complete Your Subscription'}
              {currentStep === 2 && 'Choose Payment Method'}
              {currentStep === 3 && 'Payment Details'}
              {currentStep === 4 && 'Processing Payment'}
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {renderStepContent()}

            {currentStep < 4 && (
              <div className="mt-8">
                <button
                  onClick={handleNextStep}
                  disabled={subscribing}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentStep === 3 ? (
                    <>
                      <Lock size={20} />
                      Pay Now
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>

                {currentStep === 1 && (
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By continuing, you agree to our terms of service and privacy policy.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}