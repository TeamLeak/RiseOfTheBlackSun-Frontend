"use client";

export default function PayErrorLayout({
                                         children,
                                       }: {
  children: React.ReactNode;
}) {
  return (
      <section className="flex flex-col bg-gradient-to-br from-red-500 to-yellow-500 min-h-screen">
        {children}
      </section>
  );
}
