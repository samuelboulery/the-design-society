import { supabase } from '../supabaseClient';

// Fonction pour récupérer toutes les images du bucket events
export const getAllImages = async () => {
  try {
    const { data, error } = await supabase.storage
      .from('images')
      .list('events');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des images:', error);
    return [];
  }
};

// Fonction pour récupérer tous les événements
export const getAllEvents = async () => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    return [];
  }
};

// Fonction pour supprimer une image
export const deleteImage = async (path) => {
  try {
    const { error } = await supabase.storage
      .from('images')
      .remove([path]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'image:', error);
    return false;
  }
};

// Fonction principale pour nettoyer les images orphelines
export const cleanupOrphanedImages = async () => {
  try {
    // Récupérer toutes les images et tous les événements
    const images = await getAllImages();
    const events = await getAllEvents();

    // Créer un Set des URLs d'images utilisées dans les événements
    const usedImageUrls = new Set(
      events
        .filter(event => event.image_url)
        .map(event => event.image_url)
    );

    // Trouver les images orphelines
    const orphanedImages = images.filter(image => {
      const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/events/${image.name}`;
      return !usedImageUrls.has(imageUrl);
    });

    // Supprimer les images orphelines
    for (const image of orphanedImages) {
      await deleteImage(`events/${image.name}`);
    }

    return {
      deletedCount: orphanedImages.length,
      deletedImages: orphanedImages.map(img => img.name)
    };
  } catch (error) {
    console.error('Erreur lors du nettoyage des images:', error);
    throw error;
  }
};

// Fonction pour trouver les événements sans image
export const findEventsWithoutImages = async () => {
  try {
    const events = await getAllEvents();
    return events.filter(event => !event.image_url);
  } catch (error) {
    console.error('Erreur lors de la recherche des événements sans image:', error);
    throw error;
  }
};

// Fonction pour supprimer un événement et son image associée
export const deleteEventAndImage = async (event) => {
  try {
    // Supprimer l'image si elle existe
    if (event.image_url) {
      const path = event.image_url.split('/').pop();
      await deleteImage(`events/${path}`);
    }

    // Supprimer l'événement
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', event.id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'événement:', error);
    return false;
  }
};

// Fonction pour nettoyer les anciens événements
export const cleanupOldEvents = async () => {
  try {
    // Récupérer tous les événements triés par date (du plus récent au plus ancien)
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;

    // Si nous avons plus de 6 événements, supprimer les plus anciens
    if (events.length > 6) {
      const eventsToDelete = events.slice(6);
      const deletedEvents = [];
      const failedDeletions = [];

      for (const event of eventsToDelete) {
        const success = await deleteEventAndImage(event);
        if (success) {
          deletedEvents.push(event);
        } else {
          failedDeletions.push(event);
        }
      }

      return {
        totalDeleted: deletedEvents.length,
        failedDeletions: failedDeletions.length,
        deletedEvents: deletedEvents.map(e => ({ id: e.id, title: e.title })),
        failedEvents: failedDeletions.map(e => ({ id: e.id, title: e.title }))
      };
    }

    return {
      totalDeleted: 0,
      failedDeletions: 0,
      deletedEvents: [],
      failedEvents: []
    };
  } catch (error) {
    console.error('Erreur lors du nettoyage des anciens événements:', error);
    throw error;
  }
}; 