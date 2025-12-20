
import React from 'react';
import { HistoryItem } from '../types';

interface HistoryDrawerProps {
  history: HistoryItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

const HistoryDrawer: React.FC<HistoryDrawerProps> = ({ history, isOpen, onClose, onSelect, onDelete, onClear }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-chic-deep/20 backdrop-blur-sm animate-fadeIn" 
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="relative w-full max-w-md bg-chic-bg h-full shadow-2xl flex flex-col animate-slideInRight border-l border-chic-primary/10">
        <div className="p-6 border-b border-chic-primary/10 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-2xl font-serif font-bold text-chic-deep">Analiz Geçmişi</h2>
            <p className="text-[10px] uppercase tracking-widest text-chic-deep/40 font-bold">Ruhsal Arşivin</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-chic-bg transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-30 space-y-4">
              <span className="text-5xl">📖</span>
              <p className="text-sm italic">Henüz bir analiz yapmadın.</p>
            </div>
          ) : (
            history.sort((a,b) => b.timestamp - a.timestamp).map((item) => (
              <div 
                key={item.id}
                className="group relative bg-white border border-chic-primary/10 p-5 rounded-2xl hover:border-chic-primary/40 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => onSelect(item)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-serif font-bold text-chic-primary">%{item.result.vibrio_score}</span>
                    <div className="w-1 h-1 rounded-full bg-chic-deep/20"></div>
                    <span className="text-[10px] font-bold text-chic-deep/60">{new Date(item.timestamp).toLocaleDateString('tr-TR')}</span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-chic-accent hover:text-red-500 transition-all text-xs"
                  >
                    Sil
                  </button>
                </div>
                
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-chic-deep">{item.userZodiac || '?'} + {item.partnerZodiac || '?'}</span>
                  <span className="text-[10px] text-chic-deep/30 italic">• {item.relStatus || 'Genel'}</span>
                </div>
                
                <p className="text-[11px] text-chic-text line-clamp-2 italic leading-relaxed">
                  "{item.result.free_comment}"
                </p>

                <div className="mt-3 flex gap-1">
                  {['trust', 'passion', 'communication'].map((key) => (
                    <div key={key} className="flex-1 h-1 bg-chic-bg rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-chic-primary/40" 
                        style={{ width: `${(item.result.metrics as any)[key]}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {history.length > 0 && (
          <div className="p-6 border-t border-chic-primary/10 bg-white">
            <button 
              onClick={() => { if(window.confirm("Tüm geçmişi silmek istediğine emin misin?")) onClear(); }}
              className="w-full py-3 text-[10px] font-bold uppercase tracking-widest text-chic-accent hover:text-red-500 transition-colors"
            >
              Tüm Geçmişi Temizle
            </button>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default HistoryDrawer;
