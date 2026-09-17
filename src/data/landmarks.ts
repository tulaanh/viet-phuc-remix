import { Landmark } from '../types/outfit';

export const LANDMARKS: Landmark[] = [
  {
    id: 'hue-palace',
    name: 'Cố Đô Huế — Ngọ Môn Hoàng Thành',
    location: 'Thừa Thiên Huế',
    description: 'Kinh thành tráng lệ, ngói lưu ly vàng và tường gạch son thời Nguyễn trong ánh hoàng hôn cung đình.',
    imageUrl: './images/landmarks/landmark_hue.jpg',
    bgGradient: 'from-amber-950/70 via-red-950/50 to-stone-950/80',
    ambientColor: '#C59338',
    suitableGarments: ['nhat-binh', 'ao-ngu-than', 'ao-dai']
  },
  {
    id: 'hoi-an',
    name: 'Phố Cổ Hội An — Phố Đèn Lồng',
    location: 'Quảng Nam',
    description: 'Dãy nhà cổ tường vàng hoa giấy, lung linh ánh đèn lồng rực rỡ bên dòng sông Hoài thơ mộng.',
    imageUrl: './images/landmarks/landmark_hoi_an.jpg',
    bgGradient: 'from-yellow-950/60 via-amber-900/40 to-stone-950/80',
    ambientColor: '#F59E0B',
    suitableGarments: ['ao-dai', 'ao-tu-than', 'ao-ba-ba']
  },
  {
    id: 'hanoi-old-quarter',
    name: 'Hà Nội 36 Phố — Ô Quan Chưởng & Phố Cổ',
    location: 'Thủ đô Hà Nội',
    description: 'Cổng thành rêu phong cổ kính, nét đẹp ngàn năm văn hiến trầm mặc giữa lòng phố cổ.',
    imageUrl: './images/landmarks/landmark_hanoi.jpg',
    bgGradient: 'from-stone-900/70 via-emerald-950/40 to-stone-950/80',
    ambientColor: '#1D6246',
    suitableGarments: ['ao-dai', 'ao-tu-than', 'ao-ngu-than']
  },
  {
    id: 'trang-an',
    name: 'Tràng An Cố Đô — Non Nước Hữu Tình',
    location: 'Ninh Bình',
    description: 'Dòng sông ngọc bích uốn lượn quanh các dãy núi đá vôi kỳ vĩ và mây trời bảng lảng.',
    imageUrl: './images/landmarks/landmark_trang_an.jpg',
    bgGradient: 'from-cyan-950/60 via-emerald-950/50 to-stone-950/80',
    ambientColor: '#059669',
    suitableGarments: ['ao-tu-than', 'ao-ngu-than', 'ao-dai']
  },
  {
    id: 'saigon-retro',
    name: 'Sài Gòn Phố Thị — Indochine Cổ Điển',
    location: 'TP. Hồ Chí Minh',
    description: 'Góc phố cà phê kiến trúc Đông Dương hoài cổ, nhịp sống đường phố phóng khoáng thanh lịch.',
    imageUrl: './images/landmarks/landmark_saigon.jpg',
    bgGradient: 'from-rose-950/70 via-purple-950/50 to-stone-950/80',
    ambientColor: '#EC4899',
    suitableGarments: ['ao-ba-ba', 'ao-dai']
  },
  {
    id: 'studio-editorial',
    name: 'Studio Runway — Editorial Lookbook',
    location: 'Fashion Studio',
    description: 'Không gian sàn diễn lookbook ánh sáng spotlight chuyên nghiệp, tôn vinh trọn vẹn phom dáng.',
    imageUrl: './images/landmarks/landmark_studio.jpg',
    bgGradient: 'from-stone-900/80 via-stone-800/60 to-stone-950/90',
    ambientColor: '#E2D8C7',
    suitableGarments: ['ao-dai', 'ao-ngu-than', 'nhat-binh', 'ao-tu-than', 'ao-ba-ba']
  }
];
