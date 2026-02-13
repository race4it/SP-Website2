"use client";
import { useState, useEffect, useRef } from "react";

// ─── CONSTANTS ───
const BRAND = {
  primary: "#0A0A0A",
  accent: "#FF3D00",
  accentHover: "#E63600",
  accentGlow: "rgba(255, 61, 0, 0.15)",
  surface: "#111111",
  surfaceLight: "#1A1A1A",
  border: "#222222",
  text: "#F5F5F5",
  textMuted: "#999999",
  textDim: "#666666",
  white: "#FFFFFF",
  green: "#00C853",
  greenBg: "rgba(0, 200, 83, 0.08)",
  blue: "#2979FF",
};

const FEATURES = [
  {
    id: "shop",
    icon: "⚙️",
    title: "Shop Management",
    subtitle: "From quote to dyno",
    items: [
      "Work Order Management",
      "Scheduling & Calendar",
      "Custom Workflows",
      "Checklists & Tune Sheets",
      "Labor Time Tracking",
      "Project Management",
    ],
    desc: "Manage every build from initial quote through delivery. Automated scheduling, labor tracking, and custom workflows designed for complex performance builds — not quick oil changes.",
  },
  {
    id: "parts",
    icon: "🔧",
    title: "Parts & Purchasing",
    subtitle: "12+ vendors, 1M+ parts",
    items: [
      "Marketplace (12+ Vendors)",
      "1M+ Parts Database",
      "Purchase Orders",
      "Inventory Management",
      "Shipping & Logistics",
      "Vendor Invoice Management",
    ],
    desc: "Source from 12+ vendors directly inside work orders. Our marketplace finds the best prices, tracks every PO, manages inbound shipping, and reconciles vendor invoices automatically.",
  },
  {
    id: "cx",
    icon: "📱",
    title: "Customer Experience",
    subtitle: "Your customers stay in the loop",
    items: [
      "CRM & Lead Management",
      "Customer Portal",
      "Built-in Telephony",
      "Email Inbox",
      "Online Quotes & Checkout",
      "Text-to-Pay",
    ],
    desc: "Give customers a dedicated portal to track their build progress, approve quotes, and make payments. Built-in calling and texting means no switching between apps.",
  },
  {
    id: "biz",
    icon: "📊",
    title: "Business Intelligence",
    subtitle: "Know your numbers",
    items: [
      "Real-time Dashboard",
      "Sales & Payments Reports",
      "Tech Billings Report",
      "Closeout Reports",
      "Target Margins",
      "QuickBooks Integration",
    ],
    desc: "Real-time reporting on revenue, tech efficiency, parts margins, and more. Syncs directly with QuickBooks so your books are always up to date. Set target margins and track actual vs. goal.",
  },
];

