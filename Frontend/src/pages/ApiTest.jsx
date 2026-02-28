import { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw, ArrowLeft, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import ConnectionDebug from '../components/ConnectionDebug';
import ProxyInstructions from '../components/ProxyInstructions';

export default function ApiTest() {
  const navigate = useNavigate();
  const [results, setResults] = useState({});
  const [testing, setTesting] = useState(false);
  const [showProxyInstructions, setShowProxyInstructions] = useState(false);

  const testEndpoints = async () => {
    setTesting(true);
    const testResults = {};

    const endpoints = [
      {
        name: 'Backend Connection',
        test: () => apiService.testConnection()
      },
      {
        name: 'Session Check',
        test: () => apiService.checkSession()
      },
      {
        name: 'Get Trainers',
        test: () => apiService.getAllTrainers()
      },
      {
        name: 'Get Memberships',
        test: () => apiService.getAllMemberships()
      },
      {
        name: 'Get Training Plans',
        test: () => apiService.getAllPlans()
      },
      {
        name: 'Get Subscriptions',
        test: () => apiService.getAllSubscriptions()
      }
    ];

    for (const endpoint of endpoints) {
      try {
        const result = await endpoint.test();
        testResults[endpoint.name] = {
          status: result.success ? 'SUCCESS' : 'ERROR',
          message: result.message || 'Request completed',
          data: result.success ? (result.trainers || result.memberships || result.plans || result.subscriptions || result.data) : null
        };
      } catch (error) {
        testResults[endpoint.name] = {
          status: 'ERROR',
          message: error.message,
          data: null
        };
      }
    }

    setResults(testResults);
    setTesting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">API Connection Test</h1>
            <p className="text-gray-600">Test all backend API endpoints to verify connectivity</p>
          </div>
        </div>

        {/* Test Button */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Backend API Test</h2>
              <p className="text-gray-600">Click to test all API endpoints (Backend should be running on port 8080)</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowProxyInstructions(true)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                <Settings size={16} />
                Setup Guide
              </button>
              <button
                onClick={testEndpoints}
                disabled={testing}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
              >
                {testing ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <RefreshCw size={16} />
                    Run Tests
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {Object.keys(results).length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Test Results</h3>
            
            {Object.entries(results).map(([name, result]) => (
              <div key={name} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="p-4 border-b bg-gray-50">
                  <div className="flex items-center gap-3">
                    {result.status === 'SUCCESS' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <h4 className="font-semibold text-gray-900">{name}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      result.status === 'SUCCESS' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {result.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3">{result.message}</p>
                  
                  {result.data && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Response Data:</h5>
                      <div className="bg-gray-100 rounded-lg p-3 overflow-x-auto">
                        <pre className="text-xs text-gray-700">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Connection Debug Tool */}
        <ConnectionDebug />

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Setup Instructions</h3>
          <div className="space-y-2 text-blue-800">
            <p>1. Ensure the Spring Boot backend is running on <code className="bg-blue-100 px-2 py-1 rounded">http://localhost:8080</code></p>
            <p>2. Make sure MySQL is running on port 4306 with the DEAproject database</p>
            <p>3. All API endpoints should return SUCCESS status for full functionality</p>
            <p>4. If any tests fail, check the backend console for error messages</p>
          </div>
        </div>

        {/* Backend Status Summary */}
        {Object.keys(results).length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Object.values(results).filter(r => r.status === 'SUCCESS').length}
                </div>
                <div className="text-sm text-gray-600">Successful</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {Object.values(results).filter(r => r.status === 'ERROR').length}
                </div>
                <div className="text-sm text-gray-600">Failed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {Object.keys(results).length}
                </div>
                <div className="text-sm text-gray-600">Total Tests</div>
              </div>
            </div>
          </div>
        )}

        <ProxyInstructions 
          show={showProxyInstructions} 
          onClose={() => setShowProxyInstructions(false)} 
        />
      </div>
    </div>
  );
}