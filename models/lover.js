class Lover {
  constructor () {
    this.health = 100
    this.clothed = false
    this.stamina = 100
    this.speed = 10
    this.hidden = false
  }

  walk () {
    if (this.stamina < 100) {
      this.stamina += 5
    }
    this.speed = 10
  }

  run () {
    if (this.stamina > 0) {
      this.speed = 20
      this.stamina -= 10
    } else {
      this.speed = 0
    }
  }

  clothingUp () {

  }

  hide (sceneService) {
    this.hidden = sceneService.hide(this)
  }
}

module.exports = Lover