const TESTIMONIALS = [
  {
    quote: "Speedpoint transformed how we manage builds. We went from sticky notes and spreadsheets to having everything in one place. Our throughput is up 35% since we switched.",
    name: "Marcus Rivera",
    role: "Owner",
    shop: "Rivera Performance",
    location: "Houston, TX",
  },
  {
    quote: "The parts marketplace alone saves us hours every week. Being able to compare prices across 12 vendors without leaving the work order is a game-changer for a performance shop.",
    name: "Jake Thompson",
    role: "Shop Manager",
    shop: "Thompson Speed & Custom",
    location: "Charlotte, NC",
  },
  {
    quote: "Our customers love the portal. They can check on their build status anytime instead of calling us. It's professional, it builds trust, and it freed up our front desk completely.",
    name: "Sarah Chen",
    role: "Owner",
    shop: "Apex Motorsports",
    location: "Phoenix, AZ",
  },
  {
    quote: "We tried Tekmetric and Shopmonkey before. Neither understood performance builds. Speedpoint gets that a turbo kit install isn't an oil change — the project management tools prove it.",
    name: "Derek Williams",
    role: "Lead Tech & Co-Owner",
    shop: "Full Send Fabrication",
    location: "Denver, CO",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: 199,
    period: "/mo",
    desc: "Everything you need to run a single-bay performance shop.",
    features: [
      "Work Order Management",
      "Customer CRM",
      "Parts Marketplace",
      "Scheduling & Calendar",
      "Basic Reporting",
      "QuickBooks Integration",
      "Unlimited Users",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    price: 349,
    period: "/mo",
    desc: "For growing shops that need the full toolkit.",
    features: [
      "Everything in Starter",
      "Customer Portal",
      "Built-in Telephony",
      "Purchase Orders",
      "Shipping & Logistics",
      "Advanced Reporting",
      "Vendor Invoice Management",
      "Project Management",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: null,
    period: "",
    desc: "Multi-location shops with custom needs.",
    features: [
      "Everything in Professional",
      "Multi-Location Management",
      "Dedicated Account Manager",
      "Custom Integrations",
      "Priority Support",
      "Data Migration Assistance",
      "Custom Training",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const COMPARISON = [
  { feature: "Built for Performance Shops", sp: true, tek: false, sm: false },
  { feature: "Parts Marketplace (12+ Vendors)", sp: true, tek: false, sm: false },
  { feature: "1M+ Parts Database", sp: true, tek: false, sm: false },
  { feature: "Customer Portal", sp: true, tek: false, sm: false },
  { feature: "Purchase Order Management", sp: true, tek: false, sm: false },
  { feature: "Shipping & Logistics", sp: true, tek: false, sm: false },
  { feature: "Project Management", sp: true, tek: false, sm: false },
  { feature: "Vendor Invoice Management", sp: true, tek: false, sm: false },
  { feature: "Built-in Telephony", sp: true, tek: true, sm: true },
  { feature: "Work Order Management", sp: true, tek: true, sm: true },
  { feature: "QuickBooks Integration", sp: true, tek: false, sm: true },
  { feature: "Payment Processing", sp: true, tek: true, sm: true },
  { feature: "Unlimited Users", sp: true, tek: true, sm: false },
];

const STATS = [
  { value: "1M+", label: "Parts in Database" },
  { value: "12+", label: "Vendor Integrations" },
  { value: "35%", label: "Avg. Efficiency Gain" },
  { value: "99.9%", label: "Uptime" },
];

// ─── UTILITY HOOKS ───
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useCountUp(end, duration = 2000, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setVal(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return val;
}

// ─── COMPONENTS ───

function Nav({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Compare", href: "#compare" },
    { label: "ROI Calculator", href: "#roi" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${BRAND.border}` : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 72,
      }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 36, height: 36, background: BRAND.accent,
            borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: 18, color: BRAND.white, fontFamily: "'Outfit', sans-serif",
          }}>S</div>
          <span style={{
            fontSize: 20, fontWeight: 700, color: BRAND.white,
            fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.02em",
          }}>Speedpoint</span>
        </a>

        <div style={{
          display: "flex", alignItems: "center", gap: 32,
        }} className="nav-links-desktop">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              color: BRAND.textMuted, textDecoration: "none", fontSize: 14,
              fontWeight: 500, transition: "color 0.2s",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={e => e.target.style.color = BRAND.white}
            onMouseLeave={e => e.target.style.color = BRAND.textMuted}
            >{l.label}</a>
          ))}
          <a href="#demo" style={{
            background: BRAND.accent, color: BRAND.white, padding: "10px 24px",
            borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif", transition: "background 0.2s",
          }}
          onMouseEnter={e => e.target.style.background = BRAND.accentHover}
          onMouseLeave={e => e.target.style.background = BRAND.accent}
          >Get a Demo</a>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="mobile-menu-btn" style={{
          display: "none", background: "none", border: "none", color: BRAND.white,
          fontSize: 24, cursor: "pointer", padding: 8,
        }}>☰</button>
      </div>

      {mobileOpen && (
        <div style={{
          background: BRAND.surface, borderTop: `1px solid ${BRAND.border}`,
          padding: 24, display: "flex", flexDirection: "column", gap: 16,
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
              color: BRAND.textMuted, textDecoration: "none", fontSize: 16,
              fontFamily: "'DM Sans', sans-serif",
            }}>{l.label}</a>
          ))}
          <a href="#demo" style={{
            background: BRAND.accent, color: BRAND.white, padding: "12px 24px",
            borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600,
            textAlign: "center", fontFamily: "'DM Sans', sans-serif",
          }}>Get a Demo</a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [ref, visible] = useInView(0.1);
  return (
    <section ref={ref} style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
      background: `radial-gradient(ellipse at 30% 20%, rgba(255,61,0,0.08) 0%, transparent 50%),
                   radial-gradient(ellipse at 70% 80%, rgba(41,121,255,0.04) 0%, transparent 50%),
                   ${BRAND.primary}`,
    }}>
      {/* Grid pattern overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: `linear-gradient(${BRAND.textMuted} 1px, transparent 1px), linear-gradient(90deg, ${BRAND.textMuted} 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "120px 24px 80px",
        position: "relative", zIndex: 1,
      }}>
        {/* Badge */}
        <div style={{
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease 0.1s",
        }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: BRAND.accentGlow, border: `1px solid rgba(255,61,0,0.2)`,
            borderRadius: 100, padding: "6px 16px", fontSize: 13, fontWeight: 500,
            color: BRAND.accent, fontFamily: "'DM Sans', sans-serif",
            marginBottom: 32,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: BRAND.accent, animation: "pulse 2s infinite" }} />
            The only platform built for performance shops
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 1.05, fontWeight: 800,
          fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.03em",
          color: BRAND.white, maxWidth: 900, margin: 0,
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease 0.2s",
        }}>
          From Quote to Dyno.
          <br />
          <span style={{ color: BRAND.accent }}>One Platform.</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: "clamp(16px, 2vw, 20px)", color: BRAND.textMuted, maxWidth: 600,
          lineHeight: 1.6, marginTop: 24, fontFamily: "'DM Sans', sans-serif",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease 0.35s",
        }}>
          Manage every build, source from 12+ vendors, and give your customers a real-time 
          portal to track progress — all in the shop management platform that was actually 
          designed for performance.
        </p>

        {/* CTAs */}
        <div style={{
          display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease 0.5s",
        }}>
          <a href="#demo" style={{
            background: BRAND.accent, color: BRAND.white, padding: "16px 32px",
            borderRadius: 10, textDecoration: "none", fontSize: 16, fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif", display: "inline-flex", alignItems: "center", gap: 8,
            boxShadow: "0 0 40px rgba(255,61,0,0.3)", transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 0 60px rgba(255,61,0,0.4)"; }}
          onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 0 40px rgba(255,61,0,0.3)"; }}
          >
            Schedule a Demo →
          </a>
          <a href="#roi" style={{
            background: "transparent", color: BRAND.white, padding: "16px 32px",
            borderRadius: 10, textDecoration: "none", fontSize: 16, fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif", border: `1px solid ${BRAND.border}`,
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.target.style.borderColor = BRAND.textMuted; }}
          onMouseLeave={e => { e.target.style.borderColor = BRAND.border; }}
          >
            Calculate Your ROI
          </a>
        </div>

        {/* Trust bar */}
        <div style={{
          marginTop: 64, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap",
          opacity: visible ? 1 : 0, transition: "all 0.7s ease 0.65s",
        }}>
          <span style={{ fontSize: 13, color: BRAND.textDim, fontFamily: "'DM Sans', sans-serif" }}>
            Trusted by performance shops across North America
          </span>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            {["QuickBooks", "Finix", "PartsTech", "Turn 14", "Keystone"].map(name => (
              <span key={name} style={{
                fontSize: 12, color: BRAND.textDim, fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em",
                textTransform: "uppercase", opacity: 0.5,
              }}>{name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Product mockup placeholder */}
      <div style={{
        position: "absolute", right: "-5%", top: "15%", width: "50%", maxWidth: 700,
        opacity: visible ? 0.12 : 0, transition: "opacity 1s ease 0.5s",
      }}>
        <div style={{
          width: "100%", aspectRatio: "16/10", borderRadius: 16,
          border: `1px solid ${BRAND.border}`,
          background: `linear-gradient(135deg, ${BRAND.surfaceLight}, ${BRAND.surface})`,
          display: "flex", flexDirection: "column", padding: 20,
        }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
          </div>
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "200px 1fr", gap: 12 }}>
            <div style={{ background: BRAND.border, borderRadius: 8 }} />
            <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 12 }}>
              <div style={{ background: BRAND.border, borderRadius: 8 }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ background: BRAND.border, borderRadius: 8 }} />
                <div style={{ background: BRAND.border, borderRadius: 8 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const [ref, visible] = useInView();
  return (
    <section ref={ref} style={{
      background: BRAND.surface, borderTop: `1px solid ${BRAND.border}`,
      borderBottom: `1px solid ${BRAND.border}`,
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "48px 24px",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32,
      }}>
        {STATS.map((s, i) => (
          <div key={i} style={{
            textAlign: "center",
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: `all 0.5s ease ${i * 0.1}s`,
          }}>
            <div style={{
              fontSize: 42, fontWeight: 800, fontFamily: "'Outfit', sans-serif",
              color: BRAND.accent, letterSpacing: "-0.02em",
            }}>{s.value}</div>
            <div style={{
              fontSize: 14, color: BRAND.textMuted, fontFamily: "'DM Sans', sans-serif",
              marginTop: 4,
            }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const [active, setActive] = useState("shop");
  const [ref, visible] = useInView();
  const activeFeature = FEATURES.find(f => f.id === active);

  return (
    <section id="features" ref={ref} style={{
      padding: "120px 24px", maxWidth: 1280, margin: "0 auto",
    }}>
      <div style={{
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease",
      }}>
        <p style={{
          fontSize: 13, fontWeight: 600, color: BRAND.accent, textTransform: "uppercase",
          letterSpacing: "0.1em", fontFamily: "'DM Sans', sans-serif", marginBottom: 12,
        }}>Platform</p>
        <h2 style={{
          fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800,
          fontFamily: "'Outfit', sans-serif", color: BRAND.white,
          letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16,
        }}>Everything your shop needs.<br />Nothing it doesn't.</h2>
        <p style={{
          fontSize: 17, color: BRAND.textMuted, maxWidth: 600, lineHeight: 1.6,
          fontFamily: "'DM Sans', sans-serif", marginBottom: 48,
        }}>
          Four integrated modules that cover every part of running a performance shop.
          No plugins. No bolt-ons. No workarounds.
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: 8, marginBottom: 48, flexWrap: "wrap",
        opacity: visible ? 1 : 0, transition: "all 0.6s ease 0.2s",
      }}>
        {FEATURES.map(f => (
          <button key={f.id} onClick={() => setActive(f.id)} style={{
            padding: "12px 24px", borderRadius: 10, border: "none",
            background: active === f.id ? BRAND.accent : BRAND.surfaceLight,
            color: active === f.id ? BRAND.white : BRAND.textMuted,
            fontSize: 14, fontWeight: 600, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.2s",
          }}>
            <span style={{ marginRight: 8 }}>{f.icon}</span>
            {f.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start",
      }} className="features-grid">
        <div style={{
          background: BRAND.surfaceLight, borderRadius: 16,
          border: `1px solid ${BRAND.border}`, padding: 40,
        }}>
          <h3 style={{
            fontSize: 28, fontWeight: 700, fontFamily: "'Outfit', sans-serif",
            color: BRAND.white, marginBottom: 8,
          }}>{activeFeature.title}</h3>
          <p style={{
            fontSize: 14, color: BRAND.accent, fontFamily: "'DM Sans', sans-serif",
            marginBottom: 24,
          }}>{activeFeature.subtitle}</p>
          <p style={{
            fontSize: 15, color: BRAND.textMuted, lineHeight: 1.7,
            fontFamily: "'DM Sans', sans-serif", marginBottom: 32,
          }}>{activeFeature.desc}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {activeFeature.items.map(item => (
              <div key={item} style={{
                display: "flex", alignItems: "center", gap: 12,
                fontSize: 14, color: BRAND.text, fontFamily: "'DM Sans', sans-serif",
              }}>
                <span style={{
                  width: 20, height: 20, borderRadius: 6,
                  background: BRAND.greenBg, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 11, color: BRAND.green, flexShrink: 0,
                }}>✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Mockup panel */}
        <div style={{
          background: BRAND.surfaceLight, borderRadius: 16,
          border: `1px solid ${BRAND.border}`, overflow: "hidden",
          aspectRatio: "4/3", position: "relative",
        }}>
          <div style={{
            background: BRAND.surface, height: 36, display: "flex", alignItems: "center",
            padding: "0 16px", gap: 6, borderBottom: `1px solid ${BRAND.border}`,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF5F57" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FEBC2E" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28C840" }} />
            <span style={{
              marginLeft: 12, fontSize: 11, color: BRAND.textDim,
              fontFamily: "'DM Sans', sans-serif",
            }}>app.getspeedpoint.com</span>
          </div>
          <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ width: "30%", height: "100%", minHeight: 200, background: BRAND.border, borderRadius: 8 }} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ height: 32, background: BRAND.border, borderRadius: 8 }} />
                <div style={{ flex: 1, background: BRAND.border, borderRadius: 8, minHeight: 120 }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  <div style={{ height: 60, background: BRAND.accentGlow, borderRadius: 8, border: `1px solid rgba(255,61,0,0.15)` }} />
                  <div style={{ height: 60, background: BRAND.border, borderRadius: 8 }} />
                  <div style={{ height: 60, background: BRAND.border, borderRadius: 8 }} />
                </div>
              </div>
            </div>
          </div>
          <div style={{
            position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.7), transparent 40%)",
            display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 24,
          }}>
            <span style={{
              fontSize: 12, color: BRAND.textMuted, fontFamily: "'DM Sans', sans-serif",
              background: "rgba(10,10,10,0.8)", padding: "6px 12px", borderRadius: 6,
            }}>📸 Real product screenshots coming soon</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [ref, visible] = useInView();

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" ref={ref} style={{
      padding: "120px 24px",
      background: `linear-gradient(180deg, ${BRAND.primary} 0%, ${BRAND.surface} 50%, ${BRAND.primary} 100%)`,
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <p style={{
          fontSize: 13, fontWeight: 600, color: BRAND.accent, textTransform: "uppercase",
          letterSpacing: "0.1em", fontFamily: "'DM Sans', sans-serif", marginBottom: 12,
        }}>Testimonials</p>
        <h2 style={{
          fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800,
          fontFamily: "'Outfit', sans-serif", color: BRAND.white,
          letterSpacing: "-0.02em", marginBottom: 64,
          opacity: visible ? 1 : 0, transition: "all 0.6s ease",
        }}>Shops that switched<br /><span style={{ color: BRAND.accent }}>aren't going back.</span></h2>

        <div style={{
          position: "relative", minHeight: 280,
          opacity: visible ? 1 : 0, transition: "all 0.6s ease 0.2s",
        }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{
              position: i === current ? "relative" : "absolute",
              top: 0, left: 0, right: 0,
              opacity: i === current ? 1 : 0,
              transform: i === current ? "translateX(0)" : "translateX(30px)",
              transition: "all 0.5s ease",
              pointerEvents: i === current ? "auto" : "none",
            }}>
              <div style={{
                background: BRAND.surfaceLight, borderRadius: 20,
                border: `1px solid ${BRAND.border}`, padding: "48px 48px 40px",
                maxWidth: 800,
              }}>
                <div style={{
                  fontSize: 40, color: BRAND.accent, fontFamily: "Georgia, serif",
                  lineHeight: 1, marginBottom: 16,
                }}>"</div>
                <p style={{
                  fontSize: 18, lineHeight: 1.7, color: BRAND.text,
                  fontFamily: "'DM Sans', sans-serif", marginBottom: 32,
                }}>{t.quote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${BRAND.accent}, #FF6D00)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, fontWeight: 700, color: BRAND.white,
                    fontFamily: "'Outfit', sans-serif",
                  }}>{t.name[0]}</div>
                  <div>
                    <div style={{
                      fontSize: 15, fontWeight: 600, color: BRAND.white,
                      fontFamily: "'DM Sans', sans-serif",
                    }}>{t.name}</div>
                    <div style={{
                      fontSize: 13, color: BRAND.textMuted,
                      fontFamily: "'DM Sans', sans-serif",
                    }}>{t.role}, {t.shop} · {t.location}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div style={{ display: "flex", gap: 8, marginTop: 32 }}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? 32 : 8, height: 8, borderRadius: 4,
              background: i === current ? BRAND.accent : BRAND.border,
              border: "none", cursor: "pointer", transition: "all 0.3s ease",
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [annual, setAnnual] = useState(true);
  const [ref, visible] = useInView();

  return (
    <section id="pricing" ref={ref} style={{ padding: "120px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{
            fontSize: 13, fontWeight: 600, color: BRAND.accent, textTransform: "uppercase",
            letterSpacing: "0.1em", fontFamily: "'DM Sans', sans-serif", marginBottom: 12,
          }}>Pricing</p>
          <h2 style={{
            fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800,
            fontFamily: "'Outfit', sans-serif", color: BRAND.white,
            letterSpacing: "-0.02em", marginBottom: 16,
            opacity: visible ? 1 : 0, transition: "all 0.6s ease",
          }}>Simple, transparent pricing.</h2>
          <p style={{
            fontSize: 17, color: BRAND.textMuted, fontFamily: "'DM Sans', sans-serif",
            marginBottom: 32,
          }}>Unlimited users. No per-RO fees. No surprises.</p>

          {/* Toggle */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            background: BRAND.surfaceLight, borderRadius: 10, padding: 4,
          }}>
            <button onClick={() => setAnnual(false)} style={{
              padding: "10px 20px", borderRadius: 8, border: "none",
              background: !annual ? BRAND.accent : "transparent",
              color: !annual ? BRAND.white : BRAND.textMuted,
              fontSize: 14, fontWeight: 500, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}>Monthly</button>
            <button onClick={() => setAnnual(true)} style={{
              padding: "10px 20px", borderRadius: 8, border: "none",
              background: annual ? BRAND.accent : "transparent",
              color: annual ? BRAND.white : BRAND.textMuted,
              fontSize: 14, fontWeight: 500, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}>Annual (Save 15%)</button>
          </div>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 24, opacity: visible ? 1 : 0, transition: "all 0.6s ease 0.2s",
        }}>
          {PRICING.map((plan, i) => (
            <div key={i} style={{
              background: BRAND.surfaceLight, borderRadius: 20,
              border: plan.popular ? `2px solid ${BRAND.accent}` : `1px solid ${BRAND.border}`,
              padding: 40, position: "relative", overflow: "hidden",
              transform: plan.popular ? "scale(1.02)" : "scale(1)",
            }}>
              {plan.popular && (
                <div style={{
                  position: "absolute", top: 16, right: 16,
                  background: BRAND.accentGlow, color: BRAND.accent,
                  padding: "4px 12px", borderRadius: 100, fontSize: 12, fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                }}>Most Popular</div>
              )}
              <h3 style={{
                fontSize: 22, fontWeight: 700, color: BRAND.white,
                fontFamily: "'Outfit', sans-serif", marginBottom: 8,
              }}>{plan.name}</h3>
              <p style={{
                fontSize: 14, color: BRAND.textMuted, fontFamily: "'DM Sans', sans-serif",
                marginBottom: 24,
              }}>{plan.desc}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 32 }}>
                {plan.price ? (
                  <>
                    <span style={{
                      fontSize: 48, fontWeight: 800, color: BRAND.white,
                      fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.02em",
                    }}>${annual ? Math.round(plan.price * 0.85) : plan.price}</span>
                    <span style={{
                      fontSize: 16, color: BRAND.textMuted,
                      fontFamily: "'DM Sans', sans-serif",
                    }}>/mo</span>
                  </>
                ) : (
                  <span style={{
                    fontSize: 32, fontWeight: 700, color: BRAND.white,
                    fontFamily: "'Outfit', sans-serif",
                  }}>Custom</span>
                )}
              </div>
              <a href="#demo" style={{
                display: "block", textAlign: "center", padding: "14px 24px",
                borderRadius: 10, textDecoration: "none", fontSize: 15, fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif", marginBottom: 32,
                background: plan.popular ? BRAND.accent : "transparent",
                color: BRAND.white,
                border: plan.popular ? "none" : `1px solid ${BRAND.border}`,
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { if (!plan.popular) e.target.style.borderColor = BRAND.textMuted; }}
              onMouseLeave={e => { if (!plan.popular) e.target.style.borderColor = BRAND.border; }}
              >{plan.cta}</a>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {plan.features.map(f => (
                  <div key={f} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    fontSize: 14, color: BRAND.textMuted, fontFamily: "'DM Sans', sans-serif",
                  }}>
                    <span style={{ color: BRAND.green, fontSize: 14 }}>✓</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Comparison() {
  const [ref, visible] = useInView();
  return (
    <section id="compare" ref={ref} style={{
      padding: "120px 24px", background: BRAND.surface,
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{
            fontSize: 13, fontWeight: 600, color: BRAND.accent, textTransform: "uppercase",
            letterSpacing: "0.1em", fontFamily: "'DM Sans', sans-serif", marginBottom: 12,
          }}>Compare</p>
          <h2 style={{
            fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800,
            fontFamily: "'Outfit', sans-serif", color: BRAND.white,
            letterSpacing: "-0.02em", marginBottom: 16,
            opacity: visible ? 1 : 0, transition: "all 0.6s ease",
          }}>See why shops are switching.</h2>
        </div>

        <div style={{
          borderRadius: 16, overflow: "hidden",
          border: `1px solid ${BRAND.border}`,
          opacity: visible ? 1 : 0, transition: "all 0.6s ease 0.2s",
        }}>
          {/* Header */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 100px 100px 100px",
            background: BRAND.surfaceLight, padding: "16px 24px",
            borderBottom: `1px solid ${BRAND.border}`,
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: BRAND.textMuted, fontFamily: "'DM Sans', sans-serif" }}>Feature</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: BRAND.accent, fontFamily: "'DM Sans', sans-serif", textAlign: "center" }}>Speedpoint</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: BRAND.textDim, fontFamily: "'DM Sans', sans-serif", textAlign: "center" }}>Tekmetric</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: BRAND.textDim, fontFamily: "'DM Sans', sans-serif", textAlign: "center" }}>Shopmonkey</span>
          </div>
          {/* Rows */}
          {COMPARISON.map((row, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr 100px 100px 100px",
              padding: "14px 24px",
              background: i % 2 === 0 ? BRAND.primary : BRAND.surface,
              borderBottom: i < COMPARISON.length - 1 ? `1px solid ${BRAND.border}` : "none",
            }}>
              <span style={{
                fontSize: 14, color: BRAND.text, fontFamily: "'DM Sans', sans-serif",
              }}>{row.feature}</span>
              <span style={{ textAlign: "center", fontSize: 16 }}>
                {row.sp ? <span style={{ color: BRAND.green }}>✓</span> : <span style={{ color: BRAND.textDim }}>—</span>}
              </span>
              <span style={{ textAlign: "center", fontSize: 16 }}>
                {row.tek ? <span style={{ color: BRAND.textDim }}>✓</span> : <span style={{ color: BRAND.textDim }}>—</span>}
              </span>
              <span style={{ textAlign: "center", fontSize: 16 }}>
                {row.sm ? <span style={{ color: BRAND.textDim }}>✓</span> : <span style={{ color: BRAND.textDim }}>—</span>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ROICalculator() {
  const [ref, visible] = useInView();
  const [workOrders, setWorkOrders] = useState(40);
  const [avgTicket, setAvgTicket] = useState(3500);
  const [techs, setTechs] = useState(4);
  const [hoursWasted, setHoursWasted] = useState(10);
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState("");

  const timeSaved = hoursWasted * 0.6 * 4.33; // 60% reduction, monthly
  const revGain = workOrders * avgTicket * 0.15 * 12; // 15% efficiency gain annually
  const laborSavings = timeSaved * 75 * 12; // $75/hr labor rate, annually

  return (
    <section id="roi" ref={ref} style={{
      padding: "120px 24px",
      background: `linear-gradient(180deg, ${BRAND.primary} 0%, ${BRAND.surface} 100%)`,
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{
            fontSize: 13, fontWeight: 600, color: BRAND.accent, textTransform: "uppercase",
            letterSpacing: "0.1em", fontFamily: "'DM Sans', sans-serif", marginBottom: 12,
          }}>ROI Calculator</p>
          <h2 style={{
            fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800,
            fontFamily: "'Outfit', sans-serif", color: BRAND.white,
            letterSpacing: "-0.02em", marginBottom: 16,
            opacity: visible ? 1 : 0, transition: "all 0.6s ease",
          }}>What could Speedpoint<br />save your shop?</h2>
        </div>

        <div style={{
          background: BRAND.surfaceLight, borderRadius: 20,
          border: `1px solid ${BRAND.border}`, padding: 48,
          opacity: visible ? 1 : 0, transition: "all 0.6s ease 0.2s",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="roi-grid">
            {[
              { label: "Work orders per month", val: workOrders, set: setWorkOrders, min: 5, max: 200, unit: "" },
              { label: "Average ticket size", val: avgTicket, set: setAvgTicket, min: 500, max: 25000, unit: "$", step: 100 },
              { label: "Number of technicians", val: techs, set: setTechs, min: 1, max: 20, unit: "" },
              { label: "Hours/week on admin tasks", val: hoursWasted, set: setHoursWasted, min: 2, max: 40, unit: "hrs" },
            ].map(s => (
              <div key={s.label}>
                <label style={{
                  display: "block", fontSize: 14, color: BRAND.textMuted,
                  fontFamily: "'DM Sans', sans-serif", marginBottom: 12,
                }}>{s.label}</label>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <input type="range" min={s.min} max={s.max} step={s.step || 1}
                    value={s.val} onChange={e => s.set(Number(e.target.value))}
                    style={{ flex: 1, accentColor: BRAND.accent, height: 4 }}
                  />
                  <span style={{
                    minWidth: 64, textAlign: "right",
                    fontSize: 18, fontWeight: 700, color: BRAND.white,
                    fontFamily: "'Outfit', sans-serif",
                  }}>{s.unit === "$" ? `$${s.val.toLocaleString()}` : `${s.val}${s.unit ? ` ${s.unit}` : ""}`}</span>
                </div>
              </div>
            ))}
          </div>

          {!showResult ? (
            <div style={{ marginTop: 40, display: "flex", gap: 12, alignItems: "center" }} className="roi-submit">
              <input type="email" placeholder="Enter your email for results"
                value={email} onChange={e => setEmail(e.target.value)}
                style={{
                  flex: 1, padding: "14px 20px", borderRadius: 10,
                  border: `1px solid ${BRAND.border}`, background: BRAND.primary,
                  color: BRAND.white, fontSize: 15, outline: "none",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
              <button onClick={() => setShowResult(true)} style={{
                padding: "14px 32px", borderRadius: 10, border: "none",
                background: BRAND.accent, color: BRAND.white, fontSize: 15,
                fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                whiteSpace: "nowrap",
              }}>See My ROI</button>
            </div>
          ) : (
            <div style={{
              marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
              gap: 24, animation: "fadeInUp 0.5s ease",
            }} className="roi-results-grid">
              <div style={{
                background: BRAND.primary, borderRadius: 12, padding: 24,
                textAlign: "center", border: `1px solid ${BRAND.border}`,
              }}>
                <div style={{
                  fontSize: 32, fontWeight: 800, color: BRAND.green,
                  fontFamily: "'Outfit', sans-serif",
                }}>{Math.round(timeSaved)} hrs</div>
                <div style={{ fontSize: 13, color: BRAND.textMuted, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>
                  Admin time saved / month
                </div>
              </div>
              <div style={{
                background: BRAND.primary, borderRadius: 12, padding: 24,
                textAlign: "center", border: `1px solid ${BRAND.border}`,
              }}>
                <div style={{
                  fontSize: 32, fontWeight: 800, color: BRAND.accent,
                  fontFamily: "'Outfit', sans-serif",
                }}>${Math.round(revGain / 1000)}K</div>
                <div style={{ fontSize: 13, color: BRAND.textMuted, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>
                  Potential revenue gain / year
                </div>
              </div>
              <div style={{
                background: BRAND.primary, borderRadius: 12, padding: 24,
                textAlign: "center", border: `1px solid ${BRAND.border}`,
              }}>
                <div style={{
                  fontSize: 32, fontWeight: 800, color: BRAND.blue,
                  fontFamily: "'Outfit', sans-serif",
                }}>${Math.round(laborSavings / 1000)}K</div>
                <div style={{ fontSize: 13, color: BRAND.textMuted, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>
                  Labor savings / year
                </div>
              </div>
              <div style={{ gridColumn: "1 / -1", textAlign: "center", marginTop: 8 }}>
                <a href="#demo" style={{
                  background: BRAND.accent, color: BRAND.white, padding: "14px 32px",
                  borderRadius: 10, textDecoration: "none", fontSize: 15, fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif", display: "inline-block",
                }}>Schedule a Demo to Learn More →</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function DemoForm() {
  const [ref, visible] = useInView();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", shopName: "", shopSize: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="demo" ref={ref} style={{
      padding: "120px 24px",
      background: `radial-gradient(ellipse at 50% 0%, rgba(255,61,0,0.1) 0%, transparent 50%), ${BRAND.surface}`,
    }}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <p style={{
          fontSize: 13, fontWeight: 600, color: BRAND.accent, textTransform: "uppercase",
          letterSpacing: "0.1em", fontFamily: "'DM Sans', sans-serif", marginBottom: 12,
        }}>Get Started</p>
        <h2 style={{
          fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800,
          fontFamily: "'Outfit', sans-serif", color: BRAND.white,
          letterSpacing: "-0.02em", marginBottom: 16,
          opacity: visible ? 1 : 0, transition: "all 0.6s ease",
        }}>See Speedpoint in action.</h2>
        <p style={{
          fontSize: 17, color: BRAND.textMuted, fontFamily: "'DM Sans', sans-serif",
          marginBottom: 48,
        }}>
          Book a personalized demo and see how Speedpoint can transform your shop's operations.
        </p>

        {!submitted ? (
          <div style={{
            background: BRAND.surfaceLight, borderRadius: 20,
            border: `1px solid ${BRAND.border}`, padding: 40,
            opacity: visible ? 1 : 0, transition: "all 0.6s ease 0.2s",
          }}>
            {[
              { key: "name", placeholder: "Full Name", type: "text" },
              { key: "email", placeholder: "Work Email", type: "email" },
              { key: "phone", placeholder: "Phone Number", type: "tel" },
              { key: "shopName", placeholder: "Shop Name", type: "text" },
            ].map(f => (
              <input key={f.key} type={f.type} placeholder={f.placeholder}
                value={formData[f.key]} onChange={e => setFormData({...formData, [f.key]: e.target.value})}
                style={{
                  width: "100%", padding: "14px 20px", marginBottom: 16,
                  borderRadius: 10, border: `1px solid ${BRAND.border}`,
                  background: BRAND.primary, color: BRAND.white, fontSize: 15,
                  outline: "none", fontFamily: "'DM Sans', sans-serif",
                  boxSizing: "border-box",
                }}
              />
            ))}
            <select value={formData.shopSize}
              onChange={e => setFormData({...formData, shopSize: e.target.value})}
              style={{
                width: "100%", padding: "14px 20px", marginBottom: 24,
                borderRadius: 10, border: `1px solid ${BRAND.border}`,
                background: BRAND.primary, color: formData.shopSize ? BRAND.white : BRAND.textDim,
                fontSize: 15, outline: "none", fontFamily: "'DM Sans', sans-serif",
                boxSizing: "border-box",
              }}>
              <option value="">Shop Size (# of bays)</option>
              <option value="1-3">1-3 bays</option>
              <option value="4-8">4-8 bays</option>
              <option value="9-15">9-15 bays</option>
              <option value="16+">16+ bays</option>
            </select>
            <button onClick={() => setSubmitted(true)} style={{
              width: "100%", padding: "16px 32px", borderRadius: 10, border: "none",
              background: BRAND.accent, color: BRAND.white, fontSize: 16,
              fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 0 40px rgba(255,61,0,0.2)",
            }}>Schedule My Demo →</button>
            <p style={{
              fontSize: 12, color: BRAND.textDim, marginTop: 16,
              fontFamily: "'DM Sans', sans-serif",
            }}>No credit card required. 15-minute personalized walkthrough.</p>
          </div>
        ) : (
          <div style={{
            background: BRAND.surfaceLight, borderRadius: 20,
            border: `1px solid ${BRAND.green}`, padding: 48,
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
            <h3 style={{
              fontSize: 24, fontWeight: 700, color: BRAND.white,
              fontFamily: "'Outfit', sans-serif", marginBottom: 8,
            }}>You're all set!</h3>
            <p style={{
              fontSize: 16, color: BRAND.textMuted, fontFamily: "'DM Sans', sans-serif",
            }}>We'll reach out within 24 hours to schedule your personalized demo.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      borderTop: `1px solid ${BRAND.border}`, padding: "64px 24px 40px",
      background: BRAND.primary,
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 48,
      }} className="footer-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{
              width: 32, height: 32, background: BRAND.accent, borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: 16, color: BRAND.white, fontFamily: "'Outfit', sans-serif",
            }}>S</div>
            <span style={{
              fontSize: 18, fontWeight: 700, color: BRAND.white,
              fontFamily: "'Outfit', sans-serif",
            }}>Speedpoint</span>
          </div>
          <p style={{
            fontSize: 14, color: BRAND.textDim, lineHeight: 1.6,
            fontFamily: "'DM Sans', sans-serif", maxWidth: 280,
          }}>
            The only shop management platform built specifically for automotive performance shops.
          </p>
          <p style={{
            fontSize: 13, color: BRAND.textDim, fontFamily: "'DM Sans', sans-serif", marginTop: 16,
          }}>customersuccess@getspeedpoint.com</p>
        </div>
        {[
          {
            title: "Product",
            links: ["Shop Management", "Parts & Purchasing", "Customer Experience", "Business Intelligence", "Integrations", "Pricing"],
          },
          {
            title: "Resources",
            links: ["Education", "Blog", "Help Center", "API Docs", "Webinars"],
          },
          {
            title: "Company",
            links: ["About Us", "Careers", "Contact Us", "Press"],
          },
          {
            title: "Legal",
            links: ["Privacy Policy", "Terms of Service", "Security"],
          },
        ].map(col => (
          <div key={col.title}>
            <h4 style={{
              fontSize: 13, fontWeight: 600, color: BRAND.textMuted, textTransform: "uppercase",
              letterSpacing: "0.08em", fontFamily: "'DM Sans', sans-serif", marginBottom: 20,
            }}>{col.title}</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {col.links.map(link => (
                <a key={link} href="#" style={{
                  color: BRAND.textDim, textDecoration: "none", fontSize: 14,
                  fontFamily: "'DM Sans', sans-serif", transition: "color 0.2s",
                }}
                onMouseEnter={e => e.target.style.color = BRAND.white}
                onMouseLeave={e => e.target.style.color = BRAND.textDim}
                >{link}</a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        maxWidth: 1280, margin: "48px auto 0", paddingTop: 24,
        borderTop: `1px solid ${BRAND.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
      }}>
        <span style={{ fontSize: 13, color: BRAND.textDim, fontFamily: "'DM Sans', sans-serif" }}>
          © 2026 Speedpoint. All rights reserved.
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          {["Facebook", "Instagram", "LinkedIn", "YouTube"].map(s => (
            <a key={s} href="#" style={{
              fontSize: 13, color: BRAND.textDim, textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif", transition: "color 0.2s",
            }}
            onMouseEnter={e => e.target.style.color = BRAND.white}
            onMouseLeave={e => e.target.style.color = BRAND.textDim}
            >{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN APP ───
export default function SpeedpointWebsite() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; background: ${BRAND.primary}; }
        body { overflow-x: hidden; }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: ${BRAND.border};
          border-radius: 4px;
          outline: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px; height: 18px;
          border-radius: 50%;
          background: ${BRAND.accent};
          cursor: pointer;
          border: 2px solid ${BRAND.white};
        }
        
        ::selection { background: ${BRAND.accent}; color: ${BRAND.white}; }
        
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .roi-grid { grid-template-columns: 1fr !important; }
          .roi-submit { flex-direction: column !important; }
          .roi-results-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
      <Nav />
      <Hero />
      <StatsBar />
      <Features />
      <Testimonials />
      <Pricing />
      <Comparison />
      <ROICalculator />
      <DemoForm />
      <Footer />
    </>
  );
}
