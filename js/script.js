/**
 * Run Logic - Main JavaScript
 * Repository: https://github.com/noustelos/run_logic
 * Uses GSAP for animations and scroll effects
 * Note: SplitText functionality implemented manually (no plugin needed)
 */

// Utility Functions
let select = e => document.querySelector(e);
let selectAll = e => document.querySelectorAll(e);

// Geometry shared with the SVG in index.html
const INFINITY_CENTER_Y = 4800;
const SVG_NS = "http://www.w3.org/2000/svg";

// Global State
let charElements = [];
let hasWritten = [];

// Initialize when page loads
window.onload = (event) => {
    const noJsMessage = document.querySelector('.no-js-message');
    if (noJsMessage) {
        noJsMessage.style.display = 'none';
    }

    const mainElement = document.querySelector('main');
    if (mainElement) {
        mainElement.classList.add('js-ready');
    }

    init();
};

function init() {
    // Both the header card (#codepen) and the <code> cards get typed out.
    let codeDivs = selectAll(".card header, .card code");

    codeDivs.forEach((codeDiv, i) => {
        // Cards built from markup use .tp spans; the header card has none,
        // so its inner wrapper is split instead. Splitting the header itself
        // would turn every character into a flex item of the card layout.
        let tpElements = codeDiv.querySelectorAll(".tp");
        if (!tpElements.length) {
            tpElements = codeDiv.querySelectorAll(":scope > *");
        }
        if (!tpElements.length) {
            tpElements = [codeDiv];
        }

        charElements[i] = [];
        hasWritten[i] = false;

        tpElements.forEach((tp) => {
            let text = tp.textContent.trim();
            let charSpans = [];

            // Build the spans through the DOM so that <, > and & in the
            // code samples stay literal text instead of being re-parsed.
            tp.textContent = '';
            text.split('').forEach((c) => {
                let span = document.createElement('span');
                span.className = 'char';
                span.style.opacity = 0;
                span.textContent = c;
                tp.appendChild(span);
                charSpans.push(span);
            });

            charElements[i].push(charSpans);
        });

        ScrollTrigger.create({
            trigger: codeDiv,
            start: "top bottom-=100",
            once: true,
            onEnter: () => writeText(i)
        });
    });

    setupScrollAnimations();
    buildTexture();
    setupInfinity();
}

function writeText(i) {
    if (hasWritten[i]) {
        return;
    }
    hasWritten[i] = true;

    // Small delay so the typing is not hidden behind the page fade-in.
    let tl = gsap.timeline({ delay: 0.4 });

    charElements[i].forEach((chars) => {
        tl.set(chars, {
            opacity: 1,
            stagger: 0.01
        });
    });
}

function setupScrollAnimations() {
    // Every line is a different length, so each one gets its own dash offset.
    // That way all four packets reach the infinity symbol together at the
    // bottom of the page, instead of drifting apart.
    let lines = Array.from(selectAll("#svgPaths use")).map((use) => {
        let path = select(use.getAttribute("href"));
        return { use: use, length: path ? path.getTotalLength() : 0 };
    });

    // Measured against <main>, not <body>: anything added above (the hero)
    // then leaves the packet-to-card alignment untouched.
    ScrollTrigger.create({
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
            let thisProgress = self.progress;
            lines.forEach((line) => {
                gsap.set(line.use, { strokeDashoffset: -line.length * thisProgress });
            });
            let tabletVerMovement = 0.65 * window.innerHeight;
            let scrollProgress2 = - parseInt(tabletVerMovement * thisProgress) + "px";
            gsap.set("body", { "--tabletVerticaloffset": scrollProgress2 });
        }
    });
}

