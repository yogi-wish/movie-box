
import { useState } from 'react';
import { API_BASE } from '../../lib/api';
import { useRouter } from 'next/router';

export default function NewMovie() {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      const form: any = new FormData();
      form.append('title', title);
      form.append('publishingYear', Number(year));
      if (file) form.append('poster', file);

      const res = await fetch(`${API_BASE}/movies`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form
      });
      if (!res.ok) {
        const txt = await res.text();
        setError(txt || 'Error');
        return;
      }
      router.push('/movies');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto card">
        <h2 className="text-2xl font-bold mb-4">Add New Movie</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input className="input" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Publishing Year</label>
            <input className="input" value={year} onChange={e => setYear(e.target.value)} type="number" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Poster</label>
            <input type="file" onChange={e => setFile(e.target.files?.[0] ?? null)} />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary">Create</button>
          </div>
          {error && <div className="text-red-600">{error}</div>}
        </form>
      </div>
    </main>
  );
}
