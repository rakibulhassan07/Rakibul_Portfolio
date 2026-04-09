"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CinematicTextProps {
  children?: React.ReactNode;
  text?: string;
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  triggerStart?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div" | "span";
}

export default function CinematicText({
  children,
  text,
  className = "",
  stagger = 0.05,
  duration = 1,
  delay = 0,
  triggerStart = "top 80%",
  as: Component = "div",
}: CinematicTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  // Get text content from children or text prop
  const textContent = text || (typeof children === "string" ? children : "");

  useEffect(() => {
    if (!containerRef.current || charsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        charsRef.current,
        {
          y: 100,
          opacity: 0,
          filter: "blur(10px)",
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: duration,
          stagger: stagger,
          ease: "power4.out",
          delay: delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: triggerStart,
            toggleActions: "play none none reset",
            once: false,
          },
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [textContent, stagger, duration, delay, triggerStart]);

  // Split text into characters
  const splitText = (str: string) => {
    return str.split("").map((char, index) => {
      // Preserve spaces
      if (char === " ") {
        return (
          <span key={index} className="char inline-block" style={{ width: "0.3em" }}>
            &nbsp;
          </span>
        );
      }
      return (
        <span
          key={index}
          ref={(el) => {
            if (el) charsRef.current[index] = el;
          }}
          className="char inline-block"
          style={{ display: "inline-block" }}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div ref={containerRef} className="overflow-hidden">
      <Component className={className}>
        {textContent ? splitText(textContent) : children}
      </Component>
    </div>
  );
}
