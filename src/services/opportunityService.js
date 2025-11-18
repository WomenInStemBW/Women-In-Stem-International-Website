import { supabase } from './supabaseClient';

// Get all opportunity groups with their opportunities
export const getAllGroupsWithOpportunities = async () => {
  try {
    // First get all groups
    const { data: groups, error: groupsError } = await supabase
      .from('opportunity_groups')
      .select('*')
      .order('name');

    if (groupsError) throw groupsError;

    // Then get all opportunities and group them by group_id
    const { data: opportunities, error: opportunitiesError } = await supabase
      .from('opportunities')
      .select('*')
      .order('created_at', { ascending: false });

    if (opportunitiesError) throw opportunitiesError;

    // Combine groups with their opportunities
    const groupsWithOpportunities = groups.map(group => ({
      ...group,
      opportunities: opportunities.filter(opp => opp.group_id === group.id)
    }));

    return { data: groupsWithOpportunities, error: null };
  } catch (error) {
    console.error('Error fetching groups with opportunities:', error);
    return { data: null, error };
  }
};

// Get all opportunity groups
export const getAllGroups = async () => {
  try {
    const { data, error } = await supabase
      .from('opportunity_groups')
      .select('*')
      .order('name');

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching groups:', error);
    return { data: null, error };
  }
};

// Get single group by ID with opportunities
export const getGroupById = async (id) => {
  try {
    // Get group
    const { data: group, error: groupError } = await supabase
      .from('opportunity_groups')
      .select('*')
      .eq('id', id)
      .single();

    if (groupError) throw groupError;

    // Get group opportunities
    const { data: opportunities, error: opportunitiesError } = await supabase
      .from('opportunities')
      .select('*')
      .eq('group_id', id)
      .order('created_at', { ascending: false });

    if (opportunitiesError) throw opportunitiesError;

    return { data: { ...group, opportunities }, error: null };
  } catch (error) {
    console.error('Error fetching group:', error);
    return { data: null, error };
  }
};

// Create new opportunity group
export const createGroup = async (groupData) => {
  try {
    const newGroup = {
      ...groupData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('opportunity_groups')
      .insert([newGroup])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating group:', error);
    return { data: null, error };
  }
};

// Update opportunity group
export const updateGroup = async (id, groupData) => {
  try {
    const updates = {
      ...groupData,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('opportunity_groups')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating group:', error);
    return { data: null, error };
  }
};

// Delete opportunity group
export const deleteGroup = async (id) => {
  try {
    // First delete all opportunities in this group
    const { error: opportunitiesError } = await supabase
      .from('opportunities')
      .delete()
      .eq('group_id', id);

    if (opportunitiesError) throw opportunitiesError;

    // Then delete the group
    const { error } = await supabase
      .from('opportunity_groups')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { data: { success: true }, error: null };
  } catch (error) {
    console.error('Error deleting group:', error);
    return { data: null, error };
  }
};

// Get all opportunities (for backward compatibility)
export const getAllOpportunities = async () => {
  try {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*, opportunity_groups(name)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return { data: null, error };
  }
};

// Get opportunity by ID
export const getOpportunityById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*, opportunity_groups(name)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching opportunity:', error);
    return { data: null, error };
  }
};

// Create new opportunity
export const createOpportunity = async (opportunityData) => {
  try {
    const newOpportunity = {
      ...opportunityData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('opportunities')
      .insert([newOpportunity])
      .select('*, opportunity_groups(name)')
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating opportunity:', error);
    return { data: null, error };
  }
};

// Update opportunity
export const updateOpportunity = async (id, opportunityData) => {
  try {
    const updates = {
      ...opportunityData,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('opportunities')
      .update(updates)
      .eq('id', id)
      .select('*, opportunity_groups(name)')
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating opportunity:', error);
    return { data: null, error };
  }
};

// Delete opportunity
export const deleteOpportunity = async (id) => {
  try {
    const { error } = await supabase
      .from('opportunities')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { data: { success: true }, error: null };
  } catch (error) {
    console.error('Error deleting opportunity:', error);
    return { data: null, error };
  }
};

// Upload image to Supabase Storage
export const uploadImage = async (file) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `opportunity-images/${fileName}`;

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