'use client';
import { useEffect, useState } from 'react';
export default function Admin() {
  const [settings,setSettings] = useState({exchange:150,markup:10,shipping:200});
  const [orders,setOrders] = useState<any[]>([]);
  useEffect(()=>{ async function load(){ const res = await fetch('/api/admin/settings'); const js = await res.json(); setSettings(js); const ro = await fetch('/api/admin/orders'); setOrders(await ro.json()); } load(); },[]);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin</h1>
      <section className="bg-white p-4 rounded shadow mb-4">
        <h2 className="font-semibold">Settings</h2>
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div><label>Exchange rate</label><input value={settings.exchange} onChange={e=>setSettings(s=>({...s,exchange:Number(e.target.value)}))} className="border p-2 rounded w-full"/></div>
          <div><label>Markup %</label><input value={settings.markup} onChange={e=>setSettings(s=>({...s,markup:Number(e.target.value)}))} className="border p-2 rounded w-full"/></div>
          <div><label>Shipping DZD</label><input value={settings.shipping} onChange={e=>setSettings(s=>({...s,shipping:Number(e.target.value)}))} className="border p-2 rounded w-full"/></div>
        </div>
        <button className="mt-3 bg-blue-600 text-white px-3 py-1 rounded">Save</button>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Orders</h2>
        <table className="w-full text-sm">
          <thead><tr><th>ID</th><th>Name</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            {orders.map(o=>(
              <tr key={o.id}><td>{o.orderId}</td><td>{o.customerName}</td><td>{o.totalDzd}</td><td>{o.status}</td></tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
