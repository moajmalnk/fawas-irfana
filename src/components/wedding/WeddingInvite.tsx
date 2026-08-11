import { motion, useScroll, useTransform, useInView } from "motion/react";
import { MapPinned } from "lucide-react";
import { useRef } from "react";

import { GoldDust } from "@/components/GoldDust";
import { GoldHeart } from "@/components/GoldHeart";
import { InviteMusic } from "@/components/InviteMusic";
import bismillah from "@/assets/bismillah.png";
import couple from "@/assets/couple.png";
import leavesBack from "@/assets/leaves-back.png";
import leavesFront from "@/assets/leaves-front.png";
import iconCalendar from "@/assets/icon-calendar.png";
import iconVenue from "@/assets/icon-venue.png";
import iconClock from "@/assets/icon-clock.png";

const cushion = [0.22, 1, 0.36, 1] as const;

/** Public Google Maps directions for C.V. Auditorium, Athirumada. */
const VENUE_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=C.V.+Auditorium,+Athirumada,+Puthanathani,+Kerala&destination_place_id=ChIJSTaOmw20pzsRgFpttHiw-IE";

const rise = {
  hidden: { opacity: 0, y: 34, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.1, delay, ease: cushion }}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const yFront = useTransform(scrollYProgress, [0, 1], ["0%", "-42%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-24"
    >
      <motion.img
        src={leavesBack}
        alt=""
        aria-hidden
        style={{ y: yBack }}
        className="pointer-events-none absolute -left-24 -top-20 w-[55vw] max-w-[520px] opacity-70 blur-[1px]"
      />
      <motion.img
        src={leavesBack}
        alt=""
        aria-hidden
        style={{ y: yMid }}
        className="pointer-events-none absolute -right-28 top-1/3 w-[50vw] max-w-[460px] rotate-180 opacity-60 blur-[2px]"
      />
      <motion.img
        src={leavesFront}
        alt=""
        aria-hidden
        style={{ y: yFront }}
        className="pointer-events-none absolute -bottom-20 -left-16 w-[62vw] max-w-[540px] -scale-x-100 opacity-90"
      />
      <motion.img
        src={leavesFront}
        alt=""
        aria-hidden
        style={{ y: yFront }}
        className="pointer-events-none absolute -bottom-24 -right-20 w-[60vw] max-w-[520px] opacity-90"
      />

      <motion.div
        style={{ opacity: fade }}
        className="relative z-20 mx-auto w-full max-w-2xl text-center"
      >
        <motion.img
          src={bismillah}
          alt="Bismillah calligraphy in gold"
          width={1408}
          height={512}
          initial={{ opacity: 0, y: -24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.6, ease: cushion }}
          whileHover={{ scale: 1.05, rotate: -1 }}
          className="mx-auto w-56 cursor-pointer drop-shadow-[0_10px_24px_rgba(180,140,70,0.35)] sm:w-72"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: [40, -6, 0] }}
          transition={{ duration: 1.6, delay: 0.35, ease: cushion }}
          className="glass-panel mt-10 rounded-[2rem] px-6 py-10 sm:px-12"
        >
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="font-sans text-[0.68rem] uppercase tracking-[0.42em] text-gold-deep">
              Bismillahir Rahmanir Raheem
            </p>
            <div className="gold-rule mx-auto mt-6 h-px w-32" />
            <h1 className="mt-6 font-display text-3xl font-light tracking-wide text-primary sm:text-4xl">
              Mr. Ali Haji <span className="text-gold-deep">&amp;</span> Mrs. Kadheeja
            </h1>
            <p className="mt-3 font-sans text-sm font-light tracking-wide text-muted-foreground">
              Kottakkulath House, Punnathala PO, Puthanathani
            </p>
            <div className="gold-rule mx-auto mt-7 h-px w-20" />
            <p className="mx-auto mt-7 max-w-md font-display text-lg font-light italic leading-relaxed text-primary/85 sm:text-xl">
              Cordially invite your esteemed presence with family on the auspicious occasion of the
              marriage of our son
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mt-12 h-12 w-px bg-gold"
        />
      </motion.div>
    </section>
  );
}

function CoupleSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section ref={ref} className="relative overflow-hidden px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <div className="relative mx-auto w-[min(100%,20rem)] sm:w-[min(100%,26rem)] md:w-[min(100%,28rem)]">
            <motion.div
              style={{ y }}
              whileHover={{ scale: 1.02, rotateY: 4, rotateX: -2 }}
              transition={{ duration: 0.9, ease: cushion }}
              className="relative mx-auto aspect-square w-full [transform-style:preserve-3d]"
            >
              <div
                aria-hidden
                className="absolute inset-x-[10%] bottom-[6%] top-[18%] rounded-[40%] bg-secondary/65 blur-2xl"
              />
              <img
                src={couple}
                alt="Cartoon portrait of Muhammed Fawas Wafy and Irfana Mahdiyya in Kerala wedding attire"
                width={1024}
                height={1024}
                loading="lazy"
                className="relative z-10 aspect-square h-full w-full object-cover object-center drop-shadow-[0_28px_40px_rgba(44,76,59,0.28)]"
              />

              {/* Pedestal locked to the portrait so it stays centered while scrolling */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-full z-20 flex w-full -translate-x-1/2 -translate-y-[32%] flex-col items-center"
              >
                <motion.div
                  animate={{ opacity: [0.4, 0.9, 0.4], scaleX: [0.95, 1.06, 0.95] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="mb-[-0.4rem] h-[clamp(0.45rem,1.3vw,0.7rem)] w-[70%] rounded-full bg-gold/75 blur-[7px]"
                />
                <div className="h-[clamp(0.95rem,2.5vw,1.4rem)] w-[56%] rounded-[50%] border border-gold/45 bg-[#f7f4ec] shadow-[0_12px_28px_-12px_rgba(44,76,59,0.45)]" />
                <div className="h-[clamp(1.4rem,3.8vw,2.35rem)] w-[40%] rounded-b-[1.75rem] bg-gradient-to-b from-[#f7f4ec] to-transparent" />
              </div>
            </motion.div>

            {/* Reserve space for the overhanging pedestal */}
            <div className="h-[clamp(2.15rem,7vw,3.5rem)]" aria-hidden />
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-14">
          <h2 className="text-gold-3d font-script text-4xl leading-tight sm:text-6xl">
            Muhammed Fawas Wafy
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="my-6 flex items-center justify-center gap-4"
          >
            <span className="gold-rule h-px w-16" />
            <span className="font-display text-base italic text-primary/70">weds</span>
            <span className="gold-rule h-px w-16" />
          </motion.div>
        </Reveal>

        <Reveal delay={0.28}>
          <h2 className="text-gold-3d font-script text-4xl leading-tight sm:text-6xl">
            Irfana Mahdiyya
          </h2>
          <p className="mt-5 font-sans text-sm font-light tracking-[0.16em] text-muted-foreground">
            D/o. Abdul Majeed &amp; Umaiba, Perum Kuzhiyil (H)
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function DetailCard({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.article
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1, delay, ease: cushion }}
      whileHover={{ y: -10 }}
      className="glass-panel flex flex-col items-center rounded-[1.75rem] px-6 py-10 text-center"
    >
      {children}
    </motion.article>
  );
}

function EventDetails() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative px-5 py-20 sm:py-28">
      <Reveal className="mb-14 text-center">
        <p className="font-sans text-[0.65rem] uppercase tracking-[0.45em] text-gold-deep">
          Save the date
        </p>
        <div className="gold-rule mx-auto mt-5 h-px w-24" />
      </Reveal>

      <div ref={ref} className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
        <DetailCard delay={0}>
          <motion.img
            src={iconCalendar}
            alt="3D calendar model"
            width={700}
            height={700}
            loading="lazy"
            animate={inView ? { rotateX: [0, -70, 12, 0] } : {}}
            transition={{ duration: 1.8, ease: cushion, delay: 0.3 }}
            whileHover={{ scale: 1.08, rotate: 2 }}
            className="h-28 w-28 object-contain [transform-origin:top_center]"
          />
          <span className="mt-6 font-display text-6xl font-light text-primary">16</span>
          <p className="mt-2 font-sans text-sm tracking-[0.18em] text-muted-foreground">
            Sunday, August 2026
          </p>
          <p className="mt-1 font-sans text-xs tracking-[0.14em] text-gold-deep">
            (1448 Rabi Al Awwal 3)
          </p>
        </DetailCard>

        <DetailCard delay={0.12}>
          <motion.img
            src={iconVenue}
            alt="3D miniature model of C.V. Auditorium"
            width={700}
            height={700}
            loading="lazy"
            animate={{ rotateY: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            whileHover={{ scale: 1.08 }}
            className="h-28 w-28 object-contain"
          />
          <span className="mt-6 font-display text-3xl font-light text-primary">
            C.V. Auditorium
          </span>
          <p className="mt-2 font-sans text-sm tracking-[0.18em] text-muted-foreground">
            Athirumada, Puthanathani
          </p>
          <a
            href={VENUE_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-secondary/40 px-4 py-2 font-sans text-[0.7rem] uppercase tracking-[0.22em] text-gold-deep transition-colors hover:border-gold hover:bg-secondary/70 hover:text-primary"
          >
            <MapPinned className="h-3.5 w-3.5" aria-hidden />
            Get directions
          </a>
        </DetailCard>

        <DetailCard delay={0.24}>
          <div className="relative h-28 w-28">
            <motion.img
              src={iconClock}
              alt="3D grandfather clock model"
              width={700}
              height={700}
              loading="lazy"
              whileHover={{ scale: 1.08 }}
              className="h-28 w-28 object-contain"
            />
            {/* sweeping hands over the clock face */}
            <motion.span
              animate={inView ? { rotate: [0, 330] } : {}}
              transition={{ duration: 2.4, ease: cushion, delay: 0.4 }}
              className="absolute left-1/2 top-[31%] h-[14px] w-[2px] origin-bottom -translate-x-1/2 -translate-y-full rounded-full bg-primary"
            />
            <motion.span
              animate={inView ? { rotate: [0, 720] } : {}}
              transition={{ duration: 2.4, ease: cushion, delay: 0.4 }}
              className="absolute left-1/2 top-[31%] h-[20px] w-[1.5px] origin-bottom -translate-x-1/2 -translate-y-full rounded-full bg-primary/70"
            />
          </div>
          <span className="mt-6 font-display text-2xl font-light text-primary sm:text-3xl">
            11:00 am to 02:00 pm
          </span>
          <p className="mt-2 font-sans text-sm tracking-[0.18em] text-muted-foreground">
            Nikah &amp; Reception
          </p>
        </DetailCard>
      </div>
    </section>
  );
}

function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["18%", "0%"]);

  return (
    <footer ref={ref} className="relative overflow-hidden px-5 pb-24 pt-20 text-center">
      <motion.img
        src={leavesFront}
        alt=""
        aria-hidden
        style={{ y }}
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-16 -left-20 w-[55vw] max-w-[420px] -scale-x-100 opacity-80"
      />
      <motion.img
        src={leavesBack}
        alt=""
        aria-hidden
        style={{ y }}
        animate={{ rotate: [2, -2, 2] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-24 -right-16 w-[52vw] max-w-[400px] opacity-70"
      />

      <Reveal className="relative z-10">
        <div className="gold-rule mx-auto h-px w-28" />
        <p className="mt-8 font-display text-xl font-light italic text-primary sm:text-2xl">
          Best compliments from:
        </p>
        <p className="mt-2 font-display text-2xl tracking-wide text-primary sm:text-3xl">
          Friends &amp; Relatives
        </p>
        <GoldHeart className="mx-auto mt-6 h-32 w-32" />
      </Reveal>
    </footer>
  );
}

export function WeddingInvite() {
  return (
    <main className="relative min-h-screen bg-background">
      <InviteMusic />
      <GoldDust />
      <Hero />
      <CoupleSection />
      <EventDetails />
      <Footer />
    </main>
  );
}
