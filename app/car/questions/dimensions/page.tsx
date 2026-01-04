import { redirect } from "next/navigation"
import { DimensionsForm } from "./dimensions-form"

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
    auction?: string
    salvage?: string
    carLength?: string
    carHeight?: string
    carClearance?: string
    carValue?: string
  }>
}

export default async function DimensionsStep({ searchParams }: Props) {
  const params = await searchParams

  // Redirect if missing required params from previous steps
  if (!params.pick || !params.drop || !params.make || !params.model || !params.age || !params.drive || !params.auction) {
    redirect("/car/questions/location")
  }

  return <DimensionsForm initialParams={params} />
}
