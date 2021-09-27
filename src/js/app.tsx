import * as THREE from 'three'
import React, { Fragment, ReactElement, Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Reflector, Environment, Loader } from '@react-three/drei'
import Spheres from './components/spheres'
import PicnicTable from './components/picnic-table'

function Zoom (): null {
  const vec = new THREE.Vector3(0, 0, 100)

  return useFrame((state) => {
    state.camera.position.lerp(vec, 0.075)
    if (!(state.camera instanceof THREE.OrthographicCamera)) {
      state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 20, 0.075)
    }
    state.camera.lookAt(0, 0, 0)
    state.camera.updateProjectionMatrix()
  })
}

export default function App (): ReactElement {
  return (
    <Fragment>
      <Canvas dpr={[1, 1.5]} mode={'concurrent'} shadows camera={{ position: [-500, 0, 90], fov: 100 }}>
        <fog attach="fog" args={['#87CEEB', 100, 150]} />
        <color attach="background" args={['#87CEEB']} />
        <spotLight
          penumbra={1}
          angle={0.35}
          castShadow
          position={[40, 80, 0]}
          intensity={1.5}
          shadow-mapSize-width={256}
          shadow-mapSize-height={256}
        />
        <pointLight position={[10, -10, 5]} intensity={1} color="#009A17" />
        <Suspense fallback={null}>
          <group position={[0, -12, 0]}>
            <PicnicTable />
            <Spheres />
            <mesh
              rotation-x={-Math.PI / 2}
              position={[0, 0.01, 0]}
              scale={[200, 200, 200]}
              receiveShadow
              renderOrder={100000}>
              <planeBufferGeometry attach="geometry" />
              <shadowMaterial attach="material" transparent color="#251005" opacity={0.2} />
            </mesh>
            <Reflector
              resolution={1024}
              mirror={0}
              blur={[500, 100]}
              mixBlur={1}
              mixStrength={2}
              depthScale={0.5}
              minDepthThreshold={0.8}
              maxDepthThreshold={1}
              rotation-x={-Math.PI / 2}
              args={[100, 100]}>
              {(Material, props) => <Material {...props} color="#009A17" metalness={0} roughness={0.5} />}
            </Reflector>
          </group>
          <Environment preset="apartment" />
          <Zoom />
        </Suspense>
      </Canvas>
      <Loader />
    </Fragment>
  )
}
