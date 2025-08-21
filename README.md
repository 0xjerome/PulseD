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


## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.



Built with ❤️ for the Sentient Chat ecosystem. Ready to track sentiment and governance across the DeFi landscape!
# PulseDAO
