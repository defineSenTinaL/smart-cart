import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthProvider";
import { NextUIProviders } from "@/context/NextUiProvider";
import { Toaster } from "react-hot-toast";
import { cookies } from "next/headers";
const inter = Inter({ subsets: ["latin"] });

const {
  NEXT_PUBLIC_TWITTER_CREATOR,
  NEXT_PUBLIC_TWITTER_SITE,
  NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_DESCRIPTION,
} = process.env;
const baseUrl = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: NEXT_PUBLIC_SITE_NAME!,
    template: `%s | ${NEXT_PUBLIC_SITE_NAME}`,
  },
  keywords: [
    "Home & Kitchen",
    "Home Improvement",
    "Electrical",
    "Home Appliances",
    "Mixer Grinder",
    "Hardware",
    "Sanitaryware",
    "Cookware",
    "Lighting",
    "Power Tools",
    "Heater",
    "Kitchen sink",
    "Angle Grinder",
    "Drill Machine",
    "Toilet",
    "Double Soap Dish",
    "Glass Tumbler Holder",
    "Faucet",
    "Ceiling Fan",
    "Wall Fan",
    "Tankless Water Heaters",
    "Rice Cooker",
    "Bulb",
    "batten",
    "Microwave Oven",
    "Pressure Cooker",
    "Portable Lighting",
    "Gas Water Heaters",
    "Soap with Tumbler Holder",
  ],
  description: NEXT_PUBLIC_DESCRIPTION,
  robots: {
    follow: true,
    index: true,
  },
  ...(NEXT_PUBLIC_TWITTER_CREATOR &&
    NEXT_PUBLIC_TWITTER_SITE && {
      twitter: {
        card: "summary_large_image",
        creator: NEXT_PUBLIC_TWITTER_CREATOR,
        site: NEXT_PUBLIC_TWITTER_SITE,
      },
    }),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cook = cookies();
  const theme = cook.get("daisyTheme");
  return (
    <html lang="en" data-theme={theme ? theme.value : "cupcake"}>
      <body className={inter.className}>
        <AuthProvider>
          <NextUIProviders>
            <main className="bg-base-200">
              <Toaster position="top-center" />
              {children}
            </main>
          </NextUIProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
