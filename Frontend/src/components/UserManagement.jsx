import { useState, useEffect } from 'react';
import { Users, Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';
import apiService from '../services/apiService';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const result = await apiService.getAllUsers();
      if (result.success) {
        setUsers(result.users || []);
        setError('');
      } else {
        setError(result.message || 'Failed to fetch users');
      }
    } catch (err) {
      setError('Error connecting to backend: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-600">Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-red-500 rounded-full"></div>
          <h3 className="font-semibold text-red-900">Error Loading Users</h3>
        </div>
        <p className="text-red-700 text-sm mb-3">{error}</p>
        <button
          onClick={fetchUsers}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <button className="flex items-center gap-2 px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700">
          <Plus size={16} />
          Add User
        </button>
      </div>

      {/* Search and Filters */}
      <div className="p-4 bg-white border shadow-sm rounded-xl">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={16} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 transition border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter size={16} />
            Filter
          </button>
          <button
            onClick={fetchUsers}
            className="flex items-center gap-2 px-4 py-2 transition border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Users size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Users Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="p-6 bg-white border shadow-sm rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="p-6 bg-white border shadow-sm rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Admin Users</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {users.filter(user => user.role === 'ADMIN').length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="p-6 bg-white border shadow-sm rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Customer Users</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {users.filter(user => user.role === 'CUSTOMER').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden bg-white border shadow-sm rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Created</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                    {searchTerm ? 'No users found matching your search.' : 'No users found.'}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                          {(user.username || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.username}</div>
                          <div className="text-sm text-gray-500">{user.email || 'No email'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        user.role === 'ADMIN' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role || 'CUSTOMER'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900" title="View User">
                          <Eye size={16} />
                        </button>
                        <button className="text-green-600 hover:text-green-900" title="Edit User">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900" title="Delete User">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}