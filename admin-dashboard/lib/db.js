// db.js - placeholder for API helpers / data fetching utilities
// Replace with real API client (fetch/axios) and auth tokens
export async function fetchStudents(page = 1){
  // Placeholder: return mock data
  return {
    data: [
      { id: 1, name: 'Aisha Rahman', studentId: 'S1001', class: 'Computer Science' },
      { id: 2, name: 'Budi Santoso', studentId: 'S1002', class: 'Mathematics' }
    ],
    meta: { page, total: 2 }
  }
}
