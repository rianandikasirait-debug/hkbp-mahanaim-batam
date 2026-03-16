'use client';

import { motion } from 'motion/react';
import { MapPin, Phone, Mail, MessageSquare, Clock, ArrowRight } from 'lucide-react';

export default function KontakPage() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">Hubungi Kami</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Kami siap melayani dan mendoakan Anda. Silakan hubungi kami melalui saluran informasi di bawah ini.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Phone className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-blue-950 mb-2">Telepon & WhatsApp</h3>
            <p className="text-gray-600 mb-4">Layanan informasi dan konseling.</p>
            <a href="tel:+6281234567890" className="text-blue-600 font-bold block hover:underline">+62 812-3456-7890</a>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-blue-950 mb-2">Email Resmi</h3>
            <p className="text-gray-600 mb-4">Untuk urusan administrasi dan surat.</p>
            <a href="mailto:info@hkbpmahanaimbatam.or.id" className="text-green-600 font-bold block hover:underline">info@hkbpmahanaimbatam.or.id</a>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Clock className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-blue-950 mb-2">Jam Operasional</h3>
            <p className="text-gray-600 mb-4">Sekretariat Gereja.</p>
            <div className="text-purple-600 font-bold">Selasa - Sabtu: 09:00 - 17:00</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100">
              <h2 className="text-2xl font-bold text-blue-950 mb-6">Lokasi Gereja</h2>
              <div className="flex gap-4 mb-8">
                <MapPin className="h-6 w-6 text-blue-600 shrink-0" />
                <div>
                  <p className="text-gray-700 font-medium">HKBP Mahanaim Batam</p>
                  <p className="text-gray-600">Kibing, Batu Aji, Kota Batam, Kepulauan Riau 29424, Indonesia</p>
                </div>
              </div>
              {/* Google Maps Embed Placeholder */}
              <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 flex-col gap-2">
                  <MapPin className="h-12 w-12" />
                  <span>Google Maps Embed</span>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.123456789!2d103.9!3d1.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMDAnMDAuMCJOIDEwM8KwNTQnMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl">
            <h2 className="text-2xl font-bold text-blue-950 mb-8">Kirim Pesan</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Nama Lengkap</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Masukkan nama Anda" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Email / WhatsApp</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Alamat email atau nomor WA" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Subjek</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option>Informasi Umum</option>
                  <option>Permohonan Doa</option>
                  <option>Konseling Pastoral</option>
                  <option>Lainnya</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Pesan</label>
                <textarea className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none h-32" placeholder="Tuliskan pesan Anda di sini..."></textarea>
              </div>
              <button type="button" className="w-full bg-blue-900 text-white font-bold py-4 rounded-xl hover:bg-blue-800 transition-colors flex items-center justify-center gap-2">
                Kirim Pesan <MessageSquare className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
