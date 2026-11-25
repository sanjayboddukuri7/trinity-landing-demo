import { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  FileText, Layers, Megaphone, MessageCircle, MousePointerClick, QrCode, Search, Send, Smartphone, Star, Timer, Target,
  ListChecks, HelpCircle, Gauge, BadgeIndianRupee, ArrowDown,
} from 'lucide-react';
import { MODELS } from './models';
import type { Model } from './models/types';
import { ArrowRight, ArrowUpRight, Check, Icon, Reveal, START_PROJECT_URL, TrinityCredit, scrollToId, whatsappUrl } from './shared';
import { useTheme } from './Template';

const GOLD_THEME: Model['theme'] = {
  brand: '232 163 61', brandDark: '184 116 26', brandSoft: '251 241 224',
  accent: '246 198 107', accentDark: '232 163 61', accentInk: '27 20 7',
  paper: '247 244 238', line: '231 224 211',
};

const INCLUDES = [
  { icon: Target, title: 'One clear goal', text: 'Every section points to one action: sign up, book, register or order.' },
  { icon: MousePointerClick, title: 'A big headline and button', text: 'Visitors know what you offer and what to do within 5 seconds.' },
  { icon: Star, title: 'Proof', text: 'Reviews, numbers and happy customers build trust fast.' },
  { icon: BadgeIndianRupee, title: 'Offer or prices', text: 'Plans, fees, packages or combos, shown clearly.' },
  { icon: HelpCircle, title: 'Answers to doubts', text: 'An FAQ answers questions before people have to ask.' },
  { icon: Send, title: 'A lead form', text: 'Collects name, phone or email so you can follow up.' },
  { icon: Timer, title: 'Urgency', text: 'A countdown or "only 3 seats left" gets people to act today.' },
  { icon: Gauge, title: 'Fast on mobile', text: 'Most visitors come from a phone, so it loads quickly and fits the screen.' },
];

const CHANNELS = [
  { icon: Megaphone, label: 'Instagram & Facebook ads' },
  { icon: Search, label: 'Google ads' },
  { icon: MessageCircle, label: 'WhatsApp status & groups' },
  { icon: QrCode, label: 'QR code on posters & flyers' },
  { icon: Smartphone, label: 'Link in Instagram bio' },
  { icon: Send, label: 'SMS & email campaigns' },
];

