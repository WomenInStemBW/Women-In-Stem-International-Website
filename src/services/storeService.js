// src/services/storeService.js
import { supabase } from './supabaseClient';

// Upload store item image to Supabase Storage
export const uploadStoreImage = async (file) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `store-images/${fileName}`;

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
    console.error('Error uploading image:', error);
    return { data: null, error };
  }
};

// Delete store image from Supabase Storage
export const deleteStoreImage = async (imageUrl) => {
  try {
    // Extract file path from URL
    const urlParts = imageUrl.split('/store-images/');
    if (urlParts.length < 2) {
      throw new Error('Invalid image URL');
    }
    const filePath = `store-images/${urlParts[1]}`;

    const { error } = await supabase.storage
      .from('WomenInStem-Blog')
      .remove([filePath]);

    if (error) throw error;

    return { error: null };
  } catch (error) {
    console.error('Error deleting image:', error);
    return { error };
  }
};

// Get all active store items (public)
export const getAllStoreItems = async () => {
  try {
    const { data, error } = await supabase
      .from('store_items')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching store items:', error);
    return { data: null, error };
  }
};

// Get all store items (admin - includes inactive)
export const getAllStoreItemsAdmin = async () => {
  try {
    const { data, error } = await supabase
      .from('store_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching store items:', error);
    return { data: null, error };
  }
};

// Get store item by ID
export const getStoreItemById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('store_items')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching store item:', error);
    return { data: null, error };
  }
};

// Create new store item
export const createStoreItem = async (itemData) => {
  try {
    const { data, error } = await supabase
      .from('store_items')
      .insert([itemData])
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error creating store item:', error);
    return { data: null, error };
  }
};

// Update store item
export const updateStoreItem = async (id, itemData) => {
  try {
    console.log('Updating item with ID:', id, 'Data:', itemData);
    
    // Clean up the data - remove any undefined or null values that might cause issues
    const cleanData = {};
    Object.keys(itemData).forEach(key => {
      if (itemData[key] !== undefined && itemData[key] !== null) {
        cleanData[key] = itemData[key];
      }
    });
    
    console.log('Clean data for update:', cleanData);
    
    const { data, error } = await supabase
      .from('store_items')
      .update(cleanData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase update error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        stack: error.stack
      });
      throw new Error(`Supabase error: ${error.message} - ${error.details || ''}`);
    }

    console.log('Update successful:', data);
    return { data, error: null };
  } catch (error) {
    console.error('Error updating store item:', error);
    return { data: null, error };
  }
};

// Delete store item
export const deleteStoreItem = async (id) => {
  try {
    const { error } = await supabase
      .from('store_items')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return { error: null };
  } catch (error) {
    console.error('Error deleting store item:', error);
    return { error };
  }
};

// Toggle store item active status
export const toggleStoreItemStatus = async (id, isActive) => {
  try {
    const { data, error } = await supabase
      .from('store_items')
      .update({ is_active: isActive })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error toggling store item status:', error);
    return { data: null, error };
  }
};

// Submit store registration (purchase inquiry)
export const submitStoreRegistration = async (registrationData) => {
  try {
    const { data, error } = await supabase
      .from('store_registrations')
      .insert([registrationData])
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error submitting store registration:', error);
    return { data: null, error };
  }
};

// Get all store registrations (admin)
export const getAllStoreRegistrations = async () => {
  try {
    const { data, error } = await supabase
      .from('store_registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching store registrations:', error);
    return { data: null, error };
  }
};

// Delete store registration
export const deleteStoreRegistration = async (id) => {
  try {
    const { error } = await supabase
      .from('store_registrations')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return { error: null };
  } catch (error) {
    console.error('Error deleting store registration:', error);
    return { error };
  }
};