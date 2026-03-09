# UPSC Command Center — PWA

Full-featured UPSC Civil Services preparation platform. **Works as an installed app on Android and iPhone** — no Play Store, no App Store needed.

---

## 📱 How to Install on Phone

### Android (Chrome)
1. Open the URL in **Chrome**
2. Banner appears at bottom: **"Install UPSC Command Center"** → tap **Install**
3. Or: tap **⋮ menu → Add to Home screen**
4. App opens fullscreen, works offline ✅

### iPhone / iPad (Safari)
1. Open in **Safari**
2. Tap **Share button** → **"Add to Home Screen"** → **Add**
3. App icon on home screen ✅

---

## ✨ PWA Features

| Feature | Status |
|---------|--------|
| 📲 Installable (Android + iOS) | ✅ |
| 🌐 Works fully offline | ✅ Service Worker |
| 💾 Progress saved | ✅ localStorage |
| 🔔 Daily study reminders (7 AM) | ✅ |
| 📳 Haptic feedback | ✅ |
| 🚀 Splash screen | ✅ |
| 🎯 Home screen shortcuts | ✅ |
| 🔄 Auto-updates | ✅ |
| 📐 Notch / Dynamic Island safe | ✅ |

---

## 🚀 Deploy to Vercel

```bash
git init && git add . && git commit -m "UPSC PWA"
git remote add origin https://github.com/YOU/upsc-command-center.git
git push -u origin main
# Import on vercel.com → Deploy
```

### Local dev
```bash
npx serve public   # http://localhost:3000
```

---

## 📁 Structure

```
public/
├── index.html        App shell
├── manifest.json     PWA manifest
├── sw.js             Service worker
├── css/style.css     Main styles
├── css/pwa.css       PWA styles
├── js/app.js         App engine
├── js/pwa.js         PWA engine
├── data/             Questions, news, schemes
└── icons/            72px → 512px icons
```
