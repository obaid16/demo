import { notFound } from 'next/navigation';
import { MENU_ITEMS } from '@/data/menu';
import DishDetailClient from '@/components/menu/DishDetailClient';

export async function generateStaticParams() {
  return MENU_ITEMS.map((dish) => ({
    id: dish.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = MENU_ITEMS.find((d) => d.id === id);

  if (!dish) {
    return {
      title: 'Dish Not Found — NOOR',
    };
  }

  return {
    title: `${dish.name} — NOOR Indian Dining`,
    description: dish.shortDesc,
    openGraph: {
      title: `${dish.name} | NOOR Indian Dining`,
      description: dish.shortDesc,
      images: [{ url: dish.image }],
    },
  };
}

export default async function DishDetailPage({ params }) {
  const { id } = await params;
  const dish = MENU_ITEMS.find((d) => d.id === id);

  if (!dish) {
    notFound();
  }

  // Find 3 related dishes from same category or signatures
  const relatedDishes = MENU_ITEMS.filter(
    (d) => d.id !== dish.id && (d.category === dish.category || d.isSignature)
  ).slice(0, 3);

  return <DishDetailClient dish={dish} relatedDishes={relatedDishes} />;
}
