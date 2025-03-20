"use client";

export default function PaySuccessLayout({
                                           children,
                                         }: {
  children: React.ReactNode;
}) {
  return (
      <section className="flex flex-col bg-gradient-to-br from-green-500 to-blue-500 min-h-screen">
        {children}
      </section>
  );
}
