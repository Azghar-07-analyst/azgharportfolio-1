import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ByTheNumbers } from "@/components/ByTheNumbers";
import { Offerings } from "@/components/Offerings";
import { Skills } from "@/components/Skills";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Syed Azghar Abbas Rizvi — Data Analyst" },
      {
        name: "description",
        content:
          "Data Analyst specializing in Python, SQL, Power BI and Machine Learning. Turning raw data into strategic decisions.",
      },
      { property: "og:title", content: "Syed Azghar Abbas Rizvi — Data Analyst" },
      {
        property: "og:description",
        content: "Turning raw data into strategic decisions with Python, SQL, Power BI & ML.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Syed Azghar Abbas Rizvi — Data Analyst" },
      {
        name: "twitter:description",
        content: "Turning raw data into strategic decisions with Python, SQL, Power BI & ML.",
      },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative overflow-x-hidden">
      <Loader />
      <NoiseTexture />
      <CustomCursor />
      <ScrollProgress />
      <BackToTop />
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
