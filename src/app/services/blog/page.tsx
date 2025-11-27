"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Calendar, Clock, Play, TrendingUp, Users, DollarSign, Briefcase } from 'lucide-react';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import { useLanguage } from '@/contexts/language-context';

// Definir tipos para evitar errores de TypeScript
type Category = 'todos' | 'finanzas' | 'consultoria' | 'tendencias';

type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  youtubeId: string | null;
  category: Category;
  tags: string[];
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
  };
  isVideoOnly?: boolean; // Nuevo: indica si el post es solo video (como un short)
  videoTitle?: string; // Nuevo: título específico para el video si es solo video
};

type CategoryItem = {
  label: string;
  value: Category;
};

// Declarar todas las traducciones y datos arriba (todo en una sola hoja)
const translations = {
  es: {
    blog: {
      badge: 'Blog de Consultoría',
      title: 'Insights y Tendencias',
      description: 'Mantente actualizado con noticias reales, análisis profundos y estrategias basadas en datos.',
      noPosts: 'No hay posts en esta categoría todavía',
      introVideoUrl: 'https://youtu.be/wwSXz0JJje8?si=llt6h2kl9qnK3pIe', // Cambiado a URL completo en lugar de ID
      readMore: 'Leer más',
      categories: [
        { label: 'Todos', value: 'todos' as Category },
        { label: 'Finanzas', value: 'finanzas' as Category },
        { label: 'Consultoría', value: 'consultoria' as Category },
        { label: 'Tendencias', value: 'tendencias' as Category },
      ] as CategoryItem[],
      posts: [
        {
          id: 1,
          title: 'Proyecciones Económicas Globales para 2025',
          slug: 'proyecciones-economicas-2025',
          excerpt: 'Un análisis respaldado por datos del FMI y el Banco Mundial sobre el crecimiento económico esperado para 2025.',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80',
          youtubeId: null,
          category: 'finanzas' as Category,
          tags: ['economía', 'macroeconomía', 'global'],
          date: '2024-12-01',
          readTime: '6 min',
          author: {
            name: 'María Fernández',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          },
          isVideoOnly: false, // Nuevo: indica que no es solo video
        },
        {
          id: 2,
          title: 'IA en Consultoría: Cómo las Empresas Están Transformando su Estrategia',
          slug: 'ia-consultoria-transformacion',
          excerpt: 'Un vistazo al impacto real de la inteligencia artificial en firmas de consultoría como McKinsey, BCG y Deloitte.',
          image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/1e59a2b4-1255-4495-a26b-2e5ea7a74660/generated_images/financial-advisory-concept-illustration--17047cd6-20251029233035.jpg',
          youtubeId: 'dQw4w9WgXcQ',
          category: 'consultoria' as Category,
          tags: ['IA', 'consultoría', 'negocios'],
          date: '2024-11-20',
          readTime: '8 min',
          author: {
            name: 'Carlos López',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          },
          isVideoOnly: false, // Nuevo: indica que no es solo video
        },
        {
          id: 3,
          title: 'Tendencias Empresariales que Dominarán 2025',
          slug: 'tendencias-empresariales-2025',
          excerpt: 'Automatización, análisis predictivo y sostenibilidad serán los pilares claves del crecimiento.',
          image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/1e59a2b4-1255-4495-a26b-2e5ea7a74660/generated_images/accounting-and-business-management-conce-8c2a96f2-20251029233035.jpg',
          youtubeId: null,
          category: 'tendencias' as Category,
          tags: ['tendencias', 'negocios', 'innovación'],
          date: '2024-10-15',
          readTime: '5 min',
          author: {
            name: 'Laura Gómez',
            avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
          },
          isVideoOnly: false, // Nuevo: indica que no es solo video
        },
        // Ejemplo de post solo video (como un short)
        {
          id: 4,
          title: 'Short: Tendencia Rápida en Finanzas 2025',
          slug: 'short-tendencia-finanzas-2025',
          excerpt: '', // Vacío para posts solo video
          image: '', // Vacío para posts solo video
          youtubeId: 'dQw4w9WgXcQ', // ID del video short
          category: 'finanzas' as Category,
          tags: ['short', 'finanzas', 'tendencia'],
          date: '2024-11-25',
          readTime: '1 min', // Tiempo de lectura corto para shorts
          author: {
            name: 'Ana Ruiz',
            avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
          },
          isVideoOnly: true, // Nuevo: indica que es solo video
          videoTitle: 'Tendencia Rápida en Finanzas 2025', // Nuevo: título específico para el video
        },
      ] as Post[],
    },
  },

  en: {
    blog: {
      badge: 'Consulting Blog',
      title: 'Insights and Trends',
      description: 'Stay updated with real news, in-depth analysis, and data-driven strategies.',
      noPosts: 'No posts in this category yet',
      introVideoUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID_HERE', // Cambiado a URL completo en lugar de ID
      readMore: 'Read more',
      categories: [
        { label: 'All', value: 'todos' as Category },
        { label: 'Finance', value: 'finanzas' as Category },
        { label: 'Consulting', value: 'consultoria' as Category },
        { label: 'Trends', value: 'tendencias' as Category },
      ] as CategoryItem[],
      posts: [
        {
          id: 1,
          title: 'Global Economic Outlook for 2025',
          slug: 'global-economic-outlook-2025',
          excerpt: 'A data-based analysis from IMF and World Bank forecasts for 2025 global growth.',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80',
          youtubeId: null,
          category: 'finanzas' as Category,
          tags: ['economy', 'macroeconomics', 'global'],
          date: '2024-12-01',
          readTime: '6 min',
          author: {
            name: 'Maria Fernandez',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          },
          isVideoOnly: false, // Nuevo: indica que no es solo video
        },
        {
          id: 2,
          title: 'AI in Consulting: How Firms Are Transforming Strategy',
          slug: 'ai-consulting-strategy',
          excerpt: 'A look into how AI is reshaping consulting firms like McKinsey, BCG, and Deloitte.',
          image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/1e59a2b4-1255-4495-a26b-2e5ea7a74660/generated_images/financial-advisory-concept-illustration--17047cd6-20251029233035.jpg',
          youtubeId: 'dQw4w9WgXcQ',
          category: 'consultoria' as Category,
          tags: ['AI', 'consulting', 'business'],
          date: '2024-11-20',
          readTime: '8 min',
          author: {
            name: 'Carlos Lopez',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          },
          isVideoOnly: false, // Nuevo: indica que no es solo video
        },
        {
          id: 3,
          title: 'Business Trends That Will Dominate 2025',
          slug: 'business-trends-2025',
          excerpt: 'Automation, predictive analytics, and sustainability will drive the next wave of growth.',
          image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/1e59a2b4-1255-4495-a26b-2e5ea7a74660/generated_images/accounting-and-business-management-conce-8c2a96f2-20251029233035.jpg',
          youtubeId: null,
          category: 'tendencias' as Category,
          tags: ['trends', 'innovation', 'business'],
          date: '2024-10-15',
          readTime: '5 min',
          author: {
            name: 'Laura Gomez',
            avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
          },
          isVideoOnly: false, // Nuevo: indica que no es solo video
        },
        // Ejemplo de post solo video (como un short)
        {
          id: 4,
          title: 'Short: Quick Finance Trend 2025',
          slug: 'short-quick-finance-trend-2025',
          excerpt: '', // Vacío para posts solo video
          image: '', // Vacío para posts solo video
          youtubeId: 'dQw4w9WgXcQ', // ID del video short
          category: 'finanzas' as Category,
          tags: ['short', 'finance', 'trend'],
          date: '2024-11-25',
          readTime: '1 min', // Tiempo de lectura corto para shorts
          author: {
            name: 'Ana Ruiz',
            avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
          },
          isVideoOnly: true, // Nuevo: indica que es solo video
          videoTitle: 'Quick Finance Trend 2025', // Nuevo: título específico para el video
        },
      ] as Post[],
    },
  },
};


