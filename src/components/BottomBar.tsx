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
    <nav className="fixed bottom-0 left-0 w-full h-14 sm:h-16 bg-[var(--card)] border-t border-[var(--card-border)] z-40 flex items-center justify-center shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      <div className="w-full max-w-md mx-auto px-6 h-full flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-0.5 transition-colors ${
                isActive ? 'text-[var(--accent)]' : 'text-[var(--foreground)] opacity-60 hover:opacity-100'
              }`}
            >
              <Icon size={19} className={isActive ? 'drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]' : ''} />
              <span className="text-[10px] font-medium tracking-wide uppercase">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
