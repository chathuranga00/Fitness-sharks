import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, RefreshCw, HelpCircle } from 'lucide-react';
import apiService from '../services/apiService';
import BackendSetupGuide from './BackendSetupGuide';

export default function BackendConnectionTest() {
  const [connectionStatus, setConnectionStatus] = useState('testing');
  const [connectionMessage, setConnectionMessage] = useState('Testing backend connection...');
  const [isVisible, setIsVisible] = useState(true);
  const [showSetupGuide, setShowSetupGuide] = useState(false);

  const testConnection = async () => {
    setConnectionStatus('testing');
    setConnectionMessage('Testing backend connection...');
    
    try {
      const result = await apiService.testConnection();
      if (result.success) {
        setConnectionStatus('success');
        setConnectionMessage('Backend connected successfully!');
        // Auto-hide after 3 seconds if successful
        setTimeout(() => setIsVisible(false), 3000);
      } else {
        setConnectionStatus('error');
        setConnectionMessage(result.message || 'Failed to connect to backend');
      }
    } catch (error) {
      setConnectionStatus('error');
      setConnectionMessage('Cannot connect to backend server. Please ensure it is running on port 8080.');
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  if (!isVisible) return null;

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'testing':
        return <RefreshCw className="w-5 h-5 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'testing':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    }
  };

  return (
    <>
      <div className={`fixed top-4 right-4 z-50 p-4 border rounded-lg shadow-lg max-w-sm ${getStatusColor()}`}>
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div className="flex-1">
            <p className="text-sm font-medium">Backend Status</p>
            <p className="text-xs">{connectionMessage}</p>
          </div>
          <div className="flex gap-2">
            {connectionStatus === 'error' && (
              <>
                <button
                  onClick={() => setShowSetupGuide(true)}
                  className="p-1 rounded hover:bg-black hover:bg-opacity-10"
                  title="Setup guide"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={testConnection}
                  className="p-1 rounded hover:bg-black hover:bg-opacity-10"
                  title="Retry connection"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 rounded hover:bg-black hover:bg-opacity-10"
              title="Close"
            >
              ×
            </button>
          </div>
        </div>
      </div>
      
      <BackendSetupGuide 
        isOpen={showSetupGuide} 
        onClose={() => setShowSetupGuide(false)} 
      />
    </>
  );
}