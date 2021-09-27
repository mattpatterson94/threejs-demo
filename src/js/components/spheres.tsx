import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import React, { ReactElement, useRef } from 'react'
import Sphere from '../objects/Sphere'

export default function Spheres (): ReactElement {
  const group = useRef<THREE.Mesh>(null!)

  useFrame(() => {
    group.current.children[0].position.x = THREE.MathUtils.lerp(group.current.children[0].position.x, -18, 0.02)
    group.current.children[1].position.x = THREE.MathUtils.lerp(group.current.children[1].position.x, -10, 0.01)
    group.current.children[2].position.x = THREE.MathUtils.lerp(group.current.children[2].position.x, 19, 0.03)
    group.current.children[3].position.x = THREE.MathUtils.lerp(group.current.children[3].position.x, 10, 0.04)
  })

  return (
    <group ref={group}>
      <Sphere position={[-40, 1, 10]} />
      <Sphere position={[-20, 10, -20]} scale={[10, 10, 10]} />
      <Sphere position={[40, 3, 5]} scale={[3, 3, 3]} />
      <Sphere position={[30, 0.75, 10]} scale={[0.75, 0.75, 0.75]} />
    </group>
  )
}
