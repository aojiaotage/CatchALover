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
    let lover = new Lover()
    it('runing consumes stamina by 10 per time', () => {
      expect(lover.run).to.decrease(lover, 'stamina')
    })
    it('runing consumes stamina but stamina can never fall over 0', () => {
      for (let i = 0; i < 100; i++) {
        lover.run()
      }
      expect(lover.stamina).to.be.above(0)
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
})
