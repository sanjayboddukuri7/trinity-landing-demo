import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight, ArrowUpRight, Bell, Check, ChevronDown, Flame, Menu, MessageCircle, Moon, ShieldCheck, Star, TrendingUp, Users, X,
  type LucideIcon,
} from 'lucide-react';
import {
  FAQS, FEATURES, NAV, PLANS, PRODUCT, START_PROJECT_URL, STATS, STEPS, TESTIMONIALS, TRINITY_URL, WHATSAPP_URL,
} from './content';

const ICONS: Record<string, LucideIcon> = { flame: Flame, bell: Bell, trending: TrendingUp, users: Users, moon: Moon, shield: ShieldCheck };
const STORE = 'trinity-landing-demo:';
const BASE_WAITLIST = 1284; // sample starting count for the demo

function useWaitlistCount() {
  const [count, setCount] = useState(() => BASE_WAITLIST + loadWaitlist().length);
  useEffect(() => {
    const update = () => setCount(BASE_WAITLIST + loadWaitlist().length);
    window.addEventListener('waitlist-change', update);
    return () => window.removeEventListener('waitlist-change', update);
  }, []);
  return count;
}

/* ---------------- helpers ---------------- */

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Launch day is fixed per visitor (first visit + N days) so the countdown never runs out in the demo. */
function launchDate(): number {
  try {
    const saved = Number(localStorage.getItem(STORE + 'launch'));
    if (saved > Date.now()) return saved;
    const d = new Date();
    d.setDate(d.getDate() + PRODUCT.launchInDays);
    d.setHours(10, 0, 0, 0);
    localStorage.setItem(STORE + 'launch', String(d.getTime()));
    return d.getTime();
  } catch {
    return Date.now() + PRODUCT.launchInDays * 86_400_000;
  }
}

function useCountdown() {
  const [target] = useState(launchDate);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const s = Math.max(0, Math.floor((target - now) / 1000));
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), mins: Math.floor((s % 3600) / 60), secs: s % 60, target };
}

