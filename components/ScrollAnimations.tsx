import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsap';

const ScrollAnimations: React.FC = () => {
  useEffect(() => {
    // Refresh ScrollTrigger after a short delay to ensure layout is ready
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Animate service cards with stagger
    gsap.utils.toArray<HTMLElement>('.card-glow').forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 60%',
            toggleActions: 'play none none none',
          },
          delay: index * 0.1,
        }
      );
    });

    // Animate stats with counter effect
    gsap.utils.toArray<HTMLElement>('.stat-card').forEach((stat) => {
      gsap.fromTo(
        stat,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: stat,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Parallax effect for contact items
    gsap.utils.toArray<HTMLElement>('.contact-item').forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: index * 0.15,
        }
      );
    });

    // Section dividers fade in
    gsap.utils.toArray<HTMLElement>('.section-divider').forEach((divider) => {
      gsap.fromTo(
        divider,
        {
          scaleX: 0,
          opacity: 0,
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: divider,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
};

export default ScrollAnimations;
