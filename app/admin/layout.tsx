'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  Newspaper, 
  Image as ImageIcon, 
  Calendar, 
  Video, 
  Wallet, 
  UserCog,
  LogOut,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const adminNav = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Data Jemaat', href: '/admin/jemaat', icon: Users },
  { name: 'Warta Jemaat', href: '/admin/warta', icon: Newspaper },
  { name: 'Galeri Foto', href: '/admin/galeri', icon: ImageIcon },
  { name: 'Jadwal Ibadah', href: '/admin/jadwal', icon: Calendar },
  { name: 'Khotbah Online', href: '/admin/khotbah', icon: Video },
  { name: 'Keuangan', href: '/admin/keuangan', icon: Wallet },
  { name: 'Manajemen User', href: '/admin/users', icon: UserCog },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/');
        return;
      }

      // Check if user is in authorized users collection or is the default admin
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const isDefaultAdmin = user.email === 'riansirait26@gmail.com';
      
      if (userDoc.exists() || isDefaultAdmin) {
        setIsAdmin(true);
      } else {
        router.push('/');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-blue-950 text-white fixed h-full">
        <div className="p-6 border-b border-blue-900">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg">Admin Panel</span>
          </div>
        </div>
        <nav className="flex-grow p-4 space-y-1">
          {adminNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                pathname === item.href 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                  : "text-blue-200 hover:bg-blue-900 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
              {pathname === item.href && <ChevronRight className="ml-auto h-4 w-4" />}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-blue-900">
          <button 
            onClick={() => auth.signOut()}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Keluar Sistem
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed inset-y-0 left-0 w-64 bg-blue-950 text-white z-[70] lg:hidden flex flex-col"
            >
              <div className="p-6 border-b border-blue-900 flex justify-between items-center">
                <span className="font-bold text-lg">Admin Panel</span>
                <button onClick={() => setSidebarOpen(false)}><X className="h-6 w-6" /></button>
              </div>
              <nav className="flex-grow p-4 space-y-1">
                {adminNav.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      pathname === item.href 
                        ? "bg-blue-600 text-white" 
                        : "text-blue-200 hover:bg-blue-900 hover:text-white"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow lg:ml-64 min-h-screen">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-50">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-600">
            <Menu className="h-6 w-6" />
          </button>
          <div className="text-sm text-gray-500 font-medium">
            {adminNav.find(n => n.href === pathname)?.name || 'Dashboard'}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-gray-900">{auth.currentUser?.displayName}</div>
              <div className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Administrator</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-900 font-bold">
              {auth.currentUser?.displayName?.[0] || 'A'}
            </div>
          </div>
        </header>
        <div className="p-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
