import { redirect } from "next/navigation"
import { ContactForm } from "./contact-form"
import { StepHeader } from "../_components/step-header"
import { carSteps, totalSteps } from "@/data/car-questions-flow"

const stepConfig = carSteps[4] // contact step

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

export default async function ContactStep({ searchParams }: Props) {
  const params = await searchParams

  // Redirect if missing required params from previous steps
  if (!params.pick || !params.drop || !params.make || !params.model || !params.age || !params.drive || !params.auction) {
    redirect("/car/questions/location")
  }

  const buildBackHref = () => {
    const urlParams = new URLSearchParams()
    if (params.pick) urlParams.set("pick", params.pick)
    if (params.pickRef) urlParams.set("pickRef", params.pickRef)
    if (params.drop) urlParams.set("drop", params.drop)
    if (params.dropRef) urlParams.set("dropRef", params.dropRef)
    if (params.make) urlParams.set("make", params.make)
    if (params.model) urlParams.set("model", params.model)
    if (params.age) urlParams.set("age", params.age)
    if (params.drive) urlParams.set("drive", params.drive)
    if (params.auction) urlParams.set("auction", params.auction)
    if (params.salvage) urlParams.set("salvage", params.salvage)
    if (params.carLength) urlParams.set("carLength", params.carLength)
    if (params.carHeight) urlParams.set("carHeight", params.carHeight)
    if (params.carClearance) urlParams.set("carClearance", params.carClearance)
    if (params.carValue) urlParams.set("carValue", params.carValue)
    return `/car/questions/dimensions?${urlParams.toString()}`
  }

  return (
    <>
      <StepHeader
        stepNumber={5}
        totalSteps={totalSteps}
        title={stepConfig.title}
        description={stepConfig.description}
        backHref={buildBackHref()}
        progress={stepConfig.progress}
      />
      <ContactForm initialParams={params} />
    </>
  )
}
