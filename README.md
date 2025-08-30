# 🌾 FarmXchain - Complete Supply Chain Management System

A comprehensive full-stack application for managing agricultural supply chains with role-based dashboards, AI-powered insights, QR code tracking, and complete traceability from farm to consumer.

## 🚀 Features Overview

### 1. **User Authentication System** 🔐
- **Role-based Login**: Farmer, Consumer, Retailer
- **Separate Dashboards**: Each role gets a customized interface
- **Secure Authentication**: JWT-based authentication with role verification

### 2. **Product Metadata Management** 📊
- **Comprehensive Data**: Crop type, origin, fertilizers, harvest/expiry dates
- **QR Code Linking**: All metadata linked to unique QR codes
- **Extensible Schema**: Easy to add new metadata fields

### 3. **QR Code Generation & Scanning** 📱
- **Dynamic QR Codes**: Generate QR codes with embedded product data
- **Role-based Information**: Different data shown based on user role
- **Camera Integration**: Real-time QR code scanning with camera access
- **Simulation Mode**: Test functionality without physical QR codes

### 4. **AI-Based Quality Assurance + Chatbot** 🤖
- **Intelligent Analysis**: AI-powered product quality assessment
- **Role-specific Recommendations**: Tailored advice for each user type
- **Interactive Chatbot**: Conversational AI assistant
- **Market Insights**: Real-time pricing and demand analysis

### 5. **Supply Chain Tracking (Traceability)** 🔍
- **Visual Timeline**: Interactive supply chain visualization
- **Real-time Updates**: Live tracking of product movement
- **Graph-based UI**: Intuitive network visualization
- **Status Monitoring**: Track from farmer to consumer

### 6. **Consumer Verification Portal** ✅
- **QR Code Scanning**: Verify product authenticity
- **Complete Journey**: View product's entire supply chain
- **Metadata Display**: Show all relevant product information
- **Trust Indicators**: Authenticity verification

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing

### Key Libraries
- **react-qrcode-logo** - QR code generation
- **framer-motion** - Animations and transitions
- **react-router-dom** - Navigation

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/FarmXchain.git
   cd FarmXchain-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production
```bash
npm run build
```

## 🎯 Usage Guide

### 1. **Getting Started**
1. Open the application in your browser
2. Click "Sign up" to create an account
3. Select your role: Farmer, Consumer, or Retailer
4. Complete registration and login

### 2. **Role-Based Dashboards**

#### 👨‍🌾 **Farmer Dashboard**
- **Crop Management**: Add, edit, and track crops
- **AI Guidance**: Get farming recommendations
- **Market Prices**: View current market trends
- **Supply Chain**: Track your products through the chain

#### 🛒 **Consumer Dashboard**
- **Product Discovery**: Browse available products
- **Nutritional Info**: Get detailed nutrition data
- **Seasonal Tips**: Learn about seasonal availability
- **Recipe Ideas**: Cooking suggestions and methods

#### 🏪 **Retailer Dashboard**
- **Inventory Management**: Track stock levels
- **Supply Chain Status**: Monitor incoming shipments
- **Analytics**: Performance metrics and insights
- **Logistics**: Delivery tracking and management

### 3. **QR Code System**

#### **Generating QR Codes**
1. Navigate to any crop in the dashboard
2. Click "Generate QR" button
3. QR code contains role-based information
4. Download or print for physical use

#### **Scanning QR Codes**
1. Go to Verification page
2. Click "Start Camera" or "Simulate Scan"
3. Point camera at QR code or use simulation
4. View role-specific product information

### 4. **AI Quality Assurance**
1. Select a crop for analysis
2. AI analyzes quality metrics
3. Get role-specific recommendations
4. View market insights and predictions

### 5. **Supply Chain Tracking**
1. Navigate to Trace page
2. View visual supply chain graph
3. Click on nodes for detailed information
4. Filter by status, location, or search terms

## 🏗️ Project Structure

```
FarmXchain-main/
├── src/
│   ├── components/
│   │   ├── AIDashboard/          # AI-powered features
│   │   │   ├── AISection.jsx
│   │   │   ├── AIQualityAssurance.jsx
│   │   │   ├── HotQuestions.jsx
│   │   │   ├── LivePriceTicker.jsx
│   │   │   ├── RecommendationCards.jsx
│   │   │   └── RoleSwitcher.jsx
│   │   ├── Chatbot/              # Interactive chatbot
│   │   │   ├── ChatbotWidget.jsx
│   │   │   ├── ChatPanel.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   └── QuickChips.jsx
│   │   ├── Trace/                # Supply chain tracking
│   │   │   ├── BatchDetails.jsx
│   │   │   ├── SearchFilters.jsx
│   │   │   ├── SupplyChainGraph.jsx
│   │   │   └── Trace.jsx
│   │   ├── QRScanner/            # QR code scanning
│   │   │   └── QRScanner.jsx
│   │   ├── Verification/         # Product verification
│   │   │   ├── ProductVerification.jsx
│   │   │   └── QRScanner.jsx
│   │   ├── CropCard.jsx          # Crop display component
│   │   ├── CropForm.jsx          # Crop management form
│   │   ├── Navbar.jsx            # Navigation component
│   │   ├── QRModal.jsx           # QR code modal
│   │   └── WeatherWidget.jsx     # Weather information
│   ├── pages/
│   │   ├── Dashboard.jsx         # Farmer dashboard
│   │   ├── ConsumerDashboard.jsx # Consumer dashboard
│   │   ├── RetailerDashboard.jsx # Retailer dashboard
│   │   ├── Login.jsx             # Authentication
│   │   ├── Register.jsx          # User registration
│   │   ├── Trace.jsx             # Supply chain page
│   │   └── Verification.jsx      # Verification portal
│   ├── App.jsx                   # Main application
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── public/                       # Static assets
├── package.json                  # Dependencies
└── README.md                     # This file
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url_here
VITE_APP_NAME=FarmXchain
```

### Customization
- **Colors**: Modify `tailwind.config.js` for theme customization
- **Data**: Update sample data in respective components
- **AI Logic**: Extend AI analysis functions in `AIQualityAssurance.jsx`

## 🚀 Deployment

### Netlify Deployment
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main branch

### Vercel Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in project directory
3. Follow prompts for deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Email: support@farmxchain.com
- Documentation: [docs.farmxchain.com](https://docs.farmxchain.com)

## 🔮 Future Enhancements

- **Blockchain Integration**: Immutable supply chain records
- **IoT Sensors**: Real-time environmental monitoring
- **Mobile App**: Native iOS/Android applications
- **Advanced AI**: Machine learning for crop prediction
- **API Integration**: Connect with external agricultural APIs
- **Multi-language Support**: Internationalization
- **Advanced Analytics**: Business intelligence dashboard

## 🏆 Features Summary

| Module | Status | Description |
|--------|--------|-------------|
| Authentication | ✅ Complete | Role-based login with separate dashboards |
| Product Metadata | ✅ Complete | Comprehensive product information management |
| QR Code System | ✅ Complete | Generation and scanning with role-based data |
| AI Quality Assurance | ✅ Complete | Intelligent analysis and recommendations |
| Supply Chain Tracking | ✅ Complete | Visual timeline and real-time updates |
| Consumer Verification | ✅ Complete | QR scanning and authenticity verification |

---

**FarmXchain** - Revolutionizing agricultural supply chain management with transparency, traceability, and AI-powered insights. 🌾✨