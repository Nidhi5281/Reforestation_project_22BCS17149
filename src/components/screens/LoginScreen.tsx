import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { login, register } from "../../services/auth";
import { Dialogs } from "@nativescript/core";

type LoginScreenProps = {
    route: RouteProp<MainStackParamList, "Login">,
    navigation: FrameNavigationProp<MainStackParamList, "Login">,
};

export function LoginScreen({ navigation }: LoginScreenProps) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [isRegister, setIsRegister] = React.useState(false);

    const handleSubmit = async () => {
        if (!email || !password) {
            Dialogs.alert({
                title: "Error",
                message: "Please fill in all fields",
                okButtonText: "OK"
            });
            return;
        }

        try {
            setIsLoading(true);
            if (isRegister) {
                const username = email.split('@')[0]; // Simple username generation
                await register(username, email, password);
                Dialogs.alert({
                    title: "Success",
                    message: "Account created successfully! Please log in.",
                    okButtonText: "OK"
                });
                setIsRegister(false);
            } else {
                await login(email, password);
                navigation.replace("Forum");
            }
        } catch (error) {
            Dialogs.alert({
                title: "Error",
                message: error.message || "An error occurred",
                okButtonText: "OK"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <flexboxLayout style={styles.container}>
            <flexboxLayout className="bg-white p-6 rounded-lg shadow-lg w-4/5">
                <label className="text-2xl font-bold mb-6 text-center">
                    {isRegister ? "Create Account" : "Welcome Back"}
                </label>

                <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
                <textField
                    className="border border-gray-300 rounded-lg p-3 mb-4"
                    hint="Enter your email"
                    keyboardType="email"
                    text={email}
                    onTextChange={(args) => setEmail(args.value)}
                />

                <label className="text-sm font-medium text-gray-700 mb-1">Password</label>
                <textField
                    className="border border-gray-300 rounded-lg p-3 mb-6"
                    hint="Enter your password"
                    secure={true}
                    text={password}
                    onTextChange={(args) => setPassword(args.value)}
                />

                <button
                    className="bg-green-700 text-white p-3 rounded-lg mb-4"
                    onTap={handleSubmit}
                    isEnabled={!isLoading}
                >
                    {isLoading ? "Loading..." : (isRegister ? "Sign Up" : "Log In")}
                </button>

                <button
                    className="text-green-700"
                    onTap={() => setIsRegister(!isRegister)}
                >
                    {isRegister ? "Already have an account? Log in" : "Need an account? Sign up"}
                </button>
            </flexboxLayout>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5"
    }
});