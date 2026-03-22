import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Droplets, Heart, ShieldCheck, Zap, ArrowRight, Check, X } from "lucide-react";

const PRIVACY_POLICY = `
# Privacy Policy

At Dakshin swaad (Pillai Agri Products), we are committed to protecting your privacy.

## 1. Information Collection
We collect personal information such as your name, email address, phone number, and shipping address when you place an order or contact us.

## 2. Use of Information
Your information is used solely for:
- Processing and delivering your orders.
- Communicating with you about your order status.
- Improving our products and services.

## 3. Data Protection
We implement industry-standard security measures to protect your personal data from unauthorized access or disclosure.

## 4. Third Parties
We do not sell, trade, or otherwise transfer your personal information to outside parties, except for trusted third parties who assist us in operating our website and conducting our business (e.g., shipping partners).

## 5. Your Rights
You have the right to access, correct, or delete your personal information at any time by contacting us.
`;

const TERMS_OF_SERVICE = `
# Terms of Service

Welcome to Dakshin swaad. By using our website, you agree to the following terms.

## 1. Product Information
Dakshin swaad provides 100% organic, cold-pressed oils. While we strive for accuracy, actual product packaging and materials may contain more or different information than shown.

## 2. Ordering and Payment
All orders are subject to acceptance and availability. Prices are subject to change without notice.

## 3. Shipping and Delivery
We aim to deliver products within the estimated timelines. However, delays may occur due to unforeseen circumstances.

## 4. Returns and Refunds
If you receive a damaged or incorrect product, please contact us within 48 hours of delivery for a replacement or refund.

## 5. Limitation of Liability
Dakshin swaad shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website.

## 6. Governing Law
These terms are governed by the laws of India.
`;

const PRODUCTS = [
  {
    id: "sesame",
    name: "Sesame Oil",
    localImage: "sesame.png",
    color: "#D97706",
    description: "Rich in antioxidants and heart-healthy fats, our sesame oil is perfect for traditional cooking.",
    benefits: ["High Smoke Point", "Rich in Vitamin E", "Anti-inflammatory"]
  },
  {
    id: "mustard",
    name: "Mustard Oil",
    localImage: "mustard.png",
    color: "#B45309",
    description: "Pungent and powerful, our cold-pressed mustard oil retains all its natural nutrients and flavor.",
    benefits: ["Boosts Immunity", "Good for Skin", "Natural Preservative"]
  },
  {
    id: "groundnut",
    name: "Groundnut Oil",
    localImage: "groundnut.png",
    color: "#92400E",
    description: "A versatile oil with a mild nutty flavor, ideal for deep frying and everyday meals.",
    benefits: ["Zero Cholesterol", "High in Protein", "Heart Friendly"]
  },
  {
    id: "coconut",
    name: "Coconut Oil",
    localImage: "coconut.png",
    color: "#78350F",
    description: "Pure, white, and fragrant. Our coconut oil is extracted from the finest sun-dried copra.",
    benefits: ["MCFAs for Energy", "Great for Hair", "Metabolism Boost"]
  }
];

const COMPARISON = [
  { feature: "Extraction Method", cold: "Mechanical pressing at low temp", refined: "Chemical solvents & high heat" },
  { feature: "Nutrient Retention", cold: "100% Nutrients preserved", refined: "Most nutrients lost" },
  { feature: "Natural Aroma", cold: "Rich, authentic fragrance", refined: "Deodorized & bland" },
  { feature: "Chemical Additives", cold: "Zero chemicals or preservatives", refined: "Bleaching agents & hexane" },
  { feature: "Health Impact", cold: "Promotes heart health", refined: "Trans-fats & inflammation" },
];

