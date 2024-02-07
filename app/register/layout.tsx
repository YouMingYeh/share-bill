export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col align-middle justify-center h-screen w-screen items-center">
      {children}
    </div>
  );
}
