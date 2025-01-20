import axios from 'axios';
import { ForestAnalytics, TimeSeriesData } from '../types/analytics';

// Simulated data - replace with actual API calls in production
export async function fetchForestAnalytics(areaId: string): Promise<ForestAnalytics> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate mock time series data for the last 30 days
    const timeSeriesData: TimeSeriesData[] = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        
        return {
            date: date.toISOString().split('T')[0],
            ndvi: 0.4 + Math.random() * 0.3, // Random NDVI between 0.4 and 0.7
            healthIndex: 70 + Math.random() * 20, // Random health index between 70 and 90
            areaInHectares: 100 + Math.random() * 10 // Random area with slight variations
        };
    });

    return {
        areaId,
        areaName: "Sample Forest Area",
        timeSeriesData,
        summary: {
            totalArea: timeSeriesData[timeSeriesData.length - 1].areaInHectares,
            averageHealth: timeSeriesData[timeSeriesData.length - 1].healthIndex,
            lastUpdated: new Date().toISOString()
        }
    };
}