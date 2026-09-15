-- IDAEVIA · Supabase schema
-- Run in the Supabase SQL editor. Row Level Security is ENABLED on every table
-- and NO policies are created on purpose: the browser's anon key can neither
-- read nor write anything. Only the server (service role key, kept in env)
-- talks to these tables.

create table if not exists public.visitors (
  id          text primary key,
  first_seen  bigint not null,
  last_seen   bigint not null,
  visits      integer not null default 0
);

create table if not exists public.sessions (
  id          text primary key,
  visitor_id  text not null references public.visitors(id) on delete cascade,
  started     bigint not null,
  last_seen   bigint not null,
  path        text not null,
  device      text,
  country     text
);
create index if not exists sessions_last_seen_idx on public.sessions (last_seen desc);

create table if not exists public.pageviews (
  id          bigserial primary key,
  ts          bigint not null,
  visitor_id  text not null,
  session_id  text not null,
  path        text not null,
  referrer    text,
  ua          text,
  device      text,
  country     text,
  screen_w    integer
);
create index if not exists pageviews_ts_idx on public.pageviews (ts desc);

create table if not exists public.submissions (
  id          bigserial primary key,
  ts          bigint not null,
  type        text,
  idea        text,
  name        text not null,
  company     text,
  email       text not null,
  budget      text,
  status      text not null default 'new' check (status in ('new','contacted','in_progress','won','archived')),
  country     text,
  source      text
);
create index if not exists submissions_ts_idx on public.submissions (ts desc);

-- Lock everything down. Service role bypasses RLS; anon/authenticated get nothing.
alter table public.visitors    enable row level security;
alter table public.sessions    enable row level security;
alter table public.pageviews   enable row level security;
alter table public.submissions enable row level security;

revoke all on public.visitors, public.sessions, public.pageviews, public.submissions from anon, authenticated;
