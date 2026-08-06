const REPO = "stefanopascazi/shoots";
const RAW_BASE = `https://raw.githubusercontent.com/${REPO}/main`;
const RELEASE_BASE = `https://github.com/${REPO}/releases/latest/download`;

type Platform = "unix" | "windows";

const scripts = {
  unix: {
    file: "install.sh",
    contentType: "text/x-shellscript; charset=utf-8",
    unavailable: 'echo "shoots: installer unavailable, retry in a minute" >&2\nexit 1\n',
  },
  windows: {
    file: "install.ps1",
    contentType: "text/plain; charset=utf-8",
    unavailable: 'throw "shoots: installer unavailable, retry in a minute"\n',
  },
} as const satisfies Record<Platform, unknown>;

// Redirecting to the release asset is what makes the install countable: GitHub
// increments that asset's download_count on every fetch, which is the only
// free, persistent analytics we have. Proxying the raw file instead would be
// invisible. Checked through the API rather than a HEAD on the asset so the
// probe itself never inflates the number we are trying to measure.
async function releaseAssetExists(file: string): Promise<boolean> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: { accept: "application/vnd.github+json" },
      // One call per hour per region keeps us far under the 60/hour
      // unauthenticated rate limit.
      next: { revalidate: 3600 },
    });
    if (!res.ok) return false;
    const release = (await res.json()) as { assets?: { name?: string }[] };
    return release.assets?.some((asset) => asset.name === file) ?? false;
  } catch {
    return false;
  }
}

export async function serveInstallScript(platform: Platform) {
  const { file, contentType, unavailable } = scripts[platform];

  if (await releaseAssetExists(file)) {
    return Response.redirect(`${RELEASE_BASE}/${file}`, 302);
  }

  // Fallback for releases published before the installers were attached as
  // assets: serve the raw file so the install keeps working, uncounted.
  const upstream = await fetch(`${RAW_BASE}/${file}`, { next: { revalidate: 300 } });

  if (!upstream.ok) {
    return new Response(unavailable, {
      status: 502,
      headers: { "content-type": contentType, "cache-control": "no-store" },
    });
  }

  return new Response(await upstream.text(), {
    headers: {
      "content-type": contentType,
      "cache-control": "no-store",
      "content-disposition": `inline; filename="${file}"`,
    },
  });
}
