export default async function SearchPage({
  searchParams,
}: PageProps<"/search">) {
  const { q } = await searchParams;

  return <>{q}</>;
}
