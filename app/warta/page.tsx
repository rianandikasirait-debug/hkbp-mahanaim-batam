'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function WartaPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'news'), orderBy('publishedAt', 'desc'), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNews(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">Warta Jemaat</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Berita terbaru, pengumuman, dan laporan kegiatan HKBP Mahanaim Batam.</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
          </div>
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={item.imageUrl || `https://picsum.photos/seed/${item.id}/800/600`}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {item.category || 'Berita'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {item.publishedAt ? format(new Date(item.publishedAt), 'dd MMMM yyyy', { locale: id }) : '-'}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" /> {item.author || 'Admin'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-950 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6">
                    {item.content}
                  </p>
                  <button className="text-blue-600 font-bold text-sm flex items-center gap-2 hover:translate-x-1 transition-transform">
                    Baca Selengkapnya <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-500">Belum ada warta jemaat terbaru.</p>
          </div>
        )}
      </div>
    </div>
  );
}
