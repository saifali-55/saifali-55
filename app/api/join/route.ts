import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Early-access sign-up.
 * Pre-launch placeholder: appends one JSON line per request to data/early-access.jsonl
 * (git-ignored, contains phone numbers). Replace the `store` call with a request to the
 * Salamtak API when the backend endpoint is wired.
 */

export const runtime = "nodejs";

const ROLES = new Set(["patient", "doctor", "pharmacy", "lab"]);
const PHONE = /^0?7\d{9}$/; // Iraqi mobile numbers

async function store(entry: Record<string, string>) {
  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "early-access.jsonl"), JSON.stringify(entry) + "\n", "utf8");
}

export async function POST(req: Request) {
  const type = req.headers.get("content-type") ?? "";
  const isJson = type.includes("application/json");
  let raw: Record<string, unknown>;
  try {
    raw = isJson
      ? ((await req.json()) as Record<string, unknown>)
      : (Object.fromEntries(await req.formData()) as Record<string, unknown>);
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const name = String(raw.name ?? "").trim().slice(0, 80);
  const phone = String(raw.phone ?? "").replace(/\D/g, "");
  const role = String(raw.role ?? "");
  const area = String(raw.area ?? "").trim().slice(0, 60);

  if (name.length < 2 || !PHONE.test(phone) || !ROLES.has(role)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  await store({ at: new Date().toISOString(), name, phone, role, area });

  if (!isJson) return NextResponse.redirect(new URL("/#join", req.url), 303);
  return NextResponse.json({ ok: true });
}
