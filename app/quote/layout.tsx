import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "MTB Quote — Project Estimation | MTB Labs",
    template: "%s | MTB Quote",
  },
  description:
    "Get an instant project estimate for your web design, UI/UX, and frontend development needs from MTB Labs.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 
        Hide the portfolio's decorative LiquidBackground on Quote pages
        via CSS. The background component is rendered in the root layout;
        we overlay a clean surface for the Quote product.
      */}
      <style>{`
        .liquid-environment { display: none !important; }
        .prism-mesh { display: none !important; }
        body {
          background: linear-gradient(135deg, #f8f9fc 0%, #eef1f8 50%, #e8ecf4 100%) !important;
        }
      `}</style>
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {children}
      </div>
    </>
  );
}
