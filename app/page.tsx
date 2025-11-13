'use client';
import { useState } from 'react';
export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  async function handleParse() {
    setResult(null);
    if(!url) return alert('Please paste a product link');
    setLoading(true);
    try {
      const res = await fetch('/api/parse-product', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || 'Parse failed');
      setResult(data);
    } catch(err:any) {
      alert(err.message || 'Error');
    } finally { setLoading(false); }
  }
  return (
    <div>
      <section className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-2">Paste product link — we calculate the price</h1>
        <p className="text-sm text-gray-600 mb-4">Support Temu & AliExpress links for this MVP.</p>
        <div className="flex gap-2">
          <input value={url} onChange={e => setUrl(e.target.value)} className="flex-1 border p-2 rounded" placeholder="Paste product link here"/>
          <button onClick={handleParse} className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? 'Parsing...' : 'Calculate price'}
          </button>
        </div>
      </section>

      {result && (
        <section className="mt-6 bg-white p-6 rounded shadow">
          <div className="flex gap-4">
            <img src={result.image} alt={result.title} className="w-32 h-32 object-cover rounded"/>
            <div>
              <h2 className="text-xl font-semibold">{result.title}</h2>
              <p>Source: {result.source}</p>
              <p>USD: ${result.price_usd}</p>
              <p className="font-bold text-lg mt-2">Final: {result.final_price_dzd} DZD</p>
              <a className="inline-block mt-3 bg-green-600 text-white px-3 py-1 rounded" href={`/checkout?productId=${encodeURIComponent(result.product_id)}`}>Order through Waseet</a>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
