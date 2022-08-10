const canvas = document.getElementById("canvas1")
console.log(canvas)
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
ctx.fillStyle = "white"

class Ball {
  constructor(effect) {
    this.effect = effect
    this.x = this.effect.width * 0.5
    this.y = this.effect.height * 0.5
    this.radius = Math.random() * 60 + 20
    this.speedX = Math.random() - 0.5
    this.speedY = Math.random() - 0.5
  }
  update() {
    if (this.x < this.radius || this.x > this.effect.width - this.radius)
      this.speedX *= -1
    if (this.y < this.radius || this.y > this.effect.height - this.radius)
      this.speedY *= -1

    this.x += this.speedX
    this.y += this.speedY
  }

  draw(context) {
    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)

    context.fill()
  }
  reset() {
    this.x = this.effect.width * 0.5
    this.y = this.effect.height * 0.5
  }
}

class MetaballEffect {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.metaballsArray = []
  }
  init(numberOfBalls) {
    for (let i = 0; i < numberOfBalls; i++) {
      this.metaballsArray.push(new Ball(this))
    }
  }
  update() {
    this.metaballsArray.forEach((metaball) => {
      metaball.update()
    })
  }

  draw(context) {
    this.metaballsArray.forEach((metaball) => {
      metaball.draw(context)
    })
  }

  reset(newWindth, newHeight) {
    this.width = newWindth
    this.height = newHeight
    this.metaballsArray.forEach((metaball) => {
      metaball.reset()
    })
  }
}

const effect = new MetaballEffect(canvas.width, canvas.height)
effect.init(20)
console.log(effect)

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  effect.update()
  effect.draw(ctx)
  requestAnimationFrame(animate)
}

animate()

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.fillStyle = "white"
  effect.reset(canvas.width, canvas.height)
})
