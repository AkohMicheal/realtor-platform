import { ImageOff, FileText, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaPlaceholderProps {
  type?: 'image' | 'video' | 'document';
  aspectRatio?: 'video' | 'portrait' | 'square';
  label?: string;
  subtext?: string;
  className?: string;
}

const aspectClasses = {
  video: 'aspect-[16/9]',
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
};

const icons = {
  image: ImageOff,
  video: Video,
  document: FileText,
};

export function MediaPlaceholder({
  type = 'image',
  aspectRatio = 'video',
  label = 'Asset Awaiting Upload',
  subtext = 'Specifications and verified imagery available upon request',
  className = '',
}: MediaPlaceholderProps) {
  const Icon = icons[type];

  return (
    <div
      role="region"
      aria-label={label}
      className={cn(
        'relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#0B192C] via-[#071322] to-[#040B14] border border-slate-800/80 flex flex-col items-center justify-center p-6 text-center shadow-inner',
        aspectClasses[aspectRatio],
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center space-y-2">
        <div className="p-3 rounded-full bg-slate-900/90 border border-slate-700/60 shadow-md">
          <Icon className="w-8 h-8 text-amber-400/60" />
        </div>
        <p className="text-sm font-medium text-slate-200 tracking-wide">{label}</p>
        {subtext && (
          <p className="text-xs text-slate-400 max-w-xs leading-relaxed">{subtext}</p>
        )}
      </div>

      <div className="absolute bottom-3 right-3 text-[10px] font-mono tracking-wider uppercase text-amber-400/40">
        RECB / Verified Asset
      </div>
    </div>
  );
}
