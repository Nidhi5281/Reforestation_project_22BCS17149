import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type SettingsScreenProps = {
    route: RouteProp<MainStackParamList, "Settings">,
    navigation: FrameNavigationProp<MainStackParamList, "Settings">,
};

export function SettingsScreen({ navigation }: SettingsScreenProps) {
    return (
        <scrollView>
            <flexboxLayout style={styles.container}>
                <label className="text-2xl font-bold mb-4">Settings</label>
                
                <flexboxLayout className="bg-white p-4 rounded-lg shadow mb-4 w-full">
                    <label className="text-lg">Data Refresh Interval</label>
                    <button className="text-green-700">Daily</button>
                </flexboxLayout>

                <flexboxLayout className="bg-white p-4 rounded-lg shadow mb-4 w-full">
                    <label className="text-lg">Satellite Data Source</label>
                    <button className="text-green-700">NASA EOSDIS</button>
                </flexboxLayout>
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