import * as THREE from 'three'
import React, { ReactElement, useRef } from 'react'
import Bottles from './bottles'
import Picnic from '../objects/Picnic'
import Cake from '../objects/Cake'

export default function PicnicTable (props: JSX.IntrinsicElements['group']): ReactElement {
  const group = useRef<THREE.Mesh>(null!)

  return (
    <group ref={group} {...props}>
      <Bottles position={[10, 8.7, 20]} />
      <Picnic position={[0, 0, 10]} scale={[10, 10, 10]} rotation={[0, 20, 0]}>
        <Cake
          scale={[0.01, 0.01, 0.01]}
          position={[-0.2, 0.86, 0.5]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </Picnic>
    </group>
  )
}
