# Book Online Shop - Admin Dashboard

A comprehensive React-based admin dashboard for managing the Book Online Shop e-commerce platform. Built with React, Vite, TailwindCSS, and shadcn/ui components for efficient business management and analytics.

## 🚀 Features

- **Dashboard Analytics** with sales metrics and statistics
- **User Management** with role-based permissions
- **Book Inventory Management** with CRUD operations
- **Order Management** with status tracking and updates
- **Role & Permission Management** for access control
- **Real-time Data** with automatic updates
- **Responsive Design** optimized for desktop and tablet
- **Modern UI/UX** with professional design system
- **Data Export** capabilities for reporting
- **Advanced Filtering** and search functionality

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with Hooks
- **Build Tool**: Vite for fast development and building
- **Styling**: TailwindCSS for utility-first CSS
- **UI Components**: shadcn/ui for consistent design system
- **State Management**: React Context API
- **HTTP Client**: Axios for API communication
- **Routing**: React Router DOM v6
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Notifications**: React Toastify
- **Tables**: TanStack Table for advanced data tables

## 📋 Prerequisites

- Node.js (v16+)
- npm or yarn
- Backend API server running (see backend README)
- Admin user account with appropriate permissions

## 🔧 Installation

1. Navigate to the admin directory
```bash
cd admin
```

2. Install dependencies
```bash
npm install
```

3. Create environment variables
Create a `.env` file in the admin root:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ADMIN_PANEL_TITLE="Book Shop Admin"
```

4. Start the development server
```bash
npm run dev
```

The admin dashboard will run on `http://localhost:5174`

## 🏗️ Project Structure

```
admin/
├── public/                 # Static assets
│   └── vite.svg
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── BookManagement.jsx
│   │   ├── OrderManagement.jsx
│   │   ├── RoleManagement.jsx
│   │   ├── UserManagement.jsx
│   │   └── ui/            # shadcn/ui components
│   │       ├── badge.jsx
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       ├── dialog.jsx
│   │       ├── input.jsx
│   │       ├── label.jsx
│   │       ├── select.jsx
│   │       ├── separator.jsx
│   │       ├── switch.jsx
│   │       ├── table.jsx
│   │       └── textarea.jsx
│   ├── context/           # React Context providers
│   │   └── authContext.jsx
│   ├── layouts/           # Layout components
│   │   └── RootLayout.jsx
│   ├── lib/               # Utilities and configurations
│   │   ├── api.js
│   │   └── utils.js
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   └── Login.jsx
│   ├── App.jsx            # Main app component
│   ├── index.css          # Global styles
│   └── main.jsx           # App entry point
├── components.json        # shadcn/ui configuration
├── jsconfig.json         # JavaScript configuration
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # TailwindCSS configuration
└── vite.config.js        # Vite configuration
```

## 📊 Admin Features

### 🏠 Dashboard Overview
- **Sales Analytics**: Revenue, orders, and growth metrics
- **User Statistics**: Customer count and registration trends
- **Inventory Status**: Stock levels and low-stock alerts
- **Recent Activities**: Latest orders, reviews, and user actions
- **Performance Metrics**: Best-selling books and categories
- **Quick Actions**: Fast access to common tasks

### 👥 User Management
- **User List**: Comprehensive user database with search and filtering
- **User Details**: View detailed user profiles and activity history
- **Role Assignment**: Assign and modify user roles and permissions
- **Account Status**: Enable/disable user accounts
- **Bulk Operations**: Mass user management actions
- **Export Data**: User data export for reporting

**Features:**
- Search users by name, email, or ID
- Filter by role, status, registration date
- View user order history and statistics
- Manage user permissions and access levels
- Send notifications to users
- Account verification management

### 📚 Book Management
- **Book Inventory**: Complete book catalog management
- **Add New Books**: Create new book entries with full details
- **Edit Books**: Update book information, pricing, and stock
- **Category Management**: Organize books by categories
- **Author Management**: Manage author information and relationships
- **Stock Tracking**: Monitor inventory levels and alerts
- **Bulk Upload**: Import books from CSV/Excel files

