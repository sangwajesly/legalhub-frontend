import { Hero, TrustSignals, ServiceSegmentation, HowItWorks, Features, FinalCTA, Footer, HomeNavbar } from '@/components/home';

export default function Home() {
  return (
    <div className="w-full">
      <HomeNavbar />
      <Hero />
      <TrustSignals />
      <ServiceSegmentation />
      <HowItWorks />
      <Features />
      <FinalCTA />
      <Footer />
    </div>
  );
}
