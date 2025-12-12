'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Dashboard() {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    // Fetch initial state
    supabase.from('status').select('*').eq('id', 1).single()
      .then(({ data }) => setStatus(data));

    // Subscribe to updates
    const channel = supabase
      .channel('realtime-status')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'status' }, (payload) => {
        setStatus(payload.new);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  if (!status) return <div className="text-xs text-gray-400">Loading...</div>;

  return (
    <div className="p-4 border border-stone-200 rounded-lg bg-white shadow-sm font-mono text-sm">
      <h3 className="uppercase tracking-widest text-xs font-bold text-stone-500 mb-4">Live Status</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Battery</span>
          <span className={status.battery_level < 20 ? 'text-red-500' : 'text-green-600'}>
            {status.battery_level}% {status.is_charging && '⚡'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Location</span>
          <span>{status.location_name}</span>
        </div>
      </div>
    </div>
  );
}
