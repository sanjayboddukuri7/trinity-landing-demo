# Trinity Landing (Prototype)

A prototype by [Trinity Tech](https://trinity-tech.vercel.app) that explains **what a landing page is** and shows **5 working landing page models** for different kinds of business.

## Home page

- What a landing page is (one page, one goal) and a diagram of how ads, QR codes and WhatsApp links lead to enquiries
- Website vs landing page
- Cards for each model: who uses it and what it is built to achieve
- What every landing page includes, and where businesses share it

## The 5 models

| # | Model | Made-up business | Goal |
|---|---|---|---|
| 1 | App / product launch | Pulse (habit app) | Waitlist sign-ups |
| 2 | Coaching course | SpeakUp Academy | Free demo class bookings |
| 3 | Real estate project | Green Meadows | Site visit bookings |
| 4 | Shop festival sale | Rangoli Fashions | Offers on WhatsApp, store visits |
| 5 | Event registration | TechFest 2026 | Registrations and passes |

Each model has its own colours, hero illustration, lead form, countdown, stats, features, steps, pricing, reviews, FAQ, final call to action and WhatsApp button. A gold bar on every page says it is a prototype, which model it is, and links to the other models.

Every business, price, number and review is made up. Forms only save in the visitor's browser: nothing is sent anywhere.

## Edit or add a model

All model content is in `src/models/index.ts`. Copy a model, change its text and colours (`theme`), and pick a hero visual (`phone`, `course`, `property`, `sale` or `ticket`).

## Run locally

```
npm install
npm run dev
```

Opens on http://127.0.0.1:3300.

## Deploy on Vercel

Import this repository as a new Vercel project (framework: Vite). Build command `npm run build`, output folder `dist`. No environment variables needed.
