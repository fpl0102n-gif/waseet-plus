'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
export default function Checkout() {
  const sp = useSearchParams();
  const pid = sp.get('productId') || '';
  const [name,setName]=useState(''); const [phone,setPhone]=useState(''); const [addr,setAddr]=useState('');
  const [loading,setLoading]=useState(false);
  async function submit() {
    if(!name||!phone||!addr) return alert('Please fill required fields');
    setLoading(true);
    try {
      const res = await fetch('/api/create-order', {
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({
          product_id: pid, user:{name,phone,address:addr}, qty:1, final_price_dzd: 0, payment_method:'bank_transfer'
        })
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || 'Order failed');
      alert('Order created: ' + data.order_id);
    } catch(err:any){ alert(err.message) } finally { setLoading(false) }
  }
  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <input className="border p-2 rounded w-full mt-3" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)}/>
      <input className="border p-2 rounded w-full mt-3" placeholder="Phone (+213...)" value={phone} onChange={e=>setPhone(e.target.value)}/>
      <textarea className="border p-2 rounded w-full mt-3" placeholder="Address" value={addr} onChange={e=>setAddr(e.target.value)}/>
      <button onClick={submit} className="mt-3 bg-blue-600 text-white px-3 py-1 rounded" disabled={loading}>{loading?'Submitting...':'Confirm order & pay'}</button>
    </div>
  )
}
