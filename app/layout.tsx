import './globals.css';
export const metadata = { title: 'Waseet+' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">Waseet+</div>
            <nav className="space-x-4 hidden md:block">
              <a href="/" className="text-gray-700">Home</a>
              <a href="/about" className="text-gray-700">About</a>
              <a href="/contact" className="text-gray-700">Contact</a>
              <a href="/admin" className="text-gray-700">Admin</a>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  )
}
