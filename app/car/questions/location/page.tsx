import { LocationForm } from "./location-form"

interface Props {
  searchParams: Promise<{
    pick?: string
    pickRef?: string
    drop?: string
    dropRef?: string
  }>
}

export default async function LocationStep({ searchParams }: Props) {
  const params = await searchParams

  return <LocationForm initialParams={params} />
}
