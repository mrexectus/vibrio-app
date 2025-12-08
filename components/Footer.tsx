
import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Vibrio İletişim: ${formData.name}`;
    const body = `Gönderen: ${formData.name} (${formData.email})\n\nMesaj:\n${formData.message}`;
    window.location.href = `mailto:support@vibrio.info?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
      <div>
        <label className="block text-[10px] font-bold text-chic-deep uppercase tracking-widest mb-1">İsim</label>
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
        <label className="block text-[10px] font-bold text-chic-deep uppercase tracking-widest mb-1">E-posta</label>
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
        <label className="block text-[10px] font-bold text-chic-deep uppercase tracking-widest mb-1">Mesaj</label>
        <textarea 
          required
          rows={4}
          value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
          className="w-full bg-chic-bg p-3 rounded-xl border border-chic-primary/20 focus:border-chic-primary outline-none text-sm text-chic-deep placeholder:text-chic-deep/30 resize-none transition-colors"
          placeholder="Mesajınız..."
        />
      </div>
      <button type="submit" className="w-full py-3 bg-chic-deep text-white font-bold rounded-xl uppercase text-[10px] tracking-[0.2em] hover:bg-chic-deep/90 transition-colors shadow-md active:scale-[0.98]">
        E-posta Oluştur
      </button>
      <p className="text-[9px] text-center text-gray-400 mt-2">
        Bu işlem varsayılan e-posta uygulamanızı açacaktır.
      </p>
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
          <button onClick={() => openModal('Gizlilik', <p className="text-justify leading-relaxed font-sans text-chic-text">Verileriniz anonim olarak işlenir ve kaydedilmez. Yapay zeka analizleri için gönderilen metin ve görseller işlem bittikten sonra saklanmaz.</p>)} className="hover:text-chic-primary transition-colors">Gizlilik</button>
          <button onClick={() => openModal('Koşullar', <p className="text-justify leading-relaxed font-sans text-chic-text">Bu hizmet eğlence amaçlıdır. Sunulan analizler profesyonel psikolojik veya ilişki tavsiyesi yerine geçmez.</p>)} className="hover:text-chic-primary transition-colors">Kullanım Koşulları</button>
          <button onClick={() => openModal('İletişim', <ContactForm />)} className="hover:text-chic-primary transition-colors">İletişim</button>
        </div>
        <p className="text-[10px] text-gray-300">&copy; {new Date().getFullYear()} Vibrio. All rights reserved.</p>
      </footer>
      {modalContent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-chic-deep/20 backdrop-blur-sm" onClick={() => setModalContent(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative z-10 shadow-2xl animate-slideUp border border-chic-primary/10" onClick={e=>e.stopPropagation()}>
            <h3 className="text-xl font-serif text-chic-deep mb-4 border-b border-chic-primary/10 pb-2">{modalContent.title}</h3>
            <div className="text-sm text-gray-600">{modalContent.content}</div>
            <button onClick={() => setModalContent(null)} className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-colors w-6 h-6 flex items-center justify-center">×</button>
          </div>
        </div>
      )}
    </>
  );
};
export default Footer;
