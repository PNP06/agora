# Agora — Jeu d’esprit critique & éloquence

Agora est une application web statique pour entraîner :

- l’analyse argumentative ;
- la détection de sophismes et biais cognitifs ;
- la formulation de réponses courtes et propres ;
- l’éloquence structurée ;
- l’écoute des objections.

Le jeu fonctionne sans serveur, sans base de données et sans dépendance obligatoire.

## Lancement local

Option 1 — ouvrir directement :

```bash
start index.html
```

Option 2 — serveur local simple :

```bash
npx serve .
```

ou avec Python :

```bash
python -m http.server 5173
```

Puis ouvrir :

```text
http://localhost:5173
```

## Déploiement GitHub Pages

1. Créer un repo GitHub.
2. Ajouter tous les fichiers du dossier.
3. Commit + push.
4. Aller dans `Settings > Pages`.
5. Source : `Deploy from a branch`.
6. Branch : `main`, folder : `/root`.
7. Enregistrer.

## Structure

```text
.
├── index.html      # point d’entrée
├── styles.css      # UX, layout, responsive design
├── app.js          # moteur de jeu, missions, scoring, stockage local
├── package.json    # scripts utiles
├── .gitignore
└── README.md
```

## Modifier ou enrichir les niveaux

Les contenus sont dans `app.js`, tableau `MISSIONS`.

Chaque mission contient :

- `id`
- `title`
- `subtitle`
- `unlockXp`
- `learningGoal`
- `challenges`

Deux types de défis existent :

### 1. Défi `choice`

Question à choix multiples avec score et feedback.

```js
{
  type: "choice",
  label: "Diagnostic",
  prompt: "Quel est le problème principal ?",
  body: "Texte de l’argument",
  options: [
    {
      title: "Réponse",
      text: "Explication courte",
      score: 100,
      skill: "evidence",
      feedback: "Feedback pédagogique"
    }
  ]
}
```

### 2. Défi `build`

Construction d’une intervention avec cartes.

```js
{
  type: "build",
  label: "Construction",
  prompt: "Construis une intervention",
  body: "Sujet",
  target: ["hook", "thesis", "evidence", "concession", "action"],
  cards: [
    { id: "hook", role: "Accroche", text: "...", score: 20 }
  ]
}
```

## Stockage

La progression est stockée dans `localStorage` du navigateur :

```text
agora-critical-eloquence-v1
```

Aucune donnée n’est envoyée vers un serveur.

## Philosophie pédagogique

Le jeu ne cherche pas à produire de la joute verbale vide. Il entraîne des gestes précis :

1. identifier la thèse ;
2. qualifier les preuves ;
3. repérer les inférences fragiles ;
4. répondre à l’objection réelle ;
5. construire une intervention claire ;
6. utiliser la persuasion sans manipulation.

## Pistes d’évolution

- Ajouter un mode duel chronométré.
- Ajouter des missions thématiques : science, politique, travail, réseaux sociaux, santé.
- Ajouter un éditeur de niveaux en JSON.
- Ajouter une synthèse après chaque mission.
- Ajouter une exportation des scores.
- Ajouter un mode classe / atelier.
- Ajouter des cartes de reformulation libre avec évaluation par LLM côté serveur.
