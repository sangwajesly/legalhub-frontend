# LegalHub Frontend

**LegalHub** is a modern web application that democratizes access to legal services through an intuitive ChatGPT-like interface. This repository contains the React-based frontend application that delivers a seamless, conversational user experience for legal assistance, lawyer booking, and case management.

## 🌟 Overview

LegalHub is a comprehensive legal technology web platform featuring a **ChatGPT-style conversational interface** as its core experience. Built with React, the application provides users with an AI-powered legal assistant through a modern chat interface, while also accessing additional features like lawyer booking, article creation, and case reporting - all within a unified, responsive web application.

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

### Frontend Framework
- **React 18+** with TypeScript
  - Component-based architecture
  - Hooks for state and side effects
  - Context API for state management
  - Functional components pattern

### Build Tool
- **Vite**
  - Lightning-fast development server
  - Optimized production builds
  - Hot Module Replacement (HMR)
  - Modern ESM-based bundling

### UI/Design
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Shadcn/ui** - Accessible, customizable component library built on Radix UI
- **Radix UI** - Unstyled, accessible component primitives
- **Framer Motion** - Production-ready animation library
- **Lucide React** - Beautiful, consistent icon library

### Chat Interface Components
- **React Markdown** - Render formatted markdown responses
- **React Syntax Highlighter** - Code block syntax highlighting
- **React Virtual** - Efficient rendering of long chat histories
- **React Textarea Autosize** - Auto-expanding input field

### State Management
- **Zustand** - Lightweight, fast state management
- **TanStack Query (React Query)** - Server state management and caching
- **Context API** - Component-level state sharing

### Data Visualization (Analytics)
- **Recharts** - Composable chart library built on React
- **React Leaflet** - Interactive map components for geographic visualization
- **D3.js** (optional) - Advanced custom visualizations

### Real-time Features
- **Socket.io Client** - WebSocket connections for live updates
- **EventSource / SSE** - Server-Sent Events for AI response streaming

### Forms & Validation
- **React Hook Form** - Performant, flexible forms with minimal re-renders
- **Zod** - TypeScript-first schema validation
- **React Dropzone** - Drag-and-drop file uploads

### Routing
- **React Router v6** - Declarative routing for React
  - Nested routes
  - Protected routes
  - Code splitting per route

### Authentication & API Integration
- **Firebase SDK** - Firebase Authentication integration
- **Axios** - HTTP client for API requests
- **Firebase Storage** - File upload and storage

### Rich Text Editor
- **TipTap** or **Lexical** - Modern rich text editor for article creation

### Date & Time
- **date-fns** - Modern date utility library (lightweight alternative to Moment.js)

### Utilities
- **clsx** / **classnames** - Conditional className utility
- **React Hot Toast** - Lightweight notification system
- **React Use** - Collection of essential React hooks

### Development Tools
- **TypeScript** - Type safety and better DX
- **ESLint** - Code linting with React and TypeScript rules
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit checks
- **lint-staged** - Run linters on staged files

### Testing
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing utilities
- **Testing Library User Event** - User interaction simulation
- **MSW (Mock Service Worker)** - API mocking for tests
- **Playwright** - End-to-end testing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or higher
- npm, yarn, or pnpm package manager
- Firebase project setup
- Backend API running (legalhub-backend)

### Installation

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
cp .env.example .env
# Edit .env with your configuration

# Run development server
npm run dev
# or
yarn dev
# or
pnpm dev

# Application will be available at http://localhost:5173
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview

# Run production build with Node server (if using SSR)
npm run start
```

## 📋 Environment Variables

```env
# API Configuration
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Features
VITE_ENABLE_VOICE=true
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DARK_MODE=true

