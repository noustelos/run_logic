# Claude Code Guidelines

> **Repository:** [https://github.com/noustelos/run_logic](https://github.com/noustelos/run_logic)
> **Live Sandbox:** ✅ Το project είναι live και χρησιμοποιείται για συνεργασία

Αυτό το αρχείο περιέχει **οδηγίες για τον Claude Code agent** καθώς και **εργασίες σε εκκρεμότητα (pending tasks)** για το project *Run Logic*.

---

## 🔄 Collaboration Workflow

**Όταν ο χρήστης ζητάει "commit and push":**
1. ⏳ Υλοποιώ τις αλλαγές **λοκαλά** στο `/Users/nikoskaradimas/Desktop/RUN_LOGIC`
2. ✅ Κάνω **`git add .`**
3. ✅ Κάνω **`git commit -m "[περιγραφή]"`**
4. ✅ Κάνω **`git push origin main`**
5. 🌐 Οι αλλαγές είναι **live** στο GitHub **αμέσως μετά**

**Σημείωση:** Μη ζητάς επιβεβαίωση πριν από commit/push - ο χρήστης έχει ήδη δείξει ότι το site είναι live sandbox.

---

## 📌 Κανόνες για τον Claude Code

- **Πάντα ζήτα επιβεβαίωση** πριν εκτελέσεις ενέργειες με μεγάλο "blast radius":
  - `git push` (εκτός αν ζητηθεί εξωριστικά "commit and push")
  - `git reset --hard`, `rm -rf`, κ.λπ.
  - Δημιουργία/διαγραφή κρίσιμων αρχείων

- **Διάβασε πρώτα, τότε ενεργήσε**:
  - Μην τροποποιείς ένα αρχείο χωρίς να το έχεις διαβάσει στην τρέχουσα session.
  - Πάντα ελέγχε τις εξαρτήσεις (π.χ. αναζήτηση `grep` για χρήσεις μια συνάρτησης πριν την αλλάξεις).

- **Minimal changes**:
  - Μη αγγίζεις κώδικα που δεν σχετίζεται με το task.
  - Τα πράγματα που φαίνονται "περίτρανα" μπορεί να είναι load-bearing.

- **Οι σταθερές του layout είναι συνδεδεμένες**:
  - Πριν αλλάξεις ύψος hero ή αριθμό καρτών, δες τον πίνακα
    *Συνδεδεμένες Σταθερές Layout* στο README.
  - Τα μήκη των γραμμών **δεν** είναι σταθερές — μετρώνται με `getTotalLength()`.

- **Αποδεικνύω ότι δούλεψε**:
  - Εκτέλεσε tests (εάν υπάρχουν) και σύγκρινε αποτελέσματα.
  - Αν δεν υπάρχουν tests, δειξέ το output ή το behavior της αλλαγής.

- **Cache Busting σε CSS / JS**:
  - Κάθε φορά που τροποποιείς το `css/styles.css` ή το `js/script.js`, αύξησε το `?v=N` στο `index.html` (`href="css/styles.css?v=..."`, `src="js/script.js?v=..."`) ώστε το live site να μη χρειάζεται hard refresh.

- **Γλώσσα**:
  - Οδηγίες και κώδικας στα **Ελληνικά** (εξαιτίας του ότι το project είναι ελληνικό).
  - Χρήσιμοποιεί τεχνικούς όρους στα Αγγλικά όταν χρειάζεται.

---

## 📝 φιλοσοφία Project

**Προτίμηση:** **Απλές λύσεις > Over-engineering**

- ✅ **Minimal dependencies**
- ✅ **Manual implementations** όταν είναι απλό
- ✅ **Local files** αντί για CDN
- ✅ **Plain CSS** αντί για SCSS
- ✅ **Standard HTML tags**

---

## 📝 Pending Tasks

### High Priority
- [x] Διορθώσεις βέλτιστων πρακτικών στον κώδικα (2026-11-10)
- [ ] Προσθήκη σχολίων στον κώδικα
- [ ] Έλεγχος του landing σε πραγματικές συσκευές (το headless δεν επαληθεύει χρονικά animations — βλ. README *Fix #23*)

### Medium Priority  
- [x] Προσθήκη νέων καρτών — 9 κάρτες συνολικά (2026-09-05)
- [x] Hero με outlined τίτλο — αφαιρέθηκε το wave texture και το film grain (2026-11-10)
- [x] Αλλαγή τίτλων καρτών από `HTML` σε αριθμούς `1`–`9` (`#card1`–`#card9`) (2026-11-10)
- [x] Infinity finale με 4 ένθετους λημνίσκους (2026-09-06)
- [ ] Προσθήκη πραγματικού περιεχομένου στις 9 κάρτες (τώρα είναι άδεια placeholders)
- [ ] Το `// scroll to run` στο hero είναι placeholder copy — να οριστικοποιηθεί
- [ ] Βελτίωση των animations

### Low Priority
- [ ] Δημιουργία demo page
- [ ] Μετατροπή σε React/Vue component

---

## 🛠 Setup & Περιβάλλον Ανάπτυξης

### Υλικό (Dev Machine)
- **Συσκευή:** MacBook Air M2, 16GB RAM (Apple Silicon — **όχι** Intel i5)
- **OS:** macOS

### Local Development
```bash
cd /Users/nikoskaradimas/Desktop/RUN_LOGIC
python3 -m http.server 8080
```

### Collaboration Commands
```bash
# Πάντα μετά τις αλλαγές:
git add .
git commit -m "[περιγραφή αλλαγών]"
git push origin main
```

---

## 📂 Useful Links
- [Repository](https://github.com/noustelos/run_logic)
- [CodePen Demo (Original)](https://codepen.io/ikrprojects/pen/KwgGBRp)
- [GSAP Documentation](https://greensock.com/docs/)
