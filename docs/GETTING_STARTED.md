# Getting Started with Ticketr

This guide will help you set up Ticketr locally for development or testing.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm, yarn, or pnpm** - Package manager of your choice
- **Git** - For version control

You'll also need accounts with:

- **[Convex](https://convex.dev/)** - For the real-time backend
- **[Stripe](https://stripe.com/)** - For payment processing
- **[Google Cloud Console](https://console.cloud.google.com/)** (optional) - For Google OAuth
- **[GitHub](https://github.com/settings/developers)** (optional) - For GitHub OAuth

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/heyitsadityaa/ticketr.git
cd ticketr
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Your `.env.local` file should look like this:

```bash
# Convex Configuration
CONVEX_DEPLOYMENT=your_convex_deployment_name
NEXT_PUBLIC_CONVEX_URL=https://your_convex_deployment.convex.cloud

# Authentication (OAuth) - At least one is required
AUTH_GITHUB_ID=your_github_oauth_client_id
AUTH_GITHUB_SECRET=your_github_oauth_client_secret
AUTH_GOOGLE_ID=your_google_oauth_client_id
AUTH_GOOGLE_SECRET=your_google_oauth_client_secret

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Service Configuration

### Setting up Convex

1. **Create a Convex account**: Visit [convex.dev](https://convex.dev/c/sonnysangha) and sign up

2. **Create a new project** in the Convex dashboard

3. **Install Convex CLI** (if not already installed):
   ```bash
   npm install convex
   ```

4. **Initialize Convex in your project**:
   ```bash
   npx convex init
   ```
   Follow the prompts to connect your project to your Convex deployment.

5. **Copy your deployment URL** from the Convex dashboard and add it to your `.env.local` file

6. **Deploy your functions**:
   ```bash
   npx convex dev
   ```

**Important**: Keep the `npx convex dev` command running while developing. It automatically syncs your backend functions and database schema.

### Setting up Authentication

You need at least one OAuth provider. Here's how to set up both:
#### Example: Starting Stripe Webhook Forwarding

For local development:
```bash
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
```

For your deployed Vercel app:
```bash
stripe listen --forward-to https://ticketr-gilt.vercel.app/api/webhooks/stripe
```
#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Configure consent screen if prompted
6. Choose "Web application" as application type
7. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
8. Copy the Client ID and Client Secret to your `.env.local` file

#### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - **Application name**: Ticketr (or your preferred name)
   - **Homepage URL**: `http://localhost:3000` (for development)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Click "Register application"
5. Copy the Client ID and generate a Client Secret
6. Add both to your `.env.local` file

### Setting up Stripe

1. **Create a Stripe account**: Visit [stripe.com](https://stripe.com/) and sign up

2. **Enable Stripe Connect**:
   - Go to your Stripe dashboard
   - Navigate to "Connect" in the sidebar
   - Follow the setup process for your platform

3. **Get your API keys**:
   - Go to "Developers" > "API keys" in your Stripe dashboard
   - Copy your "Secret key" (starts with `sk_test_` for test mode)
   - Add it to your `.env.local` file

4. **Set up webhooks** (see next section)

### Setting up Stripe Webhooks

#### For Local Development

1. **Install the Stripe CLI**:

   **macOS (using Homebrew):**
   ```bash
   brew install stripe/stripe-cli/stripe
   ```

   **Windows (using Scoop):**
   ```bash
   scoop install stripe
   ```

   **Linux:**
   ```bash
   curl -s https://packages.stripe.dev/api/security/keypair/stripe-cli-gpg/public | gpg --dearmor | sudo tee /usr/share/keyrings/stripe.gpg
   echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.dev/stripe-cli-debian-local stable main" | sudo tee -a /etc/apt/sources.list.d/stripe.list
   sudo apt update
   sudo apt install stripe
   ```

2. **Login to Stripe CLI**:
   ```bash
   stripe login
   ```

3. **Start webhook forwarding**:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. **Copy the webhook signing secret** displayed in the terminal and add it to your `.env.local`:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
   ```

**Note**: Keep the webhook forwarding command running while testing payments locally.

#### For Production

1. In your Stripe dashboard, go to "Developers" > "Webhooks"
2. Click "Add endpoint"
3. Set the endpoint URL to: `https://yourdomain.com/api/webhooks/stripe`
4. Select the following events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `account.updated`
   - `payout.paid`
5. Create the endpoint and copy the signing secret
6. Add the signing secret to your production environment variables

## Running the Application

Once everything is configured:

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **In a separate terminal, start Convex**:
   ```bash
   npx convex dev
   ```

3. **If testing payments, start Stripe webhook forwarding** (in another terminal):
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## Verification

To verify everything is working:

1. **Check the homepage** loads without errors
2. **Test authentication** by signing in with Google or GitHub
3. **Create a test event** (you'll need to complete Stripe Connect onboarding)
4. **Test the queue system** by creating an event with limited tickets

## Troubleshooting

### Common Issues

**"Convex functions not found"**
- Make sure `npx convex dev` is running
- Check that your `NEXT_PUBLIC_CONVEX_URL` is correct

**"Authentication not working"**
- Verify your OAuth credentials are correct
- Check that redirect URIs match exactly
- Ensure you're using the correct domain (localhost:3000 for development)

**"Stripe payments failing"**
- Confirm webhook forwarding is active with `stripe listen`
- Check that your `STRIPE_WEBHOOK_SECRET` matches the CLI output
- Verify your `STRIPE_SECRET_KEY` is correct

**"Environment variables not loading"**
- Ensure your file is named `.env.local` (not `.env`)
- Restart your development server after changing environment variables
- Check for any typos in variable names

### Getting Help

- Check the [Development Guide](./DEVELOPMENT.md) for advanced setup
- Review the [Convex documentation](https://docs.convex.dev/)
- Visit the [Stripe documentation](https://stripe.com/docs)
- Create an issue on our [GitHub repository](https://github.com/heyitsadityaa/ticketr/issues)

## Next Steps

Once you have Ticketr running locally:

1. Explore the codebase structure in the [Development Guide](./DEVELOPMENT.md)
2. Learn about the backend functions in the [Convex README](../convex/README.md)
3. Try creating your first event and testing the queue system
4. Consider contributing to the project!

Happy coding! 🎟️
