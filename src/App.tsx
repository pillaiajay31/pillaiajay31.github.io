import React, { useState, useEffect, useRef, ReactNode, useLayoutEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { Droplets, Droplet, Heart, ShieldCheck, Zap, ArrowRight, Check, X, Leaf, Sparkles, MoveRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PRIVACY_POLICY = `
# Privacy Policy

At Dakshin Swaad (Pillai Agri Products), we are committed to protecting your privacy.

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

Welcome to Dakshin Swaad. By using our website, you agree to the following terms.

## 1. Product Information
Dakshin Swaad provides 100% organic, cold-pressed oils. While we strive for accuracy, actual product packaging and materials may contain more or different information than shown.

## 2. Ordering and Payment
All orders are subject to acceptance and availability. Prices are subject to change without notice.

## 3. Shipping and Delivery
We aim to deliver products within the estimated timelines. However, delays may occur due to unforeseen circumstances.

## 4. Returns and Refunds
If you receive a damaged or incorrect product, please contact us within 48 hours of delivery for a replacement or refund.

## 5. Limitation of Liability
Dakshin Swaad shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website.

## 6. Governing Law
These terms are governed by the laws of India.
`;

const PRODUCTS = [
  {
    id: "sesame",
    name: "Sesame Oil",
    localImage: "/sesame.png",
    color: "#C5A059",
    size: "1 Litre",
    description: "Rich in antioxidants and heart-healthy fats, our sesame oil is perfect for traditional cooking.",
    benefits: ["High Smoke Point", "Rich in Vitamin E", "Anti-inflammatory"]
  },
  {
    id: "mustard",
    name: "Mustard Oil",
    localImage: "/mustard.png",
    color: "#C5A059",
    size: "1 Litre",
    description: "Pungent and powerful, our cold-pressed mustard oil retains all its natural nutrients and flavor.",
    benefits: ["Boosts Immunity", "Good for Skin", "Natural Preservative"]
  },
  {
    id: "groundnut",
    name: "Groundnut Oil",
    localImage: "/groundnut.png",
    color: "#C5A059",
    size: "1 Litre",
    description: "A versatile oil with a mild nutty flavor, ideal for deep frying and everyday meals.",
    benefits: ["Zero Cholesterol", "High in Protein", "Heart Friendly"]
  },
  {
    id: "coconut",
    name: "Coconut Oil",
    localImage: "/coconut.png",
    color: "#C5A059",
    size: "1 Litre",
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

const BENEFITS = [
  { 
    id: "heart",
    icon: <Heart size={32} />, 
    title: "Heart Health", 
    desc: "Rich in MUFA and PUFA that help maintain healthy cholesterol levels.", 
    color: "bg-red-50",
    details: "Cold-pressed oils are rich in monounsaturated (MUFA) and polyunsaturated (PUFA) fatty acids. Unlike refined oils, our traditional extraction process preserves these heart-healthy fats, which help in reducing bad cholesterol (LDL) and maintaining overall cardiovascular health. Regular consumption can significantly lower the risk of heart disease.",
    points: ["Reduces LDL Cholesterol", "Rich in Omega-3 & 6", "Maintains Blood Pressure"]
  },
  { 
    id: "immunity",
    icon: <ShieldCheck size={32} />, 
    title: "Immunity", 
    desc: "Natural antioxidants help strengthen your body's defense system.", 
    color: "bg-blue-50",
    details: "Our oils are packed with natural Vitamin E and polyphenols. These powerful antioxidants neutralize free radicals in the body, reducing oxidative stress and boosting your immune system. By choosing Dakshin Swaad, you're providing your body with the natural tools it needs to fight off infections and stay resilient.",
    points: ["High Vitamin E Content", "Natural Polyphenols", "Anti-bacterial Properties"]
  },
  { 
    id: "energy",
    icon: <Zap size={32} />, 
    title: "Energy", 
    desc: "Healthy fats provide sustained energy throughout the day.", 
    color: "bg-yellow-50",
    details: "Medium-chain triglycerides (MCTs) found in oils like coconut oil are rapidly absorbed by the liver and converted into energy. This provides a steady, sustained energy source without the crashes associated with sugars. It's the perfect fuel for an active lifestyle and mental clarity.",
    points: ["Quick Energy Absorption", "No Sugar Crashes", "Boosts Metabolism"]
  },
  { 
    id: "skin",
    icon: <Droplets size={32} />, 
    title: "Skin & Hair", 
    desc: "Perfect for topical application to nourish and protect.", 
    color: "bg-emerald-50",
    details: "Beyond cooking, our pure oils are excellent for external use. Coconut and sesame oils have been used for centuries in Ayurveda for 'Abhyanga' (oil massage). They penetrate deep into the skin and hair follicles, providing intense hydration, anti-inflammatory benefits, and a natural glow without any synthetic chemicals.",
    points: ["Deep Hydration", "Anti-inflammatory", "Chemical-free Glow"]
  },
];

const ParallaxSection = ({ children, className = "", overflow = "hidden" }: { children: ReactNode, className?: string, overflow?: "hidden" | "visible" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div ref={ref} className={`relative ${overflow === "hidden" ? "overflow-hidden" : ""} ${className}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
};

const Reveal = ({ children, delay = 0, width = "fit-content", overflow = "hidden" }: { children: ReactNode, delay?: number, width?: "fit-content" | "100%", overflow?: "hidden" | "visible", key?: string | number }) => (
  <div style={{ position: "relative", width, overflow }}>
    <motion.div
      className={width === "100%" ? "w-full" : ""}
      initial={{ opacity: 0, y: 75 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  </div>
);

const ProductCard = ({ product, idx, onViewDetails }: { product: typeof PRODUCTS[0], idx: number, onViewDetails: (p: typeof PRODUCTS[0]) => void, key?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    setRotation({ x: rotateX, y: rotateY });
    setGlare({ 
      x: (x / rect.width) * 100, 
      y: (y / rect.height) * 100,
      opacity: 0.4
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <Reveal delay={idx * 0.1} overflow="visible">
      <div className="group text-center">
        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => onViewDetails(product)}
          className="aspect-[4/5] mb-10 bg-paper rounded-[60px] p-16 transition-all duration-700 group-hover:soft-shadow group-hover:-translate-y-4 relative [perspective:1000px] [transform-style:preserve-3d] cursor-pointer overflow-hidden"
        >
          <div className="absolute inset-0 bg-brand-gold opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 rounded-[60px]" />
          
          {/* Dynamic Glare Overlay */}
          <motion.div 
            className="absolute inset-0 z-20 pointer-events-none rounded-[60px] overflow-hidden"
            animate={{ 
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
              opacity: glare.opacity
            }}
            transition={{ type: "tween", ease: "linear", duration: 0.1 }}
          />

          <motion.div
            className="w-full h-full relative z-10"
            animate={{ 
              rotateX: rotation.x,
              rotateY: rotation.y,
              scale: rotation.x !== 0 ? 1.1 : 1,
              z: rotation.x !== 0 ? 100 : 0
            }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
          >
            <motion.img 
              src={product.localImage} 
              alt={product.name} 
              className="w-full h-full object-contain drop-shadow-[20px_20px_40px_rgba(0,0,0,0.2)]"
              animate={{
                y: rotation.x === 0 ? [0, -15, 0] : 0,
              }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }
              }}
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Hover Action Button */}
          <div className="absolute inset-x-0 bottom-12 flex justify-center z-30 opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-500">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(product);
              }}
              className="bg-brand-brown text-cream px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl hover:bg-brand-gold transition-colors flex items-center gap-2"
            >
              View Details <ArrowRight size={12} />
            </button>
          </div>
        </div>
        
        <div className="px-4">
          <h3 className="font-serif text-4xl mb-3 tracking-tight group-hover:text-brand-gold transition-colors">{product.name}</h3>
          <div className="flex items-center justify-center">
            <span className="text-brand-brown/40 text-[10px] font-bold uppercase tracking-widest">{product.size}</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

const ProductModal = ({ product, onClose }: { product: typeof PRODUCTS[0], onClose: () => void }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleShop = (platform: 'amazon' | 'flipkart') => {
    const urls = {
      amazon: "https://www.amazon.in/s?k=" + encodeURIComponent(product.name + " Dakshin Swaad"),
      flipkart: "https://www.flipkart.com/search?q=" + encodeURIComponent(product.name + " Dakshin Swaad")
    };
    window.open(urls[platform], '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 md:p-6 bg-brand-brown/40 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 40, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-paper w-full max-w-5xl rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl relative flex flex-col md:grid md:grid-cols-2 my-auto"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-50 w-12 h-12 rounded-full bg-brand-brown/5 flex items-center justify-center hover:bg-brand-brown hover:text-cream transition-all duration-300"
        >
          <X size={20} />
        </button>

        {/* Image Side */}
        <div className="bg-brand-gold/5 p-12 md:p-20 flex items-center justify-center relative overflow-hidden">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute w-[150%] h-[150%] border border-brand-gold/10 rounded-full border-dashed"
          />
          <motion.img 
            layoutId={`product-img-${product.id}`}
            src={product.localImage} 
            alt={product.name}
            className="relative z-10 w-full max-w-[300px] md:max-w-full h-auto drop-shadow-[30px_30px_60px_rgba(0,0,0,0.15)]"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Content Side */}
        <div className="p-12 md:p-20 flex flex-col justify-start md:justify-center">
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-[1px] bg-brand-gold" />
              <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px]">
                {product.size} • Cold Pressed
              </span>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl mb-6 tracking-tight leading-none">{product.name}</h2>
            <p className="text-lg md:text-xl text-brand-brown/60 leading-relaxed font-light">
              {product.description}
            </p>
          </div>

          <div className="space-y-6 mb-12">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-brown/30">Key Benefits</h4>
            <div className="grid grid-cols-1 gap-4">
              {product.benefits.map((benefit, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  key={`${product.id}-benefit-${i}`} 
                  className="flex items-center gap-4 group"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-cream transition-colors duration-300">
                    <Check size={14} />
                  </div>
                  <span className="text-sm font-medium text-brand-brown/80">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {!showOptions ? (
                <motion.button
                  key="shop-now"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onClick={() => setShowOptions(true)}
                  className="w-full bg-brand-brown text-cream px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-gold transition-all duration-500 hover:shadow-xl hover:shadow-brand-brown/20 flex items-center justify-center gap-3"
                >
                  Shop Now <ArrowRight size={16} />
                </motion.button>
              ) : (
                <motion.div
                  key="options"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <button 
                    onClick={() => handleShop('amazon')}
                    className="bg-[#FF9900] text-white px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    Amazon
                  </button>
                  <button 
                    onClick={() => handleShop('flipkart')}
                    className="bg-[#2874F0] text-white px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    Flipkart
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            
            <button 
              onClick={() => setShowOptions(false)}
              className={`text-[10px] uppercase tracking-widest font-bold text-brand-gold transition-colors self-center mt-2 ${!showOptions ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              ← Back to Product
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const BenefitModal = ({ benefit, onClose }: { benefit: typeof BENEFITS[0], onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 md:p-6 bg-brand-brown/40 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 40, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-paper w-full max-w-2xl rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl relative p-12 md:p-20 my-auto"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-50 w-12 h-12 rounded-full bg-brand-brown/5 flex items-center justify-center hover:bg-brand-brown hover:text-cream transition-all duration-300"
        >
          <X size={20} />
        </button>
        
        <div className={`w-20 h-20 ${benefit.color} rounded-3xl flex items-center justify-center mb-10 text-brand-brown`}>
          {benefit.icon}
        </div>
        
        <h2 className="font-serif text-5xl md:text-6xl mb-8 tracking-tight leading-none">{benefit.title}</h2>
        
        <p className="text-xl text-brand-brown/60 leading-relaxed font-light mb-12">
          {benefit.details}
        </p>
        
        <div className="space-y-6">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-brown/30">Why it matters</h4>
          <div className="grid grid-cols-1 gap-4">
            {benefit.points.map((point, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                key={`${benefit.id}-point-${i}`} 
                className="flex items-center gap-4 group"
              >
                <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                  <Check size={14} />
                </div>
                <span className="text-sm font-medium text-brand-brown/80">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [selectedBenefit, setSelectedBenefit] = useState<typeof BENEFITS[0] | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % PRODUCTS.length);
    }, 5000);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalTriggerRef = useRef<HTMLDivElement>(null);
  const compareRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: compareScroll } = useScroll({
    target: compareRef,
    offset: ["start end", "end start"]
  });

  const compareOpacity = useTransform(compareScroll, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const compareScale = useTransform(compareScroll, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const compareY = useTransform(compareScroll, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal Scroll Animation
      const section = horizontalSectionRef.current;
      const trigger = horizontalTriggerRef.current;
      
      if (section && trigger) {
        const getScrollWidth = () => section.scrollWidth - window.innerWidth;
        
        const horizontalAnim = gsap.to(section, {
          x: () => -getScrollWidth(),
          ease: "none",
          scrollTrigger: {
            trigger: trigger,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${getScrollWidth()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progressRef.current) {
                gsap.set(progressRef.current, { scaleX: self.progress });
              }
            }
          }
        });

        // Step Image Color Reveal on Scroll
        gsap.utils.toArray<HTMLElement>(".process-step-image").forEach((img) => {
          ScrollTrigger.create({
            trigger: img,
            containerAnimation: horizontalAnim,
            start: "left 70%",
            end: "right 30%",
            onEnter: () => img.classList.remove("grayscale"),
            onLeave: () => img.classList.add("grayscale"),
            onEnterBack: () => img.classList.remove("grayscale"),
            onLeaveBack: () => img.classList.add("grayscale"),
          });
        });
      }

      // Parallax for floating elements
      gsap.to(".parallax-bg", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });

      // Reveal animations for titles
      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el) => {
        gsap.from(el, {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Refresh ScrollTrigger after a short delay to ensure all dimensions are calculated
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    });

    return () => ctx.revert();
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
    <div className="min-h-screen bg-cream selection:bg-brand-gold/30">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-gold z-[100] origin-left"
        style={{ scaleX }}
      />
      
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-10 right-10 z-[90] w-14 h-14 bg-brand-brown text-cream rounded-full flex items-center justify-center shadow-2xl hover:bg-brand-gold transition-colors"
          >
            <ArrowRight className="-rotate-90" size={24} />
          </motion.button>
        )}
        {activeModal && (
          <Modal 
            type={activeModal} 
            onClose={() => setActiveModal(null)} 
          />
        )}
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
        {selectedBenefit && (
          <BenefitModal 
            benefit={selectedBenefit} 
            onClose={() => setSelectedBenefit(null)} 
          />
        )}
      </AnimatePresence>
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'h-16 glass-nav py-2' : 'h-24 py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Dakshin Swaad Logo" className={`transition-all duration-500 ${isScrolled ? 'h-14' : 'h-20'} w-auto`} referrerPolicy="no-referrer" />
            <span className={`font-serif transition-all duration-500 ${isScrolled ? 'text-xl' : 'text-2xl'} font-medium tracking-tight`}>Dakshin Swaad</span>
          </div>
          <div className="hidden md:flex gap-10 text-sm font-medium uppercase tracking-widest text-brand-brown/70">
            <a href="#products" className="hover:text-brand-gold transition-colors relative group">
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all group-hover:w-full" />
            </a>
            <a href="#benefits" className="hover:text-brand-gold transition-colors relative group">
              Benefits
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all group-hover:w-full" />
            </a>
            <a href="#compare" className="hover:text-brand-gold transition-colors relative group">
              The Difference
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all group-hover:w-full" />
            </a>
          </div>
          <div className="md:hidden w-10" />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden bg-paper">
        {/* Animated Mesh Gradient Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-brand-gold/5 rounded-full blur-[150px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-brand-olive/5 rounded-full blur-[150px]" 
          />
        </div>

        {/* Floating Decorative Elements */}
        <motion.div 
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] -left-10 md:left-[5%] text-brand-gold/10 pointer-events-none parallax-bg"
        >
          <Leaf size={180} strokeWidth={0.5} className="w-32 h-32 md:w-44 md:h-44" />
        </motion.div>
        
        <motion.div 
          animate={{ 
            y: [0, 40, 0],
            rotate: [0, -20, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[5%] -right-10 md:right-[5%] text-brand-gold/10 pointer-events-none parallax-bg"
        >
          <Droplets size={150} strokeWidth={0.5} className="w-28 h-28 md:w-36 md:h-36" />
        </motion.div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="text-left relative z-20">
              <Reveal delay={0.2}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-[1px] bg-brand-gold" />
                  <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px]">
                    Premium Cold Pressed Oils
                  </span>
                </div>
              </Reveal>
              
              <Reveal delay={0.4} width="100%" overflow="visible">
                <h1 className="font-serif text-[12vw] md:text-8xl xl:text-[9vw] font-light leading-[0.9] mb-12 tracking-tighter">
                  <span className="whitespace-nowrap">Pure Trad<span className="relative inline-block">
                    i
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      transition={{ delay: 1.5, duration: 0.5 }} 
                      className="absolute -top-[0.05em] left-1/2 -translate-x-1/2 text-brand-gold w-[0.4em] h-[0.4em] bg-paper rounded-full flex items-center justify-center z-20"
                    >
                      <Droplet className="w-full h-full" fill="currentColor" />
                    </motion.div>
                  </span>tion</span> <br className="hidden md:block" />
                  <span className="italic font-light text-brand-gold/40 block md:inline">in Every Drop</span>
                </h1>
              </Reveal>
              
              <Reveal delay={0.6}>
                <p className="text-xl text-brand-brown/60 max-w-xl mb-16 leading-relaxed font-light">
                  Reviving the ancient wisdom of South Indian oil extraction. 100% organic, nutrient-rich, and crafted with patience for your well-being.
                </p>
              </Reveal>
              
              <Reveal delay={0.8}>
                <div className="flex flex-wrap items-center gap-10">
                  <a href="#products" className="group relative px-12 py-5 bg-brand-brown text-cream rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-brand-brown/30">
                    <span className="relative z-10 flex items-center gap-3 text-sm font-bold uppercase tracking-widest">
                      Shop Collection <ArrowRight size={18} />
                    </span>
                    <motion.div 
                      className="absolute inset-0 bg-brand-gold"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ type: "tween", ease: "circOut", duration: 0.5 }}
                    />
                  </a>
                  
                  <a href="#compare" className="flex items-center gap-4 group">
                    <div className="w-14 h-14 rounded-full border border-brand-brown/10 flex items-center justify-center group-hover:border-brand-gold transition-colors duration-500">
                      <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <ArrowRight size={20} className="text-brand-brown group-hover:text-brand-gold transition-colors" />
                      </motion.div>
                    </div>
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-brown/40 group-hover:text-brand-gold transition-colors">The Difference</span>
                  </a>
                </div>
              </Reveal>
            </div>

            <div className="relative mt-32 lg:mt-0 lg:pt-32">
              <Reveal delay={0.5} overflow="visible">
                <div className="relative aspect-[4/5] max-w-md lg:ml-auto lg:mr-0 mx-auto">
                  {/* Decorative Background Circles */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="w-[120%] h-[120%] border border-brand-gold/10 rounded-full border-dashed"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                      className="w-[90%] h-[90%] border border-brand-gold/5 rounded-full"
                    />
                  </div>

                  {/* Main Product Image */}
                  <motion.div 
                    className="relative z-10 w-full h-full"
                    animate={{ 
                      y: [0, -30, 0],
                      rotate: [0, 2, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={PRODUCTS[heroIndex].id}
                        src={PRODUCTS[heroIndex].localImage} 
                        alt={PRODUCTS[heroIndex].name} 
                        className="w-full h-full object-contain drop-shadow-[0_50px_50px_rgba(0,0,0,0.15)]"
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -50 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        referrerPolicy="no-referrer"
                      />
                    </AnimatePresence>
                  </motion.div>

                  {/* Floating Badge */}
                  <motion.div 
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-8 top-1/4 z-20 bg-white p-6 rounded-3xl shadow-2xl flex flex-col items-center gap-2"
                  >
                    <span className="text-brand-gold font-black text-2xl">100%</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/40">Organic</span>
                  </motion.div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Scroll Indicator Removed */}
      </section>

      {/* Product Showcase */}
      <section id="products" className="py-40 bg-white relative overflow-hidden">
        {/* Parallax Background Text */}
        <div className="absolute top-20 left-0 w-full h-full pointer-events-none opacity-[0.03] flex items-start justify-center overflow-hidden">
          <ParallaxSection overflow="visible">
            <h2 className="text-[40vw] font-serif whitespace-nowrap select-none leading-none">DAKSHIN</h2>
          </ParallaxSection>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32">
            <div className="gsap-reveal">
              <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Our Essentials</span>
              <h2 className="font-serif text-7xl md:text-9xl font-light tracking-tighter leading-none">The <br /><span className="italic text-brand-gold/40">Collection</span></h2>
            </div>
            <div className="gsap-reveal max-w-md">
              <p className="text-brand-brown/50 text-lg font-light leading-relaxed mb-8">
                Explore our range of traditionally extracted oils, each bottle carrying the legacy of South Indian heritage and purity.
              </p>
              <div className="w-20 h-1 bg-brand-gold/20" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
            {PRODUCTS.map((product, idx) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                idx={idx} 
                onViewDetails={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - GSAP Horizontal Scroll */}
      <section ref={horizontalTriggerRef} className="bg-brand-brown text-cream overflow-hidden relative">
        {/* Progress Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[40vw] h-[2px] bg-cream/10 z-20 hidden md:block">
          <div 
            ref={progressRef}
            className="h-full bg-brand-gold origin-left scale-x-0"
          />
        </div>

        <div ref={horizontalSectionRef} className="flex h-screen items-center pl-[5vw] pr-[5vw] w-max">
          {/* Intro Card */}
          <div className="flex-shrink-0 w-[90vw] md:w-[50vw] min-h-[70vh] md:h-[80vh] border-r border-cream/10 flex flex-col justify-between p-8 md:p-20">
            <div>
              <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-xs mb-8 block">The Journey</span>
              <h2 className="font-serif text-7xl md:text-[10vw] font-light leading-[0.85] mb-12 tracking-tighter">
                From Soil <br />
                <span className="italic text-brand-gold/40">to Soul</span>
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-xl text-cream/50 leading-relaxed mb-8">
                We believe that true quality cannot be rushed. Our process is a testament to the art of patience and tradition.
              </p>
            </div>
          </div>

          {[
            { 
              step: "01", 
              title: "Ethical Sourcing", 
              desc: "We partner directly with local farmers who practice sustainable, organic farming. Each seed is hand-picked for its maturity and oil content.",
              image: "/step1.png",
              tag: "Origin"
            },
            { 
              step: "02", 
              title: "Sun Drying", 
              desc: "Seeds are naturally dried under the intense South Indian sun. This traditional step is crucial for reducing moisture without using industrial dryers.",
              image: "/step2.png",
              tag: "Nature"
            },
            { 
              step: "03", 
              title: "Cold Pressed Method", 
              desc: "Carefully extracted using cold pressed method to ensure the temperature never exceeds 35°C, preserving all enzymes and nutrients.",
              image: "/step3.png",
              tag: "Craft"
            },
            { 
              step: "04", 
              title: "Natural Settling", 
              desc: "Instead of chemical refining or pressure filtration, we let the oil settle naturally in stainless steel tanks for 48 hours to remove impurities.",
              image: "/step4.png",
              tag: "Purity"
            }
          ].map((item, idx) => (
            <div key={item.step} className="flex-shrink-0 w-[90vw] md:w-[75vw] min-h-[70vh] md:h-[80vh] border-r border-cream/10 flex flex-col md:flex-row relative">
              {/* Image Section */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden group">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="process-step-image w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-brown/40 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-8 left-8 bg-brand-gold text-brand-brown px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
                  {item.tag}
                </div>
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 min-h-[50%] md:h-full p-8 md:p-20 flex flex-col justify-between bg-brand-brown relative overflow-y-auto">
                <div className="font-serif text-[12vw] leading-none opacity-10 absolute top-0 right-12 select-none">
                  {item.step}
                </div>
                <div>
                  <span className="text-brand-gold/60 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Step {item.step}</span>
                  <h3 className="font-serif text-4xl md:text-7xl mb-6 md:mb-8 tracking-tight leading-tight">{item.title}</h3>
                </div>
                <div className="max-w-sm">
                  <p className="text-base md:text-xl text-cream/60 leading-relaxed mb-6 md:mb-10">{item.desc}</p>
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-[1px] bg-brand-gold/30" />
                    <span className="text-[10px] uppercase tracking-widest text-brand-gold/40">Traditional Method</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Outro Card */}
          <div className="flex-shrink-0 w-[90vw] md:w-[60vw] min-h-[70vh] md:h-[80vh] flex flex-col items-center justify-center p-8 md:p-20 text-center">
            <h3 className="font-serif text-6xl md:text-[8vw] italic text-brand-gold/20 mb-12 leading-none">
              Pure. Honest. <br />Traditional.
            </h3>
            <motion.a 
              href="#products" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-6 text-brand-gold text-xl font-medium group border border-brand-gold/20 px-10 py-5 rounded-full hover:bg-brand-gold hover:text-brand-brown transition-all duration-500"
            >
              Back to Products <MoveRight className="transition-transform group-hover:translate-x-4" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section ref={compareRef} id="compare" className="py-40 bg-paper relative z-10">
        {/* Background Decorative Text */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.02] flex items-center justify-center overflow-hidden">
          <h2 className="text-[60vw] font-serif font-black select-none leading-none rotate-12">VS</h2>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-24 lg:gap-40 items-center">
              <Reveal overflow="visible">
                <motion.div 
                  style={{ opacity: compareOpacity, scale: compareScale, y: compareY }}
                  className="relative z-10"
                >
                  <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-xs mb-8 block">The Science</span>
                  <h2 className="font-serif text-7xl md:text-[8vw] font-light tracking-tighter mb-16 leading-[0.9]">
                    Why Cold <br />
                    <span className="italic text-brand-gold/40">Pressed?</span>
                  </h2>
                  
                  <div className="space-y-4">
                    {COMPARISON.map((item, idx) => (
                      <motion.div 
                        key={`${item.feature}-${idx}`}
                        whileHover={{ x: 10 }}
                        className="group relative bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-brand-brown/5 hover:border-brand-gold/20 transition-all duration-500"
                      >
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold/40 group-hover:text-brand-gold transition-colors">{item.feature}</span>
                            <div className="w-8 h-[1px] bg-brand-gold/20" />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-8 items-center">
                            <div className="flex items-start gap-4">
                              <div className="mt-1 w-5 h-5 rounded-full bg-brand-olive text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-olive/20">
                                <Check size={12} strokeWidth={3} />
                              </div>
                              <div>
                                <span className="block text-xs uppercase tracking-widest font-bold text-brand-olive/60 mb-1">Cold Pressed</span>
                                <span className="text-lg font-medium text-brand-brown leading-tight">{item.cold}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-4 opacity-40 group-hover:opacity-60 transition-opacity">
                              <div className="mt-1 w-5 h-5 rounded-full bg-brand-brown/20 text-brand-brown flex items-center justify-center flex-shrink-0">
                                <X size={12} strokeWidth={3} />
                              </div>
                              <div>
                                <span className="block text-xs uppercase tracking-widest font-bold text-brand-brown/40 mb-1">Refined Oil</span>
                                <span className="text-base font-light text-brand-brown italic leading-tight">{item.refined}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
              
              <div className="relative z-20">
                <Reveal delay={0.2} overflow="visible">
                  <div className="min-h-[500px] md:aspect-square bg-brand-brown rounded-[80px] p-8 md:p-24 shadow-2xl flex items-center justify-center relative group overflow-hidden">
                    {/* Animated Background Rings */}
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-8 border border-dashed border-brand-gold/10 rounded-full" 
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-16 border border-brand-gold/5 rounded-full" 
                    />
                    
                    <div className="text-center relative z-10 p-6">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Sparkles className="text-brand-gold w-12 h-12 mx-auto mb-8 opacity-50" />
                      </motion.div>
                      <p className="font-serif text-2xl sm:text-3xl md:text-5xl italic mb-8 md:mb-12 text-cream leading-tight">"Purity in <br />Every Drop"</p>
                      
                      <div className="grid grid-cols-2 gap-12 border-t border-cream/10 pt-12">
                        <div className="text-center">
                          <div className="text-5xl md:text-7xl font-serif text-brand-gold mb-2">100%</div>
                          <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-cream/40">Organic</div>
                        </div>
                        <div className="text-center">
                          <div className="text-5xl md:text-7xl font-serif text-brand-gold mb-2">0</div>
                          <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-cream/40">Chemicals</div>
                        </div>
                      </div>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-12 left-12 w-4 h-4 border-t-2 border-l-2 border-brand-gold/30" />
                    <div className="absolute bottom-12 right-12 w-4 h-4 border-b-2 border-r-2 border-brand-gold/30" />
                  </div>
                </Reveal>

                {/* Floating Elements */}
                <ParallaxSection overflow="visible" className="absolute -top-12 -right-12 z-30">
                  <motion.div 
                    animate={{ y: [0, 20, 0], rotate: [0, 15, 0] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-brand-gold"
                  >
                    <Droplets size={48} strokeWidth={1.5} />
                  </motion.div>
                </ParallaxSection>
                
                <ParallaxSection overflow="visible" className="absolute -bottom-8 -left-8 z-30">
                  <motion.div 
                    animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="w-24 h-24 bg-brand-gold rounded-full shadow-2xl flex items-center justify-center text-brand-brown"
                  >
                    <Leaf size={32} strokeWidth={1.5} />
                  </motion.div>
                </ParallaxSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section id="benefits" className="py-40 bg-white relative overflow-hidden">
        {/* Editorial Background Text */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] flex items-center justify-center overflow-hidden">
          <h2 className="text-[40vw] font-serif font-black select-none leading-none -rotate-90">HEALTH</h2>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-end mb-32">
            <div className="gsap-reveal">
              <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-xs mb-8 block">Vitality</span>
              <h2 className="font-serif text-7xl md:text-[10vw] font-light tracking-tighter leading-[0.85]">
                Health is <br />
                <span className="italic text-brand-gold/40">Wealth</span>
              </h2>
            </div>
            <div className="gsap-reveal">
              <p className="max-w-xl text-brand-brown/60 text-xl leading-relaxed font-light mb-8">
                Our oils are more than just cooking ingredients; they are a foundation for a healthier lifestyle, packed with natural antioxidants and essential fatty acids.
              </p>
              <div className="w-24 h-1 bg-brand-gold/20" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((benefit, idx) => (
              <Reveal key={`${benefit.id}-${idx}`} delay={idx * 0.1} overflow="visible">
                <motion.div 
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedBenefit(benefit)}
                  className="relative p-12 rounded-[40px] bg-paper h-full transition-all duration-500 hover:shadow-2xl hover:shadow-brand-brown/5 group overflow-hidden cursor-pointer"
                >
                  {/* Decorative Background Number */}
                  <span className="absolute -top-4 -right-4 text-9xl font-serif font-black opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                    0{idx + 1}
                  </span>

                  <div className={`w-16 h-16 ${benefit.color} rounded-2xl flex items-center justify-center mb-10 text-brand-brown transition-transform duration-500 group-hover:scale-110 group-hover:bg-brand-gold group-hover:text-white`}>
                    {benefit.icon}
                  </div>
                  <h3 className="font-serif text-3xl mb-6 tracking-tight group-hover:text-brand-gold transition-colors">{benefit.title}</h3>
                  <p className="text-base text-brand-brown/60 leading-relaxed font-light mb-8">{benefit.desc}</p>
                  
                  <div className="flex items-center gap-3 text-brand-gold text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    Learn More <ArrowRight size={12} />
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-brown text-cream py-40 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute bottom-0 right-0 opacity-[0.05] pointer-events-none">
          <Leaf size={400} />
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-32 relative z-10">
          <Reveal>
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center p-3">
                  <img src="/logo.png" alt="Logo" className="h-full w-auto" referrerPolicy="no-referrer" />
                </div>
                <span className="font-serif text-4xl font-medium tracking-tight">Dakshin Swaad</span>
              </div>
              <p className="max-w-md text-cream/50 text-lg leading-relaxed mb-12 font-light">
                Dakshin Swaad is committed to reviving the traditional methods of oil extraction. We believe in purity, health, and the authentic taste of South India.
              </p>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
            <Reveal delay={0.1}>
              <div>
                <h4 className="font-bold uppercase text-[11px] tracking-[0.3em] mb-10 opacity-30">Contact</h4>
                <ul className="space-y-8 text-base">
                  <li className="font-serif text-2xl text-brand-gold">Pillai Agri Products</li>
                  <li className="opacity-60 font-light">pillaikoushik92@gmail.com</li>
                  <li className="opacity-60 font-light">+91 9512336063</li>
                  <li className="opacity-60 leading-relaxed font-light">Amli, Silvassa, Daman and Nagar Haveli and Daman and Diu, India</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div>
                <h4 className="font-bold uppercase text-[11px] tracking-[0.3em] mb-10 opacity-30">Navigation</h4>
                <ul className="space-y-6 text-sm font-medium uppercase tracking-[0.2em]">
                  <li><a href="#products" className="hover:text-brand-gold transition-colors">Products</a></li>
                  <li><a href="#benefits" className="hover:text-brand-gold transition-colors">Benefits</a></li>
                  <li><a href="#compare" className="hover:text-brand-gold transition-colors">The Difference</a></li>
                  <li><button onClick={() => setActiveModal("privacy")} className="hover:text-brand-gold transition-colors">Privacy</button></li>
                  <li><button onClick={() => setActiveModal("terms")} className="hover:text-brand-gold transition-colors">Terms</button></li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
        
        <Reveal delay={0.3}>
          <div className="container mx-auto px-6 mt-40 pt-12 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-bold uppercase tracking-[0.3em] opacity-30">
            <p>© 2026 Dakshin Swaad (Pillai Agri Products). All rights reserved.</p>
            <p>Crafted with Tradition</p>
          </div>
        </Reveal>
      </footer>
    </div>
  );
}
