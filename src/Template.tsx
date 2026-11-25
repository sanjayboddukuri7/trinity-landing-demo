import { useEffect, useLayoutEffect, useState, type FormEvent, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Menu, Star, X } from 'lucide-react';
import type { Field, Model } from './models/types';
import { MODELS } from './models';
import {
  ArrowRight, ArrowUpRight, Check, Icon, ModelBar, Reveal, START_PROJECT_URL, TRINITY_URL, TrinityCredit, WhatsAppButton,
  saveLead, scrollToId, useCountdown, useLeadCount,
} from './shared';
import { HeroVisual } from './visuals';

/** Applies a model's colours to the whole document. */
export function useTheme(t: Model['theme'] | null) {
  useLayoutEffect(() => {
    const root = document.documentElement.style;
    const vars: Record<string, string> = t
      ? { brand: t.brand, 'brand-dark': t.brandDark, 'brand-soft': t.brandSoft, accent: t.accent, 'accent-dark': t.accentDark, 'accent-ink': t.accentInk, paper: t.paper, line: t.line }
      : {};
    Object.entries(vars).forEach(([k, v]) => root.setProperty(`--${k}`, v));
    return () => Object.keys(vars).forEach(k => root.removeProperty(`--${k}`));
  }, [t]);
}

export function LandingTemplate({ model }: { model: Model }) {
  useTheme(model.theme);
  const index = MODELS.indexOf(model);
  useEffect(() => {
    document.title = `${model.name} · ${model.kind} — Trinity Landing (Prototype)`;
  }, [model]);

  return (
    <>
      <ModelBar model={model} index={index} total={MODELS.length} prev={MODELS[index - 1]} next={MODELS[index + 1]} />
      <Nav model={model} />
      <main>
        <Hero model={model} />
        <Stats model={model} />
        <Features model={model} />
        <Steps model={model} />
        <Pricing model={model} />
        <Testimonials model={model} />
        <Faq model={model} />
        <FinalCta model={model} />
      </main>
      <Footer model={model} next={MODELS[index + 1]} />
      <WhatsAppButton about={model.whatsapp} />
    </>
  );
}

