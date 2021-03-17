import {MarsRover} from './marsRover';
import {Heading} from './heading';

describe('MarsRover', () => {
    describe('currentLocation', () => {
        [
            [0, 0],
            [2, 4],
        ].forEach((location) => {
            it(`should show the location ${location} if at x=${location[0]} and y=${location[1]}`, () => {
                const marsRover: MarsRover = new MarsRover(location, Heading.South);
                expect(marsRover.location).toEqual(location);
            });
        });
    });
    describe('has a heading', () => {
        Object.keys(Heading)
            .map((h) => h as Heading)
            .forEach((heading: Heading) => {
                it(`should show the heading '${heading}' in case heading is '${heading}'`, () => {
                    const marsRover: MarsRover = new MarsRover([0, 0], heading);
                    expect(marsRover.heading).toEqual(heading);
                });
            });
    });
    describe('move forward', () => {
        [
            {initialLocation: [5, 6], expectedLocation: [4,6], heading:Heading.West},
            {initialLocation: [2, 3], expectedLocation: [1, 3], heading:Heading.West},
            {initialLocation: [5, 6], expectedLocation: [6,6], heading:Heading.East},
            {initialLocation: [2, 3], expectedLocation: [3, 3], heading:Heading.East},
            {initialLocation: [5, 6], expectedLocation: [5,7], heading:Heading.North},
            {initialLocation: [2, 3], expectedLocation: [2,4], heading:Heading.North},
            {initialLocation: [5, 6], expectedLocation: [5,5], heading:Heading.South},
            {initialLocation: [2, 3], expectedLocation: [2,2], heading:Heading.South},
        ].forEach(({expectedLocation, heading, initialLocation}) => {
            it(`should move from location ${initialLocation} to location ${expectedLocation} if heading is '${heading}'`, () => {
                const marsRover: MarsRover = new MarsRover(initialLocation, heading);
                marsRover.command('F');
                expect(marsRover.location).toEqual(expectedLocation);
            });
        });
    });
});
