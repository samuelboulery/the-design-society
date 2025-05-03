import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ id: null, title: '', description: '', date: '', image_url: '' });

  useEffect(() => {
    // Vérifie si l'utilisateur est déjà connecté
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuthenticated(true);
        fetchEvents();
      }
    });
  }, []);

  async function login(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert('Erreur de connexion : ' + error.message);
    } else {
      setAuthenticated(true);
      fetchEvents();
    }
  }

  async function fetchEvents() {
    const { data } = await supabase.from('events').select('*').order('date', { ascending: false });
    setEvents(data || []);
  }

  async function saveEvent(e) {
    e.preventDefault();
    try {
      if (form.id) {
        console.log('Tentative de mise à jour de l\'événement:', form.id);
        const { data, error } = await supabase
          .from('events')
          .update({ 
            title: form.title, 
            description: form.description, 
            date: form.date,
            image_url: form.image_url 
          })
          .eq('id', form.id);
        
        if (error) {
          console.error('Erreur lors de la mise à jour:', error);
          alert('Erreur lors de la mise à jour: ' + error.message);
          return;
        }
        console.log('Événement mis à jour avec succès:', data);
      } else {
        console.log('Tentative d\'ajout d\'un nouvel événement');
        const { data, error } = await supabase
          .from('events')
          .insert({ 
            title: form.title, 
            description: form.description, 
            date: form.date,
            image_url: form.image_url 
          });
        
        if (error) {
          console.error('Erreur lors de l\'ajout:', error);
          alert('Erreur lors de l\'ajout: ' + error.message);
          return;
        }
        console.log('Événement ajouté avec succès:', data);
      }
      setForm({ id: null, title: '', description: '', date: '', image_url: '' });
      fetchEvents();
    } catch (err) {
      console.error('Erreur inattendue:', err);
      alert('Une erreur est survenue: ' + err.message);
    }
  }

  async function deleteEvent(id) {
    if (confirm('Supprimer cet événement ?')) {
      await supabase.from('events').delete().eq('id', id);
      fetchEvents();
    }
  }

  function editEvent(evt) {
    setForm({ 
      id: evt.id, 
      title: evt.title, 
      description: evt.description, 
      date: evt.date,
      image_url: evt.image_url || '' 
    });
  }

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 p-4 border rounded-lg">
        <form onSubmit={login}>
          <h2 className="text-xl mb-4">Connexion Admin</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full p-2 mb-4 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Se connecter</button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">Gestion des événements</h2>
      <form onSubmit={saveEvent} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Titre"
          className="w-full p-2 border rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          type="url"
          placeholder="URL de l'image"
          className="w-full p-2 border rounded"
          value={form.image_url}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
        />
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
          {form.id ? 'Modifier' : 'Ajouter'}
        </button>
      </form>
      <ul className="space-y-4">
        {events.map((evt) => (
          <li key={evt.id} className="flex justify-between items-center border p-4 rounded">
            <div>
              <h3 className="font-medium">{evt.title}</h3>
              <p className="text-sm text-gray-600">{new Date(evt.date).toLocaleDateString('fr-FR')}</p>
              {evt.image_url && (
                <img 
                  src={evt.image_url} 
                  alt={evt.title}
                  className="w-20 h-20 object-cover rounded mt-2"
                />
              )}
            </div>
            <div className="space-x-2">
              <button onClick={() => editEvent(evt)} className="px-2 py-1 border rounded">Éditer</button>
              <button onClick={() => deleteEvent(evt.id)} className="px-2 py-1 border rounded text-red-600">Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}