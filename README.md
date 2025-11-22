# LegalHub Frontend

**LegalHub** is a modern web application that democratizes access to legal services through an intuitive ChatGPT-like interface. This repository contains the frontend application that delivers a seamless, conversational user experience for legal assistance, lawyer booking, and case management.

## 🌟 Overview

LegalHub is a comprehensive legal technology web platform featuring a **ChatGPT-style conversational interface** as its core experience. Users interact with an AI-powered legal assistant through a modern chat interface, while also accessing additional features like lawyer booking, article creation, and case reporting - all within a unified, responsive web application.

## 💬 ChatGPT-Like Interface

The centerpiece of LegalHub is its **conversational AI interface** that mirrors the user experience of ChatGPT:

### Chat Interface Features
- **Modern Chat UI**: Clean, intuitive chat interface similar to ChatGPT with message bubbles, smooth animations, and real-time responses
- **Streaming Responses**: Token-by-token response streaming for a natural conversation flow
- **Conversation History**: Sidebar with saved chat sessions that users can revisit anytime
- **Message Actions**: Copy, share, regenerate responses, and provide feedback on answers
- **Rich Formatting**: Markdown support with code syntax highlighting, tables, lists, and formatted text
- **Follow-up Questions**: Context-aware suggested follow-ups based on conversation
- **Conversation Management**: 
  - Create new chat sessions
  - Rename conversations
  - Delete chat history
  - Search through past conversations
  - Pin important conversations
- **Multi-turn Conversations**: Maintain context across multiple exchanges for natural dialogue
- **Typing Indicators**: Real-time typing animations when AI is generating responses
- **Error Handling**: Graceful error messages with retry options

### Chat Experience Design
- **Split-screen Layout**: Chat interface on the left, additional features accessible via sidebar/menu
- **Distraction-free Mode**: Full-screen chat option for focused conversations
- **Mobile-optimized**: Touch-friendly interface with swipe gestures
- **Dark/Light Themes**: Theme toggle for comfortable viewing in any lighting
- **Accessibility**: Keyboard shortcuts, screen reader support, and WCAG compliance

## 🎯 Core Features & Pages

### 1. **AI Legal Assistant (Main Chat Interface)**
- **Home/Landing Page**: Welcome screen with sample prompts and feature highlights
- **Chat Interface**: Primary interaction point - ChatGPT-like conversational UI
- **Plain Language Mode**: Automatic simplification of legal jargon
- **Language Selection**: Multi-language support with language switcher in chat
- **Voice Input/Output**: Speak questions and hear responses (optional)
- **Document Analysis**: Upload legal documents for AI analysis and explanation
- **Citation & Sources**: Linked references to laws and legal precedents
- **Export Conversations**: Download chat history as PDF or text

### 2. **Lawyer Discovery & Booking**
- **Lawyer Directory**: Browse and search verified legal professionals
- **Advanced Filters**: Filter by specialization, location, experience, rating, and availability
- **Lawyer Profiles**: Comprehensive profiles with credentials, reviews, and success rates
- **Consultation Booking**: 
  - Interactive calendar view
  - Time slot selection
  - Video or in-person consultation options
  - Instant or scheduled bookings
- **Booking Dashboard**: Manage upcoming and past consultations
- **Integrated Messaging**: Communicate with lawyers through the platform
- **Payment Integration**: Secure payment processing for consultations

### 3. **Legal Knowledge Hub**
- **Article Feed**: Browse legal articles, guides, and insights
- **Read & Write**: 
  - Citizens can share experiences and tips
  - Lawyers can publish professional articles and legal updates
- **Rich Text Editor**: Format articles with images, videos, and embedded content
- **Categories & Topics**: Browse by legal domains (family law, criminal law, business law, etc.)
- **Search & Discovery**: Full-text search with filters
- **Engagement**: Like, comment, bookmark, and share articles
- **Author Profiles**: Follow favorite lawyers and contributors
- **Recommended Reading**: Personalized article suggestions

### 4. **Anonymous Case Reporting**
- **Flexible Reporting Options**:
  - **Anonymous Mode**: Report sensitive cases without revealing identity
  - **Identified Mode**: Report with full credentials for legal action
- **Guided Reporting Form**: Step-by-step wizard for case submission
- **Evidence Upload**: Attach documents, images, and supporting files
- **Case Categorization**: Select case type, severity, and jurisdiction
- **Location Services**: Manual or GPS-based location input
- **Case Tracking Dashboard**: Monitor case status and updates
- **Secure Communication**: Encrypted messaging about case details
- **Privacy Controls**: Granular control over data sharing and visibility

### 5. **Analytics Dashboard (NGO/Government)**
- **Data Visualization**: Interactive charts, graphs, and heat maps
- **Case Overview**:
  - Cases by category, location, and timeline
  - Demographic analysis
  - Severity distribution
  - Resolution rates and timelines
