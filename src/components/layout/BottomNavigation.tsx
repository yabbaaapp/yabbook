'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Feed', href: '/feed', icon: 'fa-house' },
    { name: 'Chats', href: '/', icon: 'fa-message', badge: true },
    { name: 'Wallet', href: '/wallet', icon: 'fa-wallet' },
    { name: 'Spaces', href: '/spaces', icon: 'fa-users' },
    { name: 'Profile', href: '/profile', icon: 'fa-user', regular: true },
  ];

  return (
    <>
      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 w-full bg-[#0B0F19]/90 backdrop-blur-xl border-t border-slate-800/60 px-6 py-4 z-50">
        <div className="flex justify-between items-center">
          {navItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex flex-col items-center gap-1 transition relative ${isActive ? 'text-sky-400' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {item.badge && (
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#0B0F19]"></div>
                )}
                <i className={`${item.regular ? 'fa-regular' : 'fa-solid'} ${item.icon} text-xl`}></i>
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
        {/* Home Indicator (iOS style) */}
        <div className="w-1/3 h-1 bg-slate-600 rounded-full mx-auto mt-4"></div>
      </nav>
    </>
  );
}
