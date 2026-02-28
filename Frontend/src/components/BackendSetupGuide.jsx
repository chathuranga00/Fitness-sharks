import { X, Server, Database, Play, CheckCircle } from 'lucide-react';

export default function BackendSetupGuide({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Backend Setup Guide</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Server className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Backend Connection Required</h3>
            </div>
            <p className="text-blue-800 text-sm">
              The frontend needs to connect to the Spring Boot backend server to function properly. 
              Follow the steps below to start the backend.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-bold text-sm">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Navigate to Backend Directory</h4>
                <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm">
                  cd backend
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-bold text-sm">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Ensure MySQL is Running</h4>
                <p className="text-gray-600 text-sm mb-2">
                  Make sure MySQL is running on port 4306 (as configured in application.properties)
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 text-sm">
                    <strong>Database:</strong> DEAproject<br />
                    <strong>Port:</strong> 4306<br />
                    <strong>Username:</strong> root<br />
                    <strong>Password:</strong> (empty)
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-bold text-sm">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Start the Backend Server</h4>
                <p className="text-gray-600 text-sm mb-2">Run one of these commands:</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Windows:</p>
                    <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm">
                      mvnw.cmd spring-boot:run
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Mac/Linux:</p>
                    <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm">
                      ./mvnw spring-boot:run
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full">
                <CheckCircle size={16} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Verify Connection</h4>
                <p className="text-gray-600 text-sm mb-2">
                  The backend should start on <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:8080</code>
                </p>
                <p className="text-gray-600 text-sm">
                  Once running, refresh this page or click the retry button to test the connection.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">API Endpoints</h4>
            <p className="text-gray-600 text-sm mb-2">The backend provides these main endpoints:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <code>/api/auth/*</code> - Authentication (login, register, logout)</li>
              <li>• <code>/api/trainers</code> - Trainer management</li>
              <li>• <code>/api/memberships</code> - Membership plans</li>
              <li>• <code>/api/plans</code> - Training plans</li>
              <li>• <code>/api/subscriptions</code> - User subscriptions</li>
            </ul>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-2">Troubleshooting</h4>
            <ul className="text-sm text-red-800 space-y-1">
              <li>• Ensure Java 17+ is installed</li>
              <li>• Check that port 8080 is not in use by another application</li>
              <li>• Verify MySQL is running and accessible on port 4306</li>
              <li>• Check the backend console for any error messages</li>
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
            onClick={() => window.open('http://localhost:8080', '_blank')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Test Backend URL
          </button>
        </div>
      </div>
    </div>
  );
}