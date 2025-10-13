🐟 Front-End Fisheye
Projet 6 du parcours développeur Front-End — version “Fisheye” (site de photographe)

🎯 Objectif du projet
Ce projet a pour but de créer une interface web permettant de présenter un photographe, ses galeries, et de fournir une expérience interactive (tri, filtrage, lightbox, etc.), en respectant les consignes du curriculum OpenClassrooms pour le projet 6 du parcours Front-End.

📂 Structure du projet & technologies utilisées
HTML : pages principales (index, page photographe)
CSS : styles, mise en page responsive (flexbox, grid, media queries)
JavaScript : logique pour le tri, les filtres, l’affichage dynamique, les modales/lightboxes
Fichiers de données : les données des photographes / médias sont stockées dans un dossier data
Organisation : dossier assets pour images, css pour feuilles de style, scripts pour les scripts
Pas besoin de compilation : c’est un projet front-end pur (sans framework serveur/backend)
Fichier de configuration ESLint (eslint.config.mjs) pour les règles de style de code

🚀 Utilisation / démarrage
Cloner le dépôt
git clone https://github.com/Das-F/Front-End-Fisheye.git
Ouvrir le fichier index.html dans un navigateur (ou servir via un serveur local simple)
Le site s’ouvre directement — toutes les fonctionnalités (filtrage, tri, lightbox) sont disponibles

✅ Fonctionnalités & points forts
Affichage des photographes / médias à partir de données JSON
Filtrage et tri (populaire, date, titre)
Modal / lightbox pour visualisation des médias en plein écran
Compatibilité responsive : adapté aux mobiles, tablettes, desktops
Interface fluide, transitions agréables
Code structuré (modularité, séparation des responsabilités)
Respect des normes d’accessibilité (dans la mesure du possible)

⚠️ Limites & pistes d’évolution
Pas de backend — les données sont statiques
Pas de persistance (pas d’ajout / suppression dynamique depuis l’interface)
Améliorations possibles :
  • Intégrer une API pour charger les données à la volée
  • Ajouter une page d’administration pour gérer les médias / photographes
  • Optimiser les performances : lazy loading des images, etc.
  • Ajouter des tests automatisés (unitaires, fonctionnels)
  • Améliorer l’accessibilité (ARIA, navigation au clavier, etc.)

🎓 Objectifs pédagogiques visés
Maîtriser l’interaction JavaScript (DOM, événements, modales)
Gérer des données JSON / dynamique dans le front-end
Réaliser un site responsive sans framework
Appliquer les bonnes pratiques de code (lisibilité, modularité, maintenance)
