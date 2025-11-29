// src/services/contactService.js

import { supabase } from './supabaseClient';

// Submit contact form
export const submitContactForm = async (formData) => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          subject: formData.subject,
          message: formData.message
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { data: null, error };
  }
};

// Get all contact messages (for admin)
export const getAllContactMessages = async () => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return { data: null, error };
  }
};

// Mark message as read
export const markAsRead = async (id) => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ read: true })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error marking message as read:', error);
    return { data: null, error };
  }
};

// Delete contact message
export const deleteContactMessage = async (id) => {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting contact message:', error);
    return { error };
  }
};