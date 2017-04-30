const expect = require('chai').expect
const Lover = require('../../models/lover')

describe('models/lover.js', () => {
  describe('#constructor()', () => {
    let lover = new Lover()

    it('expect lover to have properties of health, clothed, stamina and speed of right type', () => {
      expect(lover.health).to.be.a('number')
      expect(lover.stamina).to.be.a('number')
      expect(lover.clothed).to.be.a('boolean')
      expect(lover.speed).to.be.a('number')
    })

    it('expect a lover can run', () => {
      expect(lover.run).to.be.a('function')
    })

    it('expect a lover can hide', () => {
      expect(lover.hide).to.be.a('function')
    })

    it('expect a lover can clothing up', () => {
      expect(lover.clothingUp).to.be.a('function')
    })
  })
  describe('#run()', () => {
    let lover = null
    beforeEach(() => {
      lover = new Lover()
    })
    it('runing consumes stamina by 10 per time', () => {
      let stamina = lover.stamina
      lover.run()
      expect(lover.stamina).to.eql(stamina - 10)
    })
    it('runing consumes stamina but stamina can never fall over 0', () => {
      for (let i = 0; i < 100; i++) {
        lover.run()
      }
      expect(lover.stamina).to.be.at.least(0)
    })
    it('running makes the speed increase to 20', () => {
      lover.run()
      expect(lover.speed).to.eql(20)
    })
    it('running at zero stamina makes the speed decrease to 0', () => {
      for (let i = 0; i < 100; i++) {
        lover.run()
      }
      expect(lover.speed).to.eql(0)
    })
  })
  describe('#walk()', () => {
    let lover = null
    beforeEach(() => {
      lover = new Lover()
      for (let i = 0; i < 100; i++) {
        lover.run()
      }
    })
    it('walking restores stamina by 5 per time', () => {
      let stamina = lover.stamina
      lover.walk()
      expect(lover.stamina).to.eql(stamina + 5)
    })
    it('walking restores stamina but stamina can never go over 100', () => {
      for (let i = 0; i < 100; i++) {
        lover.walk()
      }
      expect(lover.stamina).to.be.at.most(100)
    })
    it('walking makes the speed back to 10', () => {
      lover.walk()
      expect(lover.speed).to.eql(10)
    })
    it('walking at 100 stamina keeps speed & stamina the same', () => {
      lover = new Lover()
      let stamina = lover.stamina
      let speed = lover.speed
      lover.walk()
      expect(lover.speed).eql(speed)
      expect(lover.stamina).eql(stamina)
    })
  })
  describe('#hide()', () => {
    let lover = null
    beforeEach(() => {
      lover = new Lover()
    })
    it('lover finds a place to hide, if there is any, toggle hidden status', () => {
      let stubSceneService = {
        hide () {
          return true
        }
      }
      lover.hide(stubSceneService)
      expect(lover.hidden).eql(true)
    })
    it('lover finds a place to hide, if there is not any, he might not hide', () => {
      let stubSceneService = {
        hide () {
          return false
        }
      }
      lover.hide(stubSceneService)
      expect(lover.hidden).eql(false)
    })
  })
})
