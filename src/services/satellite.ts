import axios from 'axios';
import { SatelliteData, NASAEarthResponse } from '/home/k/reforestation_app/project/src/types/satellite';

export async function fetchSatelliteData(latitude: number, longitude: number): Promise<SatelliteData> {
    try {
        const API_KEY = global.process.env.NASA_API_KEY || 'DEMO_KEY';
        const response = await axios.get<NASAEarthResponse>(
            'https://api.nasa.gov/planetary/earth/assets',
            {
                params: {
                    lat: latitude,
                    lon: longitude,
                    dim: 0.15,
                    api_key: API_KEY
                }
            }
        );

        // Process the response to calculate NDVI
        // This is a simplified example - actual NDVI calculation would use band data
        return {
            date: response.data.date || new Date().toISOString(),
            ndvi: 0.5, // This would be calculated from actual satellite data
            cloudCover: response.data.cloud_score || 0
        };
    } catch (error) {
        console.error('Error fetching satellite data:', error);
        // Return mock data in case of error
        return {
            date: new Date().toISOString(),
            ndvi: 0.5,
            cloudCover: 0
        };
    }
}