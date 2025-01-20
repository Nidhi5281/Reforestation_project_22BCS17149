export interface ForumPost {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: Date;
    likes: number;
    comments: ForumComment[];
    tags: string[];
}

export interface ForumComment {
    id: string;
    content: string;
    author: string;
    createdAt: Date;
    likes: number;
}