**Book Information Management:**
- Title, ISBN, description, and pricing
- Author and category assignment
- Stock quantity and availability
- Image upload and management
- Review and rating overview
- Sales performance tracking

### 🛒 Order Management
- **Order Dashboard**: Comprehensive order tracking system
- **Order Processing**: Manage order lifecycle and status updates
- **Payment Tracking**: Monitor payment status and methods
- **Shipping Management**: Track shipping and delivery status
- **Order History**: Complete order archive with search
- **Customer Communication**: Send order updates to customers

**Order Status Management:**
- Pending → Processing → Shipped → Delivered
- Payment verification and processing
- Inventory deduction and management
- Customer notification system
- Order cancellation and refunds
- Shipping label generation

### 🔐 Role & Permission Management
- **Role Creation**: Define custom roles with specific permissions
- **Permission Matrix**: Visual permission assignment interface
- **Access Control**: Granular permission management
- **User Role Assignment**: Assign roles to users
- **Permission Auditing**: Track permission changes and access logs
- **Default Roles**: Predefined roles for common use cases

**Available Permissions:**
- User management (create, read, update, delete)
- Book management (inventory control)
- Order management (processing, status updates)
- System administration (settings, configurations)
- Analytics access (reports, metrics)
- Content management (reviews, categories)

## 🎨 UI Components & Design

### Dashboard Components
- **Metric Cards**: Key performance indicators with trend indicators
- **Charts & Graphs**: Sales trends, user growth, and analytics
- **Data Tables**: Advanced tables with sorting, filtering, and pagination
- **Status Badges**: Visual status indicators for orders and users
- **Action Buttons**: Quick action buttons for common tasks

### Form Components
- **Input Fields**: Styled form inputs with validation
- **Select Dropdowns**: Custom select components with search
- **File Upload**: Drag-and-drop file upload components
- **Date Pickers**: Calendar components for date selection
- **Rich Text Editor**: Advanced text editing for descriptions

### Navigation & Layout
- **Sidebar Navigation**: Collapsible sidebar with role-based menu items
- **Breadcrumbs**: Navigation breadcrumbs for deep pages
- **Header Bar**: User profile, notifications, and quick actions
- **Responsive Layout**: Optimized for desktop and tablet usage

## 🔧 API Integration

### Centralized API Service
```javascript
// lib/api.js
const api = {
  auth: {
    login: (credentials) => post('/auth/login', credentials),
    logout: () => post('/auth/logout'),
    getProfile: () => get('/auth/profile')
  },
  users: {
    getAll: (params) => get('/users', { params }),
    getById: (id) => get(`/users/${id}`),
    create: (data) => post('/users', data),
    update: (id, data) => put(`/users/${id}`, data),
    delete: (id) => delete(`/users/${id}`)
  },
  books: {
    getAll: (params) => get('/books', { params }),
    getById: (id) => get(`/books/${id}`),
    create: (data) => post('/books', data),
    update: (id, data) => put(`/books/${id}`, data),
    delete: (id) => delete(`/books/${id}`)
  },
  orders: {
    getAll: (params) => get('/orders', { params }),
    getById: (id) => get(`/orders/${id}`),
    updateStatus: (id, status) => put(`/orders/${id}/status`, { status })
  }
}
```

### Authentication Context
```javascript
// context/authContext.jsx
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Authentication methods
  const login = async (credentials) => { /* ... */ }
  const logout = async () => { /* ... */ }
  const checkAuth = async () => { /* ... */ }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
```

## 🚀 Build & Deployment

### Development Build
```bash
npm run dev
```
Runs the admin dashboard in development mode with hot reloading.

### Production Build
```bash
npm run build
```
Builds the admin dashboard for production deployment.

### Preview Production Build
```bash
npm run preview
```
Preview the production build locally.

