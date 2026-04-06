import { useState } from "react";

/**
 * Confluence Animated Logo Component
 *
 * Animations: draw, breath, growth, converge, flow
 * Variants: mark, horizontal, vertical
 *
 * Animation philosophy (from brand kit):
 *   - No bounce. No overshoot. No cubic-bezier values > 1.
 *   - Minimum 2.4s for any entrance animation.
 *   - Opacity changes are gradual — nothing pops, everything arrives.
 *   - The feeling: watching morning fog lift off a river.
 */
export function AnimatedLogo({
  animation = "flow",
  variant = "mark",
  colorMode = "auto",
  className = "",
  size = 120,
}) {
  const [key] = useState(0);

  const fillColor =
    colorMode === "dark"
      ? "#f5f2ed"
      : colorMode === "light"
        ? "#82a396"
        : "currentColor";

  return (
    <div className={`animated-logo anim-${animation} ${className}`} key={key}>
      <style>{animationStyles}</style>

      {variant === "mark" && <LogoMark fill={fillColor} size={size} />}

      {variant === "horizontal" && (
        <div className="flex items-center gap-3">
          <LogoMark fill={fillColor} size={size * 0.55} />
          <Wordmark fill={fillColor} size={size * 1.8} />
        </div>
      )}

      {variant === "vertical" && (
        <div className="flex flex-col items-center gap-2">
          <LogoMark fill={fillColor} size={size * 0.7} />
          <Wordmark fill={fillColor} size={size * 1.6} />
        </div>
      )}
    </div>
  );
}

function LogoMark({ fill, size }) {
  return (
    <svg
      viewBox="0 0 299.23 250"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: "auto" }}
    >
      <g className="logo-group" style={{ transformOrigin: "center" }}>
        <path
          className="mark-path"
          fill={fill}
          d="M279.5,182.69c-8.41-23.89-40.89-44.05-79-49.05a199,199,0,0,0-37.87-1.2c-3.41-3.84-6.69-7.43-9.77-10.61l-1-1c-1.28-1.35-2.62-2.79-4-4.29a250.51,250.51,0,0,0,54.44-12.65l1.46-.29a77.5,77.5,0,0,0,18.42-6.09,78.44,78.44,0,0,0,43.12-55l1.38-6.69-6.7,1.31a78.31,78.31,0,0,0-60.9,58.22,238.78,238.78,0,0,1-58.78,12.77l-1.68-1.91C117.3,82.17,88,49.18,50.36,37.61c-11.25-3.45-21.14-1.89-27.11,4.33-5.71,6-7,15.43-3.53,25.36,8.41,23.89,40.91,44.07,79,49.05a199.75,199.75,0,0,0,37.85,1.22c3.43,3.82,6.69,7.43,9.79,10.59l.94,1c1.3,1.36,2.64,2.81,4,4.29a251,251,0,0,0-54.39,12.64l-1.52.31a78.28,78.28,0,0,0-61.54,61l-1.37,6.69,6.7-1.31a78.21,78.21,0,0,0,18.44-6.08,77.32,77.32,0,0,0,42.47-52.12,238,238,0,0,1,58.76-12.77l1.7,1.9c21.39,24.09,50.68,57.08,88.32,68.65a39,39,0,0,0,9.23,1.75c7.34.44,13.61-1.62,17.87-6.06C281.7,202.1,283,192.63,279.5,182.69Zm-34-131.19A67.36,67.36,0,0,1,254.59,48a68.07,68.07,0,0,1-13.7,24.41,69.19,69.19,0,0,1-22.53,17,67.5,67.5,0,0,1-9.08,3.54A68.36,68.36,0,0,1,245.52,51.5ZM99.9,107.32c-34.29-4.47-64.39-22.59-71.59-43-2.33-6.63-1.77-12.61,1.5-16.05,2.38-2.46,6.11-3.56,10.73-3.28a30.33,30.33,0,0,1,7.15,1.36c33.45,10.3,60.7,39.62,81.07,62.49A185.52,185.52,0,0,1,99.9,107.32ZM53.71,198.51a73.14,73.14,0,0,1-9.07,3.55,68.3,68.3,0,0,1,36.22-41.38h0a71.26,71.26,0,0,1,9.06-3.56A68.36,68.36,0,0,1,53.71,198.51Zm215.7,3.25c-3.5,3.63-10,4.35-17.86,1.92-33.47-10.28-60.7-39.6-81.08-62.47a186.76,186.76,0,0,1,28.87,1.46c34.27,4.49,64.37,22.59,71.59,43C273.26,192.34,272.7,198.35,269.41,201.76Z"
        />
        <circle
          className="mark-dot dot-1"
          cx="153.67"
          cy="65.95"
          r="18.79"
          fill={fill}
        />
        <circle
          className="mark-dot dot-2"
          cx="145.56"
          cy="184.05"
          r="18.79"
          fill={fill}
        />
      </g>
    </svg>
  );
}

