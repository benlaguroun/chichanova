# BRANDNAME - Custom Apparel Store

A modern e-commerce platform for custom apparel, built with Next.js and integrated with Printify.

## Features

- Responsive design with dark mode
- Printify API integration for on-demand printing
- Shopping cart functionality
- Product catalog with categories
- Checkout process

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Printify API

## Deployment

### Prerequisites

Before deploying, you'll need:

1. A Printify account with API access
2. Your Printify API key

### Deploying to Vercel

This project is optimized for deployment on Vercel:

1. Push your code to a GitHub repository
2. Connect your GitHub account to Vercel
3. Import your repository as a new project
4. Add the following environment variables:
   - `PRINTIFY_API_KEY`: Your Printify API key
5. Deploy!

The application will automatically fetch your Printify shop ID using the API key.

### Local Development

To run the project locally:

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install

