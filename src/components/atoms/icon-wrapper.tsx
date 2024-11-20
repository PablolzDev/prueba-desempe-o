import { ReactNode } from "react"

interface IconWrapperProps {
  children: ReactNode
}

export function IconWrapper({ children }: IconWrapperProps) {
  return (
    <div className="mx-auto w-12 h-12  flex items-center justify-center">
      {children}
    </div>
  )
}