- **Geographic Insights**: Map-based visualization of case concentration
- **Trend Analysis**: Identify emerging legal issues and patterns
- **Community Profiles**: Analyze legal challenges by demographics
- **Campaign Planning**: Data-driven insights for sensitization campaigns
- **Custom Reports**: Generate and export detailed reports
- **Real-time Monitoring**: Live data updates and alerts
- **Comparative Analysis**: Compare metrics across regions and time periods
- **Impact Measurement**: Track outcomes of interventions and programs

## 👥 User Roles & Dashboards

### Citizens/Users
- **Chat Interface**: Primary interaction through conversational AI
- **Personal Dashboard**: View bookings, saved articles, and reported cases
- **Lawyer Search**: Find and book legal professionals
- **Article Hub**: Read, write, and engage with content
- **Case Reporter**: Submit and track cases
- **Profile Management**: Update preferences and settings
- **Notification Center**: Alerts for bookings, case updates, and responses

### Lawyers
- **Professional Dashboard**: Overview of bookings, earnings, and analytics
- **Booking Management**: Accept, decline, and schedule consultations
- **Calendar Integration**: Manage availability and appointments
- **Client Portal**: Communicate with clients securely
- **Article Publishing**: Create and manage legal content
- **Profile Customization**: Showcase expertise and credentials
- **Performance Analytics**: Track profile views, bookings, and ratings
- **Revenue Dashboard**: Financial overview and payment history

### NGOs/Government Organizations
- **Analytics Dashboard**: Comprehensive data visualization and reporting
- **Case Management**: View and manage reported cases (with privacy protections)
- **Report Generator**: Create custom reports with various metrics
- **Campaign Planner**: Plan interventions based on data insights
- **Team Collaboration**: Multi-user access with role-based permissions
- **Data Export**: Download datasets for further analysis
- **Alert System**: Get notified about critical cases or trends

## 🛠️ Technology Stack

_[Recommended stack for ChatGPT-like experience]_

### Frontend Framework
- **React** (v18+) with TypeScript - Component-based architecture
- **Next.js 14+** - Server-side rendering, API routes, and optimization
- OR **Vite + React** - Fast development with optimal build performance

### UI/Design
- **Tailwind CSS** - Utility-first styling for rapid development
- **Shadcn/ui** or **Headless UI** - Accessible component primitives
- **Framer Motion** - Smooth animations and transitions
- **Lucide Icons** - Modern, consistent icon library

### Chat Interface
- **React Markdown** - Render formatted text responses
- **React Syntax Highlighter** - Code block syntax highlighting
- **React Virtual** - Efficient rendering of long chat histories
- **Stream API** - Real-time response streaming

### State Management
- **Zustand** or **Redux Toolkit** - Global state management
- **React Query (TanStack Query)** - Server state and caching
- **Context API** - Local component state

### Data Visualization (Analytics)
- **Recharts** or **Apache ECharts** - Interactive charts and graphs
- **React Map GL** or **Leaflet** - Geographic visualizations
- **D3.js** - Custom data visualizations

### Real-time Features
- **Socket.io Client** - WebSocket connections for live updates
- **Server-Sent Events (SSE)** - Streaming responses from API

### Forms & Validation
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation

### File Handling
- **React Dropzone** - Drag-and-drop file uploads
- **PDF.js** - PDF rendering and viewing

### Authentication
- **NextAuth.js** or **Clerk** - Secure authentication flows
- **JWT** - Token-based authentication

### Testing
- **Vitest** - Unit and integration testing
- **React Testing Library** - Component testing
- **Playwright** or **Cypress** - E2E testing

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks for code quality
- **TypeScript** - Type safety

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/sangwajesly/legalhub-frontend.git

# Navigate to project directory
cd legalhub-frontend

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev
# or
yarn dev
# or
pnpm dev

# Application will be available at http://localhost:3000

# Build for production
npm run build

