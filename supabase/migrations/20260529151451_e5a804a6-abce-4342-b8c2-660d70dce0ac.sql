CREATE TABLE public.not_found_hits (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  path text NOT NULL,
  referrer text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.not_found_hits TO anon, authenticated;
GRANT ALL ON public.not_found_hits TO service_role;

ALTER TABLE public.not_found_hits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log a 404 hit"
ON public.not_found_hits
FOR INSERT
TO anon, authenticated
WITH CHECK (true);