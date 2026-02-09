# ⚡ Quick Reference

## Швидка довідка по проекту

---

## 🚀 Команди

```bash
# Development
npm install          # Встановити залежності
npm run dev         # Запустити dev сервер (http://localhost:5174)

# Production
npm run build       # Build для production (→ dist/)
npm run preview     # Preview production build

# Utilities
npm run lint        # (якщо налаштовано)
npm run type-check  # (якщо налаштовано)
```

---

## 📁 Структура файлів

```
KARPOL/
├── components/           # React компоненти
│   ├── CarModel3D.tsx       # 3D модель авто
│   ├── SmoothScroll.tsx     # Smooth scroll
│   ├── MagneticButton.tsx   # Magnetic кнопки
│   ├── GradientCursor.tsx   # Кастомний курсор
│   ├── MorphingBlobs.tsx    # Анімовані blobs
│   ├── ScrollProgress.tsx   # Progress bar
│   ├── ScrollAnimations.tsx # GSAP анімації
│   ├── Calculator.tsx       # Калькулятор
│   ├── LeadMagnet.tsx       # Форма лідів
│   ├── Testimonials.tsx     # Відгуки
│   └── ConceptGarage.tsx    # Галерея
├── utils/
│   └── gsap.ts              # GSAP config
├── App.tsx                  # Головний компонент
├── constants.tsx            # Бізнес-дані
├── types.ts                 # TypeScript типи
├── index.css               # Global styles
├── vite.config.ts          # Vite config
└── package.json            # Dependencies
```

---

## 🎨 Компоненти - швидкий огляд

### CarModel3D
```tsx
<CarModel3D />
// 3D модель з parallax
// Opacity: 40%, z-index: 1
// Файл: components/CarModel3D.tsx
```

### SmoothScroll
```tsx
<SmoothScroll>
  {children}
</SmoothScroll>
// Wrapper для smooth scroll
// Duration: 1.2s, easing: exponential
```

### MagneticButton
```tsx
<MagneticButton 
  magneticStrength={0.3}
  onClick={handler}
>
  Text
</MagneticButton>
// Magnetic effect на hover
// Spring animation
```

### GradientCursor
```tsx
<GradientCursor />
// Auto-hide на mobile
// Blend mode: screen
// z-index: 10000
```

### MorphingBlobs
```tsx
<MorphingBlobs />
// Canvas animation
// 5 blobs (desktop), 3 (mobile)
// z-index: 0
```

### ScrollProgress
```tsx
<ScrollProgress />
// Фіксований top bar
// z-index: 100
// Spring animation
```

### ScrollAnimations
```tsx
<ScrollAnimations />
// GSAP ScrollTrigger
// Auto-init при mount
// Cleanup при unmount
```

---

## 🎨 Tailwind Classes - найбільш використовувані

```css
/* Backgrounds */
bg-black          /* Головний фон */
bg-carbon-900     /* Секції */
bg-carbon-800     /* Картки */

/* Кольори акценту */
text-blue-400     /* Світло-синій текст */
text-blue-500     /* Синій текст */
bg-blue-600       /* Синій фон (кнопки) */

/* Ефекти */
backdrop-blur-xl  /* Glass effect */
shadow-2xl        /* Глибока тінь */
rounded-xl        /* Закруглення 12px */
rounded-2xl       /* Закруглення 16px */

/* Кастомні класи (index.css) */
.glass-dark       /* Glass navigation */
.card-glow        /* Hover glow effect */
.stat-card        /* Stat container */
.contact-item     /* Contact list item */
.section-divider  /* Gradient line */
.page-grain       /* Noise texture */
```

---

## 🔧 Налаштування

### Environment Variables (.env.local)
```env
VITE_BUSINESS_PHONE=+48123456789
VITE_LEAD_WEBHOOK_URL=https://api.example.com/leads
```

### Constants (constants.tsx)
```tsx
export const BUSINESS_NAME = 'Auto Naprawa KARPOL';
export const OWNER_NAME = 'Paweł Malewicz';
export const ADDRESS = 'Gnieźnieńska 6/2, 85-313 Bydgoszcz';
export const PHONE = '+48 52 320 00 00';
```

---

## 🎯 Параметри анімацій

### Smooth Scroll (SmoothScroll.tsx)
```tsx
duration: 1.2,              // Швидкість (секунди)
wheelMultiplier: 1,         // Чутливість колеса
smoothTouch: false,         // Вимкнено на mobile
```

### Magnetic Buttons (MagneticButton.tsx)
```tsx
magneticStrength: 0.3,      // Сила притягання (0-1)
stiffness: 150,             // Spring stiffness
damping: 15,                // Spring damping
```

### 3D Model (CarModel3D.tsx)
```tsx
pixelRatio: 1.8,            // Max pixel ratio
camera.position.z: 27,      // Відстань камери
rotation.speed: [0.0012, 0.0018], // Швидкість обертання
```

