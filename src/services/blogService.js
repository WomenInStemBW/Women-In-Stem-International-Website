// src/services/blogService.js

import { supabase } from './supabaseClient';
import slugify from 'slugify';

// Get all published blog posts (for public blog page)
export const getAllPublishedPosts = async () => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching published posts:', error);
    return { data: null, error };
  }
};

// Get all blog posts (for admin)
export const getAllPosts = async () => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return { data: null, error };
  }
};

// Get single post by slug
export const getPostBySlug = async (slug) => {
  try {
    console.log('🔍 Fetching post with slug:', slug);
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    console.log('📄 Post fetch result:', { data, error });

    if (error) {
      console.error('❌ Error fetching post:', error);
      throw error;
    }

    if (!data) {
      throw new Error('Post not found');
    }

    return { data, error: null };
  } catch (error) {
    console.error('💥 Error in getPostBySlug:', error);
    return { data: null, error };
  }
};

// Get single post by ID (for admin editing)
export const getPostById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    return { data: null, error };
  }
};

// Create new blog post
export const createPost = async (postData) => {
  try {
    // Generate base slug from title
    let slug = slugify(postData.title, { lower: true, strict: true });
    
    // Check if slug already exists and make it unique if needed
    let counter = 1;
    let originalSlug = slug;
    
    while (true) {
      const { data: existingPost } = await supabase
        .from('blog_posts')
        .select('slug')
        .eq('slug', slug)
        .single();
      
      if (!existingPost) {
        // Slug is available, break the loop
        break;
      }
      
      // Slug exists, add counter and try again
      slug = `${originalSlug}-${counter}`;
      counter++;
      
      // Safety check to prevent infinite loop
      if (counter > 100) {
        throw new Error('Could not generate unique slug');
      }
    }

    // Get current admin from localStorage
    const adminData = JSON.parse(localStorage.getItem('wis_admin') || '{}');

    const newPost = {
      ...postData,
      slug,
      author_id: adminData?.id || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([newPost])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating post:', error);
    return { data: null, error };
  }
};

export const updatePost = async (id, postData) => {
  try {
    const updates = {
      ...postData,
      updated_at: new Date().toISOString(),
    };

    // Regenerate slug if title changed - WITH duplicate handling
    if (postData.title) {
      let slug = slugify(postData.title, { lower: true, strict: true });
      
      // Check if slug already exists (excluding current post)
      let counter = 1;
      let originalSlug = slug;
      
      while (true) {
        const { data: existingPost } = await supabase
          .from('blog_posts')
          .select('slug')
          .eq('slug', slug)
          .neq('id', id) // Exclude current post
          .single();
        
        if (!existingPost) {
          break;
        }
        
        slug = `${originalSlug}-${counter}`;
        counter++;
        
        if (counter > 100) {
          throw new Error('Could not generate unique slug');
        }
      }
      
      updates.slug = slug;
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating post:', error);
    return { data: null, error };
  }
};

// Delete blog post
export const deletePost = async (id) => {
  try {
    console.log('🔄 Attempting to delete post ID:', id);
    
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    console.log('❌ Delete response error:', error);

    if (error) throw error;
    
    console.log('✅ Post deleted successfully');
    return { data: { success: true }, error: null };
  } catch (error) {
    console.error('💥 Error deleting post:', error);
    return { data: null, error };
  }
};

// Upload image to Supabase Storage
export const uploadImage = async (file) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `cover-images/${fileName}`;

    const { data, error } = await supabase.storage
      .from('WomenInStem-Blog')  // Your bucket name
      .upload(filePath, file);

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('WomenInStem-Blog')  // Your bucket name
      .getPublicUrl(filePath);

    return { data: { url: publicUrl }, error: null };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { data: null, error };
  }
};