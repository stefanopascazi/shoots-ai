import { Check, CloudOff, Cpu, WalletMinimal, X } from "lucide-react";

import { SectionHeading } from "@/components/home/SectionHeading";

/**
 * The positioning section: assisted-develop tooling as a category is cloud-bound,
 * and that is the thing shoots does differently. Deliberately describes the
 * category rather than naming products.
 */
const contrast = [
  {
    subject: "Where your photographs go",
    cloud: "Uploaded to someone else's servers before anything is predicted",
    local: "Nowhere. They are read from the disk they already sit on",
  },
  {
    subject: "Where the model lives",
    cloud: "A shared model, hosted, versioned and changed without you",
    local: "A profile file in ~/.shoots, fitted on your catalog, yours to keep",
  },
  {
    subject: "What it costs to run",
    cloud: "A subscription, or credits priced per image",
    local: "Nothing — no subscription, no per-image cost",
  },
  {
    subject: "What happens offline",
    cloud: "Nothing works",
    local: "Everything works",
  },
];

const pillars = [
  {
    icon: CloudOff,
    title: "Nothing is uploaded",
    body: "Not the RAWs, not the previews, not the profile you trained. There is no server to send them to — the tool has no network path for your images at all.",
  },
  {
    icon: Cpu,
    title: "The training is yours",
    body: "The profile is fitted on your machine from your own edits, and lands as a file you own. Nobody else's taste is baked into it, and it does not change under you.",
  },
  {
    icon: WalletMinimal,
    title: "Free, and no subscription",
    body: "Every command on this page is free to run, with no account and no per-image credits. Use of the source is governed by the project licence.",
  },
];

export function LocalFirst() {
  return (
    <section className="border-b border-border-soft">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Local by design"
          title="AI-assisted developing, without the upload"
          description="Tools that predict your edits generally work by sending your catalog to a cloud service and renting the result back to you. That is a reasonable way to build one — it is just not this one. shoots does the same job with the inference on your own hardware, which changes what you have to hand over to get it."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col gap-2.5 rounded-2xl border border-border-base bg-surface p-5"
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent-soft-fg">
                <pillar.icon className="size-4" aria-hidden />
              </span>
              <h3 className="text-[15px] font-bold text-fg">{pillar.title}</h3>
              <p className="text-[13px] leading-relaxed text-muted">{pillar.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-border-base bg-surface">
          <table className="w-full min-w-[40rem] border-collapse text-left text-[13px]">
            <thead>
              <tr className="border-b border-border-soft">
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-widest text-subtle">
                  &nbsp;
                </th>
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-widest text-subtle">
                  A hosted service
                </th>
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-widest text-accent-soft-fg">
                  shoots
                </th>
              </tr>
            </thead>
            <tbody>
              {contrast.map((row) => (
                <tr key={row.subject} className="border-b border-border-soft last:border-0">
                  <th
                    scope="row"
                    className="px-5 py-3.5 align-top font-semibold text-fg"
                  >
                    {row.subject}
                  </th>
                  <td className="px-5 py-3.5 align-top text-muted">
                    <span className="flex gap-2">
                      <X className="mt-0.5 size-3.5 shrink-0 text-subtle" aria-hidden />
                      {row.cloud}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 align-top text-fg">
                    <span className="flex gap-2">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden />
                      {row.local}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
