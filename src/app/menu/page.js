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
          eyebrow="OUR MENU"
          title="A celebration of Indian flavours."
          subtitle="From the fiery hearth of the tandoor to delicate slow-steamed Awadhi dum biryanis, each recipe honors heritage with contemporary culinary restraint."
        />

        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[4/3] bg-[#211E1B] border border-stone-800" />
              ))}
            </div>
          }
        >
          <MenuBrowser />
        </Suspense>
      </div>
    </div>
  );
}
