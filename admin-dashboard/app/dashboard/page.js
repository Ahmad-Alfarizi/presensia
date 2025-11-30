import React from 'react'
import CardWidget from '../../components/CardWidget'

export default function DashboardPage(){
  // Placeholder stats
  const stats = [
    { title: 'Today Present', value: '124' },
    { title: 'Total Students', value: '420' },
    { title: 'Present %', value: '29.5%' }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s, i) => <CardWidget key={i} title={s.title} value={s.value} />)}
      </div>
      <div className="card">Charts placeholder</div>
    </div>
  )
}
