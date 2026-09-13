"use client";

import { Home, Trophy, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomBar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Inicio' },
    { href: '/ranking', icon: Trophy, label: 'Ranking' },
    { href: '/profile', icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-[#2a2118] border-t border-[#4a3c2b] shadow-[0_-5px_15px_rgba(0,0,0,0.5)] z-50">
      <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-[#d4af37]' : 'text-[#f4ecd8]/50 hover:text-[#f4ecd8]'
              }`}
            >
              <Icon size={20} className={isActive ? 'drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]' : ''} />
              <span className="text-[10px] font-medium tracking-wide uppercase">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
