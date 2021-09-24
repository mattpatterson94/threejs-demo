import * as THREE from 'three'

export class Card {
  readonly cube: THREE.Mesh

  constructor () {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshPhongMaterial({ color: 0xB4D9EF })
    this.cube = new THREE.Mesh(geometry, material)
  }

  animate (): void {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    this.cube.rotation.x += 0.01
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    this.cube.rotation.y += 0.01
  }
}
