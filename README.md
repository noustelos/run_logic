# Run Logic

> **Repository:** [https://github.com/noustelos/run_logic](https://github.com/noustelos/run_logic)

> **Demo:** Code animation with GSAP, ScrollTrigger, and SVG paths

> **Based on:** [CodePen by ikrprojects](https://codepen.io/ikrprojects/pen/KwgGBRp)

---

## 📌 Περιγραφή

Το *Run Logic* είναι ένα demo project που παρουσιάζει **animated code cards** με τη χρήση:
- **GSAP** (GreenSock Animation Platform) για animations
- **ScrollTrigger** για scroll-based effects
- **SVG paths** για χρωματιστές κινούμενες γραμμές
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
│   ├── script.js           # Main JavaScript (χειροκίνητο SplitText)
│   └── lib/
│       ├── gsap.min.js         # GSAP Core (περιέχει SplitText built-in)
│       └── ScrollTrigger.min.js  # ScrollTrigger plugin
├── README.md               # Αυτό το αρχείο
└── MISTRAL.md              # Οδηγίες για Mistral Vibe & pending tasks
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
-只有 split τα `<code>` elements που δεν είναι flex containers

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

### Αλλαγή Ταχύτητας Animation
Στο `js/script.js`, άλλαξε το `stagger`:
```javascript
stagger: 0.01   // Γρήγορο
stagger: 0.03   // Αργό (πιο θεατρικό)
stagger: 0.005  // Πολύ γρήγορο
```

### Αλλαγή Χρωμάτων
Στο `css/styles.css`, άλλαξε τα gradients:
- `#cl1` (SVG paths gradient)
- `background` στις κάρτες
- `background` στο `#tablet`

---

## 🔗 Useful Links
- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [CodePen Demo (Original)](https://codepen.io/ikrprojects/pen/KwgGBRp)
- [Repository](https://github.com/noustelos/run_logic)

---

## ⚠️ Σημαντικά
- **SplitText** στο GSAP **δεν είναι δωρεάν** για εμπορική χρήση. Η χειροκίνητη υλοποίηση μας **δεν έχει αυτόν τον περιορισμό**.
- **GSAP Core** (3.12.2) περιέχει πολλά plugins built-in, αλλά **not all** (π.χ. ScrollTrigger χρειάζεται ξεχωριστό αρχείο).
- **Πάντα έλεγξε τα licenses** πριν χρησιμοποιήσεις μια βιβλιοθήκη σε production.

---

*Last updated: 2026-09-05*