function loadWaitlist(): string[] {
  try {
    const list = JSON.parse(localStorage.getItem(STORE + 'waitlist') || '[]');
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

/* ---------------- page ---------------- */

export default function App() {
  return (
    <>
      <DemoRibbon />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Features />
        <How />
        <Pricing />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function DemoRibbon() {
  return (
    <div role="note" className="bg-gradient-to-r from-[#b8741a] via-[#e8a33d] to-[#f6d28a] text-[#1b1407] text-[12.5px]">
      <div className="wrap py-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
        <span className="rounded-full bg-[#1b1407] text-gold-light px-2 py-0.5 text-[10.5px] font-bold tracking-[0.14em]">DEMO</span>
        <span>
          <b>Trinity Landing (Demo)</b> — a sample page by Trinity Tech. Pulse is a made-up product.
        </span>
        <a href={START_PROJECT_URL} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-2 inline-flex items-center gap-0.5">
          Get a page like this <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2" aria-label={`${PRODUCT.name} home`}>
      <span className="relative w-9 h-9 rounded-xl bg-pulse grid place-items-center shadow-glow">
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 12h4l2-6 4 12 2-6h6" />
        </svg>
      </span>
      <span className={`font-display text-xl font-bold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>{PRODUCT.name}</span>
    </a>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-[background-color,box-shadow] ${scrolled || open ? 'bg-white/90 backdrop-blur shadow-[0_1px_0_#E5E1F5]' : 'bg-transparent'}`}>
      <div className="wrap h-16 flex items-center justify-between gap-4">
        <Logo />
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-ink-soft">
          {NAV.map(n => (
            <a key={n.href} href={n.href} className="hover:text-pulse transition-colors">{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#waitlist" className="btn-primary hidden sm:inline-flex h-10">Join waitlist</a>
          <button className="md:hidden p-2 -mr-2 rounded-lg hover:bg-paper" onClick={() => setOpen(o => !o)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-line bg-white"
          >
            <div className="wrap py-3 flex flex-col">
              {NAV.map(n => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-3 text-[15px] font-medium border-b border-line/70 last:border-0">
                  {n.label}
                </a>
              ))}
              <a href="#waitlist" onClick={() => setOpen(false)} className="btn-primary mt-3">Join waitlist</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function WaitlistForm({ dark = false, id }: { dark?: boolean; id?: string }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [joined, setJoined] = useState<number | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError('Please enter a valid email address.');
      return;
    }
    const list = loadWaitlist();
    const position = list.includes(value) ? list.indexOf(value) + 1 : list.push(value);
    try {
      localStorage.setItem(STORE + 'waitlist', JSON.stringify(list));
    } catch {
      /* ignore */
    }
    setError('');
    setJoined(BASE_WAITLIST + position);
    window.dispatchEvent(new Event('waitlist-change'));
  };

  if (joined !== null) {
    return (
      <motion.div
        id={id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-2xl px-5 py-4 flex items-start gap-3 max-w-md ${dark ? 'bg-white/10 text-white' : 'bg-white border border-line shadow-soft'}`}
        role="status"
      >
        <span className="w-8 h-8 rounded-full bg-lime text-ink grid place-items-center shrink-0"><Check className="w-4 h-4" /></span>
        <div>
          <div className="font-semibold">You're #{joined.toLocaleString('en-IN')} on the waitlist!</div>
          <p className={`text-sm mt-0.5 ${dark ? 'text-white/70' : 'text-ink-muted'}`}>
            Demo only: no email is sent and nothing leaves your browser.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form id={id} onSubmit={submit} noValidate className="w-full max-w-md">
      <div className={`flex flex-col sm:flex-row gap-2 p-1.5 rounded-2xl sm:rounded-full ${dark ? 'bg-white/10' : 'bg-white border border-line shadow-soft'}`}>
        <label htmlFor={`${id ?? 'hero'}-email`} className="sr-only">Email address</label>
        <input
          id={`${id ?? 'hero'}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-invalid={Boolean(error)}
          className={`flex-1 min-w-0 h-11 px-4 bg-transparent rounded-full outline-none text-[15px] ${dark ? 'text-white placeholder:text-white/50' : 'text-ink placeholder:text-ink-muted/70'}`}
        />
        <button type="submit" className={dark ? 'btn-lime' : 'btn-primary'}>
          Get early access <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      {error && <p className={`mt-2 text-sm ${dark ? 'text-lime' : 'text-red-600'}`}>{error}</p>}
    </form>
  );
}

function Countdown() {
  const { days, hours, mins, secs, target } = useCountdown();
  const cells = [
    { v: days, l: 'days' },
    { v: hours, l: 'hours' },
    { v: mins, l: 'mins' },
    { v: secs, l: 'secs' },
  ];
  return (
    <div className="flex items-center gap-3 flex-wrap" aria-label={`Launches on ${new Date(target).toDateString()}`}>
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Launching in</span>
      <div className="flex gap-1.5">
        {cells.map(c => (
          <div key={c.l} className="min-w-[52px] rounded-xl bg-ink text-white px-2 py-1.5 text-center">
            <div className="font-display text-lg font-bold tabular-nums leading-none">{String(c.v).padStart(2, '0')}</div>
            <div className="text-[10px] text-white/60 mt-0.5">{c.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneMockup() {
  const habits = [
    { name: 'Morning walk', meta: '5,000 steps', done: true, color: 'bg-lime' },
    { name: 'Read 10 pages', meta: '12-day streak', done: true, color: 'bg-pulse' },
    { name: 'Drink 2 L water', meta: '6 of 8 glasses', done: false, color: 'bg-sky-400' },
    { name: 'No phone after 10 pm', meta: 'Tonight', done: false, color: 'bg-amber-400' },
  ];
  const [ticked, setTicked] = useState(habits.map(h => h.done));
  useEffect(() => {
    // tick the third habit after a moment so the mockup feels alive
    const t = setTimeout(() => setTicked(v => v.map((x, i) => (i === 2 ? true : x))), 1800);
    return () => clearTimeout(t);
  }, []);
  const done = ticked.filter(Boolean).length;

  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px] float" aria-hidden>
      <div className="absolute -inset-10 bg-pulse/30 blur-3xl rounded-full" />
      <div className="relative rounded-[42px] bg-ink p-3 shadow-glow">
        <div className="rounded-[32px] bg-paper overflow-hidden">
          <div className="h-7 flex justify-center pt-2"><div className="w-20 h-5 rounded-full bg-ink" /></div>
          <div className="px-5 pt-3 pb-6">
            <div className="text-xs text-ink-muted">Wednesday</div>
            <div className="font-display text-xl font-bold">Today</div>
            <div className="mt-4 rounded-2xl bg-ink text-white p-4 flex items-center gap-4">
              <div className="relative w-14 h-14">
                <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="4" />
                  <motion.circle
                    cx="18" cy="18" r="15" fill="none" stroke="#C6F432" strokeWidth="4" strokeLinecap="round"
                    strokeDasharray={94.2}
                    animate={{ strokeDashoffset: 94.2 * (1 - done / habits.length) }}
                    transition={{ duration: 0.8 }}
                  />
                </svg>
                <span className="absolute inset-0 grid place-items-center text-xs font-bold">{done}/{habits.length}</span>
              </div>
              <div>
                <div className="text-sm font-semibold flex items-center gap-1"><Flame className="w-4 h-4 text-amber-400" /> 23-day streak</div>
                <div className="text-xs text-white/60">Best ever: 41 days</div>
              </div>
            </div>
            <ul className="mt-4 space-y-2">
              {habits.map((h, i) => (
                <li key={h.name} className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 shadow-sm">
                  <span className={`w-1.5 h-8 rounded-full ${h.color}`} />
                  <div className="flex-1 min-w-0">
                    <div className={`text-[13px] font-semibold truncate ${ticked[i] ? 'line-through text-ink-muted' : ''}`}>{h.name}</div>
                    <div className="text-[11px] text-ink-muted">{h.meta}</div>
                  </div>
                  <motion.span
                    animate={{ scale: ticked[i] ? [1, 1.25, 1] : 1 }}
                    className={`w-6 h-6 rounded-full grid place-items-center border-2 ${ticked[i] ? 'bg-pulse border-pulse text-white' : 'border-line'}`}
                  >
                    {ticked[i] && <Check className="w-3.5 h-3.5" />}
                  </motion.span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const waitlistCount = useWaitlistCount();
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_10%,#EEE9FF_0%,transparent_70%),radial-gradient(40%_40%_at_0%_80%,#F3FBD9_0%,transparent_70%)]" />
      <div className="wrap pt-10 sm:pt-16 pb-16 sm:pb-24 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <div>
          <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">
            <span className="w-1.5 h-1.5 rounded-full bg-pulse animate-pulse" /> {PRODUCT.tagline} · launching soon
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-[44px] sm:text-[64px] leading-[1.02] font-bold tracking-tight"
          >
            Build habits that{' '}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">actually stick.</span>
              <span className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-3 sm:h-4 bg-lime -z-0 rounded" />
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.6 }}
            className="mt-5 text-lg text-ink-soft max-w-xl"
          >
            {PRODUCT.name} turns small daily actions into streaks you don't want to break. Smart reminders, clear progress and a
            friend to keep you honest, all in under ten seconds a day.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="mt-8 space-y-5">
            <WaitlistForm id="waitlist" />
            <Countdown />
          </motion.div>
          <div className="mt-6 flex items-center gap-3 text-sm text-ink-muted">
            <div className="flex -space-x-2">
              {['bg-pulse', 'bg-lime', 'bg-amber-400', 'bg-sky-400'].map((c, i) => (
                <span key={c} className={`w-8 h-8 rounded-full border-2 border-white ${c} grid place-items-center text-[11px] font-bold text-ink`}>
                  {['A', 'D', 'M', 'R'][i]}
                </span>
              ))}
            </div>
            <span><b className="text-ink">{waitlistCount.toLocaleString('en-IN')} people</b> already on the waitlist</span>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.7 }}>
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="bg-ink text-white">
      <div className="wrap py-10 grid grid-cols-3 gap-4 text-center">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="font-display text-3xl sm:text-5xl font-bold text-lime">{s.value}</div>
            <div className="mt-1 text-xs sm:text-sm text-white/60">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text?: string }) {
  return (
    <Reveal className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="h2 mt-4">{title}</h2>
      {text && <p className="mt-4 text-ink-soft text-lg">{text}</p>}
    </Reveal>
  );
}

function Features() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="wrap">
        <SectionHead eyebrow="Features" title="Everything you need. Nothing you don't." text="Pulse keeps the good parts of habit tracking and drops the clutter." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => {
            const Icon = ICONS[f.icon] ?? Check;
            return (
              <Reveal key={f.title} delay={(i % 3) * 0.08}>
                <div className="group h-full rounded-3xl border border-line bg-white p-6 hover:shadow-soft hover:-translate-y-1 transition-[box-shadow,transform]">
                  <span className="w-11 h-11 rounded-2xl bg-pulse-soft text-pulse grid place-items-center group-hover:bg-pulse group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold">{f.title}</h3>
                  <p className="mt-2 text-[15px] text-ink-soft leading-relaxed">{f.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function How() {
  return (
    <section id="how" className="py-20 sm:py-28 bg-paper">
      <div className="wrap">
        <SectionHead eyebrow="How it works" title="Three steps. About a minute." />
        <ol className="grid md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-7 left-[16%] right-[16%] h-px border-t-2 border-dashed border-pulse/30" aria-hidden />
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12}>
              <li className="relative text-center px-4">
                <span className="relative z-10 mx-auto w-14 h-14 rounded-2xl bg-pulse text-white font-display text-2xl font-bold grid place-items-center shadow-glow">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-ink-soft">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Pricing() {
  const [yearly, setYearly] = useState(true);
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="wrap">
        <SectionHead eyebrow="Pricing" title="Simple pricing. Start free." text="Sample prices for this demo." />
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-full bg-paper border border-line" role="group" aria-label="Billing period">
            {[
              { v: false, l: 'Monthly' },
              { v: true, l: 'Yearly · 2 months free' },
            ].map(o => (
              <button
                key={o.l}
                onClick={() => setYearly(o.v)}
                aria-pressed={yearly === o.v}
                className={`relative px-4 h-9 rounded-full text-sm font-semibold transition-colors ${yearly === o.v ? 'text-white' : 'text-ink-soft'}`}
              >
                {yearly === o.v && <motion.span layoutId="billing" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
                <span className="relative">{o.l}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {PLANS.map((p, i) => {
            const price = yearly ? Math.round((p.monthly * 10) / 12) : p.monthly;
            return (
              <Reveal key={p.name} delay={i * 0.08} className="h-full">
                <div className={`relative h-full rounded-3xl p-7 flex flex-col ${p.popular ? 'bg-ink text-white shadow-glow md:-translate-y-3' : 'bg-white border border-line'}`}>
                  {p.popular && <span className="absolute -top-3 left-7 rounded-full bg-lime text-ink text-xs font-bold px-3 py-1">Most popular</span>}
                  <div className="font-display text-xl font-bold">{p.name}</div>
                  <p className={`text-sm mt-1 ${p.popular ? 'text-white/60' : 'text-ink-muted'}`}>{p.blurb}</p>
                  <div className="mt-6 flex items-end gap-1">
                    <span className="font-display text-5xl font-bold">₹{price}</span>
                    <span className={`mb-1.5 text-sm ${p.popular ? 'text-white/60' : 'text-ink-muted'}`}>/ month</span>
                  </div>
                  <div className={`text-xs mt-1 h-4 ${p.popular ? 'text-white/50' : 'text-ink-muted'}`}>
                    {p.monthly > 0 && yearly ? `Billed ₹${p.monthly * 10} yearly` : p.monthly === 0 ? 'Free forever' : 'Billed monthly'}
                  </div>
                  <ul className="mt-6 space-y-3 flex-1">
                    {p.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-[15px]">
                        <span className={`mt-0.5 w-5 h-5 rounded-full grid place-items-center shrink-0 ${p.popular ? 'bg-lime text-ink' : 'bg-pulse-soft text-pulse'}`}>
                          <Check className="w-3 h-3" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#waitlist" className={`mt-8 w-full ${p.popular ? 'btn-lime' : 'btn-ghost'}`}>{p.cta}</a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-20 sm:py-28 bg-paper">
      <div className="wrap">
        <SectionHead eyebrow="Early testers" title="People are sticking with it." text="Sample reviews for this demo." />
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="h-full">
              <figure className="h-full rounded-3xl bg-white border border-line p-7 flex flex-col">
                <div className="flex gap-0.5 text-amber-400" aria-label={`${t.stars} out of 5 stars`}>
                  {Array.from({ length: t.stars }).map((_, k) => <Star key={k} className="w-4 h-4" fill="currentColor" />)}
                </div>
                <blockquote className="mt-4 text-[16px] leading-relaxed flex-1">“{t.text}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-pulse-soft text-pulse font-bold grid place-items-center">{t.name[0]}</span>
                  <span>
                    <span className="block font-semibold text-sm">{t.name}</span>
                    <span className="block text-xs text-ink-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="wrap max-w-3xl">
        <SectionHead eyebrow="FAQ" title="Questions, answered." />
        <div className="divide-y divide-line border-y border-line">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full py-5 flex items-center justify-between gap-4 text-left font-display text-lg font-semibold hover:text-pulse transition-colors"
                >
                  {f.q}
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-pulse' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="pb-5 text-ink-soft leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="pb-20 sm:pb-28">
      <div className="wrap">
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] bg-ink text-white px-6 py-14 sm:px-14 sm:py-20 text-center">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-pulse/40 blur-3xl" aria-hidden />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-lime/20 blur-3xl" aria-hidden />
            <h2 className="relative h2">Your best streak starts today.</h2>
            <p className="relative mt-4 text-white/70 text-lg max-w-xl mx-auto">Join the waitlist and get early access a week before everyone else.</p>
            <div className="relative mt-8 flex justify-center">
              <WaitlistForm dark id="waitlist-bottom" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap py-10 grid gap-8 md:grid-cols-[1fr_auto] items-start">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-ink-muted max-w-md">
            <b className="text-ink">Trinity Landing (Demo)</b> is a demo project by{' '}
            <a href={TRINITY_URL} target="_blank" rel="noreferrer" className="font-semibold text-pulse hover:underline">Trinity Tech</a>.
            Pulse, its prices, numbers and reviews are made up to show what a product launch page can look like.
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-3">
          <a href={START_PROJECT_URL} target="_blank" rel="noreferrer" className="btn-primary">
            Build a landing page with Trinity Tech <ArrowUpRight className="w-4 h-4" />
          </a>
          <div className="flex items-center gap-2 text-xs text-ink-muted">
            <img src="/mark.png" alt="" className="w-6 h-5 object-contain" />
            <span className="font-brand tracking-[0.14em] text-ink">TRINITY TECH</span>
            <span>· Build. Innovate. Transform.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] text-[#062b14] pl-3 pr-4 h-12 font-semibold text-sm shadow-soft hover:scale-105 transition-transform"
      aria-label="Chat with Trinity Tech on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline">Chat with Trinity Tech</span>
    </a>
  );
}
