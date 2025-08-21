# Development Guide

This guide covers advanced development topics, project structure, contributing guidelines, and deployment instructions for Ticketr.

## Project Structure

```
ticketr/
├── .env.example                 # Environment variables template
├── .gitignore                  # Git ignore patterns
├── LICENSE.txt                 # MIT License
├── README.md                   # Project overview
├── docs/                       # Documentation
│   ├── GETTING_STARTED.md     # Setup instructions
│   └── DEVELOPMENT.md         # This file
├── actions/                    # Server actions for Stripe operations
│   ├── createStripeCheckoutSession.ts
│   ├── createStripeConnectAccountLink.ts
│   ├── createStripeConnectCustomer.ts
│   ├── createStripeConnectLoginLink.ts
│   ├── getStripeAccountStatus.ts
│   ├── getStripeConnectAccount.ts
│   └── refundEventTickets.ts
├── app/                        # Next.js 15 App Router
│   ├── api/webhooks/stripe/    # Stripe webhook handlers
│   ├── auth/                   # Authentication pages
│   ├── event/[id]/            # Event detail pages
│   ├── seller/                # Organizer dashboard
│   ├── tickets/               # Ticket management
│   ├── profile/               # User profile
│   ├── search/                # Event search
│   └── layout.tsx             # Root layout
├── components/                 # React components
│   ├── ui/                    # Reusable UI components
│   ├── Navbar/                # Navigation components
│   └── [feature-components]   # Feature-specific components
├── convex/                     # Backend functions
│   ├── auth.ts                # Authentication logic
│   ├── events.ts              # Event management
│   ├── tickets.ts             # Ticket operations
│   ├── waitingList.ts         # Queue system
│   ├── schema.ts              # Database schema
│   └── _generated/            # Auto-generated files
├── lib/                        # Utility functions
│   ├── convex.ts              # Convex client setup
│   ├── stripe.ts              # Stripe configuration
│   └── utils.ts               # General utilities
└── public/                     # Static assets
```

## Architecture Overview

### Frontend Architecture

**Next.js 15 App Router**: Modern file-based routing with server and client components
**React 19**: Latest React features with concurrent rendering
**TypeScript**: Full type safety across the application
**Tailwind CSS**: Utility-first styling with custom design system

### Backend Architecture

**Convex**: Real-time backend-as-a-service providing:
- Real-time database with automatic subscriptions
- Server functions (queries, mutations, actions)
- Built-in authentication system
- File storage capabilities

### Key Design Patterns

1. **Server Actions**: Next.js server actions for Stripe operations
2. **Real-time Subscriptions**: Convex useQuery for live data updates
3. **Optimistic Updates**: Immediate UI updates with rollback on failure
4. **Component Composition**: Reusable components with clear interfaces
5. **Type Safety**: End-to-end TypeScript with generated types from Convex

## Development Workflow

### Available Scripts

```bash
# Development
npm run dev              # Start Next.js development server
npx convex dev          # Start Convex development server (separate terminal)

# Building
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run type-check      # TypeScript type checking (if available)
```

### Development Server Setup

1. **Terminal 1**: Next.js development server
   ```bash
   npm run dev
   ```

2. **Terminal 2**: Convex development server
   ```bash
   npx convex dev
   ```

3. **Terminal 3** (when testing payments): Stripe webhook forwarding
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

### Key Development Notes

- **Keep Convex dev server running**: It automatically syncs function changes and schema updates
- **Use TypeScript types**: Import types from `convex/_generated/api` for type safety
- **Test webhook endpoints**: Always test payment flows with Stripe CLI
- **Follow component patterns**: Use the established component structure
- **Real-time first**: Leverage Convex subscriptions for live updates

## Database Schema

The application uses Convex with the following main tables:

### Events Table
```typescript
{
  name: string;
  description: string;
  location: string;
  eventDate: number;
  price: number;
  totalTickets: number;
  isActive: boolean;
  userId: string; // Organizer
  stripeConnectAccountId?: string;
  imageStorageId?: string;
}
```

### Tickets Table
```typescript
{
  eventId: string;
  userId: string;
  purchasedAt: number;
  status: "valid" | "used" | "refunded";
  stripePaymentIntentId: string;
}
```

### WaitingList Table
```typescript
{
  eventId: string;
  userId: string;
  joinedAt: number;
  status: "waiting" | "offered" | "purchased" | "expired";
  offerExpiresAt?: number;
}
```

### Users Table
```typescript
{
  name: string;
  email: string;
  stripeConnectAccountId?: string;
  // Other fields managed by Convex Auth
}
```

## Key Features Implementation

### Real-time Queue System

The queue system is built using Convex's real-time subscriptions:

1. **Joining Queue**: Users join when tickets are sold out
2. **Position Updates**: Real-time position tracking using live queries
3. **Automatic Offers**: System offers tickets when available
4. **Time-limited Windows**: Offers expire after a set duration
5. **Fair Processing**: FIFO queue with anti-gaming measures

### Payment Processing

Stripe Connect integration for direct organizer payouts:

1. **Connect Onboarding**: Organizers complete Stripe Connect setup
2. **Secure Checkout**: Stripe Checkout for payment processing  
3. **Webhook Handling**: Process payment confirmations and failures
4. **Automatic Refunds**: Handle event cancellations and refunds

