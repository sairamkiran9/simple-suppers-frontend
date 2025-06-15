import { AuthResponse, LoginRequest } from '@/types/auth';
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
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return Response.json({
        success: false,
        message: 'Email and password are required',
      } as AuthResponse);
    }

    // Find user
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return Response.json({
        success: false,
        message: 'Invalid email or password',
      } as AuthResponse);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return Response.json({
        success: false,
        message: 'Invalid email or password',
      } as AuthResponse);
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return success response
    return Response.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      token,
    } as AuthResponse);

  } catch (error) {
    console.error('Login error:', error);
    return Response.json({
      success: false,
      message: 'Internal server error',
    } as AuthResponse, { status: 500 });
  }
}