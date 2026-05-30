
-- 1) Restrictive policy preventing privilege escalation on user_roles
CREATE POLICY "Only admins can modify roles (restrictive)"
ON public.user_roles
AS RESTRICTIVE
FOR ALL
TO anon, authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 2) Revoke EXECUTE on has_role from anon/authenticated; it's used by RLS via SECURITY DEFINER internally
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;

-- 3) Make media bucket private
UPDATE storage.buckets SET public = false WHERE id = 'media';