# Start production server
npm run start
```

## 📁 Project Structure

```
legalhub-frontend/
├── public/                 # Static assets
│   ├── images/
│   ├── fonts/
│   └── icons/
├── src/
│   ├── app/               # Next.js app directory (if using Next.js)
│   │   ├── (auth)/        # Authentication pages
│   │   ├── (dashboard)/   # Dashboard pages
│   │   ├── chat/          # Main chat interface
│   │   ├── lawyers/       # Lawyer directory & profiles
│   │   ├── articles/      # Article pages
│   │   ├── cases/         # Case reporting
│   │   └── analytics/     # Analytics dashboard
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Base UI components
│   │   ├── chat/         # Chat-specific components
│   │   ├── forms/        # Form components
│   │   ├── layouts/      # Layout components
│   │   └── shared/       # Shared components
│   ├── features/         # Feature-specific modules
│   │   ├── chat/         # Chat feature logic
│   │   ├── lawyers/      # Lawyer feature logic
│   │   ├── articles/     # Articles feature logic
│   │   ├── cases/        # Case reporting logic
│   │   └── analytics/    # Analytics logic
│   ├── hooks/            # Custom React hooks
│   │   ├── useChat.ts
│   │   ├── useAuth.ts
│   │   └── useWebSocket.ts
│   ├── lib/              # Utility libraries
│   │   ├── api/          # API client setup
│   │   ├── utils/        # Helper functions
│   │   └── constants/    # App constants
│   ├── store/            # State management
│   │   ├── slices/       # Redux slices or Zustand stores
│   │   └── index.ts
│   ├── types/            # TypeScript type definitions
│   ├── styles/           # Global styles
│   │   ├── globals.css
│   │   └── themes/
│   └── config/           # Configuration files
├── tests/                # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example          # Environment variables template
├── .eslintrc.js         # ESLint configuration
├── .prettierrc          # Prettier configuration
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json
```

## 🎨 Design System

### Visual Design
- **Typography**: Clean, readable font hierarchy (Inter, SF Pro, or similar)
- **Color Palette**: 
  - Primary: Professional blue/teal
  - Secondary: Accent colors for CTAs
  - Neutral: Grayscale for text and backgrounds
  - Semantic: Success, warning, error, info colors
- **Spacing**: Consistent 8px grid system
- **Border Radius**: Soft corners for modern feel
- **Shadows**: Subtle elevation for depth

### Component Library
- Buttons (primary, secondary, ghost, icon)
- Input fields and text areas
- Select dropdowns and multi-select
- Modal dialogs and drawers
- Toast notifications
- Loading states and skeletons
- Cards and panels
- Tabs and accordions
- Tables and data grids
- Progress indicators

### Chat-Specific Design
- Message bubbles (user vs AI)
- Code blocks with copy button
- Markdown rendering
- File attachments display
- Reaction emojis
- Timestamp formatting
- Read receipts

## 🌐 Internationalization (i18n)

```javascript
// Supported languages
const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  // Add more languages as needed
];
```

- Multi-language chat interface
- Translated UI elements
- Language-specific legal content
- RTL language support
- Auto-detect user language
- Easy language switching

## 🔒 Security & Privacy

- **Authentication**: Secure login with JWT/session tokens
- **Authorization**: Role-based access control (RBAC)
- **Data Encryption**: End-to-end encryption for sensitive data
- **Input Sanitization**: XSS and injection protection
- **HTTPS Only**: Secure communication
- **CSRF Protection**: Token-based CSRF prevention
- **Rate Limiting**: Prevent abuse and DoS attacks
- **Anonymous Mode**: No tracking for anonymous case reports
- **Privacy Controls**: Granular user data permissions
- **Audit Logs**: Track sensitive operations

## ♿ Accessibility (WCAG 2.1 AA)

- Keyboard navigation throughout
- Screen reader compatibility
- Focus management and visual indicators
- ARIA labels and landmarks
- Color contrast compliance
- Alternative text for images
- Accessible forms with proper labels
- Skip navigation links
- Resize text without breaking layout
- No flashing content

## 📊 Performance Optimization

- **Code Splitting**: Load only necessary code
- **Lazy Loading**: Components and routes on demand
- **Image Optimization**: Next.js Image or responsive images
- **Bundle Analysis**: Keep bundle sizes minimal
- **Caching Strategy**: Browser and API caching
- **CDN**: Serve static assets from CDN
- **Lighthouse Score**: Target 90+ across all metrics
- **Core Web Vitals**: Optimize LCP, FID, CLS

## 🧪 Testing Strategy

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

- Unit tests for utilities and hooks
- Component tests with React Testing Library
- Integration tests for features
- E2E tests for critical user flows
- Accessibility testing with axe
- Visual regression testing

## 📦 Deployment

### Recommended Platforms
- **Vercel** (optimal for Next.js)
- **Netlify**
- **AWS Amplify**
- **Cloudflare Pages**
- **Docker + Custom VPS**

### Environment Variables
```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.legalhub.com
NEXT_PUBLIC_WS_URL=wss://api.legalhub.com

# Authentication
NEXT_PUBLIC_AUTH_DOMAIN=auth.legalhub.com
AUTH_SECRET=your-secret-key

# Analytics
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id

# Feature Flags
NEXT_PUBLIC_ENABLE_VOICE=true
NEXT_PUBLIC_ENABLE_DARK_MODE=true
```

### CI/CD Pipeline
- Automated testing on pull requests
- Preview deployments for branches
- Production deployment on merge to main
- Automated rollback capabilities

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Standards
- Write TypeScript with proper typing
- Follow ESLint and Prettier rules
- Write tests for new features
- Update documentation
- Keep components small and focused
- Use semantic commit messages

## 🔗 Related Repositories

- [LegalHub Backend](https://github.com/sangwajesly/legalhub-backend) - API and server-side logic

## 📄 License

_[Add your license information]_

## 📞 Contact & Support

For questions, suggestions, or support:
- **Email**: [Your contact email]
- **Website**: [Your website]
- **Issues**: [GitHub Issues](https://github.com/sangwajesly/legalhub-frontend/issues)
- **Discussions**: [GitHub Discussions](https://github.com/sangwajesly/legalhub-frontend/discussions)

## 🙏 Acknowledgments

- Anthropic Claude for AI capabilities
- OpenAI for ChatGPT inspiration
- React and Next.js communities
- Open source contributors

---

**Mission**: Delivering an intuitive, ChatGPT-like experience that makes legal knowledge and services accessible to everyone, everywhere.
