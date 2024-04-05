export interface Polygon {
    crs: {
        type: string;
        properties: {
            name: string;
        };
    };
    type: string;
    coordinates: Array<Array<Array<number>>>;
}
