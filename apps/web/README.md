# The Design Society - Application Web

Cette application Next.js contient le design complet de la page d'accueil récupéré de la branche main.

## Structure

- `src/app/` - Pages et layout Next.js
- `src/components/` - Composants réutilisables
- `public/` - Assets statiques (images, icônes)

## Composants

- **Header** - En-tête avec logo et liens sociaux
- **Events** - Section des événements (prochains et passés)  
- **Team** - Section de présentation de l'équipe
- **ContactForm** - Formulaire de contact

## Développement

```bash
cd apps/web
npm install
npm run dev
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000).

## Design

Le design utilise :
- **Tailwind CSS** pour le styling
- **Google Fonts** (Bowlby One SC et Source Sans 3)
- **Couleurs personnalisées** définies dans le theme Tailwind