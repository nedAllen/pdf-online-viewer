# 🔍 PDF Online Viewer



![PDF Viewer Demo](https://via.placeholder.com/800x400/667eea/ffffff?text=PDF+Online+Viewer+Demo)

**A clean and modern web-based PDF viewer with text selection, zoom controls, and responsive design.**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![PDF.js](https://img.shields.io/badge/PDF.js-3.3.122-red.svg)](https://mozilla.github.io/pdf.js/)
[![Responsive](https://img.shields.io/badge/Responsive-Yes-brightgreen.svg)](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

[Live Demo](https://your-username.github.io/pdf-online-viewer) • [Report Bug](https://github.com/your-username/pdf-online-viewer/issues) • [Request Feature](https://github.com/your-username/pdf-online-viewer/issues)



---

## ✨ Features

- 📄 **PDF Rendering** - High-quality PDF rendering using Mozilla's PDF.js
- 🖱️ **Text Selection** - Select and copy text directly from PDF pages
- 🔍 **Zoom Controls** - Zoom in/out with precise scale control
- 📐 **Fit Options** - Fit to width, actual size, and auto-fit modes
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎯 **Drag & Drop** - Simply drag and drop PDF files to view
- 🎨 **Clean UI** - Modern, minimalist interface with collapsible sidebar
- 🚀 **No Backend Required** - Pure client-side processing
- 🔒 **Privacy First** - Files are processed locally, never uploaded to servers
- ⚡ **Fast Loading** - Optimized for quick page rendering

## 🎯 Demo

### Desktop View
![Desktop Demo](https://via.placeholder.com/600x300/667eea/ffffff?text=Desktop+View)

### Mobile View


## 🚀 Quick Start

### Option 1: Download and Run Locally

1. **Clone the repository**
   ```
   git clone https://github.com/your-username/pdf-online-viewer.git
   cd pdf-online-viewer
   ```

2. **Start a local server**
   ```
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Option 2: Use with GitHub Pages

1. Fork this repository
2. Go to Settings → Pages
3. Select source branch (usually `main`)
4. Access via `https://your-username.github.io/pdf-online-viewer`

## 📁 Project Structure

```
pdf-online-viewer/
├── index.html          # Main HTML file
├── style.css           # Stylesheet
├── script.js           # JavaScript logic
├── README.md           # Project documentation
├── .gitignore          # Git ignore file
└── LICENSE             # MIT License
```

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **PDF Engine**: [PDF.js](https://mozilla.github.io/pdf.js/) v3.3.122
- **Styling**: Pure CSS3 with Flexbox & Grid
- **Icons**: Unicode Emojis
- **Build**: No build process required

## 📖 Usage

### Basic Usage

1. **Upload PDF**: Click "파일 선택" or drag & drop a PDF file
2. **Navigate**: Use sidebar controls for zoom and fit options
3. **Select Text**: Click and drag to select text from any page
4. **Copy Text**: Use the copy button or Ctrl+C to copy selected text
5. **Zoom**: Use +/- buttons or keyboard shortcuts

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `+` / `=` | Zoom In |
| `-` | Zoom Out |
| `Ctrl+C` | Copy Selected Text |

### Sidebar Controls

- **📁 새 파일**: Upload a new PDF file
- **🔍 Zoom Controls**: Adjust viewing scale
- **📐 폭 맞춤**: Fit PDF width to container
- **🔍 실제 크기**: View at 100% scale
- **📋 복사**: Copy selected text to clipboard

## 🌐 Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 60+ | ✅ Full |
| Firefox | 55+ | ✅ Full |
| Safari | 11+ | ✅ Full |
| Edge | 79+ | ✅ Full |
| Mobile Safari | 11+ | ✅ Full |
| Chrome Mobile | 60+ | ✅ Full |

## 🎨 Customization

### Changing Colors

Edit `style.css` to customize the color scheme:

```
/* Primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Sidebar background */
background: #2c3e50;

/* Selection color */
background: rgba(0, 123, 255, 0.3);
```

### Adding Features

The modular JavaScript structure makes it easy to add new features:

```
// Add to SimplePDFViewer class
async customFeature() {
    // Your custom functionality
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Bug Reports

When reporting bugs, please include:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- PDF file details (if relevant)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Mozilla PDF.js](https://mozilla.github.io/pdf.js/) - PDF rendering engine
- [Font Awesome](https://fontawesome.com/) - Icon inspiration
- Contributors and users who provide feedback

## 📞 Support

- 📧 Email: your-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/pdf-online-viewer/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-username/pdf-online-viewer/discussions)

---



**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [Your Name](https://github.com/your-username)