function buildWaves(group, config) {
    // Layered sine bands, shared by the hero and the finale.
    //
    // The motion is CSS, not GSAP, on purpose. These loops are decorative and
    // owe nothing to scroll position, and GSAP drives everything from one
    // requestAnimationFrame ticker on the main thread - the same ticker that
    // starves when the page gets busy. CSS animations keep running regardless.
    if (!group) {
        return;
    }

    let startX = -2 * config.wavelength;
    let endX = config.width + 2 * config.wavelength;
    let step = 16;

    for (let b = 0; b < config.bands; b++) {
        // Two nested groups: one element can only animate transform once, and
        // the drift and the sway need separate periods.
        let drift = document.createElementNS(SVG_NS, "g");
        drift.setAttribute("class", "wave-drift");
        drift.style.setProperty("--drift", (b % 2 === 0 ? -config.wavelength : config.wavelength) + "px");
        drift.style.animationDuration = (config.duration + b * 7) + "s";

        let inner = document.createElementNS(SVG_NS, "g");

        if (config.sway) {
            inner.setAttribute("class", "wave-sway");
            inner.style.setProperty("--sway", config.sway + "px");
            // Sway and swell on periods that share no common multiple with the
            // drift, so the band never resettles into the same arrangement.
            inner.style.animationDuration = (config.swayDuration + b * 2.6).toFixed(2) + "s, "
                                          + (config.swayDuration * 0.78 + b * 1.7).toFixed(2) + "s";
        }

        for (let k = 0; k < config.perBand; k++) {
            let i = b * config.perBand + k;
            let amplitude = config.amplitude + (i % 5) * config.amplitudeStep;
            let baseY = config.centerY - (config.bands * config.perBand * config.spacing) / 2 + i * config.spacing;
            let phase = i * 0.8;
            let points = [];

            for (let x = startX; x <= endX; x += step) {
                let y = baseY + Math.sin(x / config.wavelength * Math.PI * 2 + phase) * amplitude;
                points.push((x === startX ? "M " : "L ") + x.toFixed(0) + "," + y.toFixed(1));
            }

            let path = document.createElementNS(SVG_NS, "path");
            path.setAttribute("d", points.join(" "));
            path.setAttribute("opacity", (config.opacity + (i % 4) * config.opacityStep).toFixed(3));
            inner.appendChild(path);
        }

        drift.appendChild(inner);
        group.appendChild(drift);
    }
}

function buildTexture() {
    // Behind the finale: tight and faint, a bed for the infinity mark.
    buildWaves(select("#infinityTexture"), {
        centerY: INFINITY_CENTER_Y,
        width: 740,
        bands: 4,
        perBand: 4,
        spacing: 33,
        wavelength: 275,
        amplitude: 24,
        amplitudeStep: 10,
        opacity: 0.06,
        opacityStep: 0.03,
        duration: 30
    });

    // The hero runs the same texture wider and slower, so the two ends of the
    // page are built from one material at two scales.
    buildWaves(select("#heroWaves"), {
        centerY: 258,
        width: 1600,
        bands: 4,
        perBand: 3,
        spacing: 38,
        wavelength: 620,
        amplitude: 16,
        amplitudeStep: 5,
        opacity: 0.095,
        opacityStep: 0.035,
        duration: 26,
        sway: 9,
        swayDuration: 9.5
    });
}

function setupInfinity() {
    let loops = Array.from(selectAll(".inf-loop"));
    let runners = Array.from(selectAll(".inf-runner"));

    if (!loops.length) {
        return;
    }

    let lengths = loops.map((loop) => loop.getTotalLength());
    let dash = 150;

    loops.forEach((loop, i) => {
        gsap.set(loop, { strokeDasharray: lengths[i], strokeDashoffset: lengths[i], opacity: 0 });
    });

    runners.forEach((runner, i) => {
        gsap.set(runner, {
            strokeDasharray: dash + " " + (lengths[i] - dash),
            strokeDashoffset: -lengths[i] * (i * 0.22),
            opacity: 0
        });
    });

    // The loops draw themselves as the last stretch of the page scrolls past,
    // staggered so they open outwards one after another.
    ScrollTrigger.create({
        trigger: "#infinityGroup",
        start: "top bottom+=600",
        end: "bottom bottom",
        onUpdate: (self) => {
            let p = self.progress;

            loops.forEach((loop, i) => {
                let lp = Math.min(1, Math.max(0, (p - i * 0.07) / 0.72));
                gsap.set(loop, {
                    strokeDashoffset: lengths[i] * (1 - lp),
                    opacity: lp * (0.55 - i * 0.06)
                });
                gsap.set(runners[i], { opacity: lp < 0.85 ? 0 : (lp - 0.85) / 0.15 });
            });
        }
    });

    // Once drawn the finale never settles: a light laps each loop and the
    // strokes breathe. Every loop runs at its own tempo, so the four of them
    // drift permanently in and out of phase instead of pulsing as one.
    runners.forEach((runner, i) => {
        gsap.to(runner, {
            strokeDashoffset: "-=" + lengths[i],
            duration: 6.5 + i * 1.6,
            ease: "none",
            repeat: -1
        });
    });

    loops.forEach((loop, i) => {
        gsap.to(loop, {
            strokeWidth: 2.1,
            duration: 2.4 + i * 0.5,
            delay: i * 0.35,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });
    });

    gsap.to("#infHalo", {
        opacity: 0.55,
        duration: 4.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });
}
