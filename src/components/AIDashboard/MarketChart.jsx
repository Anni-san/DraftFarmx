import React, { useMemo } from 'react'

const MarketChart = ({ role, crops = [] }) => {
  const chartData = useMemo(() => {
    // Generate dummy market data based on role
    const baseData = [
      { month: 'Jan', value: 85 },
      { month: 'Feb', value: 92 },
      { month: 'Mar', value: 78 },
      { month: 'Apr', value: 95 },
      { month: 'May', value: 88 },
      { month: 'Jun', value: 102 },
      { month: 'Jul', value: 115 },
      { month: 'Aug', value: 108 },
      { month: 'Sep', value: 125 },
      { month: 'Oct', value: 118 },
      { month: 'Nov', value: 135 },
      { month: 'Dec', value: 142 }
    ]

    // Adjust data based on role
    switch (role) {
      case 'Farmer':
        return baseData.map(item => ({ ...item, value: item.value * 0.8 }))
      case 'Consumer':
        return baseData.map(item => ({ ...item, value: item.value * 1.2 }))
      case 'Retailer':
        return baseData.map(item => ({ ...item, value: item.value * 1.1 }))
      default:
        return baseData
    }
  }, [role])

  const maxValue = Math.max(...chartData.map(d => d.value))
  const minValue = Math.min(...chartData.map(d => d.value))

  const getChartTitle = () => {
    switch (role) {
      case 'Farmer':
        return 'Crop Price Trends'
      case 'Consumer':
        return 'Product Price Trends'
      case 'Retailer':
        return 'Market Price Trends'
      default:
        return 'Market Trends'
    }
  }

  const getChartSubtitle = () => {
    switch (role) {
      case 'Farmer':
        return 'Track your crop prices over time'
      case 'Consumer':
        return 'Monitor product price fluctuations'
      case 'Retailer':
        return 'Analyze market price movements'
      default:
        return 'Market analysis and trends'
    }
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
          {getChartTitle()}
        </h3>
        <p className="text-sm text-emerald-700/80 dark:text-emerald-300/80">
          {getChartSubtitle()}
        </p>
      </div>

      <div className="relative h-48 w-full">
        {/* Chart container */}
        <div className="absolute inset-0 flex items-end justify-between px-2 pb-2">
          {chartData.map((data, index) => {
            const height = ((data.value - minValue) / (maxValue - minValue)) * 100
            const isLatest = index === chartData.length - 1
            
            return (
              <div key={data.month} className="flex flex-col items-center">
                {/* Bar */}
                <div 
                  className={`w-6 rounded-t-sm transition-all duration-300 ${
                    isLatest 
                      ? 'bg-emerald-500 shadow-lg' 
                      : 'bg-emerald-300/60 hover:bg-emerald-400'
                  }`}
                  style={{ height: `${Math.max(height, 5)}%` }}
                />
                
                {/* Month label */}
                <span className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                  {data.month}
                </span>
                
                {/* Value tooltip */}
                <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                    ${data.value}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-emerald-600 dark:text-emerald-400">
          <span>${maxValue}</span>
          <span>${Math.round((maxValue + minValue) / 2)}</span>
          <span>${minValue}</span>
        </div>
      </div>

      {/* Chart legend */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-300/60 rounded"></div>
            <span className="text-emerald-700 dark:text-emerald-300">Historical</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-500 rounded"></div>
            <span className="text-emerald-700 dark:text-emerald-300">Current</span>
          </div>
        </div>
        
        <div className="text-emerald-600 dark:text-emerald-400">
          {crops.length > 0 ? `${crops.length} crops tracked` : 'No crops available'}
        </div>
      </div>
    </div>
  )
}

export default MarketChart
