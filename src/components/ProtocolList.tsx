import React from 'react';
import { Protocol } from '../types';
import { TrendingUp, TrendingDown, Minus, Users, DollarSign, Activity } from 'lucide-react';

interface ProtocolListProps {
  protocols: Protocol[];
  loading: boolean;
  onProtocolSelect?: (protocol: Protocol) => void;
}

export const ProtocolList: React.FC<ProtocolListProps> = ({
  protocols,
  loading,
  onProtocolSelect,
}) => {
  const getSentimentColor = (overall: string): string => {
    switch (overall) {
      case 'positive':
        return 'text-green-600 bg-green-50';
      case 'negative':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  const getSentimentIcon = (score: number) => {
    if (score > 0) return <TrendingUp className="w-4 h-4" />;
    if (score < 0) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const formatMarketCap = (value: number): string => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    return `$${(value / 1e3).toFixed(1)}K`;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Tracked Protocols</h2>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                </div>
                <div className="w-20 h-8 bg-gray-200 rounded"></div>
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
        <h2 className="text-xl font-semibold text-gray-900">Tracked Protocols</h2>
        <p className="text-sm text-gray-600 mt-1">
          Real-time sentiment and governance tracking
        </p>
      </div>
      
      <div className="divide-y divide-gray-100">
        {protocols.map((protocol) => (
          <div
            key={protocol.id}
            className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => onProtocolSelect?.(protocol)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{protocol.logo}</div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-gray-900">{protocol.name}</h3>
                    <span className="text-sm text-gray-500">({protocol.symbol})</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <DollarSign className="w-3 h-3" />
                      <span>{formatMarketCap(protocol.marketCap)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{protocol.governance.activeProposals} proposals</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Activity className="w-3 h-3" />
                      <span>{protocol.governance.votingParticipation.toFixed(1)}% participation</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(protocol.sentiment.overall)}`}>
                  {getSentimentIcon(protocol.sentiment.score)}
                  <span>{protocol.sentiment.score}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {protocol.sentiment.change24h > 0 ? '+' : ''}{protocol.sentiment.change24h.toFixed(1)}% 24h
                </div>
              </div>
            </div>
            
            <div className="mt-3 flex space-x-4 text-xs">
              <div className="flex-1">
                <div className="flex justify-between text-gray-600 mb-1">
                  <span>Sentiment Distribution</span>
                </div>
                <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="bg-green-500 h-full" 
                    style={{ width: `${protocol.sentiment.positive}%` }}
                  ></div>
                  <div 
                    className="bg-yellow-500 h-full" 
                    style={{ width: `${protocol.sentiment.neutral}%` }}
                  ></div>
                  <div 
                    className="bg-red-500 h-full" 
                    style={{ width: `${protocol.sentiment.negative}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};