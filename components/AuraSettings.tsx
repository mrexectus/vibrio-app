
import React from 'react';

export type AuraType = 'default' | 'midnight' | 'rose' | 'forest';

interface AuraSettingsProps {
  currentAura: AuraType;
  onAuraChange: (aura: AuraType) => void;
  isOpen: boolean;
  onClose: () => void;
}

const AURAS: { id: AuraType; name: string; colors: string[]; desc: string }[] = [
  { 
    id: 'default', 
    name: 'Klasik Chic', 
    colors: ['#FDFBF7', '#D4A373'], 
    desc: 'Zarif, lüks ve dengeli bir atmosfer.' 
  },
  { 
    id: 'midnight', 
    name: 'Gece Safiri', 
    colors: ['#0F172A', '#94A3B8'], 
    desc: 'Gizemli, derin ve meditatif bir derinlik.' 
  },
  { 
    id: 'rose', 
    name: 'Gül Kuvars', 
    colors: ['#FFF5F5', '#E5989B'], 
    desc: 'Romantik, yumuşak ve şefkatli bir enerji.' 
  },
  { 
    id: 'forest', 
    name: 'Zümrüt Orman', 
    colors: ['#F0F4F1', '#588157'], 
    desc: 'Doğal, güven verici ve dengeli bir bağ.' 
  }
];

const AuraSettings: React.FC<AuraSettingsProps> = ({ currentAura, onAuraChange, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-chic-deep/20 backdrop-blur-md" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl border border-chic-primary/10 animate-slideUp">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-serif font-bold text-chic-deep">Aura Ayarları</h2>
            <p className="text-[10px] uppercase tracking-widest text-chic-deep/40 font-bold">Uygulama Ruhunu Kişiselleştir</p>
          </div>
          <button onClick={onClose} className="text-2xl opacity-30 hover:opacity-100">×</button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {AURAS.map((aura) => (
            <button
              key={aura.id}
              onClick={() => { onAuraChange(aura.id); onClose(); }}
              className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group ${
                currentAura === aura.id 
                ? 'border-chic-primary bg-chic-primary/5 shadow-md' 
                : 'border-chic-primary/10 hover:border-chic-primary/40 hover:bg-chic-bg'
              }`}
            >
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: aura.colors[0] }}></div>
                <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: aura.colors[1] }}></div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-chic-deep">{aura.name}</h4>
                <p className="text-[10px] text-chic-deep/60 leading-tight">{aura.desc}</p>
              </div>
              {currentAura === aura.id && <span className="text-chic-primary">✓</span>}
            </button>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-chic-primary/10 text-center">
          <p className="text-[9px] text-chic-deep/30 italic uppercase tracking-widest">
            Aura seçimi tüm analiz ekranlarına yansıtılır.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuraSettings;
