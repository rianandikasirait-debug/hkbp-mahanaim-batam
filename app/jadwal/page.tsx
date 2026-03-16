'use client';

import { motion } from 'motion/react';
import { Clock, Calendar, MapPin, Info } from 'lucide-react';

const mainSchedules = [
  { time: '06:00 WIB', name: 'Ibadah Umum I', lang: 'Bahasa Batak', location: 'Gereja Utama' },
  { time: '08:00 WIB', name: 'Sekolah Minggu', lang: 'Bahasa Indonesia', location: 'Gedung Sekolah Minggu' },
  { time: '10:30 WIB', name: 'Ibadah Umum II', lang: 'Bahasa Indonesia', location: 'Gereja Utama' },
  { time: '17:00 WIB', name: 'Ibadah Remaja', lang: 'Bahasa Indonesia', location: 'Gereja Utama' },
  { time: '19:00 WIB', name: 'Ibadah Umum III', lang: 'Bahasa Indonesia', location: 'Gereja Utama' },
];

const weeklyActivities = [
  { day: 'Senin', time: '19:00', name: 'Latihan Koor Ina' },
  { day: 'Rabu', time: '19:00', name: 'Pendalaman Alkitab (PA)' },
  { day: 'Jumat', time: '19:00', name: 'Latihan Koor Ama' },
  { day: 'Sabtu', time: '16:00', name: 'Latihan Musik & Worship Leader' },
  { day: 'Sabtu', time: '19:00', name: 'Persekutuan Naposobulung' },
];

export default function JadwalPage() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">Jadwal Ibadah & Kegiatan</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Informasi lengkap mengenai waktu ibadah dan kegiatan rutin mingguan gereja.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-blue-950 mb-8 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-blue-600" /> Ibadah Hari Minggu
            </h2>
            <div className="space-y-4">
              {mainSchedules.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-50 text-blue-600 p-3 rounded-xl font-bold text-lg min-w-[100px] text-center">
                      {item.time.split(' ')[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-950 text-lg">{item.name}</h3>
                      <p className="text-gray-500 text-sm flex items-center gap-1">
                        <Info className="h-3 w-3" /> {item.lang}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm bg-gray-50 px-4 py-2 rounded-full">
                    <MapPin className="h-4 w-4" /> {item.location}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-blue-950 mb-8 flex items-center gap-2">
              <Clock className="h-6 w-6 text-blue-600" /> Kegiatan Mingguan
            </h2>
            <div className="bg-blue-900 text-white rounded-3xl p-8 shadow-xl">
              <div className="space-y-6">
                {weeklyActivities.map((item, idx) => (
                  <div key={idx} className="border-b border-blue-800 pb-4 last:border-0 last:pb-0">
                    <div className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-1">{item.day}</div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{item.name}</span>
                      <span className="text-sm bg-blue-800 px-2 py-1 rounded">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 bg-amber-50 border border-amber-100 p-6 rounded-2xl">
              <h3 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                <Info className="h-5 w-5" /> Catatan Penting
              </h3>
              <p className="text-sm text-amber-700 leading-relaxed">
                Jadwal sewaktu-waktu dapat berubah untuk hari raya gerejawi (Natal, Paskah, dll). Silakan pantau halaman Warta Jemaat untuk pengumuman terbaru.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
