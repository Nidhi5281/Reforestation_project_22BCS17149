import { Dialogs } from "@nativescript/core";
import * as React from "react";
import { EventData } from "@nativescript/core";
import { registerElement } from "@nativescript/angular";
import type { MainStackParamList, MainStackNavigationProp } from "../../NavigationParamList";
import { fetchSatelliteData } from "../../services/satellite";
import { ForestArea, MapState, Position, LatLng } from "../../types/map";
import { SatelliteData } from "../../types/satellite";
import MapView, { KmlMapEvent, Marker, Polygon } from 'react-native-maps';

// Register Google Maps elements
registerElement("MapView", () => require("@nativescript/google-maps").MapView);
registerElement("Marker", () => require("@nativescript/google-maps").Marker);
registerElement("Polygon", () => require("@nativescript/google-maps").Polygon);

interface MapScreenProps {
    navigation: MainStackNavigationProp<"Map">;
}

export function MapScreen({ navigation }: MapScreenProps): JSX.Element {
    const [mapState, setMapState] = React.useState<MapState>({ isDrawing: false, temporaryPoints: [] });
    const [loading, setLoading] = React.useState<boolean>(false);
    const [position, setPosition] = React.useState<Position>({ latitude: 0, longitude: 0, zoom: 10 });
    const [satelliteData, setSatelliteData] = React.useState<SatelliteData | null>(null);

    const onMapReady = (event: KmlMapEvent): void => {
        Dialogs.alert("Map is ready!");
    };

    const onMapTap = (args: { latitude: number; longitude: number }): void => {
        if (mapState.isDrawing) {
            const point: LatLng = {
                latitude: args.latitude,
                longitude: args.longitude
            };
            setMapState((prevState) => ({
                ...prevState,
                temporaryPoints: [...prevState.temporaryPoints, point],
            }));
        }
    };

    const startDrawing = (): void => {
        setMapState({ isDrawing: true, temporaryPoints: [] });
        setSatelliteData(null);
    };

    const finishDrawing = (): void => {
        const newForestArea: ForestArea = {
            points: mapState.temporaryPoints,
            id: Date.now().toString(),
            name: `Forest Area ${Date.now()}`
        };
        console.log("Forest area drawn:", newForestArea);
        setMapState({ isDrawing: false, temporaryPoints: [] });
    };

    const calculateCenterPoint = (points: LatLng[]): LatLng => {
        if (points.length === 0) return { latitude: 0, longitude: 0 };
        
        const sum = points.reduce((acc, point) => ({
            latitude: acc.latitude + point.latitude,
            longitude: acc.longitude + point.longitude
        }), { latitude: 0, longitude: 0 });

        return {
            latitude: sum.latitude / points.length,
            longitude: sum.longitude / points.length
        };
    };

    const loadSatelliteData = async (): Promise<void> => {
        if (mapState.temporaryPoints.length === 0) {
            await Dialogs.alert({
                title: "Error",
                message: "Please draw a forest area first",
                okButtonText: "OK"
            });
            return;
        }

        setLoading(true);
        try {
            const centerPoint = calculateCenterPoint(mapState.temporaryPoints);
            const data = await fetchSatelliteData(centerPoint.latitude, centerPoint.longitude);
            setSatelliteData(data);
            
            await Dialogs.alert({
                title: "Satellite Data",
                message: `Date: ${data.date}\nNDVI: ${data.ndvi.toFixed(2)}\nCloud Cover: ${data.cloudCover.toFixed(2)}%`,
                okButtonText: "OK"
            });
        } catch (error) {
            console.error("Error loading satellite data:", error);
            await Dialogs.alert({
                title: "Error",
                message: "Failed to load satellite data",
                okButtonText: "OK"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <flexboxLayout flexDirection="column" height="100%">
            <MapView
    style={{ flex: 1 }} // Make sure the map fills the container
    initialRegion={{
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: 0.0922,  // Adjust as per your zoom preference
        longitudeDelta: 0.0421  // Adjust as per your zoom preference
    }}
    onKmlReady={onMapReady}
    onPress={(e) => onMapTap(e.nativeEvent.coordinate)} // Handle map taps using onPress
>
    {mapState.temporaryPoints.map((point, index) => (
        <Marker
            key={`marker-${index}`}
            coordinate={{ latitude: point.latitude, longitude: point.longitude }}
        />
    ))}
    {mapState.temporaryPoints.length > 1 && (
        <Polygon
            coordinates={mapState.temporaryPoints}
            strokeColor="#FF0000"
            fillColor="#7FFF0000"
            strokeWidth={2}
        />
    )}
</MapView>

        </flexboxLayout>
    );
}
