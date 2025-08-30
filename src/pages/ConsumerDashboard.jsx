import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import WeatherWidget from '../components/WeatherWidget'

const ConsumerDashboard = ({ user, onLogout, theme, setTheme, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState('products')
  const [searchQuery, setSearchQuery] = useState('')

  // Sample product data for consumers
  const products = [
    {
      id: 1,
      name: 'Fresh Tomatoes',
      image: 'https://agricultureguruji.com/wp-content/uploads/2018/09/tomato-2643774_1280.jpg.webp',
      price: '$2.99/lb',
      nutrition: { calories: 22, protein: '1.1g', fiber: '1.2g', vitaminC: '13.7mg' },
      cookingMethods: ['Salad', 'Sauce', 'Soup', 'Grilled'],
      seasonalAvailability: 'Year-round',
      origin: 'Local Farm',
      harvestDate: '2025-01-15',
      expiryDate: '2025-01-25',
      storageTips: 'Store at room temperature until ripe, then refrigerate'
    },
    {
      id: 2,
      name: 'Organic Apples',
      image: 'https://extension.umn.edu/sites/extension.umn.edu/files/Two%20apples%20close-up_screen.jpg',
      price: '$3.49/lb',
      nutrition: { calories: 95, protein: '0.5g', fiber: '4.4g', vitaminC: '8.4mg' },
      cookingMethods: ['Raw', 'Baking', 'Juice', 'Salad'],
      seasonalAvailability: 'Fall',
      origin: 'Himachal Farm',
      harvestDate: '2025-01-08',
      expiryDate: '2025-02-08',
      storageTips: 'Refrigerate in crisper drawer'
    },
    {
      id: 3,
      name: 'Sweet Corn',
      image: 'https://naturespath.com/cdn/shop/articles/growing_corn-948938.jpg?v=1725927714&width=2000',
      price: '$1.99/ear',
      nutrition: { calories: 88, protein: '3.2g', fiber: '2.7g', vitaminC: '6.8mg' },
      cookingMethods: ['Boiled', 'Grilled', 'Soup', 'Salad'],
      seasonalAvailability: 'Summer',
      origin: 'Local Farm',
      harvestDate: '2025-01-12',
      expiryDate: '2025-01-19',
      storageTips: 'Keep in husk and refrigerate'
    }
  ]

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const seasonalTips = [
    {
      season: 'Winter',
      tip: 'Root vegetables and winter squash are at their peak',
      products: ['Carrots', 'Potatoes', 'Squash', 'Onions']
    },
    {
      season: 'Spring',
      tip: 'Fresh greens and early vegetables are abundant',
      products: ['Spinach', 'Lettuce', 'Asparagus', 'Peas']
    },
    {
      season: 'Summer',
      tip: 'Berries, tomatoes, and corn are in season',
      products: ['Strawberries', 'Tomatoes', 'Corn', 'Zucchini']
    },
    {
      season: 'Fall',
      tip: 'Apples, pumpkins, and hearty vegetables',
      products: ['Apples', 'Pumpkins', 'Sweet Potatoes', 'Brussels Sprouts']
    }
  ]

  return (
    <div className="min-h-screen max-h-screen overflow-hidden bg-gradient-to-br from-[#F7F4EA] via-[#F0FDF4] to-[#EAF8EA] dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <Navbar user={user} onLogout={onLogout} theme={theme} setTheme={setTheme} onUpdateUser={onUpdateUser} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6 h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <motion.aside 
          initial={{ x: -20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ duration: 0.4 }} 
          className="hidden md:block w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 shadow-sm p-4 h-full sticky top-20 overflow-auto"
        >
          <nav className="space-y-2">
            {['products', 'seasonal', 'nutrition', 'recipes'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)} 
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === tab 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-gray-700 dark:text-emerald-100' 
                    : 'hover:bg-emerald-50 dark:hover:bg-gray-700 text-gray-700 dark:text-emerald-100/80'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
          
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-lime-50 dark:from-gray-800 dark:to-gray-700 border border-emerald-100 dark:border-gray-700">
            <p className="text-sm text-emerald-800 dark:text-emerald-200">Consumer Tip</p>
            <p className="text-xs text-emerald-700 mt-1 dark:text-emerald-300/80">Buy seasonal produce for better taste and value!</p>
          </div>
          
          <WeatherWidget />
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 h-full overflow-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-700 to-lime-600 bg-clip-text text-transparent">
              Welcome, {user?.name || 'Consumer'}!
            </h1>
            <p className="text-emerald-700/80 dark:text-emerald-200/80 mt-1">
              Discover fresh, nutritious products and cooking inspiration
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/90 dark:bg-gray-800/90 border border-emerald-200 dark:border-gray-700 rounded-xl text-emerald-900 dark:text-emerald-100 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              />
              <svg className="w-5 h-5 text-emerald-500 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </motion.div>

          {/* Content based on active tab */}
          <AnimatePresence mode="wait">
            {activeTab === 'products' && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-6 shadow-lg"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                    <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-3">
                      {product.price}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Origin:</p>
                        <p className="text-sm text-emerald-900 dark:text-emerald-100">{product.origin}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Season:</p>
                        <p className="text-sm text-emerald-900 dark:text-emerald-100">{product.seasonalAvailability}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Storage:</p>
                        <p className="text-sm text-emerald-900 dark:text-emerald-100">{product.storageTips}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Cooking Methods:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {product.cookingMethods.map((method, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-emerald-100 dark:bg-gray-700 text-emerald-700 dark:text-emerald-300 text-xs rounded-full"
                            >
                              {method}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'seasonal' && (
              <motion.div
                key="seasonal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {seasonalTips.map((season, index) => (
                  <motion.div
                    key={season.season}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-6 shadow-lg"
                  >
                    <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-3">
                      {season.season}
                    </h3>
                    <p className="text-emerald-700 dark:text-emerald-300 mb-4">
                      {season.tip}
                    </p>
                    <div>
                      <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70 mb-2">Available Products:</p>
                      <div className="flex flex-wrap gap-2">
                        {season.products.map((product, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-emerald-100 dark:bg-gray-700 text-emerald-700 dark:text-emerald-300 text-sm rounded-full"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'nutrition' && (
              <motion.div
                key="nutrition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-6 shadow-lg"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
                          {product.name}
                        </h3>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">
                          Per 100g serving
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(product.nutrition).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {value}
                          </p>
                          <p className="text-xs text-emerald-700/70 dark:text-emerald-300/70 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'recipes' && (
              <motion.div
                key="recipes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4">
                    Quick Recipe Ideas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">Fresh Tomato Salad</h4>
                      <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-2">
                        Combine fresh tomatoes with basil, mozzarella, and balsamic vinaigrette
                      </p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400">Prep time: 10 minutes</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">Grilled Corn</h4>
                      <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-2">
                        Grill corn in husk, then brush with butter and sprinkle with salt
                      </p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400">Cook time: 15 minutes</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default ConsumerDashboard
