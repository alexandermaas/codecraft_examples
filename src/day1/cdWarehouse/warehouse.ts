import {CD} from "./cd";

export class Warehouse {
    constructor(private cds: CD[]) {}

    search(artist: string, title: string) {
        return this.cds.filter((cd) => cd.title === title && cd.artist === artist);
    }
}
