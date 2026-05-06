import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import Layout from "@/components/site/Layout";
import Reveal from "@/components/site/Reveal";
import { WHATSAPP } from "@/data/villa";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi, I'm ${form.name} (${form.email}).%0A${form.message}`;
    window.open(`https://wa.me/919999999999?text=${msg}`, "_blank");
    toast.success("Opening WhatsApp to send your message");
  };

  return (
    <Layout>
      <section className="pt-40 pb-12 text-center">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.4em] text-primary">Contact</div>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">Let's get you here.</h1>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-32 lg:grid-cols-2">
        <Reveal>
          <div className="glass rounded-3xl p-8">
            <h2 className="font-display text-3xl">Inquiry</h2>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <input
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-2xl border border-border bg-background px-5 py-4 outline-none transition focus:border-primary focus:shadow-neon"
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-2xl border border-border bg-background px-5 py-4 outline-none transition focus:border-primary focus:shadow-neon"
              />
              <textarea
                required
                rows={5}
                placeholder="Tell us your dates & vibe…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-2xl border border-border bg-background px-5 py-4 outline-none transition focus:border-primary focus:shadow-neon"
              />
              <button type="submit" className="w-full rounded-full bg-neon py-4 font-semibold text-primary-foreground shadow-neon transition-transform hover:scale-[1.02]">
                Send via WhatsApp
              </button>
            </form>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-4">
            {[
              { i: MessageCircle, t: "WhatsApp", v: "+91 99999 99999", href: WHATSAPP },
              { i: Phone, t: "Call", v: "+91 99999 99999", href: "tel:+919999999999" },
              { i: Mail, t: "Email", v: "hello@offthegrid.stay", href: "mailto:hello@offthegrid.stay" },
              { i: MapPin, t: "Directions", v: "Lonavala, Maharashtra", href: "https://maps.google.com/?q=Lonavala" },
            ].map((c) => (
              <a
                key={c.t}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="glass group flex items-center gap-5 rounded-3xl p-6 transition-all hover:shadow-neon"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-primary shadow-neon transition-transform group-hover:scale-110">
                  <c.i className="h-6 w-6" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.t}</div>
                  <div className="font-display text-xl">{c.v}</div>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </section>
    </Layout>
  );
};

export default Contact;