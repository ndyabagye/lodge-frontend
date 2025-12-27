# 🏨 Lodge Booking System - Frontend

A modern, full-featured lodge booking and management platform built with React, TypeScript, and TanStack ecosystem.

## ✨ Features

### For Guests
- 🏠 Browse accommodations with advanced filtering
- ⚡ Book activities and experiences
- 🛒 Shopping cart with multi-item support
- 💳 Secure checkout process
- 📅 Manage bookings and reservations
- ❤️ Save favorite accommodations
- 👤 User profile management

### For Admins
- 📊 Comprehensive analytics dashboard
- 🏢 Accommodation management (CRUD)
- 🎯 Activity management (CRUD)
- 📖 Booking oversight and status updates
- 👥 User management and roles
- 📈 Revenue and performance reports

### Technical Features
- 🌓 Dark mode support
- 📱 Fully responsive design
- ⚡ Real-time availability checking
- 🔐 JWT authentication
- 🎨 Modern UI with Shadcn/ui
- 📊 Interactive charts and visualizations
- 🚀 Optimized performance
- ♿ Accessible components

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: TanStack Router
- **State Management**: TanStack Query + Zustand
- **Forms**: React Hook Form + Zod
- **Styling**: Tailwind CSS + Shadcn/ui
- **Charts**: Recharts
- **Backend**: Laravel 12 REST API

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm/pnpm/yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lodge-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=Lodge Booking System
```

5. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📦 Available Scripts
```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Run ESLint

# Type checking
npm run typecheck       # Run TypeScript compiler check
```

## 🏗️ Project Structure
```
src/
├── components/         # React components
│   ├── ui/            # Shadcn UI components
│   ├── layout/        # Layout components
│   ├── home/          # Homepage sections
│   ├── accommodation/ # Accommodation module
│   ├── activity/      # Activities module
│   ├── booking/       # Booking & checkout
│   ├── cart/          # Shopping cart
│   ├── account/       # User dashboard
│   ├── admin/         # Admin panel
│   └── common/        # Shared components
├── routes/            # TanStack Router routes
├── hooks/             # Custom React hooks
├── services/          # API service functions
├── stores/            # Zustand stores
├── types/             # TypeScript types
└── lib/               # Utilities & config
```

## 🔌 API Integration

The frontend connects to a Laravel backend API. All endpoints are prefixed with `/api/v1`.

### Key Endpoints:
- **Auth**: `/auth/login`, `/auth/register`, `/auth/logout`
- **Accommodations**: `/accommodations`, `/accommodations/:id`
- **Activities**: `/activities`, `/activities/:id`
- **Bookings**: `/bookings`, `/bookings/:id`
- **Admin**: `/admin/dashboard`, `/admin/accommodations`, etc.

See [API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md) for full API reference.

## 🎨 Theming

The app supports both light and dark modes. Theme is automatically detected from system preferences and can be toggled by the user.

### Color Customization
Edit `src/index.css` to customize the color palette:
```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96.1%;
  /* ... other colors */
}
```

## 🧪 Testing (To be implemented)
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📦 Building for Production
```bash
npm run build
```

The optimized build will be in the `dist/` directory.

## 🚢 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Set environment variables
3. Deploy automatically on push

### Netlify
1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Docker
```bash
docker build -t lodge-frontend .
docker run -p 80:80 lodge-frontend
```

### AWS S3 + CloudFront
```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | Yes |
| `VITE_APP_NAME` | Application name | Yes |
| `VITE_STRIPE_PUBLIC_KEY` | Stripe public key | No |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps API key | No |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- Frontend Developer: Ndyabagye Henry
- Backend Developer: Ndyabagye Henry
- UI/UX Designer: Ndyabagye Henry

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for the component library
- [TanStack](https://tanstack.com/) for routing and data fetching
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons

## 📧 Support

For support, email support@lodge.com or join our Slack channel.

## 🗺️ Roadmap

- [ ] Payment gateway integration (Stripe, Flutterwave)
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Social login (Google, Facebook)
- [ ] Multi-language support
- [ ] Progressive Web App (PWA)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] AI-powered recommendations

---

Made with ❤️ by Ndyabagye Henry
