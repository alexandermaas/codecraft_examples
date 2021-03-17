import { Heading } from './heading';

export class MarsRover {
    constructor(public location: number[], public heading: Heading) {}

    command(command: string) {
        switch (this.heading) {
            case Heading.West:
                this.location = [this.location[0] - 1, this.location[1]];
                break;
            case Heading.East:
                this.location = [this.location[0] + 1, this.location[1]];
                break;
            case Heading.North:
                this.location = [this.location[0], this.location[1] + 1];
                break;
            case Heading.South:
                this.location = [this.location[0], this.location[1] - 1];
                break;
        }
    }
}
