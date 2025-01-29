export default function DocumentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="bg-[#080808]">{children}</section>;
}
