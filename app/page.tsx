import { Header } from "@/components/sec-header";
import { FloatingDock } from "@/components/floating-dock";

export default function Page() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-6 bg-neutral-100 py-8">
      {/* Header Section */}
      <Header />

      {/* Dock Section */}
      <FloatingDock />
    </div>
  );
}
