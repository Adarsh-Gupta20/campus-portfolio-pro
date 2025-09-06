-- Create student profiles table
CREATE TABLE public.student_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  student_id TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  department TEXT,
  year_of_study INTEGER,
  enrollment_year INTEGER,
  cgpa DECIMAL(3,2),
  date_of_birth DATE,
  address TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for student profiles
CREATE POLICY "Students can view their own profile" 
ON public.student_profiles 
FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Students can create their own profile" 
ON public.student_profiles 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Students can update their own profile" 
ON public.student_profiles 
FOR UPDATE 
USING (auth.uid()::text = user_id::text);

-- Create documents table
CREATE TABLE public.student_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  document_type TEXT NOT NULL,
  document_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  upload_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  verified BOOLEAN DEFAULT FALSE,
  verification_date TIMESTAMP WITH TIME ZONE,
  verified_by UUID,
  description TEXT,
  semester INTEGER,
  academic_year TEXT
);

-- Enable RLS
ALTER TABLE public.student_documents ENABLE ROW LEVEL SECURITY;

-- Create policies for student documents
CREATE POLICY "Students can view their own documents" 
ON public.student_documents 
FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Students can create their own documents" 
ON public.student_documents 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Students can update their own documents" 
ON public.student_documents 
FOR UPDATE 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Students can delete their own documents" 
ON public.student_documents 
FOR DELETE 
USING (auth.uid()::text = user_id::text);

-- Create storage buckets for documents
INSERT INTO storage.buckets (id, name, public) VALUES 
('student-documents', 'student-documents', false),
('certificates', 'certificates', false),
('marksheets', 'marksheets', false),
('resumes', 'resumes', false);

-- Create storage policies for student documents
CREATE POLICY "Students can view their own documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id IN ('student-documents', 'certificates', 'marksheets', 'resumes') AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Students can upload their own documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id IN ('student-documents', 'certificates', 'marksheets', 'resumes') AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Students can update their own documents" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id IN ('student-documents', 'certificates', 'marksheets', 'resumes') AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Students can delete their own documents" 
ON storage.objects 
FOR DELETE 
USING (bucket_id IN ('student-documents', 'certificates', 'marksheets', 'resumes') AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_student_profiles_updated_at
BEFORE UPDATE ON public.student_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();