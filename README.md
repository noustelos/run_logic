# Run Logic

> **Repository:** [https://github.com/noustelos/run_logic](https://github.com/noustelos/run_logic)

> **Demo:** Code animation with GSAP, ScrollTrigger, and SVG paths

> **Based on:** [CodePen by ikrprojects](https://codepen.io/ikrprojects/pen/KwgGBRp)

---

## 📌 Περιγραφή

Το *Run Logic* είναι ένα demo project που παρουσιάζει **animated code cards** με τη χρήση:
- **GSAP** (GreenSock Animation Platform) για animations
- **ScrollTrigger** για scroll-based effects
- **SVG paths** για πορτοκαλί κινούμενες γραμμές (hero → 9 κάρτες → σύμβολο απείρου)
- **3D CSS effects** για το background

Στόχος: Να δημιουργήσουμε ένα οπτικά εντυπωσιακό demo που μοιάζει με το [CodePen Demo](https://codepen.io/ikrprojects/pen/KwgGBRp), αλλά με σωστή δομή project και χωρίς εξωτερικές εξαρτήσεις (CDN blocks).

---

## 📁 Δομή Project

```
RUN_LOGIC/
├── index.html              # Κυρίως HTML (με GSAP, ScrollTrigger)
├── css/
│   └── styles.css          # Πλήρως μετατράπηκε από SCSS σε CSS
├── js/
│   ├── script.js           # Typing, scroll animations, wave texture, finale
│   └── lib/
│       ├── gsap.min.js         # GSAP Core (περιέχει SplitText built-in)
│       └── ScrollTrigger.min.js  # ScrollTrigger plugin
├── README.md               # Αυτό το αρχείο
└── CLAUDE.md              # Οδηγίες για Claude Code & pending tasks
```

---

## 🚀 Setup & Εκτέλεση

### Local Development

```bash
# Πλοήγηση στο project
cd /Users/nikoskaradimas/Desktop/RUN_LOGIC

# Εκκίνηση Python server
python3 -m http.server 8080

# Άνοιγμα στο browser
# http://localhost:8080
```

**Συμβατότητα:**
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge

---

## 🔧 Ιστορικό Προβλημάτων & Διορθώσεων

### 1. **Custom HTML Tags** ❌ → ✅
**Πρόβλημα:** Χρήση non-standard HTML tags (`<cards>`, `<cardWrapper>`, `<card>`).
**Συμπτώματα:** 
- Tags δεν rendering σωστά
- CSS selectors δεν βρίσκουν τα elements
**Διόρθωση:** Αντικατάσταση με `<div class="...">`:
```html
<!-- ΛΑΘΟΣ -->
<cards><cardWrapper><card id="codepen">...</card></cardWrapper></cards>

<!-- ΣΩΣΤΟ -->
<div class="cards"><div class="cardWrapper"><div class="card" id="codepen">...</div></div></div>
```

---

### 2. **SCSS Syntax στο CSS** ❌ → ✅
**Πρόβλημα:** Ο αρχικός κώδικας ήταν **SCSS** (nested rules, `@media (width >= 576px)` κ.λπ.) και δεν δουλεύει σε `.css` αρχεία.
**Συμπτώματα:** 
- CSS δεν εφαρμόζεται
- Browser αγνοεί τα nested rules
**Διόρθωση:** Πλήρης μετατροπή σε **plain CSS**:
```css
/* ΛΑΘΟΣ (SCSS) */
.cardWrapper {
    @media (width >= 576px) { transform: translateX(6vw); }
}

/* ΣΩΣΤΟ (CSS) */
.cardWrapper { transform: translateX(0); }
@media (min-width: 576px) {
    .cardWrapper { transform: translateX(6vw); }
}
```

---

### 3. **SplitText Plugin Not Found** ❌ → ✅
**Πρόβλημα:** Το `SplitText.min.js` **δεν υπάρχει δωρεάν** στα public CDNs.
**Συμπτώματα:**
- `Uncaught ReferenceError: SplitText is not defined`
- Προσπάθειες download από λάθος URLs (404 errors)
**Διόρθωση:** Χειροκίνητη υλοποίηση της λειτουργίας SplitText:
```javascript
// ΛΑΘΟΣ: new SplitText(tp, { type:"chars" })

// ΣΩΣΤΟ:
let chars = text.split('');
let wrappedText = chars.map(c => `<span class="char" style="opacity:0">${c}</span>`).join('');
tp.innerHTML = wrappedText;
```

---

### 4. **z-index Conflict** ❌ → ✅
**Πρόβλημα:** Οι SVG γραμμές (`#svgPaths`) είχαν `z-index: 5`, ενώ οι κάρτες `.cards` είχαν `z-index: 10`.
**Συμπτώματα:**
- Γραμμές εμφανίζονταν **πάνω από τις κάρτες**
- Οι γραμμές δεν φαίνονταν
**Διόρθωση:**
```css
#svgPaths { z-index: 1; }   /* Πίσω από τις κάρτες (z-index: 10) */
.cards { z-index: 10; }      /* Μπροστά */
#world3d { z-index: -1; }     /* Πιο πίσω */
```

---

### 5. **Διαγραφή Αρχείων** ❌ → ✅
**Πρόβλημα:** Τα αρχεία `css/styles.css` και `js/script.js` **διαγράφηκαν κατά λάθος** κατά τις δοκιμές.
**Συμπτώματα:**
- `404 Not Found` για CSS και JS
- `MIME type text/html` (ο browser διάβαζε το index.html αντί για τα αρχεία)
**Διόρθωση:** Ξαναγράφη των αρχείων με σωστό περιεχόμενο.

---

### 6. **Script Loading Order** ❌ → ✅
**Πρόβλημα:** Τα GSAP scripts φορτώνονταν με `defer`, αλλά η καταχώρηση των plugins γινόταν **πριν φορτωθούν τα αρχεία**.
**Συμπτώματα:**
- `SplitText is not defined` παρά την ύπαρξη του αρχείου
**Διόρθωση:**
- Φόρτωση των GSAP scripts **συνχρονικά** (χωρίς `defer`)
- Καταχώρηση των plugins **αμέσως μετά** τη φόρτωση των scripts

---

### 7. **InnerHTML vs DOM API** ❌ → ✅
**Πρόβλημα:** Χρήση `innerHTML` για δημιουργία spans μπορούσε να προκαλέσει problems με special characters (`<`, `>`, `&` κ.λπ.).
**Συμπτώματα:**
- Special characters (π.χ. `<` στο κώδικα HTML) μπορούσαν να ερμηνευτούν λάθος
**Διόρθωση:** Χρήση **DOM API** για ασφαλή δημιουργία elements:
```javascript
// ΛΑΘΟΣ:
tp.innerHTML = chars.map(c => `<span>${c}</span>`).join('');

// ΣΩΣΤΟ:
let span = document.createElement('span');
span.textContent = c;
span.style.opacity = '0';
tp.appendChild(span);
```
*(Στη τελική έκδοση χρησιμοποιήθηκε `innerHTML` με σωστή escape, αλλά το DOM API είναι ασφαλέστερο)*

---

### 8. **ScrollTrigger Misuse** ❌ → ✅
**Πρόβλημα:** Χρήση `gsap.to("body", {...})` μόνο για να καταχωρήσουμε το ScrollTrigger (χωρίς πραγματικό animation).
**Συμπτώματα:**
- Περίτrano code
- `scrub: true` χωρίς λόγο
**Διόρθωση:** Χρήση `ScrollTrigger.create()`:
```javascript
// ΛΑΘΟΣ:
gsap.to("body", {
    scrollTrigger: { trigger: "body", scrub: true, ... }
});

// ΣΩΣΤΟ:
ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => { ... }
});
```

---

### 9. **Hardcoded Arrays** ❌ → ✅
**Πρόβλημα:** Τα `charElements` και `hasWritten` είχαν **hardcoded μέγεθος 3**, αλλά υπάρχουν **4 κάρτες**.
**Συμπτώματα:**
- Η 4η κάρτα (JS) δεν είχε animation
**Διόρθωση:** Δυναμική δημιουργία των arrays:
```javascript
// ΛΑΘΟΣ:
let charElements = [[],[],[]]; // Hardcoded για 3 κάρτες

// ΣΩΣΤΟ:
let charElements = []; // Δυναμικό μέγεθος
codeDivs.forEach((codeDiv, i) => {
    charElements[i] = []; // Δημιουργία όσων χρειάζονται
});
```

---

### 10. **Header Flex Container Issue** ❌ → ✅
**Πρόβλημα:** Το `<header class="type">` είναι **flex container**. Αν βάζαμε τα `.char` απευθείας μέσα, κάθε χαρακτήρας γινόταν **flex item** → όλα σε μια γραμμή χωρίς κενά.
**Συμπτώματα:**
- Το κείμενο "The best place..." εμφανίζονταν ως "Thebestplace..."
**Διόρθωση:**
- Κράτησα το header ως είναι (χωρίς splitting)
- μόνο split τα `<code>` elements που δεν είναι flex containers

---

### 11. **Ενιαίο Πορτοκαλί Theme (μοναδική version)** ✅
**Ιστορικό:** Αρχικά υπήρχε toggle switch για εναλλαγή μεταξύ της έγχρωμης (multicolor) version και μιας πορτοκαλί monochrome version — που από λάθος ήταν labeled ως "B&W".
**Τελική απόφαση:** Η **έγχρωμη version διαγράφηκε εντελώς** και το πορτοκαλί theme είναι πλέον η **μοναδική/κύρια version**. Το toggle αφαιρέθηκε.
**Τι αφαιρέθηκε:**
- HTML: `.theme-toggle` markup, inline fallback listener, `#cl1` multicolor SVG gradient
- CSS: όλο το `.bw-mode` block και τα styles του toggle (`.toggle-switch`, `.slider`, `.toggle-label`)
- JavaScript: η συνάρτηση `setupThemeToggle()`

**Παλέτα Χρωμάτων (μοναδικό theme):**
- Background: `#0f0f0f` (βαθύ σχεδόν μαύρο)
- Cards: `#1a120f` → `#120c08` (καφέ-πορτοκαλί gradients)
- Card Glow: `rgba(255, 102, 0, 0.08)` + `backdrop-filter: blur(8px)`
- Text Gradients: `#ff8c42` → `#ffb366` → `#ff9955` → `#ff6600`
- SVG Paths: `#ff8c42` (ζωντανό πορτοκαλί)
- Tablet Border: `#ff6600`

---

### 12. **Brand Badge Integration** ✅
**Πρόσθεση:** Προσθήκη brand badge "a noustelos studio project />" στο top της σελίδας.
**Λεπτομέρειες:**
- Χρώμα: Πορτοκαλί (`#ff8c42`)
- Στυλ: Monospace/terminal αισθητική με `Source Code Pro` font
- Τοποθέτηση: Κεντραρισμένο στην κορυφή της σελίδας
- Link: `https://noustelos.gr` με `target="_blank"` και `rel="noopener noreferrer"`
**Υλοποίηση:**
- Δημιουργία `<header class="brand-badge">` με το link
- Στυλ στο `.brand-badge` και `.brand-badge a`

---

### 13. **Top Bar Layout** ✅
**Ιστορικό:** Το brand badge είχε αρχικά τοποθετηθεί **μέσα** στο theme toggle element, κάτι που έκανε το toggle μη clickable.
**Λύση τότε:** Κοινός `top-bar` wrapper με flex layout και ξεχωριστά elements για badge / toggle.
**Σήμερα:** Με την αφαίρεση του toggle, το `top-bar` κρατάει μόνο το brand badge:
```css
.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem 2rem;
    z-index: 9999;
}
```

---

### 14. **Glassmorphism Card Styling & Reversion** ❌ → ✅
**Λάθος:** Προσπάθεια εφαρμογής glassmorphism styling μόνο στην πρώτη κάρτα.
**Πρόβλημα:** Η πρώτη κάρτα έχασε την διαφάνεια και την ομοιομορφία με τις άλλες.
**Συμπτώματα:**
- Η πρώτη κάρτα είχε διαφορετικό visual styling (glassmorphism background)
- Οι άλλες κάρτες είχαν το αρχικό gradient styling
- Έλλειπε ομοιογενής εμφάνιση
**Διόρθωση:**
1. **Αρχικά:** Εφαρμογή glassmorphism στην πρώτη κάρτα (#codepen)
2. **Μετά:** Κατάργηση όλων των special styles και ενοποίηση όλων των καρτών
3. **Τελική λύση:** Όλες οι κάρτες χρησιμοποιούν τα ίδια masks:
   ```css
   .card {
       mask-image: url(#block), url(#htmlMask);
   }
   .card::before {
       mask: url(#htmlMask2);
   }
   ```

---

### 15. **Card Content & ID Management** ❌ → ✅
**Λάθος:** Αλλαγή του id της πρώτης κάρτας από `codepen` σε `html` δημιουργώντας διπλότυπο.
**Πρόβλημα:** Δύο κάρτες με id="html" στο ίδιο document.
**Συμπτώματα:**
- Invalid HTML (διπλότυπα IDs)
- Απρόβλεπτο behavior των styles
**Διόρθωση:**
- Επανεκχώρηση των σωστών IDs: `codepen`, `html`, `css`, `js`
- Αφαίρεση του κειμένου από την πρώτη κάρτα για ομοιομορφία

---

### 16. **Inline Style Cleanup** ❌ → ✅
**Λάθος:** Προσθήκη inline styles και `!important` rules προσωρινά.
**Πρόβλημα:** Δύσκολη συντήρηση και προσπάθεια override των styles.
**Συμπτώματα:**
- Δύσκολος καθαρισμός και συγχρονισμός
- Αντιπαραγωγικό CSS
**Διόρθωση:**
- Αφαίρεση όλων των inline styles από τις κάρτες
- Κεντρικοποίηση όλων των styles στο `styles.css`
- Χρήση class-based styling αντί για ID-specific

### 17. **Επέκταση σε 9 Κάρτες & Tiled SVG Paths** ✅
**Πρόσθεση:** Οι κάρτες αυξήθηκαν από 4 σε **9**, με ίδιο styling και ίδιο animation πίσω τους.
**Πρόβλημα:** Τα 4 `linePath` ήταν σχεδιασμένα χειροκίνητα για καμβά **2000px**. Με 9 κάρτες (4500px) οι γραμμές τελείωναν στο 45% της σελίδας.
**Απορριφθείσα λύση:** Vertical stretch με `viewBox` + `preserveAspectRatio="none"` → παραμόρφωνε τις καμπύλες (οι στρογγυλεμένες γωνίες γίνονταν ελλείψεις).
**Λύση: tiling του ίδιου path 3 φορές σε ένα ενιαίο, συνεχές path.**
1. Μετατροπή των λίγων **absolute** εντολών σε relative, ώστε το σώμα του path να είναι επαναλήψιμο:
   - `H 105` → `h -354` (path01), `h -348` (path02), `h -332` (path03)
   - `L 277,653` → `l -182,-2` και `C 158,653 77,762 77,849` → `c -119,0 -200,109 -200,196` (path03)
   - `C 544,175 577,238 577,330` → `c 96,2 129,65 129,157` κ.λπ. (path04)
2. Προσθήκη **οριζόντιου connector** σε κάθε ραφή, ώστε το path να ξαναρχίζει στο σωστό x:
   `h 1` (path01), `h -72` (path02), `h 50` (path03), `h 177` (path04)
3. Τελικό `d` = `moveto + body + (connector + body) × 2`

**Γιατί έχει σημασία:** Είναι **ένα** αδιάσπαστο path, όχι 3 αντίγραφα. Έτσι το `stroke-dasharray` κυλάει συνεχόμενα χωρίς κόψιμο στις ραφές.

**Συνοδευτικές αλλαγές:**
- `main` height: `2000px` → **`4500px`** (9 × [450 card + 25 + 25 margins])
- `#svgPaths` height: `2000px` → **`4600px`** (και στο `height` attribute του SVG)
- `js/script.js`: `--strokeDashoffset` από `-2400` σε **`-7200`** (3×, όσο και το μήκος των paths) ώστε η ταχύτητα του animation σε σχέση με το scroll να μείνει **ίδια**

**Επαλήθευση:**
- Path evaluator επιβεβαίωσε ότι κάθε relative σώμα καταλήγει στο **ίδιο ακριβώς σημείο** με το πρωτότυπο και ότι κάθε connector επιστρέφει στο αρχικό x
- Headless render με solid stroke → η γραμμή περνά συνεχόμενα πίσω και από τις 9 κάρτες
- Headless render με `--strokeDashoffset: -3600` (50% scroll) → το πακέτο των dashes βρίσκεται πίσω από την **5η** κάρτα, δηλαδή σωστός συγχρονισμός σε όλο το μήκος

**IDs καρτών:** `codepen`, `html`, `css`, `js`, `react`, `vue`, `node`, `ts`, `git` (labels μόνο — όλες μοιράζονται το ίδιο mask/styling)

---

---

### 18. **Infinity Finale** ✅
**Πρόσθεση:** Οι 4 γραμμές δεν κόβονται πια στο τέλος της σελίδας — συγκλίνουν κάτω από την τελευταία κάρτα σε **ένα σημείο** και ανοίγουν σε **4 ένθετους λημνίσκους** (σύμβολο απείρου).
**Γεωμετρία:**
- Κάθε path κόβεται στο `y=4400` (μόλις κάτω από την 9η κάρτα) και συνεχίζει με καμπύλη σύγκλισης προς το `(364, 4800)`
- Η ουρά ξεκινά συνεχίζοντας την **εφαπτομένη** της γραμμής στο σημείο κοπής, ώστε να μη φαίνεται ραφή
- Τα 4 σημεία κοπής βγαίνουν μοιρασμένα: `x=707`, `285`, `77`, `29`
- Οι 4 λημνίσκοι είναι ομόκεντροι με ημι-πλάτη `180 / 240 / 300 / 355` και μοιράζονται το ίδιο σημείο τομής
- Οι εφαπτόμενες στο σταυρωτό σημείο είναι **συνεχείς**, οπότε το φως περνά ομαλά χωρίς γωνία

**Animation σε τρία στρώματα:**
1. Τα πακέτα των γραμμών φτάνουν μέσα στο σύμβολο (μήκος με `getTotalLength()`, ώστε να φτάνουν **ταυτόχρονα**)
2. Οι λημνίσκοι σχεδιάζονται με scroll, με stagger ώστε να ανοίγουν διαδοχικά προς τα έξω
3. **Μετά:** κάθε loop έχει runner light σε δική του ταχύτητα (6.5s → 11.3s) και δικό ρυθμό αναπνοής — δεν συγχρονίζονται ποτέ

---

### 19. **Performance: Blur σε Τεράστια Επιφάνεια** ❌ → ✅
**Λάθος:** Τοποθέτησα το finale (halo, texture, 8 paths) μέσα στο `#svgPaths`.
**Πρόβλημα:** Το `#svgPaths` έχει `filter: blur(1px)` και είναι **740×5200px**. Κάθε animated στοιχείο μέσα του ανάγκαζε τον browser να ξανακάνει blur **3.8 εκατομμύρια pixels ανά frame**.
**Συμπτώματα:**
- Πάγωσε **ολόκληρο** το ScrollTrigger — όχι μόνο το finale, αλλά και οι γραμμές (`lineOff=[0|0|0|0]`)
- `ticks=10` σε 2 δευτερόλεπτα (φυσιολογικά ~120)
- **Δεν ήταν JS error** — τίποτα δεν πετούσε exception
**Διόρθωση:**
1. Το finale μετακινήθηκε σε δικό του **`#svgFinale`**, 740×800px, με `viewBox="0 4450 740 800"` ώστε να κρατήσει τις ίδιες συντεταγμένες → blurred επιφάνεια **6.5× μικρότερη**
2. Τα 16 κύματα ομαδοποιήθηκαν σε 4 groups → 4 animated transforms αντί για 16

**Κανόνας:** *Μην βάζεις animated περιεχόμενο μέσα σε φιλτραρισμένη επιφάνεια μεγαλύτερη από όσο χρειάζεται.*

---

### 20. **Hero (.dev αισθητική)** ✅
**Ιστορικό:** Πρώτη εκδοχή ήταν WebGL shader (domain-warped fractal noise) μέσα σε πλαίσιο 740px. Καταργήθηκε εντελώς — το πλαίσιο έκοβε τη ροή των γραμμών και το animation ήταν πολύ λεπτομερές.
**Τελική μορφή:**
- **Full-bleed**, χωρίς πλαίσιο
- Background: το **ίδιο** wave texture με το finale — η `buildTexture()` γενικεύτηκε σε **`buildWaves(group, config)`** και καλείται δύο φορές (πλατύ/αργό στο hero, σφιχτό/αχνό στο finale)
- Τίτλος σε **Big Shoulders Display 700**, uppercase, κούφιος με `-webkit-text-stroke: 2px`
- Blinking caret + tagline `// scroll to run`

**Γιατί αυτή η γραμματοσειρά:** Το "HTML" στις κάρτες **δεν είναι γραμματοσειρά** — είναι σχεδιασμένο path (`#htmlIcon`) που το `#htmlMask2` αποκαλύπτει ως δαχτυλίδι. Αναλογία γράμματος: **44×109 μονάδες (0.40)**, δηλαδή πολύ στενό. Το Big Shoulders Display είναι το κοντινότερο στον ίδιο άξονα. Το πάχος ακμής κουμπώθηκε αναλογικά: η κάρτα έχει ~1.8% του ύψους, τα 2px στα 126px δίνουν 1.6%.

**Το glow:** `text-shadow` σχεδιάζεται από το σχήμα του γλύφου **ακόμα και με διάφανο γέμισμα** — γι' αυτό δουλεύει πάνω σε κούφια γράμματα.

---

### 21. **Γραμμές που Πηγάζουν από το Hero** ✅
**Πρόσθεση:** Κάθε path αποκτά lead-in από κοινό σημείο `(364, -245)` — τον **ίδιο άξονα x** με το ∞ στο τέλος. Η σελίδα έχει συμμετρία: οι γραμμές γεννιούνται σε ένα σημείο και πεθαίνουν σε ένα σημείο.
**Υλοποίηση:** Το `#svgPaths` πήρε `viewBox="0 -560 740 5760"` με `top: -485px`. Το offset του viewBox **διατηρεί κάθε υπάρχουσα συντεταγμένη** — κάρτες και finale δεν κουνήθηκαν.

**Πρόβλημα που προέκυψε:** Χωρίς αδιαφανές πλαίσιο, το σημείο σύγκλισης έγινε ορατό και σχημάτιζε **βέλος προς τα πάνω** — αντίθετα από το "scroll down".
**Διόρθωση:** `#lineFade`, ένα **stroke gradient** (όχι μάσκα): opacity 0 στην πηγή, γεμίζει καθώς κατεβαίνει. Η ένωση διαλύεται και οι γραμμές *πηγάζουν*.
**Γιατί gradient και όχι mask:** Η μάσκα θα ξαναέφερνε το πρόβλημα του #19. Το gradient είναι στατικό και δεν κοστίζει τίποτα.

---

### 22. **Letter-spacing που Δεν Έτρεχε Ποτέ** ❌ → ✅
**Λάθος:** Το letter-spacing settle του hero fade-in δηλώθηκε στο `@keyframes heroIn`, που εφαρμόζεται στο `.hero-content`.
**Πρόβλημα:** Και το `.hero-title` και το `.hero-tag` ορίζουν **δικό τους** `letter-spacing`, που υπερκαλύπτει την κληρονομούμενη animated τιμή. Το animation έτρεχε αλλά δεν είχε **κανένα** αποτέλεσμα.
**Διόρθωση:** Ξεχωριστό `@keyframes titleSettle` **πάνω στον ίδιο τον τίτλο**.
**Επαλήθευση:** `32.76px → 7.60px → 1.72px`

**Κανόνας:** *Animated inherited property δεν φτάνει σε παιδί που ορίζει δική του τιμή.*

---

### 23. **Επαλήθευση Animation σε Headless** ⚠️
**Πρόβλημα:** Το headless Chrome με `--virtual-time-budget` **παγώνει τα ρολόγια των animations** μη-ντετερμινιστικά. Μετρήσεις όπως "δεν κινείται" είναι **artifact**, όχι bug.
**Ενδείξεις:**
- GSAP: προχώρησε `0.03s` σε 3s πραγματικού χρόνου (6 → 7 frames)
- Web Animations API: `state=running` με σωστά durations, αλλά `currentTime` κολλημένο
- Το ίδιο test έδινε άλλοτε σωστά και άλλοτε μηδενικά αποτελέσματα

**Σωστή μέθοδος — οδήγησε τα ρολόγια χειροκίνητα:**
```javascript
// CSS animations
anim.currentTime = duration * 0.5;
// GSAP
gsap.globalTimeline.time(4);
// ScrollTrigger (περνάει τα updates του μέσα από το ticker του GSAP)
window.scrollTo(0, document.body.scrollHeight);
ScrollTrigger.update();
```
**Προσοχή:** `MAINp=0.00` μετά από scroll **δεν σημαίνει regression** — σημαίνει ότι το ticker δεν πρόλαβε. Πάντα κάνε `ScrollTrigger.update()` πριν διαβάσεις.

---

## 📝 Σημαντικές Σημειώσεις (Για να μην ξαναγίνουν)

### ✅ **Best Practices για Μέλλον**

1. **Πάντα χρησιμοποιεί standard HTML tags** (`<div>`, `<span>`, κ.λπ.) αντί για custom tags.
2. **Μετατρέπε SCSS σε CSS** πριν το χρησιμοποιήσεις σε `.css` αρχεία.
3. **Έλεγξε τα CDN URLs** πριν τα χρησιμοποιήσεις (π.χ. `SplitText.min.js` **δεν υπάρχει δωρεάν**).
4. **Χρησιμοποίει τοπικά αρχεία** για κρίσιμες βιβλιοθήκες (GSAP, κ.λπ.) για να αποφύγεις CDN blocks.
5. **Χρησιμοποίει `z-index` σωστά**:
   - Background: `z-index: -1`
   - Middle elements (SVG paths): `z-index: 1-9`
   - Front elements (cards): `z-index: 10+`
6. **Χρησιμοποίει DOM API** αντί για `innerHTML` όταν έχεις special characters.
7. **Διαβάζε το console** για errors πριν κάνεις commit.
8. **Πάντα κάνε backup** πριν κάνεις μαζικές αλλαγές.
9. **Μη βάζεις animated περιεχόμενο σε φιλτραρισμένη επιφάνεια** μεγαλύτερη από
   όσο χρειάζεται — το `filter` ξανασχεδιάζεται ολόκληρο σε κάθε frame (*Fix #19*).
10. **Το `viewBox` offset είναι φίλος σου**: επεκτείνει τον καμβά χωρίς να
    μετακινήσει τίποτα από όσα υπάρχουν ήδη (*Fix #21*).
11. **Animated inherited property δεν φτάνει σε παιδί** που ορίζει δική του
    τιμή — δήλωσέ το εκεί που πρέπει να ισχύσει (*Fix #22*).
12. **Μέτρα μήκη με `getTotalLength()`** αντί για hardcoded τιμές: οι διαδρομές
    αλλάζουν, οι σταθερές ξεχνιούνται.
13. **Μην εμπιστεύεσαι το headless για χρονικά animations** — οδήγησε τα ρολόγια
    χειροκίνητα (*Fix #23*).

---

### ❌ **Common Pitfalls να Αποφεύγεις**

| Παγίδα | Λύση |
|--------|------|
| Custom HTML tags | Χρήση `<div class="...">` |
| SCSS syntax σε CSS | Μετατροπή σε plain CSS |
| CDN dependencies | Λocal files ή εναλλακτικά CDNs |
| Hardcoded array sizes | Δυναμική δημιουργία |
| InnerHTML with special chars | DOM API |
| z-index conflicts | Σωστή ιεραρχία |
| Defer + early plugin use | Σωστή σειρά φόρτωσης |
| Duplicating element IDs | Μοναδικά IDs για κάθε element |
| Inline !important overrides | Κεντρικό CSS με κλάσεις |
| Mixing brand and toggle elements | Ξεχωριστούς containers για κάθε λειτουργία |

---

## 🛠 Οδηγίες Ανάπτυξης

### Προσθήκη Νέας Κάρτας
1. Πρόσθεσε το HTML:
```html
<div class="cardWrapper">
    <div class="card" id="new-card">
        <code class="type">
            <dl>
                <dt><span class="tp">...</span></dt>
            </dl>
        </code>
    </div>
</div>
```
2. Πρόσθεσε το CSS στη `.card#new-card` (βάση των υφιστάμενων variants).
3. Το JavaScript θα το πιάσει αυτόματα.
4. **Ενημέρωσε τα ύψη** — δες τον πίνακα σταθερών παρακάτω.
5. Αν οι κάρτες ξεπεράσουν το μήκος των SVG paths, πρόσθεσε άλλο ένα tile στο `d` (βλ. *Fix #17*).

---

### ⚠️ Συνδεδεμένες Σταθερές Layout

Αυτές οι τιμές **εξαρτώνται μεταξύ τους**. Αν αλλάξει ο αριθμός των καρτών ή το ύψος
του hero, πρέπει να ενημερωθούν **όλες**:

| Τιμή | Πού | Τι σημαίνει |
|---|---|---|
| `510px` | `.hero { height }` | Σταθερό επίτηδες — το `#svgPaths` μπαίνει μέσα του με hardcoded offset |
| `4500px` | — | 9 κάρτες × 500px (450 card + 2×25 margin) |
| `5350px` | `main { height }` | 4500 + χώρος για το finale |
| `-485px` | `#svgPaths { top }` | Φτάνει ψηλά πίσω από το hero |
| `0 -560 740 5760` | `#svgPaths viewBox` | Το offset κρατά **αμετάβλητες** όλες τις υπάρχουσες συντεταγμένες |
| `4525px` | `#svgFinale { top }` | 4450 (viewBox) + 75 (offset του `#svgPaths`) |
| `0 4450 740 800` | `#svgFinale viewBox` | Ίδιο σύστημα συντεταγμένων, μικρή επιφάνεια |
| `4800` | `INFINITY_CENTER_Y` (JS) + `d` των paths | Κέντρο του ∞ — **και** το σημείο που τερματίζουν οι 4 γραμμές |
| `-245` | Πηγή lead-in + `#lineFade y1` | Σημείο γέννησης των γραμμών στο hero |

**Δεν χρειάζεται** να ενημερωθούν χειροκίνητα τα μήκη των γραμμών: μετρώνται με
`getTotalLength()` στο runtime.

### Αλλαγή Ταχύτητας Animation
Στο `js/script.js`, άλλαξε το `stagger`:
```javascript
stagger: 0.01   // Γρήγορο
stagger: 0.03   // Αργό (πιο θεατρικό)
stagger: 0.005  // Πολύ γρήγορο
```

### Αλλαγή Χρωμάτων
Στο `css/styles.css`, άλλαξε τα gradients:
- `#svgPaths use { stroke: ... }` (χρώμα των animated γραμμών)
- `background` στις κάρτες
- `background` στο `#tablet`

---

## 🔗 Useful Links
- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [CodePen Demo (Original)](https://codepen.io/ikrprojects/pen/KwgGBRp)
- [Repository](https://github.com/noustelos/run_logic)

---

## 🎯 Φιλοσοφία Project

**Προτίμηση:** **Απλές λύσεις > Over-engineering**

- ✅ **Minimal dependencies** (μόνο GSAP + ScrollTrigger)
- ✅ **Manual implementations** (π.χ. χειροκίνητο SplitText αντί για plugin)
- ✅ **Local files** αντί για CDN (αποφυγή blocks)
- ✅ **Plain CSS** αντί για SCSS (συμβατότητα)
- ✅ **Standard HTML tags** αντί για custom elements

**Αποφύγε:**
- ❌ Υπερβολική χρήση βιβλιοθηκών
- ❌ Complex build systems (Webpack, Vite κ.λπ.) για απλά projects
- ❌ External dependencies αν μπορούν να αποφευχθούν

---

## ⚠️ Σημαντικά
- **SplitText** στο GSAP **δεν είναι δωρεάν** για εμπορική χρήση. Η χειροκίνητη υλοποίηση μας **δεν έχει αυτόν τον περιορισμό**.
- **GSAP Core** (3.12.2) περιέχει πολλά plugins built-in, αλλά **not all** (π.χ. ScrollTrigger χρειάζεται ξεχωριστό αρχείο).
- **Πάντα έλεγξε τα licenses** πριν χρησιμοποιήσεις μια βιβλιοθήκη σε production.

---

*Last updated: 2026-09-06
*Philosophy: Keep it simple*
*New: Full-bleed .dev hero - wave texture, outlined title, lines emanating from a single source
*New: Infinity finale - four nested lemniscates that never stop moving
*New: 9 cards (from 4) with tiled, continuous SVG paths
*New: Orange theme is now the single/main version
*Removed: Color version and the theme toggle switch
*Fixed: Blur on an oversized surface froze every scroll animation (Fix #19)
*Fixed: Hero letter-spacing animation that never applied (Fix #22)

---

## 🤖 Collaboration with Claude Code

**Live Sandbox:** Αυτό το repository χρησιμοποιείται ως **live sandbox** για συνεργασία με τον Claude Code.

**Workflow:**
1. Ο χρήστης ζητά αλλαγές/βελτιώσεις
2. Ο Claude Code υλοποιεί τις αλλαγές **λοκαλά**
3. Ο Claude Code κάνει **commit & push** 
4. Οι αλλαγές είναι **live** στο GitHub αμέσως μετά

**Commands που χρησιμοποιώ:**
```bash
cd /Users/nikoskaradimas/Desktop/RUN_LOGIC
git add .
git commit -m "[_message_]"
git push origin main
```

**Σημείωση:** Όλες οι αλλαγές που κάνω **πηγαίνουν live** μετά το push.
