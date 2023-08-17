import ThirdWebProvider from '@/components/Providers/ThirdWebProvider';
import Navbar from '@/components/UiSections/Navbar';
import Web3ConnectionWrapper from '@/context/Web3ConnectionContext';
import '@/styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ChainIntract',
  description:
    'ChainIntract is a platform designed to make blockchain technology accessible and user-friendly for everyone. Our mission is to simplify the process of engaging with smart contracts on various blockchain networks, empowering users to harness the full potential of decentralized applications.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThirdWebProvider>

        <Web3ConnectionWrapper>
          <body>
        <Navbar />
        <main>
            {children}
        </main>
            </body>
        </Web3ConnectionWrapper>
      </ThirdWebProvider>
    </html>
  );
}
