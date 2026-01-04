import { redirect } from "next/navigation"
import { AuctionForm } from "./auction-form"
import { StepHeader } from "../_components/step-header"
import { carSteps, totalSteps } from "@/data/car-questions-flow"

const stepConfig = carSteps[2] // auction step

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
    return `/car/questions/vehicle?${urlParams.toString()}`
  }

  return (
    <>
      <StepHeader
        stepNumber={3}
        totalSteps={totalSteps}
        title={stepConfig.title}
        description={stepConfig.description}
        backHref={buildBackHref()}
        progress={stepConfig.progress}
      />
      <AuctionForm initialParams={params} />
    </>
  )
}
