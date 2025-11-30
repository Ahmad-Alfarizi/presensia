import React from 'react'

// TopNav: simple header with search and avatar
export default function TopNav(){
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <button className="p-2 rounded hover:bg-gray-100">☰</button>
        <div className="text-lg font-bold">Dashboard</div>
      </div>
      <div className="flex items-center gap-4">
        <input placeholder="Search students, classes..." className="rounded-md p-2 border-gray-200 shadow-sm" />
        <div className="w-9 h-9 bg-gray-200 rounded-full" />
      </div>
    </header>
  )
}
