import { Inter } from "next/font/google";
import { Viewport } from "next";
import PlausibleProvider from "next-plausible";
import { getSEOTags } from "@/libs/seo";
import ClientLayout from "@/components/LayoutClient";
import config from "@/config";
import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  // Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
  themeColor: config.colors.main,
  width: "device-width",
  initialScale: 1,
};

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags();

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" data-theme={config.colors.theme} className={`${font.className} bg-black`}>
      {config.domainName && (
        <head>
          <PlausibleProvider domain={config.domainName} />
          <script defer data-website-id="6721a250a95f87b91909d6d1" data-domain="thelandscapeai.com" src="https://datafa.st/js/script.js"></script>
        </head>
      )}
      <body className="bg-black">
        {/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
