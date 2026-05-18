const STORAGE_KEY = "agora-critical-eloquence-v1";

const SKILLS = {
  structure: "Structure",
  evidence: "Preuves",
  clarity: "Clarté",
  rhetoric: "Éloquence",
  listening: "Écoute",
};

const DEFAULT_PROGRESS = {
  xp: 0,
  streak: 0,
  completed: {},
  mastery: {
    structure: 8,
    evidence: 8,
    clarity: 8,
    rhetoric: 8,
    listening: 8,
  },
  history: [],
};

const MISSIONS = [
  {
    id: "boussole",
    icon: "🧭",
    title: "Boussole logique",
    subtitle: "Repérer thèse, preuve, inférence et conclusion.",
    unlockXp: 0,
    minutes: 5,
    difficulty: "Initiation",
    learningGoal: "Différencier affirmation, argument et preuve.",
    challenges: [
      {
        type: "choice",
        label: "Diagnostic",
        prompt: "Quel est le problème principal de cet argument ?",
        body: "« Cette méthode marche : trois personnes que je connais l’ont essayée et elles sont convaincues. »",
        options: [
          {
            title: "Échantillon trop faible et biaisé",
            text: "L’expérience personnelle peut générer une hypothèse, mais elle ne suffit pas à établir une efficacité générale.",
            score: 100,
            skill: "evidence",
            feedback: "Correct. Tu identifies la faiblesse de l’inférence : on généralise depuis quelques cas non contrôlés.",
          },
          {
            title: "Il n’y a aucune conclusion",
            text: "La conclusion est implicite : la méthode serait efficace.",
            score: 20,
            skill: "structure",
            feedback: "Il y a bien une conclusion implicite. Le point faible principal est la qualité de preuve.",
          },
          {
            title: "C’est forcément faux",
            text: "Une preuve faible ne rend pas automatiquement l’énoncé faux.",
            score: 35,
            skill: "clarity",
            feedback: "Attention : critiquer une preuve n’est pas réfuter définitivement la thèse.",
          },
        ],
      },
      {
        type: "choice",
        label: "Architecture argumentative",
        prompt: "Dans la phrase suivante, quelle partie joue le rôle de conclusion ?",
        body: "« Les interruptions augmentent les erreurs et fragmentent l’attention ; il faut donc protéger des plages de travail profond. »",
        options: [
          {
            title: "« Les interruptions augmentent les erreurs »",
            text: "C’est une prémisse causale.",
            score: 35,
            skill: "structure",
            feedback: "C’est une prémisse. Elle soutient la conclusion mais ne la constitue pas.",
          },
          {
            title: "« fragmentent l’attention »",
            text: "C’est une seconde prémisse.",
            score: 25,
            skill: "structure",
            feedback: "C’est un élément de justification, pas la décision proposée.",
          },
          {
            title: "« il faut donc protéger des plages de travail profond »",
            text: "C’est la proposition défendue.",
            score: 100,
            skill: "structure",
            feedback: "Correct. Le marqueur « donc » signale ici le passage vers la conclusion.",
          },
        ],
      },
      {
        type: "choice",
        label: "Hygiène du doute",
        prompt: "Quelle réponse est la plus rationnelle face à une information plausible mais non vérifiée ?",
        body: "Tu entends : « Une étude récente prouve que les gens intelligents dorment moins. »",
        options: [
          {
            title: "Demander la source, le protocole et l’effet mesuré",
            text: "Avant de conclure, on vérifie la source, l’échantillon, la mesure et la taille d’effet.",
            score: 100,
            skill: "evidence",
            feedback: "Correct. C’est une réponse de contrôle qualité, pas une réaction idéologique.",
          },
          {
            title: "Rejeter immédiatement, car cela sonne comme un cliché",
            text: "Le cliché peut être faux, mais l’impression subjective ne suffit pas.",
            score: 35,
            skill: "evidence",
            feedback: "Tu évites la crédulité, mais tu remplaces une preuve par une impression.",
          },
          {
            title: "L’accepter si beaucoup de gens la partagent",
            text: "La popularité n’est pas un critère de validité.",
            score: 20,
            skill: "evidence",
            feedback: "C’est précisément le piège : confondre diffusion sociale et qualité probante.",
          },
        ],
      },
    ],
  },
  {
    id: "sophismes",
    icon: "🎭",
    title: "Arène des sophismes",
    subtitle: "Identifier les manipulations courantes sans devenir cynique.",
    unlockXp: 150,
    minutes: 7,
    difficulty: "Intermédiaire",
    learningGoal: "Nommer le défaut de raisonnement et formuler une correction.",
    challenges: [
      {
        type: "choice",
        label: "Sophisme",
        prompt: "Quel sophisme domine ?",
        body: "« Tu n’es pas médecin, donc ton avis sur cette étude ne vaut rien. »",
        options: [
          {
            title: "Ad hominem circonstanciel / disqualification de statut",
            text: "On attaque la légitimité de la personne au lieu d’évaluer l’argument ou les données.",
            score: 100,
            skill: "rhetoric",
            feedback: "Correct. L’expertise compte, mais elle ne remplace pas l’examen du contenu.",
          },
          {
            title: "Faux dilemme",
            text: "Il n’y a pas ici deux options artificiellement imposées.",
            score: 25,
            skill: "structure",
            feedback: "Le problème n’est pas un choix forcé, mais la disqualification de l’interlocuteur.",
          },
          {
            title: "Pente glissante",
            text: "Aucune chaîne catastrophique n’est avancée.",
            score: 15,
            skill: "clarity",
            feedback: "La pente glissante impliquerait une cascade d’effets non démontrés.",
          },
        ],
      },
      {
        type: "choice",
        label: "Sophisme",
        prompt: "Quelle formulation corrige le mieux le problème ?",
        body: "« Si on accepte une exception aujourd’hui, demain il n’y aura plus aucune règle. »",
        options: [
          {
            title: "« Quelle probabilité réelle relie cette exception à la disparition des règles ? »",
            text: "On demande le mécanisme, les conditions et la probabilité.",
            score: 100,
            skill: "clarity",
            feedback: "Correct. Tu forces la chaîne causale à devenir explicite.",
          },
          {
            title: "« C’est ridicule. »",
            text: "C’est bref, mais cela ne montre pas le défaut de raisonnement.",
            score: 25,
            skill: "rhetoric",
            feedback: "Une bonne réplique n’est pas seulement une punchline : elle doit clarifier.",
          },
          {
            title: "« Les règles ne servent à rien. »",
            text: "Tu changes de thèse et tu t’exposes à un contre-argument facile.",
            score: 10,
            skill: "structure",
            feedback: "Répondre à un excès par l’excès dégrade le niveau de discussion.",
          },
        ],
      },
      {
        type: "choice",
        label: "Biais cognitif",
        prompt: "Quel biais est le plus probable ?",
        body: "Une personne lit uniquement les témoignages qui confirment son opinion et ignore les données contradictoires.",
        options: [
          {
            title: "Biais de confirmation",
            text: "Recherche et pondération sélectives des informations compatibles avec la croyance initiale.",
            score: 100,
            skill: "evidence",
            feedback: "Correct. Le biais agit sur la collecte et l’interprétation des informations.",
          },
          {
            title: "Effet de halo",
            text: "L’effet de halo généralise une impression positive ou négative à d’autres dimensions.",
            score: 30,
            skill: "clarity",
            feedback: "Ici, le mécanisme principal est la sélection d’informations confirmantes.",
          },
          {
            title: "Biais rétrospectif",
            text: "Le biais rétrospectif consiste à croire après coup qu’un événement était prévisible.",
            score: 20,
            skill: "clarity",
            feedback: "Ce n’est pas le mécanisme décrit.",
          },
        ],
      },
    ],
  },
  {
    id: "duel",
    icon: "⚔️",
    title: "Duel d’éloquence",
    subtitle: "Répondre vite, proprement, sans caricaturer l’adversaire.",
    unlockXp: 320,
    minutes: 8,
    difficulty: "Avancé",
    learningGoal: "Combiner écoute, cadrage, concession et réfutation.",
    challenges: [
      {
        type: "choice",
        label: "Réplique",
        prompt: "Choisis la meilleure réponse en réunion.",
        body: "Un collègue dit : « Ton idée est trop théorique. Sur le terrain, ça ne marchera jamais. »",
        options: [
          {
            title: "« Qu’est-ce qui, précisément, bloquerait sur le terrain ? »",
            text: "Tu transformes une objection vague en critère testable.",
            score: 100,
            skill: "listening",
            feedback: "Correct. Tu évites la défense réflexe et tu obtiens une information exploitable.",
          },
          {
            title: "« C’est faux, tu n’as pas compris. »",
            text: "Réponse frontale, faible valeur argumentative.",
            score: 20,
            skill: "rhetoric",
            feedback: "Tu crées une opposition de posture au lieu de clarifier le désaccord.",
          },
          {
            title: "« On verra bien. »",
            text: "Tu repousses le problème sans traiter l’objection.",
            score: 35,
            skill: "structure",
            feedback: "Une réponse efficace doit convertir l’objection en test ou en condition de succès.",
          },
        ],
      },
      {
        type: "choice",
        label: "Éthique rhétorique",
        prompt: "Quelle réponse améliore le débat ?",
        body: "Ton interlocuteur défend une position opposée, mais il soulève un vrai point faible dans ton raisonnement.",
        options: [
          {
            title: "« Tu as raison sur ce point ; je reformule ma position avec cette limite. »",
            text: "Tu renforces ta crédibilité en intégrant l’objection valide.",
            score: 100,
            skill: "listening",
            feedback: "Correct. L’éloquence solide n’est pas l’infaillibilité : c’est l’ajustement public du raisonnement.",
          },
          {
            title: "« Ce détail ne change rien. »",
            text: "Peut-être, mais il faut le démontrer.",
            score: 35,
            skill: "evidence",
            feedback: "Minimiser sans justification affaiblit ton ethos.",
          },
          {
            title: "« On sort du sujet. »",
            text: "Possible seulement si tu montres pourquoi.",
            score: 30,
            skill: "clarity",
            feedback: "Le cadrage peut être légitime, mais ici il évite une objection pertinente.",
          },
        ],
      },
      {
        type: "choice",
        label: "Pathos maîtrisé",
        prompt: "Quelle formulation est la plus persuasive sans manipuler ?",
        body: "Tu veux convaincre une équipe d’adopter une procédure de relecture avant envoi.",
        options: [
          {
            title: "« On perd 6 minutes maintenant pour éviter des corrections publiques plus coûteuses ensuite. »",
            text: "Tu relies effort immédiat, coût futur et intérêt collectif.",
            score: 100,
            skill: "rhetoric",
            feedback: "Correct. La formulation donne un mécanisme, pas seulement une injonction.",
          },
          {
            title: "« Ceux qui refusent ne sont pas professionnels. »",
            text: "Pression identitaire, peu robuste.",
            score: 15,
            skill: "listening",
            feedback: "La culpabilisation peut obéir à court terme mais dégrade la coopération.",
          },
          {
            title: "« Faites-moi confiance. »",
            text: "L’autorité personnelle ne suffit pas.",
            score: 25,
            skill: "evidence",
            feedback: "La confiance peut aider, mais elle ne remplace pas la raison opérationnelle.",
          },
        ],
      },
    ],
  },
  {
    id: "atelier",
    icon: "🏛️",
    title: "Atelier du discours",
    subtitle: "Assembler une intervention courte, claire et difficile à attaquer.",
    unlockXp: 520,
    minutes: 10,
    difficulty: "Atelier",
    learningGoal: "Construire une micro-plaidoirie structurée.",
    challenges: [
      {
        type: "build",
        label: "Construction",
        prompt: "Construis une intervention de 45 secondes pour défendre ce changement :",
        body: "« Réduire les réunions de statut et les remplacer par une note écrite courte. »",
        target: ["hook", "thesis", "evidence", "concession", "action"],
        cards: [
          {
            id: "hook",
            role: "Accroche",
            text: "Aujourd’hui, nous confondons synchronisation et présence en réunion.",
            score: 20,
          },
          {
            id: "thesis",
            role: "Thèse",
            text: "Je propose de garder les réunions pour les arbitrages et de passer le statut simple en note écrite.",
            score: 20,
          },
          {
            id: "evidence",
            role: "Preuve",
            text: "Une note écrite force la clarification, réduit les interruptions et laisse une trace vérifiable.",
            score: 20,
          },
          {
            id: "concession",
            role: "Concession",
            text: "Cela ne remplace pas les discussions difficiles ; cela évite seulement de réunir tout le monde pour de l’information descendante.",
            score: 20,
          },
          {
            id: "action",
            role: "Action",
            text: "Testons pendant deux semaines : une note avant midi, puis réunion seulement si un arbitrage est nécessaire.",
            score: 20,
          },
          {
            id: "attack",
            role: "Attaque",
            text: "Ceux qui aiment les réunions devraient expliquer pourquoi ils veulent faire perdre du temps aux autres.",
            score: -20,
          },
          {
            id: "vague",
            role: "Vague",
            text: "Il faudrait globalement être plus efficace, parce que c’est mieux.",
            score: -10,
          },
        ],
      },
      {
        type: "choice",
        label: "Réécriture",
        prompt: "Quelle phrase est la plus claire et la plus défendable ?",
        body: "Objectif : demander un arbitrage sans agressivité.",
        options: [
          {
            title: "« Il faut décider qui tranche, sur quel critère, et avant quelle date. »",
            text: "Demande précise : décideur, critère, délai.",
            score: 100,
            skill: "clarity",
            feedback: "Correct. Une bonne phrase d’arbitrage réduit l’ambiguïté opérationnelle.",
          },
          {
            title: "« Il faudrait avancer parce que ça bloque. »",
            text: "Compréhensible, mais trop vague.",
            score: 45,
            skill: "clarity",
            feedback: "La phrase exprime une tension, pas une demande traitable.",
          },
          {
            title: "« Si personne ne décide, je ne peux rien faire. »",
            text: "La frustration est visible, mais la demande est moins nette.",
            score: 35,
            skill: "rhetoric",
            feedback: "Tu peux dire la contrainte, mais tu dois formuler le mécanisme de décision attendu.",
          },
        ],
      },
    ],
  },
  {
    id: "grand-oral",
    icon: "🔥",
    title: "Grand oral",
    subtitle: "Boss final : lucidité, structure, réfutation, style.",
    unlockXp: 760,
    minutes: 12,
    difficulty: "Boss",
    learningGoal: "Tenir une position sous objections.",
    challenges: [
      {
        type: "choice",
        label: "Cadrage",
        prompt: "Tu dois défendre une idée controversée. Quel premier geste est le plus solide ?",
        body: "Sujet : « Les outils d’IA doivent être autorisés dans certains devoirs, mais avec transparence. »",
        options: [
          {
            title: "Définir le périmètre : quels devoirs, quels usages, quelles limites",
            text: "Tu évites l’ambiguïté avant de défendre la thèse.",
            score: 100,
            skill: "structure",
            feedback: "Correct. Le cadrage limite les attaques faciles et rend la discussion évaluable.",
          },
          {
            title: "Dire que ceux qui refusent l’IA sont dépassés",
            text: "Tu transformes le débat en conflit d’identité.",
            score: 15,
            skill: "listening",
            feedback: "C’est peut-être efficace devant un public acquis, mais faible pour convaincre.",
          },
          {
            title: "Citer trois bénéfices sans parler des risques",
            text: "Argument incomplet.",
            score: 45,
            skill: "evidence",
            feedback: "Les bénéfices doivent être accompagnés des conditions de contrôle.",
          },
        ],
      },
      {
        type: "choice",
        label: "Objection",
        prompt: "Quelle réponse traite le mieux cette objection ?",
        body: "« Si on autorise l’IA, les élèves ne réfléchiront plus. »",
        options: [
          {
            title: "« Risque réel. C’est pour cela qu’il faut distinguer génération brute, aide à la reformulation et justification personnelle. »",
            text: "Tu reconnais le risque puis tu introduis une classification opératoire.",
            score: 100,
            skill: "listening",
            feedback: "Correct. Tu ne nies pas l’objection ; tu la transformes en règle de conception.",
          },
          {
            title: "« Les élèves trichent déjà, donc autant autoriser. »",
            text: "Raisonnement de résignation.",
            score: 30,
            skill: "evidence",
            feedback: "Constater un usage ne suffit pas à définir un cadre pédagogique.",
          },
          {
            title: "« C’est comme la calculatrice, point final. »",
            text: "Analogie utile mais trop rapide.",
            score: 50,
            skill: "rhetoric",
            feedback: "L’analogie doit expliciter les ressemblances et les différences.",
          },
        ],
      },
      {
        type: "build",
        label: "Final",
        prompt: "Assemble une conclusion persuasive et propre.",
        body: "Sujet : « Former à l’esprit critique plutôt que seulement interdire les outils. »",
        target: ["thesis", "evidence", "concession", "action"],
        cards: [
          {
            id: "thesis",
            role: "Thèse",
            text: "Interdire peut être nécessaire dans certains contextes, mais former reste le levier durable.",
            score: 25,
          },
          {
            id: "evidence",
            role: "Preuve",
            text: "Un élève exposé à des outils sans méthode confond souvent production fluide et raisonnement valide.",
            score: 25,
          },
          {
            id: "concession",
            role: "Concession",
            text: "Il faut donc des zones sans outil pour évaluer les acquis, mais pas faire comme si l’outil n’existait pas.",
            score: 25,
          },
          {
            id: "action",
            role: "Action",
            text: "La règle simple : autoriser quand l’usage est déclaré, discuté et évalué ; interdire quand l’objectif est l’autonomie brute.",
            score: 25,
          },
          {
            id: "slogan",
            role: "Slogan",
            text: "L’avenir appartient aux gens modernes.",
            score: -10,
          },
          {
            id: "mock",
            role: "Moquerie",
            text: "Les paniques morales finissent toujours par perdre.",
            score: -15,
          },
        ],
      },
    ],
  },
];

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return clone(DEFAULT_PROGRESS);
    const parsed = JSON.parse(raw);
    return {
      ...clone(DEFAULT_PROGRESS),
      ...parsed,
      mastery: { ...clone(DEFAULT_PROGRESS).mastery, ...(parsed.mastery || {}) },
      completed: parsed.completed || {},
      history: Array.isArray(parsed.history) ? parsed.history.slice(-12) : [],
    };
  } catch (error) {
    console.warn("[Agora] Progress loading failed", error);
    return clone(DEFAULT_PROGRESS);
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}

