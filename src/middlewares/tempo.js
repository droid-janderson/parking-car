"use strict"
var hh = 0
var mm = 0
var ss = 0

var mile = 1000
var cron
var format

class Time {
  constructor(time) {
    this.time = time
  }
  
  iniciar() {
    cron = setInterval(() => this.tempo(), mile)
  }
  
  parar() {
    clearInterval(cron)
    hh = 0
    mm = 0
    ss = 0
  
    return tempo()
  }
  
  tempo() {
    ss++
    if (ss == 60) {
      ss = 0
      mm++
      if (mm == 60) {
        mm = 0
        hh++
      }
    }
    format = `${(hh < 10 ? '0' + hh : hh)}:${(mm < 10 ? '0' + mm : mm)}:${(ss < 10 ? '0' + ss : ss)}`
  
    return format
  }

}

module.exports = Time