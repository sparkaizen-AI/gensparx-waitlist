import { type InsertWaitlist, type WaitlistEntry } from "@shared/schema";
import { supabaseAdmin } from "@shared/supabase";

export interface IStorage {
  createWaitlistEntry(entry: InsertWaitlist): Promise<WaitlistEntry>;
  getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined>;
}

export class SupabaseStorage implements IStorage {
  async createWaitlistEntry(entry: InsertWaitlist): Promise<WaitlistEntry> {
    const { data, error } = await supabaseAdmin
      .from('waitlist')
      .insert([entry])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create waitlist entry: ${error.message}`);
    }

    return data;
  }

  async getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined> {
    const { data, error } = await supabaseAdmin
      .from('waitlist')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      throw new Error(`Failed to fetch waitlist entry: ${error.message}`);
    }

    return data || undefined;
  }
}

export const storage = new SupabaseStorage();
