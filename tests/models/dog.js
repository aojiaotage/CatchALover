const Dog = require('../../models/dog')
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')

let agent = {
  legalUrl: false,
  get (url) {
    if (url === 'http://localhost:9200') {
      this.legalUrl = true
    }
  },
  end (cb) {
    if (this.legalUrl) {
      cb(null, 'ok')
    } else {
      cb(new Error('illegal url!'))
    }
  }
}

describe('models/dog', () => {
  describe('#constructor()', () => {
    it('expect a dog to have a speed of 30', () => {
      const dog = new Dog()
      expect(dog.speed).eql(30)
    })
  })
  describe('#sniff()', () => {
    let dog = new Dog()
    it('a dog finds if there is a lover in a scene service', (done) => {
      let spy = sinon.spy()
      let sceneService = {
        onSniffing: spy
      }
      dog.sniff(sceneService, (err) => {
        if (err) {
          done(err)
        }
        expect(spy.called).eql(true)
        done()
      })
    })
    it('a dog finds if there is a lover in a scene service, if any, found should be marked true', () => {
      let sceneService = {
        onSniffing (dog) {
          return true
        }
      }
      dog.sniff(sceneService)
      expect(dog.found).eql(true)
    })
    it('a dog finds if there is a lover in a scene service, if none, found should be marked false', () => {
      let sceneService = {
        onSniffing (dog) {
          return false
        }
      }
      dog.sniff(sceneService)
      expect(dog.found).eql(false)
    })
  })
})
