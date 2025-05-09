import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { uploadImage, deleteImage } from '../utils/storage';

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ id: null, title: '', description: '', date: '', image_url: '', eventbrite_url: '' });
  const [uploading, setUploading] = useState(false);

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
            image_url: form.image_url,
            eventbrite_url: form.eventbrite_url
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
            image_url: form.image_url,
            eventbrite_url: form.eventbrite_url
          });
        
        if (error) {
          console.error('Erreur lors de l\'ajout:', error);
          alert('Erreur lors de l\'ajout: ' + error.message);
          return;
        }
        console.log('Événement ajouté avec succès:', data);
      }
      setForm({ id: null, title: '', description: '', date: '', image_url: '', eventbrite_url: '' });
      fetchEvents();
    } catch (err) {
      console.error('Erreur inattendue:', err);
      alert('Une erreur est survenue: ' + err.message);
    }
  }

  async function handleImageUpload(event) {
    try {
      setUploading(true);
      const file = event.target.files[0];
      if (!file) return;

      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image valide');
        return;
      }

      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('L\'image ne doit pas dépasser 5MB');
        return;
      }

      const path = `events/${Date.now()}-${file.name}`;
      console.log('Tentative d\'upload vers le chemin:', path);
      
      const { publicUrl, error } = await uploadImage(file, path);
      console.log('Réponse de l\'upload:', { publicUrl, error });

      if (error) {
        console.error('Détails de l\'erreur:', error);
        throw error;
      }

      setForm({ ...form, image_url: publicUrl });
    } catch (error) {
      console.error('Erreur complète lors de l\'upload:', error);
      alert(`Erreur lors du téléchargement de l'image: ${error.message || 'Erreur inconnue'}`);
    } finally {
      setUploading(false);
    }
  }

  async function deleteEvent(id) {
    if (confirm('Supprimer cet événement ?')) {
      try {
        // Récupérer l'événement pour obtenir l'URL de l'image
        const { data: event } = await supabase
          .from('events')
          .select('image_url')
          .eq('id', id)
          .single();

        // Si l'événement a une image, la supprimer du stockage
        if (event?.image_url) {
          const path = event.image_url.split('/').pop();
          await deleteImage(`events/${path}`);
        }

        const { error } = await supabase.from('events').delete().eq('id', id);
        
        if (error) {
          console.error('Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression: ' + error.message);
          return;
        }
        
        console.log('Événement supprimé avec succès');
        fetchEvents();
      } catch (err) {
        console.error('Erreur inattendue lors de la suppression:', err);
        alert('Une erreur est survenue lors de la suppression: ' + err.message);
      }
    }
  }

  function editEvent(evt) {
    setForm({ 
      id: evt.id, 
      title: evt.title, 
      description: evt.description, 
      date: evt.date,
      image_url: evt.image_url || '',
      eventbrite_url: evt.eventbrite_url || ''
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
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Image de l'événement
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded"
            disabled={uploading}
          />
          {uploading && <p className="text-sm text-gray-500">Téléchargement en cours...</p>}
          {form.image_url && (
            <div className="mt-2">
              <img 
                src={form.image_url} 
                alt="Aperçu" 
                className="w-32 h-32 object-cover rounded"
              />
            </div>
          )}
        </div>
        <input
          type="url"
          placeholder="URL Eventbrite"
          className="w-full p-2 border rounded"
          value={form.eventbrite_url}
          onChange={(e) => setForm({ ...form, eventbrite_url: e.target.value })}
        />
        <button 
          type="submit" 
          className="px-4 py-2 bg-green-600 text-white rounded"
          disabled={uploading}
        >
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