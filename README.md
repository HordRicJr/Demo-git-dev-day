# Demo-git-dev-day

AstroQuiz est un petit jeu de culture spatiale en français. Réponds aux huit
questions, découvre ton score, puis rejoue pour tenter de faire un sans-faute.

## Jouer en local

Ouvre simplement `index.html` dans un navigateur. Le jeu est en HTML, CSS et
JavaScript natifs : aucune installation ni compilation n'est nécessaire.

## Déploiement GitHub Pages

Dans le dépôt GitHub, ouvre **Settings → Pages**, puis choisis
**GitHub Actions** comme source de déploiement. Cette activation initiale doit
être faite dans les paramètres du dépôt.

Le workflow `.github/workflows/deploy.yml` publie ensuite automatiquement le
site à chaque push sur `main` (ou manuellement depuis l'onglet Actions).

Une fois le workflow terminé, le site sera disponible à l'adresse :

`https://hordricjr.github.io/Demo-git-dev-day/`
