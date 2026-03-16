'use client';

import { motion } from 'motion/react';
import { Users, Music, Heart, BookOpen, Home, ShieldCheck } from 'lucide-react';

const categories = [
  {
    title: 'Pemuda & Remaja',
    icon: Users,
    desc: 'Wadah bagi generasi muda untuk bertumbuh dalam iman, kreativitas, dan kepemimpinan melalui persekutuan Naposobulung.',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    title: 'Sekolah Minggu',
    icon: Home,
    desc: 'Pelayanan anak-anak untuk mengenal kasih Tuhan sejak dini melalui cerita Alkitab, pujian, dan aktivitas kreatif.',
    color: 'bg-green-50 text-green-600'
  },
  {
    title: 'Paduan Suara',
    icon: Music,
    desc: 'Berbagai kategori koor (Ama, Ina, Remaja, Lansia) yang melayani melalui puji-pujian dalam setiap ibadah.',
    color: 'bg-purple-50 text-purple-600'
  },
  {
    title: 'Pelayanan Doa',
    icon: ShieldCheck,
    desc: 'Tim doa syafaat yang setia mendoakan pergumulan jemaat, gereja, bangsa, dan negara.',
    color: 'bg-red-50 text-red-600'
  },
  {
    title: 'Pelayanan Keluarga',
    icon: Heart,
    desc: 'Bimbingan pranikah, konseling keluarga, dan persekutuan rumah tangga untuk membangun keluarga kristen yang kuat.',
    color: 'bg-pink-50 text-pink-600'
  },
  {
    title: 'Pembinaan Iman',
    icon: BookOpen,
    desc: 'Katekisasi, Pendalaman Alkitab (PA), dan seminar-seminar rohani untuk pendewasaan iman jemaat.',
    color: 'bg-amber-50 text-amber-600'
  }
];

export default function PelayananPage() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">Pelayanan Gereja</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Temukan wadah pelayanan yang sesuai dengan talenta dan panggilan hati Anda.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${item.color}`}>
                <item.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              <button className="mt-6 text-blue-600 font-semibold hover:underline flex items-center gap-2">
                Bergabung Pelayanan →
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 bg-blue-50 p-12 rounded-3xl text-center">
          <h2 className="text-2xl font-bold text-blue-950 mb-4">Ingin Melayani?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">Setiap talenta yang Anda miliki adalah anugerah Tuhan. Mari gunakan untuk kemuliaan nama-Nya.</p>
          <button className="bg-blue-900 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition-colors">
            Hubungi Sekretariat
          </button>
        </div>
      </div>
    </div>
  );
}
