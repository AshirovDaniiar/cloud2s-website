const revealElements = document.querySelectorAll('.reveal, .service-card, .about-card, .step, .testi-card');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reducedMotion) {
  document.documentElement.classList.add('motion-ready');

  revealElements.forEach((element, index) => {
    element.style.setProperty('--reveal-delay', `${(index % 5) * 55}ms`);
  });

  const observer = new IntersectionObserver((entries) => {
    clearTimeout(observerFallback);
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  let observerFallback = setTimeout(() => {
    revealElements.forEach(element => element.classList.add('visible'));
    observer.disconnect();
  }, 1400);

  revealElements.forEach(element => observer.observe(element));

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let pointerFrame = 0;
    const hero = document.querySelector('.hero');
    const grid = document.querySelector('.hero-grid');
    const glow = document.querySelector('.hero-glow');

    if (hero && grid && glow) {
      hero.addEventListener('pointermove', event => {
        if (pointerFrame) return;

        pointerFrame = window.requestAnimationFrame(() => {
          const bounds = hero.getBoundingClientRect();
          const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
          const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

          grid.style.setProperty('--pointer-x', `${horizontal * -5}px`);
          grid.style.setProperty('--pointer-y', `${vertical * -4}px`);
          glow.style.setProperty('--pointer-x', `${horizontal * 8}px`);
          glow.style.setProperty('--pointer-y', `${vertical * 6}px`);
          pointerFrame = 0;
        });
      }, { passive: true });

      hero.addEventListener('pointerleave', () => {
        grid.style.setProperty('--pointer-x', '0px');
        grid.style.setProperty('--pointer-y', '0px');
        glow.style.setProperty('--pointer-x', '0px');
        glow.style.setProperty('--pointer-y', '0px');
      }, { passive: true });
    }
  }
} else {
  revealElements.forEach(element => element.classList.add('visible'));
}

const translations = {
  en: {
    about: "About",
    services: "Services",
    process: "Process",
    why: "Why Us",
    clients: "Clients",
    start: "Get Started",

    heroTitle: "Transform Your Business<br/>with <em>Cloud Intelligence</em>",
    heroSub: "We architect, migrate, and optimize cloud infrastructure so your team can focus on what matters — building the future.",
    heroBtnServices: "Explore Services",
    heroBtnCall: "Book a Discovery Call",

    servicesTitle: "Cloud solutions, <em>end to end</em>",
    servicesSub: "From strategy to deployment to continuous optimization — we cover every layer of your cloud journey.",

    service1Title: "Cloud Migration",
    service1Desc: "Seamless lift-and-shift or full modernization. We plan and execute migrations with zero disruption to your operations.",
    service1Detail: "We assess applications, infrastructure, dependencies, and business priorities to define a migration roadmap that fits your organization. The work can include landing-zone preparation, workload sequencing, security controls, and a tested cutover and recovery plan. After migration, we validate performance and help your team take ownership of the new environment.",

    service2Title: "DevOps Automation",
    service2Desc: "CI/CD pipelines, infrastructure as code, and automated deployments that accelerate release cycles and reduce human error.",
    service2Detail: "We improve the path from code to production through reliable CI/CD pipelines, infrastructure as code, and repeatable deployment workflows. We work with your engineers to reduce manual steps, introduce practical testing and rollback strategies, and improve operational visibility. The result is a delivery process that is easier to operate, review, and extend.",

    service3Title: "Security & Compliance",
    service3Desc: "Enterprise-grade security frameworks, monitoring, and governance to keep your infrastructure resilient and compliant.",
    service3Detail: "We review identity, network boundaries, cloud configuration, workloads, and data protections to identify the highest-priority risks. Together we establish least-privilege access, monitoring, governance, and incident-readiness practices aligned with your operational and compliance needs. Recommendations are practical, prioritized, and designed to support delivery rather than block it.",

    service4Title: "FinOps Optimization",
    service4Desc: "We fine-tune cloud environments for speed, scalability, and cost efficiency — maximizing ROI across your stack.",
    service4Detail: "We connect cloud costs to the teams and workloads that create them, then identify actionable opportunities such as rightsizing, idle-resource cleanup, and pricing adjustments. Budgets, ownership, reporting, and review routines help sustain improvements over time. Optimization is balanced against availability, performance, and the needs of your product.",

    service5Title: "Cloud Architecture",
    service5Desc: "Scalable and secure cloud architecture designed for modern applications and business growth.",
    service5Detail: "We translate your product requirements and operating constraints into a cloud architecture designed for security, reliability, and sustainable growth. This can include networking, identity, data, resilience, observability, and infrastructure-as-code patterns. You receive a clear target design and guidance your team can build and operate confidently.",

    service6Title: "Managed Cloud Services",
    service6Desc: "24/7 cloud monitoring, maintenance, and support to keep your infrastructure running smoothly.",
    service6Detail: "We provide ongoing cloud operations support shaped around your environment and team. Support can cover health monitoring, maintenance, incident triage, capacity and reliability reviews, and continual cost and security improvements. Responsibilities and escalation paths are agreed with your team so day-to-day operations stay clear.",

    processTitle: "From vision to <em>live cloud</em>",
    processSub: "A proven four-step framework that takes you from current state to cloud-native in weeks, not months.",

    process1Title: "Discover",
    process1Desc: "We audit your infrastructure, understand your goals, and identify the gaps and opportunities.",

    process2Title: "Architect",
    process2Desc: "We design a scalable and secure cloud strategy tailored to your business.",

    process3Title: "Deploy",
    process3Desc: "We migrate and deploy your infrastructure with minimal downtime and maximum reliability.",

    process4Title: "Optimize",
    process4Desc: "Continuous monitoring and optimization to improve performance and reduce costs.",

    whyTitle: "Built for <em>performance</em>, not promises",

    why1Title: "AWS Certified Expertise",
    why1Desc: "We recommend what's right for your workload, not what's easiest for us.",

    why2Title: "Embedded team model",
    why2Desc: "We work alongside your engineers, not above them. Knowledge transfer is built into every engagement.",

    why3Title: "Outcome-based pricing",
    why3Desc: "Our success is tied to yours. We set measurable KPIs upfront and deliver against them.",

    testimonialsTitle: "Trusted by teams <em>scaling fast</em>",

    testi1: "CLOUD2S cut our infrastructure costs by 44% in the first quarter while improving our deployment frequency by 3×. Genuinely transformative.",

    testi2: "Their team embedded with ours for 12 weeks and left us completely self-sufficient. Best cloud partner we've worked with.",

    testi3: "We migrated 180 microservices to GKE with zero downtime. The planning and execution were flawless. Highly recommended.",

    contactTitle: "Ready to <em>modernize</em>?",
    contactSub: "Let's talk about your cloud roadmap. No pitch decks — just an honest conversation.",
    contactBtn: "Book a Free Consultation",
    contactName: "Name",
    contactEmail: "Email",
    contactMessage: "Message",
    contactSending: "Sending...",
    contactSuccess: "Thanks. Your message was sent successfully.",
    contactError: "Sorry, your message could not be sent. Please try again.",
    contactConfigError: "The contact form is not configured yet. Please try again later.",
    serviceDialogLabel: "SERVICE OVERVIEW",
    serviceDialogClose: "Close",
    serviceCardAction: "EXPLORE SERVICE",

    benchmarksTitle: "CLIENT BENCHMARKS",

    metric1: "Deployment Speed",
    metric2: "Cost Reduction",
    metric3: "Security Score",
    metric4: "Team Satisfaction",
    metric5: "Uptime SLA",

    stat1: "AWS Services",
    stat2: "Uptime Guaranteed",
    stat3: "Average Cost Reduction",

    logosLabel: "Certification",

    heroBadge: "CLOUD TO SOLUTIONS",

    footerDesc: "Cloud to Solutions. We help businesses transform, modernize, and scale through expert cloud strategy and execution.",

    footerServicesTitle: "Services",
    footerCompanyTitle: "Company",
    footerLegalTitle: "Legal",

    footerBottom: "Transform. Modernize. Scale.",

    footerLink1: "Cloud Migration",
    footerLink2: "Cloud Architecture",
    footerLink3: "Security & Compliance",
    footerLink4: "FinOps & Optimization",
    footerLink5: "DevOps & Automation",
    footerLink6: "Managed Cloud Services",

    companyLink1: "About",
    companyLink2: "Case Studies",
    companyLink3: "Blog",
    companyLink4: "Careers",
    companyLink5: "Contact",

    legalLink1: "Privacy Policy",
    legalLink2: "Terms of Service",
    legalLink3: "Cookie Policy",
    legalLink4: "Impressum",

    aboutCard1Title: "AWS Expertise",
    aboutCard1Text: "Cloud-native architectures, migration strategies and operational excellence.",

    aboutCard2Title: "Cost Optimization",
    aboutCard2Text: "Reduce cloud spend through FinOps best practices and resource optimization.",

    aboutCard3Title: "Secure Growth",
    aboutCard3Text: "Build scalable and secure environments designed for long-term business growth.",

    aboutTag: "ABOUT CLOUD2S",

    aboutTitle: "Cloud Strategy. Modernization. Results.",

    aboutText1: "Cloud2S helps organizations modernize infrastructure, reduce cloud costs and build secure, scalable platforms. We specialize in AWS architecture, cloud migration, DevOps automation and FinOps optimization.",

    aboutText2: "Our mission is simple: help businesses move faster, operate more efficiently and scale with confidence.",

  },


  ru: {
    about: "О нас",
    services: "Услуги",
    process: "Процесс",
    why: "Почему мы",
    clients: "Клиенты",
    start: "Начать",

    heroTitle: "Трансформируйте бизнес<br/>с <em>Cloud технологиями</em>",
    heroSub: "Мы проектируем, переносим и оптимизируем облачную инфраструктуру.",
    heroBtnServices: "Наши услуги",
    heroBtnCall: "Записаться на звонок",

    servicesTitle: "Cloud решения <em>под ключ</em>",
    servicesSub: "От стратегии до развертывания и оптимизации — мы покрываем весь cloud путь вашего бизнеса.",

    service1Title: "Cloud миграция",
    service1Desc: "Безопасная миграция и модернизация инфраструктуры без остановки бизнеса.",
    service1Detail: "Мы оцениваем приложения, инфраструктуру, зависимости и приоритеты бизнеса, чтобы составить подходящую дорожную карту миграции. Работа может включать подготовку облачной среды, очередность переноса, меры защиты и проверенный план переключения и восстановления. После переноса мы проверяем работу систем и помогаем вашей команде освоить новую среду.",

    service2Title: "DevOps & Aвтоматизация",
    service2Desc: "CI/CD процессы, инфраструктура как код и автоматические деплои.",
    service2Detail: "Мы улучшаем путь от кода до production с помощью надежных CI/CD-процессов, инфраструктуры как кода и повторяемых развертываний. Вместе с инженерами сокращаем ручные действия, внедряем тестирование и стратегии отката, повышаем наблюдаемость. В итоге процесс выпуска становится проще сопровождать и развивать.",

    service3Title: "Безопасность и Cоответствие",
    service3Desc: "Enterprise уровень безопасности, мониторинг и контроль инфраструктуры.",
    service3Detail: "Мы проверяем учетные записи и доступ, сети, настройки облака, рабочие нагрузки и защиту данных, чтобы определить приоритетные риски. Вместе внедряем минимально необходимые права, мониторинг, управление и готовность к инцидентам с учетом ваших требований. Рекомендации практичны, расставлены по приоритетам и помогают защищать среду без лишних препятствий для разработки.",

    service4Title: "FinOps & Oптимизация",
    service4Desc: "Оптимизация cloud расходов, производительности и масштабируемости.",
    service4Detail: "Мы связываем расходы на облако с командами и нагрузками, затем находим конкретные возможности: оптимизацию размеров ресурсов, отключение простаивающих сервисов и пересмотр тарифов. Бюджеты, ответственность, отчеты и регулярные обзоры помогают сохранять результат. Экономия рассматривается вместе с требованиями к доступности и производительности.",

    service5Title: "Cloud архитектура",
    service5Desc: "Масштабируемая и безопасная cloud архитектура для современного бизнеса.",
    service5Detail: "Мы преобразуем требования продукта и ограничения эксплуатации в облачную архитектуру, рассчитанную на безопасность, надежность и рост. Проект может охватывать сеть, доступ, данные, отказоустойчивость, наблюдаемость и инфраструктуру как код. Вы получите понятную целевую схему и рекомендации для уверенной реализации и эксплуатации.",

    service6Title: "Managed Cloud Services",
    service6Desc: "Круглосуточный мониторинг, поддержка и обслуживание cloud инфраструктуры.",
    service6Detail: "Мы обеспечиваем постоянную операционную поддержку с учетом вашей облачной среды и команды. В нее могут входить мониторинг состояния, обслуживание, разбор инцидентов, анализ емкости и надежности, а также улучшения затрат и безопасности. Роли и порядок эскалации согласуются заранее, чтобы ежедневная эксплуатация оставалась понятной.",

    processTitle: "От идеи до <em>готового cloud</em>",
    processSub: "Проверенный процесс перехода к cloud инфраструктуре за недели, а не месяцы.",

    process1Title: "Анализ",
    process1Desc: "Мы анализируем инфраструктуру и определяем возможности для улучшения.",

    process2Title: "Архитектура",
    process2Desc: "Создаём масштабируемую и безопасную cloud стратегию.",

    process3Title: "Развертывание",
    process3Desc: "Перенос и запуск инфраструктуры с минимальными рисками.",

    process4Title: "Оптимизация",
    process4Desc: "Постоянный мониторинг и улучшение производительности.",


    whyTitle: "Создано для <em>результата</em>, а не обещаний",

    why1Title: "AWS сертифицированная экспертиза",
    why1Desc: "Мы рекомендуем лучшие решения для вашего бизнеса, а не самые простые для нас.",

    why2Title: "Работаем как часть команды",
    why2Desc: "Мы работаем вместе с вашей командой и передаем знания внутри проекта.",

    why3Title: "Оплата за результат",
    why3Desc: "Наш успех напрямую связан с вашим результатом.",

    testimonialsTitle: "Нам доверяют команды <em>быстрого роста</em>",

    testi1: "CLOUD2S сократили наши cloud расходы на 44% и ускорили deployment в 3 раза.",

    testi2: "Их команда работала вместе с нашей и полностью передала знания.",

    testi3: "Мы перенесли 180 микросервисов без единой минуты простоя.",

    contactTitle: "Готовы к <em>модернизации</em>?",
    contactSub: "Давайте обсудим ваш cloud roadmap без лишних презентаций — только честный разговор.",
    contactBtn: "Бесплатная консультация",
    contactName: "Имя",
    contactEmail: "Электронная почта",
    contactMessage: "Сообщение",
    contactSending: "Отправка...",
    contactSuccess: "Спасибо. Ваше сообщение успешно отправлено.",
    contactError: "Не удалось отправить сообщение. Попробуйте еще раз.",
    contactConfigError: "Форма обратной связи пока не настроена. Попробуйте позже.",
    serviceDialogLabel: "ОБЗОР УСЛУГИ",
    serviceDialogClose: "Закрыть",
    serviceCardAction: "ПОДРОБНЕЕ ОБ УСЛУГЕ",

    benchmarksTitle: "ПОКАЗАТЕЛИ КЛИЕНТОВ",

    metric1: "Скорость Deployment",
    metric2: "Снижение расходов",
    metric3: "Уровень безопасности",
    metric4: "Удовлетворенность команды",
    metric5: "SLA доступности",

    stat1: "AWS сервисы",
    stat2: "Гарантия доступности",
    stat3: "Среднее снижение расходов",

    logosLabel: "Сертификации",

    heroBadge: "ОБЛАЧНЫЕ РЕШЕНИЯ",

    footerDesc: "Cloud to Solutions. Мы помогаем бизнесу модернизировать и масштабировать cloud инфраструктуру.",

    footerServicesTitle: "Услуги",
    footerCompanyTitle: "Компания",
    footerLegalTitle: "Документы",

    footerBottom: "Трансформация. Модернизация. Масштабирование.",

    footerLink1: "Cloud миграция",
    footerLink2: "Архитектура",
    footerLink3: "Безопасность и соответствие",
    footerLink4: "FinOps и оптимизация",
    footerLink5: "DevOps и автоматизация",
    footerLink6: "Управляемые облачные сервисы",

    companyLink1: "О компании",
    companyLink2: "Кейсы",
    companyLink3: "Блог",
    companyLink4: "Карьера",
    companyLink5: "Контакты",

    legalLink1: "Политика конфиденциальности",
    legalLink2: "Условия использования",
    legalLink3: "Политика Cookie",
    legalLink4: "Импрессум",
     
    aboutCard1Title: "Экспертиза AWS",
    aboutCard1Text: "Облачные архитектуры, миграция и лучшие практики эксплуатации.",

    aboutCard2Title: "Оптимизация затрат",
    aboutCard2Text: "Снижение расходов на облако с помощью FinOps и оптимизации ресурсов.",

    aboutCard3Title: "Безопасный рост",
    aboutCard3Text: "Построение масштабируемой и безопасной инфраструктуры для роста бизнеса.",
    
    aboutTag: "О CLOUD2S",

    aboutTitle: "Облачная стратегия. Модернизация. Результат.",

    aboutText1: "Cloud2S помогает компаниям модернизировать инфраструктуру, снижать расходы на облако и строить безопасные масштабируемые платформы. Мы специализируемся на AWS, миграции в облако, DevOps автоматизации и FinOps оптимизации.",

    aboutText2: "Наша цель проста — помочь бизнесу двигаться быстрее, работать эффективнее и уверенно масштабироваться.",
    
  },




  kg: {

    about: "Биз жөнүндө",
    services: "Кызматтар",
    process: "Процесс",
    why: "Эмне үчүн биз",
    clients: "Кардарлар",
    start: "Баштоо",

    heroTitle: "Бизнес<br/><em>Cloud технологиялары</em> менен алдыга карай",
    heroSub: "Биз cloud инфраструктурасын түзүп жана оптималдаштырабыз.",
    heroBtnServices: "Кызматтар",
    heroBtnCall: "Чалууга жазылуу",

    servicesTitle: "Толук <em>Cloud чечимдер</em>",
    servicesSub: "Стратегиядан баштап оптималдаштырууга чейин cloud инфраструктурасынын бардык этаптарын камсыздайбыз.",

    service1Title: "Cloud миграция",
    service1Desc: "Инфраструктураны коопсуз көчүрүү жана жаңылоо.",
    service1Detail: "Учурдагы тиркемелерди, инфраструктураны, көз карандылыктарды жана бизнес артыкчылыктарын талдап, сизге ылайык көчүрүү планын түзөбүз. Ишке булут чөйрөсүн даярдоо, көчүрүү этаптары, коопсуздук чаралары жана текшерилген которуу-калыбына келтирүү планы кириши мүмкүн. Көчүрүүдөн кийин системалардын ишин текшерип, командаңызга жаңы чөйрөнү кабыл алууга жардам беребиз.",

    service2Title: "DevOps & Aвтоматташтыруу",
    service2Desc: "CI/CD процесстери жана автоматтык deployment системалары.",
    service2Detail: "Ишенимдүү CI/CD процесстери, инфраструктураны код менен башкаруу жана кайталануучу жайгаштыруу аркылуу коддон өндүрүшкө чейинки жолду жакшыртабыз. Инженерлериңиз менен кол эмгегин азайтып, тестирлөөнү жана артка кайтаруу ыкмаларын киргизип, системанын абалын жакшыраак көрүүгө шарт түзөбүз. Натыйжада жеткирүү процессин башкаруу жана өнүктүрүү жеңилдейт.",

    service3Title: "Коопсуздук жана Шайкештик",
    service3Desc: "Инфраструктура үчүн enterprise деңгээлдеги коопсуздук жана мониторинг.",
    service3Detail: "Маанилүү тобокелдиктерди аныктоо үчүн жеткиликтүүлүктү, тармактарды, булут жөндөөлөрүн, жумуш жүктөмдөрүн жана маалыматтарды коргоону карап чыгабыз. Командаңыз менен бирге эң аз укук, мониторинг, башкаруу жана инцидентке даярдык чараларын киргизебиз. Сунуштар ишке ашырууга ыңгайлуу болуп, иштеп чыгууга тоскоол болбой коопсуздукту күчөтөт.",

    service4Title: "FinOps & Oптималдаштыруу",
    service4Desc: "Cloud чыгымдарын жана өндүрүмдүүлүктү оптималдаштыруу.",
    service4Detail: "Булут чыгымдарын аларды жараткан командалар жана системалар менен байланыштырып, ресурстарды тууралоо, колдонулбаган кызматтарды тазалоо жана тарифтерди кайра кароо сыяктуу мүмкүнчүлүктөрдү табабыз. Бюджеттер, жоопкерчилик, отчеттор жана үзгүлтүксүз кароо натыйжаны сактоого жардам берет. Үнөмдөө жеткиликтүүлүк жана өндүрүмдүүлүк талаптары менен тең салмакталат.",

    service5Title: "Cloud архитектура",
    service5Desc: "Заманбап бизнес үчүн коопсуз жана масштабдалуучу cloud архитектурасы.",
    service5Detail: "Продукт талаптарын жана иштетүү шарттарын коопсуздукка, туруктуулукка жана өсүүгө ылайык булут архитектурасына айландырабыз. Долбоор тармактарды, жеткиликтүүлүктү, маалыматтарды, туруктуулукту, мониторингди жана инфраструктураны код менен башкарууну камтышы мүмкүн. Командаңыз ишке ашырып, иштете ала турган түшүнүктүү максаттуу схема жана сунуштарды аласыз.",

    service6Title: "Managed Cloud Services",
    service6Desc: "Cloud инфраструктурасын 24/7 мониторинг жана колдоо.",
    service6Detail: "Булут чөйрөңүзгө жана командаңызга ылайык үзгүлтүксүз операциялык колдоо көрсөтөбүз. Колдоого абалды мониторинг кылуу, тейлөө, инциденттерди талдоо, кубаттуулук жана туруктуулукту кароо, чыгым менен коопсуздукту жакшыртуу кириши мүмкүн. Күнүмдүк иштер так болушу үчүн жоопкерчилик жана эскалация тартибин алдын ала макулдашабыз.",

    processTitle: "Идеядан <em>даяр cloud</em> чечимине чейин",
    processSub: "Cloud инфраструктурасына тез жана ишенимдүү өтүү процесси.",

    process1Title: "Анализ",
    process1Desc: "Инфраструктураны текшерип, мүмкүнчүлүктөрдү аныктайбыз.",

    process2Title: "Архитектура",
    process2Desc: "Коопсуз жана масштабдалуучу cloud стратегиясын түзөбүз.",

    process3Title: "Жайгаштыруу",
    process3Desc: "Инфраструктураны коопсуз көчүрүп жана ишке киргизебиз.",

    process4Title: "Оптималдаштыруу",
    process4Desc: "Туруктуу мониторинг жана өндүрүмдүүлүктү жакшыртуу.",

    whyTitle: "<em>Натыйжа</em> үчүн түзүлгөн",

    why1Title: "AWS сертификатталган адистер",
    why1Desc: "Биз сиздин бизнес үчүн эң жакшы чечимдерди сунуштайбыз.",

    why2Title: "Команда менен бирге иштөө",
    why2Desc: "Биз сиздин инженерлер менен бир команда катары иштейбиз.",

    why3Title: "Жыйынтыкка жараша төлөм",
    why3Desc: "Биздин ийгилик сиздин ийгилигиңизге байланыштуу.",

    testimonialsTitle: "Бизге <em>тез өсүп жаткан</em> командалар ишенет",

    testi1: "CLOUD2S биздин cloud чыгымдарды 44% кыскартты.",

    testi2: "Алар биздин команда менен бирге иштеп, бардык билимди өткөрүп беришти.",

    testi3: "180 микросервисти downtime жок көчүрдүк.",

    contactTitle: "<em>Жаңыртууга</em> даярсызбы?",
    contactSub: "Cloud стратегияңызды талкуулайлы — жөнөкөй жана ачык сүйлөшүү.",
    contactBtn: "Акысыз консультация",
    contactName: "Аты-жөнү",
    contactEmail: "Электрондук почта",
    contactMessage: "Билдирүү",
    contactSending: "Жөнөтүлүүдө...",
    contactSuccess: "Рахмат. Билдирүүңүз ийгиликтүү жөнөтүлдү.",
    contactError: "Билдирүү жөнөтүлгөн жок. Кайра аракет кылыңыз.",
    contactConfigError: "Байланыш формасы азырынча орнотула элек. Кийинчерээк аракет кылыңыз.",
    serviceDialogLabel: "КЫЗМАТТЫН ЖАЛПЫ МААЛЫМАТЫ",
    serviceDialogClose: "Жабуу",
    serviceCardAction: "КЕНЕНИРЭЭК БИЛҮҮ",

    benchmarksTitle: "КАРДАР КӨРСӨТКҮЧТӨРҮ",

    metric1: "Deployment ылдамдыгы",
    metric2: "Чыгымдарды азайтуу",
    metric3: "Коопсуздук деңгээли",
    metric4: "Команданын канааттануусу",
    metric5: "SLA туруктуулугу",

    stat1: "AWS сервистери",
    stat2: "Туруктуулук кепилдиги",
    stat3: "Орточо чыгым азайтуу",

    logosLabel: "Сертификациялар",

    heroBadge: "БУЛУТ ЧЕЧИМДЕРИ",

    footerDesc: "Cloud to Solutions. Биз бизнеске cloud инфраструктурасын өнүктүрүүгө жардам беребиз.",

    footerServicesTitle: "Кызматтар",
    footerCompanyTitle: "Компания",
    footerLegalTitle: "Юридикалык маалымат",

    footerBottom: "Трансформация. Жаңылоо. Масштабдоо.",

    footerLink1: "Cloud миграция",
    footerLink2: "Архитектура",
    footerLink3: "Коопсуздук жана талаптар",
    footerLink4: "FinOps жана оптималдаштыруу",
    footerLink5: "DevOps жана автоматташтыруу",
    footerLink6: "Башкарылган cloud кызматтары",

    companyLink1: "Компания жөнүндө",
    companyLink2: "Долбоорлор",
    companyLink3: "Блог",
    companyLink4: "Карьера",
    companyLink5: "Байланыш",

    legalLink1: "Купуялык саясаты",
    legalLink2: "Колдонуу шарттары",
    legalLink3: "Cookie саясаты",
    legalLink4: "Импрессум",

    aboutCard1Title: "AWS Экспертизасы",
    aboutCard1Text: "Булут архитектуралары, миграция стратегиялары жана ишенимдүү эксплуатация.",

    aboutCard2Title: "Чыгымдарды Оптималдаштыруу",
    aboutCard2Text: "FinOps жана ресурстарды туура пайдалануу аркылуу булут чыгымдарын азайтуу.",

    aboutCard3Title: "Коопсуз Өсүү",
    aboutCard3Text: "Бизнестин узак мөөнөттүү өсүшү үчүн масштабдуу жана коопсуз инфраструктура.",
    
    aboutTag: "CLOUD2S ЖӨНҮНДӨ",

    aboutTitle: "Булут стратегиясы. Жаңылоо. Натыйжа.",

    aboutText1: "Cloud2S компанияларга инфраструктураны жаңылоого, булут чыгымдарын азайтууга жана коопсуз масштабдуу платформаларды курууга жардам берет. Биз AWS, булут миграциясы, DevOps автоматташтыруу жана FinOps оптималдаштыруу боюнча адистешкенбиз.",

    aboutText2: "Биздин максат жөнөкөй — бизнеске тезирээк өнүгүүгө, натыйжалуу иштөөгө жана ишенимдүү масштабдоого жардам берүү.",
  }

};




function changeLanguage(lang) {

  if (!translations[lang]) return;

  console.log("LANG SWITCH:", lang);

  localStorage.setItem("language", lang);
  document.documentElement.lang = lang === "kg" ? "ky" : lang;
  document.querySelectorAll("[data-language]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.language === lang));
  });

  console.log("LANG:", lang);
  console.log("ABOUT TITLE:", translations[lang].aboutTitle);


  document.getElementById("nav-about").textContent = translations[lang].about;
  document.getElementById("nav-services").textContent = translations[lang].services;
  document.getElementById("nav-process").textContent = translations[lang].process;
  document.getElementById("nav-why").textContent = translations[lang].why;
  document.getElementById("nav-clients").textContent = translations[lang].clients;
  document.getElementById("nav-start").textContent = translations[lang].start;

  document.getElementById("hero-title").innerHTML = translations[lang].heroTitle;
  document.getElementById("hero-sub").textContent = translations[lang].heroSub;
  document.getElementById("hero-btn-services").textContent = translations[lang].heroBtnServices;
  document.getElementById("hero-btn-call").textContent = translations[lang].heroBtnCall;

  document.getElementById("services-title").innerHTML = translations[lang].servicesTitle;
  document.getElementById("services-sub").textContent = translations[lang].servicesSub;

  document.getElementById("service-1-title").textContent = translations[lang].service1Title;
  document.getElementById("service-1-desc").textContent = translations[lang].service1Desc;

  document.getElementById("service-2-title").textContent = translations[lang].service2Title;
  document.getElementById("service-2-desc").textContent = translations[lang].service2Desc;

  document.getElementById("service-3-title").textContent = translations[lang].service3Title;
  document.getElementById("service-3-desc").textContent = translations[lang].service3Desc;

  document.getElementById("service-4-title").textContent = translations[lang].service4Title;
  document.getElementById("service-4-desc").textContent = translations[lang].service4Desc;

  document.getElementById("service-5-title").textContent = translations[lang].service5Title;
  document.getElementById("service-5-desc").textContent = translations[lang].service5Desc;

  document.getElementById("service-6-title").textContent = translations[lang].service6Title;
  document.getElementById("service-6-desc").textContent = translations[lang].service6Desc;

  document.getElementById("process-title").innerHTML = translations[lang].processTitle;
  document.getElementById("process-sub").textContent = translations[lang].processSub;

  document.getElementById("process-1-title").textContent = translations[lang].process1Title;
  document.getElementById("process-1-desc").textContent = translations[lang].process1Desc;

  document.getElementById("process-2-title").textContent = translations[lang].process2Title;
  document.getElementById("process-2-desc").textContent = translations[lang].process2Desc;

  document.getElementById("process-3-title").textContent = translations[lang].process3Title;
  document.getElementById("process-3-desc").textContent = translations[lang].process3Desc;

  document.getElementById("process-4-title").textContent = translations[lang].process4Title;
  document.getElementById("process-4-desc").textContent = translations[lang].process4Desc;

  document.getElementById("why-title").innerHTML = translations[lang].whyTitle;

  document.getElementById("why-1-title").textContent = translations[lang].why1Title;
  document.getElementById("why-1-desc").textContent = translations[lang].why1Desc;

  document.getElementById("why-2-title").textContent = translations[lang].why2Title;
  document.getElementById("why-2-desc").textContent = translations[lang].why2Desc;

  document.getElementById("why-3-title").textContent = translations[lang].why3Title
  document.getElementById("why-3-desc").textContent = translations[lang].why3Desc;

  document.getElementById("testimonials-title").innerHTML = translations[lang].testimonialsTitle;

  document.getElementById("testi-1-text").textContent = translations[lang].testi1;
  document.getElementById("testi-2-text").textContent = translations[lang].testi2;
  document.getElementById("testi-3-text").textContent = translations[lang].testi3;

  document.getElementById("contact-title").innerHTML = translations[lang].contactTitle;
  document.getElementById("contact-sub").textContent = translations[lang].contactSub;
  document.getElementById("contact-btn").textContent = translations[lang].contactBtn;
  document.getElementById("contact-name-label").textContent = translations[lang].contactName;
  document.getElementById("contact-email-label").textContent = translations[lang].contactEmail;
  document.getElementById("contact-message-label").textContent = translations[lang].contactMessage;
  document.getElementById("service-dialog-label").textContent = translations[lang].serviceDialogLabel;
  document.querySelector(".service-dialog-close").setAttribute("aria-label", translations[lang].serviceDialogClose);
  document.querySelectorAll(".service-open").forEach(button => {
    button.textContent = translations[lang].serviceCardAction;
  });

  document.getElementById("benchmarks-title").textContent = translations[lang].benchmarksTitle;

  document.getElementById("metric-1").textContent = translations[lang].metric1;
  document.getElementById("metric-2").textContent = translations[lang].metric2;
  document.getElementById("metric-3").textContent = translations[lang].metric3;
  document.getElementById("metric-4").textContent = translations[lang].metric4;
  document.getElementById("metric-5").textContent = translations[lang].metric5;

  document.getElementById("stat-1").textContent = translations[lang].stat1;
  document.getElementById("stat-2").textContent = translations[lang].stat2;
  document.getElementById("stat-3").textContent = translations[lang].stat3;

  document.getElementById("logos-label").textContent = translations[lang].logosLabel;

  document.getElementById("hero-badge").textContent = translations[lang].heroBadge;

  document.getElementById("footer-desc").textContent = translations[lang].footerDesc;

  document.getElementById("footer-services-title").textContent = translations[lang].footerServicesTitle;

  document.getElementById("footer-company-title").textContent = translations[lang].footerCompanyTitle;

  document.getElementById("footer-legal-title").textContent = translations[lang].footerLegalTitle;

  document.getElementById("footer-bottom-text").textContent = translations[lang].footerBottom;

  document.getElementById("footer-link-1").textContent = translations[lang].footerLink1;
  document.getElementById("footer-link-2").textContent = translations[lang].footerLink2;
  document.getElementById("footer-link-3").textContent = translations[lang].footerLink3;
  document.getElementById("footer-link-4").textContent = translations[lang].footerLink4;
  document.getElementById("footer-link-5").textContent = translations[lang].footerLink5;
  document.getElementById("footer-link-6").textContent = translations[lang].footerLink6;
  const routeLocale = lang === "kg" ? "ky" : lang;
  ["cloud-migration", "cloud-architecture", "security-compliance", "finops-optimization", "devops-automation", "managed-cloud-services"].forEach((slug, index) => {
    document.getElementById(`footer-link-${index + 1}`).href = `/${routeLocale}/services/${slug}/`;
  });
  ["about-us", "cases", "blog", "careers", "contact"].forEach((slug, index) => {
    document.getElementById(`company-link-${index + 1}`).href = `/${routeLocale}/company/${slug}/`;
  });
  ["privacy-policy", "terms-of-use", "cookie-policy", "impressum"].forEach((slug, index) => {
    document.getElementById(`legal-link-${index + 1}`).href = `/${routeLocale}/legal/${slug}/`;
  });

  const openServiceKey = document.getElementById("service-dialog").dataset.service;
  if (openServiceKey) {
    document.getElementById("service-dialog-title").textContent = translations[lang][openServiceKey + "Title"].replace(/<[^>]*>/g, "");
    document.getElementById("service-dialog-description").textContent = translations[lang][openServiceKey + "Detail"];
  }

  document.getElementById("company-link-1").textContent = translations[lang].companyLink1;
  document.getElementById("company-link-2").textContent = translations[lang].companyLink2;
  document.getElementById("company-link-3").textContent = translations[lang].companyLink3;
  document.getElementById("company-link-4").textContent = translations[lang].companyLink4;
  document.getElementById("company-link-5").textContent = translations[lang].companyLink5;

  document.getElementById("legal-link-1").textContent = translations[lang].legalLink1;
  document.getElementById("legal-link-2").textContent = translations[lang].legalLink2;
  document.getElementById("legal-link-3").textContent = translations[lang].legalLink3;
  document.getElementById("legal-link-4").textContent = translations[lang].legalLink4;

  console.log("about title:", document.getElementById("about-title"));
  console.log("translation:", translations[lang].aboutTitle);


  document.getElementById("about-card-1-title").textContent = translations[lang].aboutCard1Title;
  document.getElementById("about-card-1-desc").textContent = translations[lang].aboutCard1Text;

  document.getElementById("about-card-2-title").textContent = translations[lang].aboutCard2Title;
  document.getElementById("about-card-2-desc").textContent = translations[lang].aboutCard2Text;

  document.getElementById("about-card-3-title").textContent = translations[lang].aboutCard3Title;
  document.getElementById("about-card-3-desc").textContent = translations[lang].aboutCard3Text;

  document.getElementById("about-tag").textContent = translations[lang].aboutTag;
  document.getElementById("about-title").textContent = translations[lang].aboutTitle;

  document.getElementById("about-text-1").textContent = translations[lang].aboutText1;
  document.getElementById("about-text-2").textContent = translations[lang].aboutText2;
  
  function setText(id, value) {
  const el = document.getElementById(id);

  if (el) {
    el.textContent = value;
  }
}

function setHTML(id, value) {
  const el = document.getElementById(id);

  if (el) {
    el.innerHTML = value;
  }
}

}



