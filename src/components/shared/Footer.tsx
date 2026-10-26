'use client';

import Link from 'next/link';
import {
  MessageCircle,
  AtSign,
  Mail,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import { InstagramIcon } from '@/components/ui/InstagramIcon';
import { SITE_CONFIG } from '@/lib/constants';

const quickLinks = [
  { href: '/properties', label: 'Properties' },
  { href: '/investment', label: 'Investment Plans' },
  { href: '/about', label: 'About Mary Akoh' },
  { href: '/contact', label: 'Contact' },
  { href: '/investment#faq', label: 'FAQ' },
];

const socialLinks = [
  {
    href: SITE_CONFIG.whatsappUrl,
    label: 'WhatsApp',
    icon: MessageCircle,
  },
  {
    href: SITE_CONFIG.socials.instagram,
    label: 'Instagram',
    icon: InstagramIcon,
  },
  {
    href: SITE_CONFIG.socials.x,
    label: `X (${SITE_CONFIG.twitterHandle})`,
    icon: AtSign,
  },
  {
    href: `mailto:${SITE_CONFIG.email}`,
    label: 'Email',
    icon: Mail,
  },
];

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[#0B192C] text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl font-bold tracking-tight">
                <span className="text-[#D4AF37]">Mari</span>Realty
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-slate-300">
              Secure investments. Verified assets. Trusted advisory.
            </p>
            <div className="inline-flex items-center gap-2 rounded-lg border border-[#10B981]/30 bg-[#10B981]/10 px-4 py-2">
              <ShieldCheck className="h-4 w-4 text-[#10B981]" />
              <span className="text-xs font-medium text-[#10B981]">
                LSCS 18176 — Lagos State Registered
              </span>
            </div>
            <div className="flex items-start gap-2 text-slate-400">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
              <p className="text-xs leading-relaxed">
                Lagos, Nigeria
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-[#D4AF37]">
              Quick Links
            </h3>
            <ul className="mt-6 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 transition-colors duration-200 hover:text-[#D4AF37]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-[#D4AF37]">
              Connect
            </h3>
            <ul className="mt-6 space-y-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-sm text-slate-300 transition-colors duration-200 hover:text-[#D4AF37]"
                    >
                      <Icon className="h-4 w-4" />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <p className="text-xs text-slate-400">
              &copy; {currentYear} MariRealty. All rights reserved.
            </p>
            <p className="max-w-lg text-[10px] leading-relaxed text-slate-500">
              Investment in real estate involves risks. Past performance does not guarantee
              future results. MariRealty is a registered real estate advisory firm and also a
              financial advisor, but we recommend that you conduct independent due diligence
              before making any investment decision.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
