import {CD} from "./cd";

export interface ICharts{
    notifyCDsBought(cd: CD, quantity: number): undefined
}