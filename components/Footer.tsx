
import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Professional Ticket Format
    const ticketId = Math.floor(100000 + Math.random() * 900000); // 6 digit ID
    const subject = `[TICKET #${ticketId}] Vibrio Destek Talebi: ${formData.name}`;
    
    const body = `
Sayın Vibrio Müşteri İlişkileri,

Aşağıdaki konuda destek veya bilgi talep etmekteyim.

------------------------------------------------
MÜŞTERİ BİLGİLERİ
------------------------------------------------
Ad Soyad: ${formData.name}
İletişim E-posta: ${formData.email}
Ticket ID: #${ticketId}
Tarih: ${new Date().toLocaleDateString('tr-TR')}
------------------------------------------------

MESAJ İÇERİĞİ:
${formData.message}

------------------------------------------------
Not: Bu e-posta, Vibrio web uygulaması üzerinden otomatik oluşturulmuştur.
    `.trim();

    window.location.href = `mailto:support@vibrio.info?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
      <div>
        <label className="block text-[10px] font-bold text-chic-deep uppercase tracking-widest mb-1">İsim Soyisim</label>
        <input 
          type="text" 
          required
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          className="w-full bg-chic-bg p-3 rounded-xl border border-chic-primary/20 focus:border-chic-primary outline-none text-sm text-chic-deep placeholder:text-chic-deep/30 transition-colors"
          placeholder="Adınız"
        />
      </div>
      <div>
        <label className="block text-[10px] font-bold text-chic-deep uppercase tracking-widest mb-1">E-posta Adresi</label>
        <input 
          type="email" 
          required
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
          className="w-full bg-chic-bg p-3 rounded-xl border border-chic-primary/20 focus:border-chic-primary outline-none text-sm text-chic-deep placeholder:text-chic-deep/30 transition-colors"
          placeholder="ornek@email.com"
        />
      </div>
      <div>
        <label className="block text-[10px] font-bold text-chic-deep uppercase tracking-widest mb-1">Destek Konusu</label>
        <textarea 
          required
          rows={4}
          value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
          className="w-full bg-chic-bg p-3 rounded-xl border border-chic-primary/20 focus:border-chic-primary outline-none text-sm text-chic-deep placeholder:text-chic-deep/30 resize-none transition-colors"
          placeholder="Lütfen sorununuzu veya talebinizi detaylı bir şekilde açıklayınız..."
        />
      </div>
      <button type="submit" className="w-full py-3 bg-chic-deep text-white font-bold rounded-xl uppercase text-[10px] tracking-[0.2em] hover:bg-chic-deep/90 transition-colors shadow-md active:scale-[0.98]">
        Talebi Oluştur & Gönder
      </button>
      <div className="flex items-center gap-2 justify-center mt-3 opacity-50">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <p className="text-[9px] text-gray-400">
            Destek Ekibi Çevrimiçi (Ort. Yanıt: 2 Saat)
          </p>
      </div>
    </form>
  );
};

const Footer: React.FC = () => {
  const [modalContent, setModalContent] = useState<{ title: string; content: React.ReactNode } | null>(null);

  const openModal = (title: string, content: React.ReactNode) => setModalContent({ title, content });

  return (
    <>
      <footer className="py-8 text-center border-t border-chic-accent/10 bg-white/50 backdrop-blur-sm mt-auto">
        <div className="flex justify-center gap-6 mb-4 text-[10px] uppercase tracking-widest font-medium text-gray-400">
          <button onClick={() => openModal('Gizlilik Politikası', <p className="text-justify leading-relaxed font-sans text-chic-text text-sm">Vibrio, kullanıcı gizliliğine en üst düzeyde önem verir. Analiz için girilen metinler ve yüklenen fotoğraflar, yalnızca o anki analiz işlemi için Google AI sunucularına iletilir ve işlem tamamlandıktan sonra sunucularımızda saklanmaz. Verileriniz üçüncü taraflarla paylaşılmaz. Anonim kullanım esastır.</p>)} className="hover:text-chic-primary transition-colors">Gizlilik</button>
          <button onClick={() => openModal('Kullanım Koşulları', <p className="text-justify leading-relaxed font-sans text-chic-text text-sm">Bu servis eğlence ve içgörü amaçlıdır. Sunulan analizler, profesyonel psikolojik, tıbbi veya hukuki tavsiye niteliği taşımaz. Kullanıcılar, uygulama tarafından üretilen içerikleri kendi sorumluluklarında yorumlamalıdır.</p>)} className="hover:text-chic-primary transition-colors">Koşullar</button>
          <button onClick={() => openModal('İletişim & Destek', <ContactForm />)} className="hover:text-chic-primary transition-colors">İletişim</button>
        </div>
        <p className="text-[10px] text-gray-300">&copy; {new Date().getFullYear()} Vibrio Inc. All rights reserved.</p>
      </footer>
      {modalContent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-chic-deep/20 backdrop-blur-sm" onClick={() => setModalContent(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative z-10 shadow-2xl animate-slideUp border border-chic-primary/10" onClick={e=>e.stopPropagation()}>
            <h3 className="text-xl font-serif text-chic-deep mb-4 border-b border-chic-primary/10 pb-2">{modalContent.title}</h3>
            <div className="text-sm text-gray-600">{modalContent.content}</div>
            <button onClick={() => setModalContent(null)} className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-colors w-6 h-6 flex items-center justify-center text-lg">×</button>
          </div>
        </div>
      )}
    </>
  );
};
export default Footer;
