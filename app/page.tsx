'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, MapPin, ArrowRight, Music, Users, Heart, BookOpen } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="https://picsum.photos/seed/church/1920/1080"
            alt="Church Hero"
            fill
            className="object-cover brightness-50 absolute"
            priority
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            Selamat Datang di <br />
            <span className="text-blue-400">HKBP Mahanaim Batam</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 mb-10 font-light"
          >
            Huria Kristen Batak Protestan - Kibing, Batu Aji
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/jadwal"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2"
            >
              Jadwal Ibadah <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/tentang"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all"
            >
              Tentang Kami
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Worship Schedule Highlight */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">Jadwal Ibadah Minggu</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Mari beribadah dan memuji Tuhan bersama-sama dalam persekutuan jemaat HKBP Mahanaim Batam.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { time: '06:00', name: 'Ibadah Umum I', desc: 'Bahasa Batak' },
              { time: '08:00', name: 'Sekolah Minggu', desc: 'Anak-anak' },
              { time: '10:30', name: 'Ibadah Umum II', desc: 'Bahasa Indonesia' },
              { time: '17:00', name: 'Ibadah Remaja', desc: 'Pemuda & Remaja' },
              { time: '19:00', name: 'Ibadah Umum III', desc: 'Bahasa Indonesia' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center"
              >
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-blue-950 mb-1">{item.time}</div>
                <div className="font-semibold text-gray-800 mb-2">{item.name}</div>
                <div className="text-sm text-gray-500">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pelayanan Highlight */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">Pelayanan Gereja</h2>
              <p className="text-gray-600">Berbagai wadah pelayanan untuk bertumbuh bersama dalam iman dan melayani sesama.</p>
            </div>
            <Link href="/pelayanan" className="text-blue-600 font-bold flex items-center gap-2 hover:underline">
              Lihat Semua Pelayanan <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, title: 'Keluarga', desc: 'Pendampingan dan persekutuan keluarga kristen.' },
              { icon: Music, title: 'Paduan Suara', desc: 'Melayani Tuhan melalui puji-pujian dan musik.' },
              { icon: Heart, title: 'Sosial', desc: 'Aksi nyata kasih bagi jemaat dan masyarakat.' },
              { icon: BookOpen, title: 'Edukasi', desc: 'Pembinaan iman melalui PA dan katekisasi.' },
            ].map((item, idx) => (
              <div key={idx} className="group p-8 rounded-3xl bg-gray-50 hover:bg-blue-900 transition-colors duration-500">
                <item.icon className="h-12 w-12 text-blue-600 group-hover:text-white mb-6 transition-colors" />
                <h3 className="text-xl font-bold text-blue-950 group-hover:text-white mb-4 transition-colors">{item.title}</h3>
                <p className="text-gray-600 group-hover:text-blue-100 transition-colors">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-800 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50 blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Mari Menjadi Bagian dari Keluarga Kami</h2>
          <p className="text-xl text-blue-100 mb-10 font-light">
            Pintu kami selalu terbuka bagi siapa saja yang ingin mencari Tuhan dan bersekutu dalam kasih Kristus.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/kontak" className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all">
              Hubungi Kami
            </Link>
            <Link href="/donasi" className="bg-blue-700 text-white border border-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-600 transition-all">
              Dukung Pelayanan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
