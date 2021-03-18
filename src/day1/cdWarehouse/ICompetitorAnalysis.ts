import {CD} from "./cd";

export interface ICompetitorAnalysis {
    getLowestPriceForCD(cd: CD): number
}