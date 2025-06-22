import React, { useState } from 'react';
import { FiUser, FiSettings, FiLock, FiActivity, FiCheckCircle } from 'react-icons/fi';

// Placeholder user data
const dummyUser = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  role: 'Sales Agent',
  avatarUrl: 'https://i.pravatar.cc/150?u=sarahjohnson',
  phone: '+1 234 567 8900',
  address: '123 Realty Lane, Realville, USA',
  recentActivity: [
    { id: 1, action: 'Closed sale on PROP001', date: '2024-03-15' },
    { id: 2, action: 'Updated lead status for Emily Davis', date: '2024-03-14' },
    { id: 3, action: 'Added new property listing: Beachfront Condo', date: '2024-03-12' },
  ],
};

const UserProfile = () => {
  const [user, setUser] = useState(dummyUser);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
  });

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Placeholder for API call
    setUser({...user, ...formData});
    // Show success message
    alert('Profile Updated Successfully!');
  }

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Placeholder for API call
    alert('Password Changed Successfully!');
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FiUser /> },
    { id: 'settings', label: 'Account Settings', icon: <FiSettings /> },
    { id: 'activity', label: 'Recent Activity', icon: <FiActivity /> }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <img 
            src={user.avatarUrl} 
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
          />
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500">{user.role}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-light-primary text-light-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <p className="text-gray-900">{user.phone}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <p className="text-gray-900">{user.address}</p>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              {/* Edit Profile Form */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Edit Profile</h2>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-light-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-light-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-light-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-light-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-light-primary text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Save Changes
                  </button>
                </form>
              </div>

              {/* Change Password Form */}
              <div className="border-t pt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-light-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-light-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-light-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-4 py-2 bg-light-primary text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    <FiLock />
                    <span>Change Password</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">User Activity Log</h2>
              <div className="space-y-4">
                {user.recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FiCheckCircle className="text-green-500" />
                      <span className="text-gray-900">{activity.action}</span>
                    </div>
                    <span className="text-sm text-gray-500">{activity.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 