import { redirect } from "next/navigation"
import { ContactForm } from "./contact-form"

interface Props {
  searchParams: Promise<Record<string, string | undefined>>
}

export default async function ContactStep({ searchParams }: Props) {
  const params = await searchParams

  // Redirect if missing required params from previous steps
  if (!params.pick || !params.drop || !params.make || !params.model || !params.age || !params.drive || !params.auction) {
    redirect("/car/questions/location")
  }

  return <ContactForm initialParams={params} />
}
