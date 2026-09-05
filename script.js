/* =============================================================================
   DIANA TAYLOR — script.js
   A lightweight "director" choreographs a persistent performer across scenes.
   Philosophy: Stage · Actor · Camera · Entrance · Exit · Focus · Timing.

   Modules:  Env → Director → Chrome sync → Input → Parallax → Cursor
             → Work still → Range focus → Reel → Boot
   ========================================================================== */
(function () {
  "use strict";

  /* -------- Env ------------------------------------------------------------ */
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer  = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const CUT = reduceMotion ? 300 : 1050;

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const lerp  = (a, b, t) => a + (b - a) * t;

  const scenes = $$(".scene");
  const total  = scenes.length;
  const SCENE_NAMES = ["Arrival", "Work", "Range", "Reel", "About", "Contact"];

  const figure      = $("#figure");
  const figurePar   = $("#figureParallax");
  const backScenes  = $$(".backtype__scene");
  const indexBtns   = $$(".index__btn");
  const nowIdx      = $("#nowIdx");
  const nowName     = $("#nowName");
  const pagerCur    = $("#pagerCur");
  const prevBtn     = $("#prevBtn");
  const nextBtn     = $("#nextBtn");
  const progressBar = $("#progressBar");
  const curtain     = $("#curtain");
  const spot        = $("#spot");
  const backtype    = $("#backtype");

  let current = -1;      // forces first activate() to run
  let animating = false;

  /* Pre-compute reveal order so entrances stagger scene-by-scene */
  scenes.forEach((scene) => {
    $$("[data-reveal]", scene).forEach((el, i) => el.style.setProperty("--i", i));
  });

  /* -------- Director ------------------------------------------------------- */
  function activate(i, focusScene) {
    i = clamp(i, 0, total - 1);

    scenes.forEach((scene, idx) => {
      const on = idx === i;
      scene.classList.toggle("is-active", on);
      scene.setAttribute("aria-hidden", on ? "false" : "true");
      if (on) scene.scrollTop = 0;
    });

    backScenes.forEach((b) =>
      b.classList.toggle("is-active", Number(b.dataset.scene) === i)
    );

    figure.dataset.scene = i;
    document.documentElement.dataset.scene = i;
    resetFocusPose();

    indexBtns.forEach((btn, idx) => {
      const on = idx === i;
      btn.classList.toggle("is-active", on);
      if (on) btn.setAttribute("aria-current", "true");
      else btn.removeAttribute("aria-current");
    });

    const two = (n) => String(n).padStart(2, "0");
    nowIdx.textContent  = two(i);
    nowName.textContent = SCENE_NAMES[i] || "";
    pagerCur.textContent = two(i);
    prevBtn.disabled = i === 0;
    nextBtn.disabled = i === total - 1;
    progressBar.style.setProperty("--p", total > 1 ? i / (total - 1) : 0);

    current = i;

    if (focusScene) {
      // keep keyboard users oriented at the new scene without scroll jump
      const target = scenes[i];
      target.focus({ preventScroll: true });
    }
  }

  function goTo(i, focusScene) {
    i = clamp(i, 0, total - 1);
    if (i === current || animating) return;
    animating = true;
    activate(i, focusScene);
    setTimeout(() => { animating = false; }, CUT * 0.55);
  }

  const next = (f) => goTo(current + 1, f);
  const prev = (f) => goTo(current - 1, f);

  /* -------- Boot: house lights down, camera finds Diana --------------------
     Registered up-front so the stage always resolves — a queued timeout
     still fires even if a later setup step throws. Fallback markup stays
     visible without JS (arrival keeps its is-active class).                  */
  let booted = false;
  function boot() {
    if (booted) return;
    booted = true;
    document.documentElement.classList.remove("is-loading");
    if (curtain) curtain.classList.add("is-open");
    setTimeout(() => activate(0, false), reduceMotion ? 0 : 260);
  }
  window.addEventListener("load", () => setTimeout(boot, 200));
  setTimeout(boot, 1600); // hard fallback
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => setTimeout(boot, 120));
  }
  // Reset scene state so the opening entrance actually transitions in.
  scenes.forEach((s) => {
    s.classList.remove("is-active");
    s.setAttribute("aria-hidden", "true");
  });

  /* -------- Input: scene links, pager -------------------------------------- */
  const skip = document.querySelector(".skip-link");
  if (skip) {
    skip.addEventListener("click", (e) => {
      e.preventDefault();
      scenes[Math.max(0, current)].focus({ preventScroll: true });
    });
  }
  $$("[data-scene-link]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      goTo(Number(el.dataset.sceneLink), true);
    });
  });
  nextBtn.addEventListener("click", () => next(true));
  prevBtn.addEventListener("click", () => prev(true));

  /* -------- Input: wheel (respects internal scroll) ------------------------ */
  let wheelLock = false;
  window.addEventListener(
    "wheel",
    (e) => {
      const scene = scenes[current];
      const scrollable = scene && scene.scrollHeight > scene.clientHeight + 2;
      if (scrollable) {
        const atTop = scene.scrollTop <= 0;
        const atBottom =
          scene.scrollTop + scene.clientHeight >= scene.scrollHeight - 1;
        if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) return;
      }
      e.preventDefault();
      if (wheelLock || animating || Math.abs(e.deltaY) < 8) return;
      wheelLock = true;
      setTimeout(() => (wheelLock = false), 900);
      e.deltaY > 0 ? next() : prev();
    },
    { passive: false }
  );

  /* -------- Input: keyboard ------------------------------------------------ */
  window.addEventListener("keydown", (e) => {
    const tag = document.activeElement && document.activeElement.tagName;
    const onControl = /^(A|BUTTON|INPUT|TEXTAREA|SELECT)$/.test(tag || "");
    switch (e.key) {
      case "ArrowRight": case "PageDown":
        e.preventDefault(); next(true); break;
      case "ArrowLeft": case "PageUp":
        e.preventDefault(); prev(true); break;
      case " ":
        if (!onControl) { e.preventDefault(); next(true); } break;
      case "Home": e.preventDefault(); goTo(0, true); break;
      case "End":  e.preventDefault(); goTo(total - 1, true); break;
      default:
        if (/^[0-9]$/.test(e.key) && Number(e.key) < total) {
          e.preventDefault(); goTo(Number(e.key), true);
        }
    }
  });

  /* -------- Input: touch (horizontal swipe = cut; vertical = scroll) ------- */
  let tX = 0, tY = 0, tT = 0;
  window.addEventListener("touchstart", (e) => {
    const t = e.changedTouches[0];
    tX = t.clientX; tY = t.clientY; tT = Date.now();
  }, { passive: true });
  window.addEventListener("touchend", (e) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - tX, dy = t.clientY - tY, dt = Date.now() - tT;
    if (dt < 700 && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      dx < 0 ? next(true) : prev(true);
    }
  }, { passive: true });

  /* -------- Parallax: cursor gently moves the composition ------------------ */
  if (finePointer && !reduceMotion) {
    let mx = 0.5, my = 0.4, cx = 0.5, cy = 0.4;
    window.addEventListener("pointermove", (e) => {
      mx = e.clientX / innerWidth;
      my = e.clientY / innerHeight;
    });
    const loop = () => {
      cx = lerp(cx, mx, 0.06);
      cy = lerp(cy, my, 0.06);
      const ox = (cx - 0.5), oy = (cy - 0.5);
      // figure drifts subtly with the cursor
      figurePar.style.setProperty("--px", (ox * 14).toFixed(2) + "px");
      figurePar.style.setProperty("--py", (oy * 10).toFixed(2) + "px");
      // monumental type drifts the opposite way → depth
      backtype.style.setProperty("--tx", (-ox * 26).toFixed(2) + "px");
      backtype.style.setProperty("--ty", (-oy * 18).toFixed(2) + "px");
      // spotlight follows the cursor
      spot.style.setProperty("--mx", (cx * 100).toFixed(1) + "%");
      spot.style.setProperty("--my", (cy * 100).toFixed(1) + "%");
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* -------- Custom cursor (meaningful, subtle) ----------------------------- */
  if (finePointer && !reduceMotion) {
    const cursor = $("#cursor");
    const ring = $(".cursor__ring");
    const dot = $(".cursor__dot");
    const label = $("#cursorLabel");
    let px = innerWidth / 2, py = innerHeight / 2, rx = px, ry = py;

    window.addEventListener("pointermove", (e) => {
      px = e.clientX; py = e.clientY;
      dot.style.transform = `translate(${px}px, ${py}px) translate(-50%, -50%)`;
    });
    const ringLoop = () => {
      rx = lerp(rx, px, 0.18); ry = lerp(ry, py, 0.18);
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      label.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(ringLoop);
    };
    requestAnimationFrame(ringLoop);

    const HOT = "a, button, [data-cursor]";
    document.addEventListener("pointerover", (e) => {
      const hot = e.target.closest(HOT);
      if (hot) {
        cursor.classList.add("is-hot");
        label.textContent = hot.dataset.cursor || "";
        cursor.classList.toggle("has-label", !!hot.dataset.cursor);
      }
    });
    document.addEventListener("pointerout", (e) => {
      if (e.target.closest(HOT) && !(e.relatedTarget && e.relatedTarget.closest(HOT))) {
        cursor.classList.remove("is-hot");
      }
    });
    document.addEventListener("pointerdown", () => cursor.classList.add("is-down"));
    document.addEventListener("pointerup", () => cursor.classList.remove("is-down"));
  }

  /* -------- Focus pose: subtle "breath" of the light on the figure --------- */
  function setFocusPose(kind) {
    if (reduceMotion) return;
    const map = {
      upper: { fy: 10, fs: 1.05, my: "30%" },
      mid:   { fy: 0,  fs: 1.03, my: "45%" },
      lower: { fy: -10, fs: 1.05, my: "60%" },
      full:  { fy: 0,  fs: 1.0,  my: "42%" },
    };
    const p = map[kind] || map.full;
    figurePar.style.setProperty("--fy", p.fy + "px");
    figurePar.style.setProperty("--fs", p.fs);
    if (spot) spot.style.setProperty("--my", p.my);
  }
  function resetFocusPose() {
    figurePar.style.setProperty("--fy", "0px");
    figurePar.style.setProperty("--fs", "1");
  }

  /* -------- Scene 01 · Work: the still viewer ------------------------------ */
  const still = $("#still");
  const stillImg = $("#stillImg");
  const stillCap = $("#stillCap");
  if (still) {
    $$(".filmo__link").forEach((link) => {
      const show = () => {
        const src = link.dataset.still;
        const title = link.querySelector(".filmo__title").textContent;
        const year = link.querySelectorAll(".filmo__meta i")[1];
        stillCap.textContent = title + (year ? " — " + year.textContent : "");
        if (src) {
          still.classList.remove("no-image");
          if (stillImg.getAttribute("src") !== src) stillImg.src = src;
        } else {
          still.classList.add("no-image");
        }
        still.classList.add("is-visible");
        setFocusPose(link.dataset.focus);
      };
      const hide = () => {
        still.classList.remove("is-visible");
        resetFocusPose();
      };
      link.addEventListener("pointerenter", show);
      link.addEventListener("focus", show);
      link.addEventListener("pointerleave", hide);
      link.addEventListener("blur", hide);
      link.addEventListener("click", (e) => e.preventDefault());
    });
  }

  /* -------- Scene 02 · Range: role readout + light shift ------------------- */
  const readout = $("#rolesReadout");
  const readoutDefault = readout ? readout.textContent : "";
  $$(".roles__btn").forEach((btn) => {
    const line = btn.dataset.line;
    const show = () => { if (readout) readout.textContent = line; setFocusPose(btn.dataset.focus); };
    const hide = () => { if (readout) readout.textContent = readoutDefault; resetFocusPose(); };
    btn.addEventListener("pointerenter", show);
    btn.addEventListener("focus", show);
    btn.addEventListener("pointerleave", hide);
    btn.addEventListener("blur", hide);
  });

  /* -------- Scene 03 · Reel: placeholder play affordance ------------------- */
  const reelBtn = $("#reelBtn");
  const reelNote = $(".reel__note");
  if (reelBtn && reelNote) {
    const original = reelNote.textContent;
    reelBtn.addEventListener("click", () => {
      /* No fake video is embedded. Replace this poster + wire your hosted reel. */
      reelNote.textContent = "Reel available on request — poster is a placeholder.";
      reelBtn.animate(
        [{ transform: "scale(1)" }, { transform: "scale(0.99)" }, { transform: "scale(1)" }],
        { duration: 420, easing: "ease-out" }
      );
      clearTimeout(reelBtn._t);
      reelBtn._t = setTimeout(() => (reelNote.textContent = original), 3200);
    });
  }
})();
