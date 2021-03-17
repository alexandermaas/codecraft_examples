import {Heading} from './heading';

export class MarsRover {
    constructor(public location: number[], public heading: Heading) {}

    command(command: string) {
        let increment;
        if (command == 'L') {
            this.turnLeft();
        }
        else if(command == "R"){
            if(this.heading == Heading.East){
                this.heading = Heading.South
            }
            else if(this.heading == Heading.South){
                this.heading = Heading.West
            }
            else if(this.heading == Heading.West){
                this.heading = Heading.North
            }
            else if(this.heading == Heading.North){
                this.heading = Heading.East
            }
        }
        else if (command == 'F') {
            increment = 1;
            this.move(increment);
        } else {
            increment = -1;
            this.move(increment);
        }
    }

    private turnLeft() {
        const directions = [Heading.North, Heading.East, Heading.South, Heading.West];
        const directionIndex = directions.indexOf(this.heading);
        this.heading = directions[(directionIndex - 1 + directions.length) % directions.length];
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
