# Education Hub - EHL Redesign

A modern, responsive web application for exploring popular subjects and future career paths. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Popular Subjects**: Browse and explore various academic subjects
- **Future Careers**: Discover career opportunities and paths
- **Subject Details**: Detailed information about each subject area
- **Career Details**: Comprehensive career guidance and information
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Modern UI**: Clean, professional interface with smooth animations
- **Fast Performance**: Built with Vite for optimal development and build experience

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript, jQuery
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter
- **HTTP Client**: Axios
- **Icons**: Font Awesome & Lucide React
- **Animations**: Framer Motion

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd EHLRedesign
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

### 3. Start Development Server

Using npm:

```bash
npm run dev
```

Using yarn:

```bash
yarn dev
```

The application will start on `http://localhost:5173` by default.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run start` - Start production server
- `npm run check` - Run TypeScript type checking
- `npm run lint` - Run ESLint for code quality

## 📁 Project Structure

```
EHLRedesign/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/        # Base UI components (buttons, cards, etc.)
│   │   │   ├── Header.tsx # Navigation header
│   │   │   └── Footer.tsx # Site footer
│   │   ├── pages/         # Page components
│   │   │   ├── PopularSubjects.tsx
│   │   │   ├── SubjectDetails.tsx
│   │   │   ├── FutureCareers.tsx
│   │   │   └── CareerDetails.tsx
│   │   ├── lib/           # Utilities and configurations
│   │   │   ├── api.ts     # API client setup
│   │   │   ├── utils.ts   # Helper functions
│   │   │   └── queryClient.ts
│   │   ├── hooks/         # Custom React hooks
│   │   ├── App.tsx        # Main app component
│   │   ├── main.tsx       # Application entry point
│   │   └── index.css      # Global styles
│   ├── assets/            # Static assets (images, icons)
│   └── index.html         # HTML template
├── shared/                # Shared types and schemas
├── public/                # Public static files
├── dist/                  # Build output directory
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md             # This file
```

## 🎨 Styling

This project uses **Tailwind CSS** for styling with custom configurations:

- **Custom Colors**: Primary orange, secondary green, accent blue
- **Responsive Design**: Mobile-first approach
- **Component Library**: Radix UI for accessible components
- **Custom Animations**: Smooth transitions and hover effects

## 🌐 API Integration

The application integrates with external APIs:

- **Subject Areas API**: `https://www.ehlcrm.theskyroute.com/api/test/popular-subject-area`
- **Career Data API**: `https://www.ehlcrm.theskyroute.com/api/test/top-future-career`
- **Subject Details API**: `https://www.ehlcrm.theskyroute.com/api/subject-area-details`

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up
- **Large Desktop**: 1280px and up

## 🔧 Development

### Adding New Pages

1. Create a new component in `client/src/pages/`
2. Add routing in `App.tsx`
3. Update navigation in `Header.tsx` if needed

### Adding New Components

1. Create component in `client/src/components/`
2. Export from appropriate index file
3. Import and use in pages

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use custom color variables defined in `tailwind.config.ts`
- Maintain consistent spacing and typography

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/public` directory.

### Preview Production Build

```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

**Port already in use:**

```bash
# Kill process on port 5173
npx kill-port 5173
# Or use a different port
npm run dev -- --port 3000
```

**Dependencies issues:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors:**

```bash
# Run type checking
npm run check
```

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.
