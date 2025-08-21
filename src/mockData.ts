import { Protocol, DAOProposal, Alert } from './types';

export const mockProtocols: Protocol[] = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    logo: '🔷',
    marketCap: 240000000000,
    sentiment: {
      positive: 65,
      neutral: 25,
      negative: 10,
      overall: 'positive',
      score: 72,
      change24h: 5.2
    },
    governance: {
      activeProposals: 8,
      votingParticipation: 45.2,
      treasuryValue: 12000000000
    }
  },
  {
    id: 'uniswap',
    name: 'Uniswap',
    symbol: 'UNI',
    logo: '🦄',
    marketCap: 8500000000,
    sentiment: {
      positive: 58,
      neutral: 30,
      negative: 12,
      overall: 'positive',
      score: 61,
      change24h: -2.1
    },
    governance: {
      activeProposals: 3,
      votingParticipation: 38.7,
      treasuryValue: 2800000000
    }
  },
  {
    id: 'aave',
    name: 'Aave',
    symbol: 'AAVE',
    logo: '👻',
    marketCap: 2100000000,
    sentiment: {
      positive: 52,
      neutral: 35,
      negative: 13,
      overall: 'positive',
      score: 48,
      change24h: 8.7
    },
    governance: {
      activeProposals: 5,
      votingParticipation: 52.1,
      treasuryValue: 450000000
    }
  },
  {
    id: 'compound',
    name: 'Compound',
    symbol: 'COMP',
    logo: '🏦',
    marketCap: 380000000,
    sentiment: {
      positive: 45,
      neutral: 40,
      negative: 15,
      overall: 'neutral',
      score: 32,
      change24h: -3.4
    },
    governance: {
      activeProposals: 2,
      votingParticipation: 41.3,
      treasuryValue: 180000000
    }
  },
  {
    id: 'makerdao',
    name: 'MakerDAO',
    symbol: 'MKR',
    logo: '⚡',
    marketCap: 1200000000,
    sentiment: {
      positive: 40,
      neutral: 35,
      negative: 25,
      overall: 'negative',
      score: -8,
      change24h: -12.3
    },
    governance: {
      activeProposals: 7,
      votingParticipation: 48.9,
      treasuryValue: 890000000
    }
  }
];

export const mockProposals: DAOProposal[] = [
  {
    id: 'prop-1',
    protocolId: 'ethereum',
    protocolName: 'Ethereum',
    title: 'EIP-4844: Shard Blob Transactions',
    description: 'Implement proto-danksharding to reduce L2 transaction costs',
    status: 'active',
    votesFor: 89.2,
    votesAgainst: 10.8,
    endDate: '2025-01-15',
    category: 'protocol',
    sentimentImpact: 'high'
  },
  {
    id: 'prop-2',
    protocolId: 'uniswap',
    protocolName: 'Uniswap',
    title: 'Deploy Uniswap v4 on Base',
    description: 'Proposal to deploy Uniswap v4 on Base network',
    status: 'active',
    votesFor: 76.5,
    votesAgainst: 23.5,
    endDate: '2025-01-12',
    category: 'protocol',
    sentimentImpact: 'medium'
  },
  {
    id: 'prop-3',
    protocolId: 'aave',
    protocolName: 'Aave',
    title: 'Add EIGEN as Collateral Asset',
    description: 'Add EigenLayer token as collateral on Aave v3',
    status: 'pending',
    votesFor: 0,
    votesAgainst: 0,
    endDate: '2025-01-20',
    category: 'treasury',
    sentimentImpact: 'medium'
  },
  {
    id: 'prop-4',
    protocolId: 'makerdao',
    protocolName: 'MakerDAO',
    title: 'Increase DAI Savings Rate',
    description: 'Proposal to increase DSR from 5% to 8%',
    status: 'active',
    votesFor: 45.2,
    votesAgainst: 54.8,
    endDate: '2025-01-10',
    category: 'treasury',
    sentimentImpact: 'high'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    protocolId: 'makerdao',
    protocolName: 'MakerDAO',
    type: 'sentiment',
    severity: 'critical',
    title: 'Significant Negative Sentiment Spike',
    description: 'MakerDAO sentiment dropped 15% in last 4 hours due to governance controversy',
    timestamp: '2025-01-08T14:30:00Z',
    isRead: false
  },
  {
    id: 'alert-2',
    protocolId: 'ethereum',
    protocolName: 'Ethereum',
    type: 'governance',
    severity: 'high',
    title: 'New Critical Proposal Active',
    description: 'EIP-4844 proposal is now active with high community engagement',
    timestamp: '2025-01-08T12:15:00Z',
    isRead: false
  },
  {
    id: 'alert-3',
    protocolId: 'aave',
    protocolName: 'Aave',
    type: 'social',
    severity: 'medium',
    title: 'Social Volume Surge',
    description: 'AAVE mentions increased 340% following partnership announcement',
    timestamp: '2025-01-08T10:45:00Z',
    isRead: true
  }
];