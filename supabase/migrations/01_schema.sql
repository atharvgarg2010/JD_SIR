-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  email text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a table for assessments
create table assessments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  dimension_scores jsonb not null,
  raw_answers jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a table for generated reports
create table reports (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  assessment_id uuid references assessments(id) not null,
  markdown_content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;
alter table assessments enable row level security;
alter table reports enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

create policy "Users can view their own assessments." on assessments
  for select using (auth.uid() = user_id);

create policy "Users can insert their own assessments." on assessments
  for insert with check (auth.uid() = user_id);

create policy "Users can view their own reports." on reports
  for select using (auth.uid() = user_id);

create policy "Users can insert their own reports." on reports
  for insert with check (auth.uid() = user_id);

-- Set up Realtime (optional, but good for interactive features)
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime add table assessments;
alter publication supabase_realtime add table reports;
