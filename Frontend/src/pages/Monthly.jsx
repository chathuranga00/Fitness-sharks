import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProMonthlyPage() {
    const navigate = useNavigate();
    const { addPurchase } = useAuth();
    const [showSuccess, setShowSuccess] = useState(false);
    const features = [
        'Unlimited Gym Access',
        'All Group Classes Included',
        'Personal Training Discount (20% off)',
        'Nutrition Consultation',
        'Guest Pass (2 per month)',
        'Locker Room & Shower Access',
        'Equipment Orientation Session',
        'Mobile App Access',
        'Progress Tracking',
        'Member Events Access'
    ];

    const handlePurchase = () => {
        addPurchase({
            type: 'monthly',
            name: 'Monthly Membership',
            price: 'LKR 14,700',
            description: 'Monthly gym membership with full access',
            validFor: '30 days',
            features: features
        });

        setShowSuccess(true);
        setTimeout(() => {
            navigate('/');
        }, 3000);
    };

    return (
        <div style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '50px',
                maxWidth: '600px',
                width: '100%',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                position: 'relative'
            }}>
                <button 
                    onClick={() => navigate('/')}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        background: 'transparent',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer',
                        color: '#718096',
                        padding: '10px'
                    }}
                >
                    ← Back
                </button>
                <div style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    color: 'white',
                    padding: '8px 20px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '20px'
                }}>
                    MOST POPULAR
                </div>

                <h1 style={{
                    fontSize: '42px',
                    color: '#2d3748',
                    marginBottom: '10px'
                }}>
                    Monthly Membership
                </h1>

                <div style={{
                    color: '#718096',
                    fontSize: '18px',
                    marginBottom: '30px'
                }}>
                    per month
                </div>

                <div style={{
                    fontSize: '64px',
                    fontWeight: 'bold',
                    color: '#f5576c',
                    marginBottom: '10px'
                }}>
                    LKR 14,700 <span style={{
                    fontSize: '24px',
                    color: '#718096'
                }}>/mo</span>
                </div>

                <div style={{
                    color: '#4a5568',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    marginBottom: '40px',
                    marginTop: '30px'
                }}>
                    Perfect for regular gym-goers who want full access to our premium facilities, group classes, and member benefits. No long-term commitment required.
                </div>

                <ul style={{
                    listStyle: 'none',
                    marginBottom: '40px',
                    paddingLeft: '0'
                }}>
                    {features.map((feature, index) => (
                        <li key={index} style={{
                            padding: '15px 0',
                            borderBottom: index === features.length - 1 ? 'none' : '1px solid #e2e8f0',
                            color: '#2d3748',
                            fontSize: '16px',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
              <span style={{
                  color: '#48bb78',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  marginRight: '15px'
              }}>
                ✓
              </span>
                            {feature}
                        </li>
                    ))}
                </ul>

                <button style={{
                    width: '100%',
                    padding: '18px',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 10px 25px rgba(245, 87, 108, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                        onClick={handlePurchase}>
                    {showSuccess ? 'Purchase Successful! ✓' : 'Join Monthly'}
                </button>

                <div style={{
                    textAlign: 'center',
                    color: '#718096',
                    fontSize: '14px',
                    marginTop: '20px'
                }}>
                    Cancel anytime. No long-term commitment required.
                </div>
            </div>
        </div>
    );
}