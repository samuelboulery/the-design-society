import { supabase } from '../supabaseClient';

const BUCKET_NAME = 'images';

export const uploadImage = async (file, path) => {
  try {
    console.log('Début de l\'upload avec les paramètres:', { bucket: BUCKET_NAME, path });
    
    // Vérifier si l'utilisateur est authentifié
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError || !session) {
      throw new Error('Vous devez être connecté pour uploader des images');
    }

    // Tenter directement l'upload
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Erreur Supabase lors de l\'upload:', error);
      
      // Gérer les différents types d'erreurs
      if (error.message.includes('permission denied')) {
        throw new Error('Vous n\'avez pas les permissions nécessaires pour uploader des images');
      } else if (error.message.includes('does not exist')) {
        throw new Error(`Le bucket "${BUCKET_NAME}" n'existe pas. Veuillez le créer dans votre dashboard Supabase.`);
      } else {
        throw error;
      }
    }

    console.log('Upload réussi, données:', data);

    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(path);

    console.log('URL publique générée:', publicUrl);

    return { publicUrl, error: null };
  } catch (error) {
    console.error('Erreur détaillée dans uploadImage:', error);
    return { publicUrl: null, error };
  }
};

export const deleteImage = async (path) => {
  try {
    // Vérifier si l'utilisateur est authentifié
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError || !session) {
      throw new Error('Vous devez être connecté pour supprimer des images');
    }

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path]);

    if (error) {
      if (error.message.includes('permission denied')) {
        throw new Error('Vous n\'avez pas les permissions nécessaires pour supprimer des images');
      }
      throw error;
    }
    return { error: null };
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    return { error };
  }
};

export const getImageUrl = (path) => {
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path);
  return publicUrl;
}; 