'use client';
export const dynamic = 'force-dynamic';
// app/lib/auth.ts
// Ensure 'types' is lowercase to match our new file structure
import { User } from './types';

const TOKEN_KEY = 'cbtc_token';
const USER_KEY = 'cbtc_user';

export function saveAuth(token: string, user: User): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

export function getUser(): User | null {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem(USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr) as User;
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
  }
  return null;
}

export function clearAuth(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}

export function isAdmin(): boolean {
  const user = getUser();
  if (!user) return false;
  return user.role === 'admin' || user.role === 'super_admin';
}

export function isSuperAdmin(): boolean {
  const user = getUser();
  if (!user) return false;
  return user.role === 'super_admin';
}

export function isStudent(): boolean {
  const user = getUser();
  if (!user) return false;
  return user.role === 'student';
}

export function isInstructor(): boolean {
  const user = getUser();
  if (!user) return false;
  return user.role === 'instructor';
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * BILINGUAL VALIDATION
 * Addresses bilingual friction by providing clear feedback in French.
 */
export function validatePassword(password: string): { isValid: boolean; error?: string } {
  if (password.length < 8) {
    return { isValid: false, error: 'Le mot de passe doit contenir au moins 8 caractères' };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Le mot de passe doit contenir au moins une majuscule' };
  }
  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: 'Le mot de passe doit contenir au moins une minuscule' };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'Le mot de passe doit contenir au moins un chiffre' };
  }
  return { isValid: true };
}

export function getUserFullName(): string {
  const user = getUser();
  if (!user) return '';
  
  if (user.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`;
  }
  
  return user.email;
}

export function getUserInitials(): string {
  const user = getUser();
  if (!user) return '??';
  
  if (user.first_name && user.last_name) {
    return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();
  }
  
  return user.email.substring(0, 2).toUpperCase();
}
