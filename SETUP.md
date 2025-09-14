# Sunainscent Frontend Setup Guide

## Environment Variables Setup

Create a `.env.local` file in the `Sunainscent-frountend-nextjs` directory with the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

## Installation and Running

1. Install dependencies:
```bash
cd Sunainscent-frountend-nextjs
npm install
# or if using pnpm
pnpm install
```

2. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

The application will be available at `http://localhost:3000`

## Admin Panel Access

1. Navigate to `http://localhost:3000/admin/login`
2. Use the admin credentials:
   - Email: `admin@sunainscent.com`
   - Password: `admin123`

## Available Pages

### Public Pages
- `/` - Home page
- `/shop` - Product catalog
- `/contact` - Contact form
- `/policies` - Policies page
- `/auth/login` - User login
- `/auth/register` - User registration

### Admin Pages
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard with stats
- `/admin/products` - Product management (CRUD)
- `/admin/orders` - Order management
- `/admin/contacts` - Contact message management
- `/admin/users` - User management
- `/admin/analytics` - Analytics dashboard

## Features

### Admin Dashboard
- Overview statistics (products, orders, users, revenue)
- Quick actions for common tasks
- Recent activity feed

### Product Management
- Add, edit, delete products
- Search and filter products
- Category management
- Stock management

### Order Management
- View all orders
- Update order status
- View order details
- Add admin notes

### Contact Management
- View all contact messages
- Mark messages as read/unread
- Add admin notes
- Search and filter messages

### User Management
- View all registered users
- User statistics
- Search users

### Analytics
- Daily order and revenue charts
- Order status distribution
- Top products
- Revenue trends

## Technology Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **HTTP Client**: Axios
- **Authentication**: JWT with cookies
