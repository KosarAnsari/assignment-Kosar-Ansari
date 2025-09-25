'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md w-full flex justify-between items-center px-6 py-3">
      <div className="text-xl font-bold text-gray-800">
        <Link href="/">WorkerApp</Link>
      </div>
      <ul className="flex gap-6 text-gray-700 font-medium">
        <li><Link href="/">Home</Link></li>
        <li><Link href="#workers">Workers</Link></li>
        <li><Link href="#about">About</Link></li>
      </ul>
    </nav>
  )
}
