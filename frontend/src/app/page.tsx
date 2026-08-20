import { FeaturedWork } from '@/components/public/FeaturedWork';
import { Footer } from '@/components/public/Footer';
import { Hero } from '@/components/public/Hero';
import { Navbar } from '@/components/public/Navbar';
import { Services } from '@/components/public/Services';
import { Testimonials } from '@/components/public/Testimonials';

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <Services />

        <FeaturedWork />

        <Testimonials />
      </main>

      <Footer />
    </>
  );
}
