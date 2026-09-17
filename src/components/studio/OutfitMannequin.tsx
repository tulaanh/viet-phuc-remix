import React, { useState, useEffect } from 'react';
import { Garment, ColorOption, StyleGenZ, Landmark } from '../../types/outfit';
import { Sparkles, Eye, Image as ImageIcon, RotateCw, Play, Pause, ZoomIn, ZoomOut, MapPin, Maximize2 } from 'lucide-react';

interface OutfitMannequinProps {
  garment: Garment;
  color: ColorOption;
  style: StyleGenZ;
  accessoryIds: string[];
  currentLandmark: Landmark;
  onSelectLandmark: (landmark: Landmark) => void;
}

export type TurntableAngle = 0 | 45 | 90 | 180;

export const OutfitMannequin: React.FC<OutfitMannequinProps> = ({
  garment,
  color,
  style,
  accessoryIds,
  currentLandmark,
  onSelectLandmark
}) => {
  const [viewMode, setViewMode] = useState<'avatar' | 'photo'>('avatar');
  const [photoError, setPhotoError] = useState(false);
  const [angle, setAngle] = useState<TurntableAngle>(0);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Reset photo error when garment changes
  useEffect(() => {
    setPhotoError(false);
  }, [garment.id]);

  // Auto-rotate turntable interval
  useEffect(() => {
    if (!isAutoRotating || viewMode !== 'avatar') return;
    const angles: TurntableAngle[] = [0, 45, 90, 180];
    const timer = setInterval(() => {
      setAngle((prev) => {
        const nextIdx = (angles.indexOf(prev) + 1) % angles.length;
        return angles[nextIdx];
      });
    }, 2800);
    return () => clearInterval(timer);
  }, [isAutoRotating, viewMode]);

  // Checks for specific accessories
  const hasKhanDong = accessoryIds.includes('khan-dong');
  const hasNonQuaiThao = accessoryIds.includes('non-quai-thao');
  const hasTramCai = accessoryIds.includes('tram-cai-toc');
  const hasKiengBac = accessoryIds.includes('kieng-bac');
  const hasKinhY2K = accessoryIds.includes('kinh-mat-y2k');
  const hasSneaker = accessoryIds.includes('sneaker-chunky');
  const hasBoots = accessoryIds.includes('boots-da');
  const hasGuocMoc = accessoryIds.includes('guoc-moc');
  const hasTuiCoi = accessoryIds.includes('tui-coi-theu');
  const hasTote = accessoryIds.includes('tote-typography');
  const hasQuatLua = accessoryIds.includes('quat-lua-xep');
  const hasBlazer = accessoryIds.includes('blazer-oversize');
  const hasKhanRan = accessoryIds.includes('khan-ran-nam-bo');
  const hasNgocTrai = accessoryIds.includes('ngoc-trai-layer');

  return (
    <div className="relative w-full h-[450px] sm:h-[510px] rounded-3xl overflow-hidden flex flex-col items-center justify-center border border-heritage-border/80 shadow-inner group transition-all duration-700 bg-stone-950">
      {/* 1. SCENIC LANDMARK BACKGROUND */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${currentLandmark.bgGradient} transition-all duration-1000 opacity-90`}
      />

      {/* Atmospheric Landmark Lighting & Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div
          className="absolute w-80 h-80 rounded-full blur-3xl -top-10 -right-10 transition-colors duration-700"
          style={{ backgroundColor: `${currentLandmark.ambientColor}35` }}
        />
        <div
          className="absolute w-80 h-80 rounded-full blur-3xl -bottom-10 -left-10 transition-colors duration-700"
          style={{ backgroundColor: `${color.hex}30` }}
        />
        <div className="absolute inset-0 subtle-grid opacity-20" />
      </div>

      {/* Top Floating Landmark Tag */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-heritage-gold-light" />
          <span className="truncate max-w-[170px] sm:max-w-xs">{currentLandmark.name}</span>
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/90 backdrop-blur-md text-stone-900 border border-stone-200 w-fit shadow-xs">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color.hex }} />
          <span>{color.vietnameseName}</span>
        </span>
      </div>

      {/* View Switcher Button Pill */}
      <div className="absolute top-4 right-4 z-20 flex bg-black/60 backdrop-blur-md rounded-full p-1 border border-white/20 shadow-sm text-xs font-medium">
        <button
          onClick={() => setViewMode('avatar')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
            viewMode === 'avatar'
              ? 'bg-heritage-gold text-stone-950 font-bold shadow-sm'
              : 'text-stone-300 hover:text-white'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>360° Mannequin</span>
        </button>
        <button
          onClick={() => setViewMode('photo')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
            viewMode === 'photo'
              ? 'bg-heritage-gold text-stone-950 font-bold shadow-sm'
              : 'text-stone-300 hover:text-white'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Ảnh Mẫu AI</span>
        </button>
      </div>

      {/* MODE 1: Interactive Layered SVG Turntable Silhouette */}
      {viewMode === 'avatar' ? (
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <svg
            viewBox="0 0 320 440"
            className="h-full w-auto max-h-[390px] drop-shadow-2xl transition-all duration-500 ease-out"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Primary garment linear gradient */}
              <linearGradient id="garmentGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={color.hex} />
                <stop offset="100%" stopColor={color.secondaryHex} />
              </linearGradient>

              {/* Silk reflection shimmer */}
              <linearGradient id="silkShimmer" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
              </linearGradient>

              {/* Gold trim pattern */}
              <linearGradient id="goldTrim" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#DFB058" />
                <stop offset="50%" stopColor="#C59338" />
                <stop offset="100%" stopColor="#9A6E20" />
              </linearGradient>
            </defs>

            {/* Mannequin Base Ground Shadow */}
            <ellipse cx="160" cy="416" rx="68" ry="8" fill="#000000" fillOpacity="0.45" />

            {/* ======================================================== */}
            {/* ANGLE 0°: CHÍNH DIỆN (FRONT VIEW)                       */}
            {/* ======================================================== */}
            {angle === 0 && (
              <g id="angle-front">
                {/* Trousers */}
                <path d="M145 280 L142 385 Q142 390 148 390 L154 390 L157 280 Z" fill={garment.id === 'ao-ba-ba' ? '#1F2937' : '#F4EFE6'} stroke="#E2D8C7" strokeWidth="0.8" />
                <path d="M163 280 L166 390 L172 390 Q178 390 178 385 L175 280 Z" fill={garment.id === 'ao-ba-ba' ? '#1F2937' : '#F4EFE6'} stroke="#E2D8C7" strokeWidth="0.8" />

                {/* Footwear */}
                {hasSneaker ? (
                  <g id="sneakers-front">
                    <rect x="133" y="386" width="22" height="18" rx="5" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.5" />
                    <path d="M131 398 L157 398 L157 404 L131 404 Z" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1" />
                    <path d="M136 390 L146 390" stroke={color.hex} strokeWidth="2" strokeLinecap="round" />
                    <rect x="165" y="386" width="22" height="18" rx="5" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.5" />
                    <path d="M163 398 L189 398 L189 404 L163 404 Z" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1" />
                    <path d="M174 390 L184 390" stroke={color.hex} strokeWidth="2" strokeLinecap="round" />
                  </g>
                ) : hasBoots ? (
                  <g id="boots-front">
                    <path d="M138 355 L138 402 L155 402 L155 355 Z" fill="#18181B" />
                    <rect x="135" y="398" width="22" height="6" rx="2" fill="#09090B" />
                    <path d="M165 355 L165 402 L182 402 L182 355 Z" fill="#18181B" />
                    <rect x="163" y="398" width="22" height="6" rx="2" fill="#09090B" />
                  </g>
                ) : hasGuocMoc ? (
                  <g id="guoc-moc-front">
                    <path d="M137 396 L154 396 L153 402 L138 402 Z" fill="#9A6E20" />
                    <path d="M139 392 Q145 388 152 392" stroke={color.hex} strokeWidth="2.5" fill="none" />
                    <path d="M166 396 L183 396 L182 402 L167 402 Z" fill="#9A6E20" />
                    <path d="M168 392 Q174 388 181 392" stroke={color.hex} strokeWidth="2.5" fill="none" />
                  </g>
                ) : (
                  <g id="minimal-shoes-front">
                    <ellipse cx="145" cy="398" rx="9" ry="4" fill="#292524" />
                    <ellipse cx="175" cy="398" rx="9" ry="4" fill="#292524" />
                  </g>
                )}

                {/* Garments Front */}
                {garment.id === 'ao-dai' && (
                  <g>
                    <path d="M132 180 L124 370 Q160 380 196 370 L188 180 Z" fill={color.hex} opacity="0.85" />
                    <path d="M136 125 L128 365 Q160 375 192 365 L184 125 Q160 140 136 125 Z" fill="url(#garmentGrad)" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.4" />
                    <path d="M142 135 L136 360 Q150 366 160 365 L158 135 Z" fill="url(#silkShimmer)" />
                  </g>
                )}

                {garment.id === 'ao-tu-than' && (
                  <g>
                    <path d="M145 95 L175 95 L180 170 L140 170 Z" fill="#CA4F76" />
                    <path d="M125 105 L110 360 L140 365 L145 105 Z" fill="url(#garmentGrad)" />
                    <path d="M195 105 L210 360 L180 365 L175 105 Z" fill="url(#garmentGrad)" />
                    <path d="M145 170 Q160 185 175 170 L170 240 Q160 250 150 240 Z" fill="#C59338" />
                    <circle cx="160" cy="180" r="6" fill="#9B1D20" />
                  </g>
                )}

                {garment.id === 'ao-ngu-than' && (
                  <g>
                    <path d="M128 100 L118 340 Q160 350 202 340 L192 100 Q160 110 128 100 Z" fill="url(#garmentGrad)" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.3" />
                    <path d="M160 92 L185 125 L185 240 L160 345" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
                    <circle cx="163" cy="95" r="2.5" fill="#DFB058" />
                    <circle cx="172" cy="108" r="2.5" fill="#DFB058" />
                    <circle cx="182" cy="122" r="2.5" fill="#DFB058" />
                    <circle cx="184" cy="150" r="2.5" fill="#DFB058" />
                    <circle cx="183" cy="180" r="2.5" fill="#DFB058" />
                  </g>
                )}

                {garment.id === 'nhat-binh' && (
                  <g>
                    <path d="M120 100 L110 355 Q160 365 210 355 L200 100 Q160 112 120 100 Z" fill="url(#garmentGrad)" />
                    <rect x="146" y="92" width="28" height="105" rx="3" fill="url(#goldTrim)" />
                    <rect x="150" y="96" width="20" height="97" rx="2" fill="#9B1D20" />
                    <line x1="160" y1="92" x2="160" y2="197" stroke="#DFB058" strokeWidth="1.5" />
                  </g>
                )}

                {garment.id === 'ao-ba-ba' && (
                  <g>
                    <path d="M130 98 L124 240 Q160 248 196 240 L190 98 Q160 108 130 98 Z" fill="url(#garmentGrad)" />
                    <line x1="160" y1="108" x2="160" y2="240" stroke="#111827" strokeWidth="1" strokeOpacity="0.3" />
                    <circle cx="160" cy="125" r="2.5" fill="#E5E7EB" />
                    <circle cx="160" cy="148" r="2.5" fill="#E5E7EB" />
                    <circle cx="160" cy="172" r="2.5" fill="#E5E7EB" />
                    <circle cx="160" cy="196" r="2.5" fill="#E5E7EB" />
                  </g>
                )}

                {/* Arms Front */}
                <path d="M130 100 L104 205 Q110 215 118 208 L138 130 Z" fill={color.hex} />
                <path d="M190 100 L216 205 Q210 215 202 208 L182 130 Z" fill={color.hex} />

                {/* Head & Neck */}
                <path d="M152 75 L152 98 L168 98 L168 75 Z" fill="#E7D8C9" />
                <ellipse cx="160" cy="58" rx="19" ry="24" fill="#F1E4D6" />
                <path d="M141 52 Q160 34 179 52 Q183 68 178 72 Q160 76 142 72 Q137 68 141 52 Z" fill="#18181B" />
                <circle cx="160" cy="35" r="9" fill="#18181B" />

                {/* Front Accessories */}
                {hasKhanDong && (
                  <g>
                    <ellipse cx="160" cy="46" rx="23" ry="12" fill="#182747" stroke="#DFB058" strokeWidth="1" />
                    <path d="M137 46 Q160 38 183 46" stroke="#DFB058" strokeWidth="1" fill="none" />
                  </g>
                )}
                {hasNonQuaiThao && (
                  <g>
                    <ellipse cx="160" cy="32" rx="42" ry="10" fill="#EEDCC1" stroke="#C59338" strokeWidth="1.2" />
                    <path d="M125 35 Q120 90 128 150" stroke="#CA4F76" strokeWidth="2" fill="none" />
                    <path d="M195 35 Q200 90 192 150" stroke="#CA4F76" strokeWidth="2" fill="none" />
                  </g>
                )}
                {hasKiengBac && <path d="M149 92 Q160 102 171 92" stroke="#E5E7EB" strokeWidth="3.5" strokeLinecap="round" fill="none" />}
                {hasKinhY2K && (
                  <g>
                    <rect x="145" y="52" width="13" height="7" rx="3.5" fill="#111827" stroke="#38BDF8" strokeWidth="1" />
                    <rect x="162" y="52" width="13" height="7" rx="3.5" fill="#111827" stroke="#38BDF8" strokeWidth="1" />
                  </g>
                )}
                {hasTote && (
                  <g>
                    <rect x="204" y="230" width="28" height="34" rx="2" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1" />
                    <text x="210" y="248" fill="#9B1D20" fontSize="7" fontWeight="bold">VIỆT</text>
                  </g>
                )}
              </g>
            )}

            {/* ======================================================== */}
            {/* ANGLE 45°: GÓC NGHIÊNG (THREE-QUARTER VIEW)              */}
            {/* ======================================================== */}
            {angle === 45 && (
              <g id="angle-quarter">
                {/* Trousers 45 */}
                <path d="M148 280 L140 385 Q140 390 146 390 L152 390 L156 280 Z" fill={garment.id === 'ao-ba-ba' ? '#1F2937' : '#F4EFE6'} />
                <path d="M160 280 L168 390 L174 390 Q180 390 180 385 L170 280 Z" fill={garment.id === 'ao-ba-ba' ? '#1F2937' : '#F4EFE6'} />

                {/* Footwear 45 */}
                {hasSneaker ? (
                  <g>
                    <rect x="134" y="386" width="20" height="17" rx="5" fill="#FFFFFF" stroke="#9CA3AF" />
                    <rect x="164" y="386" width="23" height="17" rx="5" fill="#FFFFFF" stroke="#9CA3AF" />
                    <path d="M168 390 L178 390" stroke={color.hex} strokeWidth="2" />
                  </g>
                ) : (
                  <g>
                    <ellipse cx="144" cy="398" rx="8" ry="4" fill="#292524" />
                    <ellipse cx="174" cy="398" rx="10" ry="4" fill="#292524" />
                  </g>
                )}

                {/* Garment 45 silhouette */}
                <path d="M136 100 L115 365 Q155 375 190 355 L182 100 Q155 110 136 100 Z" fill="url(#garmentGrad)" />
                {/* Side slit preview */}
                <path d="M170 170 L176 350" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" />
                <path d="M140 115 L132 360" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.25" fill="none" />

                {/* Arms 45 */}
                <path d="M134 100 L118 205 Q125 215 132 208 L142 128 Z" fill={color.hex} />
                <path d="M180 100 L212 195 Q206 205 198 200 L176 130 Z" fill={color.hex} />

                {/* Head 45 */}
                <path d="M152 75 L152 98 L168 98 L168 75 Z" fill="#E7D8C9" />
                <ellipse cx="164" cy="58" rx="18" ry="24" fill="#F1E4D6" />
                <path d="M148 50 Q168 34 184 54 Q186 68 180 72 Q164 76 148 68 Z" fill="#18181B" />
                <circle cx="166" cy="36" r="8" fill="#18181B" />

                {hasKhanDong && <ellipse cx="164" cy="46" rx="21" ry="11" fill="#182747" stroke="#DFB058" strokeWidth="1" />}
                {hasKinhY2K && <rect x="156" y="52" width="18" height="7" rx="3.5" fill="#111827" stroke="#38BDF8" strokeWidth="1" />}
                {hasTote && <rect x="200" y="215" width="26" height="32" rx="2" fill="#F3F4F6" stroke="#9CA3AF" />}
              </g>
            )}

            {/* ======================================================== */}
            {/* ANGLE 90°: GÓC SƯỜN BÊN (SIDE PROFILE VIEW)              */}
            {/* ======================================================== */}
            {angle === 90 && (
              <g id="angle-side">
                {/* Leg profile */}
                <path d="M152 260 L148 385 Q148 390 156 390 L166 390 L164 260 Z" fill={garment.id === 'ao-ba-ba' ? '#1F2937' : '#F4EFE6'} />

                {/* Shoe profile */}
                {hasSneaker ? (
                  <path d="M142 388 L174 388 L174 402 L142 402 Z" fill="#FFFFFF" stroke="#9CA3AF" strokeWidth="1" />
                ) : hasBoots ? (
                  <path d="M144 360 L144 402 L168 402 L168 360 Z" fill="#18181B" />
                ) : (
                  <ellipse cx="158" cy="398" rx="14" ry="5" fill="#292524" />
                )}

                {/* Front flap in profile */}
                <path d="M152 95 L144 365 Q150 370 158 368 L158 175 Z" fill="url(#garmentGrad)" />
                {/* Back flap in profile */}
                <path d="M162 95 L162 175 L168 375 Q174 378 178 375 L170 95 Z" fill={color.hex} opacity="0.85" />
                {/* Side Slit Opening Gap */}
                <line x1="158" y1="165" x2="160" y2="368" stroke="#E2D8C7" strokeWidth="2" strokeDasharray="3 3" />

                {/* Arm Profile */}
                <path d="M155 100 L150 215 Q158 220 165 215 L168 105 Z" fill={color.hex} />

                {/* Head in profile */}
                <path d="M154 75 L154 96 L166 96 L166 75 Z" fill="#E7D8C9" />
                <path d="M152 50 Q168 36 176 54 Q178 68 172 74 Q156 76 150 64 Z" fill="#F1E4D6" />
                {/* Profile hair bun */}
                <path d="M166 42 Q176 44 180 54 Q182 66 172 70 Z" fill="#18181B" />
                <circle cx="178" cy="46" r="7" fill="#18181B" />

                {hasKhanDong && <ellipse cx="162" cy="46" rx="14" ry="10" fill="#182747" stroke="#DFB058" strokeWidth="1" />}
                {hasTramCai && <line x1="172" y1="36" x2="188" y2="28" stroke="#E5E7EB" strokeWidth="2.5" strokeLinecap="round" />}
                {hasKinhY2K && <rect x="146" y="52" width="10" height="6" rx="3" fill="#111827" stroke="#38BDF8" />}
              </g>
            )}

            {/* ======================================================== */}
            {/* ANGLE 180°: PHÍA SAU TÀ ÁO (BACK VIEW)                   */}
            {/* ======================================================== */}
            {angle === 180 && (
              <g id="angle-back">
                {/* Trousers Back */}
                <path d="M145 280 L142 385 Q142 390 148 390 L154 390 L157 280 Z" fill={garment.id === 'ao-ba-ba' ? '#1F2937' : '#F4EFE6'} />
                <path d="M163 280 L166 390 L172 390 Q178 390 178 385 L175 280 Z" fill={garment.id === 'ao-ba-ba' ? '#1F2937' : '#F4EFE6'} />

                {/* Footwear Back */}
                {hasSneaker ? (
                  <g>
                    <rect x="133" y="388" width="22" height="16" rx="4" fill="#FFFFFF" stroke="#9CA3AF" />
                    <rect x="165" y="388" width="22" height="16" rx="4" fill="#FFFFFF" stroke="#9CA3AF" />
                  </g>
                ) : (
                  <g>
                    <ellipse cx="145" cy="398" rx="8" ry="4" fill="#292524" />
                    <ellipse cx="175" cy="398" rx="8" ry="4" fill="#292524" />
                  </g>
                )}

                {/* Back flap */}
                <path d="M134 100 L122 368 Q160 380 198 368 L186 100 Q160 108 134 100 Z" fill="url(#garmentGrad)" />
                {/* Central Spine Seam Line (Sống Áo - nét văn hóa quan trọng) */}
                <line x1="160" y1="95" x2="160" y2="372" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.45" strokeDasharray="4 2" />

                {/* Áo tứ thân back seam */}
                {garment.id === 'ao-tu-than' && (
                  <g>
                    <path d="M146 170 Q160 185 174 170 L170 230 Q160 240 150 230 Z" fill="#C59338" />
                  </g>
                )}

                {/* Arms Back */}
                <path d="M134 100 L106 205 Q112 215 120 208 L140 125 Z" fill={color.hex} />
                <path d="M186 100 L214 205 Q208 215 200 208 L180 125 Z" fill={color.hex} />

                {/* Head Back */}
                <path d="M152 75 L152 98 L168 98 L168 75 Z" fill="#E7D8C9" />
                <ellipse cx="160" cy="56" rx="19" ry="24" fill="#18181B" />
                <circle cx="160" cy="46" r="12" fill="#18181B" />

                {hasKhanDong && (
                  <g>
                    <ellipse cx="160" cy="48" rx="22" ry="11" fill="#182747" stroke="#DFB058" strokeWidth="1" />
                    <line x1="140" y1="48" x2="180" y2="48" stroke="#DFB058" strokeWidth="1.5" />
                  </g>
                )}
                {hasTramCai && (
                  <g>
                    <line x1="150" y1="42" x2="175" y2="34" stroke="#E5E7EB" strokeWidth="2.5" />
                    <circle cx="176" cy="34" r="3.5" fill="#CA4F76" />
                  </g>
                )}
              </g>
            )}
          </svg>
        </div>
      ) : (
        /* MODE 2: High-Fashion Lookbook Photography with interactive Zoom & Inspection */
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
          {!photoError ? (
            <img
              src={garment.image}
              alt={garment.name}
              onError={() => setPhotoError(true)}
              style={{ transform: `scale(${zoomLevel})` }}
              className="w-full h-full object-cover object-center filter saturate-105 transition-transform duration-300 select-none"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-stone-900 text-stone-200">
              <Sparkles className="w-8 h-8 text-heritage-gold mb-2" />
              <h4 className="font-serif text-lg font-bold">{garment.name}</h4>
              <p className="text-xs text-stone-400 mt-1 max-w-xs">{garment.subtitle}</p>
            </div>
          )}

          {/* Photo Zoom Controls Bar */}
          <div className="absolute top-16 right-4 z-20 flex flex-col gap-1.5 bg-black/60 backdrop-blur-md rounded-2xl p-1.5 border border-white/20 shadow-md">
            <button
              onClick={() => setZoomLevel((z) => Math.min(2, z + 0.25))}
              className="p-1.5 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Phóng to"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(1, z - 0.25))}
              className="p-1.5 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Thu nhỏ"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1.5 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors text-[10px] font-bold"
              title="Khôi phục 1x"
            >
              1x
            </button>
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white z-10 pointer-events-none">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
              Lookbook Editorial • {currentLandmark.name}
            </span>
            <h4 className="font-serif text-lg font-bold drop-shadow-md">
              {garment.name} × {style.name}
            </h4>
          </div>
        </div>
      )}

      {/* 360° TURNTABLE CONTROLS FLOATING BAR (Only shown in Avatar mode) */}
      {viewMode === 'avatar' && (
        <div className="absolute bottom-3.5 left-4 right-4 z-20 flex items-center justify-between bg-black/75 backdrop-blur-xl rounded-2xl p-1.5 border border-white/20 shadow-xl">
          {/* Angle quick-select buttons */}
          <div className="flex items-center gap-1">
            {[
              { val: 0, label: '0° Chính diện' },
              { val: 45, label: '45° Nghiêng' },
              { val: 90, label: '90° Sườn' },
              { val: 180, label: '180° Sau' }
            ].map((item) => (
              <button
                key={item.val}
                onClick={() => {
                  setAngle(item.val as TurntableAngle);
                  setIsAutoRotating(false);
                }}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all ${
                  angle === item.val
                    ? 'bg-heritage-gold text-stone-950 shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Auto rotate toggle */}
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all ${
              isAutoRotating
                ? 'bg-heritage-red text-white shadow-red-glow animate-pulse'
                : 'text-stone-300 hover:text-white hover:bg-white/10'
            }`}
            title="Tự động xoay 360 độ"
          >
            {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <RotateCw className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isAutoRotating ? 'Dừng' : 'Xoay 360°'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
