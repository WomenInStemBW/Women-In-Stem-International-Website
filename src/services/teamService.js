// src/services/teamService.js

import { supabase } from './supabaseClient';

// Get all teams with their members
export const getAllTeamsWithMembers = async () => {
  try {
    // First get all teams
    const { data: teams, error: teamsError } = await supabase
      .from('teams')
      .select('*')
      .order('name');

    if (teamsError) throw teamsError;

    // Then get all team members and group them by team
    const { data: members, error: membersError } = await supabase
      .from('team_members')
      .select('*')
      .order('name');

    if (membersError) throw membersError;

    // Combine teams with their members
    const teamsWithMembers = teams.map(team => ({
      ...team,
      members: members.filter(member => member.team_id === team.id)
    }));

    return { data: teamsWithMembers, error: null };
  } catch (error) {
    console.error('Error fetching teams with members:', error);
    return { data: null, error };
  }
};

// Get single team by ID with members
export const getTeamById = async (id) => {
  try {
    // Get team
    const { data: team, error: teamError } = await supabase
      .from('teams')
      .select('*')
      .eq('id', id)
      .single();

    if (teamError) throw teamError;

    // Get team members
    const { data: members, error: membersError } = await supabase
      .from('team_members')
      .select('*')
      .eq('team_id', id)
      .order('name');

    if (membersError) throw membersError;

    return { data: { ...team, members }, error: null };
  } catch (error) {
    console.error('Error fetching team:', error);
    return { data: null, error };
  }
};

// Create new team
export const createTeam = async (teamData) => {
  try {
    const newTeam = {
      ...teamData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('teams')
      .insert([newTeam])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating team:', error);
    return { data: null, error };
  }
};

// Update team
export const updateTeam = async (id, teamData) => {
  try {
    const updates = {
      ...teamData,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('teams')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating team:', error);
    return { data: null, error };
  }
};

// Delete team
export const deleteTeam = async (id) => {
  try {
    const { error } = await supabase
      .from('teams')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { data: { success: true }, error: null };
  } catch (error) {
    console.error('Error deleting team:', error);
    return { data: null, error };
  }
};

// Create team member
export const createTeamMember = async (memberData) => {
  try {
    const newMember = {
      ...memberData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('team_members')
      .insert([newMember])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating team member:', error);
    return { data: null, error };
  }
};

// Update team member
export const updateTeamMember = async (id, memberData) => {
  try {
    const updates = {
      ...memberData,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('team_members')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating team member:', error);
    return { data: null, error };
  }
};

// Delete team member
export const deleteTeamMember = async (id) => {
  try {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { data: { success: true }, error: null };
  } catch (error) {
    console.error('Error deleting team member:', error);
    return { data: null, error };
  }
};