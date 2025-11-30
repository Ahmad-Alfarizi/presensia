import React from 'react'

// ModalForm: reusable modal with header, body and actions (placeholder)
export default function ModalForm({ title, children, actions }){
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-30" />
      <div className="bg-white rounded-xl p-6 z-10 w-full max-w-lg">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="mt-4">{children}</div>
        <div className="mt-4 flex justify-end gap-2">{actions}</div>
      </div>
    </div>
  )
}
