"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AdvancedCinematicTextProps {
  children: string;
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  triggerStart?: string;
  splitBy?: "char" | "word" | "line";
  animationType?: "fade-up" | "fade-scale" | "blur-up" | "slide-rotate";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div" | "span";
}

export default function AdvancedCinematicText({
  children,
  className = "",
  stagger = 0.05,
  duration = 1,
  delay = 0,
  triggerStart = "top 80%",
  splitBy = "char",
  animationType = "blur-up",
  as: Component = "div",
}: AdvancedCinematicTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!containerRef.current || elementsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      let fromVars: gsap.TweenVars = {};
      let toVars: gsap.TweenVars = {
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
      };

      // Different animation types
      switch (animationType) {
        case "blur-up":
          fromVars = {
            y: 100,
            opacity: 0,
            filter: "blur(10px)",
            scale: 0.9,
          };
          toVars = {
            ...toVars,
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
          };
          break;

        case "fade-up":
          fromVars = {
            y: 50,
            opacity: 0,
          };
          toVars = {
            ...toVars,
            y: 0,
            opacity: 1,
          };
          break;

        case "fade-scale":
          fromVars = {
            opacity: 0,
            scale: 0.5,
          };
          toVars = {
            ...toVars,
            opacity: 1,
            scale: 1,
          };
          break;

        case "slide-rotate":
          fromVars = {
            x: -50,
            opacity: 0,
            rotation: -15,
          };
          toVars = {
            ...toVars,
            x: 0,
            opacity: 1,
            rotation: 0,
          };
          break;
      }

      gsap.fromTo(elementsRef.current, fromVars, toVars);
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [children, stagger, duration, delay, triggerStart, animationType]);

  // Split text based on type
  const splitText = (text: string) => {
    if (splitBy === "word") {
      return text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="word-wrapper inline-block mr-2">
          <span
            ref={(el) => {
              if (el) elementsRef.current[wordIndex] = el;
            }}
            className="word inline-block"
          >
            {word}
          </span>
        </span>
      ));
    }

    // Character split (default)
    return text.split("").map((char, index) => {
      if (char === " ") {
        return (
          <span
            key={index}
            className="char inline-block"
            style={{ width: "0.3em" }}
          >
            &nbsp;
          </span>
        );
      }
      return (
        <span
          key={index}
          ref={(el) => {
            if (el) elementsRef.current[index] = el;
          }}
          className="char inline-block"
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div ref={containerRef} className="overflow-hidden">
      <Component className={className}>{splitText(children)}</Component>
    </div>
  );
}
