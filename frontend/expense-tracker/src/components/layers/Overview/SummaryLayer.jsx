import React, { useState } from 'react'
import { useCardsData } from '../../../utils/data'

const SummaryLayer = () => {
  const { cardsData, loading } = useCardsData();

  if(loading) return(
    <p>Loading..</p>
  );

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6'>
      {cardsData.map((card, index) => (
        // <div className='bg-gradient-to-tr from-[#30cfd0] to-[#30cfd0]/30 rounded-xl transition-all shadow-lg shadow-[rgba(0,0,0,0.1)] border-1 border-[rgba(255,255,255,0.3)] border-b-[#30cfd0] border-l-[#30cfd0]' key={index}>
        <div className={`bg-gradient-to-tr rounded-xl transition-all shadow-md hover:shadow-lg shadow-gray-400/45`} 
         style={{
            backgroundImage: `linear-gradient(to top right, ${card.color1}, ${card.color2}4D)`, // 4D = 30% opacity
            // boxShadow: `0 4px 6px -1px ${card.color}4D`,
          }}
        key={index}
        >
          <div className='flex flex-col text-white px-4 md:px-6 py-3 md:py-4 md:gap-1'>
            <i className={`fa-solid fa-${card.icon} text-2xl md:text-3xl text-gray-600/40 p-1`}></i>
            <p className='text-sm font-semibold'>{card.name}</p>
            <p className='text-2xl md:text-3xl font-semibold mt-1 mb-2 tracking-wide'>
              ₹ {card.value.toLocaleString('en-IN')}.<span className='text-xs'>{card.value.toString().split('.')[1] || '00'}</span>
            </p>
            <p className='text-xs text-white/70'>
              <span className={`text-xs font-extrabold w-fit md:w-full px-2 py-1 mb-1 md:mb-0 md:mx-1 block md:inline bg-white/40 rounded-lg ${card.percent>=0?'text-green-700':'text-red-700'}`}>
              {card.percent>=0?'+':'-'} {Math.abs(card.percent)}% {card.percent>=0?'↗':'↙'}
              </span> 
               than last month
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SummaryLayer
