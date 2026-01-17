import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [words] = useState(['инновация', 'эмоция', 'конверсия', 'эволюция']);
  const [currentWord, setCurrentWord] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setCursorTrail(prev => [
        ...prev.slice(-8),
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ]);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector((link as HTMLAnchorElement).getAttribute('href')!);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setMobileMenuOpen(false);
        }
      });
    });
  }, []);

  const services = [
    {
      icon: 'Palette',
      title: 'Стратегия и дизайн',
      description: 'Создаём визуальные концепции, которые превращают идеи в цифровые шедевры'
    },
    {
      icon: 'Code2',
      title: 'Разработка под ключ',
      description: 'Комплексная разработка от прототипа до запуска в продакшн'
    },
    {
      icon: 'Sparkles',
      title: 'Интеграция AI',
      description: 'Внедряем искусственный интеллект для создания персонализированного опыта'
    },
    {
      icon: 'Zap',
      title: 'Поддержка и эволюция',
      description: 'Непрерывное развитие и оптимизация вашего цифрового продукта'
    }
  ];

  const portfolio = [
    { title: 'FinTech Platform', category: 'Web App', color: 'from-neon-cyan to-neon-purple' },
    { title: 'E-commerce', category: 'Mobile First', color: 'from-neon-purple to-neon-green' },
    { title: 'AI Dashboard', category: 'Enterprise', color: 'from-neon-green to-neon-cyan' },
    { title: 'Social Network', category: 'Startup', color: 'from-neon-cyan to-neon-green' }
  ];

  const philosophy = [
    {
      icon: 'Brain',
      title: 'Адаптивный разум',
      description: 'Интерфейсы, которые думают вместе с пользователем',
      image: 'https://cdn.poehali.dev/projects/01771b31-7832-47b1-b7ab-dce68b7575ce/files/44ce0f80-ca68-4e1a-b674-b09ee2e6c052.jpg'
    },
    {
      icon: 'Eye',
      title: 'Цифровая эстетика',
      description: 'Визуальная гармония на стыке искусства и технологий',
      image: 'https://cdn.poehali.dev/projects/01771b31-7832-47b1-b7ab-dce68b7575ce/files/44ce0f80-ca68-4e1a-b674-b09ee2e6c052.jpg'
    },
    {
      icon: 'Cpu',
      title: 'Безупречный код',
      description: 'Производительность и масштабируемость в каждой строке',
      image: 'https://cdn.poehali.dev/projects/01771b31-7832-47b1-b7ab-dce68b7575ce/files/44ce0f80-ca68-4e1a-b674-b09ee2e6c052.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden cursor-none">
      <div
        className="fixed w-6 h-6 rounded-full border-2 border-neon-cyan pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      />
      {cursorTrail.map((trail, index) => (
        <div
          key={trail.id}
          className="fixed w-2 h-2 rounded-full bg-neon-cyan pointer-events-none z-[9998]"
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
            transform: 'translate(-50%, -50%)',
            opacity: (index + 1) / cursorTrail.length * 0.4,
            transition: 'opacity 0.3s ease-out'
          }}
        />
      ))}


      <div className="relative z-10">
        <nav className="fixed top-0 left-0 right-0 z-50 glass-morph border-b border-neon-cyan/20">
          <div className="max-w-[1440px] mx-auto px-10 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold gradient-text">NEXUS</div>
            <div className="hidden md:flex gap-8 items-center">
              <a href="#philosophy" className="text-sm hover:text-neon-cyan transition-colors">Философия</a>
              <a href="#services" className="text-sm hover:text-neon-cyan transition-colors">Услуги</a>
              <a href="#portfolio" className="text-sm hover:text-neon-cyan transition-colors">Портфолио</a>
              <a href="#contact" className="text-sm hover:text-neon-cyan transition-colors">Контакты</a>
              <Button className="bg-neon-cyan text-deep-black hover:bg-neon-cyan/90 neon-border rounded-[14px]">
                Запустить проект
              </Button>
            </div>
            <button 
              className="md:hidden text-neon-cyan"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden glass-morph border-t border-neon-cyan/20 animate-slide-in">
              <div className="max-w-[1440px] mx-auto px-10 py-4 flex flex-col gap-4">
                <a href="#philosophy" className="text-sm hover:text-neon-cyan transition-colors" onClick={() => setMobileMenuOpen(false)}>Философия</a>
                <a href="#services" className="text-sm hover:text-neon-cyan transition-colors" onClick={() => setMobileMenuOpen(false)}>Услуги</a>
                <a href="#portfolio" className="text-sm hover:text-neon-cyan transition-colors" onClick={() => setMobileMenuOpen(false)}>Портфолио</a>
                <a href="#contact" className="text-sm hover:text-neon-cyan transition-colors" onClick={() => setMobileMenuOpen(false)}>Контакты</a>
                <Button className="bg-neon-cyan text-deep-black hover:bg-neon-cyan/90 neon-border w-full rounded-[14px]">
                  Запустить проект
                </Button>
              </div>
            </div>
          )}
        </nav>

        <section ref={heroRef} className="min-h-screen flex items-center px-10 pt-20 relative">
          <div 
            className="max-w-[1440px] mx-auto text-left animate-fade-in"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white">
              Сайты для эпохи
              <br />
              <span className="gradient-text">после завтра</span>
            </h1>
            <div className="text-2xl md:text-4xl mb-12 h-12 flex items-center justify-center">
              <span className="text-neon-cyan animate-glow-pulse">
                {words[currentWord]}
              </span>
            </div>
            <p className="text-xl text-white/80 max-w-2xl mb-12">
              Мы создаём не просто сайты, а цифровые произведения искусства в стиле ближайшего будущего
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-neon-cyan to-neon-purple text-white hover:opacity-90 transition-opacity px-12 py-6 text-lg rounded-[14px] neon-border group"
            >
              Запустить проект
              <Icon name="ArrowRight" className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>

        <section id="philosophy" className="py-32 px-10 scroll-mt-20">
          <div 
            className="max-w-[1440px] mx-auto"
            style={{
              transform: `translateY(${Math.max(0, scrollY - 400) * 0.1}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <h2 className="text-5xl font-bold text-left mb-4 text-white">Наша философия</h2>
            <p className="text-left text-white/80 mb-20 text-lg">Три принципа создания цифровых продуктов</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {philosophy.map((item, index) => (
                <Card 
                  key={index}
                  className="glass-morph p-8 group hover:neon-border transition-all duration-300 cursor-pointer hover:scale-105"
                >
                  <div className="mb-6">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-24 h-24 object-contain group-hover:animate-float"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="py-32 px-10 bg-gradient-to-b from-background to-neon-cyan/5">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="text-5xl font-bold text-left mb-4 text-white">Услуги</h2>
            <p className="text-left text-white/80 mb-20 text-lg">Полный цикл разработки цифровых продуктов</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className={`glass-morph p-6 transition-all duration-300 cursor-pointer ${
                    hoveredService === index ? 'neon-border scale-105' : ''
                  }`}
                  onMouseEnter={() => setHoveredService(index)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <div className="mb-4">
                    <Icon 
                      name={service.icon} 
                      size={40} 
                      className={`transition-all duration-300 ${
                        hoveredService === index ? 'text-neon-cyan animate-glow-pulse' : 'text-neon-purple'
                      }`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
                  <p className="text-white/70 text-sm">{service.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="py-32 px-10">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="text-5xl font-bold text-left mb-4 text-white">Портфолио</h2>
            <p className="text-left text-white/80 mb-20 text-lg">Проекты, которые вдохновляют</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {portfolio.map((project, index) => (
                <Card
                  key={index}
                  className={`glass-morph overflow-hidden group cursor-pointer transition-all duration-500 ${
                    hoveredProject === index ? 'neon-border scale-102' : ''
                  }`}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className={`h-64 bg-gradient-to-br ${project.color} opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />
                  <div className="p-8">
                    <div className="text-sm text-neon-cyan mb-2">{project.category}</div>
                    <h3 className="text-3xl font-bold mb-4 text-white">{project.title}</h3>
                    <Button variant="ghost" className="text-neon-cyan group-hover:translate-x-2 transition-transform">
                      Смотреть кейс
                      <Icon name="ArrowRight" className="ml-2" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-32 px-10 bg-gradient-to-t from-background to-neon-purple/5">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="text-5xl font-bold text-left mb-4 text-white">Начнём проект</h2>
            <p className="text-left text-white/80 mb-12 text-lg max-w-2xl">Расскажите о вашей идее, и мы воплотим её в реальность</p>
            
            <Card className="glass-morph p-8 neon-border max-w-2xl rounded-[14px]">
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm text-neon-cyan">Ваше имя</label>
                  <Input 
                    className="glass-morph border-neon-cyan/30 focus:border-neon-cyan transition-colors" 
                    placeholder="Иван Иванов"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-neon-cyan">Email</label>
                  <Input 
                    type="email"
                    className="glass-morph border-neon-cyan/30 focus:border-neon-cyan transition-colors" 
                    placeholder="ivan@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-neon-cyan">Расскажите о проекте</label>
                  <Textarea 
                    className="glass-morph border-neon-cyan/30 focus:border-neon-cyan transition-colors min-h-32" 
                    placeholder="Опишите вашу идею..."
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-neon-cyan to-neon-purple text-white hover:opacity-90 transition-opacity py-6 text-lg rounded-[14px]"
                >
                  Отправить заявку
                  <Icon name="Send" className="ml-2" />
                </Button>
              </form>
            </Card>

            <div className="mt-12 text-left max-w-2xl">
              <p className="text-white/80 mb-4">Или свяжитесь с нами напрямую</p>
              <div className="flex justify-start gap-8">
                <a href="mailto:hello@nexus.dev" className="text-neon-cyan hover:text-neon-purple transition-colors">
                  hello@nexus.dev
                </a>
                <a href="tel:+79001234567" className="text-neon-cyan hover:text-neon-purple transition-colors">
                  +7 900 123-45-67
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 px-10 border-t border-neon-cyan/20">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-2xl font-bold gradient-text">NEXUS</div>
              <div className="text-white/70 text-sm">
                © 2026 Nexus Digital Studio. Создаём будущее сегодня.
              </div>
              <div className="flex gap-6">
                <a href="#" className="text-muted-foreground hover:text-neon-cyan transition-colors">
                  <Icon name="Github" size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-neon-cyan transition-colors">
                  <Icon name="Twitter" size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-neon-cyan transition-colors">
                  <Icon name="Linkedin" size={20} />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;