// Lightweight mock API for the mobile app. Replace with real axios client when backend is available.
// Provides async functions that simulate network latency and return realistic shapes.

const wait = (ms = 600) => new Promise((res) => setTimeout(res, ms));

export async function login(email, password) {
  await wait(700);
  // Very small validation for mock
  if (!email || !password) {
    throw new Error('Invalid credentials');
  }
  // Return mock token and user
  return {
    token: 'mock-token-abc-123',
    user: { name: 'Student Example', email, avatar: 'https://via.placeholder.com/96' }
  };
}

export async function fetchTodayClasses() {
  await wait(400);
  return [
    { id: 1, title: 'Introduction to Algorithms', time: '09:00 - 10:30', location: 'Room A1' },
    { id: 2, title: 'Mobile App Development', time: '11:00 - 12:30', location: 'Lab 3' }
  ];
}

export async function fetchAttendanceHistory() {
  await wait(400);
  return [
    { id: 1, date: '2025-11-04', subject: 'Algorithms', time: '09:00', status: 'Present' },
    { id: 2, date: '2025-11-03', subject: 'Mobile App', time: '11:00', status: 'Late' },
    { id: 3, date: '2025-11-02', subject: 'Math', time: '08:00', status: 'Absent' }
  ];
}

export default {
  login,
  fetchTodayClasses,
  fetchAttendanceHistory
};
