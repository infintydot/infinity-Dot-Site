"use client"; // Make sure to include this if you are using useState in Next.js App Router!

import Link from "next/link";
import Image from "next/image"; // <-- Added missing Image import
import { SiGithub, SiLinkerd, SiX } from "@icons-pack/react-simple-icons";
import { useState } from "react";

const columns = [
  {
    title: "Company",
    links: [
      { label: "Services", href: "/#services" },
      { label: "Technologies", href: "/#technologies" },
      { label: "About", href: "/#company" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Work",
    links: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  const [mobileOpen, setMobileOpen] = useState(false);
  
  return (
    <footer className="relative w-full border-t border-white/10 px-6 md:px-12 py-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center group" onClick={() => setMobileOpen(false)}>
              <Image 
                src="/InfinityDot_logo_transparent.png" 
                alt="Logo"
                width={120} 
                height={120}
                className="object-contain"
              />
            </Link>
            <p className="mt-4 text-sm text-white/40 font-light leading-relaxed">
              A software company building web apps, mobile apps, and SaaS
              products for teams who need production-grade engineering.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" aria-label="GitHub" className="text-white/40 hover:text-white transition-colors">
                <SiGithub className="w-5 h-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-white/40 hover:text-white transition-colors">
                <SiLinkerd className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-white/40 hover:text-white transition-colors">
                <SiX className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-white text-sm font-semibold uppercase tracking-wide">
                  {col.title}
                </h4>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/50 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 text-xs text-white/30">
          <span>&copy; {new Date().getFullYear()} Infinity dot. All rights reserved.</span>
          <span>Built by the Infinity dot team.</span>
        </div>
      </div>
    </footer>
  );
}