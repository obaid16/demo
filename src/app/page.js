import HeroSection from '@/components/home/HeroSection';
import BrandPhilosophy from '@/components/home/BrandPhilosophy';
import SignatureDishes from '@/components/home/SignatureDishes';
import MenuCategoriesNav from '@/components/home/MenuCategoriesNav';
import AtmosphereExperience from '@/components/home/AtmosphereExperience';
import ChefPhilosophy from '@/components/home/ChefPhilosophy';
import FeaturedExperience from '@/components/home/FeaturedExperience';
import GalleryPreview from '@/components/home/GalleryPreview';
import ReviewsSection from '@/components/home/ReviewsSection';
import LocationReserveBanner from '@/components/home/LocationReserveBanner';

export const metadata = {
  title: 'NOOR — Indian Dining | Contemporary Luxury Cuisine',
  description: 'Experience contemporary Indian dining at NOOR. 36-hour charcoal simmered curries, Awadhi royal kebabs, and progressive modern gastronomy in Chanakyapuri, New Delhi.',
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Brand Introduction & Philosophy */}
      <BrandPhilosophy />

      {/* 3. Signature Dishes Asymmetric Showcase */}
      <SignatureDishes />

      {/* 4. Menu Categories Navigation */}
      <MenuCategoriesNav />

      {/* 5. Atmosphere & Dining Ambiance */}
      <AtmosphereExperience />

      {/* 6. Executive Chef & Heritage */}
      <ChefPhilosophy />

      {/* 7. Featured Weekly Experience */}
      <FeaturedExperience />

      {/* 8. Gallery Preview with Lightbox */}
      <GalleryPreview />

      {/* 9. Critical Reviews & Praises */}
      <ReviewsSection />

      {/* 10. Location, Hours & Reservations */}
      <LocationReserveBanner />
    </div>
  );
}
