Here's the README content for you to copy and use manually:


# 🧮 MathPulse

MathPulse is a modern, feature-rich, and highly responsive web calculator built with **React**, **TypeScript**, and **Tailwind CSS**. Designed for precision, speed, and simplicity, MathPulse offers multiple calculation modes with a sleek, matte-blue interface and seamless dark mode support.

🌐 **Live Site**: [https://mathpulse.lovable.app/](https://mathpulse.lovable.app/)

---

## 🚀 Features

- ✅ **Multi-Mode Calculator**: Standard, Scientific, Programmer, Date, and Converter modes
- ✅ **Fully Functional**: Equal (`=`) and Clear (`C`) buttons work perfectly in all modes
- ✅ **Smooth & Responsive UI**: Built with Tailwind CSS for a polished user experience
- ✅ **Accurate Calculations**: Powered by [math.js](https://mathjs.org/) for reliable results
- ✅ **Dark Mode Toggle**: Switch between light and dark themes with balanced contrast
- ✅ **Calculation History**: Stores history in `localStorage` for persistence across sessions
- ✅ **Keyboard Support**: Full keyboard navigation and shortcuts
- ✅ **Works Offline**: Progressive Web App (PWA) ready

---

## 📱 Calculator Modes

### 1. **Standard Calculator**
Basic arithmetic operations: addition, subtraction, multiplication, division, and percentage calculations.

### 2. **Scientific Calculator**
Advanced mathematical functions including:
- Trigonometric functions (sin, cos, tan)
- Logarithms and exponentials
- Square roots and powers
- Constants (π, e)

### 3. **Programmer Calculator**
Built for developers with:
- Multiple number bases (Binary, Octal, Decimal, Hexadecimal)
- Bitwise operations (AND, OR, XOR, NOT, shifts)
- Base conversion on-the-fly

### 4. **Date Calculator**
Calculate differences between dates or add/subtract days from a specific date.

### 5. **Unit Converter**
Convert between various units in categories like:
- Length (meters, feet, miles, etc.)
- Weight (kg, pounds, ounces, etc.)
- Temperature (Celsius, Fahrenheit, Kelvin)
- Volume, Area, Speed, and more

---

## 🛠️ Tech Stack

|
 Technology 
|
 Purpose 
|
|
------------
|
---------
|
|
**
React 18
**
|
 UI library for building interactive components 
|
|
**
TypeScript
**
|
 Type-safe JavaScript for better code quality 
|
|
**
Tailwind CSS
**
|
 Utility-first CSS framework for styling 
|
|
**
Vite
**
|
 Lightning-fast build tool and dev server 
|
|
**
math.js
**
|
 Comprehensive math library for calculations 
|
|
**
date-fns
**
|
 Modern date utility library 
|
|
**
Lucide React
**
|
 Beautiful icon set 
|
|
**
next-themes
**
|
 Dark mode implementation 
|
|
**
React Router
**
|
 Client-side routing 
|

---

## 📦 Installation & Setup

To clone and run MathPulse locally:

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/mathpulse.git

# 2. Navigate to the project directory
cd mathpulse

# 3. Install dependencies
npm install
# or
yarn install
# or
pnpm install

# 4. Start the development server
npm run dev
Your app will be available at: 👉 http://localhost:5000

🎨 Design System
MathPulse features a carefully crafted design system with:

Semantic Color Tokens: Consistent theming using HSL color space
Responsive Layout: Adapts seamlessly from mobile to desktop
Smooth Animations: Transitions powered by tailwindcss-animate
Accessibility: ARIA labels and keyboard navigation support
Custom Components: Built on top of Radix UI primitives
🌙 Dark Mode
Toggle between light and dark themes using the button in the top-right corner.

Light Mode: Clean, professional look with balanced contrast
Dark Mode: Easy on the eyes with carefully chosen color palettes
Theme preference is saved to localStorage
⌨️ Keyboard Shortcuts
Key	Action
0-9	Number input
+, -, *, /	Basic operations
Enter or =	Calculate result
Escape or c	Clear display
Backspace	Delete last character
📂 Project Structure
mathpulse/
├── src/
│   ├── components/
│   │   ├── Calculator.tsx          # Main calculator component
│   │   ├── calculator/
│   │   │   ├── CalculatorDisplay.tsx
│   │   │   ├── CalculatorKeypad.tsx
│   │   │   ├── ModeSidebar.tsx
│   │   │   ├── HistorySidebar.tsx
│   │   │   └── keypads/
│   │   │       ├── DateKeypad.tsx
│   │   │       ├── ConverterKeypad.tsx
│   │   │       └── ProgrammerKeypad.tsx
│   │   ├── ui/                     # Reusable UI components
│   │   ├── ThemeProvider.tsx
│   │   └── ThemeToggle.tsx
│   ├── hooks/
│   │   ├── useCalculator.ts        # Main calculator logic
│   │   └── useProgrammer.ts        # Programmer mode logic
│   ├── utils/
│   │   ├── converter.ts            # Unit conversion logic
│   │   ├── dateCalculator.ts       # Date calculation logic
│   │   └── programmer.ts           # Programmer mode utilities
│   ├── pages/
│   │   ├── Index.tsx               # Home page
│   │   └── NotFound.tsx            # 404 page
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── README.md
└── package.json
🧪 Technical Highlights
Custom Hooks: Modular logic with useCalculator and useProgrammer
Type Safety: Comprehensive TypeScript interfaces and types
State Management: React hooks for efficient state handling
LocalStorage Integration: Persistent calculation history
Error Handling: Graceful error management for invalid expressions
Performance: Optimized re-renders with React.memo and useCallback
🤝 Contributing
Contributions are welcome! Here's how you can help:

Fork the repository
Create a feature branch: git checkout -b feature/amazing-feature
Commit your changes: git commit -m 'Add amazing feature'
Push to the branch: git push origin feature/amazing-feature
Open a Pull Request
Reporting Bugs
If you find a bug, please open an issue with:

Clear description of the problem
Steps to reproduce
Expected vs actual behavior
Screenshots (if applicable)
🔮 Future Enhancements
 Export/import calculation history
 Customizable themes and color schemes
 More unit conversion categories
 Graphing calculator mode
 Scientific notation formatting options
 Multi-language support
📄 License
This project is open-source and available under the MIT License.

🙏 Acknowledgments
Built by using React
Styled with Tailwind CSS
Icons by Lucide
Math powered by math.js
UI components from Radix UI
📧 Contact
For questions or feedback, feel free to reach out or open an issue on GitHub.

Enjoy calculating with MathPulse! 🧮✨
