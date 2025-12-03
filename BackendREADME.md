# LegalHub Backend

**LegalHub** is an innovative web-based legal assistance platform designed to bridge the gap between citizens and legal services through technology. By simplifying legal jargon and providing accessible legal resources, LegalHub empowers users to understand their rights, connect with legal professionals, and report cases with ease.

## 🌟 Overview

LegalHub is a comprehensive web application that democratizes access to legal information and services. The platform features a ChatGPT-style conversational interface powered by Google Gemini AI to make legal knowledge accessible to everyone, regardless of their legal background.

## 🎯 Key Features

### 1. **ChatGPT-Style Legal Chatbot**

- **Conversational AI Interface**: Full-featured chat experience similar to ChatGPT, designed specifically for legal queries
- **Natural Language Processing**: Understands and responds to legal questions in plain, everyday language
- **Multilingual Support**: Processes queries and generates responses in multiple languages
- **Context-Aware Conversations**: Maintains conversation history and context across multiple exchanges using LangChain
- **Legal Jargon Translation**: Automatically converts complex legal terminology into simple, understandable language
- **Follow-up Questions**: Handles multi-turn conversations with contextual understanding
- **Citation & Sources**: Provides references to relevant laws, statutes, and legal precedents when applicable
- **Conversation History**: Saves and retrieves past conversations for users
- **Streaming Responses**: Real-time response generation for better user experience
- **24/7 Availability**: Always-on AI assistant for immediate legal guidance

**API Endpoints for Chat:**

- `POST /api/chat/message` - Send message and receive AI response
- `GET /api/chat/history` - Retrieve conversation history
- `POST /api/chat/session` - Create new chat session
- `DELETE /api/chat/session/{id}` - Clear chat session
- `POST /api/chat/feedback` - Submit feedback on AI responses

### 2. **Lawyer Booking System**

- **Lawyer Directory API**: Search and filter lawyers by specialization, location, rating, and availability
- **Profile Management**: Comprehensive lawyer profile endpoints with credentials and reviews
- **Booking Management**: Handle consultation scheduling and calendar integration
- **Availability System**: Real-time availability checking and slot booking
- **Notification Service**: Automated booking confirmations and reminders via Firebase Cloud Messaging
- **Payment Processing**: Secure payment gateway integration
- **Rating & Review System**: Collect and manage client feedback

**API Endpoints:**

