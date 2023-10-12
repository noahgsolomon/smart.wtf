"use client"

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";

const properties = {
    light: {
      r: 9,
      transform: "rotate(40deg)",
      cx: 12,
      cy: 5,
      opacity: 0
    },
    dark: {
      r: 5,
      transform: "rotate(90deg)",
      cx: 30,
      cy: 0,
      opacity: 1
    },
    springConfig: { mass: 4, tension: 600, friction: 50 }
  };

export default function ThemeButton() {
    const {resolvedTheme, setTheme} = useTheme();

    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const { r, transform, cx, cy, opacity } = properties[
        resolvedTheme === 'dark' ? "dark" : "light"
    ];
      
    const svgContainerProps = useSpring({
        transform,
        config: properties.springConfig
      });
      const centerCircleProps = useSpring({ r, config: properties.springConfig });
      const maskedCircleProps = useSpring({
        cx,
        cy,
        config: properties.springConfig
      });
      const linesProps = useSpring({ opacity, config: properties.springConfig });


    if (!mounted) {
        return <button disabled className="opacity-80 transition-all">...</button>;
    }

    return (
<animated.svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="currentColor"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      style={{
        cursor: "pointer",
        ...svgContainerProps
      }}
    >
      <mask id="myMask2">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <animated.circle
                    cx={maskedCircleProps.cx}
                    cy={maskedCircleProps.cy}
                    style={{ fill: "black" }}
                    r={7}
                />
            </mask>
    <animated.circle
  cx="12"
  cy="12"
  r='5'
  style={{ fill: "black", mask: "url(#myMask2)" }}
/>
      <animated.g stroke="currentColor" style={linesProps}>
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </animated.g>
    </animated.svg>    )
}