import { AuthResponse, RegisterRequest } from '@/types/auth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Simple in-memory user storage for demo
// In production, use a proper database
const users = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // "password"
    createdAt: '2024-01-01T00:00:00.000Z',
  },
];

const JWT_SECRET = 'your-super-secret-jwt-key-change-this-in-production';

export async function POST(request: Request): Promise<Response> {
  try {
    const body: RegisterRequest = await request.json();
    const { name, email, password } = body;

    // Validate input
    if (!name || !email || !password) {
      return Response.json({
        success: false,
        message: 'Name, email, and password are required',
      } as AuthResponse);
    }

    if (password.length < 6) {
      return Response.json({
        success: false,
        message: 'Password must be at least 6 characters long',
      } as AuthResponse);
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return Response.json({
        success: false,
        message: 'Please enter a valid email address',
      } as AuthResponse);
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return Response.json({
        success: false,
        message: 'An account with this email already exists',
      } as AuthResponse);
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    // Add to users array (in production, save to database)
    users.push(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return success response
    return Response.json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
      token,
    } as AuthResponse);

  } catch (error) {
    console.error('Registration error:', error);
    return Response.json({
      success: false,
      message: 'Internal server error',
    } as AuthResponse, { status: 500 });
  }
}