- `GET /api/lawyers` - List lawyers with filters
- `GET /api/lawyers/{id}` - Get lawyer profile
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/user/{userId}` - Get user bookings
- `PUT /api/bookings/{id}` - Update/reschedule booking
- `POST /api/reviews` - Submit lawyer review

### 3. **Legal Articles & Knowledge Base**

- **Content Management**: CRUD operations for legal articles
- **Rich Media Support**: Handle text, images, and embedded content
- **Search & Indexing**: Full-text search across articles
- **Categorization**: Tag and categorize articles by legal topics
- **User Engagement**: Like, comment, and bookmark functionality
- **Author Management**: User and lawyer contribution systems
- **Trending Algorithm**: Calculate and surface popular content

**API Endpoints:**

- `GET /api/articles` - List articles with pagination and filters
- `GET /api/articles/{id}` - Get article details
- `POST /api/articles` - Create new article
- `PUT /api/articles/{id}` - Update article
- `POST /api/articles/{id}/like` - Like/unlike article
- `POST /api/articles/{id}/comments` - Add comment

### 4. **Anonymous & Identified Case Reporting**

- **Flexible Reporting System**:
  - Support for anonymous case submissions
  - Identified reporting with user authentication
- **Case Management**: Track case status and updates
- **File Upload Service**: Handle evidence and document uploads (images, PDFs, documents) via Firebase Storage
- **Encryption**: End-to-end encryption for sensitive case data
- **Geolocation Services**: Location tagging for cases
- **Status Tracking**: Real-time case progress updates
- **Notification System**: Alert users of case status changes

**API Endpoints:**

- `POST /api/cases` - Submit new case (anonymous or identified)
- `GET /api/cases/{id}` - Get case details
- `GET /api/cases/user/{userId}` - Get user's cases
- `PUT /api/cases/{id}/status` - Update case status
- `POST /api/cases/{id}/attachments` - Upload case evidence

### 5. **Analytics Dashboard (NGO/Government Organizations)**

- **Data Aggregation**: Collect and process case data across regions
- **Statistical Analysis**: Generate insights from reported cases
- **Geographic Analytics**: Location-based case distribution
- **Trend Detection**: Identify patterns and emerging legal issues
- **Custom Reports**: Generate customizable analytical reports
- **Data Export**: Export data in multiple formats (PDF, Excel, CSV, JSON)
- **Real-time Updates**: Live data streaming
- **Access Control**: Role-based permissions for organizations

**API Endpoints:**

- `GET /api/analytics/overview` - Get summary statistics
- `GET /api/analytics/cases` - Get case analytics with filters
- `GET /api/analytics/trends` - Get trend analysis
- `GET /api/analytics/geographic` - Get location-based data
- `POST /api/analytics/reports` - Generate custom reports
- `GET /api/analytics/export` - Export analytical data

### 6. **Authentication & User Management**

- **Firebase Authentication**: Multi-provider authentication (Email/Password, Google, Facebook)
- **JWT Token Management**: Secure token-based authentication
- **Email Verification**: Account verification system
- **Password Management**: Reset and recovery functionality
- **Session Management**: Handle multiple device sessions
- **Profile Management**: User profile CRUD operations

**API Endpoints:**

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 👥 User Roles & Permissions

### Citizens/Users

- Access to ChatGPT-style legal chatbot
- Book consultations with lawyers
- Read and write legal articles
- Report cases (anonymously or with identity)
- Track their cases and consultations
- Manage profile and preferences

### Lawyers

- Professional profile management
- Accept/decline consultation requests
- Write and publish legal articles
- View client bookings and schedules
- Access analytics on their profile
- Respond to user inquiries

### NGOs/Government Organizations

- Access comprehensive analytics dashboard
- View aggregated case data (with privacy protections)
- Monitor legal trends and patterns
- Generate reports for policy making
- Plan intervention strategies
- Export data for external analysis

## 🛠️ Technical Stack

### Backend Framework

- **FastAPI** (Python 3.9+)
  - High-performance async web framework
  - Automatic API documentation (Swagger/OpenAPI)
  - Type hints and Pydantic validation
  - WebSocket support for real-time features

### AI & NLP

- **Google Gemini** (gemini-pro / gemini-pro-vision)
  - Primary AI model for legal chatbot
  - Multimodal capabilities (text and image understanding)
  - Multilingual support
- **LangChain**
  - Conversation chain management
  - Memory management for context retention
  - Prompt engineering and templates
  - Vector store integration for legal knowledge base

### Database & Storage

- **Firebase**
  - **Firestore**: NoSQL database for structured data
  - **Firebase Storage**: File storage for documents and images
  - **Firebase Authentication**: User authentication and management
  - **Firebase Cloud Messaging**: Push notifications
  - **Firebase Analytics**: Usage tracking and insights

### Additional Libraries

- **Pydantic**: Data validation and settings management
- **SQLAlchemy**: ORM (if using relational data alongside Firestore)
- **python-jose**: JWT token handling
- **passlib**: Password hashing
- **python-multipart**: File upload handling
- **aiofiles**: Async file operations
- **httpx**: Async HTTP client
- **uvicorn**: ASGI server
- **python-dotenv**: Environment variable management

### Development Tools

- **pytest**: Testing framework
- **black**: Code formatting
- **flake8**: Linting
- **mypy**: Static type checking

## 🚀 Getting Started

### Prerequisites

- Python 3.9 or higher
- Firebase project with Firestore and Storage enabled
- Google Cloud account with Gemini API access
- pip or poetry for package management

### Installation

```bash
# Clone the repository
git clone https://github.com/sangwajesly/legalhub-backend.git