const state = {
  screen: "home",
  progress: loadProgress(),
  currentMissionId: null,
  challengeIndex: 0,
  missionScore: 0,
  selected: null,
  feedback: null,
  buildSelection: [],
  showGuide: false,
};

const app = document.querySelector("#app");

function xpLevel(xp) {
  if (xp >= 1000) return "Orateur lucide";
  if (xp >= 760) return "Plaideur";
  if (xp >= 520) return "Architecte";
  if (xp >= 320) return "Répliquant";
  if (xp >= 150) return "Analyste";
  return "Apprenti";
}

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function missionIsUnlocked(mission) {
  return state.progress.xp >= mission.unlockXp;
}

function missionById(id) {
  return MISSIONS.find((mission) => mission.id === id);
}

function currentMission() {
  return missionById(state.currentMissionId);
}

function currentChallenge() {
  return currentMission().challenges[state.challengeIndex];
}

function render() {
  app.innerHTML = `
    ${renderTopbar()}
    ${state.screen === "home" ? renderHome() : ""}
    ${state.screen === "mission" ? renderMission() : ""}
    ${state.screen === "result" ? renderResult() : ""}
    ${renderFooter()}
    ${state.showGuide ? renderGuideModal() : ""}
  `;
  bindEvents();
}

function renderTopbar() {
  return `
    <header class="topbar">
      <div class="brand" role="banner">
        <div class="logo" aria-hidden="true">A</div>
        <div>
          <h1>Agora</h1>
          <p>Esprit critique · éloquence · argumentation</p>
        </div>
      </div>
      <nav class="top-actions" aria-label="Actions principales">
        <button class="btn ghost" data-action="guide">Méthode</button>
        <button class="btn danger" data-action="reset">Réinitialiser</button>
      </nav>
    </header>
  `;
}

