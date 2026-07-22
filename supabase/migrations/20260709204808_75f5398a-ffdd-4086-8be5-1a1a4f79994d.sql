DROP POLICY IF EXISTS "Anyone can log a 404 hit" ON public.not_found_hits;

CREATE POLICY "Anyone can log a 404 hit"
ON public.not_found_hits
FOR INSERT
TO anon, authenticated
WITH CHECK (
  path IS NOT NULL
  AND length(path) > 0
  AND length(path) <= 2048
  AND (referrer IS NULL OR length(referrer) <= 2048)
  AND (user_agent IS NULL OR length(user_agent) <= 1024)
);