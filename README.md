
# Franc Congolais (FC) - Site Officiel

Ce projet est prêt pour le déploiement automatique sur GitHub Pages.

## 🚀 Comment mettre en ligne ?

### 1. Vérifier les fichiers
Assurez-vous d'avoir cette structure de dossiers sur votre ordinateur :
```
/ (racine du projet)
├── public/
│   └── img/
│       └── logo.png  <-- INDISPENSABLE
├── src/
├── package.json
├── vite.config.ts
└── ...
```

### 2. Envoyer sur GitHub (Commandes Terminal)
Ouvrez votre terminal dans le dossier du projet et lancez :

```bash
# 1. Initialiser Git (si ce n'est pas fait)
git init

# 2. Ajouter tous les fichiers
git add .

# 3. Créer la sauvegarde (commit)
git commit -m "Version finale FC Officiel"

# 4. Renommer la branche principale
git branch -M main

# 5. Lier à votre dépôt GitHub (REMPLACEZ PAR VOTRE LIEN SI DIFFÉRENT)
# Si une origine existe déjà, supprimez-la d'abord : git remote remove origin
git remote add origin https://github.com/FrancCongolais/fc.github.io.git

# 6. Envoyer le code
git push -u origin main
```

### 3. Configuration Clé API (Sur le site GitHub)
Pour que l'IA fonctionne :
1. Allez sur votre dépôt GitHub > **Settings** > **Secrets and variables** > **Actions**.
2. Ajoutez un secret nommé `VITE_API_KEY` avec votre clé Gemini.

---

## 🔧 Dépannage (Troubleshooting)

### Erreur: `src refspec main does not match any`
Si vous voyez cette erreur lors du `git push`, cela signifie généralement que vous n'avez pas encore créé de commit.
**Solution :**
Assurez-vous d'avoir exécuté les commandes suivantes AVANT le push :
```bash
git add .
git commit -m "Premier commit"
```
Ensuite, réessayez : `git push -u origin main`

### Le site affiche un écran blanc ?
Vérifiez dans la console du navigateur (F12). Si vous voyez une erreur liée à `import`, assurez-vous que le fichier `vite.config.ts` contient bien `base: '/fc.github.io/'` (ou le nom de votre dépôt).

---

**Le site sera généré automatiquement.**
Lien : https://FrancCongolais.github.io/fc.github.io/
