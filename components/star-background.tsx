"use client";

import { useRef, useEffect } from "react";

export function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const STAR_COLOR = isDark ? "#a5b4fc" : "#000000";
    const STAR_SIZE = 1.5;
    const STAR_MIN_SCALE = 0.3;
    const OVERFLOW_THRESHOLD = 50;
    const STAR_COUNT = 150;

    let scale = window.devicePixelRatio || 1;
    let width = window.innerWidth * scale;
    let height = window.innerHeight * scale;

    canvas.width = width;
    canvas.height = height;

    let stars: Array<{ x: number; y: number; z: number }> = [];
    let pointerX: number | null = null;
    let pointerY: number | null = null;
    const velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };

    let animationFrameId: number;

    function generate() {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        stars.push({
          x,
          y,
          z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
        });
      }
    }

    function recycleStar(star: { x: number; y: number; z: number }) {
      let direction = "z";
      const vx = Math.abs(velocity.x);
      const vy = Math.abs(velocity.y);

      if (vx > 1 || vy > 1) {
        const axis = Math.random() < vx / (vx + vy) ? "h" : "v";
        if (axis === "h") {
          direction = velocity.x > 0 ? "l" : "r";
        } else {
          direction = velocity.y > 0 ? "t" : "b";
        }
      }

      star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

      if (direction === "z") {
        star.z = 0.3;
        const edgePick = Math.random();
        if (edgePick < 0.25) {
          star.x = Math.random() * width;
          star.y = -OVERFLOW_THRESHOLD;
        } else if (edgePick < 0.5) {
          star.x = Math.random() * width;
          star.y = height + OVERFLOW_THRESHOLD;
        } else if (edgePick < 0.75) {
          star.x = -OVERFLOW_THRESHOLD;
          star.y = Math.random() * height;
        } else {
          star.x = width + OVERFLOW_THRESHOLD;
          star.y = Math.random() * height;
        }
      } else if (direction === "l") {
        star.x = -OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
      } else if (direction === "r") {
        star.x = width + OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
      } else if (direction === "t") {
        star.x = width * Math.random();
        star.y = -OVERFLOW_THRESHOLD;
      } else if (direction === "b") {
        star.x = width * Math.random();
        star.y = height + OVERFLOW_THRESHOLD;
      }
    }

    function update() {
      velocity.tx *= 0.92;
      velocity.ty *= 0.92;
      velocity.x += (velocity.tx - velocity.x) * 0.6;
      velocity.y += (velocity.ty - velocity.y) * 0.6;

      stars.forEach((star) => {
        star.x += velocity.x * star.z;
        star.y += velocity.y * star.z;
        star.x += (star.x - width / 2) * velocity.z * star.z;
        star.y += (star.y - height / 2) * velocity.z * star.z;
        star.z += velocity.z;

        if (
          star.x < -OVERFLOW_THRESHOLD ||
          star.x > width + OVERFLOW_THRESHOLD ||
          star.y < -OVERFLOW_THRESHOLD ||
          star.y > height + OVERFLOW_THRESHOLD
        ) {
          recycleStar(star);
        }
      });
    }

    function render() {
      context.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        context.beginPath();
        context.arc(star.x, star.y, STAR_SIZE * star.z * scale, 0, Math.PI * 2);
        context.fillStyle = STAR_COLOR
        context.globalAlpha = Math.min(1, 0.9 + 0.4 * star.z);
        context.fill();
      });
    }

    function step() {
      update();
      render();
      animationFrameId = requestAnimationFrame(step);
    }

    function movePointer(x: number, y: number, isTouch: boolean) {
      if (typeof pointerX === "number" && typeof pointerY === "number") {
        const ox = x - pointerX;
        const oy = y - pointerY;
        velocity.tx = velocity.tx + (ox / 16) * scale * (isTouch ? 1 : -1);
        velocity.ty = velocity.ty + (oy / 16) * scale * (isTouch ? 1 : -1);
      }
      pointerX = x;
      pointerY = y;
    }

    function onMouseMove(e: MouseEvent) {
      movePointer(e.clientX, e.clientY, false);
    }

    function onTouchMove(e: TouchEvent) {
      movePointer(e.touches[0].clientX, e.touches[0].clientY, true);
      e.preventDefault();
    }

    function onMouseLeave() {
      pointerX = null;
      pointerY = null;
    }

    function onResize() {
      scale = window.devicePixelRatio || 1;
      width = window.innerWidth * scale;
      height = window.innerHeight * scale;
      canvas.width = width;
      canvas.height = height;
    }

    function onThemeChange(e: MediaQueryListEvent) {
      const isDark = e.matches;
      const newColor = isDark ? "#a5b4fc" : "#000000";
      context.fillStyle = newColor;
    }

    const themeMedia = window.matchMedia("(prefers-color-scheme: dark)");

    generate();
    step();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);
    themeMedia.addEventListener("change", onThemeChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      themeMedia.removeEventListener("change", onThemeChange);
      themeMedia.removeEventListener("change", onThemeChange);
      themeMedia.removeEventListener("change", onThemeChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 5, background: "transparent" }}
    />
  );
}
