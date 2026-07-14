GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, anon;
GRANT SELECT ON public.user_roles TO authenticated;

DO $$ BEGIN
  CREATE POLICY "Users can read own roles" ON public.user_roles
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;