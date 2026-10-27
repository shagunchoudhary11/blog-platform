'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { createPost, Post } from '@/lib/posts';

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(false);
  const [msg, setMsg] = useState('');
  const [ready, setReady] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from('posts')
      .select('id,title,slug,markdown,tags,published')
      .order('created_at', { ascending: false });
    setPosts((data as Post[]) ?? []);
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) window.location.href = '/login';
      else { setReady(true); load(); }
    });
  }, []);

  const add = async () => {
    if (!title.trim() || !markdown.trim()) return setMsg('Title aur content daalo');
    const { error } = await createPost(
      title.trim(), markdown, tags.split(',').map(t => t.trim()).filter(Boolean), published
    );
    if (error) return setMsg(error.message);
    setTitle(''); setMarkdown(''); setTags(''); setPublished(false); setMsg('Saved!');
    load();
  };

  const edit = async (p: Post) => {
    const t = prompt('Edit title', p.title);
    if (!t || !t.trim()) return;
    await supabase.from('posts').update({ title: t.trim(), updated_at: new Date().toISOString() }).eq('id', p.id);
    load();
  };

  const toggle = async (p: Post) => {
    await supabase.from('posts').update({ published: !p.published }).eq('id', p.id);
    load();
  };

  const del = async (p: Post) => {
    if (!confirm('Delete this post?')) return;
    await supabase.from('posts').delete().eq('id', p.id);
    load();
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  if (!ready) return <p>Loading...</p>;

  return (
    <main style={{ maxWidth: 640, margin: '40px auto', padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </div>

      <div style={{ display: 'grid', gap: 8 }}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea rows={6} placeholder="Write in markdown..." value={markdown} onChange={e => setMarkdown(e.target.value)} />
        <input placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
        <label>
          <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} /> Publish
        </label>
        <button onClick={add}>Save post</button>
        <p>{msg}</p>
      </div>

      <h2>My posts</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map(p => (
          <li key={p.id} style={{ display: 'flex', gap: 8, padding: '8px 0', alignItems: 'center' }}>
            <span style={{ flex: 1 }}>
              {p.title} {p.published ? '(published)' : '(draft)'}
            </span>
            <button onClick={() => edit(p)}>Edit</button>
            <button onClick={() => toggle(p)}>{p.published ? 'Unpublish' : 'Publish'}</button>
            <button onClick={() => del(p)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}