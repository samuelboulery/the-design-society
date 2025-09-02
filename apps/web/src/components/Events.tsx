'use client';

import React, { useEffect, useState } from 'react';

// Mock data pour les événements
const mockEvents = [
  {
    id: 1,
    title: "Atelier Design System",
    date: "2024-02-15",
    description: "Un atelier pratique pour apprendre à créer et maintenir un design system efficace.",
    image_url: null,
    eventbrite_url: "https://thedesignsociety.eventbrite.com"
  },
  {
    id: 2,
    title: "Conférence UX Research",
    date: "2024-01-20",
    description: "Les dernières tendances en recherche utilisateur avec des experts du domaine.",
    image_url: null,
    eventbrite_url: null
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
  
  // Mettre en majuscule la première lettre du jour et du mois
  return formattedDate.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  image_url?: string | null;
  eventbrite_url?: string | null;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Utilisation des données fictives
    setEvents(mockEvents);
    setLoading(false);
  }, []);

  const now = new Date();
  const upcoming = events.find((e) => new Date(e.date) >= now);
  const past = events.filter((e) => new Date(e.date) < now);

  const isValidImageUrl = (url?: string | null) => {
    if (!url) return false;
    try {
      const urlObj = new URL(url);
      // Vérifie que l'URL utilise HTTPS pour la sécurité
      return urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement des événements...</div>;
  }

  return (
    <section className="py-8 text-primary source-sans flex flex-col items-center relative">
      <img src="/images/wow.svg" alt="omg" width="300" height="100" className="w-1/3 absolute top-[0px] right-[-140px] z-[-1] hidden md:block" />
      <h2 className="text-2xl md:text-4xl bowlby mb-4 relative px-4"><img src="/images/the.svg" alt="the" width="52" height="52" className="w-[2.75rem] md:w-[3.25rem] absolute top-0 left-[20px] -translate-x-1/2 -translate-y-1/2" />Prochain événement</h2>
      {upcoming ? (
        <div className="border border-primary bg-white border-4 p-3 mb-16 flex flex-col md:flex-row gap-4 shadow-[0.75rem_0.75rem_0_0_#252740] w-full mx-4 md:mx-0">
          {upcoming.image_url && isValidImageUrl(upcoming.image_url) && (
            <img
              src={upcoming.image_url}
              alt={upcoming.title}
              width="356" height="256"
              className="w-full md:w-[356px] md:min-w-[356px] h-48 md:h-64 object-cover"
            />
          )}
          <div className="content grow flex flex-col justify-between">
            <div className="text-content">
              <h3 className="text-xl font-bold">{upcoming.title}</h3>
              <p className='text-sm text-primary-low'>{formatDate(upcoming.date)}</p>
              <p className="mt-2 line-clamp-4">{upcoming.description}</p>
            </div>
            {upcoming.eventbrite_url && (
              <a
                href={upcoming.eventbrite_url}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start inline-block mt-4 px-6 py-2 bg-primary text-white hover:bg-black transition-colors"
              >
                M'inscrire sur Eventbrite
              </a>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">On planche sur le sujet,<br />mais ça arrive bientôt promis !</p>
      )}

      {past.length > 0 && (
        <>
          <h2 className="text-2xl bowlby md:text-4xl mt-16 mb-4 relative"><img src="/images/our.svg" alt="our" width="56" height="56" className="w-[3rem] md:w-[3.5rem] absolute top-0 md:left-0 left-[8px] -translate-x-1/2 -translate-y-1/2" />Dernières dingz</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {past.slice(0, 3).map((e) => (
              <li key={e.id} className="border border-primary border-4 p-3 shadow-[0.75rem_0.75rem_0_0_#252740]">
                {e.image_url && isValidImageUrl(e.image_url) && (
                  <img
                    src={e.image_url}
                    alt={e.title}
                    width="300" height="192"
                    className="w-full h-48 object-cover mb-4"
                  />
                )}
                <h3 className="font-bold text-lg leading-none line-clamp-2 mb-1">{e.title}</h3>
                <p className="text-sm text-primary-low">{formatDate(e.date)}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}