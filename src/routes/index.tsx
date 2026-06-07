import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ByTheNumbers } from "@/components/ByTheNumbers";
import { Offerings } from "@/components/Offerings";
import { Skills } from "@/components/Skills";
import { MyStack } from "@/components/MyStack";
import { Projects } from "@/components/Projects";
import { QuoteBanner } from "@/components/QuoteBanner";
import { Experience } from "@/components/Experience";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SectionDivider } from "@/components/SectionDivider";
import { NoiseTexture } from "@/components/NoiseTexture";
import { Loader } from "@/components/Loader";
import { BackToTop } from "@/components/BackToTop";
import { ChatWidget } from "@/components/ChatWidget";
import { ResumeModal } from "@/components/ResumeModal";
import { SiteEnhancements } from "@/components/SiteEnhancements";
import { SiteExtras } from "@/components/SiteExtras";
import { ShareModal } from "@/components/ShareModal";
import { Toaster } from "@/components/ui/sonner";
import { registerServiceWorker } from "@/lib/register-sw";
import { GA_MEASUREMENT_ID, gaEnabled } from "@/lib/analytics";

const PAGE_TITLE =
  "Syed Azghar Abbas Rizvi — Data Analyst | Python | SQL | Power BI";
const PAGE_DESC =
  "Entry-level Data Analyst and ML Engineer from Chennai. Skilled in Python, SQL, Power BI, Tableau and Machine Learning. Open to work.";
const CANONICAL = "https://azgharportfolio-1.lovable.app/";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Syed Azghar Abbas Rizvi",
  jobTitle: "Data Analyst",
  url: CANONICAL,
  email: "mailto:azgharabbas@gmail.com",
  telephone: "+91-9150642752",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Data Analysis",
    "Python",
    "SQL",
    "Power BI",
    "Tableau",
    "Machine Learning",
  ],
  sameAs: [
    "https://linkedin.com/in/azghar-abbas",
    "https://github.com/Azghar-07-analyst",
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "Data Analyst Chennai, Python Developer, SQL, Power BI, Machine Learning Engineer, Syed Azghar Abbas Rizvi",
      },
      { name: "theme-color", content: "#00d4ff" },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: CANONICAL },
      { property: "og:image", content: `${CANONICAL}og-image.png` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
      { name: "twitter:image", content: `${CANONICAL}og-image.png` },
    ],
    links: [
      { rel: "canonical", href: CANONICAL },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icon-192.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(personJsonLd),
      },
      ...(gaEnabled
        ? [
            {
              src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
              async: true,
            },
            {
              children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`,
            },
          ]
        : []),
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <main className="page-fade-in relative overflow-x-hidden">
      <Loader />
      <NoiseTexture />
      <CustomCursor />
      <ScrollProgress />
      <BackToTop />
      <ChatWidget />
      <ResumeModal />
      <SiteEnhancements />
      <Toaster position="bottom-center" />
      <Navbar />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <ByTheNumbers />
      <SectionDivider />
      <Offerings />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <MyStack />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <QuoteBanner />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Certifications />
      <SectionDivider />
      <Contact />
      <Footer />
    </main>
  );
}
