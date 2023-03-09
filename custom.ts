//% weight=100 color=#0fbc11 icon=""
namespace ServoLite {
    /*some parameters used for controlling the turn and length */
    let MicroSecInASecond = 1000000
    let DistancePerSec = 100
    let NumberOfDegreesPerSec = 200

    /**
     * Allows the setting of the :MOVE mini turn speed.
     * This allows tuning for the turn x degrees commands
     * @param DegPerSec : How many degrees per second the mini does.
     */
    //% block="setup turn speed %DegPerSec" 
    export function SetDegreesPerSecond(DegPerSec: number): void {
        NumberOfDegreesPerSec = DegPerSec
    }

    /**
     * Allows the setting of the :MOVE mini forward / reverse speed.
     * This allows tuning for the move x distance commands
     * @param DegPerSec : How many degrees per second the mini does.
     */
    //% block="setup speed %DistPerSec"
    export function SetDistancePerSecond(DistPerSec: number): void {
        NumberOfDegreesPerSec = DistPerSec
    }
    /**
     * Drives forwards. Call stop to stop
     * @param none
     */
    //%blockId=servos_forward
    //% block="drive forward" 
    export function forward(): void {
        pins.servoWritePin(AnalogPin.P1, 0);
        pins.servoWritePin(AnalogPin.P2, 180);
    }

    /**
     * Drives backwards. Call stop to stop
     * @param none
     */
    //%blockId=servos_backward
    //% block="drive backward" 
    export function backward(): void {
        pins.servoWritePin(AnalogPin.P1, 180);
        pins.servoWritePin(AnalogPin.P2, 0);
    }

    /**
 * Turns left. Call stop to stop
 * @param none
 */
    //%blockId=servos_left
    //% block="turn left" 
    export function left(): void {
        pins.servoWritePin(AnalogPin.P1, 0);
        pins.servoWritePin(AnalogPin.P2, 0);
    }

    /**
 * Turns right. Call stop to stop
 * @param none
 */
    //%blockId=servos_right
    //% block="turn right" 
    export function right(): void {
        pins.servoWritePin(AnalogPin.P1, 180);
        pins.servoWritePin(AnalogPin.P2, 180);
    }

	/**
	 * Stop for 360 servos. 
	 * rather than write 90, which may not stop the servo moving if it is out of trim
	 * this stops sending servo pulses, which has the same effect.
	 * On a normal servo this will stop the servo where it is, rather than return it to neutral position.
	 * It will also not provide any holding force.
     * @param none
     */
    //%blockId=servos_stop
    //% block="stop" 
    export function stop(): void {
        pins.analogWritePin(AnalogPin.P1, 0);
        pins.analogWritePin(AnalogPin.P2, 0);
    }

	/**
	 * Sends servos to 'neutral' position. 
	 * On a well trimmed 360 this is stationary, on a normal servo this is 90 degrees.
     * @param none
     */
    //% blockId=servos_neutral
    //% block="goto neutral position" 
    export function neutral(): void {
        pins.servoWritePin(AnalogPin.P1, 90);
        pins.servoWritePin(AnalogPin.P2, 90);
    }

    /**
     * Drives forwards the requested distance and then stops
     * @param howFar distance to move
     */
    //% blockId=drive_forwards
    //% block="drive forwards %howFar distance" 
    export function DriveForwards(howFar: number): void {
        let timeToWait = (howFar * MicroSecInASecond) / DistancePerSec;
        forward();
        control.waitMicros(timeToWait);
        stop();
    }

    /**
     * Drives backwards the requested distance and then stops
     * @param howFar distance to move
     */
    //% blockId=drive_backwards
    //% block="drive backwards %howFar distance" 
    export function DriveBackwards(distance: number): void {
        let timeToWait = (distance * MicroSecInASecond) / DistancePerSec;
        backward();
        control.waitMicros(timeToWait);
        stop();
    }

    /**
     * Turns right through the requested degrees and then stops
     * needs NumberOfDegreesPerSec tuned to make accurate, as it uses
     * a simple turn, wait, stop method.
     * Runs the servos at slower than the right function to reduce wheel slip
     * @param deg :how far to turn
     */
    //% blockId=turn_right
    //% block = "turn right number %deg degrees"
    export function TurnRight(deg: number): void {
        let timeToWait = (deg * MicroSecInASecond) / NumberOfDegreesPerSec;
        pins.servoWritePin(AnalogPin.P1, 130);
        pins.servoWritePin(AnalogPin.P2, 130);
        control.waitMicros(timeToWait);
        pins.servoWritePin(AnalogPin.P1, 90);
        pins.servoWritePin(AnalogPin.P2, 90);
    }

    /**
    * Turns left through the requested degrees and then stops
    * needs NumberOfDegreesPerSec tuned to make accurate, as it uses
    * a simple turn, wait, stop method.
    * Runs the servos at slower than the right function to reduce wheel slip
    * @param deg :how far to turn
    */
    //% blockId=turn_left
    //%block = "turn left number %deg degrees"
    export function TurnLeft(deg: number): void {
        let timeToWait = (deg * MicroSecInASecond) / NumberOfDegreesPerSec;
        pins.servoWritePin(AnalogPin.P1, 50);
        pins.servoWritePin(AnalogPin.P2, 50);
        control.waitMicros(timeToWait);
        pins.servoWritePin(AnalogPin.P1, 90);
        pins.servoWritePin(AnalogPin.P2, 90);

    }
}