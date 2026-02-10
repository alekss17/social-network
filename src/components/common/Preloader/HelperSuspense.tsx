import React from "react"
import Preloader from "./Prelooader"

type HelperSuspenseProps = {
  Component: React.ComponentType
}

const HelperSuspense = ({ Component }: HelperSuspenseProps) => {
  return (
    <React.Suspense fallback={""}>
      <Component />
    </React.Suspense>
  )
}

export default HelperSuspense
