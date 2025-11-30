import { redirect } from 'next/navigation';

// Redirect root path to dashboard
export default function Home() {
  redirect('/dashboard');
}