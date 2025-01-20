export interface SatelliteData {
    date: string;
    ndvi: number;
    cloudCover: number;
}

export interface NASAEarthResponse {
    date: string;
    cloud_score?: number;
    // Add other NASA API response fields as needed
}