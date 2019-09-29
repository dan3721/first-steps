/**
 * Demo driver code for a AP-68 Stepper motor.
 *
 * Usage: sudo node steps DEGREES STEPPING_MODE(full|half) DELAY_IN_MILLIS, REVERSE(true|false)
 *
 * AP-68 Specs
 *
 * Description      Brass sleeve bearings
 * Voltage Rating   12V
 * Phases           4
 * Resistance       33Ω
 * Number of Leads  6
 * Step Angle       1.8°
 * Size             68 Dia, 25 L [mm] (with shaft)
 * Shaft            6 dia, 10 L [mm]
 * Weight           177 Grams
 *
 */
const Gpio = require('pigpio').Gpio

const phase_1a = new Gpio(17, {mode: Gpio.OUTPUT})
const phase_1b = new Gpio(18, {mode: Gpio.OUTPUT})
const phase_2a = new Gpio(22, {mode: Gpio.OUTPUT})
const phase_2b = new Gpio(23, {mode: Gpio.OUTPUT})

const STEPPING_MODES = {
  full: {
    degreesPerStep: 1.8,
    sequence: [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ],

  },
  half: {
    degreesPerStep: 0.9,
    sequence: [
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 1],
      [0, 0, 0, 1],
      [1, 0, 0, 1],
    ],
  },
}

let _currentStep = -1

function getNextStep (stepping, reverse) {

  _currentStep = reverse ? _currentStep - 1 : _currentStep + 1

  // wrap if we stepped out of bounds
  if (reverse) {
    if (_currentStep < 0) {
      _currentStep = stepping.sequence.length - 1
    }
  }
  else {
    if (_currentStep === stepping.sequence.length) {
      _currentStep = 0
    }
  }

  return stepping.sequence[_currentStep]
}

function step (stepping, reverse) {
  const STEP = getNextStep(stepping, reverse)
  phase_1a.digitalWrite(STEP[0])
  phase_1b.digitalWrite(STEP[1])
  phase_2a.digitalWrite(STEP[2])
  phase_2b.digitalWrite(STEP[3])
}

function stop () {
  phase_1a.digitalWrite(0)
  phase_1b.digitalWrite(0)
  phase_2a.digitalWrite(0)
  phase_2b.digitalWrite(0)
}

function rotate (degrees, steppingMode, delayInMillis, reverse) {

  const stepping = STEPPING_MODES[steppingMode]

  const numSteps = Math.round(degrees / stepping.degreesPerStep)
  console.log(
    'Rotating ' + (reverse ? '-' : '') +
    `${degrees}° which is ${numSteps} steps in stepping mode ${steppingMode} with a step delay of ${delayInMillis} milliseconds.`)

  let stepsTaken = 0
  let intervalId = setInterval(() => {
    if (stepsTaken < numSteps) {
      step(stepping, reverse)
      stepsTaken++
    }
    else {
      clearInterval(intervalId)
      stop()
      console.log('done')
    }
  }, delayInMillis)

}

if (process.argv.length != 6) {
  console.log(
    'Usage: sudo node first-steps.js DEGREES STEPPING_MODE(full|half) DELAY_IN_MILLIS, REVERSE(true|false)')
  process.exit(1)
}
else {
  rotate(process.argv[2], process.argv[3], process.argv[4],
    process.argv[5] === 'true')
}




