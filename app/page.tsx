import { Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

async function Posts() {
  const { data: posts } = await supabase
    .from('posts')
    .select('title, slug, tags, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false });

  return (
    <>
      {posts?.length === 0 && <p>No posts yet.</p>}
      {posts?.map(p => (
        <article key={p.slug} style={{ padding: '12px 0', borderBottom: '1px solid #ddd' }}>
          <h2><Link href={`/${p.slug}`}>{p.title}</Link></h2>
          <small>{new Date(p.created_at).toDateString()} {p.tags?.length ? ' | ' + p.tags.join(', ') : ''}</small>
        </article>
      ))}
    </>
  );
}

export default function Home() {
  return (
    <main style={{ maxWidth: 640, margin: '40px auto', padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>My Blog</h1>
        <Link href="/login">Login</Link>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <Posts />
      </Suspense>
    </main>
  );
}
