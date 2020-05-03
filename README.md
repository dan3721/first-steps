Using a Raspberry Pi (Model B Rev 2) to drive a AP-68 stepper motor.

## AP-68 Stepper Motor Specs

    Description      Brass sleeve bearings
    Voltage Rating   12V
    Phases           4
    Resistance       33Ω
    Number of Leads  6
    Step Angle       1.8°
    Size             68 Dia, 25 L [mm] (with shaft)
    Shaft            6 dia, 10 L [mm]
    Weight           177 Grams

## Setup
![full setup](setup.jpg?fixOrientation)

## Schematic
![schematic](schematic.png)

## Driver Circut
![driver circut](driver-circut.jpg)

## Run

First ensure [Pigpio](http://abyz.me.uk/rpi/pigpio/) is installed.

Then install the dependencies with `npm i`

Now you should be ready to run it!

Turn 90° using full stepping with a step delay of 100 milliseconds 

    sudo node first-steps.js 90 full 100 false
    
Turn 180° using full stepping with a step delay of 50 milliseconds 

    sudo node first-steps.js 180 half 50 false
    
See first-steps.js for usage and details.

### Troubleshooting

`pigs-steps.sh` is a simple script of Pigpio pigs cmds to spin the stepper motor.

    sudo pigpiod            # start the pigpiod daemon
    pigs-steps.sh           # spin the motor 360°
    sudo killall pigpiod    # shutdown the pigpiod daemon

## 28BYJ-48

### Setup
![28BYJ-48 Setup](28BYJ-48.jpg)

Got this guy to run too using simple pigs script([28BYJ-48.sh](28BYJ-48.sh)).

### In Action
![28BYJ-48 In Action](28BYJ-48.mp4)

### Reference

1. [Dummies guide on driving a 28BYJ-48 Stepper Motor with a ULN2003 Driver Board and Arduino](https://www.seeedstudio.com/blog/2019/03/04/driving-a-28byj-48-stepper-motor-with-a-uln2003-driver-board-and-arduino/)
1. [28BYJ48 Datasheet](28BYJ48-12-300-01-FullingMotor.pdf)
