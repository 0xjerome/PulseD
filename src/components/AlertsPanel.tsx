import React, { useState } from 'react';
import { Alert } from '../types';
import { 
  Bell, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  X, 
  Clock,
  TrendingDown,
  Users,
  Activity
} from 'lucide-react';

interface AlertsPanelProps {
  alerts: Alert[];
  loading: boolean;
  onAlertDismiss?: (alertId: string) => void;
  onAlertRead?: (alertId: string) => void;
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({
  alerts,
  loading,
  onAlertDismiss,
  onAlertRead,
}) => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'critical'>('all');

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'high':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'medium':
        return <Info className="w-5 h-5 text-yellow-600" />;
      default:
        return <Bell className="w-5 h-5 text-blue-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 border-red-200';
      case 'high':
        return 'bg-orange-50 border-orange-200';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sentiment':
        return <TrendingDown className="w-4 h-4" />;
      case 'governance':
        return <Users className="w-4 h-4" />;
      case 'social':
        return <Activity className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'unread') return !alert.isRead;
    if (filter === 'critical') return alert.severity === 'critical' || alert.severity === 'high';
    return true;
  });

  const unreadCount = alerts.filter(alert => !alert.isRead).length;
  const criticalCount = alerts.filter(alert => alert.severity === 'critical' || alert.severity === 'high').length;

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Alerts</h2>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Alerts</h2>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                {unreadCount} new
              </span>
            )}
            <Bell className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              filter === 'all' 
                ? 'bg-blue-50 text-blue-700 border-blue-200' 
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
          >
            All ({alerts.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              filter === 'unread' 
                ? 'bg-blue-50 text-blue-700 border-blue-200' 
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('critical')}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              filter === 'critical' 
                ? 'bg-red-50 text-red-700 border-red-200' 
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
          >
            Critical ({criticalCount})
          </button>
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {filteredAlerts.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 transition-colors ${
                  !alert.isRead ? 'bg-blue-50/30' : 'hover:bg-gray-50'
                }`}
                onClick={() => !alert.isRead && onAlertRead?.(alert.id)}
              >
                <div className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="flex-shrink-0 mt-0.5">
                        {getSeverityIcon(alert.severity)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900 text-sm">
                            {alert.title}
                          </h4>
                          {!alert.isRead && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          {alert.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-600">
                          <span className="flex items-center space-x-1">
                            {getTypeIcon(alert.type)}
                            <span className="capitalize">{alert.type}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span className="text-lg">
                              {alert.protocolId === 'ethereum' ? '🔷' :
                               alert.protocolId === 'uniswap' ? '🦄' :
                               alert.protocolId === 'aave' ? '👻' :
                               alert.protocolId === 'compound' ? '🏦' :
                               alert.protocolId === 'makerdao' ? '⚡' : '🏛️'}
                            </span>
                            <span>{alert.protocolName}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatTimestamp(alert.timestamp)}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAlertDismiss?.(alert.id);
                      }}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'all' ? 'No Alerts' :
               filter === 'unread' ? 'No Unread Alerts' :
               'No Critical Alerts'}
            </h3>
            <p className="text-gray-600">
              {filter === 'all' ? 'All clear! No alerts to display.' :
               filter === 'unread' ? 'You\'re all caught up!' :
               'No critical alerts at this time.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};