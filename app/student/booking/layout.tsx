
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LocalizationProviderWrapper from '@/components/LocalizationProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bookking",
  description: "Schedule Appointment with Counselor",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
        <LocalizationProviderWrapper>
          {children}
        </LocalizationProviderWrapper>
  )
}
