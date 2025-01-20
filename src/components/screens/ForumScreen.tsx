import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { Dialogs } from "@nativescript/core";

type ForumScreenProps = {
    route: RouteProp<MainStackParamList, "Forum">,
    navigation: FrameNavigationProp<MainStackParamList, "Forum">,
};

export function ForumScreen({ navigation }: ForumScreenProps) {
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            setLoading(true);
            // Simulate loading posts
            await new Promise(resolve => setTimeout(resolve, 1000));
            setPosts([
                {
                    id: '1',
                    title: 'Forest Conservation Tips',
                    content: 'Here are some best practices...',
                    author: 'EcoExpert',
                    date: new Date().toLocaleDateString()
                }
            ]);
        } catch (error) {
            console.error("Failed to load posts:", error);
            Dialogs.alert({
                title: "Error",
                message: "Failed to load posts",
                okButtonText: "OK"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <flexboxLayout style={styles.container}>
            <scrollView>
                <flexboxLayout className="p-4">
                    {loading ? (
                        <activityIndicator busy={true} />
                    ) : (
                        posts.map(post => (
                            <flexboxLayout 
                                key={post.id} 
                                className="bg-white p-4 rounded-lg shadow-md mb-4"
                            >
                                <label className="text-xl font-bold">{post.title}</label>
                                <label className="text-gray-600">{post.content}</label>
                                <label className="text-sm text-gray-500">
                                    Posted by {post.author} • {post.date}
                                </label>
                            </flexboxLayout>
                        ))
                    )}
                </flexboxLayout>
            </scrollView>
            
            <button
                className="bg-green-700 text-white p-4 rounded-lg m-4"
                onTap={() => navigation.navigate("Login")}
            >
                Sign in to Post
            </button>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column"
    }
});