export function Gallery() {
  useTheme(GOLD_THEME);
  useEffect(() => {
    document.title = 'Trinity Landing (Prototype) — landing page models by Trinity Tech';
  }, []);

  return (
    <div className="bg-[#0F0D0A] text-white">
      <div role="note" className="bg-gradient-to-r from-[#b8741a] via-[#e8a33d] to-[#f6d28a] text-[#1b1407] text-[12.5px]">
        <div className="wrap py-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
          <span className="rounded-full bg-[#1b1407] text-gold-light px-2 py-0.5 text-[10.5px] font-bold tracking-[0.14em]">PROTOTYPE</span>
          <span>Sample landing pages by Trinity Tech. Every business, price and review here is made up.</span>
        </div>
      </div>

      <header className="wrap h-16 flex items-center justify-between gap-4">
        <a href="#/" className="flex items-center gap-2.5">
          <img src="/mark.png" alt="" className="w-10 h-8 object-contain drop-shadow-[0_0_10px_rgba(232,163,61,0.45)]" />
          <span className="leading-none">
            <span className="block font-brand font-bold tracking-[0.12em] text-[15px]">
              TRINITY LANDING <span className="font-sans tracking-normal text-gold text-[13px]">(Prototype)</span>
            </span>
            <span className="block text-[11px] text-white/50 mt-1">by Trinity Tech</span>
          </span>
        </a>
        <a href={START_PROJECT_URL} target="_blank" rel="noreferrer" className="btn-primary hidden sm:inline-flex h-10 text-[#1b1407]">
          Get your landing page <ArrowUpRight className="w-4 h-4" />
        </a>
      </header>

      {/* What is it */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_85%_20%,rgba(232,163,61,0.18),transparent_70%)]" />
        <div className="wrap relative pt-10 sm:pt-16 pb-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 text-gold-light px-3 py-1 text-xs font-semibold">
              What is a landing page?
            </span>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="mt-5 font-serif text-[42px] sm:text-[62px] leading-[1.04] font-bold">
              One page. One goal.<br />
              <span className="bg-gradient-to-r from-[#e8a33d] to-[#f6d28a] bg-clip-text text-transparent">More customers.</span>
            </motion.h1>
            <p className="mt-6 text-lg text-white/70 max-w-xl">
              A landing page is a <b className="text-white">single web page built to make visitors do one thing</b>, like sign up, book a
              visit, register or order. Businesses send their ads, QR codes and WhatsApp links straight to it.
            </p>
            <p className="mt-3 text-white/60 max-w-xl">
              Below are <b className="text-white">{MODELS.length} sample landing pages</b>, each made for a different kind of business. Open any
              model to see a complete, working page.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => scrollToId('models')} className="btn-primary text-[#1b1407]">
                See the {MODELS.length} models <ArrowDown className="w-4 h-4" />
              </button>
              <a href={whatsappUrl('the landing page models')} target="_blank" rel="noreferrer" className="btn bg-white/10 text-white hover:bg-white/15">
                <MessageCircle className="w-4 h-4" /> Ask Trinity Tech
              </a>
            </div>
          </div>
          <FlowDiagram />
        </div>
      </section>

      {/* Website vs landing page */}
      <section className="bg-[#F7F4EE] text-[#17140F] py-20 sm:py-24">
        <div className="wrap">
          <Reveal className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="h2 font-serif">Website or landing page?</h2>
            <p className="mt-4 text-lg text-[#3B362E]">Both are useful. They just do different jobs.</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            <Reveal>
              <div className="h-full rounded-3xl bg-white border border-[#E7E0D3] p-7">
                <span className="w-11 h-11 rounded-2xl bg-[#F1ECE2] text-[#6F685C] grid place-items-center"><Layers className="w-5 h-5" /></span>
                <h3 className="mt-5 font-display text-xl font-bold">Full website</h3>
                <p className="mt-1 text-sm text-[#6F685C]">Your business's home on the internet.</p>
                <ul className="mt-5 space-y-2.5 text-[15px]">
                  {['Many pages: home, about, services, gallery, contact', 'Visitors explore at their own pace', 'Builds your brand over the long term', 'Many goals at once'].map(x => (
                    <li key={x} className="flex gap-2.5"><Check className="w-4 h-4 mt-1 text-[#A09887] shrink-0" />{x}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-3xl bg-[#17140F] text-white p-7 shadow-[0_20px_60px_-15px_rgba(232,163,61,0.45)]">
                <span className="w-11 h-11 rounded-2xl bg-[#E8A33D] text-[#1b1407] grid place-items-center"><FileText className="w-5 h-5" /></span>
                <h3 className="mt-5 font-display text-xl font-bold">Landing page</h3>
                <p className="mt-1 text-sm text-white/60">A focused page for one offer or campaign.</p>
                <ul className="mt-5 space-y-2.5 text-[15px]">
                  {['One page, scrolled top to bottom', 'Built around one action: book, sign up, order', 'Perfect for ads, launches, offers and events', 'Easy to measure: how many people signed up'].map(x => (
                    <li key={x} className="flex gap-2.5"><Check className="w-4 h-4 mt-1 text-[#E8A33D] shrink-0" />{x}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Models */}
      <section id="models" className="py-20 sm:py-28">
        <div className="wrap">
          <Reveal className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
            <span className="inline-flex rounded-full bg-white/10 text-gold-light px-3 py-1 text-xs font-semibold">Landing page models</span>
            <h2 className="h2 font-serif mt-4">Pick the one closest to your business.</h2>
            <p className="mt-4 text-white/60 text-lg">Each model is a complete page with its own colours, offer and form. Your page gets your brand, photos and prices.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MODELS.map((m, i) => <ModelCard key={m.slug} model={m} index={i} />)}
            <Reveal delay={0.1} className="h-full">
              <a href={START_PROJECT_URL} target="_blank" rel="noreferrer"
                className="group h-full min-h-[300px] rounded-3xl border-2 border-dashed border-white/20 p-7 flex flex-col items-center justify-center text-center hover:border-[#E8A33D] transition-colors">
                <span className="w-12 h-12 rounded-2xl bg-white/10 grid place-items-center text-gold-light"><ArrowUpRight className="w-5 h-5" /></span>
                <div className="mt-4 font-display text-xl font-bold">Your business here</div>
                <p className="mt-2 text-sm text-white/60 max-w-[240px]">Clinic, gym, restaurant, salon, NGO… we design a landing page around your goal.</p>
                <span className="mt-5 text-sm font-semibold text-gold-light group-hover:underline">Start a project with Trinity Tech</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What every landing page includes */}
      <section className="bg-[#F7F4EE] text-[#17140F] py-20 sm:py-28">
        <div className="wrap">
          <Reveal className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="h2 font-serif">What every model includes</h2>
            <p className="mt-4 text-lg text-[#3B362E]">The building blocks that turn visitors into customers.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INCLUDES.map((x, i) => (
              <Reveal key={x.title} delay={(i % 4) * 0.06}>
                <div className="h-full rounded-3xl bg-white border border-[#E7E0D3] p-6">
                  <span className="w-10 h-10 rounded-xl bg-[#FBF1E0] text-[#B9771E] grid place-items-center"><x.icon className="w-5 h-5" /></span>
                  <h3 className="mt-4 font-display font-bold">{x.title}</h3>
                  <p className="mt-1.5 text-sm text-[#3B362E] leading-relaxed">{x.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14 text-center">
            <h3 className="font-display text-xl font-bold">Where businesses share their landing page</h3>
            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
              {CHANNELS.map(c => (
                <span key={c.label} className="inline-flex items-center gap-2 rounded-full bg-white border border-[#E7E0D3] px-4 py-2 text-sm font-medium">
                  <c.icon className="w-4 h-4 text-[#B9771E]" /> {c.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24">
        <div className="wrap">
          <Reveal>
            <div className="rounded-[36px] bg-gradient-to-br from-[#26211A] to-[#0F0D0A] border border-white/10 px-6 py-14 sm:p-16 text-center">
              <ListChecks className="w-10 h-10 mx-auto text-gold" />
              <h2 className="h2 font-serif mt-5">Want a landing page for your business?</h2>
              <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">Tell us your goal. Trinity Tech designs, builds and launches it, ready for your ads and QR codes.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={START_PROJECT_URL} target="_blank" rel="noreferrer" className="btn-primary text-[#1b1407]">Start a project <ArrowRight className="w-4 h-4" /></a>
                <a href={whatsappUrl('the landing page models')} target="_blank" rel="noreferrer" className="btn bg-[#25D366] text-[#062b14]"><MessageCircle className="w-4 h-4" /> WhatsApp us</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="wrap py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <p><b className="text-white">Trinity Landing (Prototype)</b> is a prototype by Trinity Tech.</p>
          <TrinityCredit dark />
        </div>
      </footer>
    </div>
  );
}

function ModelCard({ model, index }: { model: Model; index: number }) {
  const t = model.theme;
  const rgb = (v: string) => `rgb(${v})`;
  return (
    <Reveal delay={(index % 3) * 0.08} className="h-full">
      <a href={`#/${model.slug}`} className="group h-full rounded-3xl bg-white text-[#17140F] overflow-hidden flex flex-col hover:-translate-y-1 transition-transform shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
        {/* mini preview of the page */}
        <div className="relative h-40 p-5 overflow-hidden" style={{ background: `linear-gradient(135deg, ${rgb(t.brandSoft)}, ${rgb(t.paper)})` }}>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg grid place-items-center text-white" style={{ background: rgb(t.brand) }}><Icon name={model.logoIcon} className="w-4 h-4" /></span>
            <span className="font-display font-bold text-sm">{model.name}</span>
          </div>
          <div className="mt-3 font-display font-bold text-lg leading-tight max-w-[75%]">
            {model.hero.title} <span style={{ boxShadow: `inset 0 -8px 0 rgb(${t.accent} / 0.6)` }}>{model.hero.highlight}</span>
          </div>
          <span className="absolute bottom-4 left-5 rounded-full px-3 py-1.5 text-[11px] font-semibold text-white" style={{ background: rgb(t.brand) }}>
            {model.form.button}
          </span>
          <span className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full opacity-30" style={{ background: rgb(t.accent) }} />
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: rgb(t.brandDark) }}>Model {index + 1}</div>
          <h3 className="mt-1 font-display text-xl font-bold">{model.kind}</h3>
          <dl className="mt-3 space-y-2 text-sm flex-1">
            <div><dt className="inline font-semibold">Used by: </dt><dd className="inline text-[#3B362E]">{model.usedBy}</dd></div>
            <div><dt className="inline font-semibold">Goal: </dt><dd className="inline text-[#3B362E]">{model.goal}</dd></div>
          </dl>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: rgb(t.brandDark) }}>
            Open this model <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </a>
    </Reveal>
  );
}

/** Ads / QR / WhatsApp → landing page → enquiry. */
function FlowDiagram() {
  const sources = [
    { icon: Megaphone, label: 'Instagram ad' },
    { icon: QrCode, label: 'QR on a poster' },
    { icon: MessageCircle, label: 'WhatsApp link' },
  ];
  return (
    <div className="relative max-w-md mx-auto w-full" aria-label="How a landing page works: ads, QR codes and WhatsApp links bring visitors to one page, and the page turns them into enquiries.">
      <div className="grid grid-cols-3 gap-2">
        {sources.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.12 }}
            className="rounded-2xl bg-white/5 border border-white/10 p-3 text-center">
            <s.icon className="w-5 h-5 mx-auto text-gold-light" />
            <div className="mt-1.5 text-[11px] text-white/70">{s.label}</div>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-around py-2 text-gold/70">
        {[0, 1, 2].map(i => <ArrowDown key={i} className="w-4 h-4" />)}
      </div>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.55 }}
        className="rounded-3xl bg-white text-[#17140F] p-5 shadow-[0_30px_80px_-20px_rgba(232,163,61,0.5)]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B9771E]">Your landing page</span>
          <span className="flex gap-1">{[0, 1, 2].map(i => <span key={i} className="w-2 h-2 rounded-full bg-[#E7E0D3]" />)}</span>
        </div>
        <div className="mt-3 h-3 w-4/5 rounded bg-[#17140F]" />
        <div className="mt-2 h-3 w-3/5 rounded bg-[#E8A33D]/70" />
        <div className="mt-3 space-y-1.5">
          <div className="h-2 w-full rounded bg-[#EFEAE0]" />
          <div className="h-2 w-11/12 rounded bg-[#EFEAE0]" />
        </div>
        <div className="mt-4 flex gap-2">
          <div className="flex-1 h-9 rounded-full bg-[#F7F4EE] border border-[#E7E0D3]" />
          <div className="h-9 px-4 rounded-full bg-[#E8A33D] text-[#1b1407] text-xs font-bold grid place-items-center">Book now</div>
        </div>
      </motion.div>
      <div className="flex justify-center py-2 text-gold/70"><ArrowDown className="w-4 h-4" /></div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        className="mx-auto w-fit flex items-center gap-2 rounded-full bg-[#25D366] text-[#062b14] px-4 py-2 text-sm font-bold">
        <Check className="w-4 h-4" /> New enquiry: name + phone
      </motion.div>
    </div>
  );
}