### Authentication System

Convex Auth provides:

1. **OAuth Integration**: Google and GitHub sign-in
2. **Session Management**: Secure session handling
3. **User Sync**: Automatic user data synchronization
4. **Route Protection**: Middleware for protected routes

## Contributing

### Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ticketr.git
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment** following the [Getting Started guide](./GETTING_STARTED.md)
5. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Code Style and Standards

- **TypeScript**: Use TypeScript for all new code
- **ESLint**: Follow the project's ESLint configuration
- **Component Structure**: Keep components focused and reusable
- **Naming Conventions**: Use descriptive names for functions and variables
- **Comments**: Add comments for complex business logic

### Pull Request Process

1. **Create a descriptive PR title** following conventional commits
2. **Add a detailed description** of what changes you made
3. **Reference any related issues** using GitHub keywords
4. **Include screenshots** for UI changes
5. **Ensure tests pass** (once testing is implemented)
6. **Request review** from maintainers

### Contribution Guidelines

**What to Contribute**:
- Bug fixes
- Feature enhancements
- Documentation improvements
- Performance optimizations
- UI/UX improvements

**Before Contributing**:
- Check existing issues to avoid duplication
- Discuss large changes in an issue first
- Follow the existing code style
- Test your changes thoroughly

## Deployment

### Deploying to Vercel (Recommended)

1. **Push code to GitHub**:
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project

3. **Add environment variables** in Vercel dashboard:
   - Copy all variables from your `.env.local`
   - Update URLs for production (remove localhost)
   - Use Stripe live keys for production

4. **Deploy Convex functions**:
   ```bash
   npx convex deploy --prod
   ```

5. **Update environment variables** with production URLs:
   - Update `NEXT_PUBLIC_CONVEX_URL` with production URL
   - Update `NEXT_PUBLIC_APP_URL` with Vercel domain
   - Update OAuth redirect URIs

### Production Environment Variables

```bash
# Production Convex
CONVEX_DEPLOYMENT=your_prod_deployment
NEXT_PUBLIC_CONVEX_URL=https://your_prod_deployment.convex.cloud

# Production OAuth (update redirect URIs)
AUTH_GITHUB_ID=same_as_dev
AUTH_GITHUB_SECRET=same_as_dev
AUTH_GOOGLE_ID=same_as_dev  
AUTH_GOOGLE_SECRET=same_as_dev

# Production Stripe (use live keys)
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_production_webhook_secret

# Production URL
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### Production Checklist

- [ ] All environment variables configured
- [ ] OAuth redirect URIs updated for production domain
- [ ] Stripe webhooks configured for production endpoint
- [ ] Convex functions deployed to production
- [ ] SSL certificate is active
- [ ] Custom domain configured (optional)

### Alternative Deployment Options

**Netlify**: Similar process to Vercel
**Railway**: Good for full-stack apps
**DigitalOcean App Platform**: More control over infrastructure
**AWS/GCP**: For enterprise deployments

## Testing

### Manual Testing Checklist

**Authentication**:
- [ ] Google OAuth sign-in works
- [ ] GitHub OAuth sign-in works  
- [ ] User session persists correctly
- [ ] Sign-out functionality works

**Event Management**:
- [ ] Create event (requires Stripe Connect)
- [ ] Edit event details
- [ ] Cancel event with refunds
- [ ] Event visibility controls

**Ticketing Flow**:
- [ ] Purchase available tickets
- [ ] Join queue when sold out
- [ ] Receive ticket offers
- [ ] Complete purchase within time limit
- [ ] View purchased tickets

**Payment Processing**:
- [ ] Stripe Connect onboarding
- [ ] Successful payments
- [ ] Failed payment handling
- [ ] Refund processing

### Automated Testing (Future)

The project is set up to support:
- **Unit tests** with Jest
- **Integration tests** with Testing Library
- **E2E tests** with Playwright
- **API tests** for Convex functions

## Performance Considerations

### Frontend Optimization
- Use Next.js Image component for optimized images
- Implement proper loading states
- Leverage React 19's concurrent features
- Minimize bundle size with tree shaking

### Backend Optimization
- Use Convex indexes for efficient queries
- Implement proper pagination
- Cache frequently accessed data
- Monitor function performance

### Real-time Optimization
- Limit subscription scope to necessary data
- Use optimistic updates for better UX
- Implement proper error boundaries
- Handle connection states gracefully

## Troubleshooting

### Common Development Issues

**Build Errors**:
- Clear `.next` folder and rebuild
- Check for TypeScript errors
- Verify all dependencies are installed

**Convex Issues**:
- Restart `npx convex dev`
- Check function syntax and imports
- Verify environment variables

**Stripe Issues**:
- Check webhook forwarding is active
- Verify API keys are correct
- Test with Stripe's test card numbers

### Getting Help

- **Documentation**: Check Convex and Stripe docs
- **Community**: Join the Convex Discord
- **Issues**: Create GitHub issues for bugs
- **Discussions**: Use GitHub Discussions for questions

## Security Considerations

- Never commit API keys or secrets
- Use environment variables for all configuration
- Validate all user inputs
- Implement proper rate limiting
- Keep dependencies updated
- Follow OWASP security guidelines

---

Happy coding! If you have questions or need help, don't hesitate to create an issue or start a discussion. 🚀
