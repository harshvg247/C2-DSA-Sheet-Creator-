import React from 'react'
import { BeatLoader } from 'react-spinners'
function BeatLoaderComponent() {
  return (
    <BeatLoader
        color='#FCFCFC'
        // loading={loading}
        // cssOverride={override}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  )
}

export default BeatLoaderComponent