import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL';

if (!isSupabaseConfigured) {
  console.warn('Supabase credentials are missing or placeholders. Check your .env.local file.');
}

// Provide a mock implementation that supports chaining and doesn't crash when Supabase is not configured
const createQueryBuilder = () => {
  const promise = Promise.resolve({ data: [], error: null });
  const builder = {
    then: promise.then.bind(promise),
    catch: promise.catch.bind(promise),
    finally: promise.finally.bind(promise),
    select: () => builder,
    insert: () => builder,
    update: () => builder,
    delete: () => builder,
    upsert: () => builder,
    eq: () => builder,
    neq: () => builder,
    in: () => builder,
    order: () => builder,
    limit: () => builder,
    range: () => builder,
    single: () => Promise.resolve({ data: null, error: null }),
    maybeSingle: () => Promise.resolve({ data: null, error: null }),
  };
  return builder;
};

const mockSupabase = {
  from: () => createQueryBuilder(),
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: () => Promise.resolve({ data: { session: null, user: null }, error: new Error('Supabase não configurado') }),
    signOut: () => Promise.resolve({ error: null }),
  }
};

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : mockSupabase;

