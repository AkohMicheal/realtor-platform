'use client';

import { useState, useId, useEffect } from 'react';
import { formatNaira, generateWhatsAppLink } from '@/lib/utils';
import { trackCalculatorUsed, trackWhatsAppClick } from '@/lib/tracking';
import { Calculator, ShieldCheck, ArrowRight, FileCheck, CheckCircle2 } from 'lucide-react';

const TENURE_OPTIONS = [6, 12, 18, 24] as const;
type Tenure = (typeof TENURE_OPTIONS)[number];

// Tier-based rates annualized
function getAnnualRate(principal: number): number {
  if (principal < 5_000_000) return 20;
  if (principal < 15_000_000) return 25;
  if (principal < 50_000_000) return 30;
  return 35;
}

export function YieldCalculator() {
  const [principal, setPrincipal] = useState<number>(5_000_000);
  const [tenure, setTenure] = useState<Tenure>(12);
  const sliderId = useId();

  const annualRate = getAnnualRate(principal);
  // Total Payout = Principal + (Principal × R/100 × T/12)
  const cashbackProfit = Math.round(principal * (annualRate / 100) * (tenure / 12));
  const totalPayout = principal + cashbackProfit;

  // Calculate maturity date inside useEffect to satisfy Next.js 16 prerender checks
  const [maturityDateStr, setMaturityDateStr] = useState<string>('Maturity Date');

  useEffect(() => {
    const maturity = new Date();
    maturity.setMonth(maturity.getMonth() + tenure);
    setMaturityDateStr(
      maturity.toLocaleDateString('en-NG', {
        month: 'short',
        year: 'numeric',
      })
    );
  }, [tenure]);

  const handlePrincipalChange = (val: number) => {
    setPrincipal(val);
    trackCalculatorUsed(val, tenure);
  };

  const handleTenureChange = (t: Tenure) => {
    setTenure(t);
    trackCalculatorUsed(principal, t);
  };

  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2348000000000';
  const whatsappMsg = `Hi, I am interested in the RECB Cashback Plan from your website calculator.\n\n• Capital: ${formatNaira(principal)}\n• Tenure: ${tenure} Months\n• Projected Returns: ${formatNaira(cashbackProfit)} (${annualRate}% p.a.)\n• Expected Total Payout: ${formatNaira(totalPayout)}\n• Target Maturity: ${maturityDateStr}\n\nPlease share verified scheme details and documentation.`;
  const whatsappUrl = generateWhatsAppLink(whatsappPhone, whatsappMsg);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xl md:p-8">
      {/* Decorative gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0B192C] via-[#D4AF37] to-[#10B981]" />

      <div className="flex items-center justify-between pb-6 border-b border-[#E2E8F0]">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#C5A059]">
            <Calculator className="h-3.5 w-3.5" /> RECB Cooperative Yield Estimator
          </span>
          <h2 className="mt-2 font-heading text-2xl font-bold text-[#0B192C] md:text-3xl">
            Calculate Your Returns
          </h2>
        </div>
        <div className="hidden sm:block text-right">
          <span className="text-xs uppercase tracking-wider text-[#94A3B8]">Lagos Reg.</span>
          <p className="font-mono text-xs font-semibold text-[#10B981]">LSCS 18176</p>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {/* Principal Input */}
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor={sliderId} className="text-sm font-semibold text-[#0F172A]">
              Investment Capital
            </label>
            <span className="font-heading text-xl font-bold text-[#0B192C]">
              {formatNaira(principal)}
            </span>
          </div>

          <input
            id={sliderId}
            type="range"
            min={1_000_000}
            max={100_000_000}
            step={500_000}
            value={principal}
            onChange={(e) => handlePrincipalChange(Number(e.target.value))}
            className="mt-3 w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
          />

          <div className="mt-2 flex justify-between text-xs text-[#94A3B8]">
            <span>₦1M (Min)</span>
            <span>₦25M</span>
            <span>₦50M</span>
            <span>₦100M+</span>
          </div>
        </div>

        {/* Tenure Selection */}
        <div>
          <label className="text-sm font-semibold text-[#0F172A]">Investment Tenure</label>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {TENURE_OPTIONS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleTenureChange(t)}
                className={`rounded-lg py-2.5 text-center text-sm font-semibold transition-all duration-200 ${
                  tenure === t
                    ? 'bg-[#0B192C] text-[#D4AF37] shadow-md ring-2 ring-[#D4AF37]'
                    : 'bg-[#F8F9FA] text-[#475569] hover:bg-slate-100 border border-[#E2E8F0]'
                }`}
              >
                {t} Mo
              </button>
            ))}
          </div>
        </div>

        {/* Yield Rate Tier Highlight */}
        <div className="rounded-xl bg-[#F8F9FA] border border-[#E2E8F0] p-4">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-[#475569]">Applicable Annual Yield Rate:</span>
            <span className="font-heading font-bold text-[#10B981] text-base">
              {annualRate}% p.a.
            </span>
          </div>
          <p className="mt-1 text-[11px] text-[#94A3B8]">
            Guaranteed asset-backed cooperative dividend governed by RECB bylaws.
          </p>
        </div>

        {/* Output Projection Card */}
        <div className="rounded-xl bg-gradient-to-br from-[#0B192C] to-[#132D4A] p-5 text-white shadow-lg">
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs text-slate-300">Net Cashback Profit</span>
              <p className="mt-1 font-heading text-lg font-bold text-[#D4AF37]">
                +{formatNaira(cashbackProfit)}
              </p>
            </div>
            <div>
              <span className="text-xs text-slate-300">Expected Maturity</span>
              <p className="mt-1 font-heading text-lg font-bold text-white">
                {maturityDateStr}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#94A3B8]">
                Total Guaranteed Payout
              </span>
              <p className="font-heading text-2xl sm:text-3xl font-extrabold text-[#D4AF37]">
                {formatNaira(totalPayout)}
              </p>
            </div>
            <span className="text-[11px] text-[#10B981] flex items-center gap-1 font-medium">
              <CheckCircle2 className="h-3.5 w-3.5" /> Capital + Dividend Backed
            </span>
          </div>
        </div>

        {/* Legal Documents Issued */}
        <div className="rounded-lg border border-[#10B981]/30 bg-[#10B981]/5 p-3.5">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
            <div className="text-xs text-[#0F172A] leading-relaxed">
              <strong className="text-[#10B981]">Legal Security Issued:</strong>
              <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-[#475569]">
                <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                  <FileCheck className="h-3 w-3 text-[#10B981]" /> Deed of Agreement
                </span>
                <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                  <FileCheck className="h-3 w-3 text-[#10B981]" /> Payment Receipt
                </span>
                <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                  <FileCheck className="h-3 w-3 text-[#10B981]" /> Post-Dated Cheque
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('YieldCalculator_Projection')}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 text-center font-heading text-sm sm:text-base font-bold text-white shadow-lg transition-all duration-200 hover:bg-[#20ba5a] hover:shadow-xl active:scale-[0.99]"
        >
          Send This Projection to My WhatsApp <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
