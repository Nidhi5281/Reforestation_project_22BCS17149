import { ForumPost, ForumComment } from '../types/forum';

// Simulated data - replace with actual API calls in production
const mockPosts: ForumPost[] = [
    {
        id: '1',
        title: 'Best practices for forest conservation',
        content: 'I've been monitoring a local forest area and noticed some interesting patterns...',
        author: 'EcoExpert',
        createdAt: new Date('2024-01-15'),
        likes: 24,
        comments: [
            {
                id: '1',
                content: 'Great insights! Have you considered seasonal variations?',
                author: 'ForestGuardian',
                createdAt: new Date('2024-01-16'),
                likes: 5
            }
        ],
        tags: ['conservation', 'monitoring', 'best-practices']
    },
    {
        id: '2',
        title: 'New satellite data interpretation techniques',
        content: 'Recently discovered some effective ways to analyze NDVI data...',
        author: 'SatellitePro',
        createdAt: new Date('2024-01-14'),
        likes: 18,
        comments: [],
        tags: ['satellite', 'data-analysis', 'NDVI']
    }
];

export async function fetchForumPosts(): Promise<ForumPost[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockPosts;
}

export async function createForumPost(post: Omit<ForumPost, 'id' | 'createdAt' | 'likes' | 'comments'>): Promise<ForumPost> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
        ...post,
        id: Date.now().toString(),
        createdAt: new Date(),
        likes: 0,
        comments: []
    };
}