function getCategoryIcon(category: Category) {
  switch (category) {
    case 'finanzas':
      return <DollarSign className="h-4 w-4" />;
    case 'consultoria':
      return <Briefcase className="h-4 w-4" />;
    case 'tendencias':
      return <TrendingUp className="h-4 w-4" />;
    default:
      return <Users className="h-4 w-4" />;
  }
}

export default function BlogPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const categories = t.blog.categories;
  const posts = t.blog.posts;
  const [selectedCategory, setSelectedCategory] = useState<Category>('todos');

  const filteredPosts = selectedCategory === 'todos'
    ? posts
    : posts.filter((post: Post) => post.category === selectedCategory);

  const featuredPost = posts.find((post: Post) => post.category === 'finanzas'); // Ejemplo: el primer post de finanzas como destacado

  return (
  <>
    <Header />
    <div className="min-h-screen bg-blue-950 -mt-20 pt-20"> {/* Agregado pt-20 para padding top */}
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-12 mt-8">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="mb-4 bg-teal-500 text-white">
            {t.blog.badge}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold tracking-tight text-white">
            {t.blog.title}
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            {t.blog.description}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category: CategoryItem) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.value)}
              className={`rounded-md ${
                selectedCategory === category.value
                  ? "bg-teal-500 hover:bg-teal-600 text-white"
                  : "border-teal-500 text-teal-500 bg-transparent hover:bg-teal-500/10"
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Video de Presentación */}
        {selectedCategory === "todos" && t.blog.introVideoUrl && (
          <div className="mb-12 flex justify-center">
            <div className="relative w-full max-w-4xl h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
              {/* Capa que bloquea interacción */}
              <div className="absolute inset-0 z-10 pointer-events-none"></div>
              <iframe
                className="w-full h-full pointer-events-none"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(t.blog.introVideoUrl)}?autoplay=1&mute=1&loop=1&playlist=${getYouTubeVideoId(t.blog.introVideoUrl)}&controls=0&modestbranding=1&rel=0&disablekb=1`}
                title="Video de Presentación"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        )}

        {/* Featured Post */}
        {selectedCategory === "todos" && featuredPost && (
          <Card className="mb-12 overflow-hidden border-2 border-blue-800 hover:shadow-2xl transition-all duration-300 rounded-lg bg-blue-900/50">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-full rounded-l-lg overflow-hidden">
                {featuredPost.youtubeId ? (
                  <div className="relative w-full h-full">
                    <iframe
                      className="w-full h-full rounded-l-lg"
                      src={`https://www.youtube.com/embed/${featuredPost.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${featuredPost.youtubeId}`}
                      title={featuredPost.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <Badge className="absolute top-4 left-4 z-10 bg-teal-500 text-white">
                      Destacado
                    </Badge>
                  </div>
                ) : (
                  <>
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover rounded-l-lg"
                    />
                    <Badge className="absolute top-4 left-4 bg-teal-500 text-white">
                      Destacado
                    </Badge>
                  </>
                )}
              </div>
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {getCategoryIcon(featuredPost.category)}
                    <Badge variant="outline" className="capitalize border-teal-500 text-teal-400">
                      {featuredPost.category}
                    </Badge>
                  </div>
                  <h2 className="text-3xl font-serif font-bold mb-4 hover:text-teal-400 transition-colors text-white">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <p className="text-blue-200 mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-blue-300 mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredPost.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <span className="font-medium text-white">{featuredPost.author.name}</span>
                  </div>
                  <Button asChild className="bg-teal-500 hover:bg-teal-600 text-white rounded-md">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      {t.blog.readMore}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </section>

      {/* Blog Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post: Post) => (
            <Card 
              key={post.id} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col rounded-lg bg-blue-900/50 border border-blue-800"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  {post.isVideoOnly && post.youtubeId ? (
                    <iframe
                      className="w-full h-full rounded-t-lg"
                      src={`https://www.youtube.com/embed/${post.youtubeId}?controls=1&modestbranding=1&rel=0`}
                      title={post.videoTitle || post.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-300 rounded-t-lg"
                      />
                      {post.youtubeId && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-t-lg">
                          <div className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center">
                            <Play className="h-6 w-6 text-teal-500 ml-1" />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="capitalize flex items-center gap-1 bg-teal-500 text-white">
                      {getCategoryIcon(post.category)}
                      {post.category}
                    </Badge>
                  </div>
                </div>
              </Link>
              <CardHeader>
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-serif font-bold line-clamp-2 hover:text-teal-400 transition-colors text-white">
                    {post.isVideoOnly ? (post.videoTitle || post.title) : post.title}
                  </h3>
                </Link>
              </CardHeader>
              <CardContent className="flex-grow">
                {!post.isVideoOnly && (
                  <>
                    <p className="text-blue-200 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.slice(0, 2).map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-xs border-teal-500 text-teal-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </>
                )}
                {post.isVideoOnly && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.slice(0, 2).map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs border-teal-500 text-teal-400">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex items-center justify-between pt-4 border-t border-blue-800">
                <div className="flex items-center gap-2">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-white">{post.author.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-blue-300">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-blue-200">
              {t.blog.noPosts}
            </p>
          </div>
        )}
      </section>
    </div>
    <Footer />
  </>
);

// Función helper para extraer el ID del video de YouTube desde una URL completa
function getYouTubeVideoId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
}