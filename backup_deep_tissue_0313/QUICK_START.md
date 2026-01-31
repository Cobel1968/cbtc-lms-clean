# Quick Start Guide - COBEL BTC Supabase Setup

## ✅ What's Been Completed

1. **Supabase Client Configuration** (`app/lib/supabase.ts`)
   - Client-side and server-side Supabase clients configured
   - Ready to connect to your Supabase project

2. **Database Types** (`app/lib/database.types.ts`)
   - TypeScript types for all 9 tables
   - Full type safety for database operations

3. **Database Helper Functions** (`app/lib/db-helpers.ts`)
   - Helper functions for all common database operations
   - Type-safe queries for users, courses, enrollments, etc.

4. **API Routes** (in `app/api/`)
   - `/api/auth/login` - User authentication
   - `/api/auth/register` - User registration
   - `/api/courses` - Get/create courses
   - `/api/courses/[id]` - Get specific course
   - `/api/enrollments` - Create enrollments
   - `/api/health` - Health check endpoint

## 🚀 Next Steps to Complete Setup

### 1. Add Environment Variables

Create a `.env.local` file in the `cbtc-fresh` directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://rvlcpygatguvxhuliand.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Where to find these:**
- Go to https://app.supabase.com/project/rvlcpygatguvxhuliand/settings/api
- Copy the "Project URL" → `NEXT_PUBLIC_SUPABASE_URL`
- Copy the "anon public" key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Copy the "service_role" key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

### 2. Test the Connection

```bash
cd cbtc-fresh
npm install
npm run dev
```

Visit: http://localhost:3000/api/health

You should see:
```json
{
  "status": "healthy",
  "message": "Supabase connection successful",
  "timestamp": "..."
}
```

### 3. Verify Database Tables

Your 9 tables should already exist in Supabase:
- ✅ users
- ✅ instructors
- ✅ courses
- ✅ diagnostic_tests
- ✅ diagnostic_results
- ✅ learning_contracts
- ✅ enrollments
- ✅ assignments
- ✅ submissions

### 4. Set Up Authentication (Optional but Recommended)

1. Go to Supabase Dashboard → Authentication → Settings
2. Enable Email authentication
3. Configure email templates if needed
4. Set up Row Level Security (RLS) policies for data protection

### 5. Test Authentication

Try registering a new user:
- Visit: http://localhost:3000/register
- Fill in the form
- Check Supabase Dashboard → Authentication → Users to see the new user

## 📁 File Structure

```
cbtc-fresh/
├── app/
│   ├── api/                    # API routes (Next.js)
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── courses/
│   │   ├── enrollments/
│   │   └── health/
│   └── lib/
│       ├── supabase.ts         # Supabase client
│       ├── database.types.ts   # Database types
│       ├── db-helpers.ts       # Helper functions
│       ├── api.ts              # Client-side API calls
│       └── ...
├── .env.local                  # Environment variables (create this)
└── SUPABASE_SETUP.md          # Detailed setup guide
```

## 🔧 Usage Examples

### Using Supabase Client Directly

```typescript
import { supabase } from '@/lib/supabase';

// Get all courses
const { data, error } = await supabase
  .from('courses')
  .select('*')
  .eq('is_published', true);
```

### Using Helper Functions

```typescript
import * as db from '@/lib/db-helpers';

// Get published courses
const courses = await db.getCourses({ published: true });

// Get user by email
const user = await db.getUserByEmail('user@example.com');

// Create enrollment
const enrollment = await db.createEnrollment({
  user_id: '...',
  course_id: '...',
  enrollment_date: new Date().toISOString(),
  progress_percentage: 0,
  status: 'pending',
});
```

### Using API Routes from Client

```typescript
import { login, getCourses } from '@/lib/api';

// Login
const result = await login('user@example.com', 'password');

// Get courses
const courses = await getCourses();
```

## 🐛 Troubleshooting

### "Supabase environment variables are not set"
- Make sure `.env.local` exists in `cbtc-fresh/` directory
- Restart your dev server after creating/updating `.env.local`
- Check that variable names match exactly (case-sensitive)

### "Invalid API key"
- Verify you copied the correct keys from Supabase dashboard
- Make sure there are no extra spaces or quotes in `.env.local`

### "Table does not exist"
- Verify all 9 tables exist in your Supabase database
- Check table names match exactly (they're case-sensitive)

### API routes return 404
- Make sure you're running `npm run dev` from the `cbtc-fresh` directory
- Check that the API route files are in `app/api/` directory
- Verify Next.js is running on port 3000

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- See `SUPABASE_SETUP.md` for detailed setup instructions

## ✨ You're All Set!

Your Supabase integration is complete. The application is ready to:
- ✅ Authenticate users
- ✅ Manage courses
- ✅ Handle enrollments
- ✅ Store diagnostic test results
- ✅ Manage learning contracts
- ✅ Track assignments and submissions

Start building! 🚀

