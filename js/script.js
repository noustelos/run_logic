/**
 * Run Logic - Main JavaScript
 * Repository: https://github.com/noustelos/run_logic
 * Uses GSAP for animations and scroll effects
 * Note: SplitText functionality implemented manually (no plugin needed)
 */

// Utility Functions
let select = e => document.querySelector(e);
let selectAll = e => document.querySelectorAll(e);

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
    setupThemeToggle();
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
    ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
            let thisProgress = self.progress;
            let tabletVerMovement = 0.65 * window.innerHeight;
            let scrollProgress = - (2400 * thisProgress);
            gsap.set("body", { "--strokeDashoffset": scrollProgress });
            let scrollProgress2 = - parseInt(tabletVerMovement * thisProgress) + "px";
            gsap.set("body", { "--tabletVerticaloffset": scrollProgress2 });
        }
    });
}

function setupThemeToggle() {
    const toggle = document.getElementById('bw-toggle');
    const body = document.body;
    
    if (toggle && body) {
        toggle.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('bw-mode');
            } else {
                body.classList.remove('bw-mode');
            }
        });
    }
}
