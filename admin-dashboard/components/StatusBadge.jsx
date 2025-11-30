import React from 'react'

// StatusBadge: Present / Late / Absent small pill
export default function StatusBadge({ status }){
  const map = {
    Present: 'bg-green-100 text-green-700',
    Late: 'bg-yellow-100 text-yellow-700',
    Absent: 'bg-red-100 text-red-700'
  }
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${map[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  )
}
