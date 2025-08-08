# Book Online Shop - Frontend

A modern React-based frontend application for the Book Online Shop e-commerce platform. Built with React, Vite, TailwindCSS, and shadcn/ui components for a responsive and user-friendly book shopping experience.

## 🚀 Features

- **Modern UI/UX** with TailwindCSS and shadcn/ui components
- **Responsive Design** optimized for desktop, tablet, and mobile
- **User Authentication** with JWT token management
- **Book Catalog** with search, filtering, and categorization
- **Shopping Cart** with persistent storage
- **Order Management** with cash and Stripe payment integration
- **User Reviews** with rating system
- **Address Management** with Cambodia location hierarchy
- **User Profile** with order history and review management
- **Real-time Updates** with toast notifications

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with Hooks
- **Build Tool**: Vite for fast development and building
- **Styling**: TailwindCSS for utility-first CSS
- **UI Components**: shadcn/ui for consistent design system
- **State Management**: React Context API
- **HTTP Client**: Axios for API communication
- **Routing**: React Router DOM v6
- **Payment**: Stripe integration
- **Icons**: Lucide React
- **Notifications**: React Toastify

## 📋 Prerequisites

- Node.js (v16+)
- npm or yarn
- Backend API server running (see backend README)

## 🔧 Installation

1. Navigate to the frontend directory
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Create environment variables
Create a `.env` file in the frontend root:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

4. Start the development server
```bash
npm run dev
```

The application will run on `http://localhost:5173`

## 🏗️ Project Structure

```
frontend/
├── public/                 # Static assets
│   ├── avatar.svg
│   ├── pic_store.jpg
│   ├── placeholder.svg
│   └── stripe_logo.png
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Book.jsx
│   │   ├── Footer.jsx
│   │   ├── MyReview.jsx
│   │   ├── Navigation.jsx
│   │   ├── Orderhistory.jsx
│   │   └── ui/            # shadcn/ui components
│   ├── hooks/             # Custom React hooks
│   │   └── UseShopContext.jsx
│   ├── layouts/           # Layout components
│   │   └── RootLayout.jsx
│   ├── lib/               # Utilities and configurations
│   │   └── utils.js
│   ├── pages/             # Page components
│   │   ├── About.jsx
│   │   ├── Authentication.jsx
│   │   ├── BookDetails.jsx
│   │   ├── Books.jsx
│   │   ├── CartItems.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── PlaceOrder.jsx
│   │   ├── Profile.jsx
│   │   └── Verify.jsx
│   ├── service/           # API service layer
│   │   └── api.js
│   ├── App.jsx            # Main app component
│   ├── index.css          # Global styles
│   └── main.jsx           # App entry point
├── components.json        # shadcn/ui configuration
├── jsconfig.json         # JavaScript configuration
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # TailwindCSS configuration
└── vite.config.js        # Vite configuration
```

## 📱 Pages & Features

### 🏠 Home Page
- Featured books display
- Category showcase
- Search functionality
- Hero section with call-to-action

### 📚 Books Page
- Complete book catalog
- Advanced filtering by category, price, rating
- Search by title or author
- Pagination for large catalogs
- Grid/List view toggle

### 📖 Book Details
- Comprehensive book information
- Author and category details
- Customer reviews and ratings
- Related books suggestions
- Add to cart functionality

### 🛒 Shopping Cart
- Item management (add, remove, update quantity)
- Real-time price calculation
- Persistent cart storage
- Quick checkout process

### 🔐 Authentication
- User registration with validation
- Secure login system
- Password strength requirements
- JWT token management
- Auto-logout on token expiry

### 👤 User Profile
- Personal information management
- Order history with status tracking
- Review management
- Address book management
- Account settings

### 📦 Order Management
- Order placement with validation
- Multiple payment methods (Cash, Stripe)
- Order tracking and status updates
- Order history with detailed views
- Receipt generation

### ⭐ Review System
- Rate and review purchased books
- Edit/delete own reviews
- View all reviews for books
- Rating distribution visualization
- Helpful review sorting

### 📍 Address Management
- Cambodia address hierarchy (Province → District → Commune → Village)
- Multiple address support
- Default address setting
- Address validation

## 🎨 UI Components

### Core Components
- **Navigation**: Responsive navbar with user menu
- **Footer**: Links and company information
- **Book Card**: Reusable book display component
- **Rating Display**: Star rating visualization
- **Loading States**: Skeleton loaders and spinners

### Form Components
- **Input Fields**: Styled input components
- **Select Dropdowns**: Custom select components
- **Buttons**: Various button styles and states
- **Form Validation**: Real-time validation feedback

### Layout Components
- **RootLayout**: Main application layout
- **Container**: Responsive content containers
- **Grid Systems**: Flexible grid layouts
- **Modal/Dialog**: Overlay components

## 🔧 Configuration

### TailwindCSS Configuration
Custom design system with:
- Color palette matching brand identity
- Typography scale for consistent text
- Spacing system for layout consistency
- Responsive breakpoints
- Custom components and utilities

### Vite Configuration
- Fast HMR (Hot Module Replacement)
- Optimized build process
- Environment variable handling
- Path aliases for clean imports
- Plugin configuration

### API Integration
- Centralized API service layer
- Axios interceptors for authentication
- Error handling and retry logic
- Request/response transformations
- Loading state management

## 🚀 Build & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with sidebar navigation
- **Tablet**: Adapted layouts with touch-friendly interactions
- **Mobile**: Mobile-first design with optimized navigation

### Breakpoints
- `sm`: 640px (Mobile)
- `md`: 768px (Tablet)
- `lg`: 1024px (Desktop)
- `xl`: 1280px (Large Desktop)

## 🔒 Security Features

- **JWT Token Management**: Secure token storage and validation
- **Route Protection**: Authentication-based route access
- **Input Validation**: Client-side form validation
- **XSS Protection**: Sanitized user inputs
- **HTTPS Enforcement**: Secure data transmission

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Book browsing and search
- [ ] Cart functionality
- [ ] Order placement
- [ ] Payment processing
- [ ] Profile management
- [ ] Review system
- [ ] Responsive design

### Testing Commands
```bash
# Run component tests
npm run test

# Run e2e tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

## 🔧 Environment Variables

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api

# Payment Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# App Configuration
VITE_APP_NAME="Book Online Shop"
VITE_APP_VERSION="1.0.0"

# Development
VITE_DEBUG_MODE=false
```

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check if backend server is running
   - Verify VITE_API_BASE_URL in .env file
   - Check network connectivity

2. **Authentication Issues**
   - Clear localStorage and try again
   - Check token expiration
   - Verify backend JWT configuration

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all dependencies are installed

4. **Styling Issues**
   - Check TailwindCSS configuration
   - Verify component imports
   - Clear browser cache

## 📈 Performance Optimization

- **Code Splitting**: Lazy loading for routes and components
- **Image Optimization**: Responsive images with lazy loading
- **Bundle Analysis**: Webpack bundle analyzer integration
- **Caching Strategy**: Service worker for offline capabilities
- **Minification**: Production build optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

### Code Style Guidelines
- Use ES6+ features
- Follow React best practices
- Use meaningful component and variable names
- Add comments for complex logic
- Maintain consistent file structure

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](../LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the fast build tool
- TailwindCSS for the utility-first CSS framework
- shadcn/ui for the beautiful component library
- All contributors and beta testers

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation and FAQ

---

**Happy Shopping! 📚✨**
