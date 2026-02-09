import React, { useEffect, useRef } from 'react';

const MorphingBlobs: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    class Blob {
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 300 + 200;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        
        const colors = [
          'rgba(59, 130, 246, 0.15)',  // blue-500
          'rgba(96, 165, 250, 0.12)',  // blue-400
          'rgba(37, 99, 235, 0.18)',   // blue-600
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x < -this.radius || this.x > canvas.width + this.radius) {
          this.speedX *= -1;
        }
        if (this.y < -this.radius || this.y > canvas.height + this.radius) {
          this.speedY *= -1;
        }

        // Add organic movement
        this.x += Math.sin(time * 0.001) * 0.5;
        this.y += Math.cos(time * 0.001) * 0.5;
      }

      draw() {
        if (!ctx) return;

        // Create radial gradient for each blob
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.5, this.color.replace(/[\d.]+\)/, '0.05)'));
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create blobs
    const blobs: Blob[] = [];
    const blobCount = window.innerWidth > 768 ? 5 : 3;

    for (let i = 0; i < blobCount; i++) {
      blobs.push(new Blob());
    }

    const animate = () => {
      time++;
      
      // Clear canvas with slight fade for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw blobs
      blobs.forEach((blob) => {
        blob.update();
        blob.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  );
};

export default MorphingBlobs;
