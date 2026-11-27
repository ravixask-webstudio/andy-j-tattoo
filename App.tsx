import React, { useEffect, useMemo, useState } from "react";
import { Menu, X, MapPin, Phone, ChevronDown, ChevronLeft, ChevronRight, Instagram, Facebook, MessageCircle, ArrowUpRight, ArrowDown, Sparkles, PenTool, Eye, MessagesSquare, CalendarCheck, Palette } from "lucide-react";
import heroImg from "container:///mnt/data/src/assets/4fa53e0e78610f32-image_20261127_110245_4.webp";
import portraitImg from "container:///mnt/data/src/assets/54a1884410a3a951-image_20261127_110245_1.webp";
import portraitTattoo from "container:///mnt/data/src/assets/b4f31820233e5cc7-image_20261127_110245_2.webp";
import wolfImg from "container:///mnt/data/src/assets/ae755fe36f48fd34-image_20261127_110245_3.webp";
import lionImg from "container:///mnt/data/src/assets/e09e89942e570c25-image_20261127_110245.webp";
import atWorkImg from "container:///mnt/data/src/assets/97c6e4033bad77b6-image_20261127_110244.webp";
import roseImg from "container:///mnt/data/src/assets/3dd6de925fc313d3-image_20261127_110245_5.webp";
import studioImg from "container:///mnt/data/src/assets/f4b447e553b93557-image_20261127_110246.webp";

const WA_NUMBER = "94778331642";
const WA_DISPLAY = "+94 77 833 1642";
const INSTAGRAM_URL = "https://www.instagram.com/andy_j_tattoos.co/";
const FACEBOOK_URL = "https://www.facebook.com/AndyJtatz";
const DIRECTIONS_URL = "https://www.google.com/maps/search/?api=1&query=Colombo+05+Sri+Lanka";
const waLink = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
const NAV = ["HOME","ABOUT","PORTFOLIO","SERVICES","GALLERY","BOOKING","CONTACT"];

