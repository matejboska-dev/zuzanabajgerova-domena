"use client"

import * as React from "react"
import PolaroidLineCarousel, { type Slide } from "@/components/ui/polaroid-line-carousel"

/**
 * All videos and images from Google Drive folder:
 * 1wXuwxBaJx-MNfhiIhXS-8xhBfNeq-ZfQ (2_Reference_Recenze)
 */
export const DRIVE_REFERENCE_SLIDES: Slide[] = [
  {
    image: "/media/ref-petra.webp",
    title: "Petra Chelíková",
    caption: "Bydlení u moře · Videoreference klientky",
    alt: "Petra Chelíková — videoreference o koupi bydlení u moře v Abruzzu",
    video: "/media/ref-petra.mp4",
    badge: "Video",
  },
  {
    image: "/media/ref-lucie.webp",
    title: "Lucie B.",
    caption: "Koupě v Abruzzu · Klientka o spolupráci",
    alt: "Lucie B. — videoreference o koupi v Abruzzu",
    video: "/media/ref-lucie.mp4",
    badge: "Video",
  },
  {
    image: "/media/ref-lucie-syn.webp",
    title: "Rodina v Abruzzu",
    caption: "Syn klientky Lucie na pláži v Montesilvanu",
    alt: "Syn klientky Lucie na pláži v Abruzzu",
    video: "/media/ref-lucie-syn.mp4",
    badge: "Video",
  },
  {
    image: "/media/ref-dominika.webp",
    title: "Dominika D.",
    caption: "Koupě v Abruzzu · Spolehlivost a klid při výběru",
    alt: "Dominika D. — videoreference z Abruzza",
    video: "/media/ref-dominika.mp4",
    badge: "Video",
  },
  {
    image: "/media/ref-irma.webp",
    title: "Irma K.",
    caption: "Koupě a rekonstrukce · Proměna nemovitosti na klíč",
    alt: "Irma K. — videoreference o koupi a rekonstrukci",
    video: "/media/ref-irma.mp4",
    badge: "Video",
  },
  {
    image: "/media/ref-zuzana-povsikova.webp",
    title: "Zuzana P.",
    caption: "Při prohlídce nemovitosti · Osobní provázení",
    alt: "Zuzana P. — videoreference při prohlídce",
    video: "/media/ref-zuzana-povsikova.mp4",
    badge: "Video",
  },
  {
    image: "/media/ref-od-klientu.webp",
    title: "Oslava s rodinou",
    caption: "Přípitek klientů na nové bydlení v Abruzzu",
    alt: "Reference od klientů — rodinná oslava nového domova",
    video: "/media/ref-od-klientu.mp4",
    badge: "Video",
  },
  {
    image: "/media/ref-img-6821.webp",
    title: "Oběd u moře",
    caption: "Společné setkání a oběd s klientkou na pláži",
    alt: "Setkání s klientkou v restauraci u moře",
    video: "/media/ref-img-6821.mp4",
    badge: "Video",
  },
  {
    image: "/media/loop-klientka-more.webp",
    title: "Splněný sen",
    caption: "Klientka šťastná, že má svůj domov u moře",
    alt: "Šťastná klientka v moři v Abruzzu",
    video: "/media/loop-klientka-more.mp4",
    badge: "Video",
  },
  {
    image: "/media/kom-scanno.webp",
    title: "Lago di Scanno",
    caption: "Výlet s klienty k jezeru ve tvaru srdce v horách",
    alt: "Výlet s klienty k jezeru Lago di Scanno",
    badge: "Foto",
  },
  {
    image: "/media/loop-letadlo.webp",
    title: "Přílet do Pescary",
    caption: "Přímé lety z Prahy a Krakova, letiště 15 min od moře",
    alt: "Přílet letadlem na letiště v Pescaře",
    video: "/media/loop-letadlo.mp4",
    badge: "Video",
  },
  {
    image: "/media/zuzana-convention.webp",
    title: "RE/MAX Convention",
    caption: "Zuzana na mezinárodní RE/MAX konferenci",
    alt: "Zuzana na ocenění RE/MAX Convention",
    video: "/media/zuzana-convention.mp4",
    badge: "Video",
  },
  {
    image: "/video/referencni-video-poster.jpg",
    title: "Zuzana Bajgerová",
    caption: "Osobní představení a jak pracujeme s klienty v Abruzzu",
    alt: "Zuzana Bajgerová — představení klientského servisu",
    video: "/video/referencni-video.mp4",
    badge: "Video",
  },
]

export default function ReferenceVideoCarousel() {
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
