import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  size: number;
  color: string;
  trail: boolean;
};

type Rocket = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetY: number;
  color: string;
  sparkAt: number;
};

const GOLD = ["#C9962E", "#E3B778", "#F5D48A", "#B8860B", "#FFE7B0", "#D4A017"];

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function pick(arr: string[]) {
  return arr[(Math.random() * arr.length) | 0]!;
}

function explode(
  particles: Particle[],
  flashes: { x: number; y: number; life: number }[],
  x: number,
  y: number,
  power: number,
) {
  flashes.push({ x, y, life: 1 });

  const count = Math.floor((36 + Math.random() * 28) * power);
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + rand(-0.1, 0.1);
    const speed = rand(1.4, 5.2) * power;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: rand(0.008, 0.015),
      size: rand(1.6, 3.4) * power,
      color: pick(GOLD),
      trail: Math.random() > 0.4,
    });
  }

  for (let i = 0; i < 16; i++) {
    const angle = rand(0, Math.PI * 2);
    const speed = rand(0.2, 1.3);
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: rand(0.015, 0.028),
      size: rand(3, 5.5),
      color: "#FFF6E0",
      trail: false,
    });
  }
}

/** Soft gold fireworks for the invite opening. `showKey > 0` starts a short display. */
export function GoldFireworks({ showKey }: { showKey: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const showKeyRef = useRef(showKey);
  const startShowRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    showKeyRef.current = showKey;
    if (showKey > 0) startShowRef.current?.();
  }, [showKey]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const particles: Particle[] = [];
    const rockets: Rocket[] = [];
    const flashes: { x: number; y: number; life: number }[] = [];

    let raf = 0;
    let alive = true;
    let last = performance.now();
    let launchesLeft = 0;
    let nextLaunch = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const launchRocket = (now: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      rockets.push({
        x: rand(w * 0.16, w * 0.84),
        y: h + 10,
        vx: rand(-0.4, 0.4),
        vy: rand(-9.8, -7.4),
        targetY: rand(h * 0.16, h * 0.4),
        color: pick(GOLD),
        sparkAt: now,
      });
    };

    const frame = (now: number) => {
      if (!alive) return;
      const dt = Math.min((now - last) / 16.67, 2.2);
      last = now;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      if (launchesLeft > 0 && now >= nextLaunch) {
        launchRocket(now);
        launchesLeft -= 1;
        nextLaunch = now + rand(260, 500);
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i]!;
        r.x += r.vx * dt;
        r.y += r.vy * dt;
        r.vy += 0.05 * dt;

        ctx.globalAlpha = 0.95;
        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.1, 0, Math.PI * 2);
        ctx.fill();

        if (now - r.sparkAt > 28) {
          particles.push({
            x: r.x + rand(-1, 1),
            y: r.y + rand(0, 3),
            vx: rand(-0.2, 0.2),
            vy: rand(0.35, 1.1),
            life: 1,
            decay: rand(0.03, 0.05),
            size: rand(0.7, 1.3),
            color: r.color,
            trail: false,
          });
          r.sparkAt = now;
        }

        if (r.y <= r.targetY || r.vy >= -1.1) {
          explode(particles, flashes, r.x, r.y, rand(0.9, 1.25));
          rockets.splice(i, 1);
        }
      }

      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i]!;
        f.life -= 0.045 * dt;
        if (f.life <= 0) {
          flashes.splice(i, 1);
          continue;
        }
        const radius = 18 + (1 - f.life) * 55;
        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, radius);
        grad.addColorStop(0, `rgba(255, 236, 190, ${0.45 * f.life})`);
        grad.addColorStop(0.45, `rgba(227, 183, 120, ${0.18 * f.life})`);
        grad.addColorStop(1, "rgba(227, 183, 120, 0)");
        ctx.globalAlpha = 1;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]!;
        p.life -= p.decay * dt;
        p.vy += 0.034 * dt;
        p.vx *= 0.991;
        p.vy *= 0.991;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const a = Math.max(0, p.life);

        // soft halo for contrast on light backgrounds
        ctx.globalAlpha = a * 0.22;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = a * (p.trail ? 0.7 : 1);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.55 + 0.45 * a), 0, Math.PI * 2);
        ctx.fill();

        if (p.trail && a > 0.3) {
          ctx.globalAlpha = a * 0.28;
          ctx.beginPath();
          ctx.arc(p.x - p.vx * 1.2, p.y - p.vy * 1.2, p.size * 0.75, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;

      const busy =
        launchesLeft > 0 || rockets.length > 0 || particles.length > 0 || flashes.length > 0;
      if (busy) {
        raf = requestAnimationFrame(frame);
      } else {
        raf = 0;
        ctx.clearRect(0, 0, w, h);
      }
    };

    const kick = () => {
      if (!alive || raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const startShow = () => {
      particles.length = 0;
      rockets.length = 0;
      flashes.length = 0;

      if (reduceMotion) {
        explode(particles, flashes, canvas.clientWidth * 0.5, canvas.clientHeight * 0.34, 1);
        kick();
        return;
      }

      launchesLeft = 8;
      nextLaunch = 0;
      kick();
    };

    startShowRef.current = startShow;

    resize();
    window.addEventListener("resize", resize);

    // Wait one frame so layout sizes are correct, then start
    const boot = requestAnimationFrame(() => {
      resize();
      if (showKeyRef.current > 0) startShow();
    });

    return () => {
      alive = false;
      startShowRef.current = null;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(boot);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] h-dvh w-full"
    />
  );
}
