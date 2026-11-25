import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { BedDouble, CalendarDays, Check, Clock, Flame, Gift, MapPin, Maximize2, Mic, Percent, Star, Users } from 'lucide-react';
import type { Visual } from './models/types';

/* Hero illustrations built from HTML/CSS only, so no images are needed. */

export function HeroVisual({ kind }: { kind: Visual }) {
  const V = { phone: PhoneMockup, course: CourseCard, property: PropertyCard, sale: SaleBadge, ticket: EventTicket }[kind];
  return (
    <div className="relative mx-auto w-[290px] sm:w-[320px] float" aria-hidden>
      <div className="absolute -inset-10 bg-brand/30 blur-3xl rounded-full" />
      <div className="relative"><V /></div>
    </div>
  );
}

function PhoneMockup() {
  const habits = [
    { name: 'Morning walk', meta: '5,000 steps', done: true, color: 'bg-accent' },
    { name: 'Read 10 pages', meta: '12-day streak', done: true, color: 'bg-brand' },
    { name: 'Drink 2 L water', meta: '6 of 8 glasses', done: false, color: 'bg-sky-400' },
    { name: 'No phone after 10 pm', meta: 'Tonight', done: false, color: 'bg-amber-400' },
  ];
  const [ticked, setTicked] = useState(habits.map(h => h.done));
  useEffect(() => {
    const t = setTimeout(() => setTicked(v => v.map((x, i) => (i === 2 ? true : x))), 1800);
    return () => clearTimeout(t);
  }, []);
  const done = ticked.filter(Boolean).length;
  return (
    <div className="rounded-[42px] bg-ink p-3 shadow-glow mx-auto w-[280px]">
      <div className="rounded-[32px] bg-paper overflow-hidden">
        <div className="h-7 flex justify-center pt-2"><div className="w-20 h-5 rounded-full bg-ink" /></div>
        <div className="px-5 pt-3 pb-6">
          <div className="text-xs text-ink-muted">Wednesday</div>
          <div className="font-display text-xl font-bold">Today</div>
          <div className="mt-4 rounded-2xl bg-ink text-white p-4 flex items-center gap-4">
            <div className="relative w-14 h-14">
              <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="4" />
                <motion.circle cx="18" cy="18" r="15" fill="none" className="stroke-accent" strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={94.2} animate={{ strokeDashoffset: 94.2 * (1 - done / habits.length) }} transition={{ duration: 0.8 }} />
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
                <motion.span animate={{ scale: ticked[i] ? [1, 1.25, 1] : 1 }}
                  className={`w-6 h-6 rounded-full grid place-items-center border-2 ${ticked[i] ? 'bg-brand border-brand text-white' : 'border-line'}`}>
                  {ticked[i] && <Check className="w-3.5 h-3.5" />}
                </motion.span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function CourseCard() {
  const [seats, setSeats] = useState(4);
  useEffect(() => {
    const t = setTimeout(() => setSeats(3), 2200);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="space-y-3">
      <div className="rounded-3xl bg-white p-5 shadow-soft border border-line">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-brand bg-brand-soft rounded-full px-2.5 py-1">Live class</span>
          <span className="flex items-center gap-1 text-xs text-red-500 font-semibold"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> LIVE</span>
        </div>
        <div className="mt-4 rounded-2xl bg-ink aspect-video grid place-items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/50 to-transparent" />
          <div className="relative w-16 h-16 rounded-full bg-white/15 grid place-items-center"><Mic className="w-7 h-7 text-white" /></div>
          <div className="absolute bottom-2 left-2 flex gap-1">
            {['bg-accent', 'bg-sky-400', 'bg-amber-400', 'bg-white'].map(c => <span key={c} className={`w-6 h-6 rounded-full ${c} border-2 border-ink`} />)}
            <span className="text-[10px] text-white/80 self-center ml-1">+11 speaking</span>
          </div>
        </div>
        <div className="mt-4 font-display font-bold text-lg">Day 12 · Talking about your day</div>
        <div className="text-xs text-ink-muted mt-1 flex items-center gap-3">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 7:00 – 8:00 pm</span>
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> 15 students</span>
        </div>
      </div>
      <div className="rounded-2xl bg-white p-4 shadow-soft border border-line flex items-center gap-4 ml-8">
        <div className="flex-1">
          <div className="text-xs text-ink-muted">Next batch</div>
          <div className="text-sm font-bold">Only {seats} seats left</div>
          <div className="mt-2 h-2 rounded-full bg-line overflow-hidden">
            <motion.div className="h-full bg-accent" animate={{ width: `${((15 - seats) / 15) * 100}%` }} transition={{ duration: 0.8 }} />
          </div>
        </div>
        <div className="text-right">
          <div className="flex text-amber-400"><Star className="w-3.5 h-3.5" fill="currentColor" /><Star className="w-3.5 h-3.5" fill="currentColor" /><Star className="w-3.5 h-3.5" fill="currentColor" /><Star className="w-3.5 h-3.5" fill="currentColor" /><Star className="w-3.5 h-3.5" fill="currentColor" /></div>
          <div className="text-[11px] text-ink-muted mt-1">4.8 rating</div>
        </div>
      </div>
    </div>
  );
}

function PropertyCard() {
  return (
    <div className="rounded-3xl bg-white shadow-soft border border-line overflow-hidden">
      <div className="relative h-48 bg-gradient-to-b from-sky-200 to-sky-50 overflow-hidden">
        <div className="absolute bottom-0 inset-x-0 h-10 bg-brand/80" />
        {/* towers */}
        {[
          { l: '8%', w: 22, h: 120 },
          { l: '30%', w: 26, h: 150 },
          { l: '56%', w: 24, h: 135 },
          { l: '78%', w: 20, h: 105 },
        ].map((t, i) => (
          <motion.div key={i} initial={{ height: 0 }} animate={{ height: t.h }} transition={{ delay: 0.2 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-8 bg-white border border-line rounded-t-md overflow-hidden" style={{ left: t.l, width: `${t.w}%` }}>
            <div className="grid grid-cols-3 gap-1 p-1.5">
              {Array.from({ length: 24 }).map((_, k) => <span key={k} className={`h-2 rounded-sm ${k % 5 === 0 ? 'bg-amber-200' : 'bg-sky-100'}`} />)}
            </div>
          </motion.div>
        ))}
        {[10, 46, 70, 92].map(x => <span key={x} className="absolute bottom-6 w-6 h-8 rounded-full bg-brand" style={{ left: `${x}%` }} />)}
        <span className="absolute top-3 left-3 text-[11px] font-bold bg-accent text-accent-ink rounded-full px-2.5 py-1">Pre-launch offer</span>
      </div>
      <div className="p-5">
        <div className="font-display font-bold text-lg">Green Meadows</div>
        <div className="text-xs text-ink-muted flex items-center gap-1 mt-0.5"><MapPin className="w-3.5 h-3.5" /> Off the ring road · sample location</div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[
            { i: BedDouble, v: '2 & 3', l: 'BHK' },
            { i: Maximize2, v: '1,150+', l: 'sq ft' },
            { i: Users, v: '320', l: 'homes' },
          ].map(x => (
            <div key={x.l} className="rounded-xl bg-paper py-2">
              <x.i className="w-4 h-4 mx-auto text-brand" />
              <div className="text-sm font-bold mt-1">{x.v}</div>
              <div className="text-[10px] text-ink-muted">{x.l}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="text-[11px] text-ink-muted">Starting from</div>
            <div className="font-display text-2xl font-bold text-brand">₹58 L</div>
          </div>
          <span className="text-xs font-semibold text-brand flex items-center gap-1"><CalendarDays className="w-4 h-4" /> Site visits daily</span>
        </div>
      </div>
    </div>
  );
}

function SaleBadge() {
  return (
    <div className="relative h-[360px]">
      <motion.div initial={{ rotate: -8, scale: 0.8, opacity: 0 }} animate={{ rotate: -6, scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 12 }}
        className="absolute inset-x-4 top-6 rounded-[36px] bg-brand text-white p-8 shadow-glow text-center">
        <div className="text-sm font-semibold tracking-[0.2em] uppercase text-white/80">Diwali sale</div>
        <div className="font-display font-bold leading-none mt-3">
          <span className="text-lg align-top">UP TO</span>
          <div className="text-[96px] -mt-1">50<span className="text-5xl align-top"><Percent className="inline w-12 h-12 -mt-6" strokeWidth={3} /></span></div>
          <span className="text-3xl">OFF</span>
        </div>
        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent text-accent-ink px-4 py-2 text-sm font-bold">
          <Gift className="w-4 h-4" /> Code: DIWALI50
        </div>
      </motion.div>
      {[{ x: '0%', y: '4%', d: 0 }, { x: '84%', y: '0%', d: 0.6 }, { x: '88%', y: '78%', d: 1.1 }, { x: '2%', y: '82%', d: 1.6 }].map((p, i) => (
        <motion.span key={i} className="absolute w-10 h-10 rounded-full bg-accent grid place-items-center shadow-soft" style={{ left: p.x, top: p.y }}
          animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: p.d }}>
          <span className="w-3 h-5 rounded-full bg-orange-500 shadow-[0_0_12px_4px_rgba(251,146,60,.6)]" />
        </motion.span>
      ))}
    </div>
  );
}

function EventTicket() {
  return (
    <div className="space-y-3">
      <motion.div initial={{ rotate: 4, opacity: 0, y: 20 }} animate={{ rotate: -3, opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        className="relative rounded-3xl overflow-hidden shadow-glow">
        <div className="bg-gradient-to-br from-brand to-accent text-white p-6">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="tracking-[0.2em]">ENTRY PASS</span>
            <span className="rounded-full bg-white/20 px-2 py-0.5">FULL FEST</span>
          </div>
          <div className="mt-5 font-display text-4xl font-bold leading-none">TechFest<br />2026</div>
          <div className="mt-4 flex gap-5 text-sm">
            <div><div className="text-white/70 text-[11px]">Days</div><div className="font-bold">2 days</div></div>
            <div><div className="text-white/70 text-[11px]">Events</div><div className="font-bold">40+</div></div>
            <div><div className="text-white/70 text-[11px]">Prizes</div><div className="font-bold">₹2 L</div></div>
          </div>
        </div>
        <div className="relative bg-white p-5 flex items-center gap-4">
          <span className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-paper" />
          <span className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-paper" />
          <div className="absolute top-0 left-5 right-5 border-t-2 border-dashed border-line" />
          <div className="grid grid-cols-7 gap-0.5 w-16 h-16 shrink-0">
            {Array.from({ length: 49 }).map((_, k) => <span key={k} className={(k * 7 + (k % 3)) % 3 === 0 ? 'bg-ink' : 'bg-white'} />)}
          </div>
          <div>
            <div className="text-[11px] text-ink-muted">Entry no.</div>
            <div className="font-display text-xl font-bold">#TF-2141</div>
            <div className="text-xs text-ink-muted">Show this at the help desk</div>
          </div>
        </div>
      </motion.div>
      <div className="ml-10 rounded-2xl bg-white border border-line shadow-soft p-3 flex items-center gap-3">
        <span className="w-9 h-9 rounded-xl bg-brand-soft text-brand grid place-items-center"><Clock className="w-4 h-4" /></span>
        <div className="text-sm"><b>24-hour hackathon</b><div className="text-xs text-ink-muted">Starts 9:00 am, day one</div></div>
      </div>
    </div>
  );
}
