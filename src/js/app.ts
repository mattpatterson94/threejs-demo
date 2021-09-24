import * as THREE from 'three'

class Card {
  readonly cube: THREE.Mesh

  constructor () {
    const geometry = new THREE.BoxGeometry(2, 2, 2)
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

export class App {
  readonly element: HTMLElement
  readonly renderer: THREE.WebGLRenderer
  readonly camera: THREE.PerspectiveCamera
  readonly scene: THREE.Scene
  readonly light: THREE.DirectionalLight
  card?: Card

  constructor (element: HTMLElement) {
    this.element = element
    this.renderer = new THREE.WebGLRenderer()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.light = new THREE.DirectionalLight(0xffffff)
    this.scene = new THREE.Scene()
  }

  createCard (): void {
    this.card = new Card()

    this.light.position.set(0, 1, 1).normalize()
    this.scene.add(this.light)
    this.scene.add(this.card.cube)

    this.camera.position.z = 5
  }

  render (): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.element.appendChild(this.renderer.domElement)
  }

  animate (): void {
    const animateFn = (): void => {
      requestAnimationFrame(animateFn)
      this.card?.animate()
      this.renderer.render(this.scene, this.camera)
    }

    animateFn()
  }
}
