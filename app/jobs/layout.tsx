export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col bg-[#080808]">
        {children}
    </section>
  );
}
