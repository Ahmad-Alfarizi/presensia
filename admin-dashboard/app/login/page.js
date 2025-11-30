import React from 'react'

// Simple admin login page placeholder
export default function LoginPage(){
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md card">
        <h1 className="text-2xl font-bold mb-4">Admin Sign in</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" placeholder="admin@school.edu" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" placeholder="Password" />
          </div>
          <button className="w-full bg-primary text-white py-2 rounded-md">Sign in</button>
        </form>
      </div>
    </div>
  )
}
