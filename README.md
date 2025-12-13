# Jewellery Admin Panel

A premium admin dashboard for managing a luxury jewelry e-commerce platform.

## Features

- **Dashboard**: Overview of key metrics and analytics
- **Product Management**: Add, edit, and manage jewelry products for men and women
- **Category Management**: Organize products into main and sub-categories
- **Order Management**: Track and manage customer orders
- **Customer Management**: View and manage customer information
- **Payment Processing**: Monitor payment transactions
- **Settings**: Configure application settings

## Tech Stack

- **Frontend**: React 19.2 + React DOM
- **Routing**: react-router-dom v7.9.6
- **State Management**: Built-in React hooks
- **Form Handling**: react-hook-form v7.67.0 with Zod v4.1.13 validation
- **HTTP Client**: axios v1.13.2
- **Charts**: recharts v3.5.1
- **Icons**: lucide-react v0.555.0
- **Styling**: Tailwind CSS
- **Build Tool**: Vite 7.2.4

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd jewellery-admin
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

### Previewing Production Build

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
src/
├── api/              # API service functions
├── components/       # Reusable UI components
├── modules/          # Feature-specific components
│   ├── auth/         # Authentication components
│   ├── categories/   # Category management
│   ├── customers/    # Customer management
│   ├── dashboard/    # Dashboard components
│   ├── orders/       # Order management
│   ├── payments/     # Payment processing
│   ├── products/     # Product management
│   └── settings/     # Application settings
├── App.jsx           # Main application component
├── index.css         # Global styles
└── main.jsx          # Application entry point
```

## Key Components

### Sidebar Navigation

The sidebar provides intuitive navigation with:
- Hierarchical menu structure
- Expandable/collapsible sub-menus
- Active route highlighting
- Unique icons for each section

### Responsive Design

The admin panel is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## Development Guidelines

### Coding Standards

- Follow React best practices
- Use functional components with hooks
- Implement proper error handling
- Maintain consistent styling with Tailwind CSS

### Git Workflow

1. Create feature branches from `main`
2. Make atomic commits with descriptive messages
3. Push changes and create pull requests
4. Request code reviews before merging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