# Navigate to project directory
cd legalhub-backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env .env
# Edit .env with your configuration

# Download Firebase service account key
# Place it in the project root as firebase-credentials.json

# Run the application
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Local development with Firebase Emulator (recommended)

For local development and testing you can use the Firebase Emulator Suite to avoid using live Firebase resources.

1. Install Firebase CLI and start the emulator:

```bash
# install firebase-tools (if not installed)
npm install -g firebase-tools

# in project root (optional: create firebase.json to configure emulators)
firebase emulators:start --only auth,firestore,storage
```

2. Set `.env` to point to your emulator and enable `DEV_MODE`:

```env
DEV_MODE=true
FIREBASE_CREDENTIALS_PATH=./firebase-credentials.json # optional for emulator
# If using emulator you can set FIRESTORE_EMULATOR_HOST e.g. localhost:8080
FIREBASE_EMULATOR_HOST=localhost:8080
DEBUG_MOCK_GEMINI=true
```

3. Run the FastAPI app (dev mode uses mock Gemini unless `GEMINI_API_URL` is provided):

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Running with Docker

```bash
# Build the Docker image
docker build -t legalhub-backend .

# Run the container
docker run -p 8000:8000 --env-file .env legalhub-backend
```

## Gemini & LangChain (MVP notes)

- The repository includes a lightweight `langchain_service` that composes a conversation prompt from the last messages stored in Firestore and sends it to the Gemini adapter (`app/services/gemini_service.py`).
- For development the Gemini adapter returns a mock response. To use the real Gemini API set these environment variables in `.env`:

```env
GEMINI_API_URL=https://your-gemini-endpoint.example/v1/generate
GOOGLE_API_KEY=your_gemini_api_key
DEBUG_MOCK_GEMINI=false
```

- The MVP uses synchronous (non-streaming) Gemini calls. Streamed responses and LangChain LLM wrappers can be implemented in Phase 2.

**RAG, PDF Ingestion & Web Scraper**

- **Overview:** The project includes a Retrieval-Augmented Generation (RAG) pipeline used to index legal documents and support context-aware LLM responses. The pipeline components are:
  - PDF/text ingestion using `app/services/pdf_processor.py` and the scripts under `scripts/`
  - Embeddings using `sentence-transformers` (default: `all-MiniLM-L6-v2`)
  - Vector store using ChromaDB (`chromadb` client)
  - Retriever + LangChain prompt composition in `app/services/rag_service.py` and `app/services/langchain_service.py`
  - Web scraping and scheduled ingestion via `app/services/web_scraper.py` and `app/services/rag_scheduler.py`

- **Key files:**
  - `scripts/batch_load_pdfs.py`, `scripts/load_pdfs.py` — batch PDF ingestion utilities
  - `app/services/pdf_processor.py` — PDF extraction helpers
  - `app/services/rag_service.py` — add/search documents in Chroma collection
  - `app/services/web_scraper.py`, `app/services/web_scraper_service.py` — scraping logic
  - `app/services/rag_scheduler.py`, `app/services/rag_scheduler_service.py` — APScheduler integration (72-hour interval by default)
  - `app/api/routes/rag_scraper.py` — API endpoints to manage scraper and scheduler

- **Environment variables (examples):**
  - `EMBEDDING_MODEL=all-MiniLM-L6-v2`
  - `CHROMA_PERSIST_DIR=./.chromadb` (set to a writable path for persistent storage)
  - `RAG_COLLECTION_NAME=legalhub_docs`
  - `SCRAPER_INTERVAL_HOURS=72` (scheduler interval)

- **Quick commands:**

```bash
# Run the RAG system tests (PDF ingestion → embeddings → retrieval → LLM)
python test_rag_system.py

# Run the scraper & scheduler tests
python test_rag_scraper.py
```

