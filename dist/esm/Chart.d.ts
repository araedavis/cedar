import { IDataset, ISeries } from './common';
/**
 * Properties to control the visibility and position of the chart's legend
 */
export interface ILegend {
    visible?: boolean;
    position?: 'top' | 'bottom' | 'left' | 'right';
}
/**
 * Properties specific to pie charts
 */
export interface IPie {
    /**
     * How much of the center of the chart should be cut out to create a donut chart?
     */
    innerRadius?: number | string;
    /**
     * Should slices expand outward when clicked?
     */
    expand?: number | string;
}
/**
 * Padding around the chart (in pixels)
 */
export interface IPadding {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}
/**
 * Additional properties to define how a chart is rendered
 */
export interface IStyle {
    pie?: IPie;
    padding?: IPadding;
    /**
     * An array of colors that will be applied to the chart series
     */
    colors?: string[];
}
/**
 * Defines where a chart gets it's data from and how the data is rendered in the chart
 */
export interface IDefinition {
    /**
     * Where the chart's data comes from
     */
    datasets?: IDataset[];
    /**
     * How that data is bound to plots (bars, lines, points, etc) on the chart
     */
    series?: ISeries[];
    /**
     * A string representing one of the pre-defined (bar, line, pie, etc) chart specifications
     */
    type?: string;
    /**
     * An specification for custom chart type (used instead of `type`)
     */
    specification?: {};
    /**
     * Overrides of specification properties
     */
    overrides?: {};
    /**
     * Properties to control the visibility and position of the chart's legend
     */
    legend?: ILegend;
    /**
     * Additional properties to define how a chart is rendered
     */
    style?: IStyle;
}
/**
 * An instance of a cedar chart that will be rendered at a given DOM node (container) based on a [definition](../interfaces/idefinition.html).
 * ```js
 *   // initialize the chart
 *   var chart = new Chart(elementId, definition);
 *   // fetch chart data and render the chart
 *   chart.show();
 * ```
 */
export declare class Chart {
    private _container;
    private _definition;
    private _data;
    /**
     *
     * @param container The DOM node where the chart will be rendered
     * @param definition Defines how the data will be rendered in the chart
     */
    constructor(container: any, definition?: IDefinition);
    /**
     *
     * Set the definition
     * @param newDefinition
     */
    definition(newDefinition: IDefinition): Chart;
    /**
     * Get the definition
     */
    definition(): IDefinition;
    /**
     *
     * Set the chart's datasets
     * @param newDatasets Array of datasets
     */
    datasets(newDatasets: IDataset[]): Chart;
    /**
     * Get the chart's datasets
     */
    datasets(): IDataset[];
    /**
     * Set the chart's series
     * @param newSeries
     */
    series(newSeries: ISeries[]): Chart;
    /**
     * Get the chart's series
     */
    series(): ISeries[];
    /**
     * Set the chart type
     * @param newType
     */
    type(newType: string): Chart;
    /**
     * Get the chart type
     */
    type(): string;
    /**
     * Set the chart's specification
     * @param newSpecification
     */
    specification(newSpecification: {}): Chart;
    /**
     * Get the chart's specification
     */
    specification(): {};
    /**
     * Override specification properties
     * @param newOverrides
     */
    overrides(newOverrides: {}): Chart;
    /**
     * Get the specification overrides
     */
    overrides(): {};
    /**
     * Set the chart's legend properties
     * @param newLegend
     */
    legend(newLegend: ILegend): Chart;
    /**
     * Get the chart legend settings
     */
    legend(): ILegend;
    /**
     * Set the chart's styles
     * @param newStyle
     */
    style(newStyle: IStyle): Chart;
    style(): IStyle;
    /**
     * Get the internal copy of the data used to render the chart
     */
    data(): any[];
    /**
     * Get a dataset from the definition by name
     * @param datasetName The name of the dataset to get
     */
    dataset(datasetName: string): IDataset;
    /**
     * Query data for all non-inline datasets
     */
    query(): Promise<any>;
    updateData(datasetsData: any): this;
    /**
     * Re-draw the chart based on the current data and definition
     */
    render(): this;
    /**
     * Execute the query(), updateData(), and render() functions
     */
    show(): Promise<this>;
    private _definitionAccessor;
}