function Wordmark({ fill, size }) {
  return (
    <svg
      viewBox="164 45 510 90"
      xmlns="http://www.w3.org/2000/svg"
      className="wordmark"
      style={{ width: size, height: "auto" }}
    >
      <g className="wordmark-group" style={{ transformOrigin: "center" }}>
        <path
          fill={fill}
          d="M194,120.42c6.57,0,12.24-2.27,16-6.31l4.54,4.54c-5.05,5.3-12.37,8.46-20.94,8.46-17.16,0-28.9-11.86-28.9-29.27s11.74-29.28,28.9-29.28c8.57,0,15.89,3.16,20.94,8.58L210,81.69c-3.79-4-9.46-6.44-16-6.44-13,0-21.82,9.09-21.82,22.59S181,120.42,194,120.42Z"
        />
        <path
          fill={fill}
          d="M242.94,68.56c17,0,28.76,11.86,28.76,29.28S260,127.11,242.94,127.11s-28.77-11.86-28.77-29.27S225.78,68.56,242.94,68.56Zm0,51.86c12.61,0,21.32-9.08,21.32-22.58s-8.71-22.59-21.32-22.59-21.33,9.09-21.33,22.59S230.32,120.42,242.94,120.42Z"
        />
        <path
          fill={fill}
          d="M284.39,70.33v5a26.75,26.75,0,0,1,17.28-5.93c12.87,0,21.32,9.33,21.32,23v34.7h-7.31V92.41c0-9.72-6.31-16.28-15.52-16.28a22,22,0,0,0-15.77,6.06v44.92h-7.2V70.33Z"
        />
        <path
          fill={fill}
          d="M328,85.91h8.2V65.34c0-10.85,7.19-18.17,18-18.17A19.43,19.43,0,0,1,361,48.43V55a11.48,11.48,0,0,0-5.68-1.38c-6.93,0-11.73,4.79-11.73,11.73V85.91H361v5.93H343.59v35.27h-7.44V91.84H328Z"
        />
        <path
          fill={fill}
          d="M386.35,126.6a12.57,12.57,0,0,1-4,.51c-7.07,0-12.11-4.8-12.11-13.63V47.55h7.19v65.8c0,5.68,3.53,8.33,9,8.33Z"
        />
        <path
          fill={fill}
          d="M437,103.26c0,14.13-9.46,23.85-23.59,23.85s-23.59-9.72-23.59-23.85V69.45h7.44v33.81c0,10.22,6.56,17.16,16.28,17.16s16.4-6.94,16.4-17.16V69.45H437Z"
        />
        <path
          fill={fill}
          d="M450.31,99.6c.5,12.49,9,20.82,21.83,20.82,6.81,0,12.36-2.27,16.15-6.31l4.54,4.54c-5.17,5.3-12.36,8.46-21.2,8.46-17.28,0-29-11.73-29-29.53,0-17,10.73-29,27-29s25.49,12.24,25.49,31Zm0-5.55h37.47c-1.13-11.61-7.69-18.92-18.17-18.92S451.32,82.44,450.31,94.05Z"
        />
        <path
          fill={fill}
          d="M507.81,70.33v5a26.73,26.73,0,0,1,17.28-5.93c12.87,0,21.32,9.33,21.32,23v34.7H539.1V92.41c0-9.72-6.31-16.28-15.52-16.28a22,22,0,0,0-15.77,6.06v44.92h-7.2V70.33Z"
        />
        <path
          fill={fill}
          d="M581,120.42c6.56,0,12.24-2.27,16-6.31l4.54,4.54c-5.05,5.3-12.37,8.46-21,8.46-17.16,0-28.89-11.86-28.89-29.27s11.73-29.28,28.89-29.28c8.58,0,15.9,3.16,21,8.58L597,81.69c-3.79-4-9.47-6.44-16-6.44-13,0-21.83,9.09-21.83,22.59S568,120.42,581,120.42Z"
        />
        <path
          fill={fill}
          d="M609.26,99.6c.51,12.49,9,20.82,21.83,20.82,6.81,0,12.36-2.27,16.15-6.31l4.54,4.54c-5.17,5.3-12.36,8.46-21.19,8.46-17.29,0-29-11.73-29-29.53,0-17,10.72-29,27-29s25.49,12.24,25.49,31Zm0-5.55h37.48c-1.14-11.61-7.7-18.92-18.18-18.92S610.27,82.44,609.26,94.05Z"
        />
      </g>
    </svg>
  );
}

