import { FileCode, Ruler, ShieldCheck, SquareTerminal } from "lucide-react";

const principles = [
  {
    icon: Ruler,
    title: "A starting point, not a finished image",
    body: "The predictor gives you the global look you would have dialled in yourself. No local masks, no generative edits, no pretence that the frame is done — the work it saves is the first ten minutes of every photograph.",
  },
  {
    icon: ShieldCheck,
    title: "Nothing is ever deleted",
    body: "Originals stay untouched and edits go to sidecars. Rejects are moved, never removed; a failed checksum deletes the corrupt copy, never the source.",
  },
  {
    icon: FileCode,
    title: "No editor required",
    body: "The engine runs with no host editor installed, and hands its predictions over as files. An editor plugin is a thin front over it, never a dependency of it.",
  },
  {
    icon: SquareTerminal,
    title: "Built to be scripted",
    body: "Every command speaks --json and honours --dry-run, with meaningful exit codes, so it drops straight into scripts, cron and CI.",
  },
];

export function Principles() {
  return (
    <section className="border-b border-border-soft bg-bg-muted">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        {principles.map((principle) => (
          <div key={principle.title} className="space-y-2">
            <principle.icon className="size-5 text-accent" aria-hidden />
            <h3 className="text-sm font-bold text-fg">{principle.title}</h3>
            <p className="text-[13px] leading-relaxed text-muted">{principle.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
