'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export default function TentangPage() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">Tentang Kami</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Sejarah, Visi, dan Misi HKBP Mahanaim Batam dalam melayani Tuhan dan sesama.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="https://picsum.photos/seed/history/800/600"
              alt="Sejarah Gereja"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-blue-950 mb-6">Sejarah Singkat</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              HKBP Mahanaim Batam berdiri sebagai wujud kerinduan jemaat di wilayah Batu Aji untuk memiliki tempat persekutuan yang lebih dekat. Dimulai dari persekutuan kecil di rumah-rumah jemaat, Tuhan memberkati pertumbuhan gereja ini hingga akhirnya dapat membangun gedung gereja di wilayah Kibing.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Nama &quot;Mahanaim&quot; diambil dari Alkitab yang berarti &quot;Dua Pasukan&quot; atau &quot;Perkemahan Allah&quot;, melambangkan perlindungan dan kehadiran malaikat Tuhan dalam perjalanan iman jemaat kami.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="bg-blue-50 p-10 rounded-3xl border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-950 mb-6">Visi</h2>
            <p className="text-gray-700 italic text-lg">
              &quot;Menjadi gereja yang inklusif, berakar, bertumbuh, dan berbuah dalam kasih Kristus untuk menjadi berkat bagi dunia.&quot;
            </p>
          </div>
          <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100">
            <h2 className="text-2xl font-bold text-blue-950 mb-6">Misi</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">01.</span>
                <span>Meningkatkan kualitas persekutuan (Koinonia) antar jemaat.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">02.</span>
                <span>Memperkuat pelayanan kasih (Diakonia) kepada masyarakat sekitar.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">03.</span>
                <span>Memberitakan Injil (Marturia) melalui kesaksian hidup yang nyata.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center bg-blue-900 text-white p-16 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">Pesan Pendeta</h2>
            <p className="text-xl font-light italic mb-8 max-w-3xl mx-auto">
              &quot;Selamat datang di rumah Tuhan. Di sini, setiap orang adalah keluarga. Mari kita berjalan bersama dalam iman, harapan, dan kasih.&quot;
            </p>
            <div className="font-bold text-lg">Pdt. [Nama Pendeta]</div>
            <div className="text-blue-300">Pendeta Resort HKBP Mahanaim</div>
          </div>
        </div>
      </div>
    </div>
  );
}
