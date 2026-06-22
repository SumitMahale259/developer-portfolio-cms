"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();

  const [showHeader, setShowHeader] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const activeIndex = navLinks.findIndex(
      (link) => link.href === pathname
    );

    const activeLink = linkRefs.current[activeIndex];

    if (activeLink) {
      setIndicator({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
      });
    }
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 20);

      if (currentScrollY < 100) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShowHeader(false);
      } else {
        // Scrolling up
        setShowHeader(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full border-b border-gray-200 dark:border-gray-200/20 transition-transform duration-300 ease-in-out ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-white/70 backdrop-blur-lg dark:bg-slate-950/70"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight"
        >
          Sumit<span className="text-blue-600">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="relative hidden items-center gap-8 md:flex">
          {navLinks.map((link, index) => {
            const active = pathname === link.href;

            return (
              // <Link
              //   key={link.href}
              //   href={link.href}
              //   className={`relative text-sm font-medium transition-colors
              //     ${
              //       active
              //         ? "text-blue-600"
              //         : "text-gray-700 hover:text-blue-600 dark:text-gray-300"
              //     }
              //   `}
              // >
              //   {link.label}

              //   <span
              //     className={`absolute -bottom-1 left-0 h-[2px] bg-blue-600 transition-all duration-300 ${
              //       active ? "w-full" : "w-0"
              //     }`}
              //   />
              // </Link>
              <Link
                key={link.href}
                href={link.href}
                ref={(el) => {
                  linkRefs.current[index] = el;
                }}
                className={`relative text-sm font-medium transition-colors ${
                  active
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600 dark:text-gray-300"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <span
            className="absolute -bottom-1 h-[2px] bg-blue-600 transition-all duration-300 ease-in-out"
            style={{
              left: indicator.left,
              width: indicator.width,
            }}
          />
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Theme Toggle */}
          <ThemeToggle/>

          {/* Resume Button */}
          {/* <a
            href="/resume.pdf"
            target="_blank"
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:scale-105 hover:bg-blue-700"
          >
            Resume
          </a> */}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden py-3 w-8"
        >
          {isOpen ? <XMarkIcon/> : <Bars3Icon/>}
        </button>
      </div>

      <div ref={menuRef}>
        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            // isOpen ? "max-h-[500px]" : "max-h-0"
            isOpen ? "max-h-[calc(100vh-4rem)]" : "max-h-0"
          }`}
        >
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-gray-200 bg-white px-6 py-5 dark:bg-slate-950">
            <nav className="flex flex-col gap-5">
              {navLinks.map((link) => {
                const active = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-medium ${
                      active
                        ? "text-blue-600"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 flex items-center gap-4">
              <ThemeToggle/>

              {/* <a
                href="/resume.pdf"
                target="_blank"
                className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white"
              >
                Resume
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}



// import Link from "next/link";
// // import Button from "../ui/Button";
// import ThemeToggle from "./ThemeToggle";

// export default function Navbar() {
//     return(
//         <header className="border-b">
//             <nav className="flex h-16 items-center justify-between">
//                 <Link href="/">
//                     <span className="font-bold">Sumit.dev</span>
//                 </Link>
//                 <div className="flex gap-6 items-center">
//                     <Link href="/">Home</Link>
//                     <Link href="/projects">Projects</Link>
//                     <Link href="/blogs">Blog</Link>
//                     <Link href="/about">About</Link>
//                     <Link href="/contact">Contact</Link>
//                     <ThemeToggle/>
//                     {/* <Link href="/contact"><Button>Hire Me</Button></Link> */}
//                 </div>
//             </nav>
//         </header>
//     )
// }