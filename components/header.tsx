"use client";
import { FC, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface NavItem {
  name: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Available Games", href: "#teams" },
  { name: "Create Game", href: "#teams/new" },
  { name: "My Teams", href: "#my-teams" },
];

export const Header: FC = () => {
  const [activeSection, setActiveSection] = useState("teams");

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => item.href.replace("#", ""));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const sectionId = href.replace("#", "");
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/13teams_logo1.png"
            alt="13 Teams Logo"
            width={50}
            height={50}
            className="rounded-md"
            priority
          />
          <h1 className="text-2xl font-bold text-gray-800">13 Teams</h1>
        </div>

        <nav className="flex-1 flex justify-center">
          <ul className="flex gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => scrollToSection(item.href)}
                  className={`text-lg font-semibold transition-colors relative ${
                    activeSection === item.href.replace("#", "")
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {item.name}
                  {activeSection === item.href.replace("#", "") && (
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-blue-600">A</span>
          </div>
          <span className="text-sm font-medium text-gray-700">
            Ahmed Hassan
          </span>
        </div>
      </div>
    </header>
  );
};
