import { ShieldCheck, Building2, Landmark } from 'lucide-react';

const trustSignals = [
  {
    icon: ShieldCheck,
    label: 'Lagos State Reg. LSCS 18176',
    iconColor: 'text-[#10B981]',
  },
  {
    icon: Building2,
    label: 'Zylus Group Affiliate',
    iconColor: 'text-[#D4AF37]',
  },
  {
    icon: Landmark,
    label: 'Asset-Backed Investments',
    iconColor: 'text-[#D4AF37]',
  },
];

export function TrustBar() {
  return (
    <section
      className="border-y border-[#E2E8F0] bg-white"
      aria-label="Trust indicators"
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start gap-8 overflow-x-auto scrollbar-none md:justify-center md:gap-12">
          {trustSignals.map((signal) => {
            const Icon = signal.icon;
            return (
              <div
                key={signal.label}
                className="flex shrink-0 items-center gap-2.5"
              >
                <Icon className={`h-5 w-5 ${signal.iconColor}`} />
                <span className="whitespace-nowrap text-xs font-medium tracking-wide text-[#475569] sm:text-sm">
                  {signal.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
