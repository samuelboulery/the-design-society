import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { mockEvents } from '../mockData';

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
    <section className="py-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Prochain événement</h2>
      {upcoming ? (
        <div className="border p-4 rounded-lg mb-16">
          {upcoming.image_url && isValidImageUrl(upcoming.image_url) && (
            <img 
              src={upcoming.image_url} 
              alt={upcoming.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
          )}
          <h3 className="text-xl font-bold">{upcoming.title}</h3>
          <p>{new Date(upcoming.date).toLocaleDateString('fr-FR')}</p>
          <p className="mt-2">{upcoming.description}</p>
        </div>
      ) : (
        <p className="text-center text-gray-600">Aucun événement à venir.</p>
      )}

      {past.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-center">Événements passés</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {past.slice(0, 3).map((e) => (
              <li key={e.id} className="border p-4 rounded-lg">
                {e.image_url && isValidImageUrl(e.image_url) && (
                  <img 
                    src={e.image_url} 
                    alt={e.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <h3 className="font-medium text-lg">{e.title}</h3>
                <p className="text-sm text-gray-600">{new Date(e.date).toLocaleDateString('fr-FR')}</p>
                <p className="mt-2 text-sm text-gray-700 line-clamp-3">{e.description}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}