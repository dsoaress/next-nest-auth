import { ReactNode } from 'react'

import { useCan } from '@/hooks/useCan'
import { Role } from '@/types/Role'

type CanProps = {
  children: ReactNode
  roles: Role[]
}

export function Can({ children, roles }: CanProps) {
  const userCanSeeComponents = useCan({ roles })

  if (!userCanSeeComponents) {
    return null
  }

  return <>{children}</>
}
