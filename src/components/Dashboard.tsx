import React, { useState, useEffect } from 'react';
import { Protocol, DAOProposal, Alert, QueryResult } from '../types';
import { fetchProtocols, fetchDAOProposals, fetchAlerts, queryProtocol } from '../api';
import { ProtocolList } from './ProtocolList';
import { SentimentVisualization } from './SentimentVisualization';
import { DAOProposals } from './DAOProposals';
import { AlertsPanel } from './AlertsPanel';
import { QueryInterface } from './QueryInterface';
import { RefreshCw, Activity, TrendingUp, Bell, Search, ExternalLink } from 'lucide-react';

export const Dashboard: React.FC = () => {
  // State management
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [proposals, setProposals] = useState<DAOProposal[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState<{
    protocols: boolean;
    proposals: boolean;
    alerts: boolean;
    query: boolean;
  }>({
    protocols: false,
    proposals: false,
    alerts: false,
    query: false,
  });
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Load initial data
  useEffect(() => {
    loadAllData();
    
    // Set up auto-refresh every 30 seconds for demo purposes
    const interval = setInterval(loadAllData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadAllData = async () => {
    await Promise.all([
      loadProtocols(),
      loadProposals(),
      loadAlerts(),
    ]);
    setLastUpdated(new Date());
  };

  const loadProtocols = async () => {
    setLoading(prev => ({ ...prev, protocols: true }));
    try {
      const response = await fetchProtocols();
      if (response.success) {
        setProtocols(response.data);
      }
    } catch (error) {
      console.error('Failed to load protocols:', error);
    } finally {
      setLoading(prev => ({ ...prev, protocols: false }));
    }
  };

  const loadProposals = async () => {
    setLoading(prev => ({ ...prev, proposals: true }));
    try {
      const response = await fetchDAOProposals();
      if (response.success) {
        setProposals(response.data);
      }
    } catch (error) {
      console.error('Failed to load proposals:', error);
    } finally {
      setLoading(prev => ({ ...prev, proposals: false }));
    }
  };

  const loadAlerts = async () => {
    setLoading(prev => ({ ...prev, alerts: true }));
    try {
      const response = await fetchAlerts();
      if (response.success) {
        setAlerts(response.data);
      }
    } catch (error) {
      console.error('Failed to load alerts:', error);
    } finally {
      setLoading(prev => ({ ...prev, alerts: false }));
    }
  };

  const handleQuery = async (
    query: string,
    onStreamUpdate?: (chunk: string) => void
  ): Promise<QueryResult | null> => {
    setLoading(prev => ({ ...prev, query: true }));
    try {
      const response = await queryProtocol(query, onStreamUpdate);
      if (response.success) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Query failed:', error);
      return null;
    } finally {
      setLoading(prev => ({ ...prev, query: false }));
    }
  };

  const handleProtocolSelect = (protocol: Protocol) => {
    // Scroll to query interface and pre-fill with protocol name
    const querySection = document.getElementById('query-section');
    if (querySection) {
      querySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAlertDismiss = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const handleAlertRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const getOverallStats = () => {
    const totalProtocols = protocols.length;
    const activeProposals = proposals.filter(p => p.status === 'active').length;
    const criticalAlerts = alerts.filter(a => a.severity === 'critical' || a.severity === 'high').length;
    const avgSentiment = protocols.length > 0 
      ? protocols.reduce((sum, p) => sum + p.sentiment.score, 0) / protocols.length 
      : 0;

    return { totalProtocols, activeProposals, criticalAlerts, avgSentiment };
  };

  const stats = getOverallStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Social Sentiment & Governance Tracker
              </h1>
              <p className="text-gray-600 mt-1">
                Real-time crypto protocol sentiment and DAO governance insights
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {lastUpdated && (
                <span className="text-sm text-gray-500">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              <button
                onClick={loadAllData}
                disabled={Object.values(loading).some(Boolean)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${Object.values(loading).some(Boolean) ? 'animate-spin' : ''}`} />
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tracked Protocols</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProtocols}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Proposals</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeProposals}</p>
              </div>
              <Search className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.criticalAlerts}</p>
              </div>
              <Bell className="w-8 h-8 text-red-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Sentiment</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgSentiment.toFixed(1)}</p>
              </div>
              <TrendingUp className={`w-8 h-8 ${stats.avgSentiment > 0 ? 'text-green-600' : 'text-red-600'}`} />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Protocol List */}
            <ProtocolList 
              protocols={protocols} 
              loading={loading.protocols}
              onProtocolSelect={handleProtocolSelect}
            />
            
            {/* DAO Proposals */}
            <DAOProposals 
              proposals={proposals} 
              loading={loading.proposals}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Sentiment Visualization */}
            <SentimentVisualization 
              protocols={protocols} 
              loading={loading.protocols}
            />
            
            {/* Alerts Panel */}
            <AlertsPanel 
              alerts={alerts} 
              loading={loading.alerts}
              onAlertDismiss={handleAlertDismiss}
              onAlertRead={handleAlertRead}
            />
          </div>
        </div>

        {/* Query Interface - Full Width */}
        <div id="query-section" className="mt-8">
          <QueryInterface 
            onQuery={handleQuery}
            loading={loading.query}
          />
        </div>

        {/* Data Sources Footer */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Sources & Integration</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <ExternalLink className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm text-gray-700">@KaitoAI</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <ExternalLink className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm text-gray-700">@nansen_ai</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <ExternalLink className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-sm text-gray-700">@arkham</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <ExternalLink className="w-4 h-4 text-orange-600" />
              </div>
              <span className="text-sm text-gray-700">@MessariCrypto</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            This dashboard aggregates data from multiple sources to provide comprehensive sentiment and governance insights.
            All data is processed through the Sentient Chat ecosystem with real-time streaming capabilities.
          </p>
        </div>
      </div>
    </div>
  );
};