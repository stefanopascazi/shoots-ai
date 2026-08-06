import { serveInstallScript } from "@/lib/install-script";

// force-dynamic so the CDN never answers on the function's behalf: a cached
// edge hit would skip the redirect, and an install GitHub never sees is an
// install we cannot count. fetchCache keeps the upstream fetches' own
// revalidate windows, which force-dynamic would otherwise drop.
export const dynamic = "force-dynamic";
export const fetchCache = "default-cache";

export async function GET() {
  return serveInstallScript("unix");
}
