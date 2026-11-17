import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { TeamMember } from '../data/portfolioData';

interface TeamMemberModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export function TeamMemberModal({ member, onClose }: TeamMemberModalProps) {
  useEffect(() => {
    if (!member) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [member, onClose]);

  if (!member) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="team-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-900 shadow-2xl sm:p-8 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-zinc-900 font-display text-lg font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
              {member.initials}
            </div>
            <div>
              <h2 id="team-modal-title" className="font-serif-editorial text-2xl font-semibold">
                {member.name}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {member.role} · {member.discipline}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close collaborator profile"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{member.bio}</p>

        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-zinc-200 pt-6 sm:grid-cols-2 dark:border-zinc-800">
          <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Primary Output</p>
            <p className="font-mono-spec mt-1 text-sm font-medium tabular-nums">{member.highlightMetric}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Featured Project</p>
            <p className="mt-1 text-sm font-semibold">{member.featuredProject}</p>
          </div>
        </div>

        <div className="mt-6 border-t border-zinc-200 pt-5 dark:border-zinc-800">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Specialties</p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            {member.focusAreas.join(' · ')}
          </p>
        </div>
      </div>
    </div>
  );
}
