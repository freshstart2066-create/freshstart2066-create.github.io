import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Phone } from 'lucide-react';

interface LogoItem {
  name: string;
  src: string;
  gradientClass: string;
}

const logos: LogoItem[] = [
  {
    name: 'Procure',
    src: 'https://svgl.app/library/procure.svg',
    gradientClass: 'bg-gradient-to-tr from-[#0052FF] to-[#00D4FF]',
  },
  {
    name: 'Shopify',
    src: 'https://svgl.app/library/shopify.svg',
    gradientClass: 'bg-gradient-to-tr from-[#95BF47] to-[#E3E83B]',
  },
  {
    name: 'Blender',
    src: 'https://svgl.app/library/blender.svg',
    gradientClass: 'bg-gradient-to-tr from-[#2272B4] to-[#45B0E5]',
  },
  {
    name: 'Figma',
    src: 'https://svgl.app/library/figma.svg',
    gradientClass: 'bg-gradient-to-tr from-[#A259FF] to-[#F24E1E]',
  },
  {
    name: 'Spotify',
    src: 'https://svgl.app/library/spotify.svg',
    gradientClass: 'bg-gradient-to-tr from-[#FF0055] to-[#FF4580]',
  },
  {
    name: 'Lottielab',
    src: 'https://svgl.app/library/lottielab.svg',
    gradientClass: 'bg-gradient-to-tr from-[#14B8A6] to-[#FBBF24]',
  },
  {
    name: 'Google Cloud',
    src: 'https://svgl.app/library/google-cloud.svg',
    gradientClass: 'bg-gradient-to-tr from-[#4285F4] to-[#34A853]',
  },
  {
    name: 'Bing',
    src: 'https://svgl.app/library/bing.svg',
    gradientClass: 'bg-gradient-to-tr from-[#008373] to-[#00A4EF]',
  },
];

interface SocialButton3D {
  name: string;
  icon: React.ReactNode;
  url: string;
  colorBg: string;
  shadowColor: string;
  label: string;
}

// Crisp Vector Icons for 3D Buttons
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.68 12.04 3.68C14.24 3.68 16.31 4.54 17.87 6.1C19.42 7.66 20.28 9.72 20.27 11.92C20.28 16.46 16.58 20.15 12.04 20.15Z" />
  </svg>
);

const GmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const socialButtons: SocialButton3D[] = [
  {
    name: 'WhatsApp',
    label: '+234 904 851 8418',
    url: 'https://wa.me/2349048518418?text=Hello%20Miracle%20Akujobi%2C%20I%20am%20reaching%20out%20from%20the%20digital%20epoch%20platform.',
    colorBg: 'bg-gradient-to-b from-[#2ae870] to-[#1ca756]',
    shadowColor: 'shadow-[0_12px_28px_rgba(37,211,102,0.38)]',
    icon: <WhatsAppIcon />,
  },
  {
    name: 'Email',
    label: 'maveelite@gmail.com',
    url: 'mailto:maveelite@gmail.com',
    colorBg: 'bg-gradient-to-b from-[#ea4335] to-[#c5221f]',
    shadowColor: 'shadow-[0_12px_28px_rgba(234,67,53,0.35)]',
    icon: <GmailIcon />,
  },
  {
    name: 'Instagram',
    label: '@dmf_energy',
    url: 'https://www.instagram.com/dmf_energy?psln=MWlxYTdwdjkybzBoZg%3D%3D&utm_source=qr',
    colorBg: 'bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888]',
    shadowColor: 'shadow-[0_12px_28px_rgba(220,39,67,0.38)]',
    icon: <InstagramIcon />,
  },
  {
    name: 'Facebook',
    label: 'DMF Energy',
    url: 'https://www.facebook.com/share/1F4jLKihN8/?mibextid=wwXIfr',
    colorBg: 'bg-gradient-to-b from-[#1877f2] to-[#0d5ec4]',
    shadowColor: 'shadow-[0_12px_28px_rgba(24,119,242,0.38)]',
    icon: <FacebookIcon />,
  },
  {
    name: 'LinkedIn',
    label: 'Miracle Akujobi',
    url: 'https://www.linkedin.com',
    colorBg: 'bg-gradient-to-b from-[#0077b5] to-[#005582]',
    shadowColor: 'shadow-[0_12px_28px_rgba(0,119,181,0.35)]',
    icon: <LinkedInIcon />,
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#0a1b33] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Container Header */}
      <header className="max-w-[1400px] w-full mx-auto mb-6 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img
            src="/assets/founder_avatar.png"
            alt="Miracle Akujobi"
            className="w-9 h-9 rounded-full object-cover border-2 border-amber-500 shadow-md"
          />
          <div>
            <span className="font-bold text-sm tracking-tight text-[#0a1b33] block leading-tight">Miracle Akujobi</span>
            <span className="text-[11px] text-[#00c2ff] font-bold tracking-wide">FOUNDER · D-MRICK FUSION ENERGY (DMFE)</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="tel:09048518418"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0a1b33] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            0904 851 8418
          </a>
          <a
            href="https://wa.me/2349048518418"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white px-3.5 py-1.5 rounded-full shadow-sm transition-all"
          >
            Direct WhatsApp
          </a>
        </div>
      </header>

      {/* 2. Main Hero Container & Video Background */}
      <section className="relative w-full max-w-[1400px] mx-auto rounded-[48px] bg-white border border-slate-200/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] overflow-hidden h-[600px] flex flex-col">
        {/* Underlying video background layer */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105 transition-transform duration-1000"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260505_101331_74f9b798-3f00-4e86-8a01-377aa16ffeaa.mp4"
          />
        </div>

        {/* 3. Hero Text Content */}
        <div className="relative z-20 flex-1 px-8 md:px-16 pt-12 md:pt-16 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl flex flex-col items-start"
          >
            <h1
              className="font-display text-[42px] md:text-[56px] font-medium leading-[1.08] tracking-tight text-[#0a1b33] mb-4"
              dangerouslySetInnerHTML={{
                __html: 'Foundation of the<br />new digital epoch',
              }}
            />
            <p className="font-sans text-[14px] md:text-[15px] leading-relaxed text-[#64748b] max-w-xl mb-8">
              Designing products, powering ecosystems and laying the foundation of a decentralized web for enterprises, builders and communities alike.
            </p>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#0a152d] text-white text-[14px] font-semibold px-7 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => {
                window.open('https://wa.me/2349048518418?text=Hello%20Miracle%20Akujobi%2C%20I%20want%20to%20contact%20DMFE.', '_blank');
              }}
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>

        {/* 4. Floating Bottom Navbar */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center bg-white/90 backdrop-blur-2xl px-1.5 py-1.5 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-slate-200/40 gap-1.5"
          >
            {/* Logo placeholder */}
            <div className="w-9 h-9 bg-white border border-slate-100 shadow-sm rounded-full flex items-center justify-center text-[#0a1b33] text-sm font-bold shrink-0 select-none">
              ✦
            </div>

            {/* Standard text buttons */}
            <button className="text-[12px] font-semibold text-slate-500 hover:text-[#0a1b33] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer">
              Products
            </button>
            <button className="text-[12px] font-semibold text-slate-500 hover:text-[#0a1b33] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer">
              Docs
            </button>

            {/* Get in touch button */}
            <a
              href="https://wa.me/2349048518418?text=Hello%20Miracle%20Akujobi%2C%20I%20would%20like%20to%20get%20in%20touch."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white px-5 py-2 rounded-full text-[12px] font-semibold text-[#0a1b33] border border-slate-200/60 shadow-sm hover:border-slate-300 transition-all flex items-center shrink-0 cursor-pointer"
            >
              <span>Get in touch</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1 text-slate-600" />
            </a>
          </motion.nav>
        </div>
      </section>

      {/* 5. Seamless Marquee Logo Scroller Component */}
      <section className="mt-10 max-w-[1400px] w-full mx-auto overflow-hidden relative">
        <div
          className="w-full relative overflow-hidden py-4"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          }}
        >
          <div className="flex gap-6 animate-marquee w-max">
            {/* Render list twice for seamless loop */}
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="group relative h-24 w-40 shrink-0 flex items-center justify-center rounded-full bg-white border border-slate-200/60 shadow-sm hover:border-slate-300 transition-all overflow-hidden cursor-pointer"
              >
                {/* Gradient hover background */}
                <div
                  className={`absolute inset-0 ${logo.gradientClass} scale-150 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300`}
                />
                
                {/* Logo Image */}
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="relative z-10 w-8 h-8 object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 3D Icon Social Buttons Section (WhatsApp, Email, Instagram, Facebook, LinkedIn) */}
      <section className="mt-12 mb-6 max-w-[1400px] w-full mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/70 rounded-[36px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3 border border-slate-200/80">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>CONNECT WITH DMFE · FOUNDER MIRACLE AKUJOBI</span>
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-semibold text-[#0a1b33] mb-2 tracking-tight">
            Instant 3D Multi-Channel Gateway
          </h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto mb-8">
            Reach Founder Miracle Akujobi and the engineering team directly across our verified 3D communication channels.
          </p>

          {/* 3D Social Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {socialButtons.map((btn) => (
              <motion.a
                key={btn.name}
                href={btn.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ y: -1, scale: 0.98 }}
                className={`social-btn-3d relative flex flex-col items-center justify-center p-5 rounded-3xl ${btn.colorBg} ${btn.shadowColor} text-white text-decoration-none group overflow-hidden border border-white/20 cursor-pointer`}
              >
                {/* 3D Glossy Light Reflection highlight */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/10 pointer-events-none rounded-3xl" />
                
                {/* 3D Icon Container */}
                <div className="relative z-10 w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center mb-3 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_8px_16px_rgba(0,0,0,0.15)] group-hover:rotate-6 transition-transform duration-300">
                  {btn.icon}
                </div>

                {/* Name & Handle */}
                <span className="relative z-10 font-display font-bold text-[15px] tracking-tight text-white mb-0.5">
                  {btn.name}
                </span>
                <span className="relative z-10 text-[11px] font-medium text-white/85 truncate max-w-[140px]">
                  {btn.label}
                </span>

                {/* Bottom 3D Bevel depth edge */}
                <div className="absolute bottom-0 inset-x-0 h-1.5 bg-black/25 rounded-b-3xl" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer copyright */}
      <footer className="max-w-[1400px] w-full mx-auto text-center py-4 text-xs text-slate-400 font-sans">
        © 2026 D-MRICK FUSION ENERGY (DMFE) · Founded by Miracle Akujobi. All rights reserved.
      </footer>
    </div>
  );
}
