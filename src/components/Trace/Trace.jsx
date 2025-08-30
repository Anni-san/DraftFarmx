import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BatchDetails from './BatchDetails'
import SearchFilters from './SearchFilters'
import SupplyChainGraph from './SupplyChainGraph'

// Sample supply chain data with different stages
const sampleBatches = [
  {
    id: 'BATCH001',
    cropName: 'Wheat',
    origin: 'Punjab Farm',
    location: 'Mumbai Warehouse',
    status: 'in_transit',
    handler: 'Transport Co.',
    harvestDate: '2025-01-15T08:00:00Z',
    expiryDate: '2025-06-15T08:00:00Z',
    timestamp: '2025-01-20T10:30:00Z',
    image: 'https://images.stockcake.com/public/c/3/b/c3b57717-fa0c-467f-92a1-91b4571ed968_large/harvesting-wheat-crop-stockcake.jpg',
    supplyChain: [
      { stage: 'Harvested', location: 'Punjab Farm', timestamp: '2025-01-15T08:00:00Z', handler: 'Farmer Singh' },
      { stage: 'Shipped', location: 'Mumbai Warehouse', timestamp: '2025-01-20T10:30:00Z', handler: 'Transport Co.' }
    ]
  },
  {
    id: 'BATCH002',
    cropName: 'Tomato',
    origin: 'Maharashtra Farm',
    location: 'Delhi Processing Center',
    status: 'processing',
    handler: 'Fresh Foods Ltd.',
    harvestDate: '2025-01-10T06:00:00Z',
    expiryDate: '2025-03-25T06:00:00Z',
    timestamp: '2025-01-18T14:20:00Z',
    image: 'https://agricultureguruji.com/wp-content/uploads/2018/09/tomato-2643774_1280.jpg.webp',
    supplyChain: [
      { stage: 'Harvested', location: 'Maharashtra Farm', timestamp: '2025-01-10T06:00:00Z', handler: 'Farmer Patel' },
      { stage: 'Shipped', location: 'Delhi Processing Center', timestamp: '2025-01-18T14:20:00Z', handler: 'Fresh Foods Ltd.' },
      { stage: 'Processing', location: 'Delhi Processing Center', timestamp: '2025-01-19T09:00:00Z', handler: 'Quality Control Team' }
    ]
  },
  {
    id: 'BATCH003',
    cropName: 'Mango',
    origin: 'Gujarat Farm',
    location: 'Ahmedabad Retail Store',
    status: 'delivered',
    handler: 'Fruit Mart',
    harvestDate: '2025-01-05T07:00:00Z',
    expiryDate: '2025-05-10T07:00:00Z',
    timestamp: '2025-01-25T16:45:00Z',
    image: 'https://www.renature.co/wp-content/uploads/2024/11/mango-reNature.jpg',
    supplyChain: [
      { stage: 'Harvested', location: 'Gujarat Farm', timestamp: '2025-01-05T07:00:00Z', handler: 'Farmer Desai' },
      { stage: 'Shipped', location: 'Ahmedabad Warehouse', timestamp: '2025-01-12T11:15:00Z', handler: 'Logistics Co.' },
      { stage: 'Processing', location: 'Ahmedabad Processing', timestamp: '2025-01-18T13:30:00Z', handler: 'Packaging Team' },
      { stage: 'Delivered', location: 'Ahmedabad Retail Store', timestamp: '2025-01-25T16:45:00Z', handler: 'Fruit Mart' }
    ]
  },
  {
    id: 'BATCH004',
    cropName: 'Rice',
    origin: 'Haryana Farm',
    location: 'Delhi Wholesale Market',
    status: 'in_transit',
    handler: 'Grain Traders',
    harvestDate: '2025-01-20T09:00:00Z',
    expiryDate: '2025-05-20T09:00:00Z',
    timestamp: '2025-01-22T12:00:00Z',
    image: 'https://eos.com/wp-content/uploads/2023/04/rice-with-green-leaves.jpg.webp',
    supplyChain: [
      { stage: 'Harvested', location: 'Haryana Farm', timestamp: '2025-01-20T09:00:00Z', handler: 'Farmer Kumar' },
      { stage: 'Shipped', location: 'Delhi Wholesale Market', timestamp: '2025-01-22T12:00:00Z', handler: 'Grain Traders' }
    ]
  },
  {
    id: 'BATCH005',
    cropName: 'Apple',
    origin: 'Himachal Farm',
    location: 'Consumer Home',
    status: 'delivered',
    handler: 'Home Delivery',
    harvestDate: '2025-01-08T10:00:00Z',
    expiryDate: '2026-01-20T10:00:00Z',
    timestamp: '2025-01-30T18:00:00Z',
    image: 'https://extension.umn.edu/sites/extension.umn.edu/files/Two%20apples%20close-up_screen.jpg',
    supplyChain: [
      { stage: 'Harvested', location: 'Himachal Farm', timestamp: '2025-01-08T10:00:00Z', handler: 'Farmer Sharma' },
      { stage: 'Shipped', location: 'Delhi Warehouse', timestamp: '2025-01-15T14:00:00Z', handler: 'Cold Storage Co.' },
      { stage: 'Processing', location: 'Delhi Processing', timestamp: '2025-01-20T16:00:00Z', handler: 'Quality Team' },
      { stage: 'Delivered', location: 'Retail Store', timestamp: '2025-01-25T12:00:00Z', handler: 'Supermarket' },
      { stage: 'Purchased', location: 'Consumer Home', timestamp: '2025-01-30T18:00:00Z', handler: 'Home Delivery' }
    ]
  }
]

