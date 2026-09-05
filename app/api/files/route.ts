import type { NextRequest } from "next/server";
import { GET as catchAllGET } from "./[...path]/route";

/**
 * /api/files (no path segments) lists the filesystem root.
 *
 * Sessions may have cwd "/" (for example when pi is started from the root
 * directory). The client encodes "/" as an empty path, which Next.js routes
 * to this handler rather than to the catch-all [...path] route. Forwarding an
 * empty segment list makes the catch-all resolve the filesystem root exactly
 * like any other path.
 */
export async function GET(
  request: NextRequest,
  _context: { params: Promise<Record<string, never>> },
) {
  return catchAllGET(request, {
    params: Promise.resolve({ path: [] as string[] }),
  });
}
