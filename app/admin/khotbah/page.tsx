'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Plus, Trash2, X, Video, Youtube, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function KhotbahAdmin() {
  const [sermons, setSermons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    preacher: '',
    youtubeUrl: '',
    date: '',
    summary: ''
  });

  const fetchSermons = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'sermons'), orderBy('date', 'desc'));
      const snap = await getDocs(q);
      setSermons(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchSermons();
    };
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'sermons', editingId), formData);
      } else {
        await addDoc(collection(db, 'sermons'), formData);
      }
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({ title: '', preacher: '', youtubeUrl: '', date: '', summary: '' });
      fetchSermons();
    } catch (error) {
      console.error('Error saving sermon:', error);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      preacher: item.preacher,
      youtubeUrl: item.youtubeUrl,
      date: item.date,
      summary: item.summary
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Hapus khotbah ini?')) {
      await deleteDoc(doc(db, 'sermons', id));
      fetchSermons();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Khotbah</h1>
          <p className="text-gray-500">Kelola arsip video khotbah gereja.</p>
        </div>
        <button 
          onClick={() => {
            setEditingId(null);
            setFormData({ title: '', preacher: '', youtubeUrl: '', date: '', summary: '' });
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Tambah Khotbah
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-10">Memuat khotbah...</div>
        ) : sermons.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="aspect-video bg-gray-900 relative">
              <div className="relative w-full h-full">
                <Image 
                  src={`https://img.youtube.com/vi/${item.youtubeUrl.split('v=')[1]?.split('&')[0] || 'dQw4w9WgXcQ'}/mqdefault.jpg`} 
                  alt={item.title}
                  fill
                  className="object-cover opacity-50"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Youtube className="h-10 w-10 text-red-600" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-gray-900 mb-1 truncate">{item.title}</h3>
              <div className="text-xs text-gray-500 mb-4">{item.preacher} • {item.date}</div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(item)} className="flex-grow flex items-center justify-center gap-2 bg-gray-50 text-gray-600 py-2 rounded-xl text-xs font-bold hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  <Edit2 className="h-3 w-3" /> Edit
                </button>
                <button onClick={() => handleDelete(item.id)} className="flex items-center justify-center gap-2 bg-gray-50 text-red-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-50 transition-colors">
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Khotbah' : 'Tambah Khotbah Baru'}</h3>
                <button onClick={() => setIsModalOpen(false)}><X className="h-6 w-6 text-gray-400" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Judul Khotbah</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Pengkhotbah</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.preacher}
                      onChange={(e) => setFormData({...formData, preacher: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Tanggal</label>
                    <input 
                      required
                      type="date" 
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">YouTube URL</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={formData.youtubeUrl}
                    onChange={(e) => setFormData({...formData, youtubeUrl: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Ringkasan (Opsional)</label>
                  <textarea 
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none h-24"
                    value={formData.summary}
                    onChange={(e) => setFormData({...formData, summary: e.target.value})}
                  />
                </div>
                <div className="pt-6 border-t border-gray-100 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-grow px-4 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="flex-grow px-4 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
                  >
                    Simpan Khotbah
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
