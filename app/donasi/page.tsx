'use client';

import { motion } from 'motion/react';
import { Heart, CreditCard, Landmark, QrCode, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const bankAccounts = [
  { bank: 'Bank Mandiri', number: '123-456-7890', name: 'HKBP MAHANAIM BATAM' },
  { bank: 'Bank BRI', number: '0987-6543-21', name: 'HKBP MAHANAIM BATAM' },
  { bank: 'Bank BCA', number: '5432-1098-76', name: 'HKBP MAHANAIM BATAM' },
];

export default function DonasiPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">Donasi & Persembahan</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Dukung pelayanan dan pembangunan HKBP Mahanaim Batam melalui persembahan kasih Anda.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="bg-blue-900 text-white p-10 rounded-3xl shadow-xl relative overflow-hidden">
              <Heart className="absolute top-4 right-4 h-24 w-24 text-blue-800 opacity-50" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4">Mari Berbagi Berkat</h2>
                <p className="text-blue-100 mb-8 leading-relaxed">
                  &quot;Hendaklah masing-masing memberikan menurut kerelaan hatinya, jangan dengan sedih hati atau karena paksaan, sebab Allah mengasihi orang yang memberi dengan sukacita.&quot;
                  <br />
                  <span className="font-bold block mt-2">— 2 Korintus 9:7</span>
                </p>
                <div className="flex items-center gap-4 bg-blue-800/50 p-4 rounded-2xl border border-blue-700">
                  <QrCode className="h-12 w-12 text-blue-300" />
                  <div>
                    <div className="font-bold">QRIS MAHANAIM</div>
                    <div className="text-xs text-blue-300">Scan untuk persembahan instan</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <h3 className="font-bold text-blue-950 mb-6 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-600" /> Rekening Resmi Gereja
              </h3>
              <div className="space-y-4">
                {bankAccounts.map((acc, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 flex justify-between items-center">
                    <div>
                      <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">{acc.bank}</div>
                      <div className="text-lg font-bold text-blue-950">{acc.number}</div>
                      <div className="text-xs text-gray-500 uppercase">{acc.name}</div>
                    </div>
                    <button
                      onClick={() => handleCopy(acc.number)}
                      className="p-3 rounded-xl bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      {copied === acc.number ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-blue-950 mb-8">Konfirmasi Persembahan</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Nama Pengirim</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Nama lengkap" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Jenis Persembahan</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                    <option>Persembahan Minggu</option>
                    <option>Persepuluhan</option>
                    <option>Donasi Pembangunan</option>
                    <option>Lainnya</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Jumlah (Rp)</label>
                <input type="number" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Contoh: 100000" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Pesan / Doa (Opsional)</label>
                <textarea className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none h-32" placeholder="Tuliskan pesan atau doa Anda..."></textarea>
              </div>
              <button type="button" className="w-full bg-blue-900 text-white font-bold py-4 rounded-xl hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20">
                Kirim Konfirmasi
              </button>
              <p className="text-center text-xs text-gray-500">
                Konfirmasi ini membantu kami dalam pencatatan keuangan gereja yang transparan.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
