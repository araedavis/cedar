import { IDataset, ISeries } from './common';
export interface IGetChartDataOptions {
    datasetsData?: {};
    series?: ISeries[];
}
export declare function getChartData(datasets: IDataset[], options?: IGetChartDataOptions): any;
