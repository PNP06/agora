const STORAGE_KEY = "agora-critical-eloquence-v2";

const SKILLS = {
  structure: "Structure",
  evidence: "Preuves",
  clarity: "Clarte",
  rhetoric: "Eloquence",
  listening: "Ecoute",
  strategy: "Strategie",
};

const DEFAULT_PROGRESS = {
  xp: 0,
  focus: 3,
  streak: 0,
  bestCombo: 0,
  completed: {},
  mastery: {
    structure: 12,
    evidence: 12,
    clarity: 12,
    rhetoric: 12,
    listening: 12,
    strategy: 12,
  },
  history: [],
};

const LEAGUES = [
  ["Agora I", 0],
  ["Agora II", 280],
  ["Agora III", 700],
  ["Agora IV", 1260],
  ["Agora V", 1900],
  ["Agora Elite", 3300],
].map(([name, xp]) => ({ name, xp }));

const MISSIONS = [
  {
    id: "boussole",
    act: "Acte I",
    mark: "I",
    title: "Boussole logique",
    subtitle: "Distinguer these, preuve, inference et conclusion sous pression.",
    unlockXp: 0,
    minutes: 7,
    difficulty: "Difficile",
    threat: "Les mauvaises reponses coutent du focus.",
    goal: "Isoler la charpente d'un raisonnement avant de repondre.",
    rewards: ["Badge Cartographe", "Focus +1 si score >= 88"],
    challenges: [
      choice("Diagnostic fin", "Quel est le defaut principal de cet argument ?", "Depuis que notre equipe utilise ce rituel, deux projets ont ete livres en avance. Il faut donc le rendre obligatoire partout.", [
        opt("Correlation / causalite et generalisation trop rapide", "Le lien causal n'est pas etabli et l'echantillon est trop faible.", 100, "evidence", "Exact. Tu attaques le passage logique, pas seulement la conclusion."),
        opt("Faux dilemme", "L'argument ne force pas deux options exclusives.", 35, "structure", "Le defaut central reste l'inference causale."),
        opt("Appel a la tradition", "Aucune anciennete n'est invoquee ici.", 20, "clarity", "Le nom du sophisme doit suivre les indices."),
        opt("Argument correct si les resultats sont bons", "Deux resultats peuvent justifier un test, pas une obligation.", 45, "strategy", "Tu gardes le signal utile, mais tu acceptes trop vite la conclusion forte."),
      ]),
      choice("Inference", "Quelle question rend cette affirmation testable ?", "Cette formation rend les managers plus courageux.", [
        opt("Quels comportements observables definissent le courage avant / apres ?", "Tu convertis une qualite vague en indicateurs comparables.", 100, "clarity", "Solide : une notion noble devient evaluable seulement si elle devient observable."),
        opt("Combien de personnes ont aime la formation ?", "La satisfaction mesure l'accueil, pas l'effet.", 45, "evidence", "Donnee utile, mais insuffisante pour la these."),
        opt("Qui finance la formation ?", "La source compte, mais ne mesure pas l'effet.", 55, "evidence", "Bonne vigilance, pas le controle prioritaire."),
        opt("Pourquoi contester une intention positive ?", "L'intention ne prouve pas l'efficacite.", 15, "listening", "Tu deplaces le sujet vers la morale."),
      ]),
      build("Micro-architecture", "Construis l'ordre le plus robuste pour une reponse en 30 secondes.", "Faut-il generaliser une methode apres deux succes locaux ?", ["frame", "signal", "limit", "test", "decision"], [
        card("frame", "Cadrage", "Deux succes sont un signal interessant, pas encore une preuve generale.", 20),
        card("signal", "Point d'appui", "On doit conserver ce qui semble avoir aide l'equipe a livrer plus vite.", 20),
        card("limit", "Limite", "Il manque un groupe comparable, des criteres stables et une analyse des couts caches.", 20),
        card("test", "Test", "Je propose un pilote sur trois equipes avec indicateurs avant / apres.", 20),
        card("decision", "Decision", "On generalise seulement si les gains se repetent sans dette organisationnelle.", 20),
        card("attack", "Attaque", "Ceux qui veulent generaliser confondent chance et competence.", -20),
        card("blur", "Flou", "Il faut rester prudent tout en etant ambitieux.", -10),
      ]),
    ],
  },
  {
    id: "sophismes",
    act: "Acte II",
    mark: "II",
    title: "Labyrinthe des sophismes",
    subtitle: "Identifier le piege exact sans reciter une liste de noms.",
    unlockXp: 180,
    minutes: 8,
    difficulty: "Tres difficile",
    threat: "Les distracteurs ressemblent a de bonnes reponses.",
    goal: "Nommer le mecanisme fallacieux puis proposer une correction.",
    rewards: ["Badge Anti-piege", "Combo x2 sur perfect"],
    challenges: [
      choice("Piege dominant", "Quel mecanisme est le plus precis ?", "Si tu critiques cette mesure, tu dois preferer que rien ne change.", [
        opt("Faux dilemme qui transforme une critique locale en rejet global", "On force deux camps : accepter toute la mesure ou refuser tout changement.", 100, "structure", "Exact. Tu recuperes le droit de soutenir l'objectif tout en discutant le moyen."),
        opt("Attaque personnelle", "La phrase cible la position, pas directement la personne.", 35, "rhetoric", "Il y a pression, mais le coeur est la fermeture artificielle des options."),
        opt("Appel a la majorite", "Aucun consensus social n'est invoque.", 15, "evidence", "Nommer vite n'est pas analyser."),
        opt("Pente glissante", "Il n'y a pas de cascade d'effets catastrophiques.", 25, "clarity", "La phrase enferme le debat, elle ne predit pas une chaine."),
      ]),
      choice("Riposte", "Quelle reponse corrige le mieux sans envenimer ?", "Ton interlocuteur dit : Tu compliques tout avec tes nuances.", [
        opt("Ma nuance porte sur le risque principal ; si elle est inutile, montrons-le avec un critere.", "Tu justifies la nuance par sa fonction et tu demandes un test.", 100, "listening", "Propre. Tu refuses la caricature sans en produire une autre."),
        opt("C'est parce que le sujet est trop complexe pour toi.", "Tu gagnes une pique, mais tu perds la salle.", 10, "rhetoric", "L'attaque abaisse le niveau du debat."),
        opt("La nuance est toujours superieure a la simplicite.", "Generalisation trop forte.", 40, "strategy", "Tu defends ton style au lieu de montrer pourquoi cette nuance compte."),
        opt("D'accord, oublions la nuance.", "Tu abandonnes peut-etre le point protecteur.", 25, "clarity", "Conceder vite n'est utile que si tu distingues concession et capitulation."),
      ]),
      choice("Steelman", "Quelle reformulation est la plus loyale ?", "Position adverse : interdire les telephones en classe reduira les distractions.", [
        opt("Tu veux proteger l'attention collective, mais il faut verifier les effets collateraux.", "Tu reprends le meilleur motif puis ouvres l'evaluation.", 100, "listening", "Excellent. Le steelman rend la refutation plus credible."),
        opt("Tu penses que les eleves sont incapables de se controler.", "Caricature psychologique.", 15, "rhetoric", "Tu attribues une intention plus dure que l'argument."),
        opt("Tu veux punir tout le monde pour quelques abus.", "Objection possible, pas reformulation loyale.", 45, "structure", "Tu attaques deja avant d'avoir reconstruit."),
        opt("Tu refuses la modernite.", "Etiquette identitaire.", 10, "clarity", "Ce n'est pas une lecture loyale."),
      ]),
    ],
  },
  {
    id: "preuves",
    act: "Acte III",
    mark: "III",
    title: "Tribunal des preuves",
    subtitle: "Peser sources, protocoles, tailles d'effet et incertitudes.",
    unlockXp: 410,
    minutes: 10,
    difficulty: "Expert",
    threat: "Les reponses partielles ne suffisent plus.",
    goal: "Passer de l'opinion plausible a l'evaluation probante.",
    rewards: ["Badge Magistrat", "+140 XP si score >= 90"],
    challenges: [
      choice("Source", "Quel controle est prioritaire ?", "Un article affirme : 82 % des dirigeants pensent que l'IA augmente la creativite. Il est sponsorise par un editeur IA.", [
        opt("Question exacte, echantillon, recrutement et independance de l'analyse", "Tu controles ce qui peut transformer un sondage en signal faible ou fort.", 100, "evidence", "Exact. Le sponsor n'annule pas tout, il augmente l'exigence."),
        opt("Rejeter l'article car il est sponsorise", "Conflit d'interet ne signifie pas faussete.", 45, "evidence", "Bonne alerte, conclusion trop rapide."),
        opt("Croire le chiffre car il est precis", "La precision peut masquer une question mal posee.", 15, "clarity", "Un pourcentage net n'est pas une garantie."),
        opt("Demander si les dirigeants aiment l'IA", "Cela repete presque le chiffre.", 25, "strategy", "Tu dois tester la robustesse du chiffre."),
      ]),
      choice("Causalite", "Quelle conclusion est la plus defensable ?", "Les eleves inscrits a un club de debat ont de meilleurs resultats oraux que les autres.", [
        opt("Association interessante ; isoler selection initiale, motivation et enseignement recu.", "Tu gardes l'hypothese sans sauter a la causalite.", 100, "evidence", "Parfait. Tu vois les variables de confusion."),
        opt("Le club de debat prouve son efficacite.", "Conclusion trop forte.", 35, "structure", "Les eleves deja a l'aise peuvent davantage s'inscrire."),
        opt("Le club ne sert probablement a rien.", "Absence de preuve causale n'est pas preuve d'absence.", 25, "clarity", "Tu compenses un exces par un autre."),
        opt("Il faut rendre le club obligatoire.", "La decision va plus loin que les donnees.", 10, "strategy", "Il manque le test."),
      ]),
      build("Plaidoirie de preuve", "Classe les cartes pour presenter une preuve avec prudence.", "Convaincre sans vendre plus que ce que les donnees permettent.", ["claim", "method", "result", "uncertainty", "next"], [
        card("claim", "These mesuree", "Le club est associe a de meilleures performances orales.", 20),
        card("method", "Methode", "La comparaison doit tenir compte du niveau initial et de la motivation.", 20),
        card("result", "Resultat", "Si l'ecart persiste apres controle, l'hypothese d'un effet devient plus credible.", 20),
        card("uncertainty", "Incertitude", "On ne peut pas encore exclure toutes les variables de selection.", 20),
        card("next", "Suite", "L'etape raisonnable est un pilote suivi avec criteres publics.", 20),
        card("hype", "Survente", "La preuve est claire : le debat rend meilleur a l'oral.", -25),
        card("shrug", "Abandon", "Comme ce n'est pas parfait, ces donnees ne servent a rien.", -20),
      ]),
    ],
  },
  {
    id: "clinique",
    act: "Acte IV",
    mark: "IV",
    title: "Clinique des discours",
    subtitle: "Lire des textes denses comme un analyste rhetorique et un prof d'eloquence.",
    unlockXp: 730,
    minutes: 18,
    difficulty: "Analyse",
    threat: "Il ne suffit pas de trouver une belle formule : il faut prouver ton diagnostic.",
    goal: "Identifier structure, ethos, pathos, implicites, cadrage et angles morts dans un discours long.",
    rewards: ["Badge Analyste", "Bonus XP sur diagnostics complets"],
    challenges: [
      analysis(
        "Discours de crise",
        "Selectionne les 4 observations les plus solides.",
        "Texte original inspire des codes reels de la communication politique de crise. Il n'est pas une citation.",
        "Mesdames et messieurs, je ne viens pas ce soir vous demander de croire que tout a ete bien fait. Je viens d'abord reconnaitre que l'information transmise vendredi n'etait pas complete. Elle a rassure certains, elle en a inquiete d'autres, et surtout elle a laisse chacun combler les vides avec ses propres peurs. Une institution ne perd pas la confiance parce qu'elle commet une erreur ; elle la perd quand elle organise le silence autour de cette erreur. C'est pourquoi nous publions ce soir les donnees sources, le calendrier des decisions et le nom des personnes chargees du controle. Je sais que ces documents ne repareront pas tout. Mais ils permettent une chose simple : que chacun puisse verifier ce que nous disons, au lieu de devoir seulement nous croire.",
        ["Architecture", "Ethos", "Pathos", "Preuve", "Angle mort"],
        [
          obs("ethos-responsable", "Ethos de responsabilite", "L'orateur commence par reconnaitre une faute precise au lieu de demander une confiance abstraite.", 25, "rhetoric"),
          obs("preuve-controle", "Preuve externalisee", "Le passage de la promesse aux donnees sources et au calendrier rend la confiance verifiable.", 25, "evidence"),
          obs("antithese-confiance", "Antithese structurante", "La phrase oppose erreur et silence : elle deplace la faute morale vers l'opacite.", 25, "structure"),
          obs("pathos-maitrise", "Pathos contenu", "La peur du public est nommee sans dramatisation, ce qui baisse la tension sans nier l'emotion.", 25, "listening"),
          obs("jargon", "Jargon technique", "Le texte serait surtout faible parce qu'il utilise trop de vocabulaire administratif.", -15, "clarity"),
          obs("excuse-totale", "Excuse complete", "L'orateur efface sa responsabilite en parlant seulement des peurs du public.", -20, "listening"),
        ],
        "Analyse modele : la force du discours vient d'un triangle simple : faute reconnue, emotion reconnue, verification promise. La phrase cle n'est pas seulement belle ; elle organise une hierarchie morale entre l'erreur, pardonnable, et le silence, impardonnable. Pour ameliorer encore, il faudrait ajouter une mesure de reparation concrete pour les personnes touchees."
      ),
      analysis(
        "Plaidoirie",
        "Repere les 4 leviers qui rendent cette defense credible.",
        "Texte original inspire des codes de plaidoirie et de contre-interrogatoire. Il n'est pas une citation.",
        "On voudrait vous faire croire que le doute est une faiblesse. En realite, dans cette affaire, le doute est la seule attitude intellectuellement honnete. Nous avons une chronologie trouee, un temoin qui affirme deux choses incompatibles et une expertise qui parle de probabilite sans jamais franchir le seuil de certitude. Mon role n'est pas de vous raconter une histoire plus seduisante que celle de l'accusation. Mon role est de vous rappeler que l'on ne condamne pas quelqu'un parce qu'un scenario sonne juste. On condamne lorsque les preuves ferment raisonnablement les autres scenarios. Ici, elles les laissent ouverts.",
        ["These", "Standard de preuve", "Style", "Refutation", "Ethique"],
        [
          obs("standard", "Standard de preuve explicite", "La plaidoirie rappelle le critere de decision : fermer raisonnablement les autres scenarios.", 25, "evidence"),
          obs("metadiscours", "Metadiscours efficace", "L'avocat definit son propre role pour refuser la competition narrative pure.", 25, "rhetoric"),
          obs("enumeration", "Enumeration probante", "Chronologie, temoin, expertise : trois fragilites distinctes donnent du poids au doute.", 25, "structure"),
          obs("renversement", "Renversement du mot doute", "Le doute cesse d'etre une faiblesse et devient une exigence de rigueur.", 25, "clarity"),
          obs("pathos", "Pathos maximal", "La force principale vient d'une emotion tres forte et d'images choquantes.", -20, "rhetoric"),
          obs("attaque-juge", "Attaque d'autorite", "Le texte fonctionne parce qu'il met le tribunal sous pression personnelle.", -15, "listening"),
        ],
        "Analyse modele : le texte est fort car il ne supplie pas, il fixe un standard. Il oppose une histoire seduisante a une preuve suffisante. C'est une lecon d'eloquence : la belle formule sert la procedure mentale du public, elle ne la remplace pas."
      ),
      analysis(
        "Discours de reforme",
        "Choisis les 4 observations qui permettraient d'ameliorer le discours.",
        "Texte original inspire de discours publics sur la reforme, le travail et l'urgence collective. Il n'est pas une citation.",
        "Nous avons trop longtemps reporte les decisions difficiles. Chaque annee, nous avons choisi l'apaisement immediat plutot que la solidite future. Je sais ce que cette reforme demande : elle demande des efforts visibles aujourd'hui pour des benefices qui ne se verront pas tout de suite. Mais gouverner, ce n'est pas additionner les conforts du present ; c'est empecher que nos enfants heritent de nos renoncements. A ceux qui craignent une mesure injuste, je dis que cette crainte est legitime. A ceux qui refusent tout changement, je demande quelle dette morale ils acceptent de transmettre.",
        ["Cadrage", "Concession", "Pathos", "Point faible", "Reecriture"],
        [
          obs("concession", "Concession utile mais incomplete", "La crainte d'injustice est reconnue, mais aucun garde-fou concret n'est encore donne.", 25, "listening"),
          obs("cadre-temporel", "Cadrage temporel puissant", "Le discours oppose confort present et solidite future pour justifier l'effort.", 25, "structure"),
          obs("pathos-filiation", "Pathos de filiation", "Les enfants et l'heritage moral creent une pression emotionnelle forte.", 25, "rhetoric"),
          obs("angle-mort", "Angle mort decisif", "Le texte moralise le refus du changement sans distinguer opposition de principe et critique des modalites.", 25, "strategy"),
          obs("preuve-chiffree", "Preuve suffisante", "La presence du mot dette suffit a etablir la necessite de la reforme.", -20, "evidence"),
          obs("neutralite", "Neutralite parfaite", "Le discours est neutre et ne cherche pas a cadrer le public.", -15, "clarity"),
        ],
        "Analyse modele : le discours est efficace mais dangereux. Il tient par un cadrage temporel fort et une image morale de transmission. Son point faible est l'absence de mecanisme : quels efforts, quels benefices, quels garde-fous ? Pour l'ameliorer, il faut ajouter une preuve, une exception legitime et un calendrier d'evaluation."
      ),
    ],
  },
  {
    id: "hostile",
    act: "Acte V",
    mark: "V",
    title: "Negociation hostile",
    subtitle: "Garder le niveau quand l'autre camp met la pression.",
    unlockXp: 1050,
    minutes: 11,
    difficulty: "Elite",
    threat: "Les pieges attaquent ton ethos.",
    goal: "Transformer attaque, flou et ultimatum en criteres negociables.",
    rewards: ["Badge Sang-froid", "Focus max si score >= 88"],
    challenges: [
      choice("Ultimatum", "Quelle reponse reprend le controle ?", "C'est a prendre ou a laisser. Si vous hésitez, on passe a un autre fournisseur.", [
        opt("Pour decider aujourd'hui, il nous faut prix final, garanties et penalites ecrites.", "Tu acceptes la contrainte temporelle tout en imposant les criteres.", 100, "strategy", "Tu ne subis pas l'ultimatum, tu le convertis en conditions verifiables."),
        opt("Alors passez a un autre fournisseur.", "Ferme, mais tu n'extrais pas les termes.", 55, "rhetoric", "Fermete utile, pas optimale."),
        opt("Vous n'avez pas le droit de nous parler comme ca.", "Tu traites le ton, pas la decision.", 35, "listening", "La defense de statut ne suffit pas."),
        opt("D'accord, on signe.", "Tu confonds vitesse et clarte.", 5, "strategy", "La pression artificielle a gagne."),
      ]),
      choice("Attaque", "Quelle replique est la plus forte ?", "Votre proposition est naive. Elle ne survivra pas a la realite.", [
        opt("Quelle contrainte concrete la rend naive : budget, delai, adoption ou risque legal ?", "Tu convertis une etiquette en categorie d'objection.", 100, "listening", "Une attaque vague devient une liste de risques traitables."),
        opt("Naif, c'est une insulte, pas un argument.", "Vrai mais incomplet.", 65, "rhetoric", "Bonne defense, mais il manque le test."),
        opt("Vous etes toujours negatif.", "Tu quittes le sujet.", 15, "clarity", "C'est le terrain que l'attaque veut t'imposer."),
        opt("On verra bien.", "Tu repousses sans examiner.", 25, "structure", "Cela ne resout rien."),
      ]),
      build("Coup froid", "Assemble une reponse ferme a une attaque publique.", "Garder l'autorite sans humilier l'autre personne.", ["ack", "boundary", "question", "criterion", "move"], [
        card("ack", "Reception", "J'entends que vous voyez un risque de terrain important.", 20),
        card("boundary", "Cadre", "Le mot naive ne nous aide pas encore a le traiter.", 20),
        card("question", "Question", "Quel obstacle precis pensez-vous rencontrer en premier ?", 20),
        card("criterion", "Critere", "S'il concerne budget, adoption ou delai, on peut le tester differemment.", 20),
        card("move", "Mouvement", "Donnons-nous deux minutes pour lister ces obstacles puis arbitrer.", 20),
        card("revenge", "Riposte", "Ce qui est naif, c'est de critiquer sans proposer.", -20),
        card("fog", "Flou", "Nous devons rester constructifs et avancer ensemble.", -10),
      ]),
    ],
  },
  {
    id: "impro",
    act: "Acte VI",
    mark: "VI",
    title: "Sprint d'improvisation",
    subtitle: "Trouver vite un angle, une preuve et une chute memorables.",
    unlockXp: 1420,
    minutes: 12,
    difficulty: "Champion",
    threat: "Les choix elegants mais creux rapportent peu.",
    goal: "Improviser sans perdre la structure argumentative.",
    rewards: ["Badge Orateur", "Combo permanent si perfect"],
    challenges: [
      choice("Angle", "Quel angle donne le meilleur discours de 60 secondes ?", "Faut-il reserver une heure par semaine a l'apprentissage entre collegues ?", [
        opt("Cout court terme contre dette de competence long terme", "Angle clair, conflictuel, mesurable et utile pour decider.", 100, "structure", "Tu poses une tension qui donne de la force au discours."),
        opt("L'apprentissage, c'est important", "Vrai mais plat.", 30, "rhetoric", "Un bon angle contient une tension."),
        opt("Les collegues doivent etre plus curieux", "Tu moralises le probleme.", 25, "listening", "La these porte sur un rituel collectif."),
        opt("L'entreprise moderne apprend toujours", "Formule agreable mais peu testable.", 40, "clarity", "Le style sans mecanisme ne tient pas."),
      ]),
      choice("Chute", "Quelle chute est la plus persuasive ?", "Tu termines un discours sur l'apprentissage entre collegues.", [
        opt("Une heure par semaine n'est pas une pause ; c'est l'entretien de l'outil qui travaille.", "Image concrete, mecanisme clair, ton non agressif.", 100, "rhetoric", "Chute memorisable sans manipuler."),
        opt("Ceux qui refusent resteront derriere.", "Menace identitaire.", 20, "listening", "La pression ferme la discussion."),
        opt("Merci de m'avoir ecoute.", "Poli mais neutre.", 45, "rhetoric", "Aucune trace mentale."),
        opt("Il faut apprendre, apprendre, apprendre.", "Rythme visible, substance faible.", 35, "clarity", "La repetition ne remplace pas une derniere raison."),
      ]),
      build("Pitch minute", "Compose le pitch le plus robuste.", "Obtenir un test d'un mois pour l'heure d'apprentissage.", ["hook", "cost", "proof", "guardrail", "ask"], [
        card("hook", "Accroche", "Nous perdons plus de temps a redecouvrir seuls qu'a apprendre ensemble.", 20),
        card("cost", "Cout", "Une heure hebdomadaire coute peu si elle evite erreurs repetees et dependances invisibles.", 20),
        card("proof", "Preuve", "Chaque session produit une note courte : probleme, solution, limite.", 20),
        card("guardrail", "Garde-fou", "Si aucune note utile ne sort en un mois, on arrete.", 20),
        card("ask", "Demande", "Je demande un pilote de quatre semaines avec bilan public.", 20),
        card("guilt", "Culpabilisation", "Refuser ce test, c'est refuser de progresser.", -25),
        card("poem", "Poetique", "Apprendre ensemble, c'est allumer des lanternes dans la nuit.", -12),
      ]),
    ],
  },
  {
    id: "architecte",
    act: "Acte VII",
    mark: "VII",
    title: "Architecte du discours",
    subtitle: "Construire une intervention complete, difficile a attaquer.",
    unlockXp: 1820,
    minutes: 14,
    difficulty: "Maitre",
    threat: "Le moindre maillon faible reduit le score final.",
    goal: "Combiner cadrage, preuve, objection et appel a l'action.",
    rewards: ["Badge Architecte", "+180 XP si score >= 90"],
    challenges: [
      build("Discours long", "Ordonne les blocs d'une intervention de 90 secondes.", "These : autoriser l'IA pour certaines etapes, pas pour produire la copie finale.", ["definition", "thesis", "benefit", "risk", "rule", "evaluation"], [
        card("definition", "Definition", "Je parle d'aide a la recherche, au brouillon et a la reformulation, pas de copie livree par IA.", 17),
        card("thesis", "These", "L'interdiction totale rate l'objectif ; le bon enjeu est transparence et responsabilite.", 17),
        card("benefit", "Benefice", "Bien cadree, l'IA rend visibles les choix de plan, de sources et de style.", 17),
        card("risk", "Risque", "Le risque reel est la delegation invisible de la pensee.", 17),
        card("rule", "Regle", "L'eleve doit declarer l'usage et justifier ce qu'il garde, modifie ou rejette.", 17),
        card("evaluation", "Evaluation", "On evalue la trace du raisonnement autant que le resultat final.", 15),
        card("tribe", "Clan", "Les anti-IA ont peur de l'avenir.", -25),
        card("magic", "Magique", "L'IA va revolutionner la classe, donc adaptons-nous.", -15),
      ]),
      choice("Objection forte", "Quelle reponse traite le mieux l'objection ?", "Si on autorise l'IA, les eleves faibles seront les plus dependants.", [
        opt("Risque central ; il faut des usages guides et une evaluation de la justification personnelle.", "Tu reconnais l'objection puis proposes une regle.", 100, "listening", "Tu transformes le risque en garde-fou."),
        opt("Ils utilisent deja l'IA, donc il faut accepter.", "Constat d'usage, pas cadre educatif.", 35, "evidence", "Un fait possible ne suffit pas."),
        opt("Les eleves faibles ont besoin d'aide.", "Vrai mais insuffisant.", 55, "strategy", "Il manque le mecanisme pedagogique."),
        opt("C'est une peur exageree.", "Tu nies un risque plausible.", 20, "clarity", "La negation pure fragilise ton ethos."),
      ]),
      choice("Regle", "Quelle regle est la plus applicable ?", "Tu dois proposer un cadre d'usage de l'IA dans un devoir.", [
        opt("Autorise pour ideation et relecture ; interdit pour redaction finale non declaree ; journal obligatoire.", "Usages, limites, trace et responsabilite.", 100, "strategy", "La regle est actionable et verifiable."),
        opt("Autoriser si l'enseignant est d'accord.", "Trop implicite.", 55, "clarity", "Il faut dire quoi declarer et comment evaluer."),
        opt("Interdire seulement la triche.", "Tout le monde accepte, mais cela ne distingue rien.", 35, "structure", "Trop vague pour guider les cas limites."),
        opt("Laisser chaque eleve decider selon son ethique.", "Trop peu robuste.", 20, "listening", "La confiance ne remplace pas une regle commune."),
      ]),
    ],
  },
  {
    id: "grand-oral",
    act: "Final",
    mark: "BOSS",
    title: "Conseil de crise",
    subtitle: "Boss final : preuves imparfaites, objections solides et public hostile.",
    unlockXp: 2300,
    minutes: 16,
    difficulty: "Boss",
    threat: "Il faut finir avec 75 % ou plus pour inscrire la victoire.",
    goal: "Defendre une decision complexe avec lucidite et autorite.",
    rewards: ["Titre Champion d'Agora", "Ligue Elite"],
    challenges: [
      choice("Ouverture", "Quel premier geste est le plus puissant ?", "Crise de reputation : annoncer une correction publique apres une erreur de communication.", [
        opt("Reconnaitre le fait etabli, separer intention et effet, annoncer le critere de correction", "Responsabilite, precision et suite concrete.", 100, "structure", "Ouverture de haut niveau."),
        opt("Dire que les critiques exagerent", "Mauvais premier geste.", 25, "listening", "Tu sembles te proteger avant d'avoir reconnu les faits."),
        opt("Presenter toutes les excuses possibles", "L'excuse sans fait ni correction peut sembler performative.", 50, "rhetoric", "Le ton compte, mais la reparation compte davantage."),
        opt("Changer de sujet vers les bonnes actions passees", "Deflection visible.", 5, "strategy", "Le public entendra une fuite."),
      ]),
      choice("Question hostile", "Quelle reponse tient le mieux ?", "Un journaliste demande : Pourquoi vous croire maintenant ?", [
        opt("Ne nous croyez pas sur parole : voici les trois controles publics et leur calendrier.", "Tu remplaces la confiance par une verification externe.", 100, "evidence", "En crise, la preuve doit porter plus que le ton."),
        opt("Parce que nous sommes sinceres.", "La sincerite ne se verifie pas facilement.", 30, "rhetoric", "Humain, mais insuffisant."),
        opt("Vous verrez dans le temps.", "Trop vague, trop tardif.", 40, "clarity", "Il faut un calendrier maintenant."),
        opt("Cette question est injuste.", "Elle est dure, mais legitime.", 15, "listening", "Tu contestes le droit de douter."),
      ]),
      build("Declaration finale", "Construis la declaration la plus robuste.", "Le public attend responsabilite, clarte, preuve et action.", ["fact", "impact", "limit", "repair", "proof", "close"], [
        card("fact", "Fait", "Nous avons diffuse une information incomplete.", 17),
        card("impact", "Impact", "Elle a pu induire des decisions ou interpretations incorrectes.", 17),
        card("limit", "Limite", "L'intention n'efface pas cet effet ; elle explique seulement comment l'erreur est apparue.", 17),
        card("repair", "Correction", "Nous publions aujourd'hui la version corrigee et les donnees sources.", 17),
        card("proof", "Controle", "Un suivi public indiquera chaque vendredi ce qui a ete corrige et ce qui reste ouvert.", 17),
        card("close", "Cloture", "Notre credibilite se jouera sur ces preuves, pas sur cette declaration.", 15),
        card("excuse", "Excuse floue", "Nous regrettons si certaines personnes se sont senties troublees.", -25),
        card("counter", "Contre-attaque", "La polemique a ete amplifiee par des personnes de mauvaise foi.", -25),
      ]),
    ],
  },
];

