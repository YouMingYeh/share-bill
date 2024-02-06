export default function Group({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      params.groupid: {id}
    </div>
  );
}
