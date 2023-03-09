bluetooth.onBluetoothConnected(function () {
    changeServo1 = 0
    servo1Value = 0
    basic.showLeds(`
        . . . # .
        . . . # .
        . # # # .
        . # . # .
        . # # # .
        `)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showLeds(`
        # # . # #
        # # . # #
        . . # . .
        . # # # .
        # . . . #
        `)
})
control.onEvent(EventBusSource.MES_DPAD_CONTROLLER_ID, EventBusValue.MICROBIT_EVT_ANY, function () {
    if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_1_DOWN) {
        pins.servoWritePin(AnalogPin.P1, 0)
        pins.servoWritePin(AnalogPin.P2, 180)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_1_UP) {
        pins.servoWritePin(AnalogPin.P1, 90)
        pins.servoWritePin(AnalogPin.P2, 90)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_2_DOWN) {
        pins.servoWritePin(AnalogPin.P1, 180)
        pins.servoWritePin(AnalogPin.P2, 0)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_2_UP) {
        pins.servoWritePin(AnalogPin.P1, 90)
        pins.servoWritePin(AnalogPin.P2, 90)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_3_DOWN) {
        pins.servoWritePin(AnalogPin.P1, 0)
        pins.servoWritePin(AnalogPin.P2, 0)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_3_UP) {
        pins.servoWritePin(AnalogPin.P1, 90)
        pins.servoWritePin(AnalogPin.P2, 90)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_4_DOWN) {
        pins.servoWritePin(AnalogPin.P1, 180)
        pins.servoWritePin(AnalogPin.P2, 180)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_4_UP) {
        pins.servoWritePin(AnalogPin.P1, 90)
        pins.servoWritePin(AnalogPin.P2, 90)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_A_DOWN) {
        changeServo1 = -1
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_A_UP) {
        changeServo1 = 0
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_B_DOWN) {
        changeServo1 = 1
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_B_UP) {
        changeServo1 = 0
    }
})
let servo1Value = 0
let changeServo1 = 0
basic.showLeds(`
    # . . # #
    # . . # #
    # # # . .
    # . # . .
    # # # . .
    `)
basic.forever(function () {
    if (changeServo1 != 0) {
        servo1Value += changeServo1
        if (servo1Value < 0) {
            servo1Value = 0
        }
        if (servo1Value > 180) {
            servo1Value = 180
        }
        pins.servoWritePin(AnalogPin.P0, servo1Value)
    }
})
