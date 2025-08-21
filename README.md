# Social Sentiment & Governance Tracker

A comprehensive React dashboard for tracking crypto protocol sentiment and DAO governance activity, designed for integration with the Sentient Chat ecosystem.

![Dashboard Preview](https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=600)

## 🚀 Features

### Core Functionality
- **Real-time Protocol Tracking** - Monitor sentiment scores across major DeFi protocols
- **DAO Governance Dashboard** - Track active proposals, voting participation, and outcomes  
- **Smart Alerts System** - Get notified of significant sentiment shifts and governance events
- **AI-Powered Query Interface** - Ask natural language questions about protocols and governance
- **Streaming Response Support** - Real-time updates during query processing

### Supported Protocols
- Ethereum (ETH)
- Uniswap (UNI)  
- Aave (AAVE)
- Compound (COMP)
- MakerDAO (MKR)
- *Easily extensible for additional protocols*

### Data Sources Integration
- **@KaitoAI** - Social sentiment analysis
- **@nansen_ai** - On-chain analytics  
- **@arkham** - Governance tracking
- **@MessariCrypto** - Market data

## 🛠️ Technical Architecture

### Frontend Stack
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling

### API Integration
The dashboard is designed to work with multiple backend options:

1. **Sentient Agent API** (Recommended)
   - Supports streaming responses
   - Context-sharing between agents
   - Real-time intermediate events

2. **OpenAI Chat Completions API**
   - Flexible chat interface
   - Custom prompt engineering
   - Limited context-sharing

3. **OpenAI Completions API** (Legacy)
   - Simple completion format
   - Manual chat history management

### Component Architecture
```
src/
├── components/
│   ├── Dashboard.tsx          # Main dashboard layout
│   ├── ProtocolList.tsx       # Protocol sentiment tracking
│   ├── SentimentVisualization.tsx  # Charts and metrics
│   ├── DAOProposals.tsx       # Governance proposals
│   ├── AlertsPanel.tsx        # Real-time alerts
│   └── QueryInterface.tsx     # AI query interface
├── types.ts                   # TypeScript definitions
├── mockData.ts               # Demo data
└── api.ts                    # API integration layer
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd sentiment-governance-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables
Create a `.env` file in the root directory:

```env
# Sentient Agent API (Recommended)
REACT_APP_SENTIENT_API_KEY=your-sentient-api-key
REACT_APP_SENTIENT_ENDPOINT=https://api.sentient.chat/v1/agents/sentiment-governance

# OpenAI API (Alternative)
REACT_APP_OPENAI_API_KEY=your-openai-api-key

# Development
REACT_APP_ENVIRONMENT=development
```

## 🔧 API Integration

### Setting Up Backend APIs

#### Option 1: Sentient Agent API (Recommended)
```typescript
// Update src/api.ts with your Sentient Agent endpoint
const SENTIENT_CONFIG = {
  apiKey: process.env.REACT_APP_SENTIENT_API_KEY,
  endpoint: 'https://api.sentient.chat/v1/agents/sentiment-governance',
  streamingEnabled: true,
};
```

#### Option 2: OpenAI Integration
```typescript
// Configure OpenAI as fallback
const OPENAI_CONFIG = {
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  model: 'gpt-4',
  endpoint: 'https://api.openai.com/v1/chat/completions',
};
```

### API Endpoints to Implement

Replace the mock functions in `src/api.ts` with actual API calls:

```typescript
// Protocol sentiment data
GET /api/protocols -> Protocol[]

// DAO proposals
GET /api/proposals -> DAOProposal[]

// Alert notifications  
GET /api/alerts -> Alert[]

// Natural language queries
POST /api/query -> QueryResult
```

## 📱 Usage Guide

### Main Dashboard
- **Protocol Overview** - View real-time sentiment scores and trends
- **Governance Activity** - Track active DAO proposals and voting
- **Alerts Panel** - Monitor critical events and sentiment shifts
- **Query Interface** - Ask natural language questions about protocols

### Query Examples
- "What is the sentiment for Ethereum this week?"
- "Show me recent governance activity for Aave"
- "Which protocols have the most positive sentiment?"
- "Analyze Uniswap's social volume trends"

### Alert Management
- **Filter alerts** by severity (critical, high, medium, low)
- **Mark as read** to track which alerts you've seen
- **Dismiss alerts** to remove them from the panel

## 🚀 Deployment

### GitHub Pages
```bash
# Build for production
npm run build

# Deploy to GitHub Pages
# (Configure GitHub Actions for automatic deployment)
```

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Setup
Ensure these environment variables are set in production:
- `REACT_APP_SENTIENT_API_KEY`
- `REACT_APP_OPENAI_API_KEY` (if using OpenAI)

## 🔮 Future Enhancements

### Planned Features
- **Multi-chain support** (Polygon, Arbitrum, BSC)
- **Advanced charting** with historical sentiment data
- **Push notifications** for critical alerts
- **CSV/JSON export** functionality
- **Dark mode** theme support
- **Mobile app** companion

### Integration Opportunities
- **Telegram bot** for alert notifications
- **Discord integration** for community tracking
- **Slack app** for team notifications
- **API webhooks** for external systems

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Standards
- TypeScript strict mode
- ESLint + Prettier formatting
- Component-based architecture
- Responsive design principles

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.



Built with ❤️ for the Sentient Chat ecosystem. Ready to track sentiment and governance across the DeFi landscape!
# PulseDAO