- **PDF ingestion (batch):**
  - Place PDF files under `data/pdfs/` (create the folder if missing). Each PDF will be split and converted to documents with metadata.
  - Run the batch loader:

```bash
python scripts/batch_load_pdfs.py --path data/pdfs
```

- **Web Scraper & Scheduler:**
  - Sources and scraping configuration live in the scraper service. Use the API routes under `/api/rag/scraper` (see `app/api/routes/rag_scraper.py`) to add sources, check scheduler status, or manually trigger a run.
  - Scheduler uses APScheduler with an interval trigger; change `SCRAPER_INTERVAL_HOURS` to modify cadence.

- **Dependencies (additional):**
  - `chromadb` — ChromaDB Python client
  - `sentence-transformers` — embedding models
  - `pypdf` — PDF parsing (`PdfReader`)
  - `apscheduler` — scheduler for periodic ingestion

- **Guides:** See the repository docs for detailed guides:
  - `PDF_MANAGEMENT_GUIDE.md` — PDF ingestion and best practices
  - `RAG_WEB_SCRAPER_GUIDE.md` — scraper setup and source configuration
  - `RAG_SCRAPER_GUIDE.md` — scheduler and API usage examples

_Notes:_ Ensure `CHROMA_PERSIST_DIR` is set if you want persistent vectors across restarts. In tests we default to in-memory stores unless configured otherwise.

## Tests

Tests mock Firebase ID token verification and the Gemini adapter so they run locally without external services.

Run tests:

```bash
pytest -q
```

For the RAG-specific system tests use the dedicated scripts above (`test_rag_system.py`, `test_rag_scraper.py`). These tests use mock modes for Gemini and Firebase by default; set environment variables (see `DEV_MODE` / `DEBUG_MOCK_GEMINI`) to run against real services.

## Dev tips

- To switch between mock and real Gemini responses toggle `DEBUG_MOCK_GEMINI` in `.env`.
- Keep your `firebase-credentials.json` and `.env` out of version control.
- Use the Firebase Emulator Suite for safe local testing and CI usage.

## 📋 Environment Variables

```env
# Server Configuration
APP_NAME=LegalHub Backend
APP_VERSION=1.0.0
DEBUG=True
HOST=0.0.0.0
PORT=8000

# Firebase Configuration
FIREBASE_CREDENTIALS_PATH=./firebase-credentials.json
FIREBASE_STORAGE_BUCKET=your-project.appspot.com

# Google Gemini API
GOOGLE_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-pro

# JWT Configuration
JWT_SECRET_KEY=your_super_secret_jwt_key_here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,https://legalhub.com

# LangChain Configuration
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=your_langchain_api_key

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
EMAIL_FROM=noreply@legalhub.com

# Payment Gateway (Optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

## 🗄️ Database Schema (Firestore Collections)

### Collections Structure:

```
users/
  - uid (string)
  - email (string)
  - displayName (string)
  - role (string: "user" | "lawyer" | "organization")
  - createdAt (timestamp)
  - updatedAt (timestamp)

lawyers/
  - uid (string)
  - specialization (array)
  - experience (number)
  - rating (number)
  - availability (map)
  - location (geopoint)

chat_sessions/
  - sessionId (string)
  - userId (string)
  - createdAt (timestamp)
  - lastMessageAt (timestamp)
  - messages (subcollection)

cases/
  - caseId (string)
  - userId (string, nullable for anonymous)
  - isAnonymous (boolean)
  - category (string)
  - description (string)
  - location (geopoint)
  - status (string)
  - attachments (array)
  - createdAt (timestamp)

bookings/
  - bookingId (string)
  - userId (string)
  - lawyerId (string)
  - scheduledAt (timestamp)
  - status (string)
  - paymentStatus (string)

articles/
  - articleId (string)
  - authorId (string)
  - title (string)
  - content (string)
  - category (string)
  - tags (array)
  - likes (number)
  - views (number)
  - createdAt (timestamp)
