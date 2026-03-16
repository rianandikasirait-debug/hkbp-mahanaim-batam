'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Play, Youtube, Calendar, User, Search } from 'lucide-react';

export default function KhotbahPage() {
  const [sermons, setSermons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'sermons'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSermons(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredSermons = sermons.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.preacher.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">Khotbah Online</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Dengarkan dan saksikan kembali pemberitaan Firman Tuhan dari ibadah HKBP Mahanaim Batam.</p>
        </motion.div>

        <div className="mb-12 max-w-md mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Cari judul atau pengkhotbah..."
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
          </div>
        ) : filteredSermons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSermons.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group"
              >
                <div className="relative aspect-video bg-gray-900">
                  {/* YouTube Thumbnail Placeholder */}
                  <Image
                    src={`https://img.youtube.com/vi/${item.youtubeUrl.split('v=')[1]?.split('&')[0] || 'dQw4w9WgXcQ'}/maxresdefault.jpg`}
                    alt={item.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                  <a
                    href={item.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 fill-current" />
                    </div>
                  </a>
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest flex items-center gap-1">
                    <Youtube className="h-3 w-3 text-red-500" /> YouTube
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" /> {item.preacher}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-950 mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  {item.summary && (
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {item.summary}
                    </p>
                  )}
                  <a
                    href={item.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-bold text-sm hover:underline"
                  >
                    Tonton Sekarang
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-500">Tidak ada khotbah yang ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
