import { App } from './src/js/app'

const canvas = document.getElementById('root') as HTMLCanvasElement

const app = new App(canvas)

app.render()
app.animate()
