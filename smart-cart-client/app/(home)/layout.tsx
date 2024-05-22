import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

const NoSSRHeader = dynamic(() => import("@/components/Header"), {
  ssr: false,
});

const NoSSRCategoryNavbar = dynamic(() => import("@/components/CategoryNavbar"), {
  ssr: false,
});

export default function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
        <NoSSRHeader />
        <NoSSRCategoryNavbar />
        {children}
        <Footer />
    </section>
  );
}
