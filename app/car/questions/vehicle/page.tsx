import { redirect } from "next/navigation"
import { VehicleForm } from "./vehicle-form"
import { StepHeader } from "../_components/step-header"
import { carSteps, totalSteps } from "@/data/car-questions-flow"

const stepConfig = carSteps[1] // vehicle step

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

  const buildBackHref = () => {
    const urlParams = new URLSearchParams()
    if (params.pick) urlParams.set("pick", params.pick)
    if (params.pickRef) urlParams.set("pickRef", params.pickRef)
    if (params.drop) urlParams.set("drop", params.drop)
    if (params.dropRef) urlParams.set("dropRef", params.dropRef)
    return `/car/questions/location?${urlParams.toString()}`
  }

  return (
    <>
      <StepHeader
        stepNumber={2}
        totalSteps={totalSteps}
        title={stepConfig.title}
        description={stepConfig.description}
        backHref={buildBackHref()}
        progress={stepConfig.progress}
      />
      <VehicleForm initialParams={params} />
    </>
  )
}