export default function App() {
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % PRODUCTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const Modal = ({ type, onClose }: { type: "privacy" | "terms", onClose: () => void }) => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-brown/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-cream w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl p-8 md:p-12 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-brand-brown/5 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
        <div className="max-w-none">
          <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-brand-brown/80">
            {type === "privacy" ? PRIVACY_POLICY : TERMS_OF_SERVICE}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen">
      <AnimatePresence>
        {activeModal && (
          <Modal 
            type={activeModal} 
            onClose={() => setActiveModal(null)} 
          />
        )}
      </AnimatePresence>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-cream/80 backdrop-blur-md border-b border-brand-brown/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="logo.png" alt="Dakshin swaad Logo" className="h-16 w-auto" referrerPolicy="no-referrer" />
          </div>
          <div className="hidden md:flex gap-12 text-sm font-medium uppercase tracking-widest">
            <a href="#products" className="hover:text-brand-red transition-colors">Products</a>
            <a href="#benefits" className="hover:text-brand-red transition-colors">Benefits</a>
            <a href="#compare" className="hover:text-brand-red transition-colors">The Difference</a>
          </div>
          <div className="w-24 md:hidden" /> {/* Spacer for mobile layout balance */}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-radial from-brand-gold/10 via-cream to-cream z-10" />
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
        </div>
        
        <div className="container mx-auto px-6 relative z-20 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-6xl md:text-8xl font-display font-bold leading-tight mb-6"
            >
              PURE <br />
              <span className="text-brand-red">
                TRADIT<span className="relative inline-block">I<motion.span initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }} className="absolute -top-[0.05em] left-1/2 -translate-x-1/2 w-[0.15em] h-[0.15em] bg-brand-gold rounded-full rounded-tl-none rotate-45 shadow-sm" /></span>ON
              </span> <br />
              IN EVERY DROP
            </motion.h1>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-lg md:text-xl max-w-md mb-8 opacity-80 leading-relaxed"
            >
              Dakshin swaad brings you the essence of South Indian heritage through our premium, 100% organic cold-pressed oils.
            </motion.p>
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="flex gap-4"
            >
              <a href="#products" className="group bg-brand-brown text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-brand-red transition-all hover:gap-4">
                Explore Range <ArrowRight size={20} />
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative perspective-1000"
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative preserve-3d">
              <motion.img 
                key={PRODUCTS[heroIndex].id}
                src={PRODUCTS[heroIndex].localImage} 
                alt={PRODUCTS[heroIndex].name} 
                className="w-full max-w-md mx-auto drop-shadow-2xl h-[400px] object-contain"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, -20, 0] }}
                transition={{ 
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.5 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" } 
                }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-8 bg-black/10 blur-xl rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Scroll</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-brand-brown to-transparent"
          />
        </motion.div>
      </section>

      {/* Product Showcase */}
      <section id="products" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-brand-red font-bold uppercase tracking-widest text-sm mb-4 block">Our Collection</span>
              <h2 className="font-serif text-5xl md:text-7xl tracking-tighter">THE ESSENTIALS</h2>
            </div>
            <p className="max-w-xs opacity-60 text-sm italic">
              Carefully extracted using traditional wood-pressing methods to preserve every bit of nature's goodness.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-cream p-8 rounded-3xl border border-brand-brown/5 hover:border-brand-red/20 transition-all hover:shadow-2xl"
              >
                <div className="aspect-[3/4] mb-6 overflow-hidden rounded-2xl relative">
                  <img 
                    src={product.localImage} 
                    alt={product.name} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="font-serif text-2xl mb-2">{product.name}</h3>
                <p className="text-sm opacity-70 mb-4">{product.description}</p>
                <div className="flex flex-wrap gap-2">
                  {product.benefits.map(benefit => (
                    <span key={benefit} className="text-[10px] uppercase font-bold tracking-wider bg-white px-2 py-1 rounded-full border border-brand-brown/10">
                      {benefit}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="compare" className="py-24 bg-brand-brown text-cream overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-5xl md:text-7xl tracking-tighter mb-8">
                WHY COLD <br />
                <span className="text-brand-gold italic">PRESSED?</span>
              </h2>
              <div className="space-y-4">
                {COMPARISON.map((item, idx) => (
                  <motion.div 
                    key={item.feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="grid grid-cols-[1fr_1.5fr_1.5fr] gap-4 py-4 border-b border-cream/10 items-center"
                  >
                    <span className="text-xs font-bold uppercase opacity-50">{item.feature}</span>
                    <div className="flex items-center gap-2 text-brand-gold font-medium">
                      <Check size={16} />
                      <span className="text-sm">{item.cold}</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-40">
                      <X size={16} />
                      <span className="text-sm">{item.refined}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-brand-gold/10 rounded-full absolute inset-0 blur-3xl animate-pulse" />
              <img 
                src="logo.png" 
                alt="Logo" 
                className="relative z-10 w-full max-w-sm mx-auto opacity-20 grayscale invert"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 w-full">
                <p className="font-serif text-3xl italic mb-4">"Where Purity Begins"</p>
                <div className="flex justify-center gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-display font-bold text-brand-gold">100%</div>
                    <div className="text-[10px] uppercase tracking-widest opacity-60">Organic</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-display font-bold text-brand-gold">0</div>
                    <div className="text-[10px] uppercase tracking-widest opacity-60">Chemicals</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section id="benefits" className="py-24 bg-cream">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl tracking-tighter mb-4">HEALTH IS WEALTH</h2>
          <p className="max-w-2xl mx-auto opacity-70">
            Our oils are more than just cooking ingredients; they are a foundation for a healthier lifestyle, packed with natural antioxidants and essential fatty acids.
          </p>
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Heart className="text-brand-red" />, title: "Heart Health", desc: "Rich in MUFA and PUFA that help maintain healthy cholesterol levels." },
            { icon: <ShieldCheck className="text-brand-red" />, title: "Immunity", desc: "Natural antioxidants help strengthen your body's defense system." },
            { icon: <Zap className="text-brand-red" />, title: "Energy", desc: "Healthy fats provide sustained energy throughout the day." },
            { icon: <Droplets className="text-brand-red" />, title: "Skin & Hair", desc: "Perfect for topical application to nourish and protect." },
          ].map((benefit, idx) => (
            <motion.div 
              key={benefit.title}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all text-center"
            >
              <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-6">
                {benefit.icon}
              </div>
              <h3 className="font-serif text-2xl mb-4">{benefit.title}</h3>
              <p className="text-sm opacity-60 leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-brand-brown/10 py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <img src="logo.png" alt="Logo" className="h-20 mb-6" referrerPolicy="no-referrer" />
            <p className="max-w-sm opacity-60 text-sm mb-8">
              Dakshin swaad is committed to reviving the traditional methods of oil extraction. We believe in purity, health, and the authentic taste of South India.
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4 text-sm opacity-70">
              <li className="font-bold text-brand-brown">Pillai Agri Products</li>
              <li>pillaikoushik92@gmail.com</li>
              <li>+91 9512336063</li>
              <li className="max-w-md">Amli, Silvassa, Daman and Nagar Haveli and Daman and Diu, India</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-20 pt-8 border-t border-brand-brown/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest opacity-40 font-bold">
          <p>© 2026 Dakshin swaad (Pillai Agri Products). All rights reserved.</p>
          <div className="flex gap-8">
            <button onClick={() => setActiveModal("privacy")} className="hover:text-brand-red transition-colors">Privacy Policy</button>
            <button onClick={() => setActiveModal("terms")} className="hover:text-brand-red transition-colors">Terms of Service</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
