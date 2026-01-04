import { LocationForm } from "./location-form"
import { StepHeader } from "../_components/step-header"
import { carSteps, totalSteps } from "@/data/car-questions-flow"

const stepConfig = carSteps[0] // location step

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

  return (
    <>
      <StepHeader
        stepNumber={1}
        totalSteps={totalSteps}
        title={stepConfig.title}
        description={stepConfig.description}
        backHref="/grid"
        progress={stepConfig.progress}
      />
      <LocationForm initialParams={params} />
    </>
  )
}
