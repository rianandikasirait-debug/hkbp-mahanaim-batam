'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { Plus, Trash2, X, Wallet, TrendingUp, TrendingDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';

export default function KeuanganAdmin() {
  const [finances, setFinances] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Persembahan',
    amount: 0,
    donorName: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const fetchFinances = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'finances'), orderBy('date', 'desc'));
      const snap = await getDocs(q);
      setFinances(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFinances();
    };
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'finances'), {
        ...formData,
        amount: Number(formData.amount)
      });
      setIsModalOpen(false);
      setFormData({ type: 'Persembahan', amount: 0, donorName: '', date: new Date().toISOString().split('T')[0], notes: '' });
      fetchFinances();
    } catch (error) {
      console.error('Error saving finance:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Hapus catatan keuangan ini?')) {
      await deleteDoc(doc(db, 'finances', id));
      fetchFinances();
    }
  };

  const totalIncome = finances.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Keuangan Gereja</h1>
          <p className="text-gray-500">Catat persembahan, persepuluhan, dan donasi.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Tambah Catatan
        </button>
      </div>

      <div className="bg-blue-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <div className="text-blue-300 text-sm font-bold uppercase tracking-widest mb-2">Total Saldo Terpencatat</div>
          <div className="text-4xl font-bold">Rp {totalIncome.toLocaleString()}</div>
        </div>
        <div className="flex gap-4">
          <div className="bg-blue-800/50 p-4 rounded-2xl border border-blue-700 flex items-center gap-3">
            <div className="bg-green-500/20 text-green-400 p-2 rounded-lg"><TrendingUp className="h-5 w-5" /></div>
            <div>
              <div className="text-[10px] font-bold text-blue-300 uppercase">Pemasukan Bulan Ini</div>
              <div className="font-bold">Rp {(totalIncome * 0.4).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Jenis</th>
                <th className="px-6 py-4">Donatur</th>
                <th className="px-6 py-4">Jumlah</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-500">Memuat data...</td></tr>
              ) : finances.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-500">Belum ada catatan keuangan.</td></tr>
              ) : finances.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-full uppercase tracking-wider">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.donorName || 'Anonim'}</td>
                  <td className="px-6 py-4 text-sm font-bold text-green-600">Rp {item.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
              className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Tambah Catatan Keuangan</h3>
                <button onClick={() => setIsModalOpen(false)}><X className="h-6 w-6 text-gray-400" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Jenis Transaksi</label>
                  <select 
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option>Persembahan</option>
                    <option>Persepuluhan</option>
                    <option>Donasi</option>
                    <option>Lainnya</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Jumlah (Rp)</label>
                  <input 
                    required
                    type="number" 
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Nama Donatur (Opsional)</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.donorName}
                    onChange={(e) => setFormData({...formData, donorName: e.target.value})}
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
                    Simpan
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
