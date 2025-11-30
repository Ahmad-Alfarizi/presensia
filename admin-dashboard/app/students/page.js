import React from 'react'
import { fetchStudents } from '../../lib/db'
import StatusBadge from '../../components/StatusBadge'

export default async function StudentsPage(){
  const res = await fetchStudents()
  const students = res.data

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Student ID</th>
                <th className="text-left p-2">Class</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id} className="border-t">
                  <td className="p-2">{s.name}</td>
                  <td className="p-2">{s.studentId}</td>
                  <td className="p-2">{s.class}</td>
                  <td className="p-2"><button className="text-blue-600">Edit</button> • <button className="text-red-600">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
