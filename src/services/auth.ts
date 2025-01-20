import { User } from '../types/auth';

// Mock user data
const mockUsers = [
    {
        id: '1',
        username: 'demo',
        email: 'demo@example.com',
        password: 'demo123', // In a real app, this would be hashed
        createdAt: new Date('2024-01-01')
    }
];

export async function login(email: string, password: string): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

export async function register(username: string, email: string, password: string): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    if (mockUsers.some(u => u.email === email)) {
        throw new Error('User already exists');
    }

    const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password,
        createdAt: new Date()
    };

    mockUsers.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
}