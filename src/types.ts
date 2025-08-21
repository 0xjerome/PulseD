export interface Protocol {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  marketCap: number;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
    overall: 'positive' | 'neutral' | 'negative';
    score: number; // -100 to 100
    change24h: number;
  };
  governance: {
    activeProposals: number;
    votingParticipation: number;
    treasuryValue: number;
  };
}

export interface DAOProposal {
  id: string;
  protocolId: string;
  protocolName: string;
  title: string;
  description: string;
  status: 'active' | 'pending' | 'executed' | 'defeated';
  votesFor: number;
  votesAgainst: number;
  endDate: string;
  category: 'treasury' | 'protocol' | 'governance' | 'partnership';
  sentimentImpact: 'high' | 'medium' | 'low';
}

export interface Alert {
  id: string;
  protocolId: string;
  protocolName: string;
  type: 'sentiment' | 'governance' | 'volume' | 'social';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
}

export interface QueryResult {
  protocol: string;
  sentiment: {
    currentScore: number;
    trend: string;
    keyTopics: string[];
    socialVolume: number;
  };
  governance: {
    recentProposals: DAOProposal[];
    participationTrend: string;
    upcomingEvents: string[];
  };
  insights: string[];
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}