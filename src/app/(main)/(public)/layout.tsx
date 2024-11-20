import React from 'react'
import PublicGuard from '../(public)/guard/guard' ;

export default function Publiclayout(
    {children }:{ children: React.ReactNode; }
) {
  return (
    <PublicGuard>{children}</PublicGuard>
  )
}