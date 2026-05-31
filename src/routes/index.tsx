import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Offerings } from "@/components/Offerings";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { QuoteBanner } from "@/components/QuoteBanner";
import { Experience } from "@/components/Experience";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";

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
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Offerings />
      <Skills />
      <Projects />
      <QuoteBanner />
      <Experience />
      <Certifications />
      <Contact />
    </main>
  );
}
