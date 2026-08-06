import { serveInstallScript } from "@/lib/install-script";

export const dynamic = "force-dynamic";
export const fetchCache = "default-cache";

export async function GET() {
  return serveInstallScript("windows");
}
