
DROP POLICY IF EXISTS "Only admins can modify roles (restrictive)" ON public.user_roles;

CREATE POLICY "Only admins can insert roles (restrictive)"
ON public.user_roles AS RESTRICTIVE FOR INSERT
TO anon, authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Only admins can update roles (restrictive)"
ON public.user_roles AS RESTRICTIVE FOR UPDATE
TO anon, authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Only admins can delete roles (restrictive)"
ON public.user_roles AS RESTRICTIVE FOR DELETE
TO anon, authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));
