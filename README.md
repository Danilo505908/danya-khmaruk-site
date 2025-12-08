# Danya Khmaruk - Portfolio Website

A modern, responsive portfolio website showcasing my projects, skills, and experience as a Frontend Developer.

## 🚀 Features

- **Modern Design**: Clean, professional UI with dark/light theme support
- **Responsive Layout**: Fully responsive design that works on all devices
- **Multi-language**: English and Ukrainian language support
- **Project Showcase**: Display of GitHub projects with live demos
- **Contact Form**: Integrated contact form with email submission
- **Technology Stack**: Showcase of skills and technologies
- **Resume Download**: PDF resume available for download

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Framer Motion** - Animations
- **CSS Modules** - Scoped styling
- **GitHub API** - Project data fetching
- **Formspree** - Contact form handling

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Danilo505908/danya-khmaruk-site.git

# Navigate to the project directory
cd danya-khmaruk-site

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable components
│   ├── availabilityStatus/  # Availability status indicator
│   ├── contactForm/         # Contact form component
│   ├── footer/             # Footer component
│   ├── header/              # Header with navigation
│   ├── loader/              # Loading spinner
│   ├── projectCard/         # GitHub project card
│   └── skillBadge/          # Technology skill badge
├── pages/               # Page components
│   ├── Home.tsx         # Home/About page
│   ├── Projects.tsx      # Portfolio/Projects page
│   ├── Contact.tsx     # Contact page
│   └── NotFound.tsx     # 404 page
├── assets/              # Images and static assets
├── data/                # Translation data
├── interfaces/          # TypeScript interfaces
└── ui/                  # UI components (dividers, icons, etc.)
```

## 🎨 Customization

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GITHUB_TOKEN=your_github_token_here
```

### Updating Content

- **Personal Info**: Edit `src/data/data.json`
- **Projects**: Update project list in `src/pages/Home.tsx`
- **Styling**: Modify CSS modules in respective component folders

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

The site is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel for automatic deployments.

## 📄 License

This project is private and personal portfolio.

## 👤 Author

**Danya Khmaruk**

- GitHub: [@Danilo505908](https://github.com/Danilo505908)
- LinkedIn: [danyakhmaruk](https://linkedin.com/in/danyakhmaruk)
- Email: danahmaruk91@gmail.com

---

Built with ❤️ using React and TypeScript