### Linting
```bash
npm run lint
```
Run ESLint to check code quality and style.

## 🔒 Security & Access Control

### Authentication
- **JWT Token-based Authentication**: Secure login with token management
- **Auto-refresh Tokens**: Automatic token renewal for extended sessions
- **Session Management**: Secure session handling and timeout
- **Login Throttling**: Protection against brute-force attacks

### Authorization
- **Role-based Access Control (RBAC)**: Granular permission system
- **Route Protection**: Protected routes based on user permissions
- **Component-level Security**: Hide/show components based on permissions
- **API Security**: Secure API calls with proper authentication

### Data Protection
- **Input Validation**: Client-side validation for all forms
- **XSS Protection**: Sanitized user inputs and outputs
- **CSRF Protection**: Cross-site request forgery prevention
- **Audit Logging**: Track admin actions and changes

## 📊 Analytics & Reporting

### Dashboard Metrics
- **Sales Overview**: Revenue trends and performance indicators
- **User Analytics**: Registration trends and user activity
- **Inventory Metrics**: Stock levels and product performance
- **Order Statistics**: Order volume and processing metrics

### Custom Reports
- **Sales Reports**: Detailed sales analysis with filtering
- **User Reports**: User activity and engagement metrics
- **Inventory Reports**: Stock movement and low-stock alerts
- **Financial Reports**: Revenue analysis and profit margins

### Data Visualization
- **Charts**: Line charts, bar charts, and pie charts for data visualization
- **Tables**: Advanced data tables with export capabilities
- **Dashboards**: Customizable dashboard widgets
- **Real-time Updates**: Live data updates for critical metrics

## 🧪 Testing

### Component Testing
```bash
npm run test
```

### End-to-End Testing
```bash
npm run test:e2e
```

### Testing Checklist
- [ ] Authentication and authorization
- [ ] User management operations
- [ ] Book inventory management
- [ ] Order processing workflow
- [ ] Role and permission assignment
- [ ] Data table operations
- [ ] Form validation and submission
- [ ] Responsive design

## 🔧 Environment Configuration

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api

# Admin Configuration
VITE_ADMIN_PANEL_TITLE="Book Shop Admin"
VITE_ADMIN_VERSION="1.0.0"

# Features
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_EXPORTS=true
VITE_ENABLE_BULK_OPERATIONS=true

# Security
VITE_SESSION_TIMEOUT=3600000
VITE_AUTO_LOGOUT=true
```

## 🐛 Troubleshooting

### Common Issues

1. **Authentication Problems**
   - Verify admin credentials
   - Check JWT token validity
   - Ensure proper role permissions

2. **API Connection Issues**
   - Verify backend server status
   - Check API base URL configuration
   - Review network connectivity

3. **Permission Errors**
   - Verify user role and permissions
   - Check route-level access controls
   - Review API endpoint permissions

4. **Data Loading Issues**
   - Check API response format
   - Verify data transformation logic
   - Review error handling implementation

## 📈 Performance Optimization

- **Code Splitting**: Lazy loading for components and routes
- **Data Caching**: Intelligent caching for frequently accessed data
- **Virtualization**: Virtual scrolling for large data tables
- **Debounced Search**: Optimized search with debouncing
- **Memoization**: React.memo for expensive components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/admin-feature`
3. Commit changes: `git commit -m 'Add admin feature'`
4. Push to branch: `git push origin feature/admin-feature`
5. Submit a pull request

### Development Guidelines
- Follow React best practices and hooks patterns
- Use TypeScript for better type safety
- Implement proper error handling and loading states
- Add unit tests for critical components
- Follow the established code style and formatting

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](../LICENSE) file for details.

## 📞 Support & Maintenance

For admin dashboard support:
- Technical issues: Create a GitHub issue
- Feature requests: Submit through the project repository
- Documentation: Check the wiki and inline comments
- Training: Contact the development team for admin training

---

**Efficient Management Made Simple! 🚀📊**
