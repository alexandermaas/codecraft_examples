import {CD} from "./cd";

export interface ICharts{
    notifyCDsBought(cd: CD, quantity: number): undefined
    isCDInTop100(cd: CD): boolean
}