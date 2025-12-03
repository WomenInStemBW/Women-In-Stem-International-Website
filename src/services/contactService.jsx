// src/services/contactService.js
import { supabase } from './supabaseClient';

import emailjs from '@emailjs/browser';

// EmailJS credentials (get from EmailJS dashboard)
const EMAILJS_SERVICE_ID = 'service_50i8omn';
const EMAILJS_TEMPLATE_ID = 'template_2jbgbvv';
const EMAILJS_PUBLIC_KEY = 'bi0rnHG6n43Pi4L2U';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export const submitContactForm = async (formData) => {
  try {
    // 1. Save to Supabase database
    const { data: dbData, error: dbError } = await supabase
      .from('contact_messages')
      .insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        subject: formData.subject,
        message: formData.message
      }])
      .select()
      .single();

    if (dbError) throw dbError;

    // 2. Send email via EmailJS (client-side)
    const emailResult = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        subject: formData.subject,
        message: formData.message,
        to_email: 'tumok@wisbw.org,womeninsteminternational@gmail.com',
        reply_to: formData.email
      }
    );

    console.log('Email sent successfully:', emailResult);

    return { 
      data: { 
        dbRecord: dbData,
        emailResult 
      }, 
      error: null 
    };

  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { data: null, error };
  }
};

// Get all contact messages (admin)
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
export const markMessageAsRead = async (id, read = true) => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ read })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error updating message:', error);
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
    console.error('Error deleting message:', error);
    return { error };
  }
};