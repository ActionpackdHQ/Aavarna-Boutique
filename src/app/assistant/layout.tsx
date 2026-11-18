export default function AssistantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100svh] bg-[#161210] text-[#f5efe4]">{children}</div>
  );
}
