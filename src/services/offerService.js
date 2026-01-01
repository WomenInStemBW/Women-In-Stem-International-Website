// src/services/offersService.js
import { supabase } from './supabaseClient';

// Upload flyer to Supabase Storage
export const uploadFlyer = async (file) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `offer-flyers/${fileName}`;

    const { data, error } = await supabase.storage
      .from('WomenInStem-Blog')
      .upload(filePath, file);

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('WomenInStem-Blog')
      .getPublicUrl(filePath);

    return { data: { url: publicUrl }, error: null };
  } catch (error) {
    console.error('Error uploading flyer:', error);
    return { data: null, error };
  }
};

// Delete flyer from Supabase Storage
export const deleteFlyer = async (flyerUrl) => {
  try {
    // Extract file path from URL
    const urlParts = flyerUrl.split('/offer-flyers/');
    if (urlParts.length < 2) {
      throw new Error('Invalid flyer URL');
    }
    const filePath = `offer-flyers/${urlParts[1]}`;

    const { error } = await supabase.storage
      .from('WomenInStem-Blog')
      .remove([filePath]);

    if (error) throw error;

    return { error: null };
  } catch (error) {
    console.error('Error deleting flyer:', error);
    return { error };
  }
};

// Get all offers
export const getAllOffers = async () => {
  try {
    const { data, error } = await supabase
      .from('offers')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching offers:', error);
    return { data: null, error };
  }
};

// Get all offers (admin - includes inactive)
export const getAllOffersAdmin = async () => {
  try {
    const { data, error } = await supabase
      .from('offers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching offers:', error);
    return { data: null, error };
  }
};

// Get offer by ID
export const getOfferById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('offers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching offer:', error);
    return { data: null, error };
  }
};

// Create new offer
export const createOffer = async (offerData) => {
  try {
    const { data, error } = await supabase
      .from('offers')
      .insert([offerData])
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error creating offer:', error);
    return { data: null, error };
  }
};

// Update offer
export const updateOffer = async (id, offerData) => {
  try {
    const { data, error } = await supabase
      .from('offers')
      .update(offerData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error updating offer:', error);
    return { data: null, error };
  }
};

// Delete offer
export const deleteOffer = async (id) => {
  try {
    const { error } = await supabase
      .from('offers')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return { error: null };
  } catch (error) {
    console.error('Error deleting offer:', error);
    return { error };
  }
};

// Toggle offer active status
export const toggleOfferStatus = async (id, isActive) => {
  try {
    const { data, error } = await supabase
      .from('offers')
      .update({ is_active: isActive })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error toggling offer status:', error);
    return { data: null, error };
  }
};

// Submit offer registration (booking)
export const submitOfferRegistration = async (registrationData) => {
  try {
    const { data, error } = await supabase
      .from('offer_registrations')
      .insert([registrationData])
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error submitting offer registration:', error);
    return { data: null, error };
  }
};

// Get all offer registrations (admin)
export const getAllOfferRegistrations = async () => {
  try {
    const { data, error } = await supabase
      .from('offer_registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching offer registrations:', error);
    return { data: null, error };
  }
};

// Delete offer registration
export const deleteOfferRegistration = async (id) => {
  try {
    const { error } = await supabase
      .from('offer_registrations')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return { error: null };
  } catch (error) {
    console.error('Error deleting offer registration:', error);
    return { error };
  }
};