const savedLanguage = localStorage.getItem("language") || "en";

changeLanguage(savedLanguage);

const serviceDialog = document.getElementById("service-dialog");
let serviceDialogOpener = null;

function openServiceDialog(serviceKey, opener) {
  const language = localStorage.getItem("language") || "en";
  const localizedTranslations = translations[language] || translations.en;
  const localizedService = localizedTranslations[serviceKey + "Title"];
  const localizedDescription = localizedTranslations[serviceKey + "Detail"];
  if (!localizedService || !localizedDescription) return;

  serviceDialogOpener = opener;
  serviceDialog.dataset.service = serviceKey;
  document.getElementById("service-dialog-title").textContent = localizedService.replace(/<[^>]*>/g, "");
  document.getElementById("service-dialog-description").textContent = localizedDescription;
  serviceDialog.showModal();
}

document.querySelector(".services-grid").addEventListener("click", event => {
  const card = event.target.closest(".service-card");
  if (card) openServiceDialog(card.dataset.service, card.querySelector(".service-open"));
});

document.querySelector(".service-dialog-close").addEventListener("click", () => serviceDialog.close());
serviceDialog.addEventListener("click", event => {
  if (event.target === serviceDialog) serviceDialog.close();
});
serviceDialog.addEventListener("close", () => {
  delete serviceDialog.dataset.service;
  serviceDialogOpener?.focus();
});

