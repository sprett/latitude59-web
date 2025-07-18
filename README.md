# Latitude - Artist Website MVP

A modern, responsive artist website built with Next.js and Sanity CMS, designed to showcase music and monetize digital products.

## 🎵 Features

- **Music Showcase**: Display tracks and remixes with streaming platform links
- **Sample Pack Store**: Sell digital products with Gumroad integration
- **Admin-Friendly CMS**: Non-technical content management with Sanity
- **Mobile-First Design**: Responsive design with Tailwind CSS
- **Performance Optimized**: Static Site Generation (SSG) for fast loading
- **SEO Ready**: Optimized metadata and structured content

## 🛠 Tech Stack

### Frontend (`/web`)

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **Lucide React** - Icon library
- **clsx & tailwind-merge** - Conditional styling utilities

### CMS (`/sanity`)

- **Sanity Studio** - Headless CMS
- **GROQ** - Query language for content
- **TypeScript** - Schema definitions

### Integration

- **Sanity Client** - Content fetching
- **Portable Text** - Rich text rendering
- **Image Optimization** - Sanity Image URLs
- **Gumroad** - Payment processing

## 📁 Project Structure

```
latitude/
├── web/                    # Next.js frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   │   ├── page.tsx           # Home page
│   │   │   ├── music/            # Music listing
│   │   │   ├── sample-packs/     # Sample pack store
│   │   │   ├── about/            # Artist bio
│   │   │   └── contact/          # Contact form
│   │   ├── components/    # Reusable components
│   │   │   ├── ui/               # Base UI components
│   │   │   ├── layout/           # Header, Footer
│   │   │   └── sections/         # Page sections
│   │   ├── lib/           # Utilities and configs
│   │   └── utils/         # Helper functions
│   └── package.json
├── sanity/                # Sanity CMS
│   ├── schemaTypes/       # Content schemas
│   │   ├── artist.ts            # Artist profile
│   │   ├── musicTrack.ts        # Music tracks
│   │   └── samplePack.ts        # Sample packs
│   ├── sanity.config.ts   # Studio configuration
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Sanity account (free)

### 1. Clone and Install

```bash
git clone <repository-url>
cd latitude

# Install dependencies for both projects
cd web && npm install
cd ../sanity && npm install
```

### 2. Set Up Sanity CMS

```bash
cd sanity

# Start Sanity Studio
npm run dev
```

The Sanity Studio will be available at `http://localhost:3333`

### 3. Add Content

1. Open Sanity Studio
2. Create an **Artist Profile** (mark as active)
3. Add **Music Tracks** (mark some as featured)
4. Add **Sample Packs** (with Gumroad URLs)

### 4. Start Frontend

```bash
cd web

# Start development server
npm run dev
```

The website will be available at `http://localhost:3000`

## 📝 Content Management

### Artist Profile

- Basic information (name, bio, location)
- Profile and hero images
- Social media links
- Equipment and achievements
- Contact information

### Music Tracks

- Track details (title, artist, genre)
- Cover art
- Streaming platform links
- Release information
- Featured flag for homepage

### Sample Packs

- Product information (name, description, price)
- Cover images and previews
- Technical details (BPM, key, sample count)
- Gumroad integration
- Tags and categorization

## 🎨 Customization

### Styling

The website uses Tailwind CSS for styling. Key design tokens:

```css
/* Primary colors */
.bg-blue-600    /* Primary brand color */
/* Primary brand color */
.bg-purple-600  /* Secondary/accent color */
.bg-gray-900    /* Dark backgrounds */

/* Typography */
.text-4xl       /* Large headings */
.text-xl        /* Body text */
.font-bold; /* Headings */
```

### Components

Reusable components are located in `/web/src/components/`:

- `ui/Button.tsx` - Styled button component
- `ui/Card.tsx` - Content card layouts
- `sections/MusicCard.tsx` - Music track display
- `sections/SamplePackCard.tsx` - Sample pack display

### Adding Pages

1. Create new directory in `/web/src/app/`
2. Add `page.tsx` file
3. Update navigation in `Header.tsx`
4. Add corresponding Sanity schema if needed

## 🔧 Configuration

### Environment Variables

Create `.env.local` in the web directory:

```bash
# Optional: For production optimizations
NEXT_PUBLIC_SANITY_PROJECT_ID=1ut778we
NEXT_PUBLIC_SANITY_DATASET=production
```

### Sanity Configuration

The Sanity project is configured in `/sanity/sanity.config.ts`:

```typescript
export default defineConfig({
  projectId: '1ut778we',  # Your Sanity project ID
  dataset: 'production',   # Dataset name
  // ... other config
})
```

## 📱 Responsive Design

The website is mobile-first and fully responsive:

- **Mobile**: Single column layouts, touch-friendly buttons
- **Tablet**: Two-column grids, collapsible navigation
- **Desktop**: Three-column grids, fixed navigation

Key breakpoints:

- `sm:` 640px and up
- `md:` 768px and up
- `lg:` 1024px and up
- `xl:` 1280px and up

## 🚀 Deployment

### Frontend (Vercel)

```bash
cd web
npm run build
```

Deploy to Vercel:

1. Connect repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `.next`

### CMS (Sanity)

```bash
cd sanity
npm run build
npm run deploy
```

The Sanity Studio will be deployed to `<project-name>.sanity.studio`

## 🔮 Future Enhancements

The MVP is designed for easy expansion:

### Planned Features

- **Blog**: Add blog content type and pages
- **Tour Dates**: Event management and display
- **Merch Store**: Physical product integration
- **Mailing List**: Newsletter signup and management
- **Audio Player**: Embedded music player
- **User Accounts**: Customer accounts and purchase history

### Technical Improvements

- **Search**: Full-text search across content
- **Analytics**: Visitor and sales tracking
- **CDN**: Global content delivery
- **PWA**: Progressive Web App features
- **API Routes**: Custom backend functionality

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Next.js Docs](https://nextjs.org/docs)
- **CMS Help**: [Sanity Docs](https://www.sanity.io/docs)
- **Styling**: [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

Built with ❤️ for artists who want to showcase their work and build their business online.
