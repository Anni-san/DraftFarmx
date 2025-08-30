import React, { useMemo } from 'react'

const roleToQuestions = {
  Farmer: [
    {
      q: 'Which crop is best to grow now given current weather, soil, and market?',
      a: 'Considering recent rainfall, loamy soil, and rising demand, Corn and Wheat look optimal for the next 6–8 weeks.'
    },
    {
      q: 'Which crop will yield the maximum profit this season?',
      a: 'Based on price momentum and input costs, Tomatoes show the highest profit margin; Mango has strong mid-season upside.'
    }
  ],
  Consumer: [
    {
      q: 'Which available crop will last longest and offer maximum value?',
      a: 'Apples and Potatoes have higher shelf-life; current deals on Onions and Bananas maximize value.'
    }
  ],
  Retailer: [
    {
      q: 'Which crops to sell in each state for maximum profit?',
      a: 'South and West show elevated demand for Mango; North-East trending toward Potatoes and Onions at improved margins.'
    }
  ],
  Wholesaler: [
    {
      q: 'How much crop should be distributed to each state?',
      a: 'Allocate 30% Corn to West, 25% Wheat to North, 20% Rice to South; hold 10% for surge demand.'
    }
  ]
}

const HotQuestions = ({ role = 'Farmer' }) => {
  const items = useMemo(() => roleToQuestions[role] || [], [role])

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">Hot Questions</h3>
        <button className="text-sm text-emerald-700 dark:text-emerald-200 hover:underline">Ask more</button>
      </div>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-emerald-50/60 dark:bg-gray-700/60 border border-emerald-100 dark:border-gray-700">
            <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">{item.q}</p>
            <p className="text-sm text-emerald-700/90 dark:text-emerald-300/90 mt-1">{item.a}</p>
            <div className="mt-2 flex gap-2">
              <button className="text-xs px-2 py-1 rounded-lg bg-white dark:bg-gray-800 border border-emerald-100 dark:border-gray-700 text-emerald-700 dark:text-emerald-200">See chart</button>
              <button className="text-xs px-2 py-1 rounded-lg bg-emerald-600 text-white">Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HotQuestions




