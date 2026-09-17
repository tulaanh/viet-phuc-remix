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

      {/* Landmarks Horizontal Scroll Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {LANDMARKS.map((lm) => {
          const isSelected = selectedId === lm.id;
          return (
            <button
              key={lm.id}
              onClick={() => onSelect(lm)}
              className={`text-left p-2.5 rounded-xl border transition-all flex flex-col justify-between group relative overflow-hidden ${
                isSelected
                  ? 'bg-stone-900 text-white border-heritage-gold shadow-sm ring-1 ring-heritage-gold'
                  : 'bg-stone-50 hover:bg-stone-100/90 text-stone-800 border-stone-200'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-[10px] font-bold text-heritage-gold truncate">
                  {lm.location}
                </span>
                {isSelected && <Check className="w-3 h-3 text-heritage-gold stroke-[3]" />}
              </div>

              <h5 className="font-bold text-xs leading-snug line-clamp-1">{lm.name.split('—')[0]}</h5>
              <p className={`text-[10px] line-clamp-1 mt-0.5 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                {lm.name.split('—')[1] || lm.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