function renderHome() {
  const progressToNext = clamp((state.progress.xp % 250) / 250 * 100);
  const completedCount = Object.keys(state.progress.completed).length;
  return `
    <main>
      <section class="hero">
        <div class="panel hero-main">
          <div class="kicker">Jeu pédagogique</div>
          <h2>Penser plus net. Parler plus juste.</h2>
          <p class="hero-text">
            Agora entraîne trois compétences : détecter la faiblesse d’un raisonnement,
            formuler une réponse propre, et construire une intervention persuasive sans manipulation.
          </p>
          <div class="hero-actions">
            <button class="btn primary" data-action="continue">Continuer</button>
            <button class="btn" data-action="guide">Voir les règles du jeu</button>
          </div>
        </div>
        <aside class="panel stats-panel" aria-label="Progression">
          <div class="stat-card">
            <div class="stat-label">Rang actuel</div>
            <div class="stat-value">${escapeHtml(xpLevel(state.progress.xp))}</div>
            <div class="stat-note">${state.progress.xp} XP · ${completedCount}/${MISSIONS.length} arènes terminées</div>
            <div class="progress-bar" aria-label="Progression vers le prochain palier">
              <span style="--value:${progressToNext}%"></span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Série</div>
            <div class="stat-value">${state.progress.streak}</div>
            <div class="stat-note">Réponses solides consécutives</div>
          </div>
        </aside>
      </section>

      <section>
        <div class="section-title">
          <div>
            <h3>Parcours</h3>
            <p>Chaque arène travaille une famille de compétences.</p>
          </div>
          <span class="badge">${MISSIONS.length} arènes</span>
        </div>
        <div class="grid three">
          ${MISSIONS.map(renderMissionCard).join("")}
        </div>
      </section>

      <section>
        <div class="section-title">
          <div>
            <h3>Compétences</h3>
            <p>Le score ne mesure pas une intelligence générale. Il suit des gestes précis.</p>
          </div>
        </div>
        <div class="grid two">
          ${Object.entries(SKILLS).map(([key, label]) => renderSkillCard(key, label)).join("")}
        </div>
      </section>

      <section>
        <div class="section-title">
          <div>
            <h3>Dernières sessions</h3>
            <p>Historique local, stocké uniquement dans le navigateur.</p>
          </div>
        </div>
        <div class="panel result-panel">
          ${renderHistory()}
        </div>
      </section>
    </main>
  `;
}

