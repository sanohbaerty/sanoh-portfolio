/*
 * Design philosophy for this file: Neo-Noir Terminal Luxe.
 * Every section should feel like a curated command deck—cinematic, restrained,
 * asymmetrical, and precise. Keep emerald glow purposeful and whitespace intentional.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Braces, CloudCog, Layers3, Menu, Send, X } from "lucide-react";
import { toast } from "sonner";

declare global {
  interface Window {
    SweetScroll?: new (
      options?: Record<string, unknown>,
      container?: Window | HTMLElement,
    ) => {
      to?: (target: string | Element, options?: Record<string, unknown>) => void;
    };
  }
}

type WorkItem = {
  title: string;
  url: string;
  description: string;
};

type ServiceItem = {
  title: string;
  description: string;
  icon: typeof CloudCog;
};

type CursorPoint = {
  x: number;
  y: number;
};

const navItems = [
  { id: "home", label: "<Home />" },
  { id: "services", label: "<Services />" },
  { id: "works", label: "<Works />" },
  { id: "contact", label: "<Contact />" },
] as const;

const services: ServiceItem[] = [
  {
    title: "Advanced Systems",
    icon: CloudCog,
    description:
      "Combat, NPC AI, data, admin, matchmaking, UI, and other gameplay systems.",
  },
  {
    title: "Experience",
    icon: Braces,
    description:
      "Roblox scripting since 2021 across RPGs, horror games, combat projects, and full game systems.",
  },
  {
    title: "Modular Development",
    icon: Layers3,
    description:
      "Readable, reusable code built so other scripters can understand, maintain, and expand it.",
  },
];

const mainProjectWorks: WorkItem[] = [
  {
    title: "UI Systems",
    url: "https://www.youtube.com/embed/HwHYA1jvwgI",
    description: "Loading screen, main menu, and credits system.",
  },
  {
    title: "Data Storage",
    url: "https://www.youtube.com/embed/1F8Xw7acBBs",
    description:
      "Handles player data, including inventory items and game progress across multiple sessions.",
  },
  {
    title: "Advanced Combat",
    url: "https://www.youtube.com/embed/xZsybGue6pA",
    description:
      "Custom sword mechanics with raycast-based hit detection and varying damage values per weapon.",
  },
  {
    title: "NPC AI",
    url: "https://www.youtube.com/embed/JeqF5xwAOjk",
    description:
      "Enemies that engage the player and return to their original positions if the player retreats.",
  },
  {
    title: "ADVANCED Admin UI and chat commands",
    url: "https://www.youtube.com/embed/wbai4O9HZRc",
    description:
      "Advanced admin UI with all-time history, offline player modification, moderation tools, and a sophisticated command system.",
  },
];

const combatFrameworkWorks: WorkItem[] = [
  {
    title: "Core Combat Loop",
    url: "https://www.youtube.com/embed/1Rt1ZwhaPc8",
    description: "Base combat flow showing attacks, timing, and responsiveness.",
  },
  {
    title: "Hit Detection + Stuns",
    url: "https://www.youtube.com/embed/kmLFY1KfWIc",
    description: "Server-validated hitboxes with stun state and combat interruption rules.",
  },
  {
    title: "Status Effects System",
    url: "https://www.youtube.com/embed/EMJQv439jUs",
    description:
      "Burn, speed changes, and state-based modifiers applied through an easy-to-work-with effect system.",
  },
  {
    title: "Adding a New Move (Scalability)",
    url: "https://www.youtube.com/embed/S-pgZrpP_iw",
    description: "Shows how easily new abilities integrate into the existing combat architecture.",
  },
  {
    title: "NPC Combat Integration",
    url: "https://www.youtube.com/embed/xig3j0SqNwE",
    description:
      "NPCs use the same combat rules as players and can perform the same actions, including dashing, blocking, and attacking.",
  },
];

const advancedNpcAiWorks: WorkItem[] = [
  {
    title: "Framework Overview",
    url: "https://drive.google.com/file/d/1s_PPVyEinV0JVcy6G4K-oD5Bol2VWVSx/preview",
    description:
      "A reusable controller stack powers multiple NPC definitions with configurable models, stats, brains, movement, perception, relationships, and combat behavior.",
  },
  {
    title: "Vision + Target Memory",
    url: "https://drive.google.com/file/d/1gkdKATtAwhvj0sWcYJeUEx9FG79j3HRM/preview",
    description:
      "NPCs detect visible targets, remember last-known positions and velocity, lose confidence over time, search intelligently, and return to normal behavior when memory expires.",
  },
  {
    title: "Movement + Pathfinding",
    url: "https://drive.google.com/file/d/1jXh7NKjQO9Vn09QJh1fps77MNbnTNORb/preview",
    description:
      "Direct movement, obstacle-aware pathfinding, reusable patrol routes, stuck recovery, repath control, and token-based protection from stale movement callbacks.",
  },
  {
    title: "Behavior Brains",
    url: "https://drive.google.com/file/d/1Ag7Y8AUFfrclCRTknOFbQzmnwzoloNYp/preview",
    description:
      "Blackboard-driven brains handle wandering, chasing, attacking, searching, fleeing, and returning home while physical StateMachine states remain separate.",
  },
  {
    title: "Combat + Facing",
    url: "https://drive.google.com/file/d/1mID_eGBldsJYZdLRkjotLv4pVGLXGC_2/preview",
    description:
      "Action requests flow through adapter-driven combat with cooldowns, windup validation, smooth target facing, line-of-sight checks, and server-authoritative damage.",
  },
  {
    title: "Factions + Stress Test",
    url: "https://drive.google.com/file/d/1eLlE7mq9NeXLWJGoIu0motDAiuLy9WYM/preview",
    description:
      "Relationship rules control enemies, allies, neutral targets, and fear behavior while hundreds of active NPCs run perception, memory, brains, movement, and combat together.",
  },
];

const miniProjectWorks: WorkItem[] = [
  {
    title: "Punching Game",
    url: "https://www.youtube.com/embed/3E-byUlA2Lw",
    description: "Basic fist-combat system. Scripting focus, free-model visuals.",
  },
  {
    title: "Quick Game Prototype",
    url: "https://www.youtube.com/embed/jNHMg3l2JAo",
    description: "Sword combat built in one hour. Raycasting for hit detection.",
  },
  {
    title: "FPS System",
    url: "https://www.youtube.com/embed/QYZ2gZHKA8U",
    description: "Automatic FPS behavior scripted around free-model assets.",
  },
  {
    title: "Matchmaking System",
    url: "https://www.youtube.com/embed/Ggs4yjOrNKo",
    description: "Simple matchmaking. Fast build, functionality first.",
  },
  {
    title: "Hatching System",
    url: "https://www.youtube.com/embed/D7RLIFk3YkU",
    description: "Hatching mechanic in 30 minutes. Clean and functional.",
  },
];

const codeStrings = [
  "game:GetService()",
  "RemoteEvent:FireServer()",
  "workspace.Player",
  ":WaitForChild()",
  "DataStore:SetAsync()",
  "math.random(1,100)",
  "task.wait(0.5)",
  "CollectionService:AddTag()",
  "RunService.Heartbeat",
  "TweenService:Create()",
];

const contactSnippets = [
  "Modular and Clean Code",
  "Anti-Exploit Security",
  "Always Available",
  "Combat System Specialized",
  "UI = Awe",
  "Sophisticated & Performant",
];

const heroAsset =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663552534182/AepXHzyP2458FXmTq6i8Ca/sanoh-hero-atmosphere-MRbbcYvSzKhUe66zCx9Hdj.webp";
const servicesAsset =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663552534182/AepXHzyP2458FXmTq6i8Ca/sanoh-services-texture-fh26FRpfeRwe28iGbAYBnx.webp";
const contactAsset =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663552534182/AepXHzyP2458FXmTq6i8Ca/sanoh-contact-orb-scene-7KHkiJ3uvaTTiCqwDCRoVM.webp";

function WorksCategoryHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="reveal max-w-4xl space-y-3 pt-2">
      <p className="text-[0.76rem] font-semibold uppercase tracking-[0.28em] text-[#00FF94]">
        {eyebrow}
      </p>
      <h3 className="text-[clamp(1.8rem,4vw,3.1rem)] font-bold tracking-[-0.045em] text-white">
        {title}
      </h3>
      <p className="muted-copy max-w-2xl text-[1.02rem] leading-8">{description}</p>
    </div>
  );
}

function WorksGroup({
  title,
  description,
  works,
}: {
  title: string;
  description: string;
  works: WorkItem[];
}) {
  return (
    <div className="reveal space-y-8">
      <div className="max-w-3xl space-y-3">
        <h3 className="section-subtitle">{title}</h3>
        <p className="muted-copy max-w-2xl text-[1.02rem] leading-8">{description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {works.map((work) => (
          <article
            key={work.title}
            className="work-card liquid-glass glass-shimmer overflow-hidden rounded-[15px] border border-white/10"
          >
            <div className="aspect-video overflow-hidden border-b border-white/10 bg-black/30">
              <iframe
                className="h-full w-full"
                src={work.url}
                title={work.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
              />
            </div>

            <div className="space-y-3 p-5">
              <h4 className="text-[1.05rem] font-bold text-white">{work.title}</h4>
              <p className="text-[0.96rem] leading-7 text-white/60">{work.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [discordTag, setDiscordTag] = useState("");
  const [message, setMessage] = useState("");
  const [consentPayment, setConsentPayment] = useState(false);
  const [consentDetails, setConsentDetails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);
  const targetCursor = useRef<CursorPoint>({ x: 0, y: 0 });
  const ringCursor = useRef<CursorPoint>({ x: 0, y: 0 });
  const sections = useMemo(() => navItems.map((item) => item.id), []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark");
    return () => root.classList.remove("dark");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.SweetScroll) return;

    const sweetScroll = new window.SweetScroll(
      {
        trigger: "a[href^='#']",
        speed: 700,
        offset: 92,
        easing: "easeInOutCubic",
      },
      window,
    );

    return () => {
      void sweetScroll;
    };
  }, []);

  useEffect(() => {
    const revealed = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    revealed.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const navbarHeight = 88;
      const current = sections.findLast((sectionId) => {
        const section = document.getElementById(sectionId);
        if (!section) return false;
        return window.scrollY >= section.offsetTop - navbarHeight - 20;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sections]);

  useEffect(() => {
    const root = document.documentElement;

    if (window.matchMedia("(max-width: 767px)").matches) {
      root.classList.remove("has-custom-cursor");
      return;
    }

    root.classList.add("has-custom-cursor");

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;

    if (!dot || !ring) {
      root.classList.remove("has-custom-cursor");
      return;
    }

    const onMove = (event: MouseEvent) => {
      targetCursor.current = { x: event.clientX, y: event.clientY };

      if (!ringCursor.current.x && !ringCursor.current.y) {
        ringCursor.current = { x: event.clientX, y: event.clientY };
      }
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    let frame = 0;

    const render = () => {
      const { x, y } = targetCursor.current;

      ringCursor.current.x += (x - ringCursor.current.x) * 0.16;
      ringCursor.current.y += (y - ringCursor.current.y) * 0.16;

      dot.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      ring.style.transform = `translate3d(${ringCursor.current.x - 10}px, ${
        ringCursor.current.y - 10
      }px, 0)`;

      frame = window.requestAnimationFrame(render);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    onEnter();
    frame = window.requestAnimationFrame(render);

    return () => {
      root.classList.remove("has-custom-cursor");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;

    if (!canvas || !hero) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
    };

    type CodeSnippet = {
      text: string;
      x: number;
      y: number;
      speed: number;
      size: number;
      alpha: number;
    };

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let particles: Particle[] = [];
    let snippets: CodeSnippet[] = [];

    const mouse = {
      x: -9999,
      y: -9999,
    };

    const createParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.34,
      vy: (Math.random() - 0.5) * 0.34,
      radius: 1 + Math.random(),
      baseAlpha: 0.4 + Math.random() * 0.2,
    });

    const createSnippet = (): CodeSnippet => ({
      text: codeStrings[Math.floor(Math.random() * codeStrings.length)] ?? "task.wait(0.5)",
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.18 + Math.random() * 0.45,
      size: 11 + Math.random() * 3,
      alpha: 0.04 + Math.random() * 0.03,
    });

    const resize = () => {
      width = hero.clientWidth;
      height = hero.clientHeight;

      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      particles = Array.from(
        { length: Math.max(46, Math.floor(width / 24)) },
        createParticle,
      );

      snippets = Array.from(
        { length: Math.max(16, Math.floor(width / 110)) },
        createSnippet,
      );
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      for (const snippet of snippets) {
        snippet.y -= snippet.speed;

        if (snippet.y < -24) {
          snippet.y = height + 18;
          snippet.x = Math.random() * width;
        }

        context.font = `${snippet.size}px "IBM Plex Mono"`;
        context.fillStyle = `rgba(255, 255, 255, ${snippet.alpha})`;
        context.fillText(snippet.text, snippet.x, snippet.y);
      }

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i]!;
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.hypot(dx, dy);

        if (distance < 110) {
          const force = (110 - distance) / 110;
          const angle = Math.atan2(dy, dx);

          particle.x += Math.cos(angle) * force * 1.4;
          particle.y += Math.sin(angle) * force * 1.4;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -1;
        }

        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -1;
        }

        const cursorGlow = distance < 120 ? 0.25 : 0;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(0, 255, 148, ${particle.baseAlpha + cursorGlow})`;
        context.fill();

        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j]!;
          const lineDistance = Math.hypot(particle.x - other.x, particle.y - other.y);

          if (lineDistance <= 120) {
            const alpha = (1 - lineDistance / 120) * 0.1;

            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = `rgba(0, 255, 148, ${alpha})`;
            context.lineWidth = 1;
            context.stroke();
          }
        }
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleCardMove = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const glow = target.querySelector<HTMLElement>(".tracking-glow");

    if (!glow) return;

    const rect = target.getBoundingClientRect();

    glow.style.left = `${event.clientX - rect.left}px`;
    glow.style.top = `${event.clientY - rect.top}px`;
    glow.style.opacity = "1";
  };

  const handleCardLeave = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const glow = target.querySelector<HTMLElement>(".tracking-glow");

    if (!glow) return;

    glow.style.left = "78%";
    glow.style.top = "22%";
    glow.style.opacity = "0";
  };

  const closeMobileNav = () => {
    setMobileOpen(false);
  };

  const handleAnchorNavigate =
    (sectionId: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      closeMobileNav();

      const section = document.getElementById(sectionId);
      if (!section) return;

      const navbarOffset = 92;
      const top = section.getBoundingClientRect().top + window.scrollY - navbarOffset;

      window.scrollTo({
        top: Math.max(top, 0),
        behavior: "smooth",
      });

      window.history.replaceState(null, "", `#${sectionId}`);
      setActiveSection(sectionId);
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!discordTag.trim()) {
      toast.error("Discord tag is required.");
      return;
    }

    if (!message.trim()) {
      toast.error("Please describe what you need built.");
      return;
    }

    if (!consentPayment || !consentDetails) {
      toast.error("Both agreement checkboxes must be accepted.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      content: "<@1060002966125432842>",
      allowed_mentions: {
        users: ["1060002966125432842"],
      },
      embeds: [
        {
          title: "New Sanoh Portfolio Inquiry",
          color: 65428,
          fields: [
            {
              name: "Discord Tag",
              value: discordTag.trim(),
              inline: true,
            },
            {
              name: "Message",
              value: message.trim(),
              inline: false,
            },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    try {
      const response = await fetch(
        "https://ptb.discord.com/api/webhooks/1482478580926775456/u70dEjWoi_NBzQrqFg8TXxLSXEZU02aceOGVX12nKjjSLarN35rsBEiimBRcTTep74aJ",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error(`Webhook failed with status ${response.status}`);
      }

      toast.success("Message sent successfully.");

      setDiscordTag("");
      setMessage("");
      setConsentPayment(false);
      setConsentDetails(false);
    } catch (_error) {
      toast.error("Could not send the message. Try Discord directly at .sanoh.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0a0a0a] text-white">
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorRingRef} className="cursor-ring" />
      <div className="noise-overlay" />

      <header className="fixed inset-x-0 top-0 z-[999] px-3 pt-3 md:px-6">
        <div className="liquid-glass mx-auto flex max-w-[1320px] items-center justify-between rounded-[18px] px-4 py-3 md:px-6 md:py-4">
          <a
            href="#home"
            onClick={handleAnchorNavigate("home")}
            className="brand-mark text-sm font-semibold uppercase tracking-[0.32em] text-white"
          >
            Sanoh
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleAnchorNavigate(item.id)}
                className={`code-link ${activeSection === item.id ? "active" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Open navigation"
            className="liquid-glass flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5 text-[#59FFB9]" />
          </button>
        </div>

        {mobileOpen ? (
          <div className="mobile-nav-panel liquid-glass-strong mt-3 min-h-[calc(100vh-92px)] rounded-[24px] border border-white/10 px-6 py-6 lg:hidden">
            <div className="mb-10 flex items-center justify-between">
              <span className="text-sm uppercase tracking-[0.28em] text-white/60">
                Navigate
              </span>

              <button
                type="button"
                aria-label="Close navigation"
                className="liquid-glass flex h-11 w-11 items-center justify-center rounded-full"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-5 w-5 text-[#59FFB9]" />
              </button>
            </div>

            <div className="flex flex-col gap-7 pt-6">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={handleAnchorNavigate(item.id)}
                  className={`mobile-nav-link text-[1.5rem] font-medium tracking-[-0.04em] ${
                    activeSection === item.id ? "text-[#59FFB9]" : "text-white"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <section
          id="home"
          ref={heroRef}
          className="relative isolate flex min-h-screen items-center overflow-hidden px-4 pt-28 md:px-6"
        >
          <img
            src={heroAsset}
            alt=""
            className="ambient-image pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-black/55" />
          <canvas ref={canvasRef} className="absolute inset-0 z-[1] h-full w-full" />

          <div className="container relative z-[2]">
            <div className="mx-auto flex max-w-[980px] flex-col items-center text-center">
              <div className="reveal hero-badge liquid-glass mb-8 rounded-full px-4 py-2 text-[0.95rem] text-[#00FF94] sm:text-[1.05rem]">
                Roblox Scripter · Available for hire
              </div>

              <h1 className="reveal hero-title">
                <span className="hero-title-main" data-text="SANOH">
                  SANOH
                </span>
              </h1>

              <div className="reveal mt-3">
                <span className="glitch-text" data-text="FULLSTACK SCRIPTER">
                  FULLSTACK SCRIPTER
                </span>
              </div>

              <p className="reveal mt-7 max-w-[560px] text-[1.05rem] leading-8 text-white/60 sm:text-[1.22rem] md:text-[1.34rem]">
                Building advanced Roblox systems since 2021 with clean, modular code that
                other developers can understand and expand.
              </p>

              <div className="reveal hero-actions mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#works"
                  onClick={handleAnchorNavigate("works")}
                  className="ghost-cta liquid-glass-strong"
                >
                  View My Work
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="#contact"
                  onClick={handleAnchorNavigate("contact")}
                  className="primary-cta"
                >
                  Hire Me
                </a>
              </div>
            </div>
          </div>

          <div className="hero-fade" />
        </section>

        <section id="services" className="section-shell relative overflow-hidden px-4 md:px-6">
          <img
            src={servicesAsset}
            alt=""
            className="services-image pointer-events-none absolute right-0 top-24 hidden h-[70%] w-[48%] max-w-[760px] object-cover object-right md:block"
          />

          <div className="container relative z-[2]">
            <div className="max-w-4xl">
              <h2 className="section-title reveal">Services</h2>
            </div>

            <div className="stagger-grid grid gap-6 lg:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <article
                    key={service.title}
                    onMouseMove={handleCardMove}
                    onMouseLeave={handleCardLeave}
                    className="service-card liquid-glass-strong glass-shimmer reveal relative overflow-hidden rounded-[20px] p-8"
                  >
                    <div className="tracking-glow" />

                    <div className="relative z-[2] space-y-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00FF94]/20 bg-black/25 text-[#00FF94]">
                        <Icon className="h-7 w-7" />
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-[1.6rem] font-bold text-[#00FF94] sm:text-[2rem]">
                          {service.title}
                        </h3>

                        <p className="text-[1rem] leading-8 text-white/60 sm:text-[1.08rem]">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="works" className="section-shell relative px-4 md:px-6">
          <div className="container relative z-[2] space-y-20">
            <div className="max-w-4xl">
              <h2 className="section-title reveal">My Work</h2>
              <p className="reveal mt-5 max-w-2xl text-[1.05rem] leading-8 text-white/60">
                My strongest system work is shown first, followed by project experience and
                smaller builds covering other areas of Roblox development.
              </p>
            </div>

            <div className="space-y-16">
              <WorksCategoryHeading
                eyebrow="Featured Systems"
                title="Advanced Frameworks"
                description="The strongest examples of how I structure, scale, and connect large Roblox systems."
              />

              <WorksGroup
                title="Scalable Combat Framework"
                description="A reusable combat architecture built for responsive gameplay, server-side validation, status effects, clean state handling, and fast expansion across different games."
                works={combatFrameworkWorks}
              />

              <WorksGroup
                title="Advanced NPC AI Framework"
                description="A reusable Roblox NPC AI framework with modular spawning, perception, target memory, movement, behavior brains, action adapters, relationship rules, debugging tools, and large-scale stress testing."
                works={advancedNpcAiWorks}
              />
            </div>

            <div className="space-y-16 border-t border-white/10 pt-16">
              <WorksCategoryHeading
                eyebrow="Project Experience"
                title="Collaborative Game Work"
                description="Systems created while working with other developers on larger Roblox game projects."
              />

              <WorksGroup
                title="Reawakening of the Prodigious Swords"
                description="A collaborative RPG passion project where I work as a lead scripter. It is separate from paid work and does not affect commission availability."
                works={mainProjectWorks}
              />
            </div>

            <div className="space-y-16 border-t border-white/10 pt-16">
              <WorksCategoryHeading
                eyebrow="Additional Work"
                title="Mini Projects"
                description="Smaller builds that show range, fast implementation, and experience across different gameplay systems."
              />

              <WorksGroup
                title="Other Systems and Prototypes"
                description="These projects focus on scripting and functionality rather than custom visual assets."
                works={miniProjectWorks}
              />
            </div>
          </div>
        </section>

        <section id="contact" className="section-shell relative overflow-hidden px-4 md:px-6">
          <div className="container relative z-[2]">
            <div className="max-w-4xl">
              <h2 className="section-title reveal">Let&apos;s Connect!</h2>

              <p className="reveal mb-10 max-w-2xl text-[1.05rem] leading-8 text-white/60 sm:text-[1.12rem]">
                Message me on Discord (.sanoh) or fill out the form below.
              </p>
            </div>

            <div className="stagger-grid grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
              <div className="reveal">
                <form
                  onSubmit={handleSubmit}
                  className="liquid-glass-strong rounded-[20px] p-6 sm:p-8"
                >
                  <div className="space-y-7">
                    <div>
                      <label
                        htmlFor="discord-tag"
                        className="text-sm uppercase tracking-[0.18em] text-white/50"
                      >
                        Discord Tag
                      </label>

                      <input
                        id="discord-tag"
                        value={discordTag}
                        onChange={(event) => setDiscordTag(event.target.value)}
                        placeholder=".sanoh"
                        className="custom-input"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="text-sm uppercase tracking-[0.18em] text-white/50"
                      >
                        Message
                      </label>

                      <textarea
                        id="message"
                        rows={5}
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder="What do you need built?"
                        className="custom-textarea resize-none"
                      />

                      <p className="tiny-copy mt-3">
                        Let me know if it&apos;s long-term or short-term and include budget info.
                      </p>
                    </div>

                    <label className="consent-row">
                      <input
                        type="checkbox"
                        checked={consentPayment}
                        onChange={(event) => setConsentPayment(event.target.checked)}
                      />

                      <span className="consent-box" />

                      <span>
                        I understand that work is performed either per task or with 45% upfront
                        payment; purely post-completion payment is not accepted.
                      </span>
                    </label>

                    <label className="consent-row">
                      <input
                        type="checkbox"
                        checked={consentDetails}
                        onChange={(event) => setConsentDetails(event.target.checked)}
                      />

                      <span className="consent-box" />

                      <span>
                        I agree to provide clear details and payment information for the project.
                      </span>
                    </label>

                    <button
                      type="submit"
                      className="primary-cta mt-3 w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Inquiry"}
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </div>

              <div className="reveal">
                <div className="orb-frame liquid-glass-strong flex min-h-full items-end rounded-[28px] p-6 sm:p-8">
                  <img
                    src={contactAsset}
                    alt=""
                    className="contact-image absolute inset-0 h-full w-full object-cover object-center"
                  />

                  <div className="absolute inset-0 bg-black/28" />

                  <div className="relative z-[2] ml-auto max-w-[430px] space-y-5 text-right">
                    <p className="text-[0.82rem] uppercase tracking-[0.3em] text-[#00FF94]">
                      Discord: .sanoh
                    </p>

                    <div className="space-y-3 text-[0.95rem] text-white/50 sm:text-[1rem]">
                      {contactSnippets.map((snippet, index) => (
                        <p
                          key={snippet}
                          className="animate-[floatUp_4s_ease-in-out_infinite]"
                          style={{
                            animationDelay: `${index * 0.35}s`,
                          }}
                        >
                          {snippet}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
