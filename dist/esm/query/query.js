var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { decodeValues, queryFeatures } from '@esri/arcgis-rest-feature-service';
import config from '../config';
import { createQueryParams } from './url';
export function queryDatasets(datasets) {
    var names = [];
    var requests = [];
    if (datasets) {
        datasets.forEach(function (dataset, i) {
            // only query datasets that don't have inline data
            if (dataset.url) {
                var url = dataset.url, name_1 = dataset.name, query = dataset.query, requestOptions = dataset.requestOptions;
                // TODO: make name required on datasets, or required if > 1 dataset?
                names.push(name_1 || "dataset" + i);
                var params = __assign({}, (requestOptions && requestOptions.params), createQueryParams(query));
                var options_1 = __assign({}, requestOptions, { url: url,
                    params: params });
                if (config.fetch && typeof config.fetch === 'function') {
                    // we are configured to use a custom fetch implementation
                    // send that along to rest-js
                    options_1.fetch = config.fetch;
                }
                requests.push(queryFeatures(options_1)
                    .then(function (queryResponse) {
                    var domains = dataset.domains;
                    var fields = domains && Object.keys(domains).map(function (name) { return ({ name: name, domain: domains[name] }); });
                    // for now, we only decode CVDs when an array of fields is passed describing codes and names
                    if (fields && fields.length > 0) {
                        var decodeOptions = {
                            url: options_1.url,
                            queryResponse: queryResponse,
                            // TODO: decodeValues() should take `domains?: IDomains` as an alternative to `fields?: IField[]`
                            fields: fields,
                            fetch: config.fetch
                        };
                        return decodeValues(decodeOptions);
                    }
                    else {
                        return queryResponse;
                    }
                }));
            }
        });
    }
    return Promise.all(requests)
        .then(function (responses) {
        // turn the array of responses into a hash keyed off the dataset names
        var responseHash = responses.reduce(function (hash, response, i) {
            hash[names[i]] = response;
            return hash;
        }, {});
        return Promise.resolve(responseHash);
    });
}
//# sourceMappingURL=query.js.map