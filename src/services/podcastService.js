// src/services/podcastService.js

import { supabase } from './supabaseClient';

// Get all published podcast episodes
export const getAllPublishedEpisodes = async () => {
  try {
    const { data, error } = await supabase
      .from('podcast_episodes')
      .select('*')
      .eq('published', true)
      .order('episode_number', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching published episodes:', error);
    return { data: null, error };
  }
};

// Get all podcast episodes (for admin)
export const getAllEpisodes = async () => {
  try {
    const { data, error } = await supabase
      .from('podcast_episodes')
      .select('*')
      .order('episode_number', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching all episodes:', error);
    return { data: null, error };
  }
};

// Get episode by ID
export const getEpisodeById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('podcast_episodes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching episode:', error);
    return { data: null, error };
  }
};

// Create new podcast episode
export const createEpisode = async (episodeData) => {
  try {
    const newEpisode = {
      ...episodeData,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('podcast_episodes')
      .insert([newEpisode])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating episode:', error);
    return { data: null, error };
  }
};

// Update podcast episode
export const updateEpisode = async (id, episodeData) => {
  try {
    const { data, error } = await supabase
      .from('podcast_episodes')
      .update(episodeData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating episode:', error);
    return { data: null, error };
  }
};

// Delete podcast episode
export const deleteEpisode = async (id) => {
  try {
    const { error } = await supabase
      .from('podcast_episodes')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { data: { success: true }, error: null };
  } catch (error) {
    console.error('Error deleting episode:', error);
    return { data: null, error };
  }
};