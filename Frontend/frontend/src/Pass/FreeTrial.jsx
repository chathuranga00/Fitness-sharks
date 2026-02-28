export default function FreeTrialPage() {
    const features = [
        'Full Dashboard Access',
        'Basic Workout Plans',
        'Community Support',
        'No Credit Card Required'
    ];

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
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}>
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
                    LIMITED TIME OFFER
                </div>

                <h1 style={{
                    fontSize: '42px',
                    color: '#2d3748',
                    marginBottom: '10px'
                }}>
                    Free Trial
                </h1>

                <div style={{
                    color: '#718096',
                    fontSize: '18px',
                    marginBottom: '30px'
                }}>
                    for 7 days
                </div>

                <div style={{
                    fontSize: '64px',
                    fontWeight: 'bold',
                    color: '#667eea',
                    marginBottom: '40px'
                }}>
                    $0
                </div>

                <div style={{
                    color: '#4a5568',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    marginBottom: '40px'
                }}>
                    Experience our state-of-the-art facilities and discover what makes our gym the perfect place to start your fitness journey. No commitments, no credit card required.
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
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                            e.currentTarget.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}>
                    Start Free Trial
                </button>

                <div style={{
                    textAlign: 'center',
                    color: '#718096',
                    fontSize: '14px',
                    marginTop: '20px'
                }}>
                    Cancel anytime during the trial period
                </div>
            </div>
        </div>
    );
}