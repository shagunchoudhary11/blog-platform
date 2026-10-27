import { supabase } from '@/lib/supabase';

export type Post = {
  id: string;
  title: string;
  slug: string;
  markdown: string;
  tags: string[];
  published: boolean;
};

export async function createPost(title: string, markdown: string, tags: string[], published: boolean) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not signed in');
  const slug =
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') +
    '-' + Date.now().toString().slice(-4);
  return supabase.from('posts').insert({ author: user.id, title, slug, markdown, tags, published });
}