# Analytics (Optional)
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# Payment (Optional)
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx
```

## 📁 Project Structure

```
legalhub-frontend/
├── public/                 # Static assets
│   ├── images/
│   ├── fonts/
│   └── favicon.ico
├── src/
│   ├── main.tsx           # Application entry point
│   ├── App.tsx            # Root component
│   ├── vite-env.d.ts      # Vite type declarations
│   │
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   ├── chat/         # Chat-specific components
│   │   │   ├── ChatMessage.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── ChatHistory.tsx
│   │   │   └── MessageBubble.tsx
│   │   ├── forms/        # Form components
│   │   ├── layouts/      # Layout components
│   │   │   ├── MainLayout.tsx
│   │   │   ├── ChatLayout.tsx
│   │   │   └── DashboardLayout.tsx
│   │   └── shared/       # Shared components
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       └── Footer.tsx
│   │
│   ├── pages/            # Page components (routes)
│   │   ├── Home.tsx
│   │   ├── Chat.tsx
│   │   ├── Lawyers.tsx
│   │   ├── LawyerProfile.tsx
│   │   ├── Articles.tsx
│   │   ├── ArticleEditor.tsx
│   │   ├── CaseReport.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Analytics.tsx
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   │
│   ├── features/         # Feature-specific logic
│   │   ├── chat/
│   │   │   ├── api/
│   │   │   ├── hooks/
│   │   │   ├── store/
│   │   │   └── utils/
│   │   ├── lawyers/
│   │   ├── articles/
│   │   ├── cases/
│   │   └── analytics/
│   │
│   ├── hooks/            # Custom React hooks
│   │   ├── useChat.ts
│   │   ├── useAuth.ts
│   │   ├── useWebSocket.ts
│   │   ├── useLocalStorage.ts
│   │   └── useDebounce.ts
│   │
│   ├── lib/              # Utility libraries
│   │   ├── api.ts        # API client (Axios setup)
│   │   ├── firebase.ts   # Firebase configuration
│   │   ├── utils.ts      # Helper functions
│   │   └── constants.ts  # App constants
│   │
│   ├── store/            # Zustand stores
│   │   ├── authStore.ts
│   │   ├── chatStore.ts
│   │   ├── themeStore.ts
│   │   └── index.ts
│   │
│   ├── types/            # TypeScript type definitions
│   │   ├── chat.ts
│   │   ├── user.ts
│   │   ├── lawyer.ts
│   │   ├── article.ts
│   │   └── index.ts
│   │
│   ├── styles/           # Global styles
│   │   ├── index.css     # Main stylesheet with Tailwind
│   │   └── themes.css    # Theme variables
│   │
│   ├── routes/           # Route configuration
│   │   ├── index.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── routes.ts
│   │
│   └── config/           # Configuration files
│       └── site.ts
│
├── tests/                # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.example          # Environment variables template
├── .eslintrc.cjs        # ESLint configuration
├── .prettierrc          # Prettier configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
├── postcss.config.js    # PostCSS configuration
└── package.json
```

## 🎨 Design System

### Visual Design
- **Typography**: Inter or SF Pro Display font family
- **Color Palette**: 
  - Primary: Professional blue (#3B82F6)
  - Secondary: Teal accent (#14B8A6)
  - Neutral: Tailwind gray scale
  - Semantic: Success, warning, error, info colors from Tailwind
- **Spacing**: Tailwind's 4px base spacing system
- **Border Radius**: Soft corners (rounded-lg, rounded-xl)
- **Shadows**: Subtle elevation using Tailwind shadow utilities

### Key Component Examples

```tsx
// Button Component (Shadcn/ui)
import { Button } from "@/components/ui/button"

<Button variant="default" size="lg">Send Message</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost" size="icon"><IconName /></Button>

// Chat Message Component
<ChatMessage 
  message={message}
  isUser={message.role === 'user'}
  isStreaming={isStreaming}
/>

// Card Component
<Card>
  <CardHeader>
    <CardTitle>Lawyer Profile</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

## 🌐 Internationalization (i18n)

```typescript
// Using react-i18next
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();

// Supported languages
const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
];

// Change language
i18n.changeLanguage('fr');
```

## 🔒 Security Best Practices

