'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { Users, Newspaper, Video, Wallet, TrendingUp, TrendingDown, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    jemaat: 0,
    news: 0,
    sermons: 0,
    finances: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [jemaatSnap, newsSnap, sermonSnap, financeSnap] = await Promise.all([
          getDocs(collection(db, 'congregations')),
          getDocs(collection(db, 'news')),
          getDocs(collection(db, 'sermons')),
          getDocs(collection(db, 'finances'))
        ]);

        setStats({
          jemaat: jemaatSnap.size,
          news: newsSnap.size,
          sermons: sermonSnap.size,
          finances: financeSnap.docs.reduce((acc, doc) => acc + (doc.data().amount || 0), 0)
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { name: 'Total Jemaat', value: stats.jemaat, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Warta Jemaat', value: stats.news, icon: Newspaper, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Khotbah Online', value: stats.sermons, icon: Video, color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Total Keuangan', value: `Rp ${stats.finances.toLocaleString()}`, icon: Wallet, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ringkasan Dashboard</h1>
          <p className="text-gray-500">Selamat datang kembali di sistem manajemen HKBP Mahanaim Batam.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <UserPlus className="h-4 w-4" /> Tambah Jemaat
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${card.bg} ${card.color} p-3 rounded-2xl`}>
                <card.icon className="h-6 w-6" />
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <TrendingUp className="h-3 w-3" /> +12%
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{card.value}</div>
            <div className="text-sm text-gray-500 font-medium">{card.name}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Aktivitas Terbaru</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">Jemaat Baru Terdaftar</div>
                  <div className="text-xs text-gray-500">Bpk. Rian Sirait telah ditambahkan ke database.</div>
                  <div className="text-[10px] text-blue-600 font-bold mt-1">2 JAM YANG LALU</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Laporan Keuangan Terakhir</h3>
          <div className="space-y-4">
            {[
              { type: 'Persembahan', amount: 2500000, date: '15 Mar 2026', status: 'up' },
              { type: 'Donasi Pembangunan', amount: 5000000, date: '14 Mar 2026', status: 'up' },
              { type: 'Biaya Listrik', amount: 1200000, date: '12 Mar 2026', status: 'down' },
              { type: 'Persepuluhan', amount: 1500000, date: '10 Mar 2026', status: 'up' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className={item.status === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {item.status === 'up' ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{item.type}</div>
                    <div className="text-xs text-gray-500">{item.date}</div>
                  </div>
                </div>
                <div className={`text-sm font-bold ${item.status === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {item.status === 'up' ? '+' : '-'} Rp {item.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
