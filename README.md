# Supportly - Complaints Management System

A modern, responsive complaints management system built with React and Tailwind CSS. Supportly provides both customer and resolver interfaces for efficient complaint handling and resolution.

![Supportly Dashboard](https://img.shields.io/badge/React-18+-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)
![Lucide Icons](https://img.shields.io/badge/Icons-Lucide-FF6B6B?logo=lucide)

## 🌟 Features

### Customer Interface
- **File New Complaints**: Easy-to-use form with category selection and detailed descriptions
- **Track Complaint Status**: Real-time status tracking (Open, In Progress, Resolved, Escalated)
- **AI-Generated Solutions**: Automated solution suggestions for quick resolution
- **Action Management**: Mark complaints as resolved or escalate to human support
- **Status History**: Complete timeline of complaint lifecycle

### Resolver Interface  
- **Dashboard Overview**: Centralized view of all assigned complaints
- **Priority Management**: Color-coded status indicators and deadline tracking
- **Team Assignment**: Dynamic team reassignment capabilities
- **Comments System**: Internal notes and communication thread
- **Bulk Actions**: Quick status updates and resolution tools
- **Analytics**: Case load tracking and performance metrics

## 🚀 State Machine Workflow

The system implements a comprehensive state machine for complaint lifecycle:

```
[Open] → [In Progress] → [Resolved]
   ↓         ↓
[Escalated] → [Resolved]
```

- **Open**: Initial complaint state after filing
- **In Progress**: Actively being worked on by resolver
- **Escalated**: Requires higher-level attention
- **Resolved**: Final state - complaint closed
- **Assigned**: Routed to specific resolver/team

## 🛠️ Tech Stack

- **Frontend**: React 19.1.1
- **Styling**: Tailwind CSS 3.4.17
- **Icons**: Lucide React 0.537.0
- **Build Tool**: Create React App
- **Testing**: React Testing Library + Jest

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd supportly-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000) in your browser
   - Toggle between Customer View and Resolver View using the header buttons

## 🏗️ Project Structure

```
src/
├── components/
│   └── ui/
│       ├── badge.js          # Status badges component
│       ├── button.js         # Reusable button component  
│       └── card.js           # Card layout components
├── App.js                    # Main application component
├── App.css                   # Custom CSS styles
├── index.css                 # Global styles + Tailwind imports
└── index.js                  # React DOM entry point
```

## 🎨 UI Components

### Custom Components
- **Badge**: Status indicators with color coding
- **Button**: Multi-variant button system (default, outline, ghost)
- **Card**: Flexible card layout with header, title, and content areas

### Key Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Color System**: Semantic color coding for different complaint states
- **Typography**: Clean, modern font system with proper hierarchy
- **Interactive Elements**: Hover states and smooth transitions

## 📋 Available Scripts

- `npm start` - Run development server
- `npm test` - Launch test runner  
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App (one-way operation)

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS with custom configuration:
- Content scanning for `src/**/*.{js,jsx,ts,tsx}`
- Extended theme capabilities
- PostCSS integration with autoprefixer

### Google Fonts
Custom Cookie font imported for branding:
```css
@import url('https://fonts.googleapis.com/css2?family=Cookie&display=swap');
```

## 🎯 Usage Examples

### Filing a New Complaint
1. Click "New Complaint" button
2. Select category (Billing, Technical, Service, etc.)
3. Provide summary and detailed description
4. Submit to receive automatic complaint ID

### Managing Complaints (Resolver View)
1. Switch to "I'm a Resolver" view
2. Review assigned complaints with priority indicators
3. Add internal comments and notes
4. Update status or reassign to different teams
5. Mark as resolved when complete

## 🌈 Color Scheme

The application uses a professional color palette:
- **Primary**: Teal/Green (#2a7a6d) for branding
- **Status Colors**:
  - Green: Resolved complaints
  - Blue: In Progress
  - Yellow: Open complaints  
  - Purple: Assigned status
  - Red: Overdue/Urgent items

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Responsive grid system using Tailwind's breakpoint system
- **Touch Friendly**: Large tap targets and intuitive navigation

## 🚧 Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced filtering and search
- [ ] File attachment support
- [ ] Email integration
- [ ] Reporting and analytics dashboard
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Export functionality

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💡 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check documentation for common solutions

---

Built with ❤️ using React and Tailwind CSS
