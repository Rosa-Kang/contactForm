import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

const Navigation = () => {
    const router = useRouter();
    const navItems = [
        {href:'/contact', label:'Contact', },
        {href:'/messages', label:'Messages', }
    ]

    const isActive = (pathname: string) => {
        return router.pathname === pathname;
    }

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
            
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
              Contact Form App
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button (for future mobile menu) */}
          <div className="sm:hidden">
            <button className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation