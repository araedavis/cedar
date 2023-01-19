import { cedarAmCharts } from '@esri/cedar-amcharts';
import { getChartData } from './dataset';
/**
 * An instance of a cedar chart that will be rendered at a given DOM node (container) based on a [definition](../interfaces/idefinition.html).
 * ```js
 *   // initialize the chart
 *   var chart = new Chart(elementId, definition);
 *   // fetch chart data and render the chart
 *   chart.show();
 * ```
 */
var Chart = /** @class */ (function () {
    /**
     *
     * @param container The DOM node where the chart will be rendered
     * @param definition Defines how the data will be rendered in the chart
     */
    function Chart(container, definition) {
        if (!container) {
            throw new Error('A container is required');
        }
        this._container = container;
        if (definition) {
            // set the definition
            this.definition(definition);
        }
    }
    Chart.prototype.definition = function (newDefinition) {
        if (newDefinition === undefined) {
            return this._definition;
        }
        else {
            this._definition = newDefinition;
            return this;
        }
    };
    Chart.prototype.datasets = function (newDatasets) {
        return this._definitionAccessor('datasets', newDatasets);
    };
    Chart.prototype.series = function (newSeries) {
        return this._definitionAccessor('series', newSeries);
    };
    Chart.prototype.type = function (newType) {
        return this._definitionAccessor('type', newType);
    };
    Chart.prototype.specification = function (newSpecification) {
        return this._definitionAccessor('specification', newSpecification);
    };
    Chart.prototype.overrides = function (newOverrides) {
        return this._definitionAccessor('overrides', newOverrides);
    };
    Chart.prototype.legend = function (newLegend) {
        return this._definitionAccessor('legend', newLegend);
    };
    /**
     * Get the chart's styles
     */
    Chart.prototype.style = function (newStyle) {
        return this._definitionAccessor('style', newStyle);
    };
    /**
     * Get the internal copy of the data used to render the chart
     */
    Chart.prototype.data = function () {
        return this._data;
    };
    /**
     * Get a dataset from the definition by name
     * @param datasetName The name of the dataset to get
     */
    Chart.prototype.dataset = function (datasetName) {
        var datasets = this.datasets();
        var match;
        if (datasets) {
            datasets.some(function (dataset) {
                if (dataset.name === datasetName) {
                    match = dataset;
                    return true;
                }
            });
        }
        return match;
    };
    /**
     * Query data for all non-inline datasets
     */
    Chart.prototype.query = function () {
        return null;
    };
    // update chart from inline data and query responses
    Chart.prototype.updateData = function (datasetsData) {
        var datasets = this.datasets();
        var options = {
            datasetsData: datasetsData,
            series: this.series()
        };
        this._data = getChartData(datasets, options);
        return this;
    };
    /**
     * Re-draw the chart based on the current data and definition
     */
    Chart.prototype.render = function () {
        cedarAmCharts(this._container, this.definition(), this.data());
        return this;
    };
    /**
     * Execute the query(), updateData(), and render() functions
     */
    Chart.prototype.show = function () {
        var _this = this;
        return this.query()
            .then(function (response) {
            return _this.updateData(response).render();
        });
    };
    // implementation for all setters/getters for definition properties
    Chart.prototype._definitionAccessor = function (propertyName, newPropertyValue) {
        var definition = this._definition;
        if (newPropertyValue === undefined) {
            return definition ? definition[propertyName] : undefined;
        }
        else {
            if (definition) {
                definition[propertyName] = newPropertyValue;
                return this;
            }
            else {
                var newDefinition = {};
                newDefinition[propertyName] = newPropertyValue;
                return this.definition(newDefinition);
            }
        }
    };
    return Chart;
}());
export { Chart };
//# sourceMappingURL=Chart.js.map