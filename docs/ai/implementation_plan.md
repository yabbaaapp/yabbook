# Yabbook → Social-Comm-Next Phase 2 Plan (Chat & Profile)

Auth ve Wallet kısımlarını başarıyla taşıdık. Şimdi uygulamanın temel iletişim özellikleri olan **Sohbet** ve **Profil** özelliklerini Next.js (social-comm-next) ortamına geçireceğiz. 

## User Review Required
Bu özelliklerin Next.js'e taşınması Supabase gerçek zamanlı (real-time) aboneliklerini ve Next.js App Router mimarisini kapsar. Web tarafında mesajların arayüz tasarımı (UI) orijinal mobil uygulamaya sadık kalınarak, Tailwind CSS ile inşa edilecektir.

Aşağıdaki planı onaylarsanız geliştirmelere başlayacağım.

## Proposed Changes

### 1. Profil Sayfası (Profile)
#### [NEW] `src/app/profile/page.tsx`
- `yabbook/app/(tabs)/profile.tsx` mantığını port edeceğiz.
- Supabase üzerinden giriş yapan kullanıcının verisi çekilip görüntülenecek (`avatar_url`, `name`, `username`).
- Çıkış Yap (Sign Out) fonksiyonu eklenecek.

### 2. Sohbet Listesi (Chat List / Index)
#### [MODIFY] `src/app/page.tsx` (veya `src/components/chat/ChatList.tsx`)
- Yabbook'taki `index.tsx` sayfasının işlevlerini Next.js anasayfasına (`/`) uyarlayacağız.
- Supabase üzerinden kullanıcıya ait `chats` tablosu dinlenip gerçek zamanlı sohbet listesi güncellenecek.
- Yeni sohbet oluşturma (Create New Chat) pop-up / modal özelliği eklenecek.

### 3. Mesajlaşma Odası (Chat Room)
#### [NEW] `src/app/chat/[id]/page.tsx`
- Yabbook'taki `chat/[id].tsx` kodunu port edeceğiz.
- `messages` tablosuna `channel` ile abone olunarak anlık (real-time) mesajlaşma sağlanacak.
- Mesaj gönderme alanı, konuşma baloncukları tasarımı ve mesaj zaman damgaları (timestamp) web uyumlu hale getirilecek.

## Verification Plan

### Automated / Manual Verification
- `npm run dev` ile sunucu açıkken sayfalar arası geçiş test edilecek.
- Supabase'in real-time özelliğinin konsol hatası vermeden çalıştığı kontrol edilecek.
- Geliştirmeler tamamlandığında sizden `http://localhost:3000` (Anasayfa Sohbet Listesi), `/profile` ve `/chat/123` (herhangi bir oda) üzerinden test etmeniz istenecektir.
