"use client";
import { useState } from "react";
import { Reveal } from "./Reveal";
import { Button } from "./ui/Button";

const CONTACT_LINKS = [
  ["Email", "decaylaanthony@gmail.com", "mailto:decaylaanthony@gmail.com"],
  [
    "LinkedIn",
    "linkedin.com/in/decayla-anthony",
    "https://www.linkedin.com/in/decayla-anthony/",
  ],
];

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xlgznjqk";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | sent | error
  const [errorMsg, setErrorMsg] = useState(null);

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMsg(null);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        return;
      }

      // Formspree returns { errors: [{ message }] } on validation failures.
      const data = await res.json().catch(() => null);
      const message =
        data?.errors?.[0]?.message ?? "Something went wrong. Please try again.";
      setErrorMsg(message);
      setStatus("error");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  const sent = status === "sent";
  const submitting = status === "submitting";

  const inputClass =
    "w-full rounded-xl border border-[var(--dark-border)] bg-white/5 px-4 py-3 font-sans text-[0.88rem] font-light text-[var(--text-inv)] outline-none transition-colors focus:border-white/40";
  const labelClass =
    "mb-2 block font-sans text-[0.68rem] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]";

  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-[1200px] border-t border-[var(--dark-border)] bg-[var(--dark)] px-6 py-20 sm:px-16 sm:pb-24 sm:pt-32"
    >
      <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-2 md:gap-20">
        {/* Left */}
        <Reveal>
          <p className="mb-5 font-sans text-[0.7rem] font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Get in touch
          </p>
          <h2 className="mb-[22px] font-serif text-[clamp(2.2rem,4vw,3.6rem)] font-semibold italic leading-[1.05] tracking-[-0.03em] text-[var(--text-inv)] [text-wrap:pretty]">
            Let&apos;s build
            <br />
            something great.
          </h2>
          <p className="mb-10 max-w-[380px] font-sans text-[0.9rem] leading-[1.78] text-[var(--text-muted)] [text-wrap:pretty]">
            Open to full-time roles, contract work, and internships!
          </p>
          <ul className="flex flex-col gap-3.5">
            {CONTACT_LINKS.map(([label, val, href]) => (
              <li key={label} className="flex items-center gap-3.5">
                <span className="w-[60px] flex-shrink-0 font-sans text-[0.68rem] font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  {label}
                </span>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="border-b border-[var(--dark-border)] pb-px font-sans text-[0.86rem] text-[oklch(78%_0.012_20)] transition-colors hover:border-white/40 hover:text-[var(--text-inv)]"
                >
                  {val}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Right */}
        <Reveal delay={150}>
          {sent ? (
            <div className="rounded-3xl border border-[var(--dark-border)] bg-[var(--dark-2)] px-9 py-16 text-center">
              <p className="mb-2.5 font-serif text-[1.7rem] font-semibold italic text-[var(--text-inv)]">
                Message sent ✓
              </p>
              <p className="font-sans text-[0.86rem] text-[var(--text-muted)]">
                I&apos;ll get back to you shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 rounded-3xl border border-[var(--dark-border)] bg-[var(--dark-2)] p-7 sm:p-10"
            >
              <fieldset disabled={submitting} className="contents">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className={labelClass}>
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      className={inputClass}
                      placeholder="Your name"
                      value={form.name}
                      onChange={update("name")}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={labelClass}>
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      className={inputClass}
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={update("email")}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className={`${inputClass} min-h-[130px] resize-y leading-[1.65]`}
                    placeholder="Tell me about your project or opportunity…"
                    value={form.message}
                    onChange={update("message")}
                    required
                  />
                </div>
                {errorMsg && (
                  <p
                    role="alert"
                    className="font-sans text-[0.8rem] text-[oklch(72%_0.13_25)]"
                  >
                    {errorMsg}
                  </p>
                )}
                <Button
                  type="submit"
                  variant="rose"
                  className="mt-1 self-start disabled:cursor-not-allowed"
                  disabled={submitting}
                >
                  {submitting ? "Sending…" : "Send message →"}
                </Button>
              </fieldset>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
