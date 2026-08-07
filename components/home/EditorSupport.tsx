import Link from "next/link";

import { SectionHeading } from "@/components/home/SectionHeading";

/**
 * Which editors the develop predictor can read from and write back to.
 *
 * Mirrors the adapter registry in the CLI (`develop/adapters/`): ACR and
 * RapidRAW (0.7.0) are the adapters that exist, the rest are the queue.
 * Anything moved here must move there first — this table is a claim about
 * shipped code.
 */
const editors = [
  {
    name: "Lightroom Classic",
    detail: "Camera Raw and Bridge along with it — the same crs vocabulary, the same sidecars",
    state: "shipping",
  },
  {
    name: "RapidRAW",
    detail: "Shipped in 0.7.0 — a younger, faster host, with sidecars of its own",
    state: "shipping",
  },
  {
    name: "darktable",
    detail: "Its own module stack, in a namespace of its own",
    state: "queued",
  },
  {
    name: "RawTherapee",
    detail: "Sidecar profiles rather than XMP",
    state: "queued",
  },
  {
    name: "ON1 Photo RAW",
    detail: "Commercial, and asked for often enough to be on the list",
    state: "queued",
  },
  {
    name: "Capture One",
    detail: "Does not use XMP for adjustments at all — the hardest of the set",
    state: "queued",
  },
] as const;

const stateLabel = {
  shipping: "Supported today",
  queued: "Planned",
} as const;

export function EditorSupport() {
  return (
    <section className="border-b border-border-soft">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Editor support"
          title="Lightroom and RapidRAW today, one adapter at a time after that"
          description="Develop settings are not portable between editors, and no amount of file-format work makes them so: XMP is only a container, crs: is Adobe's private vocabulary inside it, and an exposure of +0.35 means whatever the host's pipeline says it means. So each editor gets its own adapter — and the adapter is the only part that has to know. The profile, the trained model and the evaluation stay in one vocabulary behind it."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {editors.map((editor) => (
            <div
              key={editor.name}
              className={`flex flex-col gap-2 rounded-2xl border p-5 ${
                editor.state === "shipping"
                  ? "border-accent/40 bg-accent-soft"
                  : "border-border-base bg-surface"
              }`}
            >
              <span
                className={`text-[10px] font-bold uppercase tracking-widest ${
                  editor.state === "shipping" ? "text-accent-soft-fg" : "text-subtle"
                }`}
              >
                {stateLabel[editor.state]}
              </span>
              <h3 className="text-[15px] font-bold text-fg">{editor.name}</h3>
              <p className="text-[13px] leading-relaxed text-muted">{editor.detail}</p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-subtle">
          The order is not fixed — what photographers actually ask for moves it.{" "}
          <Link href="/docs/roadmap" className="font-semibold text-link hover:text-link-hover">
            Read the direction →
          </Link>
        </p>
      </div>
    </section>
  );
}
