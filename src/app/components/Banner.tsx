import React from 'react'

export default function Banner() {
  return (
    <div className="bg-white rounded-lg p-4 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/images/cupcake.jpg" alt="Dessert" className="w-20 h-20 object-cover rounded-lg" />
              <div>
                <h3 className="font-semibold text-lg">Get dessert FOR FREE!</h3>
                <p className="text-gray-500">Make your first order for $50 and get dessert from our bakery for free!</p>
              </div>
            </div>
            <button className="text-pink-500">Learn more →</button>
          </div>
  )
}