const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const feedback = document.getElementById("contact-feedback");
  const submitButton = document.getElementById("contact-btn");
  const language = localStorage.getItem("language") || "en";
  const messages = translations[language] || translations.en;

  if (contactForm.action.includes("/YOUR_FORM_ID")) {
    feedback.dataset.state = "error";
    feedback.textContent = messages.contactConfigError;
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = messages.contactSending;
  feedback.removeAttribute("data-state");
  feedback.textContent = "";
  contactForm.setAttribute("aria-busy", "true");

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      throw new Error("Form submission failed");
    }

    contactForm.reset();
    feedback.dataset.state = "success";
    feedback.textContent = messages.contactSuccess;
  } catch {
    feedback.dataset.state = "error";
    feedback.textContent = messages.contactError;
  } finally {
    const currentLanguage = localStorage.getItem("language") || "en";
    submitButton.disabled = false;
    submitButton.textContent = (translations[currentLanguage] || translations.en).contactBtn;
    contactForm.removeAttribute("aria-busy");
  }
});

function toggleMenu() {
  const navigation = document.getElementById("primary-navigation");
  const menuButton = document.querySelector(".menu-toggle");
  const isOpen = navigation.classList.toggle("active");

  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.querySelector("span").textContent = isOpen ? "×" : "☰";
}

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("primary-navigation").classList.remove("active");
    document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
    document.querySelector(".menu-toggle span").textContent = "☰";
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    document.getElementById("primary-navigation").classList.remove("active");
    document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
    document.querySelector(".menu-toggle span").textContent = "☰";
  }
});

window.addEventListener("scroll", () => {

  const nav = document.querySelector("nav");

  if (window.scrollY > 50) {
    nav.style.background = "rgba(5,14,29,0.96)";
    nav.style.backdropFilter = "blur(12px)";
  } else {
    nav.style.background = "linear-gradient(to bottom, rgba(5,14,29,0.95), transparent)";
  }

});