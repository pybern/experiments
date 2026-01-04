import { redirect } from "next/navigation"
import { AuctionForm } from "./auction-form"

interface Props {
  searchParams: Promise<Record<string, string | undefined>>
}

export default async function AuctionStep({ searchParams }: Props) {
  const params = await searchParams

  // Redirect if missing required params from previous steps
  if (!params.pick || !params.drop || !params.make || !params.model || !params.age || !params.drive) {
    redirect("/car/questions/location")
  }

  return <AuctionForm initialParams={params} />
}
