import React, { useState } from 'react';

const Footer: React.FC = () => {
  const [modalContent, setModalContent] = useState<{ title: string; content: React.ReactNode } | null>(null);

  const openModal = (title: string, content: React.ReactNode) => setModalContent({ title, content });

  return (
    <>
      <footer className="py-8 text-center border-t border-chic-accent/10 bg-white/50 backdrop-blur-sm mt-auto">
        <div className="flex justify-center gap-6 mb-4 text-[10px] uppercase tracking-widest font-medium text-gray-400">
          <button onClick={() => openModal('Gizlilik', <p>Verileriniz anonim olarak işlenir ve kaydedilmez.</p>)}>Gizlilik</button>
          <button onClick={() => openModal('Koşullar', <p>Bu hizmet eğlence amaçlıdır.</p>)}>Kullanım Koşulları</button>
          <button onClick={() => openModal('İletişim', <p>Email: support@vibrio.info</p>)}>İletişim</button>
        </div>
        <p className="text-[10px] text-gray-300">&copy; {new Date().getFullYear()} Vibrio. All rights reserved.</p>
      </footer>
      {modalContent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-chic-deep/20 backdrop-blur-sm" onClick={() => setModalContent(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative z-10 shadow-2xl" onClick={e=>e.stopPropagation()}>
            <h3 className="text-xl font-serif text-chic-deep mb-4">{modalContent.title}</h3>
            <div className="text-sm text-gray-600">{modalContent.content}</div>
            <button onClick={() => setModalContent(null)} className="absolute top-4 right-4 text-gray-400">×</button>
          </div>
        </div>
      )}
    </>
  );
};
export default Footer;