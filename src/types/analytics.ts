export interface TimeSeriesData {
    date: string;
    ndvi: number;
    healthIndex: number;
    areaInHectares: number;
}

export interface ForestAnalytics {
    areaId: string;
    areaName: string;
    timeSeriesData: TimeSeriesData[];
    summary: {
        totalArea: number;
        averageHealth: number;
        lastUpdated: string;
    };
}