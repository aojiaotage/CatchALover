const superagent = require('superagent')

class Dog {
  constructor () {
    this.speed = 30
    this.found = false
  }

  bark () {
  }

  sniff (sceneService, cb) {
    superagent
      .get('http://localhost:9200')
      .end((err, res) => {
        if (err) {
          this.found = sceneService.onSniffing(this)
          cb(null)
        }
        cb(new Error('error'))
      })
  }
}

module.exports = Dog