const Trace = ({ user }) => {
  const [batches, setBatches] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('all')
  const [selectedBatch, setSelectedBatch] = useState(null)
  const [viewMode, setViewMode] = useState('graph') // 'graph' or 'list'
  const [showBatchDetails, setShowBatchDetails] = useState(false)

  useEffect(() => {
    // Load batches from localStorage or use sample data
    const storedBatches = localStorage.getItem('traceBatches')
    if (storedBatches && JSON.parse(storedBatches).length > 0) {
      setBatches(JSON.parse(storedBatches))
    } else {
      setBatches(sampleBatches)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('traceBatches', JSON.stringify(batches))
  }, [batches])

  // Filter batches based on search and filters
  const filteredBatches = useMemo(() => {
    return batches.filter(batch => {
      const matchesSearch = searchQuery === '' || 
        batch.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        batch.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        batch.origin.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || batch.status === statusFilter
      const matchesLocation = locationFilter === 'all' || 
        batch.location.toLowerCase().includes(locationFilter.toLowerCase())
      
      return matchesSearch && matchesStatus && matchesLocation
    })
  }, [batches, searchQuery, statusFilter, locationFilter])

  const handleBatchClick = (batch) => {
    setSelectedBatch(batch)
    setShowBatchDetails(true)
  }

  const handleCloseBatchDetails = () => {
    setShowBatchDetails(false)
    setSelectedBatch(null)
  }

  const getSupplyChainStats = () => {
    const totalBatches = batches.length
    const inTransit = batches.filter(b => b.status === 'in_transit').length
    const processing = batches.filter(b => b.status === 'processing').length
    const delivered = batches.filter(b => b.status === 'delivered').length

    return { totalBatches, inTransit, processing, delivered }
  }

  const stats = getSupplyChainStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F4EA] via-[#F0FDF4] to-[#EAF8EA] dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-700 to-lime-600 bg-clip-text text-transparent">
            Supply Chain Trace
          </h1>
          <p className="text-emerald-700/80 dark:text-emerald-200/80 mt-2">
            Track your products from farm to consumer with complete transparency
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-xl border border-emerald-100 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Total Batches</p>
                <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{stats.totalBatches}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-emerald-600 dark:text-emerald-400 text-xl">📦</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-xl border border-emerald-100 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">In Transit</p>
                <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{stats.inTransit}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-emerald-600 dark:text-emerald-400 text-xl">🚚</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-xl border border-emerald-100 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Processing</p>
                <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{stats.processing}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 text-xl">⚙️</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-xl border border-emerald-100 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Delivered</p>
                <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{stats.delivered}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 text-xl">✅</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <SearchFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
          />
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-6"
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-xl border border-emerald-100 dark:border-gray-700 p-1">
            <div className="flex">
              <button
                onClick={() => setViewMode('graph')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'graph'
                    ? 'bg-emerald-600 text-white'
                    : 'text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-gray-700'
                }`}
              >
                📊 Graph View
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-emerald-600 text-white'
                    : 'text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-gray-700'
                }`}
              >
                📋 List View
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 shadow-lg"
        >
          {viewMode === 'graph' ? (
            <div className="h-[600px] p-6">
              <SupplyChainGraph
                batches={filteredBatches}
                onNodeClick={handleBatchClick}
                selectedBatch={selectedBatch}
              />
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBatches.map((batch) => (
                  <motion.div
                    key={batch.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleBatchClick(batch)}
                    className="bg-white/90 dark:bg-gray-700/90 rounded-xl border border-emerald-200 dark:border-gray-600 p-4 cursor-pointer hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-emerald-900 dark:text-emerald-100">
                          {batch.cropName}
                        </h3>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">
                          {batch.id}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        batch.status === 'in_transit' ? 'bg-emerald-100 text-emerald-800' :
                        batch.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {batch.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    
                    <img 
                      src={batch.image} 
                      alt={batch.cropName}
                      className="w-full h-24 object-cover rounded-lg mb-3"
                    />
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-emerald-700/70 dark:text-emerald-300/70">Origin:</span>
                        <span className="text-emerald-900 dark:text-emerald-100">{batch.origin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-700/70 dark:text-emerald-300/70">Location:</span>
                        <span className="text-emerald-900 dark:text-emerald-100">{batch.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-700/70 dark:text-emerald-300/70">Handler:</span>
                        <span className="text-emerald-900 dark:text-emerald-100">{batch.handler}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Batch Details Modal */}
      <AnimatePresence>
        {showBatchDetails && selectedBatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseBatchDetails}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <BatchDetails batch={selectedBatch} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Trace