const animationStyles = `
  .logo-group, .wordmark-group { transform-origin: center; }

  /* DRAW-ON — 2.8s soft reveal, plays once */
  .anim-draw .mark-path {
    clip-path: inset(0 100% 0 0);
    animation: softReveal 2.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  }
  .anim-draw .mark-dot { opacity: 0; animation: softFadeIn 1.4s ease-out forwards; }
  .anim-draw .dot-1 { animation-delay: 2s; }
  .anim-draw .dot-2 { animation-delay: 2.4s; }
  .anim-draw .wordmark { opacity: 0; animation: softRise 1.6s ease-out forwards; animation-delay: 2.8s; }

  /* BREATH — 5s inhale/exhale loop */
  .anim-breath .logo-group { animation: inhaleExhale 5s ease-in-out infinite; }
  .anim-breath .mark-dot { animation: dotBreath 5s ease-in-out infinite; }
  .anim-breath .dot-1 { animation-delay: 0.15s; }
  .anim-breath .dot-2 { animation-delay: 0.3s; }
  .anim-breath .wordmark-group { animation: inhaleExhale 5s ease-in-out infinite; animation-delay: 0.4s; }

  /* GROWTH — 2.4s scale entrance */
  .anim-growth .mark-path { opacity: 0; transform-origin: center; animation: gentleGrow 2.4s cubic-bezier(0.22, 0.61, 0.36, 1) forwards; }
  .anim-growth .mark-dot { opacity: 0; animation: softFadeIn 1.2s ease-out forwards; }
  .anim-growth .dot-1 { animation-delay: 1.6s; }
  .anim-growth .dot-2 { animation-delay: 2s; }
  .anim-growth .wordmark { opacity: 0; animation: softRise 1.6s ease-out forwards; animation-delay: 2.4s; }

  /* CONVERGENCE — 2.4s drift-in */
  .anim-converge .mark-path { opacity: 0; animation: driftIn 2.4s cubic-bezier(0.22, 0.61, 0.36, 1) forwards; }
  .anim-converge .mark-dot { opacity: 0; animation: softFadeIn 1.4s ease-out forwards; }
  .anim-converge .dot-1 { animation-delay: 1.8s; }
  .anim-converge .dot-2 { animation-delay: 2.1s; }
  .anim-converge .wordmark { opacity: 0; animation: softRise 1.6s ease-out forwards; animation-delay: 2.6s; }

  /* FLOW — 8s still-water idle loop */
  .anim-flow .logo-group { animation: stillWater 8s ease-in-out infinite; }
  .anim-flow .wordmark-group { animation: stillWater 8s ease-in-out infinite; animation-delay: 1s; }

  @keyframes softReveal { 0% { clip-path: inset(0 100% 0 0); } 100% { clip-path: inset(0 0% 0 0); } }
  @keyframes softFadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
  @keyframes softRise { 0% { opacity: 0; transform: translateY(6px); } 100% { opacity: 1; transform: translateY(0); } }
  @keyframes inhaleExhale { 0%, 100% { transform: scale(1); } 40% { transform: scale(1.025); } 60% { transform: scale(1.025); } }
  @keyframes dotBreath { 0%, 100% { opacity: 1; } 40% { opacity: 0.75; } 60% { opacity: 0.75; } }
  @keyframes gentleGrow { 0% { opacity: 0; transform: scale(0.85); } 60% { opacity: 1; } 100% { opacity: 1; transform: scale(1); } }
  @keyframes driftIn { 0% { opacity: 0; transform: scale(0.92) translateY(8px); } 50% { opacity: 0.7; } 100% { opacity: 1; transform: scale(1) translateY(0); } }
  @keyframes stillWater { 0%, 100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-2px) rotate(0.6deg); } 50% { transform: translateY(0) rotate(0deg); } 75% { transform: translateY(2px) rotate(-0.6deg); } }
`;

export default AnimatedLogo;
