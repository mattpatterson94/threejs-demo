import { App } from './src/js/app'

const element = document.getElementById('root') ?? document.body

const app = new App(element)

app.render()
app.createCard()
app.animate()
