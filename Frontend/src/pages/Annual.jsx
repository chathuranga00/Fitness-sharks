
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AnnualPassPage() {
    const navigate = useNavigate();
    const { addPurchase } = useAuth();
    const [showSuccess, setShowSuccess] = useState(false);
    const features = [
        'All Monthly Membership Features',
        '24/7 Gym Access - Even holidays',
        'Free Personal Training Session Monthly',
        'Premium Locker Assignment',
        'Unlimited Guest Passes',
        'Spa & Sauna Access',
        'Nutrition Consultation Quarterly',
        'Free Gym Merchandise Package',
        'Priority Class Booking',
        'Exclusive Member Events',
        'Towel Service Included'
    ];

    const handlePurchase = () => {
        addPurchase({
            type: 'annual',
            name: 'Annual Membership',
            price: 'LKR 149,700',
            description: 'Annual gym membership with premium benefits',
            validFor: '365 days',
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
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
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
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    color: 'white',
                    padding: '8px 20px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '20px'
                }}>
                    BEST VALUE
                </div>

                <h1 style={{
                    fontSize: '42px',
                    color: '#2d3748',
                    marginBottom: '10px'
                }}>
                    Annual Membership
                </h1>

                <div style={{
                    color: '#718096',
                    fontSize: '18px',
                    marginBottom: '30px'
                }}>
                    Billed Yearly
                    <span style={{
                        background: '#48bb78',
                        color: 'white',
                        padding: '6px 15px',
                        borderRadius: '15px',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginLeft: '10px'
                    }}>
                        Save 17%
                    </span>
                </div>

                <div style={{
                    fontSize: '64px',
                    fontWeight: 'bold',
                    color: '#4facfe',
                    marginBottom: '10px'
                }}>
                    LKR 149,700 <span style={{
                        fontSize: '24px',
                        color: '#718096'
                    }}>/year</span>
                </div>

                <div style={{
                    color: '#718096',
                    fontSize: '14px',
                    marginBottom: '30px'
                }}>
                    That's only LKR 12,475/month when paid annually
                </div>

                <div style={{
                    color: '#4a5568',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    marginBottom: '40px'
                }}>
                    The ultimate gym membership experience. Get full access to all facilities, premium services, and exclusive member benefits. Best value for serious fitness enthusiasts!
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
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
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
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(79, 172, 254, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                    onClick={handlePurchase}>
                    {showSuccess ? 'Purchase Successful! ✓' : 'Join Annual'}
                </button>

                <div style={{
                    textAlign: 'center',
                    color: '#718096',
                    fontSize: '14px',
                    marginTop: '20px'
                }}>
                    One-time annual payment. Maximum value and savings.
                </div>
            </div>
        </div>
    );
}
