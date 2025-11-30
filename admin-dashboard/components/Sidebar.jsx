import React from 'react'

// Sidebar: simple vertical nav for admin dashboard
export default function Sidebar(){
  return (
    <aside className="w-64 p-4 border-r h-screen bg-white">
      <div className="mb-6">
        <h2 className="text-lg font-bold">Presensia</h2>
        <p className="text-sm text-gray-500">Admin</p>
      </div>
      <nav className="space-y-2 text-sm">
        <a className="block py-2 px-2 rounded hover:bg-gray-50">Dashboard</a>
        <a className="block py-2 px-2 rounded hover:bg-gray-50">Students</a>
        <a className="block py-2 px-2 rounded hover:bg-gray-50">Teachers</a>
        <a className="block py-2 px-2 rounded hover:bg-gray-50">Classes</a>
        <a className="block py-2 px-2 rounded hover:bg-gray-50">Attendance</a>
        <a className="block py-2 px-2 rounded hover:bg-gray-50">Reports</a>
        <a className="block py-2 px-2 rounded hover:bg-gray-50">Settings</a>
      </nav>
    </aside>
  )
}
