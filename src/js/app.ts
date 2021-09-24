import * as THREE from 'three'
import { Card } from './card'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class App {
  readonly renderer: THREE.WebGLRenderer
  readonly canvas: HTMLCanvasElement
  readonly camera: THREE.PerspectiveCamera
  readonly scene: THREE.Scene
  readonly light: THREE.DirectionalLight
  readonly controls: OrbitControls
  card?: Card

  constructor (canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5)
    this.light = new THREE.DirectionalLight(0xffffff)
    this.scene = new THREE.Scene()
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.configure()
  }

  render (): void {
    this.renderer.render(this.scene, this.camera)
  }

  private configure (): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.autoClearColor = false
    this.light.position.set(-1, 2, 4).normalize()
    this.camera.position.set(0, 0, 3)
    this.scene.add(this.light)

    this.setBackground()
    this.setControls()
    this.createCard()
  }

  private setBackground (): void {
    const loader = new THREE.CubeTextureLoader()
    const texture = loader.load([
      require('../img/pos-x.jpg'),
      require('../img/neg-x.jpg'),
      require('../img/pos-y.jpg'),
      require('../img/neg-y.jpg'),
      require('../img/pos-z.jpg'),
      require('../img/neg-z.jpg')
    ])
    this.scene.background = texture
  }

  private setControls (): void {
    this.controls.target.set(0, 0, 0)
    this.controls.update()
  }

  private createCard (): void {
    this.card = new Card()

    this.scene.add(this.card.cube)
  }

  animate (): void {
    const animatefn = (): void => {
      this.card?.animate()
      requestAnimationFrame(animatefn)

      this.renderer.render(this.scene, this.camera)
    }

    animatefn()
  }
}
