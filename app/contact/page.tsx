'use client';
import { useState } from 'react';
export default function Contact() {
  const [name,setName]=useState(''); const [msg,setMsg]=useState('');
  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold">Contact</h1>
      <input className="border p-2 rounded w-full mt-3" placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/>
      <textarea className="border p-2 rounded w-full mt-3" placeholder="Message" value={msg} onChange={e=>setMsg(e.target.value)} />
      <button className="mt-3 bg-blue-600 text-white px-3 py-1 rounded">Send</button>
    </div>
  )
}