type Work = { title: string; cat: string; cats: string[]; img: string; tall?: boolean; note: string };
const WORKS: Work[] = [
  { title: "Portrait Study", cat: "PORTRAITS", cats: ["PORTRAITS","BLACK & GREY"], img: portraitTattoo, tall: true, note: "Soft tonal portrait with rose detail." },
  { title: "Wolf Forearm", cat: "ANIMALS", cats: ["ANIMALS","REALISM"], img: wolfImg, note: "Realistic animal portrait in black & grey." },
  { title: "Lion Chest Piece", cat: "REALISM", cats: ["REALISM","ANIMALS"], img: lionImg, tall: true, note: "Bold realism with deep black shading." },
  { title: "Fine Rose Detail", cat: "CUSTOM DESIGNS", cats: ["CUSTOM DESIGNS","BLACK & GREY"], img: roseImg, note: "Delicate line and soft grey wash." },
  { title: "Detail & Process", cat: "BLACK & GREY", cats: ["BLACK & GREY","REALISM"], img: atWorkImg, note: "Close attention to texture, tone and placement." },
  { title: "Studio & Composition", cat: "SLEEVES", cats: ["SLEEVES","BLACK & GREY"], img: studioImg, tall: true, note: "Large-scale work planned with the studio atmosphere in mind." },
];
const FILTERS = ["ALL WORKS","REALISM","BLACK & GREY","PORTRAITS","ANIMALS","SLEEVES","CUSTOM DESIGNS"];
const SERVICES = [
  { title: "Black & Grey Realism", desc: "Depth, tone and lifelike shading — built around your reference and placement." },
  { title: "Portrait Tattoos", desc: "Expressive portraits shaped by careful composition and soft tonal transitions." },
  { title: "Realistic Animal Tattoos", desc: "Animal portraits focused on texture, expression and natural form." },
  { title: "Custom Tattoo Designs", desc: "One-of-a-kind artwork developed from your idea, story and placement." },
  { title: "Full Sleeve Tattoos", desc: "Large-scale compositions planned as a cohesive piece across the arm." },
  { title: "Fine Detail Black & Grey Tattoos", desc: "Precise linework and delicate grey wash for refined, detailed pieces." },
];
const FEATURES = [
  { icon: Palette, title: "Custom Artwork", text: "Each concept is developed around your idea and placement." },
  { icon: Eye, title: "Attention to Detail", text: "Careful focus on line, tone, texture and composition." },
  { icon: Sparkles, title: "Black & Grey Specialization", text: "A dedicated focus on black & grey tattoo artistry." },
  { icon: MessagesSquare, title: "Personalized Consultations", text: "Discuss your idea directly and shape it together." },
  { icon: CalendarCheck, title: "Professional Booking Process", text: "A clear path from inquiry to session through WhatsApp." },
  { icon: PenTool, title: "Individual Artistic Approach", text: "Every tattoo is treated as a unique piece of art." },
];
const STEPS = [
  { n: "01", title: "Initial Consultation", text: "Discuss your tattoo idea, inspiration, and preferred placement." },
  { n: "02", title: "Design Discussion", text: "Explore the creative direction and custom design concept." },
  { n: "03", title: "Book Your Session", text: "Confirm your appointment through WhatsApp." },
  { n: "04", title: "The Artwork", text: "Bring your approved design concept to life." },
];
const FAQS = [
  { q: "How can I book a tattoo session?", a: "Use the booking form or message Andy J on WhatsApp. Share your idea, placement and preferred date, and your request will be confirmed manually." },
  { q: "Do you create custom tattoo designs?", a: "Yes. Custom designs are developed from your idea, references and placement, then discussed with you before your session." },
  { q: "Do you specialize in black and grey tattoos?", a: "Yes. Black & grey is the core focus — from realism and portraits to fine detail and large-scale work." },
  { q: "How can I discuss my tattoo idea?", a: "Send your idea through WhatsApp. Include references, placement and approximate size so the concept can be discussed in detail." },
  { q: "Where is the studio located?", a: "Andy J Tattoos is based in Colombo 05, Sri Lanka. Message on WhatsApp for directions and session details." },
  { q: "How can I inquire about pricing?", a: "Pricing depends on design, size and placement. Share your idea on WhatsApp for a personal consultation." },
];
const GALLERY = [
  { label: "Studio atmosphere", title: "A quiet room for focused work", text: "The studio is a place for conversation first — then careful, considered artwork." },
  { label: "Artist at work", title: "Patience in every pass", text: "Detail is built slowly, with attention to tone, texture and how the piece will sit on skin." },
  { label: "Portrait detail", title: "Expression, held in grey", text: "Portraits depend on soft transitions and the small details that carry likeness." },
  { label: "Animal realism", title: "Texture and natural form", text: "Fur, eyes and movement are shaped through layered black & grey shading." },
  { label: "Fine detail", title: "Small work, carefully made", text: "Delicate linework and grey wash suit refined pieces that reward a closer look." },
  { label: "Realism study", title: "Depth without colour", text: "Black & grey realism uses contrast and restraint to give a subject weight and presence." },
];