### Blobs (MorphingBlobs.tsx)
```tsx
blobCount: 5,               // Desktop (3 на mobile)
radius: 200-500,            // Розмір blob
speed: 0.3,                 // Швидкість руху
```

### GSAP (ScrollAnimations.tsx)
```tsx
duration: 0.8,              // Тривалість анімації
delay: index * 0.1,         // Stagger delay
start: 'top 85%',           // Trigger point
```

---

## 🎨 Кольорова палітра

### Основні кольори
```css
/* Backgrounds */
--bg-primary: #000000      /* Чорний */
--bg-secondary: #111111    /* Carbon-900 */
--bg-card: #1a1a1a        /* Carbon-800 */

/* Text */
--text-primary: #ffffff    /* Білий */
--text-secondary: #a0a0a0  /* Сірий */

/* Accent */
--accent: #3b82f6         /* Blue-500 */
--accent-light: #60a5fa   /* Blue-400 */
--accent-dark: #2563eb    /* Blue-600 */
```

### Градієнти
```css
/* Cursor trail */
radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent)

/* Progress bar */
linear-gradient(90deg, #2563eb, #60a5fa, #2563eb)

/* Section divider */
linear-gradient(90deg, transparent, #333, #3b82f6, #333, transparent)
```

---

## 🐛 Troubleshooting

### Проблема: Dev server не запускається
```bash
# Network error
# Fix: Змінити host в vite.config.ts
host: 'localhost'  # замість '0.0.0.0'
```

### Проблема: 3D модель не з'являється
```javascript
// Перевірити WebGL support
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl');
console.log('WebGL:', gl ? 'supported' : 'not supported');
```

### Проблема: Smooth scroll не працює
```javascript
// Перевірити конфлікти
// Видалити інші scroll libraries
// Перевірити wrapper <SmoothScroll>
```

### Проблема: Курсор не з'являється
```javascript
// Це нормально на mobile
// Перевірити media query: pointer: coarse
```

---

## 📊 Performance metrics

### Target values
```
FPS: 60 (smooth)
FCP: <1.5s (First Contentful Paint)
LCP: <2.5s (Largest Contentful Paint)
TTI: <3s (Time to Interactive)
Bundle: <1.5 MB
```

### Check performance
```bash
# Chrome DevTools
Performance tab → Record → Stop

# Lighthouse
DevTools → Lighthouse → Generate report

# Bundle analyzer
npm install --save-dev rollup-plugin-visualizer
```

---

## 🔗 Корисні посилання

### Документація
- [Three.js Docs](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [GSAP Docs](https://greensock.com/docs/)
- [Lenis](https://github.com/darkroomengineering/lenis)
- [Framer Motion](https://www.framer.com/motion/)

### Інспірація
- [Awwwards](https://www.awwwards.com/)
- [Tesla](https://www.tesla.com/)
- [Apple](https://www.apple.com/)

### Tools
- [WebPageTest](https://www.webpagetest.org/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)
- [Can I Use](https://caniuse.com/)

---

## 📞 Contacts

**Бізнес:**
Auto Naprawa KARPOL  
Gnieźnieńska 6/2, 85-313 Bydgoszcz  
+48 52 320 00 00

**Tech Stack:**
- React 19.2.4
- Three.js 0.182.0
- TypeScript 5.8.2
- Vite 6.2.0
- Tailwind CSS 3.4.17

---

## 📚 Документація

| Файл | Опис |
|------|------|
| README.md | Головний readme |
| WOW_FEATURES.md | Детальний опис функцій |
| QUICK_START.md | Швидкий старт |
| FEATURES_SUMMARY.md | Візуальний summary |
| TESTING_GUIDE.md | Гайд по тестуванню |
| OPTIMIZATION_TIPS.md | Оптимізація |
| DEMO_PRESENTATION.md | Як презентувати |
| CHANGELOG.md | Історія змін |
| QUICK_REFERENCE.md | Цей файл |

---

## ✅ Чеклист перед деплоєм

- [ ] Build без помилок (`npm run build`)
- [ ] Всі функції працюють
- [ ] Перевірено на Chrome/Firefox/Safari
- [ ] Перевірено на Desktop/Tablet/Mobile
- [ ] Environment variables налаштовані
- [ ] Performance >85 (Lighthouse)
- [ ] No console errors
- [ ] Images оптимізовані
- [ ] Meta tags заповнені
- [ ] Analytics підключено (якщо потрібно)

---

## 🎯 Quick Tips

### Продуктивність
- Lazy load Three.js → -800 KB
- WebP images → -40% розмір
- Code splitting → -30% initial load

### Кастомізація
- Кольори: `tailwind.config.cjs`
- Контент: `constants.tsx`
- Анімації: параметри в компонентах

### Debug
- Console → показує помилки
- React DevTools → component tree
- Performance tab → FPS monitor

---

**Версія:** 2.0.0  
**Оновлено:** 2026-02-09  
**Статус:** ✅ Production Ready

---

**Need help? Check full docs! 📖**
