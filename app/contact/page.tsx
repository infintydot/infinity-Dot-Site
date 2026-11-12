"use client";

import { useState, type FormEvent } from "react";
import { Mail, MapPin, ArrowRight, Check } from "lucide-react";
import Reveal from "@/components/animations/Reveal";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // TODO: wire this up to your actual email/CRM endpoint.
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  }

  return (
    <main className="relative w-full min-h-screen pt-40 pb-32 px-6 md:px-12 overflow-hidden">
      <div className="aurora-bg opacity-25" />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">
              Contact
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 text-5xl md:text-6xl font-display font-bold text-white leading-[1.05] tracking-tight">
              Tell us what you&apos;re building.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-white/50 font-light leading-relaxed max-w-md">
              We reply within one business day. No sales call required to
              get a straight answer.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-12 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white/30 text-primary">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold">Email</div>
                <div className="text-white/50 text-sm">info@infinitydot.in</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white/30 text-secondary">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold">Studio</div>
                <div className="text-white/50 text-sm">Pondicherry, India — remote-first</div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.15}>
            <div className="glass-panel rounded-3xl p-8 md:p-10">
              {submitted ? (
                <div className="flex flex-col items-center text-center gap-4 py-16">
                  <div className="p-4 rounded-full bg-primary/20 text-primary">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-white">
                    Message sent.
                  </h3>
                  <p className="text-white/50 max-w-sm">
                    Thanks — we&apos;ll get back to you within one business
                    day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Field label="Name" name="name" type="text" required />
                    <Field label="Email" name="email" type="email" required />
                  </div>
                  <Field label="Company" name="company" type="text" />
                  <div>
                    <label className="block text-sm text-white/60 mb-2" htmlFor="message">
                      Project details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="What are you building, and what stage are you at?"
                      className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group self-start px-8 py-4 rounded-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-black! font-semibold flex items-center gap-2 transition-all"
                  >
                    {loading ? "Sending..." : "Send message"}
                    {!loading && (
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm text-white/60 mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
      />
    </div>
  );
}
