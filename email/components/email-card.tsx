import * as React from "react"

import { Section, type SectionProps } from "react-email"

type EmailCardProps = SectionProps & {
  children: React.ReactNode
}

export function EmailCard({ children, style, ...props }: EmailCardProps) {
  return (
    <Section
      {...props}
      style={{
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </Section>
  )
}
