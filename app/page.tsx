import { Hero, TrustSignals, ServiceSegmentation, HowItWorks, Features, FinalCTA, Footer } from '@/components/home';

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <TrustSignals />
      <ServiceSegmentation />
      <HowItWorks />
      <Features />
      <FinalCTA />
      <Footer />
    </main>
  );
}
