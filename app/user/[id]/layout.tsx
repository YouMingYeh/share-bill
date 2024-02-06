export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col align-middle justify-center h-screen w-screen items-center">
      {children}
    </div>
  );
}
