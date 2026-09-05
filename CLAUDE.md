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

- **Αποδεικνύω ότι δούλεψε**:
  - Εκτέλεσε tests (εάν υπάρχουν) και σύγκρινε αποτελέσματα.
  - Αν δεν υπάρχουν tests, δειξέ το output ή το behavior της αλλαγής.

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
- [ ] Διορθώσεις βέλτιστων πρακτικών στον κώδικα
- [ ] Προσθήκη σχολίων στον κώδικα

### Medium Priority  
- [x] Προσθήκη νέων καρτών — 9 κάρτες συνολικά (2026-09-05)
- [ ] Προσθήκη πραγματικού περιεχομένου στις 9 κάρτες (τώρα είναι άδεια placeholders)
- [ ] Βελτίωση των animations

### Low Priority
- [ ] Δημιουργία demo page
- [ ] Μετατροπή σε React/Vue component

---

## 🛠 Setup για Claude Code

### Λocal Development
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
