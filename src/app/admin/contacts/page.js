'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import AdminProtectedRoute from '@/components/AdminProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { adminAPI } from '@/lib/api';

export default function AdminContacts() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const router = useRouter();
  const { token } = useAuth();

  const statusOptions = [
    { value: '', label: 'All Messages' },
    { value: 'false', label: 'Unread' },
    { value: 'true', label: 'Read' }
  ];

  useEffect(() => {
    fetchMessages();
  }, [searchTerm, statusFilter]);

  const fetchMessages = async () => {
    try {
      const response = await adminAPI.getContactMessages({
        search: searchTerm || undefined,
        is_read: statusFilter ? statusFilter === 'true' : undefined
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (messageId) => {
    try {
      await adminAPI.markMessageAsRead(messageId);
      fetchMessages();
    } catch (error) {
      console.error('Error marking message as read:', error);
      setError('Failed to mark message as read');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await adminAPI.markAllMessagesAsRead();
      fetchMessages();
    } catch (error) {
      console.error('Error marking all messages as read:', error);
      setError('Failed to mark all messages as read');
    }
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setAdminNotes(message.admin_notes || '');
    setShowModal(true);
    if (!message.is_read) {
      handleMarkAsRead(message.id);
    }
  };

  const handleUpdateNotes = async () => {
    try {
      await adminAPI.updateContactMessage(selectedMessage.id, { admin_notes: adminNotes });
      setShowModal(false);
      fetchMessages();
    } catch (error) {
      console.error('Error updating message notes:', error);
      setError('Failed to update message notes');
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await adminAPI.deleteContactMessage(messageId);
        fetchMessages();
      } catch (error) {
        console.error('Error deleting message:', error);
        setError('Failed to delete message');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white shadow">
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-6 md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                    Contact Messages
                  </h1>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4">
                  <button
                    onClick={handleMarkAllAsRead}
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Mark All as Read
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Search</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search messages..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={fetchMessages}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Refresh
                </button>
              </div>
            </div>
          </div>

          {/* Messages Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Message
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {messages.map((message) => (
                      <tr key={message.id} className={!message.is_read ? 'bg-blue-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              message.is_read
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {message.is_read ? 'Read' : 'Unread'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{message.name}</div>
                          <div className="text-sm text-gray-500">{message.email}</div>
                          {message.phone && (
                            <div className="text-sm text-gray-500">{message.phone}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {message.subject}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                          <div className="truncate">
                            {message.message}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(message.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleViewMessage(message)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(message.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Message Details Modal */}
          {showModal && selectedMessage && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Message from {selectedMessage.name}
                    </h3>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Info */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-3">Contact Information</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">Name:</span> {selectedMessage.name}
                        </div>
                        <div>
                          <span className="font-medium">Email:</span> {selectedMessage.email}
                        </div>
                        {selectedMessage.phone && (
                          <div>
                            <span className="font-medium">Phone:</span> {selectedMessage.phone}
                          </div>
                        )}
                        <div>
                          <span className="font-medium">Date:</span> {formatDate(selectedMessage.created_at)}
                        </div>
                        <div>
                          <span className="font-medium">Status:</span>
                          <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            selectedMessage.is_read
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {selectedMessage.is_read ? 'Read' : 'Unread'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Message Info */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-3">Message Details</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">Subject:</span> {selectedMessage.subject}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="mt-6">
                    <h4 className="text-md font-medium text-gray-900 mb-3">Message</h4>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>

                  {/* Admin Notes */}
                  <div className="mt-6">
                    <h4 className="text-md font-medium text-gray-900 mb-3">Admin Notes</h4>
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      rows={3}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Add admin notes..."
                    />
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={handleUpdateNotes}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Update Notes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
