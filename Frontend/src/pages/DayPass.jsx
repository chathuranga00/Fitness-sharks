import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function DayPassPage() {
    const navigate = useNavigate();
    const { addPurchase } = useAuth();
    const [showSuccess, setShowSuccess] = useState(false);
    const features = [
        'Full Gym Access (Single Day)',
        'All Equipment Available',
        'Group Classes Included',
        'Locker Room & Shower Access',
        'Towel Service',
        'No Long-term Commitment',
        'Valid for 24 Hours',
        'Guest WiFi Access'
    ];

    const handlePurchase = () => {
        // Add purchase to user profile
        addPurchase({
            type: 'day-pass',
            name: 'Day Pass',
            price: 'LKR 7,500',
            description: 'Single day gym access',
            validFor: '24 hours',
            features: features
        });

        // Show success message
        setShowSuccess(true);

        // Auto redirect to home after 3 seconds
        setTimeout(() => {
            navigate('/');
        }, 3000);
    };

    return (
        <div style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '8px 20px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '20px'
                }}>
                    FLEXIBLE OPTION
                </div>

                <h1 style={{
                    fontSize: '42px',
                    color: '#2d3748',
                    marginBottom: '10px'
                }}>
                    Day Pass
                </h1>

                <div style={{
                    color: '#718096',
                    fontSize: '18px',
                    marginBottom: '30px'
                }}>
                    single visit
                </div>

                <div style={{
                    fontSize: '64px',
                    fontWeight: 'bold',
                    color: '#667eea',
                    marginBottom: '40px'
                }}>
                    LKR 7,500
                </div>

                <div style={{
                    color: '#4a5568',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    marginBottom: '40px'
                }}>
                    Perfect for visitors, travelers, or those who want to try our gym without commitment. Get full access to all facilities and equipment for one day.
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
                    background: showSuccess ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: showSuccess ? 'default' : 'pointer',
                    transition: 'all 0.3s ease',
                    transform: showSuccess ? 'scale(1.02)' : 'scale(1)'
                }}
                        onMouseEnter={(e) => {
                            if (!showSuccess) {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.4)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!showSuccess) {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }
                        }}
                        onClick={handlePurchase}
                        disabled={showSuccess}>
                    {showSuccess ? 'Purchase Successful! ✓' : 'Buy Day Pass'}
                </button>

                {showSuccess && (
                    <div style={{
                        marginTop: '20px',
                        padding: '15px',
                        background: '#f0fff4',
                        border: '2px solid #48bb78',
                        borderRadius: '12px',
                        textAlign: 'center',
                        color: '#2f855a',
                        fontSize: '16px',
                        fontWeight: '600'
                    }}>
                        🎉 Pass Purchase Successful! 🎉
                        <div style={{ fontSize: '14px', marginTop: '8px', fontWeight: 'normal' }}>
                            Redirecting to home in 3 seconds...
                        </div>
                    </div>
                )}

                <div style={{
                    textAlign: 'center',
                    color: '#718096',
                    fontSize: '14px',
                    marginTop: '20px'
                }}>
                    Valid for one full day of gym access
                </div>
            </div>
        </div>
    );
}