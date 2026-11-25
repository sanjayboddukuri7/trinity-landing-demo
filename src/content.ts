// All text on the page lives here so it is easy to swap for a real client.
// Pulse is a made-up product: every name, price, number and review below is a sample.

export const TRINITY_URL = 'https://trinity-tech.vercel.app';
export const START_PROJECT_URL = `${TRINITY_URL}/project?category=${encodeURIComponent('Landing Page')}`;
export const WHATSAPP_URL = `https://wa.me/917075452718?text=${encodeURIComponent(
  'Hi Trinity Tech, I saw the Trinity Landing (Demo) page and would like a landing page for my product.',
)}`;

export const PRODUCT = {
  name: 'Pulse',
  tagline: 'The habit app',
  launchInDays: 21,
};

export const NAV = [
  { href: '#features', label: 'Features' },
  { href: '#how', label: 'How it works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

export const FEATURES = [
  { icon: 'flame', title: 'Streaks that motivate', text: 'See your streak grow every day. Miss one? A gentle freeze day keeps it alive.' },
  { icon: 'bell', title: 'Smart reminders', text: 'Reminders arrive when you usually do the habit, not at a random time.' },
  { icon: 'trending', title: 'Clear progress', text: 'Weekly and monthly charts show what is working and what needs a nudge.' },
  { icon: 'users', title: 'Accountability buddies', text: 'Invite a friend, share streaks and cheer each other on.' },
  { icon: 'moon', title: 'Calm by design', text: 'No ads, no endless feed. Open, tick, done in under ten seconds.' },
  { icon: 'shield', title: 'Private by default', text: 'Your habits stay on your phone unless you choose to back them up.' },
];

export const STEPS = [
  { title: 'Pick your habits', text: 'Choose from 40+ ready habits or create your own, like "Read 10 pages" or "Walk 5,000 steps".' },
  { title: 'Tick them off daily', text: 'One tap marks a habit done. Pulse learns your routine and reminds you at the right time.' },
  { title: 'Watch the streak grow', text: 'Your weekly report shows progress, best days and the habits that need attention.' },
];

export const PLANS = [
  {
    name: 'Free',
    monthly: 0,
    blurb: 'For trying Pulse out.',
    features: ['Up to 3 habits', 'Daily reminders', '7-day history'],
    cta: 'Join the waitlist',
  },
  {
    name: 'Pro',
    monthly: 149,
    blurb: 'For building real routines.',
    features: ['Unlimited habits', 'Smart reminders', 'Full history & charts', 'Streak freeze days', 'Home-screen widgets'],
    cta: 'Get early access',
    popular: true,
  },
  {
    name: 'Family',
    monthly: 299,
    blurb: 'Pro for up to 5 people.',
    features: ['Everything in Pro', 'Up to 5 members', 'Shared family goals', 'Accountability buddies'],
    cta: 'Join the waitlist',
  },
];

export const TESTIMONIALS = [
  { name: 'Ananya R.', role: 'Product designer', text: 'I have tried five habit apps. Pulse is the first one I still open after a month. The reminders feel like they know me.', stars: 5 },
  { name: 'Daniel K.', role: 'University student', text: 'The streak freeze is genius. Missing one gym day no longer ruins my whole week.', stars: 5 },
  { name: 'Meera & family', role: 'Family plan tester', text: 'Our kids compete on reading streaks now. Shared goals turned a chore into a game.', stars: 5 },
];

export const FAQS = [
  { q: 'When does Pulse launch?', a: 'The countdown at the top shows the launch day. Everyone on the waitlist gets an invite a week early.' },
  { q: 'Is there a free plan?', a: 'Yes. The Free plan covers up to 3 habits forever. You can upgrade to Pro at any time.' },
  { q: 'Which phones does it work on?', a: 'Pulse will launch on Android and iPhone, with a web version for tracking from your laptop.' },
  { q: 'Can I cancel Pro whenever I want?', a: 'Yes. Cancel in two taps from settings; you keep Pro until the end of the period you paid for.' },
  { q: 'Is this a real product?', a: 'No. Pulse is a made-up product for this demo. Trinity Tech built this page to show what a launch page for your product could look like.' },
];

export const STATS = [
  { value: '12k+', label: 'early testers' },
  { value: '4.9', label: 'average rating' },
  { value: '86%', label: 'keep a 30-day streak' },
];
