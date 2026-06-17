"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface CompassProps {
  className?: string;
}

const C = 120; // centro
const R_RING = 110;
const R_INNER = 100;
const R_TICK = 96;

/** Punto sobre la circunferencia. Ángulo 0 = norte (arriba), horario. */
function polar(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: C + radius * Math.cos(rad), y: C + radius * Math.sin(rad) };
}

const TICKS = Array.from({ length: 24 }, (_, i) => i * 15);
const BEARINGS: { label: string; angle: number; north?: boolean }[] = [
  { label: "N", angle: 0, north: true },
  { label: "E", angle: 90 },
  { label: "S", angle: 180 },
  { label: "O", angle: 270 },
];

/**
 * Brújula tipográfica — el "átomo visual" de Norte (reemplaza el globo).
 *
 * - Anillos que se dibujan con pathLength al montar.
 * - Aguja-norte oro/latón / sur slate: se asienta en el norte con un spring
 *   (gesto de calibración, una sola vez).
 * - Hub de latón que respira: ÚNICO movimiento perpetuo del sitio.
 * - prefers-reduced-motion: todo cae a su estado final, sin bucles.
 *
 * 100% SVG + motion/react. Sin WebGL, sin dependencias.
 */
export function Compass({ className }: CompassProps) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative aspect-square w-full max-w-[460px]", className)}>
      <svg
        viewBox="0 0 240 240"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        role="img"
        aria-label="Brújula de Norte Software apuntando al norte"
      >
        {/* Anillos del instrumento */}
        <motion.circle
          cx={C}
          cy={C}
          r={R_RING}
          fill="none"
          stroke="var(--color-hairline-strong)"
          strokeWidth="1"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
        />
        <motion.circle
          cx={C}
          cy={C}
          r={R_INNER}
          fill="none"
          stroke="var(--color-hairline)"
          strokeWidth="1"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
        />

        {/* Marcas de grado */}
        <motion.g
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {TICKS.map((angle) => {
            const cardinal = angle % 90 === 0;
            const inner = polar(angle, R_TICK);
            const outer = polar(angle, cardinal ? R_TICK - 12 : R_TICK - 6);
            return (
              <line
                key={angle}
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                stroke="#8FA39B"
                strokeOpacity={cardinal ? 0.7 : 0.3}
                strokeWidth="1"
              />
            );
          })}
        </motion.g>

        {/* Rumbos cardinales en mono — N destacada en oro */}
        <motion.g
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-mono"
        >
          {BEARINGS.map(({ label, angle, north }) => {
            const p = polar(angle, R_TICK - 26);
            return (
              <text
                key={label}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={north ? 15 : 12}
                fontWeight={north ? 600 : 500}
                fill={north ? "#C69B3C" : "#8FA39B"}
                fillOpacity={north ? 1 : 0.8}
              >
                {label}
              </text>
            );
          })}
        </motion.g>

        {/* Aguja — se calibra con spring una sola vez */}
        <motion.g
          style={{ transformOrigin: `${C}px ${C}px` }}
          initial={reduce ? false : { rotate: -16, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 55, damping: 13, delay: 0.7 }
          }
        >
          {/* Norte (oro/latón) */}
          <path d={`M${C} ${C - 64} L${C + 9} ${C} L${C - 9} ${C} Z`} fill="#C69B3C" />
          {/* Sur (slate) */}
          <path d={`M${C} ${C + 64} L${C + 9} ${C} L${C - 9} ${C} Z`} fill="#8FA39B" />
        </motion.g>

        {/* Hub de latón que respira — único loop perpetuo */}
        <motion.g
          style={{ transformOrigin: `${C}px ${C}px` }}
          animate={reduce ? undefined : { scale: [1, 1.06, 1], opacity: [0.9, 1, 0.9] }}
          transition={
            reduce
              ? undefined
              : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <circle cx={C} cy={C} r="11" fill="#C69B3C" />
          <circle cx={C} cy={C} r="4.5" fill="#0C2A22" />
        </motion.g>
      </svg>
    </div>
  );
}
