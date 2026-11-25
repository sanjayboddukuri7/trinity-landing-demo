# Trinity Landing (Demo)

A demo product landing page by [Trinity Tech](https://trinity-tech.vercel.app), built to show clients what a launch page can look like.

The page advertises **Pulse**, a made-up habit app. Every name, price, number and review is a sample.

- Hero with headline, animated phone mockup, waitlist form and a live launch countdown
- Stats band, 6 features, "how it works" in 3 steps
- Pricing with a monthly / yearly toggle
- Testimonials and an FAQ accordion
- Final call to action, footer and a WhatsApp chat button
- Sticky menu with smooth scrolling to each section, scroll animations, mobile menu
- "Demo by Trinity Tech" ribbon at the top and a footer linking to Trinity Tech

No backend, database or API keys. The waitlist form only saves to the visitor's browser and sends no email.

## Edit the content

All text lives in `src/content.ts`: product name, features, steps, plans, reviews, FAQs and stats.

## Run locally

```
npm install
npm run dev
```

Opens on http://127.0.0.1:3300.

## Deploy on Vercel

Import this repository as a new Vercel project (framework: Vite). Build command `npm run build`, output folder `dist`. No environment variables needed.
