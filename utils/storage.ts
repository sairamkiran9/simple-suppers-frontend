import { Platform } from 'react-native';

// Simple in-memory storage for web and mobile compatibility
class SimpleStorage {
  private storage: { [key: string]: string } = {};

  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
    return this.storage[key] || null;
  }

  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    } else {
      this.storage[key] = value;
    }
  }

  async removeItem(key: string): Promise<void> {
    if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    } else {
      delete this.storage[key];
    }
  }
}

export const storage = new SimpleStorage();