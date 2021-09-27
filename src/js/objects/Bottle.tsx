import * as THREE from 'three'
import React, { useRef, useState, useEffect, ReactElement } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { GLTFResult } from './Draco'
import draco from '../../3d/draco.glb'
import { material } from '../store'

type GroupProps = JSX.IntrinsicElements['group']

interface IBottle extends GroupProps {
  initial: number
  glass: keyof GLTFResult['nodes']
  cap: keyof GLTFResult['nodes']
  liquid: keyof GLTFResult['nodes']
}

const hoveredCursor =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjY2xpcDApIj48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIyNi41IiBmaWxsPSJibGFjayIgc3Ryb2tlPSJibGFjayIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzIgMzJMMzIgNDVIMzNMMzMgMzJINDVWMzFIMzNWMTlIMzJWMzFIMTlWMzJIMzJaIiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik0xLjk2MjMxIDEuOTYyMzFMMTMuNzAzMyA1LjEwODI5TDUuMTA4MjkgMTMuNzAzM0wxLjk2MjMxIDEuOTYyMzFaIiBmaWxsPSJibGFjayIvPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9ImNsaXAwIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IndoaXRlIi8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+'
const defaultCursor =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjY2xpcDApIj48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIyNi41IiBzdHJva2U9ImJsYWNrIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMiAzMkw0MS4xOTI0IDQxLjE5MjRMNDEuODk5NSA0MC40ODUzTDMyLjcwNzEgMzEuMjkyOUw0MS4xOTI0IDIyLjgwNzZMNDAuNDg1MyAyMi4xMDA1TDMyIDMwLjU4NThMMjMuNTE0NyAyMi4xMDA1TDIyLjgwNzYgMjIuODA3NkwzMS4yOTI5IDMxLjI5MjlMMjIuMTAwNSA0MC40ODUzTDIyLjgwNzYgNDEuMTkyNEwzMiAzMloiIGZpbGw9ImJsYWNrIi8+PHBhdGggZD0iTTUuMzY3MTEgMTIuNzM3M0wyLjY2OTQyIDIuNjY5NDJMMTIuNzM3MyA1LjM2NzExTDUuMzY3MTEgMTIuNzM3M1oiIHN0cm9rZT0iYmxhY2siLz48L2c+PGRlZnM+PGNsaXBQYXRoIGlkPSJjbGlwMCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSJ3aGl0ZSIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPg=='

export default function Bottle ({ initial, glass, cap, liquid, children, ...props }: IBottle): ReactElement {
  const ref = useRef<THREE.Mesh>(null!)
  const { nodes } = useGLTF(draco) as GLTFResult
  const [hovered, set] = useState(false)
  useEffect(
    () => {
      document.body.style.cursor = hovered ? `url('${hoveredCursor}'), pointer` : `url('${defaultCursor}'), auto`
    },
    [hovered]
  )
  useFrame(() => {
    ref.current.position.z = THREE.MathUtils.lerp(
      ref.current.position.z,
      hovered ? -15 : 0,
      0.075 - Math.abs(initial) / 2000
    )
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, hovered ? -0.5 : 0, 0.075)
  })

  return (
    <group
      rotation={[Math.PI / 2, 0, 3]}
      {...props}
      onPointerOver={(e) => { e.stopPropagation(); set(true) }}
      onPointerOut={() => set(false)}>
      <group position-z={initial * 5} ref={ref}>
        {children}
        <mesh geometry={nodes[glass].geometry} material={material.inner} />
        <mesh geometry={nodes[liquid].geometry} material={material.liquid} />
        <mesh geometry={nodes[glass].geometry} material={material.outer} castShadow />
        <mesh geometry={nodes[cap].geometry} material={material.cap} material-color="black" material-roughness={1} />
      </group>
    </group>
  )
}
