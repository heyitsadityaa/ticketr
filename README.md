<p align="center">
    <img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/548375ef-25a4-42d5-888a-17e38828f20a" />
</p>

# Ticketr - Real-time Event Ticketing Platform

A modern, real-time event ticketing platform built with Next.js 15, Convex, and Stripe Connect. Features a sophisticated queue system, real-time updates, and secure payment processing with a beautiful Neobutralism-inspired design.

## 🖥️ Project Demo

### Attendees

Check out the attendees experience in action:

[Watch the Attendees Demo](https://github.com/user-attachments/assets/8d33b384-66d9-4d46-bf04-80f4456d4a9d)
> _Click to watch a walkthrough of ticket browsing, queueing, and purchase flow._

### Organizers

See how event organizers manage events and sales:

[Watch the Organizer Demo](https://github.com/user-attachments/assets/ba50d604-f192-450c-b71e-47178e2b066a)

> _Click to watch event creation, analytics, and payout management._



## ✨ What is Ticketr?

Ticketr revolutionizes event ticketing by combining real-time technology with smart queue management. Whether you're an event organizer looking to sell tickets seamlessly or an attendee trying to secure spots for popular events, Ticketr provides a fair, transparent, and engaging experience.

## Key Features

### For Event Attendees

- 🎫 **Real-time ticket availability** - See live updates as tickets become available
- ⚡ **Smart queuing system** - Fair queue with live position updates  
- 🕒 **Time-limited offers** - Secure your spot with time-bound ticket offers
- 📱 **Mobile-first experience** - Seamless ticket management on any device
- 🔒 **Secure payments** - Protected transactions with Stripe
- 📲 **Digital tickets** - QR code tickets for easy event entry
- 💸 **Automatic refunds** - Instant refunds for cancelled events

### For Event Organizers

- 💰 **Direct payouts** - Get paid directly via Stripe Connect
- 📊 **Real-time analytics** - Monitor sales and queue status live
- 🎯 **Automated management** - Smart queue and ticket recycling
- 📈 **Event insights** - Detailed analytics and tracking
- 🎟️ **Flexible ticketing** - Customizable limits and pricing
- ❌ **Easy cancellations** - One-click event cancellation with auto-refunds

## 🚀 Technical Highlights

- **Real-time Everything**: Live updates using Convex's real-time database
- **Smart Authentication**: Seamless OAuth with Google & GitHub via Convex Auth
- **Secure Payments**: Stripe Connect for direct organizer payouts
- **Modern Architecture**: Built with Next.js 15 and React 19
- **Fraud Prevention**: Built-in rate limiting and automated security
- **Queue Intelligence**: Sophisticated queue management with position tracking

## 🎨 Design Philosophy

Ticketr embraces **Neobutralism** - a modern take on brutalist design principles that emphasizes:

- **Bold, confident interfaces** with strong visual hierarchy
- **Functional beauty** where every element serves a purpose  
- **Accessible design** that works for everyone
- **Smooth micro-interactions** that provide delightful feedback
- **Responsive layouts** optimized for all screen sizes

## 🏗️ Architecture

Built on a modern, scalable stack:

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Convex (real-time database & backend)
- **Authentication**: Convex Auth with Google & GitHub OAuth
- **Payments**: Stripe Connect for direct payouts to organizers
- **UI/UX**: Custom Neobutralism-inspired design system
- **State Management**: Convex real-time subscriptions
- **Deployment**: Vercel

## 🎪 How It Works

### The Queue System

When tickets sell out, attendees join a smart queue that:

- Tracks your position in real-time
- Automatically offers tickets when available
- Provides time-limited purchase opportunities
- Prevents queue jumping and manipulation

### Payment Flow

- Organizers connect their Stripe accounts for direct payouts
- Secure checkout process with automatic receipts
- Instant refunds for cancelled events
- Transparent fee structure

### Real-time Updates

Everything happens live - queue positions, ticket availability, sales analytics, and more update instantly across all connected clients.

## 📖 Documentation

- **[Getting Started](./docs/GETTING_STARTED.md)** - Setup and installation guide
- **[Development Guide](./docs/DEVELOPMENT.md)** - Contributing and development workflow
- **[API Reference](./convex/README.md)** - Backend functions documentation

## 🤝 Contributing

We welcome contributions! Please see our [Development Guide](./docs/DEVELOPMENT.md) for setup instructions and contribution guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.
