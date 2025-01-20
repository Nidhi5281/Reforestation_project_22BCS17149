// types/NavigationParamList.ts


export type MainStackParamList = {
    Map: { initialRegion?:LatLng };
    Dashboard: undefined;
    Login: undefined;
    // Add other routes as needed
};

// Simplified navigation prop type without external dependency
export type MainStackNavigationProp<T extends keyof MainStackParamList> = {
    navigate: (screen: keyof MainStackParamList) => void;
    goBack: () => void;
    setOptions: (options: {
        title?: string;
        headerShown?: boolean;
        // Add other navigation options as needed
    }) => void;
};


// types/map.ts
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
    // Add other properties as needed
}

export interface MapState {
    isDrawing: boolean;
    temporaryPoints: LatLng[];
}