import { redirect } from "next/navigation"
import { VehicleForm } from "./vehicle-form"

interface Props {
  searchParams: Promise<Record<string, string | undefined>>
}

export default async function VehicleStep({ searchParams }: Props) {
  const params = await searchParams

  // Redirect if missing required params from previous step
  if (!params.pick || !params.drop || !params.pickRef || !params.dropRef) {
    redirect("/car/questions/location")
  }

  return <VehicleForm initialParams={params} />
}
