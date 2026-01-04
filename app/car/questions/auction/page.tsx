import { redirect } from "next/navigation"
import { AuctionForm } from "./auction-form"

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
  }>
}

export default async function AuctionStep({ searchParams }: Props) {
  const params = await searchParams

  // Redirect if missing required params from previous steps
  if (!params.pick || !params.drop || !params.make || !params.model || !params.age || !params.drive) {
    redirect("/car/questions/location")
  }

  return <AuctionForm initialParams={params} />
}
