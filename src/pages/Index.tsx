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
      description: 'Интерфейсы, которые думают вместе с пользователем'
    },
    {
      icon: 'Eye',
      title: 'Цифровая эстетика',
      description: 'Визуальная гармония на стыке искусства и технологий'
    },
    {
      icon: 'Cpu',
      title: 'Безупречный код',
      description: 'Производительность и масштабируемость в каждой строке'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neon-cyan/5 via-background to-background pointer-events-none" />
      
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <nav className="fixed top-0 left-0 right-0 z-50 glass-morph border-b border-neon-cyan/20">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold gradient-text">NEXUS</div>
            <div className="hidden md:flex gap-8 items-center">
              <a href="#services" className="text-sm hover:text-neon-cyan transition-colors">Услуги</a>
              <a href="#portfolio" className="text-sm hover:text-neon-cyan transition-colors">Портфолио</a>
              <a href="#contact" className="text-sm hover:text-neon-cyan transition-colors">Контакты</a>
              <Button className="bg-neon-cyan text-deep-black hover:bg-neon-cyan/90 neon-border">
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
              <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
                <a href="#services" className="text-sm hover:text-neon-cyan transition-colors" onClick={() => setMobileMenuOpen(false)}>Услуги</a>
                <a href="#portfolio" className="text-sm hover:text-neon-cyan transition-colors" onClick={() => setMobileMenuOpen(false)}>Портфолио</a>
                <a href="#contact" className="text-sm hover:text-neon-cyan transition-colors" onClick={() => setMobileMenuOpen(false)}>Контакты</a>
                <Button className="bg-neon-cyan text-deep-black hover:bg-neon-cyan/90 neon-border w-full">
                  Запустить проект
                </Button>
              </div>
            </div>
          )}
        </nav>

        <section ref={heroRef} className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
          <div 
            className="container mx-auto text-center animate-fade-in"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-glow">
              Сайты для эпохи
              <br />
              <span className="gradient-text">после завтра</span>
            </h1>
            <div className="text-2xl md:text-4xl mb-12 h-12 flex items-center justify-center">
              <span className="text-neon-cyan animate-glow-pulse">
                {words[currentWord]}
              </span>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Мы создаём не просто сайты, а цифровые произведения искусства в стиле ближайшего будущего
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-neon-cyan to-neon-purple text-white hover:opacity-90 transition-opacity px-12 py-6 text-lg rounded-full neon-border group"
            >
              Запустить проект
              <Icon name="ArrowRight" className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>

        <section className="py-32 px-6">
          <div 
            className="container mx-auto"
            style={{
              transform: `translateY(${Math.max(0, scrollY - 400) * 0.1}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <h2 className="text-5xl font-bold text-center mb-4 gradient-text">Наша философия</h2>
            <p className="text-center text-muted-foreground mb-20 text-lg">Три принципа создания цифровых продуктов</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {philosophy.map((item, index) => (
                <Card 
                  key={index}
                  className="glass-morph p-8 group hover:neon-border transition-all duration-300 cursor-pointer hover:scale-105"
                >
                  <div className="mb-6 inline-block">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center group-hover:animate-float">
                      <Icon name={item.icon} size={32} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-neon-cyan">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="py-32 px-6 bg-gradient-to-b from-background to-neon-cyan/5">
          <div className="container mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4 gradient-text">Услуги</h2>
            <p className="text-center text-muted-foreground mb-20 text-lg">Полный цикл разработки цифровых продуктов</p>
            
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
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="py-32 px-6">
          <div className="container mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4 gradient-text">Портфолио</h2>
            <p className="text-center text-muted-foreground mb-20 text-lg">Проекты, которые вдохновляют</p>
            
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
                    <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
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

        <section id="contact" className="py-32 px-6 bg-gradient-to-t from-background to-neon-purple/5">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-5xl font-bold text-center mb-4 gradient-text">Начнём проект</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">Расскажите о вашей идее, и мы воплотим её в реальность</p>
            
            <Card className="glass-morph p-8 neon-border">
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
                  className="w-full bg-gradient-to-r from-neon-cyan to-neon-purple text-white hover:opacity-90 transition-opacity py-6 text-lg rounded-full"
                >
                  Отправить заявку
                  <Icon name="Send" className="ml-2" />
                </Button>
              </form>
            </Card>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">Или свяжитесь с нами напрямую</p>
              <div className="flex justify-center gap-8">
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

        <footer className="py-12 px-6 border-t border-neon-cyan/20">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-2xl font-bold gradient-text">NEXUS</div>
              <div className="text-muted-foreground text-sm">
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