function renderMissionCard(mission) {
  const unlocked = missionIsUnlocked(mission);
  const done = state.progress.completed[mission.id];
  return `
    <button class="card-button" data-action="start-mission" data-id="${mission.id}" ${unlocked ? "" : "disabled"} aria-label="Mission ${escapeHtml(mission.title)}">
      <div class="card-head">
        <div class="card-icon" aria-hidden="true">${mission.icon}</div>
        ${done ? `<span class="badge good">Terminé · ${done.best}%</span>` : unlocked ? `<span class="badge">${mission.difficulty}</span>` : `<span class="badge lock">${mission.unlockXp} XP</span>`}
      </div>
      <h4>${escapeHtml(mission.title)}</h4>
      <p>${escapeHtml(mission.subtitle)}</p>
      <div class="card-meta">
        <span class="badge">${mission.minutes} min</span>
        <span class="badge">${mission.challenges.length} défis</span>
      </div>
    </button>
  `;
}

function renderSkillCard(key, label) {
  const value = clamp(state.progress.mastery[key] || 0);
  return `
    <article class="info-card">
      <h4>${escapeHtml(label)}</h4>
      <p>${skillDescription(key)}</p>
      <div class="progress-bar" aria-label="${escapeHtml(label)} ${value}%">
        <span style="--value:${value}%"></span>
      </div>
    </article>
  `;
}

