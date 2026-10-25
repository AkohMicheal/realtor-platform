'use client';

import { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  Phone,
  Calendar,
  X,
  Share2,
} from 'lucide-react';
import { InstagramIcon } from '@/components/ui/InstagramIcon';
import { trackWhatsAppClick } from '@/lib/tracking';
import { generateWhatsAppLink } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/constants';

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const phone = SITE_CONFIG.phone;
  const whatsappUrl = generateWhatsAppLink(
    phone,
    `Hello ${SITE_CONFIG.consultantName}, I am reaching out from your website. I would like more information on your verified property investments and RECB cashback schemes.`
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const channels = [
    {
      label: 'Chat on WhatsApp',
      subtext: 'Instant response (Active)',
      href: whatsappUrl,
      icon: MessageCircle,
      bg: 'bg-[#25D366] text-white hover:bg-[#20ba5a]',
      onClick: () => trackWhatsAppClick('FloatingContact_WhatsApp'),
    },
    {
      label: 'Direct Phone Call',
      subtext: SITE_CONFIG.phoneDisplay,
      href: `tel:+${phone}`,
      icon: Phone,
      bg: 'bg-[#0B192C] text-white hover:bg-[#132D4A]',
      onClick: () => {},
    },
    {
      label: 'Schedule Zoom Review',
      subtext: '15-min diaspora consultation',
      href: '/contact#schedule',
      icon: Calendar,
      bg: 'bg-[#D4AF37] text-[#0B192C] hover:bg-[#C5A059]',
      onClick: () => {},
    },
    {
      label: 'Instagram Direct',
      subtext: '@mari.realty',
      href: 'https://instagram.com/marirealty',
      icon: InstagramIcon,
      bg: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white hover:opacity-90',
      onClick: () => {},
    },
  ];

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Menu */}
      {isOpen && (
        <div className="mb-3 w-72 origin-bottom-right animate-in fade-in slide-in-from-bottom-4 duration-200 rounded-2xl border border-[#E2E8F0] bg-white p-3 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5 px-2">
            <div>
              <p className="font-heading text-xs font-bold uppercase tracking-wider text-[#0B192C]">
                Direct Realtor Access
              </p>
              <p className="text-[11px] text-[#94A3B8]">Typically replies within 15 mins</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-[#94A3B8] hover:bg-slate-100 hover:text-[#0F172A]"
              aria-label="Close contact drawer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-2 space-y-1.5">
            {channels.map((ch, idx) => {
              const Icon = ch.icon;
              return (
                <a
                  key={idx}
                  href={ch.href}
                  target={ch.href.startsWith('http') ? '_blank' : undefined}
                  rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  onClick={() => {
                    ch.onClick();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 rounded-xl p-2.5 transition-colors duration-150 hover:bg-[#F8F9FA]"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm ${ch.bg}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#0B192C] truncate">{ch.label}</p>
                    <p className="text-[10px] text-[#94A3B8] truncate">{ch.subtext}</p>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="mt-2 border-t border-[#E2E8F0] pt-2 px-2 text-center">
            <span className="text-[10px] font-mono text-[#10B981]">
              ● Licensed RECB Agent LSCS 18176
            </span>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Contact options"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37] text-[#0B192C] shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#C5A059] focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/40"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#10B981] border-2 border-white" />
        </span>

        {isOpen ? (
          <X className="h-6 w-6 text-[#0B192C] transition-transform duration-200" />
        ) : (
          <MessageCircle className="h-6 w-6 text-[#0B192C] transition-transform duration-200 group-hover:rotate-12" />
        )}
      </button>
    </div>
  );
}
