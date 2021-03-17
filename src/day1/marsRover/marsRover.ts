import { Heading } from './heading';

export class MarsRover {
    constructor(public location: number[], public heading: Heading) {}

    execute(commandString: string) {
        const commandMapping: {[command:string]: ()=>void} = {
            L: () => this.turn(1),
            R: () => this.turn(-1),
            F: () => this.move(1),
            B: () => this.move(-1),
        };
        commandString.split('').forEach((command) => {
            commandMapping[command]();
        });
    }

    private turn(increment: number) {
        const directions = [Heading.North, Heading.East, Heading.South, Heading.West];
        const directionIndex = directions.indexOf(this.heading);
        this.heading = directions[(directionIndex - increment + directions.length) % directions.length];
    }

    private move(increment: number) {
        const moveDirectionMapping = {
            West: [-increment, 0],
            East: [increment, 0],
            North: [0, increment],
            South: [0, -increment],
        };

        this.location = [
            this.location[0] + moveDirectionMapping[this.heading][0],
            this.location[1] + moveDirectionMapping[this.heading][1],
        ];
    }
}
