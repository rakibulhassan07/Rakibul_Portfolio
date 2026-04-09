"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ScrollWeightTextProps {
  children: React.ReactNode;
  className?: string;
  minWeight?: number;
  maxWeight?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  delay?: number;
}

export default function ScrollWeightText({
  children,
  className = "",
  minWeight = 300,
  maxWeight = 900,
  as: Component = "div",
  delay = 0,
}: ScrollWeightTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div ref={ref}>
      <Component
        className={className}
        style={{
          fontWeight: isInView ? maxWeight : minWeight,
          opacity: isInView ? 1 : 0.3,
          transition: `all 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
        }}
      >
        {children}
      </Component>
    </motion.div>
  );
}
