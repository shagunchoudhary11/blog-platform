import './globals.css';
import Link from 'next/link';

export const metadata = { title: 'My Blog', description: 'A cloud blog platform' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <Link href="/" className="brand">✍️ My Blog</Link>
          <div className="links">
            <Link href="/">Home</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/login">Login</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}