-- Allow admin users to upload/read/delete files in the private "media" bucket.
DO $$ BEGIN
  CREATE POLICY "Admins can read media" ON storage.objects FOR SELECT
    USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Admins can upload media" ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Admins can update media" ON storage.objects FOR UPDATE
    USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Admins can delete media" ON storage.objects FOR DELETE
    USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;