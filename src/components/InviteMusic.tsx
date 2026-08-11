import { AnimatePresence, motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import bismillah from "@/assets/bismillah.png";
import leavesBack from "@/assets/leaves-back.png";
import leavesFront from "@/assets/leaves-front.png";

const MUSIC_SRC = "/baraka-allahu-lakuma.mp3";
const VOLUME = 0.42;
const cushion = [0.22, 1, 0.36, 1] as const;

export function InviteMusic({ onOpen }: { onOpen?: () => void }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const wantPlaying = useRef(true);
  const [entered, setEntered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [opening, setOpening] = useState(false);

  const startMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    try {
      await audio.play();
      wantPlaying.current = true;
      setPlaying(true);
      // gentle fade-in
      const start = performance.now();
      const fade = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        audio.volume = VOLUME * t;
        if (t < 1) requestAnimationFrame(fade);
      };
      requestAnimationFrame(fade);
    } catch {
      wantPlaying.current = false;
      setPlaying(false);
    }
  };

  const openInvite = () => {
    if (opening || entered) return;
    setOpening(true);
    onOpen?.();
    void startMusic();
    // let exit animation + fireworks breathe before unmounting gate
    window.setTimeout(() => setEntered(true), 720);
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      wantPlaying.current = false;
      setPlaying(false);
      return;
    }

    try {
      audio.volume = VOLUME;
      await audio.play();
      wantPlaying.current = true;
      setPlaying(true);
    } catch {
      wantPlaying.current = false;
      setPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  useEffect(() => {
    if (!entered) return;

    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) {
        audio.pause();
        return;
      }
      if (wantPlaying.current) {
        audio.play().catch(() => setPlaying(false));
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [entered]);

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} preload="auto" loop playsInline />

      <AnimatePresence>
        {!entered && (
          <motion.div
            key="gate"
            role="dialog"
            aria-modal="true"
            aria-labelledby="invite-gate-title"
            initial={{ opacity: 0 }}
            animate={{
              opacity: opening ? 0 : 1,
              scale: opening ? 1.04 : 1,
              filter: opening ? "blur(10px)" : "blur(0px)",
            }}
            exit={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
            transition={{ duration: opening ? 0.85 : 1.1, ease: cushion }}
            className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-background px-5"
          >
            {/* Atmosphere */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,color-mix(in_oklab,var(--primary)_6%,transparent)_100%)]"
            />
            <motion.img
              src={leavesBack}
              alt=""
              aria-hidden
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: opening ? 0 : 0.7, x: 0 }}
              transition={{ duration: 1.4, ease: cushion }}
              className="pointer-events-none absolute -left-20 -top-16 w-[58vw] max-w-[460px] blur-[1px]"
            />
            <motion.img
              src={leavesBack}
              alt=""
              aria-hidden
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: opening ? 0 : 0.55, x: 0 }}
              transition={{ duration: 1.4, ease: cushion, delay: 0.08 }}
              className="pointer-events-none absolute -right-24 top-[18%] w-[52vw] max-w-[420px] rotate-180 blur-[2px]"
            />
            <motion.img
              src={leavesFront}
              alt=""
              aria-hidden
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: opening ? 0 : 0.85, y: 0 }}
              transition={{ duration: 1.5, ease: cushion, delay: 0.12 }}
              className="pointer-events-none absolute -bottom-16 -left-14 w-[62vw] max-w-[480px] -scale-x-100"
            />
            <motion.img
              src={leavesFront}
              alt=""
              aria-hidden
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: opening ? 0 : 0.85, y: 0 }}
              transition={{ duration: 1.5, ease: cushion, delay: 0.16 }}
              className="pointer-events-none absolute -bottom-20 -right-16 w-[58vw] max-w-[460px]"
            />

            <div className="relative z-10 w-full max-w-md text-center">
              <motion.img
                src={bismillah}
                alt="Bismillah calligraphy in gold"
                width={1408}
                height={512}
                initial={{ opacity: 0, y: -16, scale: 0.94 }}
                animate={{ opacity: opening ? 0 : 1, y: 0, scale: 1 }}
                transition={{ duration: 1.3, ease: cushion, delay: 0.15 }}
                className="mx-auto w-44 drop-shadow-[0_10px_24px_rgba(180,140,70,0.35)] sm:w-56"
              />

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: opening ? 0 : 1, y: 0 }}
                transition={{ duration: 0.9, ease: cushion, delay: 0.35 }}
                className="mt-8 font-sans text-[0.65rem] uppercase tracking-[0.42em] text-gold-deep"
              >
                With grace &amp; blessings
              </motion.p>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: opening ? 0 : 1, opacity: opening ? 0 : 1 }}
                transition={{ duration: 0.8, ease: cushion, delay: 0.48 }}
                className="gold-rule mx-auto mt-5 h-px w-24 origin-center"
              />

              <motion.h2
                id="invite-gate-title"
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                animate={{
                  opacity: opening ? 0 : 1,
                  y: 0,
                  filter: opening ? "blur(8px)" : "blur(0px)",
                }}
                transition={{ duration: 1.1, ease: cushion, delay: 0.55 }}
                className="text-gold-3d mt-6 font-script text-5xl leading-tight sm:text-6xl"
              >
                Fawas &amp; Irfana
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: opening ? 0 : 1, y: 0 }}
                transition={{ duration: 0.9, ease: cushion, delay: 0.7 }}
                className="mt-4 font-display text-lg font-light italic text-primary/80"
              >
                Baraka Allahu Lakuma
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: opening ? 0 : 1 }}
                transition={{ duration: 0.8, ease: cushion, delay: 0.82 }}
                className="mt-3 font-sans text-[0.7rem] tracking-[0.22em] text-muted-foreground"
              >
                16 August 2026
              </motion.p>

              <motion.button
                type="button"
                onClick={openInvite}
                disabled={opening}
                initial={{ opacity: 0, y: 16 }}
                animate={{
                  opacity: opening ? 0 : 1,
                  y: 0,
                  scale: opening ? 0.96 : 1,
                }}
                whileHover={opening ? undefined : { scale: 1.03 }}
                whileTap={opening ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.85, ease: cushion, delay: 0.95 }}
                className="relative mt-10 inline-flex min-h-12 w-full items-center justify-center overflow-hidden rounded-full border border-gold/60 bg-secondary/55 px-10 py-3.5 font-sans text-[0.72rem] uppercase tracking-[0.28em] text-gold-deep shadow-[0_16px_40px_-24px_rgba(180,140,70,0.55)] transition-colors hover:border-gold hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 disabled:cursor-wait sm:w-auto"
              >
                <motion.span
                  aria-hidden
                  animate={{ x: ["-120%", "120%"] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.4 }}
                  className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-gold-light/35 to-transparent"
                />
                <span className="relative">{opening ? "Opening…" : "Open invitation"}</span>
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: opening ? 0 : 0.85 }}
                transition={{ duration: 0.8, ease: cushion, delay: 1.1 }}
                className="mt-5 font-sans text-[0.7rem] tracking-wide text-muted-foreground"
              >
                Soft music &amp; blessings await
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {entered && (
          <motion.button
            key="toggle"
            type="button"
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: cushion, delay: 0.15 }}
            onClick={toggleMusic}
            aria-label={playing ? "Mute music" : "Play music"}
            aria-pressed={playing}
            className="fixed bottom-5 right-5 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-gold/45 bg-background/85 text-gold-deep shadow-[0_12px_30px_-16px_rgba(44,76,59,0.45)] backdrop-blur-md transition-colors hover:border-gold hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 sm:bottom-7 sm:right-7"
          >
            {playing ? (
              <Volume2 className="h-5 w-5" aria-hidden />
            ) : (
              <VolumeX className="h-5 w-5" aria-hidden />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
