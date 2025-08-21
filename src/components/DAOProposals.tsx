import React from 'react';
import { DAOProposal } from '../types';
import { Clock, Users, TrendingUp, AlertCircle, CheckCircle, XCircle, Calendar } from 'lucide-react';

interface DAOProposalsProps {
  proposals: DAOProposal[];
  loading: boolean;
  onProposalSelect?: (proposal: DAOProposal) => void;
}

export const DAOProposals: React.FC<DAOProposalsProps> = ({
  proposals,
  loading,
  onProposalSelect,
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'executed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'defeated':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'executed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'defeated':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'treasury':
        return 'bg-purple-100 text-purple-800';
      case 'protocol':
        return 'bg-blue-100 text-blue-800';
      case 'governance':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSentimentImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      default:
        return 'text-green-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getVotingProgress = (votesFor: number, votesAgainst: number) => {
    const total = votesFor + votesAgainst;
    if (total === 0) return { forWidth: 50, againstWidth: 50 };
    
    return {
      forWidth: (votesFor / total) * 100,
      againstWidth: (votesAgainst / total) * 100,
    };
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Trending DAO Proposals</h2>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
        </div>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="p-4 border border-gray-100 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="w-20 h-6 bg-gray-200 rounded"></div>
                </div>
                <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
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
        <h2 className="text-xl font-semibold text-gray-900">Trending DAO Proposals</h2>
        <p className="text-sm text-gray-600 mt-1">
          Active and trending governance proposals across protocols
        </p>
      </div>
      
      <div className="divide-y divide-gray-100">
        {proposals.map((proposal) => {
          const votingProgress = getVotingProgress(proposal.votesFor, proposal.votesAgainst);
          
          return (
            <div
              key={proposal.id}
              className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onProposalSelect?.(proposal)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium text-gray-900 line-clamp-2">
                      {proposal.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {proposal.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center space-x-1 text-gray-600">
                      <span className="text-lg">{protocols.find(p => p.id === proposal.protocolId)?.logo || '🏛️'}</span>
                      <span>{proposal.protocolName}</span>
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(proposal.category)}`}>
                      {proposal.category}
                    </span>
                  </div>
                </div>
                
                <div className="text-right flex flex-col items-end">
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md border text-xs font-medium ${getStatusColor(proposal.status)}`}>
                    {getStatusIcon(proposal.status)}
                    <span className="capitalize">{proposal.status}</span>
                  </div>
                  <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(proposal.endDate)}</span>
                  </div>
                </div>
              </div>

              {(proposal.status === 'active' || proposal.status === 'defeated') && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Voting Progress</span>
                    <div className="flex items-center space-x-4">
                      <span className={`font-medium ${getSentimentImpactColor(proposal.sentimentImpact)}`}>
                        {proposal.sentimentImpact.toUpperCase()} Impact
                      </span>
                    </div>
                  </div>
                  <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div 
                      className="bg-green-500 h-full transition-all duration-300" 
                      style={{ width: `${votingProgress.forWidth}%` }}
                    ></div>
                    <div 
                      className="bg-red-500 h-full transition-all duration-300" 
                      style={{ width: `${votingProgress.againstWidth}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span className="flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span>For: {proposal.votesFor.toFixed(1)}%</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <XCircle className="w-3 h-3 text-red-500" />
                      <span>Against: {proposal.votesAgainst.toFixed(1)}%</span>
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>Community Voting</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Sentiment Impact: {proposal.sentimentImpact}</span>
                  </span>
                </div>
                <span>ID: {proposal.id}</span>
              </div>
            </div>
          );
        })}
      </div>

      {proposals.length === 0 && !loading && (
        <div className="p-8 text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Proposals</h3>
          <p className="text-gray-600">
            There are currently no trending DAO proposals to display.
          </p>
        </div>
      )}
    </div>
  );
};

// Mock data for protocols (used for logo lookup)
const protocols = [
  { id: 'ethereum', logo: '🔷' },
  { id: 'uniswap', logo: '🦄' },
  { id: 'aave', logo: '👻' },
  { id: 'compound', logo: '🏦' },
  { id: 'makerdao', logo: '⚡' },
];