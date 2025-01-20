import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { fetchForestAnalytics } from "../../services/analytics";
import { ForestAnalytics } from "../../types/analytics";

type DashboardScreenProps = {
    route: RouteProp<MainStackParamList, "Dashboard">,
    navigation: FrameNavigationProp<MainStackParamList, "Dashboard">,
};

export function DashboardScreen({ navigation }: DashboardScreenProps) {
    const [loading, setLoading] = React.useState(true);
    const [analytics, setAnalytics] = React.useState<ForestAnalytics | null>(null);
    const [selectedMetric, setSelectedMetric] = React.useState<'ndvi' | 'healthIndex' | 'areaInHectares'>('ndvi');

    React.useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            setLoading(true);
            const data = await fetchForestAnalytics("sample-area-id");
            setAnalytics(data);
        } catch (error) {
            console.error("Failed to load analytics:", error);
        } finally {
            setLoading(false);
        }
    };

    const renderMetricValue = (value: number) => {
        switch (selectedMetric) {
            case 'ndvi':
                return value.toFixed(2);
            case 'healthIndex':
                return `${value.toFixed(1)}%`;
            case 'areaInHectares':
                return `${value.toFixed(1)} ha`;
        }
    };

    if (loading) {
        return (
            <flexboxLayout style={styles.container}>
                <label className="text-xl">Loading analytics...</label>
            </flexboxLayout>
        );
    }

    if (!analytics) {
        return (
            <flexboxLayout style={styles.container}>
                <label className="text-xl text-red-600">Failed to load analytics</label>
            </flexboxLayout>
        );
    }

    return (
        <scrollView>
            <flexboxLayout style={styles.container}>
                <label className="text-2xl font-bold mb-4">Forest Analytics</label>
                
                {/* Summary Cards */}
                <flexboxLayout className="bg-white p-4 rounded-lg shadow mb-4 w-full">
                    <label className="text-lg font-semibold">Total Area Monitored</label>
                    <label className="text-3xl text-green-700">
                        {analytics.summary.totalArea.toFixed(1)} hectares
                    </label>
                </flexboxLayout>

                <flexboxLayout className="bg-white p-4 rounded-lg shadow mb-4 w-full">
                    <label className="text-lg font-semibold">Average Health Index</label>
                    <label className="text-3xl text-green-700">
                        {analytics.summary.averageHealth.toFixed(1)}%
                    </label>
                </flexboxLayout>

                {/* Metric Selector */}
                <flexboxLayout className="bg-white p-4 rounded-lg shadow mb-4 w-full">
                    <label className="text-lg font-semibold mb-2">Select Metric</label>
                    <flexboxLayout className="flex-row justify-around">
                        <button
                            className={`p-2 rounded ${selectedMetric === 'ndvi' ? 'bg-green-700 text-white' : 'bg-gray-200'}`}
                            onTap={() => setSelectedMetric('ndvi')}
                        >
                            NDVI
                        </button>
                        <button
                            className={`p-2 rounded ${selectedMetric === 'healthIndex' ? 'bg-green-700 text-white' : 'bg-gray-200'}`}
                            onTap={() => setSelectedMetric('healthIndex')}
                        >
                            Health Index
                        </button>
                        <button
                            className={`p-2 rounded ${selectedMetric === 'areaInHectares' ? 'bg-green-700 text-white' : 'bg-gray-200'}`}
                            onTap={() => setSelectedMetric('areaInHectares')}
                        >
                            Area
                        </button>
                    </flexboxLayout>
                </flexboxLayout>

                {/* Time Series Data */}
                <flexboxLayout className="bg-white p-4 rounded-lg shadow mb-4 w-full">
                    <label className="text-lg font-semibold mb-2">30-Day Trend</label>
                    <scrollView orientation="horizontal" className="mb-4">
                        <flexboxLayout className="flex-row">
                            {analytics.timeSeriesData.map((data, index) => (
                                <flexboxLayout 
                                    key={data.date}
                                    className="mr-2 items-center"
                                >
                                    <label className="text-sm">{renderMetricValue(data[selectedMetric])}</label>
                                    <label className="text-xs text-gray-500">
                                        {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </label>
                                </flexboxLayout>
                            ))}
                        </flexboxLayout>
                    </scrollView>
                </flexboxLayout>

                <button
                    className="bg-green-700 text-white p-2 rounded"
                    onTap={() => navigation.goBack()}
                >
                    Return to Map
                </button>
            </flexboxLayout>
        </scrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        padding: 20,
        alignItems: "center"
    }
});