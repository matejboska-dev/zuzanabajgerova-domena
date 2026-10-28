"use client";

import { localized } from '@/lib/localize';


import * as React from "react"
import PolaroidLineCarousel from "@/components/ui/polaroid-line-carousel"
import { DRIVE_REFERENCE_SLIDES } from "@/lib/reference-slides"


function ReferenceVideoCarousel() {
  return (
    <div className="vrefs-carousel-wrapper">
      <PolaroidLineCarousel
        slides={DRIVE_REFERENCE_SLIDES}
        height="clamp(500px, 68vh, 580px)"
        cardWidth={260}
        sag={42}
        swing={1}
        autoplay={5000}
        background="transparent"
        ink="var(--cobalto, #122b4e)"
        string="#8a7f72"
        ariaLabel="Videoreference a momenty klientů v Abruzzu"
      />
    </div>
  )
}

export default localized(ReferenceVideoCarousel);
