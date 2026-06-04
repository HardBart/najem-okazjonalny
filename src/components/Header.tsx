'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, KeyRound } from 'lucide-react';
import Button from './Button';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const navigation = [
    { name: 'Jak to działa', href: '/#jak-to-dziala' },
    { name: 'Pakiety', href: '/#pakiety' },
    { name: 'Dla wynajmujących', href: '/dla-wynajmujacych' },
    { name: 'Dla firm', href: '/obsluga-wielu-lokali' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/#faq' },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-navy-900 rounded-lg flex items-center justify-center">
              <KeyRound className="w-5 h-5 text-gold-500" />
            </div>
            <span className="text-xl font-bold text-navy-900 hidden sm:block">
              Najem Okazjonalny
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-navy-800 hover:text-navy-900 font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="primary" size="sm" onClick={() => router.push('/zamowienie')}>
              Zamów teraz
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-navy-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-navy-100">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-navy-800 hover:text-navy-900 font-medium px-4 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-4 pt-4 border-t border-navy-100">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    setMobileMenuOpen(false);
                    router.push('/zamowienie');
                  }}
                >
                  Zamów teraz
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
