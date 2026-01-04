import { redirect } from "next/navigation"
import { VehicleForm } from "./vehicle-form"

interface Props {
  searchParams: Promise<{
    pick?: string
    pickRef?: string
    drop?: string
    dropRef?: string
    make?: string
    model?: string
    age?: string
    drive?: string
  }>
}

export default async function VehicleStep({ searchParams }: Props) {
  const params = await searchParams

  // Redirect if missing required params from previous step
  if (!params.pick || !params.drop || !params.pickRef || !params.dropRef) {
    redirect("/car/questions/location")
  }

  return <VehicleForm initialParams={params} />
}
