export default function PageLayout({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={`min-h-[calc(100vh-4rem)] w-full px-4 md:px-8 lg:px-16 py-8 md:py-12 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </main>
  );
}
