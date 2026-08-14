import { create } from 'zustand';

export interface LightboxItem {
  src: string;
  title: string;
  caption?: string;
}

interface LightboxState {
  items: LightboxItem[];
  index: number;
  open: boolean;
  openAt: (items: LightboxItem[], index: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
}

export const useLightbox = create<LightboxState>((set, get) => ({
  items: [],
  index: 0,
  open: false,
  openAt: (items, index) => set({ items, index, open: true }),
  close: () => set({ open: false }),
  next: () => {
    const { items, index } = get();
    if (!items.length) return;
    set({ index: (index + 1) % items.length });
  },
  prev: () => {
    const { items, index } = get();
    if (!items.length) return;
    set({ index: (index - 1 + items.length) % items.length });
  },
}));
