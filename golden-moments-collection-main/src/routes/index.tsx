import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  ChevronDown,
  Gem,
  House,
  LayoutGrid,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Scale,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

import heroImage from "@/assets/kvrc-bridal-hero.jpg";
import banglesImage from "@/assets/kvrc-bangles.jpg";
import jhumkasImage from "@/assets/kvrc-jhumkas.jpg";
import ringsImage from "@/assets/kvrc-rings-coins.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KVRC Jewellers, Chittoor | Gold Jewellery & Bridal Collections" },
      {
        name: "description",
        content:
          "Discover hallmarked gold bridal sets, temple haarams, bangles, jhumkas, rings and gold coins at KVRC Jewellers in Chittapara, Chittoor.",
      },
      { property: "og:title", content: "KVRC Jewellers — Chittoor" },
      {
        property: "og:description",
        content: "Timeless South Indian gold jewellery, honest weights and clear billing in Chittapara, Chittoor.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SHOP = {
  whatsapp: "919999999999",
  phone: "+919999999999",
  hours: "Open every day, 10:00 AM to 9:00 PM",
  rates: { date: "02 Oct 2026", gold22: 11000, gold24: 12000, silver: 150 },
  mapQuery: "KVRC Jewellers Chittapara Chittoor",
};

type Crop = { zoom: number; origin: string };
const collections: { title: string; copy: string; image: string; crop: Crop }[] = [
  { title: "Bridal sets", copy: "Temple necklaces, earrings and maang tikkas for your wedding day.", image: heroImage, crop: { zoom: 1.5, origin: "72% 62%" } },
  { title: "Haarams & chains", copy: "Long haarams, temple chains and lighter pieces for every day.", image: ringsImage, crop: { zoom: 1.5, origin: "70% 38%" } },
  { title: "Bangles & kadas", copy: "Plain, filigree and stone-set designs for every celebration.", image: banglesImage, crop: { zoom: 1.1, origin: "40% 55%" } },
  { title: "Jhumkas & earrings", copy: "Classic studs, drops and jhumkas in light and heavy weights.", image: jhumkasImage, crop: { zoom: 1, origin: "50% 50%" } },
  { title: "Rings & pendants", copy: "Meaningful gifts and everyday pieces, from delicate to statement.", image: ringsImage, crop: { zoom: 2.2, origin: "24% 48%" } },
  { title: "Gold coins & bars", copy: "Hallmarked gold for auspicious gifting and long-term saving.", image: ringsImage, crop: { zoom: 2.4, origin: "50% 84%" } },
];

const faqs = [
  ["Is your gold hallmarked?", "Yes. Our gold jewellery carries a BIS hallmark, and we are happy to show you the purity at the counter."],
  ["Can I exchange my old jewellery?", "Yes. Bring your old pieces; we weigh and test them in front of you, and you can use the value toward new jewellery."],
  ["How do I know what I am paying for?", "Your bill shows gold weight, the day’s rate, making charge and GST as separate lines."],
  ["Can you make a design I have seen elsewhere?", "Yes. Show us a photo and tell us your budget. We will confirm the weight, making charge and delivery time."],
  ["Which payment modes do you accept?", "Please ask at the shop for the payment modes available today."],
];

