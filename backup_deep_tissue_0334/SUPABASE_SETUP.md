# Supabase Setup Guide for COBEL BTC

This guide will help you complete the Supabase integration for cobelbtc.com.

## Prerequisites

1. Supabase project is already created
2. Database tables are already set up (9 tables confirmed):
   - users
   - instructors
   - courses
   - diagnostic_tests
   - diagnostic_results
   - learning_contracts
   - enrollments
   - assignments
   - submissions

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase project: https://app.supabase.com/project/rvlcpygatguvxhuliand
2. Navigate to **Settings** > **API**
3. Copy the following values:
   - **Project URL**: `https://rvlcpygatguvxhuliand.supabase.co`
   - **anon/public key**: This is your public API key
   - **service_role key**: This is your secret key (keep it secure!)

## Step 2: Create Environment Variables

Create a `.env.local` file in the `cbtc-fresh` directory with the following:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://rvlcpygatguvxhuliand.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Optional: API URL for backward compatibility
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Important**: 
- Replace `your_anon_key_here` with your actual anon/public key
- Replace `your_service_role_key_here` with your actual service_role key
- Never commit `.env.local` to version control (it's already in .gitignore)

## Step 3: Verify Database Schema

The database types are defined in `app/lib/database.types.ts`. Make sure your Supabase tables match this structure:

### Key Tables Structure:

1. **users**: User accounts with roles (student, instructor, admin, super_admin)
2. **instructors**: Instructor profiles linked to users
3. **courses**: Course information with bilingual content
4. **diagnostic_tests**: Tests for course placement
5. **diagnostic_results**: Results from diagnostic tests
6. **learning_contracts**: Contracts between students and courses
7. **enrollments**: Student enrollments in courses
8. **assignments**: Course assignments
9. **submissions**: Student assignment submissions

## Step 4: Set Up Row Level Security (RLS)

For production, you should set up Row Level Security policies in Supabase:

1. Go to **Authentication** > **Policies** in your Supabase dashboard
2. Enable RLS on all tables
3. Create policies for:
   - Users can read their own data
   - Instructors can read/write their courses
   - Students can read published courses
   - Students can create their own enrollments

## Step 5: Test the Connection

Run the development server:

```bash
npm run dev
```

The Supabase client is configured in `app/lib/supabase.ts` and helper functions are available in `app/lib/db-helpers.ts`.

## Next Steps

1. Update API routes to use Supabase (see `app/api/` directory)
2. Replace mock data with real database queries
3. Implement authentication using Supabase Auth
4. Set up file storage for course images/videos

## Troubleshooting

### Common Issues:

1. **"Supabase environment variables are not set"**
   - Make sure `.env.local` exists and has the correct variable names
   - Restart your development server after creating/updating `.env.local`

2. **"Invalid API key"**
   - Double-check that you copied the correct keys from Supabase dashboard
   - Make sure there are no extra spaces or quotes

3. **"Table does not exist"**
   - Verify that all 9 tables are created in your Supabase database
   - Check that table names match exactly (case-sensitive)

## Support

For Supabase-specific issues, refer to:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

