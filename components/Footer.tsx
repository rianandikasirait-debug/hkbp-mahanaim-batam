import Link from 'next/link';
import { Church, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Church className="h-8 w-8 text-gold-400" />
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none">HKBP MAHANAIM</span>
                <span className="text-[10px] text-blue-300 font-medium tracking-widest uppercase">Batam</span>
              </div>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed mb-6">
              Menjadi gereja yang inklusif, melayani dengan kasih, dan menjadi berkat bagi sesama di kota Batam.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-blue-300 transition-colors"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-blue-300 transition-colors"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-blue-300 transition-colors"><Youtube className="h-5 w-5" /></Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Navigasi</h3>
            <ul className="space-y-3 text-sm text-blue-100">
              <li><Link href="/tentang" className="hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link href="/pelayanan" className="hover:text-white transition-colors">Pelayanan</Link></li>
              <li><Link href="/jadwal" className="hover:text-white transition-colors">Jadwal Ibadah</Link></li>
              <li><Link href="/warta" className="hover:text-white transition-colors">Warta Jemaat</Link></li>
              <li><Link href="/donasi" className="hover:text-white transition-colors">Donasi</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Jadwal Ibadah</h3>
            <ul className="space-y-3 text-sm text-blue-100">
              <li className="flex justify-between"><span>Ibadah Pagi</span> <span>06:00 WIB</span></li>
              <li className="flex justify-between"><span>Sekolah Minggu</span> <span>08:00 WIB</span></li>
              <li className="flex justify-between"><span>Ibadah Siang</span> <span>10:30 WIB</span></li>
              <li className="flex justify-between"><span>Ibadah Remaja</span> <span>17:00 WIB</span></li>
              <li className="flex justify-between"><span>Ibadah Malam</span> <span>19:00 WIB</span></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Kontak</h3>
            <ul className="space-y-4 text-sm text-blue-100">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-blue-300 shrink-0" />
                <span>Kibing, Batu Aji, Batam, Kepulauan Riau</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-blue-300 shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-blue-300 shrink-0" />
                <span>info@hkbpmahanaimbatam.or.id</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-blue-900 text-center text-sm text-blue-300">
          <p>© {new Date().getFullYear()} HKBP Mahanaim Batam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
