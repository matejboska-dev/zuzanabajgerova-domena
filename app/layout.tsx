// Root layout je zamerne jen prusvit. <html> a <body> se renderuji az
// v app/[locale]/layout.tsx, aby atribut lang odpovidal jazykove verzi.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
