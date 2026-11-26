"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";

const roles = [
  { v: "patient", t: "مريض" },
  { v: "doctor", t: "طبيب" },
  { v: "pharmacy", t: "صيدلية" },
  { v: "lab", t: "مختبر" },
];

const field =
  "mt-1.5 h-12 w-full rounded-xl border border-line-strong bg-surface px-4 text-base text-ink placeholder:text-ink-3 focus:border-accent";

export default function Join() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const r = await fetch("/api/join", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (r.ok) {
        form.reset();
        setStatus("ok");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="join"
      className="scroll-mt-20 border-t border-line bg-surface-2/50 py-16 md:py-24"
      aria-labelledby="join-title"
    >
      <div className="wrap grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <p className="text-sm font-medium tracking-wide text-accent">التجربة المبكرة</p>
          <h2 id="join-title" className="mt-2 font-display text-3xl leading-tight font-semibold text-balance md:text-4xl">
            سجّل، ونتواصل معك عندما يحين دورك
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-2">
            نفتح التسجيل تدريجياً في بغداد، منطقة بعد منطقة، للمرضى والأطباء والصيدليات معاً. لا
            رسوم على التسجيل، ولا التزام.
          </p>
        </div>

        <form
          id="join-form"
          className="md:col-span-7 md:max-w-[34rem]"
          action="/api/join"
          method="post"
          onSubmit={onSubmit}
          noValidate={false}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              الاسم
              <input id="join-name" name="name" type="text" required minLength={2} maxLength={80} autoComplete="name" className={field} />
            </label>
            <label className="block text-sm font-medium">
              رقم الهاتف
              <input
                id="join-phone"
                name="phone"
                type="tel"
                required
                inputMode="numeric"
                autoComplete="tel"
                pattern="0?7[0-9]{9}"
                placeholder="07xx xxx xxxx"
                title="رقم عراقي يبدأ بـ 07 ومن 11 رقماً"
                className={`${field} tabular`}
                dir="ltr"
              />
            </label>
            <label className="block text-sm font-medium">
              أنا
              <select id="join-role" name="role" required defaultValue="patient" className={field}>
                {roles.map((r) => (
                  <option key={r.v} value={r.v}>
                    {r.t}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium">
              المنطقة <span className="font-normal text-ink-3">(اختياري)</span>
              <input id="join-area" name="area" type="text" maxLength={60} placeholder="مثلاً: الكرادة" className={field} />
            </label>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-7 font-medium text-accent-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {status === "sending" ? "جارٍ الإرسال…" : "سجّلني"}
            </button>
            <p data-join-status role="status" aria-live="polite" className="text-sm text-ink-2">
              {status === "ok" && "وصلنا طلبك. نتواصل معك عندما يُفتح التسجيل في منطقتك."}
              {status === "error" && "تعذّر الإرسال الآن. تأكد من الرقم وحاول مرة ثانية."}
            </p>
          </div>
          <p className="mt-4 text-xs text-ink-3">
            نستخدم رقمك للتواصل بخصوص التجربة المبكرة فقط.
          </p>
        </form>
      </div>
    </section>
  );
}
