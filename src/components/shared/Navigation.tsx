'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/properties', label: 'Properties' },
  { href: '/investment', label: 'Investment' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out',
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-[#E2E8F0]'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group" aria-label="VestHaven Home">
          <span
            className={cn(
              'font-heading text-xl font-bold tracking-tight transition-colors duration-300',
              isScrolled ? 'text-[#0B192C]' : 'text-white'
            )}
          >
            Mari
            <span className="text-[#D4AF37]">Realty</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'relative text-sm font-medium tracking-wide transition-colors duration-200',
                    isActive
                      ? 'text-[#D4AF37]'
                      : isScrolled
                        ? 'text-[#475569] hover:text-[#0B192C]'
                        : 'text-white/80 hover:text-white',
                    isActive &&
                      'after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-[#D4AF37]'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-[#0B192C] shadow-md transition-all duration-200 hover:bg-[#C5A059] hover:shadow-lg active:scale-[0.98]"
          >
            <Phone className="h-4 w-4" />
            Book Consultation
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            'inline-flex items-center justify-center rounded-lg p-2 transition-colors duration-200 md:hidden',
            isScrolled
              ? 'text-[#0B192C] hover:bg-[#F8F9FA]'
              : 'text-white hover:bg-white/10'
          )}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={cn(
          'fixed inset-0 top-0 z-40 md:hidden transition-all duration-300 ease-out',
          isMobileMenuOpen ? 'visible' : 'invisible pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-black/50 transition-opacity duration-300',
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer Panel */}
        <div
          className={cn(
            'absolute right-0 top-0 h-full w-[300px] max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-out',
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-[#E2E8F0] px-6 py-4">
            <span className="font-heading text-lg font-bold text-[#0B192C]">
              Mari<span className="text-[#D4AF37]">Realty</span>
            </span>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-lg p-2 text-[#475569] transition-colors hover:bg-[#F8F9FA] hover:text-[#0B192C]"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Links */}
          <nav className="flex flex-col px-6 py-6">
            <ul className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200',
                        isActive
                          ? 'bg-[#D4AF37]/10 text-[#D4AF37]'
                          : 'text-[#475569] hover:bg-[#F8F9FA] hover:text-[#0B192C]'
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Drawer CTA */}
            <div className="mt-8 border-t border-[#E2E8F0] pt-6">
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#0B192C] shadow-md transition-all duration-200 hover:bg-[#C5A059] active:scale-[0.98]"
              >
                <Phone className="h-4 w-4" />
                Book Consultation
              </Link>
            </div>

            {/* Drawer Footer */}
            <p className="mt-8 text-center text-xs text-[#94A3B8]">
              Lagos State Reg. LSCS 18176
            </p>
          </nav>
        </div>
      </div>
    </header>
  );
}
