import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { mockEvents } from '../mockData';

const formatDate = (dateString) => {
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

export default function Events() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (import.meta.env.DEV) {
      // En mode développement, utiliser les données fictives
      console.log('Mode développement : utilisation des données fictives');
      setEvents(mockEvents);
      setLoading(false);
    } else {
      // En production, utiliser Supabase
      console.log('Mode production : utilisation de Supabase');
      fetchEvents();
    }
  }, []);

  async function fetchEvents() {
    try {
      setLoading(true);
      console.log('Tentative de récupération des événements...');

      // Vérification de la structure de la table
      const { data: tableInfo, error: tableError } = await supabase
        .from('events')
        .select('id, title, date, description')
        .limit(1);

      console.log('Structure de la table:', tableInfo);

      if (tableError) {
        console.error('Erreur lors de la vérification de la table:', tableError);
        setError(tableError.message);
        return;
      }

      // Vérification de la connexion à la table
      const { count, error: countError } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true });

      console.log('Nombre total d\'événements:', count);

      if (countError) {
        console.error('Erreur lors du comptage:', countError);
        setError(countError.message);
        return;
      }

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) {
        console.error('Erreur Supabase:', error);
        setError(error.message);
      } else {
        console.log('Événements récupérés:', data);
        setEvents(data || []);
      }
    } catch (err) {
      console.error('Erreur inattendue:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const now = new Date();
  const upcoming = events.find((e) => new Date(e.date) >= now);
  const past = events.filter((e) => new Date(e.date) < now);

  const isValidImageUrl = (url) => {
    if (!url) return false;
    try {
      const urlObj = new URL(url);
      // Vérifie que l'URL utilise HTTPS pour la sécurité
      return urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const validateEvent = (event) => {
    const required = ['title', 'date', 'description'];
    return required.every(field => event[field]);
  };

  if (loading) {
    return <div className="text-center py-8">Chargement des événements...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Erreur: {error}</div>;
  }

  return (
    <section className="py-8 text-primary source-sans flex flex-col items-center relative">
      <img src="/images/wow.svg" alt="omg" className="w-1/3 absolute top-[0px] right-[-140px] z-[-1]" />
      <h2 className="text-2xl bowlby text-4xl mb-4 relative"><img src="/images/the.svg" alt="the" className="w-1/8 absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2" />Prochain événement</h2>
      {upcoming ? (
        <div className="border border-primary bg-white border-4 p-3 mb-16 flex gap-4 shadow-[0.75rem_0.75rem_0_0_#252740] w-full">
          {upcoming.image_url && isValidImageUrl(upcoming.image_url) && (
            <img
            src={upcoming.image_url}
            alt={upcoming.title}
            className="w-full h-64 object-cover"
            />
          )}
          <div className="content flex flex-col grow justify-between">
            <div className="text-content">
              <h3 className="text-xl font-bold">{upcoming.title}</h3>
              <p>{formatDate(upcoming.date)}</p>
              <p className="mt-2">{upcoming.description}</p>
            </div>
            {upcoming.eventbrite_url && (
              <a
              href={upcoming.eventbrite_url}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start inline-block mt-4 px-6 py-2 bg-primary text-white hover:bg-black transition-colors"
              >
                S'inscrire sur Eventbrite
              </a>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Aucun événement à venir.</p>
      )}

      {past.length > 0 && (
        <>
        <h2 className="text-2xl bowlby text-4xl mt-16 mb-4 relative"><img src="/images/our.svg" alt="our" className="w-1/8 absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2" />Dernières dingz</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {past.slice(0, 3).map((e) => (
              <li key={e.id} className="border border-primary border-4 p-3 shadow-[0.75rem_0.75rem_0_0_#252740]">
                {e.image_url && isValidImageUrl(e.image_url) && (
                  <img
                    src={e.image_url}
                    alt={e.title}
                    className="w-full h-48 object-cover mb-4"
                  />
                )}
                <h3 className="font-bold text-lg leading-none mb-1">{e.title}</h3>
                <p className="text-sm text-primary-low">{formatDate(e.date)}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}