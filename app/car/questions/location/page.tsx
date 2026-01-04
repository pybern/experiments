import { LocationForm } from "./location-form"

interface Props {
  searchParams: Promise<Record<string, string | undefined>>
}

export default async function LocationStep({ searchParams }: Props) {
  const params = await searchParams

  return <LocationForm initialParams={params} />
}
