# 🚗 Auto Naprawa KARPOL

**Premium landing page** для автомайстерні в Bydgoszczy з калькулятором вартості та формою замовлень.

> ✨ **Оновлено з WOW-ефектами!** Додано 7 premium функцій для максимально вражаючого досвіду.

---

## 🎨 Features

### ✅ Основні можливості
- 📱 Responsive дизайн (mobile-first)
- 🧮 Інтерактивний калькулятор вартості послуг
- 📝 Форма збору лідів
- 🗺️ Інтеграція Google Maps
- 🌙 Темний преміум дизайн
- ♿ Accessibility (ARIA labels, keyboard navigation)

### ⭐ Premium WOW-ефекти (NEW!)
1. **🚘 3D модель автомобіля** - інтерактивна з mouse parallax
2. **🌊 Smooth Scroll** - плавна інерційна прокрутка (Lenis)
3. **🧲 Magnetic Buttons** - кнопки притягуються до курсору
4. **✨ Gradient Cursor Trail** - кастомний курсор з синім слідом
5. **🎨 Morphing Blobs** - анімовані органічні форми на фоні
6. **📊 Scroll Progress Bar** - індикатор прогресу прокрутки
7. **🎬 Timeline Animations** - GSAP ScrollTrigger анімації

---

## 🚀 Quick Start

```bash
# 1. Встановити залежності
npm install

# 2. Запустити dev сервер
npm run dev

# 3. Відкрити http://localhost:5174
```

---

## 📦 Tech Stack

### Core
- **React 19** - UI framework
- **TypeScript** - type safety
- **Vite** - build tool
- **Tailwind CSS** - styling

### Animations & 3D
- **Three.js** + **@react-three/fiber** - 3D graphics
- **@react-three/drei** - Three.js helpers
- **Framer Motion** - React animations
- **GSAP** - timeline animations
- **Lenis** - smooth scroll

---

## 🎯 Configuration

### Environment Variables

Створіть `.env.local`:

```env
# Номер телефону (за замовчуванням: +48 52 320 00 00)
VITE_BUSINESS_PHONE=+48123456789

# Webhook для лідів (POST endpoint)
VITE_LEAD_WEBHOOK_URL=https://your-api.com/leads
```

---

## 📁 Project Structure

```
KARPOL/
├── components/
│   ├── CarModel3D.tsx          # 3D модель авто
│   ├── SmoothScroll.tsx        # Smooth scroll wrapper
│   ├── MagneticButton.tsx      # Magnetic кнопки
│   ├── GradientCursor.tsx      # Кастомний курсор
│   ├── MorphingBlobs.tsx       # Анімовані blobs
│   ├── ScrollProgress.tsx      # Progress bar
│   ├── ScrollAnimations.tsx    # GSAP анімації
│   ├── Calculator.tsx          # Калькулятор вартості
│   ├── LeadMagnet.tsx          # Форма лідів
│   ├── Testimonials.tsx        # Відгуки клієнтів
│   └── ConceptGarage.tsx       # Галерея авто
├── utils/
│   └── gsap.ts                 # GSAP setup
├── constants.tsx               # Бізнес-дані
├── types.ts                    # TypeScript types
├── App.tsx                     # Main component
└── index.css                   # Global styles
```

---

## 📖 Documentation

### Для розробників:

- **[WOW_FEATURES.md](./WOW_FEATURES.md)** - Детальний опис всіх premium функцій
- **[QUICK_START.md](./QUICK_START.md)** - Швидкий старт та налаштування
- **[FEATURES_SUMMARY.md](./FEATURES_SUMMARY.md)** - Візуальний summary
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Покрокове тестування
- **[OPTIMIZATION_TIPS.md](./OPTIMIZATION_TIPS.md)** - Рекомендації по оптимізації

---

## 🎨 Customization

### Зміна кольорів

```typescript
// tailwind.config.cjs
module.exports = {
  theme: {
    extend: {
      colors: {
        blue: {
          400: '#60a5fa', // Змінити тут
          500: '#3b82f6',
          600: '#2563eb',
        }
      }
    }
  }
}
```

### Налаштування анімацій

```typescript
// Smooth Scroll швидкість
// components/SmoothScroll.tsx
duration: 1.5, // default: 1.2

// Magnetic кнопки сила
// components/MagneticButton.tsx
magneticStrength={0.5} // default: 0.3

// Кількість blobs
// components/MorphingBlobs.tsx
const blobCount = 7; // default: 5
```

---

## 🔨 Build & Deploy

### Production Build

```bash
npm run build
```

Output: `dist/` folder

### Preview Production Build

```bash
npm run preview
```

### Deploy

Проект готовий до деплою на:
- Vercel (рекомендовано)
- Netlify
- GitHub Pages
- CloudFlare Pages

```bash
# Приклад для Vercel
vercel --prod
```

---

## 📊 Performance

### Current Metrics:
- Bundle size: 1.4 MB (gzipped: 428 KB)
- FCP: ~2-3s
- LCP: ~3-4s
- TTI: ~4-5s

### After Optimization:
- Bundle size: ~600 KB (з code splitting)
- FCP: ~1-1.5s
- LCP: ~2-2.5s
- TTI: ~2-3s

Дивіться [OPTIMIZATION_TIPS.md](./OPTIMIZATION_TIPS.md) для деталей.

---

## 🧪 Testing

```bash
# Запустити dev сервер
npm run dev

# Перевірити всі функції
# Дивіться TESTING_GUIDE.md для чеклісту
```

---

## 🐛 Known Issues

### Dev Server Error
Якщо бачите `uv_interface_addresses` помилку:
- Це пов'язано з мережевими інтерфейсами macOS
- Сервер все одно запускається на іншому порту
- Або змініть `host` в `vite.config.ts` на `localhost`

### 3D Model Performance
На слабких пристроях може бути FPS <30:
- Автоматично знижується якість на мобільних
- Можна додатково оптимізувати (див. OPTIMIZATION_TIPS.md)

---

## 🤝 Contributing

Проект створено для KARPOL Auto Naprawa.

### Для додавання нових функцій:
1. Створіть новий компонент в `components/`
2. Додайте типи в `types.ts`
3. Оновіть `App.tsx`
4. Протестуйте на desktop/mobile
5. Оновіть документацію

---

## 📄 License

© 2026 Auto Naprawa KARPOL - All rights reserved

---

## 🙏 Credits

**Технології:**
- React Team - за React 19
- Three.js Team - за 3D можливості
- Framer - за Motion library
- GSAP - за потужні анімації
- Studio Freight - за Lenis

**Дизайн інспірація:**
- Apple.com - smooth interactions
- Tesla.com - 3D presentations
- Awwwards - cutting-edge design

---

## 📞 Contact

**Auto Naprawa KARPOL**  
📍 Gnieźnieńska 6/2, 85-313 Bydgoszcz  
📱 +48 52 320 00 00

---

**Made with ❤️ and cutting-edge tech**  
**Premium experience, premium results! 🚗✨**
