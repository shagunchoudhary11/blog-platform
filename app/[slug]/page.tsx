import { Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';

async function PostBody({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: post } = await supabase
    .from('posts').select('*')
    .eq('slug', slug).eq('published', true).single();
  if (!post) notFound();
  return (
    <>
      <h1>{post.title}</h1>
      <ReactMarkdown>{post.markdown}</ReactMarkdown>
    </>
  );
}

export default function Post({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <main style={{ maxWidth: 640, margin: '40px auto', padding: 24 }}>
      <Link href="/">← Back</Link>
      <Suspense fallback={<p>Loading...</p>}>
        <PostBody params={params} />
      </Suspense>
    </main>
  );
}
