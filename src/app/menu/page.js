import { Suspense } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import MenuBrowser from '@/components/menu/MenuBrowser';

export const metadata = {
  title: 'Menu — NOOR Indian Dining',
  description: 'Explore the contemporary Indian menu at NOOR. Charred sigri kebabs, 36-hour smoked Dal Makhani, hand-stretched truffle naans, and Awadhi dum biryanis.',
};

export default function MenuPage() {
  return (
    <div className="pt-32 pb-28 bg-[#171513] text-[#F4EFE6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="THE REPERTOIRE"
          title="Curated Dining Menu"
          subtitle="Every creation honors the ancient culinary courts of India, elevated with refined contemporary artistry, single-origin spices, and slow charcoal hearth craft."
        />

        <Suspense
          fallback={
            <div className="py-24 text-center text-[#B89A63] text-sm tracking-widest uppercase">
              Loading Repertoire...
            </div>
          }
        >
          <MenuBrowser />
        </Suspense>
      </div>
    </div>
  );
}
