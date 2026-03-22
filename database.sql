-- Tabela de Profissionais
CREATE TABLE professionals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  registration TEXT,
  specialty TEXT,
  image_url TEXT,
  status TEXT DEFAULT 'Ativo',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabela de Conteúdo do Site (Hero, Textos, etc)
CREATE TABLE site_content (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Inserir dados iniciais para o Hero
INSERT INTO site_content (key, value) VALUES 
('hero_title', 'Inovação e Arte em cada detalhe do seu sorriso.'),
('hero_subtitle', 'Uma abordagem moderna e sofisticada onde a odontologia de alta performance se une ao conhecimento de mestres e doutores.'),
('hero_badge', 'EXCELÊNCIA CLÍNICA & ACADÊMICA');

-- Habilitar RLS (Row Level Security)
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Criar políticas para visualização pública
CREATE POLICY "Public Read" ON professionals FOR SELECT USING (true);
CREATE POLICY "Public Read" ON site_content FOR SELECT USING (true);

-- Criar políticas para edição (Somente Autenticados)
CREATE POLICY "Admin All" ON professionals FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All" ON site_content FOR ALL USING (auth.role() = 'authenticated');

-- Bucket para Fotos
-- (Isso deve ser feito na interface do Supabase, mas aqui está a referência)
-- Nome do Bucket: 'clinic-assets'
