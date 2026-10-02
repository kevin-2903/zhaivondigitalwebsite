import Preloader from '@/components/Preloader';
import Nav from '@/components/Nav';
import WhatsApp from '@/components/WhatsApp';
import Peek from '@/components/Peek';
import RootLine from '@/components/RootLine';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Intro from '@/components/Intro';
import Services from '@/components/Services';
import Work from '@/components/Work';
import Process from '@/components/Process';
import Audience from '@/components/Audience';
import Voices from '@/components/Voices';
import CTA from '@/components/CTA';
import Form from '@/components/Form';
import Footer from '@/components/Footer';
import CaseStudy from '@/components/CaseStudy';
import Motion from '@/components/Motion';

export default function Home() {
  return (
    <>
      <Preloader />
      <Nav />
      <WhatsApp />
      <Peek />
      <RootLine />
      <main className="wrap" id="top">
        <Hero />
        <Marquee />
        <Intro />
        <Services />
        <Work />
        <Process />
        <Audience />
        <Voices />
        <CTA />
        <Form />
        <Footer />
      </main>
      <CaseStudy />
      <Motion />
    </>
  );
}
