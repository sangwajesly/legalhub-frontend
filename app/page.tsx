import { Hero, TrustSignals, ServiceSegmentation, HowItWorks, Features, FinalCTA, Footer, HomeNavbar, FAQ } from '@/components/home';

export default function Home() {
  return (
    <div className="w-full">
      <HomeNavbar />
      <Hero />
      <TrustSignals />
      <ServiceSegmentation />
      <HowItWorks />
      <Features />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
