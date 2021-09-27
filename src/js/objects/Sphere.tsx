import React, { ReactElement } from 'react'
import { geometry, material } from '../store'

export default function Sphere (props: JSX.IntrinsicElements['mesh']): ReactElement {
  return (
    <mesh
      receiveShadow
      castShadow
      {...props}
      renderOrder={-2000000}
      geometry={geometry.sphere}
      material={material.sphere}
    />
  )
}
