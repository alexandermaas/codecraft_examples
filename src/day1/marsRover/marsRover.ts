import {Heading} from './heading';

export class MarsRover {
    constructor(public location: number[], public heading: Heading) {}

    command(command: string) {
        if (command == 'L') {
            this.turn(1);
        }
        else if(command == "R"){
            this.turn(-1)
        }
        else if (command == 'F') {
            this.move(1);
        } else {
            this.move(-1);
        }
    }

    private turn(increment:number) {
        const directions = [Heading.North, Heading.East, Heading.South, Heading.West];
        const directionIndex = directions.indexOf(this.heading);
        this.heading = directions[(directionIndex - increment + directions.length) % directions.length];
    }

    private move(increment: number) {
        switch (this.heading) {
            case Heading.West:
                this.location[0] -= increment;
                break;
            case Heading.East:
                this.location[0] += increment;
                break;
            case Heading.North:
                this.location[1] += increment;
                break;
            case Heading.South:
                this.location[1] -= increment;
                break;
        }
    }
}
