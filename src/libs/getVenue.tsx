export default async function getVenue(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const response = await fetch(
    `https://a08-venue-explorer-backend-3.vercel.app/api/v1/venues/${id}`,
    { next: { revalidate: 60 } },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch venue detail");
  }
  return await response.json();
}
