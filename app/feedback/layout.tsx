export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col tify-center gap-4 py-8 md:py-10 bg-[#080808]">
      {children}
    </section>
  );
}
