'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import AdminProtectedRoute from '@/components/AdminProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { adminAPI } from '@/lib/api';

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await adminAPI.getAnalytics();
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setError('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
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
                    Analytics Dashboard
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {analytics && (
            <>
              {/* Daily Stats Chart */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Orders & Revenue (Last 30 Days)</h3>
                <div className="h-64 flex items-end space-x-1">
                  {analytics.daily_stats.slice(-30).map((stat, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="w-full bg-indigo-200 rounded-t" style={{ height: `${Math.max(4, (stat.orders / Math.max(...analytics.daily_stats.map(s => s.orders))) * 200)}px` }}>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 transform -rotate-45 origin-left">
                        {formatDate(stat.date)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center space-x-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Orders</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Revenue</span>
                  </div>
                </div>
              </div>

              {/* Order Status Distribution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Order Status Distribution</h3>
                  <div className="space-y-3">
                    {analytics.order_status_distribution.map((status, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${
                            status._id === 'pending' ? 'bg-yellow-500' :
                            status._id === 'confirmed' ? 'bg-blue-500' :
                            status._id === 'processing' ? 'bg-purple-500' :
                            status._id === 'shipped' ? 'bg-indigo-500' :
                            status._id === 'delivered' ? 'bg-green-500' :
                            'bg-red-500'
                          }`}></div>
                          <span className="text-sm font-medium text-gray-900 capitalize">
                            {status._id}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">{status.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Top Products</h3>
                  <div className="space-y-3">
                    {analytics.top_products.slice(0, 5).map((product, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-xs font-medium text-indigo-800">{index + 1}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900 truncate max-w-32">
                            {product._id}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">{product.total_quantity} sold</div>
                          <div className="text-xs text-gray-500">{formatCurrency(product.total_revenue)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Revenue (Last 30 Days)</h3>
                <div className="h-64 flex items-end space-x-1">
                  {analytics.daily_stats.slice(-30).map((stat, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="w-full bg-green-200 rounded-t" style={{ height: `${Math.max(4, (stat.revenue / Math.max(...analytics.daily_stats.map(s => s.revenue))) * 200)}px` }}>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 transform -rotate-45 origin-left">
                        {formatDate(stat.date)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <span className="text-sm text-gray-600">
                    Total Revenue: {formatCurrency(analytics.daily_stats.reduce((sum, stat) => sum + stat.revenue, 0))}
                  </span>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                          <dd className="text-lg font-medium text-gray-900">
                            {analytics.daily_stats.reduce((sum, stat) => sum + stat.orders, 0)}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                          <dd className="text-lg font-medium text-gray-900">
                            {formatCurrency(analytics.daily_stats.reduce((sum, stat) => sum + stat.revenue, 0))}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Avg Order Value</dt>
                          <dd className="text-lg font-medium text-gray-900">
                            {formatCurrency(
                              analytics.daily_stats.reduce((sum, stat) => sum + stat.revenue, 0) / 
                              Math.max(analytics.daily_stats.reduce((sum, stat) => sum + stat.orders, 0), 1)
                            )}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Top Product</dt>
                          <dd className="text-lg font-medium text-gray-900 truncate">
                            {analytics.top_products[0]?._id || 'N/A'}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
