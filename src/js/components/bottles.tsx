import * as THREE from 'three'
import React, { useRef, ReactElement } from 'react'
import { useLoader } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { GLTFResult } from '../objects/Draco'
import Bottle from '../objects/Bottle'
import Label from '../objects/Label'
import draco from '../../3d/draco.glb'

export default function Bottles (props: JSX.IntrinsicElements['group']): ReactElement {
  const group = useRef()
  const { nodes } = useGLTF(draco) as GLTFResult
  const [a, b] = useLoader(THREE.TextureLoader, [require('../../img/aesop_GFT_d.jpg'), require('../../img/aesop_PSFC_d.jpg')])
  return (
    <group ref={group} {...props} dispose={null} scale={[0.01, 0.01, 0.01]}>
      <Bottle initial={-30} position={[140, 0, 0]} glass="Untitled018" cap="Untitled018_1" liquid="Untitled018_2">
        <Label texture={b} offset={[-1.05, -0.2]} repeat={[2, 0.8]} scale={[0.7, 0.7, 0.25]} position={[0, 0, -5]} />
      </Bottle>
      <Bottle initial={-40} position={[80, 0, 0]} glass="Untitled078" cap="Untitled078_1" liquid="Untitled078_2">
        <Label texture={b} scale={[0.64, 0.64, 0.64]} position={[0, 0, -2]} />
      </Bottle>
      <Bottle initial={-50} position={[-2, 0, 0]} glass="Untitled064" cap="Untitled064_1" liquid="Untitled064_3">
        <mesh name="straw" geometry={nodes.Untitled064_2.geometry}>
          <meshStandardMaterial attach="material" color="black" />
        </mesh>
        <Label texture={a} scale={[1.01, 1.01, 1.01]} />
      </Bottle>
      <Bottle initial={-40} position={[-90, 0, 0]} glass="Untitled052" cap="Untitled052_1" liquid="Untitled052_2">
        <Label texture={a} scale={[0.78, 0.78, 0.78]} position={[0, 0, -5]} />
      </Bottle>
      <Bottle initial={-30} position={[-140, 0, 0]} glass="Untitled072" cap="Untitled072_1" liquid="Untitled072_2">
        <Label texture={b} scale={[0.275, 0.275, 0.6]} position={[0, 0, 8]} />
      </Bottle>
      <Bottle initial={-20} position={[-180, 0, 0]} glass="Untitled007" cap="Untitled007_1" liquid="Untitled007_2">
        <Label texture={a} scale={[0.53, 0.53, 0.53]} position={[0, 0, -5]} />
      </Bottle>
    </group>
  )
}