- **Environment Variables**: Never commit `.env` files
- **API Keys**: Use environment variables for sensitive keys
- **Authentication**: Store JWT tokens securely (httpOnly cookies preferred)
- **Input Sanitization**: Validate all user inputs with Zod
- **XSS Prevention**: React automatically escapes JSX content
- **CSRF Protection**: Include CSRF tokens for state-changing requests
- **Content Security Policy**: Configure CSP headers
- **HTTPS Only**: Enforce secure connections in production

## ♿ Accessibility (WCAG 2.1 AA)

```tsx
// Example: Accessible button
<button
  aria-label="Send message"
  aria-disabled={isDisabled}
  onClick={handleClick}
>
  <SendIcon aria-hidden="true" />
  Send
</button>

// Example: Accessible form
<label htmlFor="email">Email Address</label>
<input
  id="email"
  type="email"
  aria-required="true"
  aria-invalid={hasError}
  aria-describedby={hasError ? "email-error" : undefined}
/>
{hasError && <p id="email-error" role="alert">{errorMessage}</p>}
```

## 📊 Performance Optimization

### Code Splitting

```tsx
// Lazy load routes
const Chat = lazy(() => import('./pages/Chat'));
const Analytics = lazy(() => import('./pages/Analytics'));

// Use Suspense
<Suspense fallback={<LoadingSpinner />}>
  <Chat />
</Suspense>
```

### Image Optimization

```tsx
// Use modern image formats and lazy loading
<img 
  src="lawyer.webp" 
  alt="Lawyer profile"
  loading="lazy"
  width={300}
  height={300}
/>
```

### Bundle Analysis

```bash
# Analyze bundle size
npm run build -- --analyze
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run E2E tests
npm run test:e2e

# Run specific test file
npm test -- ChatMessage.test.tsx
```

### Example Test

```tsx
import { render, screen } from '@testing-library/react';
import { ChatMessage } from './ChatMessage';

describe('ChatMessage', () => {
  it('renders user message correctly', () => {
    render(
      <ChatMessage 
        message={{ role: 'user', content: 'Hello!' }}
        isUser={true}
      />
    );
    
    expect(screen.getByText('Hello!')).toBeInTheDocument();
  });
});
```

## 📦 Deployment

### Build and Deploy

```bash
# Build for production
npm run build

# Output will be in /dist directory
```

### Recommended Hosting Platforms

1. **Vercel** (recommended)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

3. **Firebase Hosting**
   ```bash
   firebase init hosting
   firebase deploy
   ```

4. **AWS S3 + CloudFront**
5. **Cloudflare Pages**

### Environment-specific Builds

```bash
# Development
npm run dev

# Staging
npm run build -- --mode staging

# Production
npm run build -- --mode production
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Run linting (`npm run lint`)
6. Format code (`npm run format`)
7. Commit your changes (`git commit -m 'Add amazing feature'`)
8. Push to the branch (`git push origin feature/amazing-feature`)
9. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow React best practices and hooks guidelines
- Use functional components with hooks
- Keep components small and focused (< 200 lines)
- Write meaningful variable and function names
- Add JSDoc comments for complex logic
- Use semantic HTML elements

### Commit Messages
Follow conventional commits:
```
feat: Add lawyer search filters
fix: Resolve chat message streaming issue
docs: Update README with deployment instructions
style: Format code with Prettier
refactor: Simplify chat state management
test: Add tests for ChatMessage component
```

## 🔗 Related Repositories

- [LegalHub Backend](https://github.com/sangwajesly/legalhub-backend) - FastAPI backend with Firebase and Gemini

## 📄 License

[Add your license information]

## 📞 Contact & Support

For questions, suggestions, or support:
- **Email**: [Your contact email]
- **Website**: [Your website]
- **Issues**: [GitHub Issues](https://github.com/sangwajesly/legalhub-frontend/issues)
- **Discussions**: [GitHub Discussions](https://github.com/sangwajesly/legalhub-frontend/discussions)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the blazing-fast build tool
- Shadcn for the beautiful component library
- Tailwind CSS for the utility-first approach
- Firebase for backend services
- Open source community

---

**Mission**: Delivering an intuitive, ChatGPT-like React experience that makes legal knowledge and services accessible to everyone, everywhere.