const inr = (amount: number) => `₹${Math.round(amount).toLocaleString("en-IN")}`;
const whatsappUrl = (message: string) =>
  `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(message)}`;

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [purity, setPurity] = useState("22");
  const [weight, setWeight] = useState(10);
  const [making, setMaking] = useState(8);
  const [enquiryItem, setEnquiryItem] = useState("Bridal sets");

  const estimate = useMemo(() => {
    const rate = purity === "22" ? SHOP.rates.gold22 : SHOP.rates.gold24;
    const gold = Math.max(0, weight || 0) * rate;
    const charge = gold * (Math.max(0, making || 0) / 100);
    const gst = (gold + charge) * 0.03;
    return { gold, charge, gst, total: gold + charge + gst };
  }, [purity, weight, making]);

  function sendEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const message = String(data.get("message") ?? "");
    window.open(
      whatsappUrl(`Hello KVRC Jewellers, I am ${name}. I am looking for: ${enquiryItem}. ${message}`),
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-30 border-b border-hero-border/50 bg-hero/55 text-hero-foreground backdrop-blur-lg">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#home" className="flex items-center gap-3" aria-label="KVRC Jewellers home">
            <span className="brand-mark">K</span>
            <span className="leading-none">
              <strong className="font-display text-xl font-semibold tracking-normal">KVRC</strong>
              <small className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-gold-soft">Jewellers · Chittoor</small>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm lg:flex" aria-label="Main navigation">
            <a className="nav-link" href="#collections">Collections</a>
            <a className="nav-link" href="#craft">Our promise</a>
            <a className="nav-link" href="#calculator">Price estimate</a>
            <a className="nav-link" href="#visit">Visit us</a>
          </nav>
          <div className="hidden items-center gap-3 sm:flex">
            <Button variant="goldOutline" size="sm" asChild>
              <a href={`tel:${SHOP.phone}`}><Phone /> Call us</a>
            </Button>
            <Button variant="gold" size="sm" asChild>
              <a href={whatsappUrl("Hello KVRC Jewellers, I would like a quote.")} target="_blank" rel="noreferrer"><MessageCircle /> Get a quote</a>
            </Button>
          </div>
          <Button variant="goldOutline" size="icon" className="sm:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && (
          <nav className="border-t border-hero-border bg-hero px-5 py-5 sm:hidden" aria-label="Mobile navigation">
            <div className="flex flex-col text-base">
              {[["Collections", "#collections"], ["Our promise", "#craft"], ["Price estimate", "#calculator"], ["FAQ", "#faq"], ["Visit us", "#visit"]].map(([label, href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center border-b border-hero-border/40">{label}</a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main>
        <section id="home" className="relative min-h-[82svh] bg-hero text-hero-foreground sm:min-h-[92svh]">
          <img src={heroImage} alt="Temple gold bridal necklace and matching jhumka earrings" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover object-[72%_center]" />
          <div className="hero-scrim absolute inset-0" />
          <div className="relative mx-auto flex min-h-[82svh] max-w-7xl items-end px-5 pb-10 pt-32 sm:min-h-[92svh] sm:pb-16 sm:pt-36 lg:items-center lg:px-8 lg:pb-0">
            <div className="max-w-2xl animate-rise">
              <p className="eyebrow text-gold-soft">కె.వి.ఆర్.సి జ్యువెలర్స్ · చిత్తూరు</p>
              <h1 className="mt-4 font-display text-[2.6rem] font-medium leading-[0.98] sm:mt-5 sm:text-6xl lg:text-8xl">Tradition,<br /><em className="text-gold-soft">beautifully worn.</em></h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-hero-muted sm:text-lg">Temple haarams, bridal sets and timeless 22K gold jewellery—hallmarked, honestly weighed and chosen with care.</p>
              <div className="mt-7 grid grid-cols-1 gap-3 sm:mt-9 sm:flex sm:flex-wrap">
                <Button variant="gold" size="xl" asChild><a href="#collections">Explore collections <ArrowRight /></a></Button>
                <Button variant="hero" size="xl" asChild><a href="#visit">Visit our showroom</a></Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 right-6 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-hero-muted lg:flex"><span className="h-px w-10 bg-gold" /> Chittapara, Chittoor</div>
        </section>

        <section className="bg-primary text-primary-foreground" aria-label="Today’s gold rates">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-primary-foreground/15 px-3 py-3 sm:px-5 sm:py-5 md:grid-cols-4 lg:px-8">
            <div className="px-3 py-2"><span className="rate-label">Today’s rates</span><strong className="rate-value">{SHOP.rates.date}</strong></div>
            <div className="px-3 py-2"><span className="rate-label">22K gold / gram</span><strong className="rate-value">{inr(SHOP.rates.gold22)}</strong></div>
            <div className="px-3 py-2"><span className="rate-label">24K gold / gram</span><strong className="rate-value">{inr(SHOP.rates.gold24)}</strong></div>
            <div className="px-3 py-2"><span className="rate-label">Silver / gram</span><strong className="rate-value">{inr(SHOP.rates.silver)}</strong></div>
          </div>
        </section>

        <section className="bg-background pb-2 pt-7 md:hidden" aria-label="Shop by category">
          <h2 className="px-5 font-display text-2xl font-semibold">Shop by category</h2>
          <div className="mt-4 flex gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {collections.map((item) => (
              <a key={item.title} href={whatsappUrl(`Hello KVRC Jewellers, I am interested in ${item.title}. Please share designs and prices.`)} target="_blank" rel="noreferrer" className="w-[4.6rem] shrink-0 text-center">
                <span className="mx-auto block size-[4.6rem] overflow-hidden rounded-full border-2 border-gold/70 bg-muted">
                  <img src={item.image} alt="" width={120} height={120} loading="lazy" className="size-full object-cover" style={{ scale: item.crop.zoom * 1.1, transformOrigin: item.crop.origin }} />
                </span>
                <span className="mt-2 block text-[11px] font-semibold leading-tight">{item.title}</span>
              </a>
            ))}
          </div>
        </section>

        <section id="collections" className="section-shell">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end md:gap-6">
              <div><p className="eyebrow text-primary">Made for every milestone</p><h2 className="section-title mt-3">Find the piece that feels like yours.</h2></div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground">From wedding-day temple jewellery to daily-wear classics, every piece honours craft and occasion.</p>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-3">
              {collections.map((item, index) => (
                <a key={item.title} className="group collection-card" href={whatsappUrl(`Hello KVRC Jewellers, I am interested in ${item.title}. Please share designs and prices.`)} target="_blank" rel="noreferrer">
                  <div className="aspect-[4/5] overflow-hidden bg-muted sm:aspect-[4/3]"><img src={item.image} alt={item.title} width={index < 2 ? 1536 : 1024} height={1024} loading="lazy" className="h-full w-full object-cover" style={{ scale: item.crop.zoom, transformOrigin: item.crop.origin }} /></div>
                  <div className="flex items-start justify-between gap-2 p-3 sm:gap-4 sm:p-5"><div><h3 className="font-display text-lg font-semibold leading-tight sm:text-2xl">{item.title}</h3><p className="mt-2 hidden text-sm leading-6 text-muted-foreground sm:block">{item.copy}</p><span className="mt-1 block text-[11px] font-semibold text-primary sm:hidden">Ask on WhatsApp</span></div><ArrowRight className="mt-1 size-4 shrink-0 text-primary transition-transform group-hover:translate-x-1 sm:size-5" /></div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="craft" className="bg-hero py-12 text-hero-foreground sm:py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div><p className="eyebrow text-gold-soft">The KVRC promise</p><h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">Gold you can choose<br />with complete confidence.</h2><p className="mt-6 max-w-md leading-7 text-hero-muted">At our counter, clarity matters as much as craftsmanship. We show you the hallmark, weight every piece in front of you and explain every line of your bill.</p></div>
            <div className="grid gap-px overflow-hidden border border-hero-border bg-hero-border grid-cols-2">
              {[[ShieldCheck,"BIS hallmarked","Purity you can verify."],[Scale,"Honest weights","Weighed in front of you."],[BadgeCheck,"Clear billing","Gold, making and GST itemised."],[Sparkles,"Custom designs","Made for your style and budget."]].map(([Icon,title,copy]) => {
                const Symbol = Icon as typeof ShieldCheck;
                return <div key={String(title)} className="bg-hero p-4 sm:p-7"><Symbol className="size-6 text-gold sm:size-7" /><h3 className="mt-4 font-display text-xl sm:mt-6 sm:text-2xl">{String(title)}</h3><p className="mt-2 text-sm text-hero-muted">{String(copy)}</p></div>;
              })}
            </div>
          </div>
        </section>

        <section id="calculator" className="section-shell bg-secondary">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
            <div className="lg:pr-16"><p className="eyebrow text-primary">Price estimate</p><h2 className="section-title mt-3">Know the price before you walk in.</h2><p className="mt-6 leading-7 text-muted-foreground">Enter a weight and making charge for a close estimate based on today’s displayed rate. Your final bill is confirmed at the showroom.</p><div className="mt-9 flex items-center gap-4 border-t border-border pt-6"><Gem className="size-8 text-primary" /><p className="text-sm"><strong className="block">Transparent by design</strong><span className="text-muted-foreground">Gold value, making charge and GST shown separately.</span></p></div></div>
            <div className="calculator-panel">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
                <label className="field-label col-span-2 sm:col-span-1">Purity<Select value={purity} onValueChange={setPurity}><SelectTrigger className="mt-2 h-12"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="22">22K (916)</SelectItem><SelectItem value="24">24K</SelectItem></SelectContent></Select></label>
                <label className="field-label">Weight (grams)<Input className="mt-2 h-12" type="number" inputMode="decimal" min="0" step="0.01" value={weight} onChange={(e) => setWeight(Number(e.target.value))} /></label>
                <label className="field-label">Making charge (%)<Input className="mt-2 h-12" type="number" inputMode="decimal" min="0" step="0.1" value={making} onChange={(e) => setMaking(Number(e.target.value))} /></label>
              </div>
              <dl className="mt-8 space-y-4 border-t border-border pt-6 text-sm">
                <div className="estimate-row"><dt>Gold value</dt><dd>{inr(estimate.gold)}</dd></div>
                <div className="estimate-row"><dt>Making charge</dt><dd>{inr(estimate.charge)}</dd></div>
                <div className="estimate-row"><dt>GST (3%)</dt><dd>{inr(estimate.gst)}</dd></div>
                <div className="estimate-total"><dt>Estimated total</dt><dd>{inr(estimate.total)}</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section id="faq" className="section-shell">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
            <div><p className="eyebrow text-primary">Good to know</p><h2 className="section-title mt-3">Answers before you visit.</h2></div>
            <div className="divide-y divide-border border-y border-border">
              {faqs.map(([question, answer]) => <details key={question} className="faq-item group"><summary><span>{question}</span><ChevronDown className="size-5 text-primary transition group-open:rotate-180" /></summary><p>{answer}</p></details>)}
            </div>
          </div>
        </section>

        <section id="visit" className="bg-primary py-12 text-primary-foreground sm:py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
            <div><p className="eyebrow text-gold-pale">Visit our showroom</p><h2 className="mt-4 font-display text-5xl leading-tight">See the details.<br />Feel the difference.</h2><address className="mt-7 text-base not-italic leading-7 text-primary-foreground/75">KVRC Jewellers<br />Opposite Old Bhayya Medicals,<br />Chittapara, Chittoor, Andhra Pradesh</address><p className="mt-5 text-sm text-primary-foreground/70">{SHOP.hours}</p><div className="mt-8 flex flex-wrap gap-3"><Button variant="gold" size="lg" asChild><a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SHOP.mapQuery)}`}><MapPin /> Get directions</a></Button><Button variant="hero" size="lg" asChild><a href={`tel:${SHOP.phone}`}><Phone /> Call the shop</a></Button></div></div>
            <form onSubmit={sendEnquiry} className="enquiry-panel">
              <div className="mb-7"><MessageCircle className="size-7 text-gold" /><h3 className="mt-4 font-display text-3xl">Ask us on WhatsApp</h3><p className="mt-2 text-sm text-primary-foreground/65">Tell us what you are looking for and we’ll help you find it.</p></div>
              <div className="space-y-5">
                <label className="field-label text-primary-foreground">Your name<Input name="name" required autoComplete="name" className="mt-2 h-12 border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground" /></label>
                <label className="field-label text-primary-foreground">What are you looking for?<Select value={enquiryItem} onValueChange={setEnquiryItem}><SelectTrigger className="mt-2 h-12 border-primary-foreground/20 bg-primary-foreground/5"><SelectValue /></SelectTrigger><SelectContent>{[...collections.map((item) => item.title), "Exchange old jewellery"].map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></label>
                <label className="field-label text-primary-foreground">Message (optional)<Textarea name="message" rows={3} className="mt-2 border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground" /></label>
                <Button variant="gold" size="xl" className="w-full" type="submit">Send enquiry <ArrowRight /></Button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-footer pb-28 pt-10 text-footer-foreground md:pb-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 px-5 md:flex-row md:items-end lg:px-8"><div><div className="font-display text-3xl">KVRC <span className="text-gold">Jewellers</span></div><p className="mt-2 text-xs text-footer-muted">Chittapara, Chittoor · Hallmarked gold jewellery</p></div><p className="max-w-xl text-xs leading-5 text-footer-muted">Rates and prices are indicative and may change during the day. We do not buy items without valid identity proof and do not deal with minors.</p></div>
        <p className="mx-auto mt-8 max-w-7xl border-t border-footer-muted/20 px-5 pt-5 text-xs text-footer-muted lg:px-8">Designed &amp; built by <span className="font-semibold text-gold-soft">Mazent</span></p>
      </footer>

      <Button variant="whatsapp" size="iconLg" className="fixed bottom-5 right-5 z-40 shadow-xl max-md:hidden" asChild>
        <a href={whatsappUrl("Hello KVRC Jewellers, I would like a quote.")} target="_blank" rel="noreferrer" aria-label="Chat with KVRC Jewellers on WhatsApp"><MessageCircle /></a>
      </Button>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-hero-border bg-hero/95 pb-[env(safe-area-inset-bottom)] text-hero-foreground backdrop-blur-lg md:hidden" aria-label="Quick actions">
        <div className="grid grid-cols-5">
          {([[House, "Home", "#home"], [LayoutGrid, "Collections", "#collections"], [Calculator, "Estimate", "#calculator"], [Phone, "Call", `tel:${SHOP.phone}`], [MessageCircle, "WhatsApp", whatsappUrl("Hello KVRC Jewellers, I would like a quote.")]] as const).map(([Icon, label, href]) => (
            <a key={label} href={href} {...(label === "WhatsApp" ? { target: "_blank", rel: "noreferrer" } : {})} className={`flex min-h-14 flex-col items-center justify-center gap-1 text-[10px] font-semibold ${label === "WhatsApp" ? "text-gold" : "text-hero-muted"}`}>
              <Icon className="size-5" />{label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}