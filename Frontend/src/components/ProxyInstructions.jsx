import { Terminal, RefreshCw, CheckCircle } from 'lucide-react';

export default function ProxyInstructions({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Backend Connection Setup</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold text-red-900">Connection Issue Detected</h3>
            </div>
            <p className="text-red-800 text-sm">
              The frontend cannot connect to the backend due to CORS restrictions. 
              Follow the steps below to fix this.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-bold text-sm">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Install Proxy Middleware</h4>
                <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm">
                  cd frontend<br/>
                  npm install http-proxy-middleware --save-dev
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-bold text-sm">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Restart Frontend Server</h4>
                <p className="text-gray-600 text-sm mb-2">
                  Stop the current frontend server (Ctrl+C) and restart it:
                </p>
                <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm">
                  npm start
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full">
                <CheckCircle size={16} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Verify Connection</h4>
                <p className="text-gray-600 text-sm">
                  After restarting, the proxy will automatically forward API requests to your backend.
                  You should see proxy logs in your terminal.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">How the Proxy Works</h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Forwards all <code>/api/*</code> requests to <code>http://localhost:8080</code></li>
              <li>• Eliminates CORS issues by making requests appear same-origin</li>
              <li>• Automatically handles cookies and authentication headers</li>
              <li>• Only works in development mode</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">Troubleshooting</h4>
            <ul className="text-yellow-800 text-sm space-y-1">
              <li>• Ensure backend is running on port 8080</li>
              <li>• Check terminal for proxy logs after restart</li>
              <li>• Clear browser cache if issues persist</li>
              <li>• Use the Debug Tool below to test specific endpoints</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Close
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <RefreshCw size={16} />
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}