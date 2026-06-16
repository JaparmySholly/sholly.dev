import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About | Japarmy Sholly",
  description: "Learn more about Japarmy Sholly, a cybersecurity engineer, researcher, and software developer focused on threat detection, DFIR, security research, and software engineering.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
