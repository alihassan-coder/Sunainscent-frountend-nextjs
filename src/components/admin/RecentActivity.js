export default function RecentActivity({ data }) {
  if (!data) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-green-100 text-green-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
          </div>
          <div className="px-6 py-4">
            {data.recent_orders && data.recent_orders.length > 0 ? (
              <div className="flow-root">
                <ul className="-my-3 divide-y divide-gray-200">
                  {data.recent_orders.map((order) => (
                    <li key={order.id} className="py-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {order.order_number}
                          </p>
                          <p className="text-sm text-gray-500">
                            {order.customer_name} • ${order.total_amount}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        <p className="text-sm text-gray-500">
                          {formatDate(order.created_at)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No recent orders</p>
            )}
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <a href="/admin/orders" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all orders →
            </a>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Messages</h3>
          </div>
          <div className="px-6 py-4">
            {data.recent_messages && data.recent_messages.length > 0 ? (
              <div className="flow-root">
                <ul className="-my-3 divide-y divide-gray-200">
                  {data.recent_messages.map((message) => (
                    <li key={message.id} className="py-3 flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {message.name}
                          </p>
                          <div className="flex items-center space-x-2">
                            {!message.is_read && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                            <p className="text-sm text-gray-500">
                              {formatDate(message.created_at)}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {message.subject}
                        </p>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {message.email}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No recent messages</p>
            )}
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <a href="/admin/contact" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all messages →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}