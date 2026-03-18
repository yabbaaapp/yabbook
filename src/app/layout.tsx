import type { Metadata } from 'next';
import './globals.css';
import BottomNavigation from '@/components/layout/BottomNavigation';

export const metadata: Metadata = {
  title: 'Yabbok Web',
  description: 'A modern social communication app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
          
          body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #0B0F19; /* Deep slate/navy */
            color: #F8FAFC;
            -webkit-tap-highlight-color: transparent;
          }

          /* Hide scrollbars */
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}} />
      </head>
      <body className="antialiased min-h-screen flex justify-center bg-black" suppressHydrationWarning>
        {/* Mobile Container */}
        <div className="w-full max-w-[390px] bg-[#0B0F19] min-h-screen relative shadow-2xl overflow-hidden flex flex-col">
          {children}
          <BottomNavigation />
        </div>
      </body>
    </html>
  );
}
