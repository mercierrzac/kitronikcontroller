def on_bluetooth_connected():
    global changeServo1, servo1Value
    changeServo1 = 0
    servo1Value = 0
    basic.show_leds("""
        # # . # #
                # # . # #
                . . # . .
                # . . . #
                . # # # .
    """)
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_bluetooth_disconnected():
    basic.show_leds("""
        # # . # #
                # # . # #
                . . # . .
                . # # # .
                # . . . #
    """)
bluetooth.on_bluetooth_disconnected(on_bluetooth_disconnected)

def on_mes_dpad_controller_id_microbit_evt():
    global changeServo1
    if control.event_value() == EventBusValue.MES_DPAD_BUTTON_1_DOWN:
        pins.servo_write_pin(AnalogPin.P1, 0)
        pins.servo_write_pin(AnalogPin.P2, 180)
    elif control.event_value() == EventBusValue.MES_DPAD_BUTTON_1_UP:
        pins.servo_write_pin(AnalogPin.P1, 90)
        pins.servo_write_pin(AnalogPin.P2, 90)
    elif control.event_value() == EventBusValue.MES_DPAD_BUTTON_2_DOWN:
        pins.servo_write_pin(AnalogPin.P1, 180)
        pins.servo_write_pin(AnalogPin.P2, 0)
    elif control.event_value() == EventBusValue.MES_DPAD_BUTTON_2_UP:
        pins.servo_write_pin(AnalogPin.P1, 90)
        pins.servo_write_pin(AnalogPin.P2, 90)
    elif control.event_value() == EventBusValue.MES_DPAD_BUTTON_3_DOWN:
        pins.servo_write_pin(AnalogPin.P1, 0)
        pins.servo_write_pin(AnalogPin.P2, 0)
    elif control.event_value() == EventBusValue.MES_DPAD_BUTTON_3_UP:
        pins.servo_write_pin(AnalogPin.P1, 90)
        pins.servo_write_pin(AnalogPin.P2, 90)
    elif control.event_value() == EventBusValue.MES_DPAD_BUTTON_4_DOWN:
        pins.servo_write_pin(AnalogPin.P1, 180)
        pins.servo_write_pin(AnalogPin.P2, 180)
    elif control.event_value() == EventBusValue.MES_DPAD_BUTTON_4_UP:
        pins.servo_write_pin(AnalogPin.P1, 90)
        pins.servo_write_pin(AnalogPin.P2, 90)
    elif control.event_value() == EventBusValue.MES_DPAD_BUTTON_A_DOWN:
        changeServo1 = -1
    elif control.event_value() == EventBusValue.MES_DPAD_BUTTON_A_UP:
        changeServo1 = 0
    elif control.event_value() == EventBusValue.MES_DPAD_BUTTON_B_DOWN:
        changeServo1 = 1
    elif control.event_value() == EventBusValue.MES_DPAD_BUTTON_B_UP:
        changeServo1 = 0
control.on_event(EventBusSource.MES_DPAD_CONTROLLER_ID,
    EventBusValue.MICROBIT_EVT_ANY,
    on_mes_dpad_controller_id_microbit_evt)

servo1Value = 0
changeServo1 = 0
basic.show_leds("""
    # . . # #
        # . . # #
        # # # . .
        # . # . .
        # # # . .
""")

def on_forever():
    global servo1Value
    if changeServo1 != 0:
        servo1Value += changeServo1
        if servo1Value < 0:
            servo1Value = 0
        if servo1Value > 180:
            servo1Value = 180
        pins.servo_write_pin(AnalogPin.P0, servo1Value)
basic.forever(on_forever)
