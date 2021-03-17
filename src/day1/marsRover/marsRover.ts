import {Heading} from './heading';

export class MarsRover {
    constructor(public location: number[], public heading: Heading) {}

    command(commandString: string) {
        commandString.split("").forEach((command) => {
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
        })
    }

    private turn(increment:number) {
        const directions = [Heading.North, Heading.East, Heading.South, Heading.West];
        const directionIndex = directions.indexOf(this.heading);
        this.heading = directions[(directionIndex - increment + directions.length) % directions.length];
    }

    private move(increment: number) {
        const moveDirection={"West":[-increment,0],
            "East":[increment,0],
            "North":[0,increment],
            "South":[0,-increment],
        };

        this.location = [
            this.location[0]+moveDirection[this.heading][0],
            this.location[1]+moveDirection[this.heading][1]
        ]
    }
}