function skillDescription(key) {
  const descriptions = {
    structure: "Identifier thèse, prémisses, conclusion, conditions et périmètre.",
    evidence: "Évaluer source, qualité de preuve, inférence et niveau d’incertitude.",
    clarity: "Formuler une idée compréhensible, testable et difficile à détourner.",
    rhetoric: "Utiliser style, rythme, analogie et persuasion sans trahir le raisonnement.",
    listening: "Répondre à l’objection réelle, pas à une caricature commode.",
  };
  return descriptions[key] || "";
}

function renderHistory() {
  if (!state.progress.history.length) {
    return `<p>Aucune session terminée pour l’instant. Lance une première arène.</p>`;
  }

  return `
    <div class="timeline">
      ${state.progress.history.slice().reverse().map((item) => `
        <div class="timeline-item">
          <strong>${escapeHtml(item.title)} · ${item.score}%</strong>
          <span>${escapeHtml(item.date)} · +${item.xp} XP · ${escapeHtml(item.note)}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function renderMission() {
  const mission = currentMission();
  const challenge = currentChallenge();
  const completion = Math.round((state.challengeIndex / mission.challenges.length) * 100);

  return `
    <main class="game-layout">
      <aside class="panel sidebar">
        <span class="badge">${escapeHtml(mission.difficulty)}</span>
        <h2>${mission.icon} ${escapeHtml(mission.title)}</h2>
        <p>${escapeHtml(mission.learningGoal)}</p>
        <div class="progress-bar" aria-label="Progression de la mission">
          <span style="--value:${completion}%"></span>
        </div>
        <div class="skill-list">
          ${Object.entries(SKILLS).map(([key, label]) => `
            <div class="skill-row">
              <div class="skill-label">
                <span>${escapeHtml(label)}</span>
                <span>${clamp(state.progress.mastery[key] || 0)}%</span>
              </div>
              <div class="progress-bar"><span style="--value:${clamp(state.progress.mastery[key] || 0)}%"></span></div>
            </div>
          `).join("")}
        </div>
        <div class="action-row">
          <button class="btn ghost" data-action="home">Quitter</button>
        </div>
      </aside>
      <section class="panel question-panel">
        <div class="question-top">
          <span class="badge">${escapeHtml(challenge.label)}</span>
          <span class="question-counter">Défi ${state.challengeIndex + 1}/${mission.challenges.length}</span>
        </div>
        <div class="prompt">
          <div class="prompt-label">${challenge.type === "build" ? "Atelier" : "Question"}</div>
          <h3>${escapeHtml(challenge.prompt)}</h3>
          <p>${escapeHtml(challenge.body)}</p>
        </div>
        ${challenge.type === "build" ? renderBuildChallenge(challenge) : renderChoiceChallenge(challenge)}
      </section>
    </main>
  `;
}

function renderChoiceChallenge(challenge) {
  return `
    <div class="options">
      ${challenge.options.map((option, index) => {
        const selected = state.selected === index;
        const quality = scoreQuality(option.score);
        return `
          <button class="option ${selected ? `selected ${quality}` : ""}" data-action="answer" data-index="${index}" ${state.feedback ? "disabled" : ""}>
            <div class="option-title">
              <span>${escapeHtml(option.title)}</span>
              ${selected ? `<span class="badge">${option.score}%</span>` : ""}
            </div>
            <div class="option-text">${escapeHtml(option.text)}</div>
          </button>
        `;
      }).join("")}
    </div>
    ${state.feedback ? renderFeedback(state.feedback) : ""}
    ${state.feedback ? renderNextActions() : ""}
  `;
}

function renderBuildChallenge(challenge) {
  const selectedCards = state.buildSelection.map((id) => challenge.cards.find((card) => card.id === id)).filter(Boolean);
  const remaining = challenge.cards.filter((card) => !state.buildSelection.includes(card.id));
  const slots = Array.from({ length: challenge.target.length }, (_, index) => selectedCards[index]);

  return `
    <div class="speech-builder">
      <div class="grid two">
        <div>
          <h4>Cartes disponibles</h4>
          <div class="card-bank">
            ${remaining.map((card) => `
              <button class="drill-card" data-action="pick-card" data-id="${card.id}" ${state.feedback ? "disabled" : ""}>
                ${escapeHtml(card.text)}
                <small>${escapeHtml(card.role)}</small>
              </button>
            `).join("")}
          </div>
        </div>
        <div>
          <h4>Ton intervention</h4>
          <div class="speech-slots">
            ${slots.map((card, index) => `
              <div class="slot ${card ? "filled" : ""}">
                ${card ? escapeHtml(card.text) : `Emplacement ${index + 1} · ${escapeHtml(targetLabel(challenge.target[index]))}`}
                ${card ? `<small>${escapeHtml(card.role)}</small>` : ""}
              </div>
            `).join("")}
          </div>
        </div>
      </div>
      ${state.feedback ? renderFeedback(state.feedback) : ""}
      <div class="action-row">
        <button class="btn ghost" data-action="reset-build" ${state.feedback ? "disabled" : ""}>Réinitialiser</button>
        ${state.feedback ? `<button class="btn primary" data-action="next">Continuer</button>` : `<button class="btn primary" data-action="submit-build" ${state.buildSelection.length ? "" : "disabled"}>Valider</button>`}
      </div>
    </div>
  `;
}

function targetLabel(role) {
  const labels = {
    hook: "accroche",
    thesis: "thèse",
    evidence: "preuve",
    concession: "concession",
    action: "action",
  };
  return labels[role] || role;
}

function scoreQuality(score) {
  if (score >= 80) return "good";
  if (score >= 45) return "partial";
  return "bad";
}

function feedbackTitle(score) {
  if (score >= 80) return "Réponse solide";
  if (score >= 45) return "Réponse partielle";
  return "Réponse fragile";
}

function renderFeedback(feedback) {
  return `
    <div class="feedback ${scoreQuality(feedback.score)}">
      <h4>${feedbackTitle(feedback.score)} · ${feedback.score}%</h4>
      <p>${escapeHtml(feedback.text)}</p>
    </div>
  `;
}

function renderNextActions() {
  return `
    <div class="action-row">
      <button class="btn ghost" data-action="home">Quitter</button>
      <button class="btn primary" data-action="next">Continuer</button>
    </div>
  `;
}

function renderResult() {
  const mission = currentMission();
  const score = Math.round(state.missionScore / mission.challenges.length);
  const xp = xpForScore(score, mission);
  const note = resultNote(score);

  return `
    <main class="panel result-panel">
      <span class="badge good">Mission terminée</span>
      <h2>${escapeHtml(mission.title)}</h2>
      <div class="result-score">${score}%</div>
      <p>${escapeHtml(note)}</p>
      <div class="grid two">
        <article class="info-card">
          <h4>XP gagné</h4>
          <div class="stat-value">+${xp}</div>
          <p>Les XP débloquent progressivement les arènes suivantes.</p>
        </article>
        <article class="info-card">
          <h4>Compétence travaillée</h4>
          <p>${escapeHtml(mission.learningGoal)}</p>
        </article>
      </div>
      <div class="action-row">
        <button class="btn" data-action="replay">Rejouer</button>
        <button class="btn primary" data-action="finish">Retour au parcours</button>
      </div>
    </main>
  `;
}

function resultNote(score) {
  if (score >= 90) return "Très propre : tu combines précision, écoute et économie verbale.";
  if (score >= 75) return "Solide : le raisonnement tient, avec quelques zones à resserrer.";
  if (score >= 55) return "Correct mais instable : tu repères certains défauts, mais tu peux mieux formuler le mécanisme.";
  return "À retravailler : privilégie thèse claire, preuve qualifiée, objection réelle et demande explicite.";
}

function xpForScore(score, mission) {
  const base = 70 + mission.challenges.length * 25;
  return Math.round(base * (0.45 + score / 140));
}

function renderFooter() {
  return `
    <footer class="footer">
      Agora est un prototype pédagogique local. Les contenus peuvent être enrichis en ajoutant des missions dans <code>app.js</code>.
    </footer>
  `;
}

function renderGuideModal() {
  return `
    <div class="modal-backdrop" data-action="close-guide">
      <section class="modal" role="dialog" aria-modal="true" aria-labelledby="guide-title" onclick="event.stopPropagation()">
        <h2 id="guide-title">Méthode de jeu</h2>
        <p>
          Le jeu entraîne des gestes précis, pas une posture de supériorité intellectuelle.
          L’objectif est de rendre les raisonnements plus contrôlables et les prises de parole plus utiles.
        </p>
        <ul>
          <li><strong>Structure :</strong> identifier thèse, prémisses, conclusion, périmètre.</li>
          <li><strong>Preuves :</strong> distinguer exemple, donnée, mécanisme, source et incertitude.</li>
          <li><strong>Éloquence :</strong> faire comprendre vite sans manipuler ni écraser.</li>
          <li><strong>Écoute :</strong> répondre à l’objection réelle, surtout quand elle est inconfortable.</li>
          <li><strong>Clarté :</strong> transformer une idée vague en demande, test ou critère.</li>
        </ul>
        <p>
          Pour enrichir le jeu : ajoute de nouvelles missions dans le tableau <code>MISSIONS</code>.
          Aucun serveur n’est nécessaire.
        </p>
        <div class="action-row">
          <button class="btn primary" data-action="close-guide">Fermer</button>
        </div>
      </section>
    </div>
  `;
}

function bindEvents() {
  document.querySelectorAll("[data-action]").forEach((element) => {
    element.addEventListener("click", handleAction);
  });
}

function handleAction(event) {
  const action = event.currentTarget.dataset.action;
  const id = event.currentTarget.dataset.id;
  const index = Number(event.currentTarget.dataset.index);

  switch (action) {
    case "guide":
      state.showGuide = true;
      render();
      break;
    case "close-guide":
      state.showGuide = false;
      render();
      break;
    case "reset":
      if (confirm("Réinitialiser toute la progression locale ?")) {
        state.progress = clone(DEFAULT_PROGRESS);
        saveProgress();
        state.screen = "home";
        render();
      }
      break;
    case "home":
      resetMissionRuntime();
      state.screen = "home";
      render();
      break;
    case "continue":
      startNextAvailableMission();
      break;
    case "start-mission":
      startMission(id);
      break;
    case "answer":
      answerChoice(index);
      break;
    case "next":
      nextChallenge();
      break;
    case "pick-card":
      pickCard(id);
      break;
    case "reset-build":
      state.buildSelection = [];
      render();
      break;
    case "submit-build":
      submitBuild();
      break;
    case "replay":
      startMission(state.currentMissionId);
      break;
    case "finish":
      completeMission();
      break;
    default:
      break;
  }
}

function startNextAvailableMission() {
  const firstOpen = MISSIONS.find((mission) => missionIsUnlocked(mission) && !state.progress.completed[mission.id]);
  const fallback = MISSIONS.find(missionIsUnlocked) || MISSIONS[0];
  startMission((firstOpen || fallback).id);
}

function startMission(id) {
  const mission = missionById(id);
  if (!mission || !missionIsUnlocked(mission)) return;
  state.currentMissionId = id;
  state.challengeIndex = 0;
  state.missionScore = 0;
  state.selected = null;
  state.feedback = null;
  state.buildSelection = [];
  state.screen = "mission";
  render();
}

function resetMissionRuntime() {
  state.currentMissionId = null;
  state.challengeIndex = 0;
  state.missionScore = 0;
  state.selected = null;
  state.feedback = null;
  state.buildSelection = [];
}

function answerChoice(index) {
  if (state.feedback) return;
  const challenge = currentChallenge();
  const option = challenge.options[index];
  state.selected = index;
  state.feedback = {
    score: option.score,
    text: option.feedback,
  };
  state.missionScore += option.score;
  updateSkill(option.skill, option.score);
  updateStreak(option.score);
  saveProgress();
  render();
}

function pickCard(id) {
  const challenge = currentChallenge();
  if (state.feedback) return;
  if (state.buildSelection.includes(id)) return;
  if (state.buildSelection.length >= challenge.target.length) return;
  state.buildSelection.push(id);
  render();
}

function submitBuild() {
  if (state.feedback) return;
  const challenge = currentChallenge();
  const selectedCards = state.buildSelection.map((id) => challenge.cards.find((card) => card.id === id)).filter(Boolean);
  let score = 0;
  const details = [];

  selectedCards.forEach((card, index) => {
    const expected = challenge.target[index];
    if (card.id === expected) {
      score += card.score;
      details.push(`${card.role} bien placé`);
    } else if (challenge.target.includes(card.id) && card.score > 0) {
      score += Math.round(card.score * 0.45);
      details.push(`${card.role} utile mais mal placé`);
    } else {
      score += card.score;
      details.push(`${card.role} affaiblit l’intervention`);
    }
  });

  const missing = challenge.target.filter((role) => !state.buildSelection.includes(role));
  score -= missing.length * 8;
  score = clamp(score);

  const text = buildFeedbackText(score, details, missing);
  state.feedback = { score, text };
  state.missionScore += score;
  updateSkill("structure", score);
  updateSkill("rhetoric", score);
  updateSkill("clarity", score);
  updateStreak(score);
  saveProgress();
  render();
}

function buildFeedbackText(score, details, missing) {
  const base = details.length ? details.join(" · ") : "Aucune carte sélectionnée.";
  const missingText = missing.length ? ` Éléments manquants : ${missing.map(targetLabel).join(", ")}.` : "";
  const advice = score >= 80
    ? " L’intervention est structurée et défendable."
    : score >= 45
      ? " La base existe, mais l’ordre ou la précision limitent l’impact."
      : " La prise de parole risque d’être vague, agressive ou facile à attaquer.";
  return `${base}.${missingText}${advice}`;
}

function updateSkill(skill, score) {
  if (!skill || !state.progress.mastery[skill]) return;
  const delta = score >= 80 ? 6 : score >= 45 ? 3 : 1;
  state.progress.mastery[skill] = clamp(state.progress.mastery[skill] + delta);
}

function updateStreak(score) {
  if (score >= 80) {
    state.progress.streak += 1;
  } else if (score < 45) {
    state.progress.streak = 0;
  }
}

function nextChallenge() {
  const mission = currentMission();
  if (state.challengeIndex < mission.challenges.length - 1) {
    state.challengeIndex += 1;
    state.selected = null;
    state.feedback = null;
    state.buildSelection = [];
    render();
    return;
  }
  state.screen = "result";
  render();
}

function completeMission() {
  const mission = currentMission();
  const score = Math.round(state.missionScore / mission.challenges.length);
  const xp = xpForScore(score, mission);
  const previous = state.progress.completed[mission.id];

  state.progress.xp += xp;
  state.progress.completed[mission.id] = {
    best: previous ? Math.max(previous.best, score) : score,
    last: score,
  };

  state.progress.history.push({
    title: mission.title,
    score,
    xp,
    date: new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }),
    note: resultNote(score),
  });
  state.progress.history = state.progress.history.slice(-12);

  saveProgress();
  resetMissionRuntime();
  state.screen = "home";
  render();
}

render();
