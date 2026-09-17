import React from 'react';
import { Landmark } from '../../types/outfit';
import { LANDMARKS } from '../../data/landmarks';
import { MapPin, Sparkles, Check } from 'lucide-react';

interface LandmarkSelectorProps {
  selectedId: string;
  onSelect: (landmark: Landmark) => void;
}

export const LandmarkSelector: React.FC<LandmarkSelectorProps> = ({ selectedId, onSelect }) => {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-heritage-border/80 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900 leading-tight">
              Bối Cảnh Danh Thắng Việt Nam
            </h4>
            <p className="text-[10px] text-stone-500">Tùy chỉnh không gian cổ kính hoặc phố thị cho trang phục</p>
          </div>
        </div>
      </div>

      {/* Landmarks Grid with Photo Thumbnails */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {LANDMARKS.map((lm) => {
          const isSelected = selectedId === lm.id;
          return (
            <button
              key={lm.id}
              onClick={() => onSelect(lm)}
              className={`text-left rounded-xl border transition-all flex flex-col group relative overflow-hidden ${
                isSelected
                  ? 'bg-stone-900 text-white border-heritage-gold shadow-md ring-2 ring-heritage-gold/80'
                  : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-200/90 shadow-xs'
              }`}
            >
              {/* Photo Thumbnail Banner */}
              <div className="relative w-full h-16 overflow-hidden bg-stone-900">
                <img
                  src={lm.imageUrl}
                  alt={lm.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Location Badge */}
                <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[9px] font-bold text-heritage-gold-light border border-white/20">
                  {lm.location}
                </div>

                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-heritage-gold text-stone-950 flex items-center justify-center shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Title & Short Description */}
              <div className="p-2 min-w-0">
                <h5 className="font-bold text-[11px] leading-tight truncate">
                  {lm.name.split('—')[0].trim()}
                </h5>
                <p className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                  {lm.name.split('—')[1]?.trim() || lm.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
