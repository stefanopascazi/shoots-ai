import meta from "@/content/meta.json";

export const site = {
  name: "shoots",
  tagline: "Your own develop style, learned locally and predicted on the next shoot.",
  description:
    "shoots trains a develop profile on the catalog you have already edited, then predicts a per-image starting point for photographs it has never seen — as XMP sidecars your editor reads. Culling, star ratings, offload and metadata around it. All of it on your own machine: nothing is uploaded, and there is no subscription.",
  url: "https://github.com/stefanopascazi/shoots",
  version: meta.version,
  repo: "https://github.com/stefanopascazi/shoots",
  repoBlob: "https://github.com/stefanopascazi/shoots/blob/main",
  releases: "https://github.com/stefanopascazi/shoots/releases/latest",
  author: "Stefano Pascazi",
  email: "stefanopascazi@gmail.com",
  license: {
    name: "PolyForm Noncommercial 1.0.0",
    url: "https://github.com/stefanopascazi/shoots/blob/main/LICENSE",
  },
} as const;

export const installCommands = [
  {
    id: "unix",
    label: "macOS / Linux",
    lang: "sh",
    command:
      "curl -fsSL https://raw.githubusercontent.com/stefanopascazi/shoots/main/install.sh | bash",
  },
  {
    id: "windows",
    label: "Windows",
    lang: "powershell",
    command:
      "irm https://raw.githubusercontent.com/stefanopascazi/shoots/main/install.ps1 | iex",
  },
] as const;
