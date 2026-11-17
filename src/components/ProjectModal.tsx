import { useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquire: (projectTitle: string) => void;
}

export function ProjectModal({ project, onClose, onInquire }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white text-zinc-900 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-200 bg-white/95 px-6 py-4 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/95">
          <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="font-mono-spec tabular-nums">{project.code}</span>
            <span aria-hidden="true">·</span>
            <span>{project.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-spec tabular-nums">{project.year}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
            <ResilientImage
              src={project.imageUrl}
              alt={project.title}
              title={project.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <h2 id="project-modal-title" className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {project.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                {project.description}
              </p>

              <div className="mt-6 border-t border-zinc-200 pt-6 dark:border-zinc-800">
                <h3 className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
                  Measured Outcome
                </h3>
                <p className="font-serif-editorial mt-2 text-xl italic text-zinc-900 dark:text-zinc-100">
                  {project.outcomeMetric}
                </p>
              </div>
            </div>

            <div className="space-y-6 border-t border-zinc-200 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8 dark:border-zinc-800">
              <div>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Client</p>
                <p className="mt-1 text-sm font-semibold">{project.client}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Lead Collaborator</p>
                <p className="font-serif-editorial mt-1 text-base font-medium">{project.leadContributor}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Deliverables</p>
                <ul className="mt-2 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
                  {project.deliverables.map((item) => (
                    <li key={item}>· {item}</li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() => {
                  onInquire(project.title);
                  onClose();
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] whitespace-nowrap shrink-0"
              >
                <span>Discuss Similar Project</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
