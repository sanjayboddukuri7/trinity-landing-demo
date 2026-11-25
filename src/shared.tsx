import { useEffect, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import {
  Activity, Mic, Building2, ShoppingBag, Ticket, Flame, Bell, TrendingUp, Users, Moon, ShieldCheck, Video, Briefcase, BookOpen,
  CirclePlay, Waves, Trees, Smile, Dumbbell, Zap, Sparkles, Shirt, Baby, Crown, Scissors, Truck, CodeXml, Bot, Terminal,
  Presentation, Gamepad2, Music, Check, ArrowLeft, ArrowRight, ArrowUpRight, MessageCircle, LayoutGrid,
  type LucideIcon,
} from 'lucide-react';
import type { Model } from './models/types';

export const TRINITY_URL = 'https://trinity-tech.vercel.app';
export const START_PROJECT_URL = `${TRINITY_URL}/project?category=${encodeURIComponent('Landing Page')}`;
export const whatsappUrl = (about: string) =>
  `https://wa.me/917075452718?text=${encodeURIComponent(`Hi Trinity Tech, I saw ${about} in Trinity Landing (Demo) and would like a landing page for my business.`)}`;

const ICONS: Record<string, LucideIcon> = {
  activity: Activity, mic: Mic, building: Building2, shopping: ShoppingBag, ticket: Ticket, flame: Flame, bell: Bell,
  trending: TrendingUp, users: Users, moon: Moon, shield: ShieldCheck, video: Video, briefcase: Briefcase, book: BookOpen,
  play: CirclePlay, waves: Waves, trees: Trees, smile: Smile, dumbbell: Dumbbell, zap: Zap, sparkles: Sparkles, shirt: Shirt,
  baby: Baby, crown: Crown, scissors: Scissors, truck: Truck, code: CodeXml, bot: Bot, terminal: Terminal,
  presentation: Presentation, gamepad: Gamepad2, music: Music,
};

export function Icon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  const I = ICONS[name] ?? Check;
  return <I className={className} aria-hidden />;
}

/* ---------- routing: "#/coaching" -> "coaching" ---------- */

const parse = () => window.location.hash.replace(/^#\/?/, '').split('/')[0] || '';

export function useRoute(): string {
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const on = () => {
      setRoute(parse());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

/** Smooth-scroll to a section without touching the URL hash (the hash is used for routing). */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 76;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
}

/* ---------- animation ---------- */

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
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

/* ---------- per-model storage (browser only) ---------- */

const KEY = (slug: string, what: string) => `trinity-landing-demo:${slug}:${what}`;

export function loadLeads(slug: string): string[] {
  try {
    const list = JSON.parse(localStorage.getItem(KEY(slug, 'leads')) || '[]');
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveLead(slug: string, id: string): number {
  const list = loadLeads(slug);
  const at = list.indexOf(id);
  if (at >= 0) return at + 1;
  list.push(id);
  try {
    localStorage.setItem(KEY(slug, 'leads'), JSON.stringify(list));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event('leads-change'));
  return list.length;
}

export function useLeadCount(slug: string, base: number) {
  const [count, setCount] = useState(() => base + loadLeads(slug).length);
  useEffect(() => {
    const update = () => setCount(base + loadLeads(slug).length);
    update();
    window.addEventListener('leads-change', update);
    return () => window.removeEventListener('leads-change', update);
  }, [slug, base]);
  return count;
}

/** Each model's deadline is fixed per visitor (first visit + N days) so the countdown never runs out. */
function deadline(slug: string, days: number): number {
  try {
    const saved = Number(localStorage.getItem(KEY(slug, 'deadline')));
    if (saved > Date.now()) return saved;
    const d = new Date();
    d.setDate(d.getDate() + days);
    d.setHours(10, 0, 0, 0);
    localStorage.setItem(KEY(slug, 'deadline'), String(d.getTime()));
    return d.getTime();
  } catch {
    return Date.now() + days * 86_400_000;
  }
}

export function useCountdown(slug: string, days: number) {
  const [target, setTarget] = useState(() => deadline(slug, days));
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => setTarget(deadline(slug, days)), [slug, days]);
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const s = Math.max(0, Math.floor((target - now) / 1000));
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), mins: Math.floor((s % 3600) / 60), secs: s % 60, target };
}

/* ---------- Trinity demo chrome ---------- */

const GOLD = 'bg-gradient-to-r from-[#b8741a] via-[#e8a33d] to-[#f6d28a] text-[#1b1407]';

/** Top bar on every model: says it is a demo, which model it is, and links between models. */
export function ModelBar({ model, index, total, prev, next }: { model: Model; index: number; total: number; prev?: Model; next?: Model }) {
  return (
    <div role="note" className={`${GOLD} text-[12.5px]`}>
      <div className="wrap py-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
        <a href="#/" className="inline-flex items-center gap-1.5 font-semibold hover:underline underline-offset-2">
          <LayoutGrid className="w-3.5 h-3.5" /> All landing page models
        </a>
        <span className="flex items-center gap-2 text-center">
          <span className="rounded-full bg-[#1b1407] text-gold-light px-2 py-0.5 text-[10.5px] font-bold tracking-[0.14em]">DEMO</span>
          <span>
            Model {index + 1} of {total}: <b>{model.kind}</b> · goal: {model.goal.toLowerCase()}
          </span>
        </span>
        <span className="flex items-center gap-3 font-semibold">
          {prev && <a href={`#/${prev.slug}`} className="inline-flex items-center gap-1 hover:underline underline-offset-2"><ArrowLeft className="w-3.5 h-3.5" /> Prev</a>}
          {next && <a href={`#/${next.slug}`} className="inline-flex items-center gap-1 hover:underline underline-offset-2">Next <ArrowRight className="w-3.5 h-3.5" /></a>}
        </span>
      </div>
    </div>
  );
}

export function TrinityCredit({ dark = false }: { dark?: boolean }) {
  return (
    <a href={TRINITY_URL} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 text-xs ${dark ? 'text-white/60' : 'text-ink-muted'}`}>
      <img src="/mark.png" alt="" className="w-6 h-5 object-contain" />
      <span className={`font-brand tracking-[0.14em] ${dark ? 'text-white' : 'text-ink'}`}>TRINITY TECH</span>
      <span>· Build. Innovate. Transform.</span>
    </a>
  );
}

export function WhatsAppButton({ about }: { about: string }) {
  return (
    <a
      href={whatsappUrl(about)}
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

export { ArrowRight, ArrowUpRight, Check };
