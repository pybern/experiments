import { FloatingDock } from "@/components/floating-dock";
import { Navbar } from "@/components/navbar";
import { AboutSection } from "@/components/about-section";

export default function Page() {
  return (
    <main className="bg-neutral-100">
      {/* Hero Section - Full viewport height */}
      <section className="relative flex h-screen flex-col items-center">
        <div className="flex w-full max-w-7xl flex-1 flex-col px-4">
          <Navbar />
          <div className="flex flex-1 flex-col items-center justify-center">
            <FloatingDock />
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />
    </main>
  );
}
