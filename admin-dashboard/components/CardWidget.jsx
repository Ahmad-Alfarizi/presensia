import React from 'react'

// Small stat card used on dashboard
export default function CardWidget({ title, value }){
  return (
    <div className="card">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
    </div>
  )
}