function Logo({ model, light = false }: { model: Model; light?: boolean }) {
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 text-left" aria-label={`${model.name}, back to top`}>
      <span className="w-9 h-9 rounded-xl bg-brand text-white grid place-items-center shadow-glow"><Icon name={model.logoIcon} className="w-5 h-5" /></span>
      <span className={`font-display text-lg sm:text-xl font-bold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>{model.name}</span>
    </button>
  );
}

function Nav({ model }: { model: Model }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const links = [
    { id: 'features', label: model.nav.features },
    { id: 'steps', label: model.nav.steps },
    { id: 'pricing', label: model.nav.pricing },
    { id: 'faq', label: 'FAQ' },
  ];
  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className={`sticky top-0 z-40 transition-[background-color,box-shadow] ${scrolled || open ? 'bg-white/90 backdrop-blur shadow-[0_1px_0_rgb(var(--line))]' : 'bg-transparent'}`}>
      <div className="wrap h-16 flex items-center justify-between gap-4">
        <Logo model={model} />
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-ink-soft">
          {links.map(l => <button key={l.id} onClick={() => go(l.id)} className="hover:text-brand transition-colors">{l.label}</button>)}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => go('lead')} className="btn-primary hidden sm:inline-flex h-10">{model.form.button}</button>
          <button className="md:hidden p-2 -mr-2 rounded-lg hover:bg-paper" onClick={() => setOpen(o => !o)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden overflow-hidden border-t border-line bg-white">
            <div className="wrap py-3 flex flex-col">
              {links.map(l => (
                <button key={l.id} onClick={() => go(l.id)} className="py-3 text-left text-[15px] font-medium border-b border-line/70">{l.label}</button>
              ))}
              <button onClick={() => go('lead')} className="btn-primary mt-3">{model.form.button}</button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

const FIELD: Record<Field, { label: string; type: string; placeholder: string; auto: string; mode?: 'email' | 'tel' }> = {
  name: { label: 'Your name', type: 'text', placeholder: 'Name', auto: 'name' },
  email: { label: 'Email address', type: 'email', placeholder: 'you@example.com', auto: 'email', mode: 'email' },
  phone: { label: 'Phone number', type: 'tel', placeholder: 'Phone', auto: 'tel', mode: 'tel' },
};

function validate(field: Field, value: string): string {
  const v = value.trim();
  if (field === 'name') return v.length >= 2 ? '' : 'Please enter your name.';
  if (field === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Please enter a valid email address.';
  return /^\+?\d[\d\s-]{8,13}\d$/.test(v) ? '' : 'Please enter a valid phone number.';
}

function LeadForm({ model, dark = false, id }: { model: Model; dark?: boolean; id: string }) {
  const { fields } = model.form;
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const [number, setNumber] = useState<number | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    for (const f of fields) {
      const msg = validate(f, values[f] ?? '');
      if (msg) {
        setError(msg);
        return;
      }
    }
    setError('');
    const key = fields.map(f => (values[f] ?? '').trim().toLowerCase()).join('|');
    setNumber(model.form.proofBase + saveLead(model.slug, key));
  };

  if (number !== null) {
    return (
      <motion.div id={id} role="status" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        className={`rounded-2xl px-5 py-4 flex items-start gap-3 max-w-md text-left ${dark ? 'bg-white/10 text-white' : 'bg-white border border-line shadow-soft'}`}>
        <span className="w-8 h-8 rounded-full bg-accent text-accent-ink grid place-items-center shrink-0"><Check className="w-4 h-4" /></span>
        <div>
          <div className="font-semibold">{model.form.success.replace('{n}', number.toLocaleString('en-IN'))}</div>
          <p className={`text-sm mt-0.5 ${dark ? 'text-white/70' : 'text-ink-muted'}`}>{model.form.note}</p>
        </div>
      </motion.div>
    );
  }

  const single = fields.length === 1;
  const inputCls = `min-w-0 h-11 px-4 rounded-full outline-none text-[15px] ${dark ? 'bg-white/10 text-white placeholder:text-white/50' : 'bg-paper text-ink placeholder:text-ink-muted/70'} ${single ? 'flex-1 bg-transparent' : 'w-full sm:flex-1'}`;

  return (
    <form id={id} onSubmit={submit} noValidate className="w-full max-w-lg">
      <div className={`flex flex-col sm:flex-row gap-2 p-1.5 rounded-2xl sm:rounded-full ${dark ? 'bg-white/10' : 'bg-white border border-line shadow-soft'}`}>
        {fields.map(f => (
          <label key={f} className="contents">
            <span className="sr-only">{FIELD[f].label}</span>
            <input
              type={FIELD[f].type}
              inputMode={FIELD[f].mode}
              autoComplete={FIELD[f].auto}
              placeholder={FIELD[f].placeholder}
              value={values[f] ?? ''}
              onChange={e => setValues(v => ({ ...v, [f]: e.target.value }))}
              className={inputCls}
            />
          </label>
        ))}
        <button type="submit" className={dark ? 'btn-accent' : 'btn-primary'}>
          {model.form.button} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      {error && <p className={`mt-2 text-sm font-medium ${dark ? 'text-accent' : 'text-red-600'}`}>{error}</p>}
    </form>
  );
}

function Countdown({ model }: { model: Model }) {
  const c = model.countdown!;
  const { days, hours, mins, secs } = useCountdown(model.slug, c.days);
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">{c.label}</span>
      <div className="flex gap-1.5">
        {[{ v: days, l: 'days' }, { v: hours, l: 'hours' }, { v: mins, l: 'mins' }, { v: secs, l: 'secs' }].map(x => (
          <div key={x.l} className="min-w-[52px] rounded-xl bg-ink text-white px-2 py-1.5 text-center">
            <div className="font-display text-lg font-bold tabular-nums leading-none">{String(x.v).padStart(2, '0')}</div>
            <div className="text-[10px] text-white/60 mt-0.5">{x.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero({ model }: { model: Model }) {
  const count = useLeadCount(model.slug, model.form.proofBase);
  const h = model.hero;
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_10%,rgb(var(--brand-soft))_0%,transparent_70%),radial-gradient(40%_40%_at_0%_80%,rgb(var(--paper))_0%,transparent_70%)]" />
      <div className="wrap pt-10 sm:pt-16 pb-16 sm:pb-24 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <div>
          <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" /> {h.badge}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-[40px] sm:text-[60px] leading-[1.04] font-bold tracking-tight">
            {h.title}{' '}
            <span className="relative">
              <span className="relative z-10">{h.highlight}</span>
              <span className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-3 sm:h-4 bg-accent/60 rounded" />
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.6 }} className="mt-5 text-lg text-ink-soft max-w-xl">
            {h.text}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="mt-8 space-y-5">
            <LeadForm model={model} id="lead" />
            {model.countdown && <Countdown model={model} />}
          </motion.div>
          <div className="mt-6 flex items-center gap-3 text-sm text-ink-muted">
            <div className="flex -space-x-2">
              {['bg-brand', 'bg-accent', 'bg-amber-400', 'bg-sky-400'].map(c => <span key={c} className={`w-8 h-8 rounded-full border-2 border-white ${c}`} />)}
            </div>
            <span><b className="text-ink">{count.toLocaleString('en-IN')}</b> {model.form.proofText}</span>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.7 }}>
          <HeroVisual kind={h.visual} />
        </motion.div>
      </div>
    </section>
  );
}

function Stats({ model }: { model: Model }) {
  return (
    <section className="bg-ink text-white">
      <div className="wrap py-10 grid grid-cols-3 gap-4 text-center">
        {model.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="font-display text-2xl sm:text-5xl font-bold text-accent">{s.value}</div>
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

function Features({ model }: { model: Model }) {
  const f = model.features;
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="wrap">
        <SectionHead eyebrow={f.eyebrow} title={f.title} text={f.text} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {f.items.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 0.08}>
              <div className="group h-full rounded-3xl border border-line bg-white p-6 hover:shadow-soft hover:-translate-y-1 transition-[box-shadow,transform]">
                <span className="w-11 h-11 rounded-2xl bg-brand-soft text-brand grid place-items-center group-hover:bg-brand group-hover:text-white transition-colors">
                  <Icon name={it.icon} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold">{it.title}</h3>
                <p className="mt-2 text-[15px] text-ink-soft leading-relaxed">{it.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Steps({ model }: { model: Model }) {
  return (
    <section id="steps" className="py-20 sm:py-28 bg-paper">
      <div className="wrap">
        <SectionHead eyebrow={model.nav.steps} title={model.steps.title} />
        <ol className="grid md:grid-cols-3 gap-10 md:gap-6 relative">
          <div className="hidden md:block absolute top-7 left-[16%] right-[16%] border-t-2 border-dashed border-brand/30" aria-hidden />
          {model.steps.items.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12}>
              <li className="relative text-center px-4">
                <span className="relative z-10 mx-auto w-14 h-14 rounded-2xl bg-brand text-white font-display text-2xl font-bold grid place-items-center shadow-glow">{i + 1}</span>
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

function Pricing({ model }: { model: Model }) {
  const p = model.pricing;
  const hasToggle = p.plans.some(x => x.yearlyPrice);
  const [yearly, setYearly] = useState(true);
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="wrap">
        <SectionHead eyebrow={p.eyebrow} title={p.title} text={p.text} />
        {hasToggle && (
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1 rounded-full bg-paper border border-line" role="group" aria-label="Billing period">
              {[{ v: false, l: 'Monthly' }, { v: true, l: 'Yearly · 2 months free' }].map(o => (
                <button key={o.l} onClick={() => setYearly(o.v)} aria-pressed={yearly === o.v}
                  className={`relative px-4 h-9 rounded-full text-sm font-semibold transition-colors ${yearly === o.v ? 'text-white' : 'text-ink-soft'}`}>
                  {yearly === o.v && <motion.span layoutId="billing" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
                  <span className="relative">{o.l}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {p.plans.map((plan, i) => {
            const price = yearly && plan.yearlyPrice ? plan.yearlyPrice : plan.price;
            const note = yearly && plan.yearlyNote ? plan.yearlyNote : plan.note;
            const pop = plan.popular;
            return (
              <Reveal key={plan.name} delay={i * 0.08} className="h-full">
                <div className={`relative h-full rounded-3xl p-7 flex flex-col ${pop ? 'bg-ink text-white shadow-glow md:-translate-y-3' : 'bg-white border border-line'}`}>
                  {pop && <span className="absolute -top-3 left-7 rounded-full bg-accent text-accent-ink text-xs font-bold px-3 py-1">Most popular</span>}
                  <div className="font-display text-xl font-bold">{plan.name}</div>
                  <p className={`text-sm mt-1 ${pop ? 'text-white/60' : 'text-ink-muted'}`}>{plan.blurb}</p>
                  <div className="mt-6 flex items-end gap-1.5 flex-wrap">
                    <span className="font-display text-4xl sm:text-5xl font-bold">{price}</span>
                    {plan.period && <span className={`mb-1.5 text-sm ${pop ? 'text-white/60' : 'text-ink-muted'}`}>{plan.period}</span>}
                  </div>
                  <div className={`text-xs mt-1 min-h-4 ${pop ? 'text-white/50' : 'text-ink-muted'}`}>{note}</div>
                  <ul className="mt-6 space-y-3 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-[15px]">
                        <span className={`mt-0.5 w-5 h-5 rounded-full grid place-items-center shrink-0 ${pop ? 'bg-accent text-accent-ink' : 'bg-brand-soft text-brand'}`}><Check className="w-3 h-3" /></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => scrollToId('lead')} className={`mt-8 w-full ${pop ? 'btn-accent' : 'btn-ghost'}`}>{plan.cta}</button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials({ model }: { model: Model }) {
  return (
    <section className="py-20 sm:py-28 bg-paper">
      <div className="wrap">
        <SectionHead eyebrow="Reviews" title={model.testimonials.title} text="Sample reviews for this prototype." />
        <div className="grid md:grid-cols-3 gap-5">
          {model.testimonials.items.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="h-full">
              <figure className="h-full rounded-3xl bg-white border border-line p-7 flex flex-col">
                <div className="flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="w-4 h-4" fill="currentColor" />)}
                </div>
                <blockquote className="mt-4 text-[16px] leading-relaxed flex-1">“{t.text}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-brand-soft text-brand font-bold grid place-items-center">{t.name[0]}</span>
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

function Faq({ model }: { model: Model }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="wrap max-w-3xl">
        <SectionHead eyebrow="FAQ" title="Questions, answered." />
        <div className="divide-y divide-line border-y border-line">
          {model.faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}
                  className="w-full py-5 flex items-center justify-between gap-4 text-left font-display text-lg font-semibold hover:text-brand transition-colors">
                  {f.q}
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-brand' : ''}`} />
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

function FinalCta({ model }: { model: Model }) {
  return (
    <section className="pb-20 sm:pb-28">
      <div className="wrap">
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] bg-ink text-white px-6 py-14 sm:px-14 sm:py-20 text-center">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand/40 blur-3xl" aria-hidden />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent/20 blur-3xl" aria-hidden />
            <h2 className="relative h2">{model.final.title}</h2>
            <p className="relative mt-4 text-white/70 text-lg max-w-xl mx-auto">{model.final.text}</p>
            <div className="relative mt-8 flex justify-center">
              <LeadForm model={model} dark id="lead-bottom" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer({ model, next }: { model: Model; next?: Model }) {
  return (
    <footer className="border-t border-line">
      <div className="wrap py-10 grid gap-8 md:grid-cols-[1fr_auto] items-start">
        <div>
          <Logo model={model} />
          <p className="mt-3 text-sm text-ink-muted max-w-md">
            This is a sample <b className="text-ink">{model.kind.toLowerCase()}</b> landing page from{' '}
            <a href="#/" className="font-semibold text-brand hover:underline">Trinity Landing (Prototype)</a> by{' '}
            <a href={TRINITY_URL} target="_blank" rel="noreferrer" className="font-semibold text-brand hover:underline">Trinity Tech</a>.
            {' '}{model.name} and everything on this page are made up.
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-3">
          <a href={START_PROJECT_URL} target="_blank" rel="noreferrer" className="btn-primary">
            Get a page like this <ArrowUpRight className="w-4 h-4" />
          </a>
          <div className="flex gap-4 text-sm font-semibold">
            <a href="#/" className="text-ink-soft hover:text-brand">All models</a>
            {next && <a href={`#/${next.slug}`} className="text-ink-soft hover:text-brand">Next: {next.kind} →</a>}
          </div>
          <TrinityCredit />
        </div>
      </div>
    </footer>
  );
}