function SectionHead({ eyebrow, title, sub, light = false }: { eyebrow: string; title: string; sub?: string; light?: boolean }) {
  return (
    <div className="reveal max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-display mt-4 text-[clamp(2rem,6vw,3.8rem)] leading-[0.98] font-normal tracking-tight">{title}</h2>
      {sub && <p className={`mt-5 text-base sm:text-lg leading-relaxed ${light ? "text-[#999999]" : "text-[#999999]"}`}>{sub}</p>}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("ALL WORKS");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState({ name: "", phone: "", style: "Black & Grey Realism", placement: "Forearm", size: "Small — up to palm size", idea: "", date: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingNote, setBookingNote] = useState("");

  useEffect(() => {
    document.title = "Andy J Tattoos — Black & Grey Tattoo Artist | Colombo 05, Sri Lanka";
    const setMeta = (name: string, content: string, prop = false) => {
      let el = document.querySelector(prop ? `meta[property="${name}"]` : `meta[name="${name}"]`);
      if (!el) { el = document.createElement("meta"); if (prop) el.setAttribute("property", name); else el.setAttribute("name", name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "Andy J Tattoos — custom black & grey tattoo artistry in Colombo 05, Sri Lanka. Realism, portraits, animals, sleeves and custom designs. Book via WhatsApp.");
    setMeta("og:title", "Andy J Tattoos — The Art of Black & Grey", true);
    setMeta("og:description", "Precision. Detail. Expression. Custom black and grey tattoo artistry in Colombo, Sri Lanka.", true);
    setMeta("og:type", "website", true);
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "LocalBusiness", name: "Andy J Tattoos Srilanka", telephone: "+94778331642", address: { "@type": "PostalAddress", addressLocality: "Colombo 05", addressCountry: "LK" }, sameAs: [INSTAGRAM_URL, FACEBOOK_URL] });
    document.head.appendChild(ld);
    const obs = new IntersectionObserver((entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); } }), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const filtered = useMemo(() => filter === "ALL WORKS" ? WORKS : WORKS.filter(w => w.cats.includes(filter)), [filter]);
  const go = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please enter your full name.";
    if (!form.phone.trim()) next.phone = "Please enter your WhatsApp number.";
    if (!form.idea.trim()) next.idea = "Please share a short description of your idea.";
    setErrors(next);
    if (Object.keys(next).length) { setBookingNote("Please complete the highlighted fields."); return; }
    const msg = `Hello Andy J Tattoos!\n\nI would like to inquire about booking a tattoo session.\n\nName: ${form.name}\nWhatsApp: ${form.phone}\nTattoo Style: ${form.style}\nPlacement: ${form.placement}\nSize: ${form.size}\nPreferred Date: ${form.date || "Flexible"}\n\nMy Tattoo Idea:\n${form.idea}\n\nPlease let me know about availability and further details.\n\nThank you!`;
    setBookingNote("Opening WhatsApp — your message is ready to send. Your request is not auto-confirmed; it will be confirmed manually.");
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
  };

  const closeLightbox = () => setLightbox(null);
  const stepLightbox = (dir: number) => { if (lightbox === null) return; setLightbox((lightbox + dir + filtered.length) % filtered.length); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (lightbox === null) return; if (e.key === "Escape") closeLightbox(); if (e.key === "ArrowRight") stepLightbox(1); if (e.key === "ArrowLeft") stepLightbox(-1); };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, filtered.length]);

  return (
    <div data-safe-area-inset-root style={{ boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)" }} className="min-h-screen bg-[#080808] text-[#F5F5F5] overflow-x-clip">
      {/* NAV */}
      <header data-safe-area-sticky-top style={{ top: "var(--safe-area-inset-top)" }} className="sticky z-40 border-b border-[rgba(255,255,255,0.10)] bg-[#080808]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button onClick={() => go("home")} className="text-left leading-none" aria-label="Andy J Tattoos — home">
            <span className="font-display block text-[clamp(1.15rem,3vw,1.5rem)] tracking-[0.12em]">ANDY J</span>
            <span className="block text-[10px] tracking-[0.42em] text-[#B8B8B8] mt-1">TATTOOS</span>
          </button>
          <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Main navigation">
            {NAV.map(n => <button key={n} onClick={() => go(n.toLowerCase())} className="text-[11px] tracking-[0.22em] text-[#F5F5F5]/80 hover:text-white">{n}</button>)}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => go("booking")} className="btn-solid hidden sm:inline-flex px-5 py-2.5 text-[11px] tracking-[0.22em] font-semibold">BOOK NOW</button>
            <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2 border border-[rgba(255,255,255,0.15)]" aria-label="Open menu"><Menu size={20} /></button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#080808] pt-[max(1rem,var(--safe-area-inset-top))] pb-8">
          <div className="min-h-full flex flex-col px-6">
            <div className="flex items-center justify-between"><span className="font-display text-xl tracking-[0.12em]">ANDY J <span className="text-[#999] text-xs tracking-[0.4em]">TATTOOS</span></span><button onClick={() => setMenuOpen(false)} className="p-2 border border-white/20" aria-label="Close menu"><X size={22} /></button></div>
            <nav className="mt-12 flex flex-col" aria-label="Mobile navigation">
              {NAV.map((n, i) => <button key={n} onClick={() => go(n.toLowerCase())} className="fade-in flex items-baseline gap-4 border-b border-white/10 py-4 text-left"><span className="text-xs text-[#999]">0{i + 1}</span><span className="font-display text-3xl">{n}</span></button>)}
            </nav>
            <button onClick={() => go("booking")} className="btn-solid mt-8 px-6 py-4 text-xs tracking-[0.25em] font-semibold">BOOK YOUR SESSION</button>
            <p className="mt-6 text-xs tracking-[0.2em] text-[#999]">COLOMBO 05 • SRI LANKA • {WA_DISPLAY}</p>
          </div>
        </div>
      )}

      {/* HERO */}
      <section id="home" className="relative flex min-h-[92svh] items-end overflow-hidden sm:items-center">
        <img src={heroImg} alt="Full sleeve black and grey tattoo with skull, rose and owl" className="hero-img absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/55 to-[#080808]/25" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8">
          <div className="fade-in flex items-center gap-3 text-[11px] tracking-[0.32em] text-[#B8B8B8]"><MapPin size={14} /> COLOMBO 05 • SRI LANKA</div>
          <h1 className="font-display mt-6 text-[clamp(3.4rem,13vw,9.5rem)] leading-[0.84] tracking-tight">ANDY J<br /><span className="text-[#B8B8B8]">TATTOOS</span></h1>
          <p className="mt-6 text-[clamp(0.85rem,2.5vw,1.1rem)] tracking-[0.38em]">THE ART OF BLACK &amp; GREY</p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">Precision. Detail. Expression.<br />Custom black and grey tattoo artistry in Colombo, Sri Lanka.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button onClick={() => go("portfolio")} className="btn-solid px-7 py-3.5 text-[11px] tracking-[0.22em] font-semibold">EXPLORE THE ART</button>
            <button onClick={() => go("booking")} className="btn-line px-7 py-3.5 text-[11px] tracking-[0.22em] font-semibold">BOOK YOUR SESSION</button>
          </div>
          <div className="mt-14 hidden items-center gap-3 text-[10px] tracking-[0.3em] text-[#999] sm:flex"><span className="flex h-9 w-6 items-start justify-center rounded-full border border-white/30 p-1.5"><span className="scroll-dot block h-2 w-1 rounded-full bg-white" /></span> SCROLL TO EXPLORE <ArrowDown size={13} /></div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-[#111111] py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
          <div className="reveal lg:col-span-5"><div className="overflow-hidden border border-[rgba(255,255,255,0.10)]"><img src={portraitImg} alt="Andy J at work in the studio" className="aspect-[4/5] w-full object-cover" loading="lazy" /></div><p className="mt-3 text-xs tracking-[0.2em] text-[#999]">ANDY J — COLOMBO 05, SRI LANKA</p></div>
          <div className="reveal lg:col-span-7 lg:pt-6">
            <SectionHead eyebrow="About the artist" title="THE ARTIST BEHIND THE INK" />
            <p className="mt-6 text-lg leading-relaxed text-white/85">Andy J is a black and grey tattoo artist based in Colombo 05, Sri Lanka.</p>
            <p className="mt-4 leading-relaxed text-[#999]">Dedicated to creating detailed, expressive tattoo artwork with a focus on precision, artistic composition, and individual creativity.</p>
            <p className="mt-4 leading-relaxed text-[#999]">Every tattoo is approached as a unique piece of art, designed to reflect the client&apos;s personal vision.</p>
            <div className="mt-8 grid gap-px border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.10)] sm:grid-cols-3">
              {[["Black & Grey","Specialty focus"],["Custom","Designed for you"],["Detail","Tone & composition"]].map(([a, b]) => <div key={a} className="bg-[#111111] p-5"><p className="font-display text-xl">{a}</p><p className="mt-1 text-xs tracking-[0.18em] text-[#999]">{b}</p></div>)}
            </div>
            <button onClick={() => go("booking")} className="btn-line mt-8 px-6 py-3 text-[11px] tracking-[0.22em]">START A CONVERSATION</button>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6"><SectionHead eyebrow="Portfolio" title="SELECTED WORKS" sub="A collection of black and grey tattoo artistry." /><p className="max-w-sm text-sm leading-relaxed text-[#999]">Portfolio imagery shown as style references — replace with authentic Andy J work before publishing.</p></div>
          <div className="reveal mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter portfolio">
            {FILTERS.map(f => <button key={f} onClick={() => setFilter(f)} className={`filter-btn border border-white/20 px-4 py-2 text-[10px] tracking-[0.18em] ${filter === f ? "active" : ""}`} aria-pressed={filter === f}>{f}</button>)}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" key={filter}>
            {filtered.map((w, i) => (
              <button key={w.title} onClick={() => setLightbox(i)} className="portfolio-card fade-in group relative overflow-hidden border border-[rgba(255,255,255,0.10)] bg-[#171717] text-left" aria-label={`Open ${w.title} in lightbox`}>
                <img src={w.img} alt={w.title} loading="lazy" className={`w-full object-cover ${w.tall ? "aspect-[4/5]" : "aspect-square"}`} />
                <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5"><span><span className="block text-[10px] tracking-[0.28em] text-[#B8B8B8]">{w.cat}</span><span className="font-display mt-1 block text-2xl">{w.title}</span></span><ArrowUpRight className="shrink-0 opacity-70" size={20} /></span>
              </button>
            ))}
          </div>
          {filtered.length === 0 && <p className="mt-8 text-[#999]">No works in this category yet.</p>}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-[#111111] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="Services" title="EXPERTISE & SPECIALTIES" sub="Six areas of focus — each one developed around your idea, placement and story." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, idx) => (
              <article key={s.title} className="service-card reveal group overflow-hidden border border-[rgba(255,255,255,0.10)] bg-[#171717]">
                <div className="flex items-start justify-between p-6 pb-0"><span className="font-display text-5xl text-white/15">0{idx + 1}</span><span className="mt-2 h-px flex-1 bg-white/10 ml-5" /></div>
                <div className="p-6"><h3 className="font-display text-2xl leading-tight">{s.title}</h3><p className="mt-3 min-h-[72px] text-sm leading-relaxed text-[#999]">{s.desc}</p>
                  <a href={waLink(`Hello Andy J Tattoos! I would like to inquire about: ${s.title}. Please let me know about availability and further details. Thank you!`)} target="_blank" rel="noopener noreferrer" className="btn-line mt-5 inline-flex items-center gap-2 px-5 py-3 text-[10px] tracking-[0.22em] font-semibold">INQUIRE NOW <ArrowUpRight size={14} /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY + PROCESS */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="Why choose Andy J" title="ARTISTRY IN EVERY DETAIL" />
          <div className="mt-12 grid gap-px border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.10)] sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(f => <div key={f.title} className="reveal bg-[#080808] p-6 sm:p-7"><f.icon size={24} className="text-[#B8B8B8]" /><h3 className="font-display mt-4 text-xl">{f.title}</h3><p className="mt-2 text-sm leading-relaxed text-[#999]">{f.text}</p></div>)}
          </div>
          <div className="mt-24"><SectionHead eyebrow="The process" title="YOUR JOURNEY TO GREAT ART" /></div>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {STEPS.map(s => <div key={s.n} className="reveal border-t border-white/20 pt-5"><span className="font-display text-4xl text-[#B8B8B8]">{s.n}</span><h3 className="mt-3 text-sm font-semibold tracking-[0.14em]">{s.title}</h3><p className="mt-2 text-sm leading-relaxed text-[#999]">{s.text}</p></div>)}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="bg-[#111111] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6"><SectionHead eyebrow="Gallery" title="BEHIND THE ART" sub="Close-ups, studio atmosphere and artistic detail in black & grey." /><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-line inline-flex items-center gap-2 px-6 py-3 text-[11px] tracking-[0.2em]"><Instagram size={16} /> FOLLOW ON INSTAGRAM</a></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((g, idx) => <article key={g.label} className="reveal border border-[rgba(255,255,255,0.10)] bg-[#171717] p-6"><p className="text-[10px] tracking-[0.28em] text-[#B8B8B8]">{g.label.toUpperCase()} — 0{idx + 1}</p><h3 className="font-display mt-4 text-2xl leading-tight">{g.title}</h3><p className="mt-3 text-sm leading-relaxed text-[#999]">{g.text}</p></article>)}
          </div>
          <p className="mt-4 text-xs text-[#999]">Social posts are not reproduced here. See the portfolio for black & grey artwork.</p>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="Booking" title="LET'S CREATE YOUR NEXT MASTERPIECE" sub="Have an idea for your next tattoo? Let's discuss it." />
          <div className="mt-12 grid gap-6 lg:grid-cols-12">
            <form onSubmit={submitBooking} className="reveal border border-[rgba(255,255,255,0.10)] bg-[#171717] p-5 sm:p-8 lg:col-span-7" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block"><span className="text-[11px] tracking-[0.18em] text-[#B8B8B8]">FULL NAME *</span><input value={form.name} onChange={set("name")} className="mt-2 w-full border border-white/15 bg-[#080808] px-4 py-3 text-sm" placeholder="Your full name" autoComplete="name" />{errors.name && <span className="mt-1 block text-xs text-white">{errors.name}</span>}</label>
                <label className="block"><span className="text-[11px] tracking-[0.18em] text-[#B8B8B8]">WHATSAPP NUMBER *</span><input value={form.phone} onChange={set("phone")} className="mt-2 w-full border border-white/15 bg-[#080808] px-4 py-3 text-sm" placeholder="+94 …" autoComplete="tel" inputMode="tel" />{errors.phone && <span className="mt-1 block text-xs text-white">{errors.phone}</span>}</label>
                <label className="block"><span className="text-[11px] tracking-[0.18em] text-[#B8B8B8]">TATTOO STYLE</span><select value={form.style} onChange={set("style")} className="mt-2 w-full border border-white/15 bg-[#080808] px-4 py-3 text-sm"><option>Black &amp; Grey Realism</option><option>Portrait Tattoos</option><option>Realistic Animal Tattoos</option><option>Custom Tattoo Designs</option><option>Full Sleeve Tattoos</option><option>Fine Detail Black &amp; Grey Tattoos</option></select></label>
                <label className="block"><span className="text-[11px] tracking-[0.18em] text-[#B8B8B8]">TATTOO PLACEMENT</span><select value={form.placement} onChange={set("placement")} className="mt-2 w-full border border-white/15 bg-[#080808] px-4 py-3 text-sm"><option>Forearm</option><option>Upper Arm</option><option>Full Sleeve</option><option>Chest</option><option>Back</option><option>Leg</option><option>Shoulder</option><option>Other</option></select></label>
                <label className="block"><span className="text-[11px] tracking-[0.18em] text-[#B8B8B8]">APPROXIMATE SIZE</span><select value={form.size} onChange={set("size")} className="mt-2 w-full border border-white/15 bg-[#080808] px-4 py-3 text-sm"><option>Small — up to palm size</option><option>Medium — palm to forearm</option><option>Large — full forearm / upper arm</option><option>Extra Large — sleeve / back / chest</option></select></label>
                <label className="block"><span className="text-[11px] tracking-[0.18em] text-[#B8B8B8]">PREFERRED APPOINTMENT DATE</span><input type="date" value={form.date} onChange={set("date")} className="mt-2 w-full border border-white/15 bg-[#080808] px-4 py-3 text-sm [color-scheme:dark]" /></label>
                <label className="block sm:col-span-2"><span className="text-[11px] tracking-[0.18em] text-[#B8B8B8]">SHORT DESCRIPTION OF YOUR IDEA *</span><textarea value={form.idea} onChange={set("idea")} rows={5} className="mt-2 w-full resize-y border border-white/15 bg-[#080808] px-4 py-3 text-sm [overflow-wrap:anywhere]" placeholder="Tell us about your idea, references and placement…" />{errors.idea && <span className="mt-1 block text-xs text-white">{errors.idea}</span>}</label>
              </div>
              <button type="submit" className="btn-solid mt-6 flex w-full items-center justify-center gap-2 px-6 py-4 text-[11px] tracking-[0.22em] font-semibold"><MessageCircle size={16} /> SEND BOOKING REQUEST VIA WHATSAPP</button>
              {bookingNote && <p role="status" className="mt-4 border border-white/15 bg-[#080808] p-4 text-sm leading-relaxed text-[#B8B8B8]">{bookingNote}</p>}
              <p className="mt-4 text-xs leading-relaxed text-[#999]">Your request is sent via WhatsApp for manual confirmation — it is not automatically confirmed.</p>
            </form>
            <aside className="reveal border border-[rgba(255,255,255,0.10)] bg-[#111111] p-6 sm:p-8 lg:col-span-5">
              <p className="eyebrow">Booking summary</p><h3 className="font-display mt-3 text-3xl leading-tight">A clear, personal process.</h3>
              <dl className="mt-7 space-y-4 text-sm"><div className="flex justify-between gap-4 border-b border-white/10 pb-4"><dt className="text-[#999]">Artist</dt><dd>Andy J</dd></div><div className="flex justify-between gap-4 border-b border-white/10 pb-4"><dt className="text-[#999]">Location</dt><dd className="text-right">Colombo 05, Sri Lanka</dd></div><div className="flex justify-between gap-4 border-b border-white/10 pb-4"><dt className="text-[#999]">WhatsApp</dt><dd>{WA_DISPLAY}</dd></div><div className="flex justify-between gap-4 border-b border-white/10 pb-4"><dt className="text-[#999]">Instagram</dt><dd>@andy_j_tattoos.co</dd></div></dl>
              <p className="mt-6 leading-relaxed text-sm text-[#999]">Share as much detail as you can — your idea, placement and size help shape a thoughtful reply.</p>
              <a href={waLink("Hello Andy J Tattoos! I would like to discuss a tattoo idea.")} target="_blank" rel="noopener noreferrer" className="btn-line mt-6 inline-flex px-6 py-3 text-[11px] tracking-[0.2em]">MESSAGE ON WHATSAPP</a>
            </aside>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="bg-[#111111] py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
          <div className="reveal"><SectionHead eyebrow="Location" title="FIND THE STUDIO" sub="Based in Colombo 05, Sri Lanka. Message on WhatsApp for session details and directions." />
            <div className="mt-8 space-y-3 text-sm"><p className="flex gap-3"><MapPin className="shrink-0 text-[#B8B8B8]" size={18} /> Colombo 05, Sri Lanka</p><p className="flex gap-3"><Phone className="shrink-0 text-[#B8B8B8]" size={18} /> WhatsApp {WA_DISPLAY}</p></div>
            <p className="mt-6 border border-white/10 bg-[#080808] p-4 text-sm text-[#999]">A map is not available in this view. Use Get Directions for an external map.</p>
            <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="btn-solid mt-6 inline-flex items-center gap-2 px-6 py-3.5 text-[11px] tracking-[0.2em] font-semibold">GET DIRECTIONS <ArrowUpRight size={15} /></a>
          </div>
          <div className="reveal border border-[rgba(255,255,255,0.10)] bg-[#171717] p-7 sm:p-9"><p className="text-[10px] tracking-[0.28em] text-[#B8B8B8]">STUDIO ATMOSPHERE — COLOMBO 05</p><p className="font-display mt-5 text-3xl leading-tight">Arrive with an idea.<br />Leave with a plan.</p><p className="mt-4 text-sm leading-relaxed text-[#999]">Your visit begins with a conversation about the design, placement and size. Message on WhatsApp before you travel so session details can be confirmed.</p><div className="mt-7 grid grid-cols-2 gap-px border border-white/10 bg-white/10"><div className="bg-[#080808] p-4"><p className="font-display text-xl">01</p><p className="mt-1 text-[11px] tracking-[0.16em] text-[#999]">CONSULT</p></div><div className="bg-[#080808] p-4"><p className="font-display text-xl">02</p><p className="mt-1 text-[11px] tracking-[0.16em] text-[#999]">DESIGN</p></div><div className="bg-[#080808] p-4"><p className="font-display text-xl">03</p><p className="mt-1 text-[11px] tracking-[0.16em] text-[#999]">BOOK</p></div><div className="bg-[#080808] p-4"><p className="font-display text-xl">04</p><p className="mt-1 text-[11px] tracking-[0.16em] text-[#999]">CREATE</p></div></div></div>
        </div>
      </section>

      {/* TESTIMONIALS + FAQ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="Testimonials" title="CLIENT EXPERIENCES" />
          <div className="reveal mt-10 border border-dashed border-white/20 bg-[#111111] p-8 text-center sm:p-12">
            <p className="font-display text-2xl sm:text-3xl">Real client experiences will appear here once reviews are shared.</p>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#999]">No reviews are shown yet. Follow the studio on social media for updates and genuine client stories.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3"><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-line inline-flex items-center gap-2 px-5 py-3 text-[11px] tracking-[0.18em]"><Instagram size={15} /> INSTAGRAM</a><a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="btn-line inline-flex items-center gap-2 px-5 py-3 text-[11px] tracking-[0.18em]"><Facebook size={15} /> FACEBOOK</a></div>
          </div>
          <div className="mt-24 grid gap-10 lg:grid-cols-12"><div className="lg:col-span-4"><SectionHead eyebrow="FAQ" title="FREQUENTLY ASKED QUESTIONS" /></div>
            <div className="lg:col-span-8">{FAQS.map((f, i) => { const open = openFaq === i; return (<div key={f.q} className="border-b border-white/10"><button onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} className="flex w-full items-center justify-between gap-4 py-5 text-left"><span className="font-display text-lg sm:text-xl">{f.q}</span><ChevronDown size={19} className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} /></button>{open && <p className="fade-in pb-6 pr-8 text-sm leading-relaxed text-[#999] [overflow-wrap:anywhere]">{f.a}</p>}</div>); })}</div>
          </div>
        </div>
      </section>

      {/* CONTACT + FOOTER */}
      <section id="contact" className="border-t border-[rgba(255,255,255,0.10)] bg-[#111111] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-10"><div><p className="font-display text-3xl tracking-[0.08em]">ANDY J TATTOOS</p><p className="mt-2 text-[11px] tracking-[0.32em] text-[#999]">THE ART OF BLACK &amp; GREY</p></div>
            <div className="space-y-2 text-sm"><p className="flex gap-2"><MapPin size={17} className="text-[#B8B8B8]" /> Colombo 05, Sri Lanka</p><a href={waLink("Hello Andy J Tattoos!")} target="_blank" rel="noopener noreferrer" className="flex gap-2 hover:text-white"><Phone size={17} className="text-[#B8B8B8]" /> WhatsApp {WA_DISPLAY}</a><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex gap-2 hover:text-white"><Instagram size={17} className="text-[#B8B8B8]" /> @andy_j_tattoos.co</a><a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="flex gap-2 hover:text-white"><Facebook size={17} className="text-[#B8B8B8]" /> AndyJtatz</a></div>
          </div>
        </div>
      </section>
      <footer className="border-t border-[rgba(255,255,255,0.10)] py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 text-xs text-[#999] sm:px-6 md:flex-row md:items-center lg:px-8">
          <p>© 2026 Andy J Tattoos Srilanka. All Rights Reserved.</p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer navigation">{NAV.map(n => <button key={n} onClick={() => go(n.toLowerCase())} className="tracking-[0.18em] hover:text-white">{n}</button>)}</nav>
          <p>Colombo 05 • {WA_DISPLAY}</p>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a href={waLink("Hello Andy J Tattoos! I would like to inquire about booking a tattoo session.")} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-[#171717] shadow-2xl shadow-black/60 transition hover:bg-[#F5F5F5] hover:text-black"><MessageCircle size={25} /></a>

      {/* LIGHTBOX */}
      {lightbox !== null && filtered[lightbox] && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 pt-[max(1rem,var(--safe-area-inset-top))] pb-6" role="dialog" aria-modal="true" aria-label="Portfolio lightbox">
          <div className="min-h-full flex flex-col px-4 sm:px-8">
            <div className="mx-auto flex w-full max-w-5xl items-center justify-between py-3"><span className="text-[11px] tracking-[0.25em] text-[#999]">{lightbox + 1} / {filtered.length} — {filtered[lightbox].cat}</span><button onClick={closeLightbox} className="flex items-center gap-2 border border-white/25 px-4 py-2 text-[11px] tracking-[0.2em]" aria-label="Close lightbox"><X size={16} /> CLOSE</button></div>
            <div className="mx-auto flex w-full max-w-5xl flex-1 items-center gap-2 sm:gap-4">
              <button onClick={() => stepLightbox(-1)} className="shrink-0 border border-white/25 bg-black/50 p-3" aria-label="Previous image"><ChevronLeft size={22} /></button>
              <div className="min-w-0 flex-1"><img src={filtered[lightbox].img} alt={filtered[lightbox].title} className="max-h-[calc(100dvh-var(--safe-area-inset-top)-10rem)] w-full object-contain" /><div className="mt-4 text-center"><h3 className="font-display text-2xl">{filtered[lightbox].title}</h3><p className="mt-1 text-sm text-[#999]">{filtered[lightbox].note}</p></div></div>
              <button onClick={() => stepLightbox(1)} className="shrink-0 border border-white/25 bg-black/50 p-3" aria-label="Next image"><ChevronRight size={22} /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
