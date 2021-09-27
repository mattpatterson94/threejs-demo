import * as THREE from 'three'
import React, { ReactElement } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTFResult } from './Draco'
import draco from '../../3d/draco.glb'

type GroupProps = JSX.IntrinsicElements['group']

interface ILabel extends GroupProps {
  texture: THREE.Texture
  offset?: [number, number]
  repeat?: [number, number]
}

export default function Label ({ texture, offset = [-1, -1], repeat = [2, 2], ...props }: ILabel): ReactElement {
  const { nodes } = useGLTF(draco) as GLTFResult
  texture.offset.set(...offset)
  texture.repeat.set(...repeat)
  return (
    <group {...props}>
      <mesh geometry={nodes.aesop_GLBC001.geometry}>
        <meshStandardMaterial attach="material" map={texture} transparent side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={nodes.aesop_GLBC001.geometry} rotation-z={3.1}>
        <meshStandardMaterial attach="material" map={texture} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
