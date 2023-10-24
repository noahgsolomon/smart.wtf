"use client";

import { useState, useEffect } from "react";

const Donut = () => {
  const [animation, setAnimation] = useState("");

  useEffect(() => {
    let A = 0,
      B = 0;
    const M = Math;
    const customChars = "smart.wtf";
    let charIndex = 0;

    const a = () => {
      const s = [],
        t = [];
      (A += 0.05), (B += 0.07);
      const o = M.cos(A),
        e = M.sin(A),
        n = M.cos(B),
        c = M.sin(B);
      for (let o = 0; o < 1760; o++)
        (s[o] = o % 80 == 79 ? "\n" : " "), (t[o] = 0);
      for (let i = 0; i < 6.28; i += 0.07) {
        const r = M.cos(i),
          a = M.sin(i);
        for (let i = 0; i < 6.28; i += 0.02) {
          const l = M.sin(i),
            f = M.cos(i),
            A = r + 2,
            B = 1 / (l * A * e + a * o + 5),
            d = l * A * o - a * e,
            m = (40 + 30 * B * (f * A * n - d * c)) | 0,
            v = (12 + 15 * B * (f * A * c + d * n)) | 0,
            I = m + 80 * v,
            h =
              (8 * ((a * e - l * r * o) * n - l * r * e - a * o - f * r * c)) |
              0;
          v < 22 &&
            v >= 0 &&
            m >= 0 &&
            m < 79 &&
            B > t[I]! &&
            ((t[I] = B), (s[I] = customChars[charIndex]));
          charIndex = (charIndex + 1) % customChars.length;
        }
      }
      setAnimation(s.join(""));
    };
    const intervalId = setInterval(a, 65);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <pre className="gradientShift text-xs text-primary md:text-sm">
      {animation}
    </pre>
  );
};

export default Donut;