```

## 🔧 Project Structure

```
legalhub-backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application entry point
│   ├── config.py               # Configuration settings
│   ├── dependencies.py         # Dependency injection
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   ├── routes/
│   │   │   ├── auth.py         # Authentication endpoints
│   │   │   ├── chat.py         # Chatbot endpoints
│   │   │   ├── lawyers.py      # Lawyer management
│   │   │   ├── bookings.py     # Booking system
│   │   │   ├── articles.py     # Articles CRUD
│   │   │   ├── cases.py        # Case reporting
│   │   │   └── analytics.py    # Analytics endpoints
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   ├── firebase_service.py # Firebase operations
│   │   ├── gemini_service.py   # Gemini AI integration
│   │   ├── langchain_service.py# LangChain conversation management
│   │   ├── auth_service.py     # Authentication logic
│   │   └── notification_service.py # FCM notifications
│   │
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py             # User models
│   │   ├── chat.py             # Chat models
│   │   ├── case.py             # Case models
│   │   ├── booking.py          # Booking models
│   │   └── article.py          # Article models
│   │
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── auth.py             # Auth request/response schemas
│   │   ├── chat.py             # Chat schemas
│   │   ├── case.py             # Case schemas
│   │   └── ...
│   │
│   └── utils/
│       ├── __init__.py
│       ├── security.py         # Security utilities
│       ├── validators.py       # Input validation
│       └── helpers.py          # Helper functions
│
├── tests/
│   ├── __init__.py
│   ├── test_auth.py
│   ├── test_chat.py
│   └── ...
│
├── firebase-credentials.json   # Firebase service account key (gitignored)
├── .env                        # Environment variables (gitignored)
├── .env                        # Environment file
├── .gitignore
├── requirements.txt            # Python dependencies
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🔒 Security & Privacy

- **Firebase Security Rules**: Strict Firestore and Storage security rules
- **HTTPS Only**: All API communication over TLS/SSL
- **Rate Limiting**: Prevent API abuse with slowapi
- **Input Validation**: Pydantic models for request validation
- **JWT Authentication**: Secure token-based access control
- **Password Hashing**: bcrypt for password security
- **CORS Configuration**: Controlled cross-origin requests
- **Data Anonymization**: Privacy protection for anonymous cases
- **GDPR Compliance**: Data protection and user rights
- **API Key Security**: Environment variable management
- **Role-Based Access Control (RBAC)**: Permission management

## 📡 API Documentation

Once the server is running, access the interactive API documentation:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`
- **OpenAPI JSON**: `http://localhost:8000/openapi.json`

## 🧪 Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app tests/

# Run specific test file
pytest tests/test_chat.py

# Run with verbose output
pytest -v

# Generate HTML coverage report
pytest --cov=app --cov-report=html tests/
```

## 🚀 Deployment

### Using Docker

```bash
# Build image
docker build -t legalhub-backend:latest .

# Run container
docker run -d -p 8000:8000 --env-file .env legalhub-backend:latest
```

### Using Cloud Run (Google Cloud)

```bash
# Build and deploy
gcloud run deploy legalhub-backend \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

### Development Workflow:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`pytest`)
5. Format code (`black app/`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📄 License

[Add your license information]

## 🔗 Related Repositories

- [LegalHub Frontend](https://github.com/sangwajesly/legalhub-frontend) - React web application

## 📞 Contact

For questions, suggestions, or support:

- **Email**: [Your contact email]
- **Website**: [Your website]
- **Issues**: [GitHub Issues](https://github.com/sangwajesly/legalhub-backend/issues)

## 🙏 Acknowledgments

- Google Gemini for AI capabilities
- LangChain for conversation management
- Firebase for backend infrastructure
- FastAPI community for excellent framework
- Open source community

---

**Mission**: Providing robust, scalable backend infrastructure powered by FastAPI, Firebase, and Google Gemini that makes legal services accessible to everyone.