const state = {
  screen: "home",
  showGuide: false,
  currentMissionId: null,
  challengeIndex: 0,
  missionScore: 0,
  combo: 0,
  selected: null,
  feedback: null,
  buildSelection: [],
  analysisSelection: [],
  progress: loadProgress(),
};

function choice(label, prompt, body, options) {
  return { type: "choice", label, prompt, body, options };
}

function build(label, prompt, body, target, cards) {
  return { type: "build", label, prompt, body, target, cards };
}

function analysis(label, prompt, body, passage, axes, observations, model) {
  return { type: "analysis", label, prompt, body, passage, axes, observations, model };
}

function opt(title, text, score, skill, feedback) {
  return { title, text, score, skill, feedback };
}

function card(id, role, text, score) {
  return { id, role, text, score };
}

function obs(id, title, text, score, skill) {
  return { id, title, text, score, skill };
}

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? mergeProgress(DEFAULT_PROGRESS, saved) : clone(DEFAULT_PROGRESS);
  } catch {
    return clone(DEFAULT_PROGRESS);
  }
}

function mergeProgress(base, saved) {
  return {
    ...clone(base),
    ...saved,
    completed: { ...base.completed, ...(saved.completed || {}) },
    mastery: { ...base.mastery, ...(saved.mastery || {}) },
    history: Array.isArray(saved.history) ? saved.history : [],
  };
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
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

function missionIsUnlocked(mission) {
  return state.progress.xp >= mission.unlockXp;
}

function completedCount() {
  return Object.keys(state.progress.completed).length;
}

function currentLeague() {
  return LEAGUES.reduce((best, league) => state.progress.xp >= league.xp ? league : best, LEAGUES[0]);
}

function nextLeague() {
  return LEAGUES.find((league) => league.xp > state.progress.xp) || LEAGUES[LEAGUES.length - 1];
}

function progressToNextLeague() {
  const league = currentLeague();
  const next = nextLeague();
  return league.name === next.name ? 100 : clamp(Math.round(((state.progress.xp - league.xp) / (next.xp - league.xp)) * 100));
}

function achievements() {
  const completed = state.progress.completed;
  return [
    ["Cartographe", "Terminer la premiere arene.", Boolean(completed.boussole)],
    ["Sans-faute", "Obtenir 95 % ou plus sur une mission.", Object.values(completed).some((item) => item.best >= 95)],
    ["Sang-froid", "Atteindre un combo de 5.", state.progress.bestCombo >= 5],
    ["Champion d'Agora", "Vaincre le Conseil de crise.", Boolean(completed["grand-oral"] && completed["grand-oral"].best >= 75)],
  ].map(([title, desc, unlocked]) => ({ title, desc, unlocked }));
}

function render() {
  document.querySelector("#app").innerHTML = `
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
      <button class="brand" data-action="home" aria-label="Retour a l'accueil">
        <span class="logo">A</span>
        <span><strong>Agora</strong><small>Esprit critique · Eloquence · Boss fights</small></span>
      </button>
      <nav class="top-actions" aria-label="Actions">
        <span class="pill">${escapeHtml(currentLeague().name)}</span>
        <span class="pill">${state.progress.xp} XP</span>
        <button class="btn ghost" data-action="guide">Regles</button>
        <button class="btn danger" data-action="reset">Reset</button>
      </nav>
    </header>
  `;
}

function renderHome() {
  const league = currentLeague();
  const next = nextLeague();
  const completion = Math.round((completedCount() / MISSIONS.length) * 100);
  return `
    <main>
      <section class="command-center">
        <div class="hero-panel">
          <div class="kicker">Campagne tactique</div>
          <h1>Monte dans l'arene, casse les raisonnements faibles, gagne le Conseil.</h1>
          <p>Une progression plus dure et plus nerveuse : combo, focus, ligues, badges, boss final et niveaux construits comme des duels argumentatifs.</p>
          <div class="hero-actions">
            <button class="btn primary" data-action="continue">Continuer la campagne</button>
            <button class="btn" data-action="guide">Voir les regles</button>
          </div>
        </div>
        <aside class="hud-panel">
          <div class="hud-card wide">
            <span class="label">Ligue</span>
            <strong>${escapeHtml(league.name)}</strong>
            <small>${league.name === next.name ? "Derniere ligue atteinte" : `${next.xp - state.progress.xp} XP avant ${escapeHtml(next.name)}`}</small>
            <div class="progress-bar"><span style="--value:${progressToNextLeague()}%"></span></div>
          </div>
          <div class="hud-card"><span class="label">Campagne</span><strong>${completion}%</strong><small>${completedCount()}/${MISSIONS.length} arenes</small></div>
          <div class="hud-card"><span class="label">Focus</span><strong>${state.progress.focus}/5</strong><small>Ressource mentale</small></div>
          <div class="hud-card"><span class="label">Meilleur combo</span><strong>x${state.progress.bestCombo}</strong><small>${state.progress.streak} coups solides</small></div>
        </aside>
      </section>

      <section class="map-section">
        <div class="section-title">
          <div><h2>Carte de campagne</h2><p>Les arenes se deverrouillent par XP. Les dernieres demandent des reponses propres, pas juste plausibles.</p></div>
          <span class="pill">${MISSIONS.length} niveaux</span>
        </div>
        <div class="campaign-map">${MISSIONS.map(renderMissionNode).join("")}</div>
      </section>

      <section class="dashboard-grid">
        <article class="panel">
          <div class="section-title compact"><div><h2>Competences</h2><p>La progression suit des gestes argumentatifs precis.</p></div></div>
          <div class="skill-grid">${Object.entries(SKILLS).map(([key, label]) => renderSkillCard(key, label)).join("")}</div>
        </article>
        <article class="panel">
          <div class="section-title compact"><div><h2>Badges</h2><p>Objectifs secondaires pour pousser le niveau.</p></div></div>
          <div class="badge-grid">${achievements().map(renderAchievement).join("")}</div>
        </article>
      </section>

      <section class="panel history-panel">
        <div class="section-title compact"><div><h2>Journal de combat</h2><p>Historique local, stocke uniquement dans ce navigateur.</p></div></div>
        ${renderHistory()}
      </section>
    </main>
  `;
}

function renderMissionNode(mission, index) {
  const unlocked = missionIsUnlocked(mission);
  const done = state.progress.completed[mission.id];
  const status = done ? "completed" : unlocked ? "open" : "locked";
  return `
    <button class="mission-node ${status}" style="--tilt:${index % 2 === 0 ? -1 : 1}" data-action="start-mission" data-id="${mission.id}" ${unlocked ? "" : "disabled"}>
      <span class="node-act">${escapeHtml(mission.act)}</span>
      <span class="node-mark">${escapeHtml(mission.mark)}</span>
      <strong>${escapeHtml(mission.title)}</strong>
      <small>${escapeHtml(mission.subtitle)}</small>
      <span class="node-meta"><span>${escapeHtml(mission.difficulty)}</span><span>${mission.minutes} min</span><span>${done ? `${done.best}% best` : unlocked ? "Disponible" : `${mission.unlockXp} XP`}</span></span>
    </button>
  `;
}

function renderSkillCard(key, label) {
  const value = clamp(state.progress.mastery[key] || 0);
  return `
    <div class="skill-card">
      <div><strong>${escapeHtml(label)}</strong><span>${value}%</span></div>
      <p>${escapeHtml(skillDescription(key))}</p>
      <div class="progress-bar"><span style="--value:${value}%"></span></div>
    </div>
  `;
}

function skillDescription(key) {
  return {
    structure: "These, premisses, conclusion, ordre et perimetre.",
    evidence: "Source, protocole, inference, incertitude et taille d'effet.",
    clarity: "Formulation precise, testable, difficile a detourner.",
    rhetoric: "Style, rythme, image et persuasion sans manipulation.",
    listening: "Objection reelle, steelman et reponse non caricaturale.",
    strategy: "Decision, criteres, garde-fous et prochain mouvement.",
  }[key] || "";
}

function renderAchievement(item) {
  return `<div class="achievement ${item.unlocked ? "unlocked" : ""}"><span>${item.unlocked ? "OK" : "--"}</span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.desc)}</small></div>`;
}

function renderHistory() {
  if (!state.progress.history.length) return `<p class="empty">Aucune session terminee. Lance la premiere arene pour ouvrir le journal.</p>`;
  return `<div class="timeline">${state.progress.history.slice().reverse().map((item) => `<div class="timeline-item"><strong>${escapeHtml(item.title)} · ${item.score}%</strong><span>${escapeHtml(item.date)} · +${item.xp} XP · combo x${item.combo} · ${escapeHtml(item.note)}</span></div>`).join("")}</div>`;
}

function renderMission() {
  const mission = currentMission();
  const challenge = currentChallenge();
  const completion = Math.round((state.challengeIndex / mission.challenges.length) * 100);
  return `
    <main class="game-layout">
      <aside class="mission-sidebar">
        <div class="mission-emblem">${escapeHtml(mission.mark)}</div>
        <span class="pill">${escapeHtml(mission.difficulty)}</span>
        <h1>${escapeHtml(mission.title)}</h1>
        <p>${escapeHtml(mission.goal)}</p>
        <div class="danger-box"><strong>Menace</strong><span>${escapeHtml(mission.threat)}</span></div>
        <div class="run-stats"><div><span>Progression</span><strong>${completion}%</strong></div><div><span>Combo</span><strong>x${state.combo}</strong></div><div><span>Focus</span><strong>${state.progress.focus}/5</strong></div></div>
        <div class="progress-bar"><span style="--value:${completion}%"></span></div>
        <div class="reward-list">${mission.rewards.map((reward) => `<span>${escapeHtml(reward)}</span>`).join("")}</div>
        <button class="btn ghost wide-button" data-action="home">Quitter l'arene</button>
      </aside>
      <section class="question-panel">
        <div class="question-top"><span class="pill">${escapeHtml(challenge.label)}</span><span>Defi ${state.challengeIndex + 1}/${mission.challenges.length}</span></div>
        <article class="prompt"><span>${challengeTypeLabel(challenge)}</span><h2>${escapeHtml(challenge.prompt)}</h2><p>${escapeHtml(challenge.body)}</p></article>
        ${renderChallenge(challenge)}
      </section>
    </main>
  `;
}

function challengeTypeLabel(challenge) {
  if (challenge.type === "build") return "Atelier tactique";
  if (challenge.type === "analysis") return "Analyse de discours";
  return "Decision";
}

function renderChallenge(challenge) {
  if (challenge.type === "build") return renderBuildChallenge(challenge);
  if (challenge.type === "analysis") return renderAnalysisChallenge(challenge);
  return renderChoiceChallenge(challenge);
}

function renderChoiceChallenge(challenge) {
  return `
    <div class="options">
      ${challenge.options.map((option, index) => {
        const selected = state.selected === index;
        return `
          <button class="option ${selected ? `selected ${scoreQuality(option.score)}` : ""}" data-action="answer" data-index="${index}" ${state.feedback ? "disabled" : ""}>
            <span class="option-rank">${index + 1}</span>
            <span class="option-content"><strong>${escapeHtml(option.title)}</strong><small>${escapeHtml(option.text)}</small></span>
            ${selected ? `<span class="score-chip">${option.score}%</span>` : ""}
          </button>
        `;
      }).join("")}
    </div>
    ${state.feedback ? renderFeedback(state.feedback) : ""}
    ${state.feedback ? renderNextActions() : ""}
  `;
}

function renderBuildChallenge(challenge) {
  const selectedCards = state.buildSelection.map((id) => challenge.cards.find((item) => item.id === id)).filter(Boolean);
  const remaining = challenge.cards.filter((item) => !state.buildSelection.includes(item.id));
  const slots = Array.from({ length: challenge.target.length }, (_, index) => selectedCards[index]);
  return `
    <div class="speech-builder">
      <div class="builder-grid">
        <section>
          <div class="builder-head"><h3>Cartes disponibles</h3><span>${remaining.length} restantes</span></div>
          <div class="card-bank">${remaining.map((item) => `<button class="drill-card" data-action="pick-card" data-id="${item.id}" ${state.feedback ? "disabled" : ""}><strong>${escapeHtml(item.role)}</strong><span>${escapeHtml(item.text)}</span></button>`).join("")}</div>
        </section>
        <section>
          <div class="builder-head"><h3>Intervention</h3><span>${state.buildSelection.length}/${challenge.target.length}</span></div>
          <div class="speech-slots">${slots.map((item, index) => `<div class="slot ${item ? "filled" : ""}"><strong>${index + 1}. ${escapeHtml(targetLabel(challenge.target[index]))}</strong><span>${item ? escapeHtml(item.text) : "Choisis une carte pour remplir ce bloc."}</span>${item ? `<small>${escapeHtml(item.role)}</small>` : ""}</div>`).join("")}</div>
        </section>
      </div>
      ${state.feedback ? renderFeedback(state.feedback) : ""}
      <div class="action-row">
        <button class="btn ghost" data-action="reset-build" ${state.feedback ? "disabled" : ""}>Recommencer</button>
        ${state.feedback ? `<button class="btn primary" data-action="next">Continuer</button>` : `<button class="btn primary" data-action="submit-build" ${state.buildSelection.length ? "" : "disabled"}>Valider l'architecture</button>`}
      </div>
    </div>
  `;
}

function renderAnalysisChallenge(challenge) {
  const selected = challenge.observations.filter((item) => state.analysisSelection.includes(item.id));
  const remaining = challenge.observations.filter((item) => !state.analysisSelection.includes(item.id));
  return `
    <div class="analysis-lab">
      <article class="text-case">
        <div class="case-head">
          <strong>Texte a analyser</strong>
          <span>${escapeHtml(challenge.body)}</span>
        </div>
        <p>${escapeHtml(challenge.passage)}</p>
      </article>
      <div class="analysis-axes">
        ${challenge.axes.map((axis) => `<span>${escapeHtml(axis)}</span>`).join("")}
      </div>
      <div class="builder-grid">
        <section>
          <div class="builder-head"><h3>Observations possibles</h3><span>${remaining.length} restantes</span></div>
          <div class="card-bank">
            ${remaining.map((item) => `
              <button class="drill-card analysis-card" data-action="pick-analysis" data-id="${item.id}" ${state.feedback ? "disabled" : ""}>
                <strong>${escapeHtml(item.title)}</strong>
                <span>${escapeHtml(item.text)}</span>
              </button>
            `).join("")}
          </div>
        </section>
        <section>
          <div class="builder-head"><h3>Ton diagnostic</h3><span>${state.analysisSelection.length}/4</span></div>
          <div class="speech-slots">
            ${Array.from({ length: 4 }, (_, index) => {
              const item = selected[index];
              return `<div class="slot ${item ? "filled" : ""}"><strong>${index + 1}. Observation</strong><span>${item ? escapeHtml(item.text) : "Choisis une observation defendable."}</span>${item ? `<small>${escapeHtml(item.title)}</small>` : ""}</div>`;
            }).join("")}
          </div>
        </section>
      </div>
      ${state.feedback ? renderFeedback(state.feedback) : ""}
      ${state.feedback && challenge.model ? `<article class="model-analysis"><strong>Analyse modele</strong><p>${escapeHtml(challenge.model)}</p></article>` : ""}
      <div class="action-row">
        <button class="btn ghost" data-action="reset-analysis" ${state.feedback ? "disabled" : ""}>Recommencer</button>
        ${state.feedback ? `<button class="btn primary" data-action="next">Continuer</button>` : `<button class="btn primary" data-action="submit-analysis" ${state.analysisSelection.length ? "" : "disabled"}>Valider l'analyse</button>`}
      </div>
    </div>
  `;
}

function targetLabel(role) {
  return {
    frame: "Cadrage", signal: "Signal", limit: "Limite", test: "Test", decision: "Decision",
    claim: "These mesuree", method: "Methode", result: "Resultat", uncertainty: "Incertitude", next: "Suite",
    ack: "Reception", boundary: "Cadre", question: "Question", criterion: "Critere", move: "Mouvement",
    hook: "Accroche", cost: "Cout", proof: "Preuve", guardrail: "Garde-fou", ask: "Demande",
    definition: "Definition", thesis: "These", benefit: "Benefice", risk: "Risque", rule: "Regle", evaluation: "Evaluation",
    fact: "Fait", impact: "Impact", repair: "Correction", close: "Cloture",
  }[role] || role;
}

function scoreQuality(score) {
  if (score >= 85) return "good";
  if (score >= 55) return "partial";
  return "bad";
}

function renderFeedback(feedback) {
  const title = feedback.score >= 85 ? "Coup critique" : feedback.score >= 55 ? "Coup correct" : "Coup fragile";
  return `<div class="feedback ${scoreQuality(feedback.score)}"><div><strong>${title} · ${feedback.score}%</strong><span>Combo x${state.combo}</span></div><p>${escapeHtml(feedback.text)}</p></div>`;
}

function renderNextActions() {
  return `<div class="action-row"><button class="btn ghost" data-action="home">Quitter</button><button class="btn primary" data-action="next">Defi suivant</button></div>`;
}

function renderResult() {
  const mission = currentMission();
  const score = Math.round(state.missionScore / mission.challenges.length);
  const xp = xpForScore(score, mission);
  const verdict = mission.id === "grand-oral" && score < 75 ? "Boss non valide" : "Mission terminee";
  return `
    <main class="result-screen">
      <section class="result-card">
        <span class="pill">${escapeHtml(verdict)}</span>
        <h1>${escapeHtml(mission.title)}</h1>
        <div class="result-score">${score}%</div>
        <p>${escapeHtml(resultNote(score, mission))}</p>
        <div class="result-grid"><div><span>XP gagnes</span><strong>+${xp}</strong></div><div><span>Combo final</span><strong>x${state.combo}</strong></div><div><span>Focus</span><strong>${state.progress.focus}/5</strong></div></div>
        <div class="action-row"><button class="btn" data-action="replay">Rejouer</button><button class="btn primary" data-action="finish">Inscrire le resultat</button></div>
      </section>
    </main>
  `;
}

function resultNote(score, mission) {
  if (mission.id === "grand-oral" && score < 75) return "Le Conseil n'est pas convaincu. Il faut au moins 75 % pour valider le boss final.";
  if (score >= 95) return "Performance nette : structure, preuve, ecoute et style restent alignes sous pression.";
  if (score >= 85) return "Tres solide : peu de failles exploitables, bon controle du terrain.";
  if (score >= 70) return "Correct : la ligne tient, mais certains choix restent trop rapides ou trop vagues.";
  if (score >= 55) return "Instable : tu vois une partie du piege, mais tu laisses trop d'angles d'attaque.";
  return "A retravailler : ralentis, identifie le mecanisme exact, puis reponds avec un critere.";
}

function xpForScore(score, mission) {
  const base = 90 + mission.challenges.length * 34 + Math.round(mission.unlockXp / 22);
  return Math.round(base * (0.42 + score / 135) + Math.min(state.combo * 8, 80) + (score >= 95 ? 80 : 0));
}

function bindEvents() {
  document.querySelectorAll("[data-action]").forEach((element) => element.addEventListener("click", handleAction));
}

function handleAction(event) {
  const action = event.currentTarget.dataset.action;
  const id = event.currentTarget.dataset.id;
  const index = Number(event.currentTarget.dataset.index);
  if (action === "guide") return update({ showGuide: true });
  if (action === "close-guide") return update({ showGuide: false });
  if (action === "reset") return resetProgress();
  if (action === "home") return goHome();
  if (action === "continue") return startNextAvailableMission();
  if (action === "start-mission") return startMission(id);
  if (action === "answer") return answerChoice(index);
  if (action === "next") return nextChallenge();
  if (action === "pick-card") return pickCard(id);
  if (action === "reset-build") return update({ buildSelection: [] });
  if (action === "submit-build") return submitBuild();
  if (action === "pick-analysis") return pickAnalysis(id);
  if (action === "reset-analysis") return update({ analysisSelection: [] });
  if (action === "submit-analysis") return submitAnalysis();
  if (action === "replay") return startMission(state.currentMissionId);
  if (action === "finish") return completeMission();
}

function update(patch) {
  Object.assign(state, patch);
  render();
}

function resetProgress() {
  if (!confirm("Reinitialiser toute la progression locale ?")) return;
  state.progress = clone(DEFAULT_PROGRESS);
  saveProgress();
  resetMissionRuntime();
  update({ screen: "home" });
}

function goHome() {
  resetMissionRuntime();
  update({ screen: "home" });
}

function startNextAvailableMission() {
  const firstOpen = MISSIONS.find((mission) => missionIsUnlocked(mission) && !state.progress.completed[mission.id]);
  const fallback = MISSIONS.find(missionIsUnlocked) || MISSIONS[0];
  startMission((firstOpen || fallback).id);
}

function startMission(id) {
  const mission = missionById(id);
  if (!mission || !missionIsUnlocked(mission)) return;
  Object.assign(state, {
    currentMissionId: id,
    challengeIndex: 0,
    missionScore: 0,
    combo: 0,
    selected: null,
    feedback: null,
    buildSelection: [],
    analysisSelection: [],
    screen: "mission",
  });
  render();
}

function resetMissionRuntime() {
  Object.assign(state, {
    currentMissionId: null,
    challengeIndex: 0,
    missionScore: 0,
    combo: 0,
    selected: null,
    feedback: null,
    buildSelection: [],
    analysisSelection: [],
  });
}

function answerChoice(index) {
  if (state.feedback) return;
  const option = currentChallenge().options[index];
  if (!option) return;
  const score = scoreWithFocus(option.score);
  state.selected = index;
  state.feedback = { score, text: option.feedback };
  state.missionScore += score;
  updateSkill(option.skill, score);
  updateRun(score);
  saveProgress();
  render();
}

function pickCard(id) {
  const challenge = currentChallenge();
  if (state.feedback || state.buildSelection.includes(id) || state.buildSelection.length >= challenge.target.length) return;
  state.buildSelection.push(id);
  render();
}

function pickAnalysis(id) {
  const challenge = currentChallenge();
  if (state.feedback || state.analysisSelection.includes(id) || state.analysisSelection.length >= 4) return;
  if (!challenge.observations.some((item) => item.id === id)) return;
  state.analysisSelection.push(id);
  render();
}

function submitBuild() {
  if (state.feedback) return;
  const challenge = currentChallenge();
  const selectedCards = state.buildSelection.map((id) => challenge.cards.find((item) => item.id === id)).filter(Boolean);
  let rawScore = 0;
  const details = [];
  selectedCards.forEach((item, index) => {
    const expected = challenge.target[index];
    if (item.id === expected) {
      rawScore += item.score;
      details.push(`${item.role} bien place`);
    } else if (challenge.target.includes(item.id) && item.score > 0) {
      rawScore += Math.round(item.score * 0.4);
      details.push(`${item.role} utile mais mal place`);
    } else {
      rawScore += item.score;
      details.push(`${item.role} affaiblit la sequence`);
    }
  });
  const missing = challenge.target.filter((role) => !state.buildSelection.includes(role));
  rawScore -= missing.length * 10;
  const score = scoreWithFocus(clamp(rawScore));
  state.feedback = { score, text: buildFeedbackText(score, details, missing) };
  state.missionScore += score;
  ["structure", "rhetoric", "strategy"].forEach((skill) => updateSkill(skill, score));
  updateRun(score);
  saveProgress();
  render();
}

function submitAnalysis() {
  if (state.feedback) return;
  const challenge = currentChallenge();
  const selectedItems = state.analysisSelection.map((id) => challenge.observations.find((item) => item.id === id)).filter(Boolean);
  const rawScore = selectedItems.reduce((total, item) => total + item.score, 0) - Math.max(0, 4 - selectedItems.length) * 12;
  const score = scoreWithFocus(clamp(rawScore));
  const good = selectedItems.filter((item) => item.score > 0).length;
  const traps = selectedItems.filter((item) => item.score < 0).length;

  state.feedback = {
    score,
    text: analysisFeedbackText(score, good, traps, selectedItems.length),
  };
  state.missionScore += score;
  selectedItems.forEach((item) => {
    if (item.score > 0) updateSkill(item.skill, score);
  });
  updateSkill("clarity", score);
  updateRun(score);
  saveProgress();
  render();
}

function scoreWithFocus(score) {
  return clamp(score + (state.progress.focus >= 4 && score >= 85 ? 4 : 0));
}

function buildFeedbackText(score, details, missing) {
  const base = details.length ? details.join(" · ") : "Aucune carte selectionnee.";
  const missingText = missing.length ? ` Elements manquants : ${missing.map(targetLabel).join(", ")}.` : "";
  const advice = score >= 85 ? " L'architecture resiste bien aux objections." : score >= 55 ? " La base tient, mais l'ordre laisse une prise." : " La sequence devient floue, agressive ou trop facile a contester.";
  return `${base}.${missingText}${advice}`;
}

function analysisFeedbackText(score, good, traps, count) {
  const base = `${good} observation(s) solide(s), ${traps} piege(s), ${count}/4 element(s) selectionne(s).`;
  if (score >= 85) return `${base} Diagnostic net : tu relies les procedes a leur effet sur le public.`;
  if (score >= 55) return `${base} Analyse exploitable, mais il manque un lien plus precis entre forme, preuve et intention.`;
  return `${base} Analyse fragile : tu reperes des impressions, pas encore des mecanismes rhetoriques defendables.`;
}

function updateSkill(skill, score) {
  if (!skill || state.progress.mastery[skill] === undefined) return;
  state.progress.mastery[skill] = clamp(state.progress.mastery[skill] + (score >= 85 ? 7 : score >= 55 ? 4 : 1));
}

function updateRun(score) {
  if (score >= 85) {
    state.combo += 1;
    state.progress.streak += 1;
    if (score >= 98) state.progress.focus = clamp(state.progress.focus + 1, 0, 5);
  } else if (score < 55) {
    state.combo = 0;
    state.progress.streak = 0;
    state.progress.focus = clamp(state.progress.focus - 1, 0, 5);
  }
  state.progress.bestCombo = Math.max(state.progress.bestCombo, state.combo);
}

function nextChallenge() {
  const mission = currentMission();
  if (state.challengeIndex < mission.challenges.length - 1) {
    Object.assign(state, { challengeIndex: state.challengeIndex + 1, selected: null, feedback: null, buildSelection: [], analysisSelection: [] });
    render();
    return;
  }
  update({ screen: "result" });
}

function completeMission() {
  const mission = currentMission();
  const score = Math.round(state.missionScore / mission.challenges.length);
  const validBoss = mission.id !== "grand-oral" || score >= 75;
  const xp = xpForScore(score, mission);
  const previous = state.progress.completed[mission.id];
  state.progress.xp += xp;
  if (validBoss) {
    state.progress.completed[mission.id] = { best: previous ? Math.max(previous.best, score) : score, last: score };
  }
  state.progress.history.push({
    title: mission.title,
    score,
    xp,
    combo: state.combo,
    date: new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }),
    note: resultNote(score, mission),
  });
  state.progress.history = state.progress.history.slice(-12);
  if (score >= 88) state.progress.focus = clamp(state.progress.focus + 1, 0, 5);
  saveProgress();
  resetMissionRuntime();
  update({ screen: "home" });
}

function renderFooter() {
  return `<footer class="footer">Prototype local. Les missions et les regles de score sont dans <code>app.js</code>.</footer>`;
}

function renderGuideModal() {
  return `
    <div class="modal-backdrop" data-action="close-guide">
      <section class="modal" role="dialog" aria-modal="true" aria-labelledby="guide-title" onclick="event.stopPropagation()">
        <h2 id="guide-title">Regles d'Agora</h2>
        <p>Tu gagnes des XP, tu montes en ligue et tu deverrouilles des arenes. Les niveaux avances sont volontairement difficiles : plusieurs options sont plausibles, une seule traite le mecanisme exact.</p>
        <ul>
          <li><strong>Coup critique :</strong> 85 % ou plus. Le combo augmente.</li>
          <li><strong>Coup fragile :</strong> moins de 55 %. Le combo tombe et le focus baisse.</li>
          <li><strong>Focus :</strong> donne un bonus aux tres bonnes reponses quand il est haut.</li>
          <li><strong>Boss final :</strong> le Conseil de crise demande au moins 75 %.</li>
          <li><strong>Build :</strong> les cartes utiles doivent aussi etre dans le bon ordre.</li>
        </ul>
        <div class="action-row"><button class="btn primary" data-action="close-guide">Fermer</button></div>
      </section>
    </div>
  `;
}

render();
