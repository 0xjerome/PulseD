import React, { useState } from 'react';
import { Search, Send, Loader2, MessageSquare, TrendingUp, Users, Clock } from 'lucide-react';
import { QueryResult } from '../types';

interface QueryInterfaceProps {
  onQuery: (query: string, onStreamUpdate?: (chunk: string) => void) => Promise<QueryResult | null>;
  loading: boolean;
}

export const QueryInterface: React.FC<QueryInterfaceProps> = ({
  onQuery,
  loading,
}) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [queryHistory, setQueryHistory] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    // Add to history
    setQueryHistory(prev => [query, ...prev.slice(0, 9)]);
    
    // Clear previous results
    setResult(null);
    setStreamingMessage('');

    try {
      const response = await onQuery(query, (chunk) => {
        setStreamingMessage(chunk);
      });
      
      if (response) {
        setResult(response);
        setStreamingMessage('');
      }
    } catch (error) {
      console.error('Query error:', error);
      setStreamingMessage('Error processing query. Please try again.');
    }

    setQuery('');
  };

  const handleQuickQuery = (quickQuery: string) => {
    setQuery(quickQuery);
  };

  const quickQueries = [
    'What is the sentiment for Ethereum this week?',
    'Show me recent governance activity',
    'Which protocols have the most positive sentiment?',
    'What are the trending DAO proposals?',
    'Analyze Uniswap recent social sentiment',
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Query Agent</h2>
        <p className="text-sm text-gray-600 mt-1">
          Ask about specific protocols, sentiment trends, or governance activity
        </p>
      </div>

      <div className="p-6">
        {/* Query Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about sentiment, governance, or specific protocols..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={!query.trim() || loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>{loading ? 'Processing...' : 'Query'}</span>
            </button>
          </div>
        </form>

        {/* Quick Queries */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Queries</h3>
          <div className="flex flex-wrap gap-2">
            {quickQueries.map((quickQuery, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuery(quickQuery)}
                disabled={loading}
                className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {quickQuery}
              </button>
            ))}
          </div>
        </div>

        {/* Streaming Message */}
        {streamingMessage && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              <span className="text-blue-800 text-sm">{streamingMessage}</span>
            </div>
          </div>
        )}

        {/* Query Result */}
        {result && (
          <div className="space-y-6">
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Results for "{result.protocol}"
              </h3>
              
              {/* Sentiment Results */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span>Sentiment Analysis</span>
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {result.sentiment.currentScore}
                      </div>
                      <div className="text-sm text-gray-600">Current Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-600 capitalize">
                        {result.sentiment.trend}
                      </div>
                      <div className="text-sm text-gray-600">Trend</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-purple-600">
                        {result.sentiment.socialVolume.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Social Volume</div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-700">Key Topics:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.sentiment.keyTopics.map((topic, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Governance Results */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                  <Users className="w-4 h-4 text-green-600" />
                  <span>Governance Activity</span>
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Participation Trend: 
                      </span>
                      <span className="text-sm text-green-600 capitalize font-medium">
                        {result.governance.participationTrend}
                      </span>
                    </div>
                  </div>

                  {result.governance.recentProposals.length > 0 && (
                    <div className="mb-4">
                      <span className="text-sm font-medium text-gray-700 mb-2 block">
                        Recent Proposals:
                      </span>
                      <div className="space-y-2">
                        {result.governance.recentProposals.map((proposal, index) => (
                          <div key={index} className="text-sm bg-white p-3 rounded border">
                            <div className="font-medium text-gray-900 mb-1">
                              {proposal.title}
                            </div>
                            <div className="text-gray-600 text-xs">
                              Status: {proposal.status} • Ends: {new Date(proposal.endDate).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.governance.upcomingEvents.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-700 mb-2 block">
                        Upcoming Events:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {result.governance.upcomingEvents.map((event, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm flex items-center space-x-1"
                          >
                            <Clock className="w-3 h-3" />
                            <span>{event}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Insights */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-purple-600" />
                  <span>AI Insights</span>
                </h4>
                <div className="space-y-3">
                  {result.insights.map((insight, index) => (
                    <div key={index} className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <p className="text-sm text-purple-800">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Query History */}
        {queryHistory.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Queries</h3>
            <div className="space-y-2">
              {queryHistory.slice(0, 5).map((historyQuery, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(historyQuery)}
                  className="text-left w-full px-3 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {historyQuery}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};