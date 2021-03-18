import {CD} from '../cdWarehouse/cd';
import {Warehouse} from '../cdWarehouse/warehouse';
import {ICharts} from "../cdWarehouse/ICharts";

const cdBobMarley = new CD(5, 1, 'Bob Marley', "Don't worry be happy");
describe('CD Warehouse', () => {
    describe('search a cd', () => {
        it('should return nothing in case there is no match', () => {
            const warehouse = new Warehouse([new CD(5, 1, 'Artist', 'Title')]);
            expect(warehouse.search(cdBobMarley.artist, cdBobMarley.title)).toEqual([]);
        });

        it('should return the cd in case there is a match', () => {
            const warehouse = new Warehouse([cdBobMarley, new CD(0, 0, '', '')]);
            expect(warehouse.search(cdBobMarley.artist, cdBobMarley.title)).toEqual([cdBobMarley]);
        });
    });
});


