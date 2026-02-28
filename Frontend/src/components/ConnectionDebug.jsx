import { useState } from 'react';
import axios from 'axios';

export default function ConnectionDebug() {
  const [results, setResults] = useState([]);
  const [testing, setTesting] = useState(false);

  const testUrls = [
    'http://localhost:8080',
    'http://localhost:8080/api',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:8080/api'
  ];

  const testEndpoints = [
    '/trainers',
    '/api/trainers',
    '/memberships',
    '/api/memberships',
    '/plans',
    '/api/plans'
  ];

  const runDebugTest = async () => {
    setTesting(true);
    const testResults = [];

    for (const baseUrl of testUrls) {
      for (const endpoint of testEndpoints) {
        const fullUrl = `${baseUrl}${endpoint}`;
        
        try {
          console.log(`Testing: ${fullUrl}`);
          
          const response = await axios.get(fullUrl, {
            timeout: 5000,
            withCredentials: false
          });
          
          testResults.push({
            url: fullUrl,
            status: 'SUCCESS',
            statusCode: response.status,
            data: response.data,
            message: `✅ Connected successfully - Found ${response.data?.length || 0} items`
          });
          
        } catch (error) {
          let errorMessage = error.message;
          let statusCode = 'N/A';
          
          if (error.response) {
            statusCode = error.response.status;
            errorMessage = `Server responded with ${error.response.status}: ${error.response.statusText}`;
          } else if (error.request) {
            errorMessage = 'No response received - Connection failed';
          }
          
          testResults.push({
            url: fullUrl,
            status: 'FAILED',
            statusCode: statusCode,
            data: null,
            message: `❌ ${errorMessage}`
          });
        }
      }
    }

    setResults(testResults);
    setTesting(false);
  };

  return (
    <div className="p-6 bg-white border rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Connection Debug Tool</h3>
        <button
          onClick={runDebugTest}
          disabled={testing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {testing ? 'Testing...' : 'Run Debug Test'}
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        This will test various URL combinations to find the working backend connection.
      </p>

      {results.length > 0 && (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          <h4 className="font-medium text-gray-900">Test Results:</h4>
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${
                result.status === 'SUCCESS' 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <code className="text-sm font-mono">{result.url}</code>
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  result.status === 'SUCCESS'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {result.status} ({result.statusCode})
                </span>
              </div>
              <p className="text-sm text-gray-700">{result.message}</p>
              {result.data && (
                <details className="mt-2">
                  <summary className="text-xs text-gray-500 cursor-pointer">Show response data</summary>
                  <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-x-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ))}
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h5 className="font-medium text-blue-900 mb-2">Summary:</h5>
          <p className="text-sm text-blue-800">
            ✅ Successful: {results.filter(r => r.status === 'SUCCESS').length} | 
            ❌ Failed: {results.filter(r => r.status === 'FAILED').length}
          </p>
          {results.some(r => r.status === 'SUCCESS') && (
            <p className="text-sm text-blue-800 mt-1">
              <strong>Working URLs found!</strong> Use one of the successful URLs above.
            </p>
          )}
        </div>
      )}
    </div>
  );
}