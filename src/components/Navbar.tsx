'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 left-0 right-0 w-full bg-black/50 backdrop-blur-sm z-50 border-b border-gray-800/50 opacity-0 animate-fade-in">
      <nav className="px-4 md:px-8 lg:px-16 py-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center w-full">
          <Link 
            href="/" 
            className="text-base md:text-lg font-medium hover:text-gray-300 transition-colors"
          >
            AM
          </Link>
          
          <ul className="flex items-center gap-3 sm:gap-4 md:gap-8 text-xs sm:text-sm md:text-base">
            <li>
              <Link 
                href="/about"
                className={`hover:text-gray-300 transition-colors whitespace-nowrap ${
                  pathname === '/about' ? 'text-white' : 'text-gray-400'
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                href="/projects"
                className={`hover:text-gray-300 transition-colors whitespace-nowrap ${
                  pathname === '/projects' ? 'text-white' : 'text-gray-400'
                }`}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link 
                href="/books"
                className={`hover:text-gray-300 transition-colors whitespace-nowrap ${
                  pathname === '/books' ? 'text-white' : 'text-gray-400'
                }`}
              >
                Books
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
