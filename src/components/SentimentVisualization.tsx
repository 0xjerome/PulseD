import React from 'react';
import { Protocol } from '../types';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

interface SentimentVisualizationProps {
  protocols: Protocol[];
  loading: boolean;
}

export const SentimentVisualization: React.FC<SentimentVisualizationProps> = ({
  protocols,
  loading,
}) => {
  const getOverallMarketSentiment = () => {
    if (protocols.length === 0) return { score: 0, trend: 'neutral', color: 'yellow' };
    
    const avgScore = protocols.reduce((sum, p) => sum + p.sentiment.score, 0) / protocols.length;
    const avgChange = protocols.reduce((sum, p) => sum + p.sentiment.change24h, 0) / protocols.length;
    
    const color = avgScore > 20 ? 'green' : avgScore < -20 ? 'red' : 'yellow';
    const trend = avgChange > 0 ? 'up' : avgChange < 0 ? 'down' : 'stable';
    
    return { score: avgScore, trend, color };
  };

  const marketSentiment = getOverallMarketSentiment();

  const getSentimentStats = () => {
    const positive = protocols.filter(p => p.sentiment.overall === 'positive').length;
    const neutral = protocols.filter(p => p.sentiment.overall === 'neutral').length;
    const negative = protocols.filter(p => p.sentiment.overall === 'negative').length;
    
    return { positive, neutral, negative };
  };

  const stats = getSentimentStats();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Sentiment Overview</h2>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-20 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Sentiment Overview</h2>
        <p className="text-sm text-gray-600 mt-1">
          Market sentiment analysis across tracked protocols
        </p>
      </div>
      
      <div className="p-6">
        {/* Overall Market Sentiment */}
        <div className="mb-8">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
              marketSentiment.color === 'green' ? 'bg-green-100 text-green-600' :
              marketSentiment.color === 'red' ? 'bg-red-100 text-red-600' :
              'bg-yellow-100 text-yellow-600'
            }`}>
              {marketSentiment.trend === 'up' ? <TrendingUp className="w-8 h-8" /> :
               marketSentiment.trend === 'down' ? <TrendingDown className="w-8 h-8" /> :
               <AlertTriangle className="w-8 h-8" />}
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {marketSentiment.score.toFixed(1)}
            </h3>
            <p className="text-sm text-gray-600">Overall Market Sentiment</p>
          </div>
        </div>

        {/* Sentiment Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{stats.positive}</div>
            <div className="text-sm text-gray-600">Positive Protocols</div>
          </div>
          
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-600">{stats.neutral}</div>
            <div className="text-sm text-gray-600">Neutral Protocols</div>
          </div>
          
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-3">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-600">{stats.negative}</div>
            <div className="text-sm text-gray-600">Negative Protocols</div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 mb-3">Top Sentiment Performers (24h)</h4>
          {protocols
            .sort((a, b) => b.sentiment.change24h - a.sentiment.change24h)
            .slice(0, 3)
            .map((protocol, index) => (
              <div key={protocol.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                  <span className="text-lg">{protocol.logo}</span>
                  <div>
                    <div className="font-medium text-gray-900">{protocol.name}</div>
                    <div className="text-sm text-gray-600">Score: {protocol.sentiment.score}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${
                    protocol.sentiment.change24h > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {protocol.sentiment.change24h > 0 ? '+' : ''}{protocol.sentiment.change24h.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500">24h change</div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};