export interface Position {
    latitude: number;
    longitude: number;
    zoom: number;
}

export interface LatLng {
    latitude: number;
    longitude: number;
}

export interface ForestArea {
    points: LatLng[];
    id?: string;
    name?: string;
}

export interface MapState {
    isDrawing: boolean;
    temporaryPoints: LatLng[];
}