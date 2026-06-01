"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface GlobeProps {
  className?: string;
}

/**
 * Esfera estilizada con grid de meridianos/paralelos sutiles.
 *
 * Decisiones de diseño:
 *
 * - Grid MUY sutil (opacity baja) para sugerir esfera sin formar
 *   la "cruz visual" de elipses prominentes que confundía la lectura.
 *
 * - Sin sweep radar (eliminado el "dorito girando").
 *
 * - Markers en ámbar con halo + pulse expandiéndose.
 *
 * - Rotación lenta del grid completo (1 vuelta cada 90 segundos)
 *   para sugerir vida sin distraer.
 *
 * - Glow ambiental azul detrás de la esfera.
 */

const MARKERS = [
  { x: 145, y: 232, label: "Tuxtla", primary: true },
  { x: 158, y: 220, label: "CDMX" },
  { x: 215, y: 188, label: "NYC" },
  { x: 175, y: 200, label: "SF" },
  { x: 245, y: 175, label: "London" },
  { x: 305, y: 200, label: "Tokyo" },
  { x: 285, y: 240, label: "Singapore" },
];

export function Globe({ className }: GlobeProps) {
  return (
    <div className={cn("relative aspect-square w-full max-w-[500px]", className)}>
      {/* Glow ambiental */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full bg-electric-blue/15 blur-[80px]"
      />
      <div
        aria-hidden
        className="absolute inset-[20%] rounded-full bg-electric-blue/10 blur-[40px]"
      />

      <svg
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        className="relative w-full h-full"
        role="img"
        aria-label="Mapa global con ubicaciones donde operamos"
      >
        <defs>
          <radialGradient id="sphere-bg" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#1A4ABA" stopOpacity="0.18" />
            <stop offset="55%" stopColor="#0F2040" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0A1628" stopOpacity="0.55" />
          </radialGradient>

          <radialGradient id="marker-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C8852A" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#C8852A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Grid rotando MUY sutil */}
        <motion.g
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 90,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "200px 200px" }}
        >
          {/* Esfera base */}
          <circle
            cx="200"
            cy="200"
            r="160"
            fill="url(#sphere-bg)"
            stroke="#2C5282"
            strokeOpacity="0.25"
            strokeWidth="1"
          />

          {/* Meridianos sutiles (verticales) */}
          {[40, 100].map((rx) => (
            <ellipse
              key={`mer-${rx}`}
              cx="200"
              cy="200"
              rx={rx}
              ry="160"
              fill="none"
              stroke="#2C5282"
              strokeOpacity="0.08"
              strokeWidth="0.7"
            />
          ))}

          {/* Paralelos sutiles (horizontales) */}
          {[-100, -55, 55, 100].map((offset) => {
            const ry = 8;
            const rx = Math.sqrt(160 * 160 - offset * offset);
            return (
              <ellipse
                key={`par-${offset}`}
                cx="200"
                cy={200 + offset}
                rx={rx}
                ry={ry}
                fill="none"
                stroke="#2C5282"
                strokeOpacity="0.08"
                strokeWidth="0.7"
              />
            );
          })}

          {/* Ecuador apenas visible */}
          <ellipse
            cx="200"
            cy="200"
            rx="160"
            ry="14"
            fill="none"
            stroke="#2C5282"
            strokeOpacity="0.14"
            strokeWidth="0.8"
          />
        </motion.g>

        {/* Markers (no rotan con grid, posición fija) */}
        {MARKERS.map((marker, i) => (
          <g key={marker.label}>
            <motion.circle
              cx={marker.x}
              cy={marker.y}
              r={marker.primary ? 14 : 10}
              fill="url(#marker-glow)"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
            <circle
              cx={marker.x}
              cy={marker.y}
              r={marker.primary ? 4.5 : 3.5}
              fill="#C8852A"
              stroke="#0A1628"
              strokeWidth="1.5"
            />
            <motion.circle
              cx={marker.x}
              cy={marker.y}
              r={3}
              fill="none"
              stroke="#C8852A"
              strokeWidth="1"
              animate={{
                r: [3, marker.primary ? 18 : 14],
                opacity: [0.7, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 0.4,
              }}
            />
          </g>
        ))}

        {/* Anillo dashed exterior + contra-rotación */}
        <circle
          cx="200"
          cy="200"
          r="170"
          fill="none"
          stroke="#2C5282"
          strokeOpacity="0.12"
          strokeWidth="1"
          strokeDasharray="2 8"
        />
        <motion.circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="#C8852A"
          strokeOpacity="0.18"
          strokeWidth="0.5"
          strokeDasharray="1 6"
          animate={{ rotate: [0, -360] }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "200px 200px" }}
        />
      </svg>
    </div>
  );
}
