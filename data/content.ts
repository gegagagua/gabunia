export type SiteLanguage = "ka" | "en" | "ru";

export const LANGUAGES: { code: SiteLanguage; label: string }[] = [
  { code: "ka", label: "KA" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

type SiteContent = {
  navbar: {
    brand: string;
    links: { href: string; label: string }[];
    subscribe: string;
    donate: string;
    donateUrl: string;
  };
  hero: {
    badge: string;
    channelTitle: string;
    motto: string;
    intro: string;
    focusTitle: string;
    focusAreas: string[];
    audience: string;
    joinLine: string;
    firstName: string;
    lastName: string;
    description: string;
    description2: string;
    subscribe: string;
    watchContent: string;
    statPills: { n: string; l: string }[];
  };
  stats: { value: number; label: string; suffix: string }[];
  dailyFact: {
    title: string;
    facts: string[];
  };
  categories: {
    label: string;
    title: string;
    titleAccent: string;
    items: { id: string; icon: string; title: string; desc: string }[];
  };
  quotes: {
    label: string;
    items: { text: string; author: string }[];
  };
  membership: {
    label: string;
    title: string;
    titleAccent: string;
    titleSuffix: string;
    popular: string;
    perMonth: string;
    choose: string;
    startNow: string;
    oneTime: string;
    donate: string;
    tiers: { name: string; price: string; emoji: string; perks: string[] }[];
  };
  chat: {
    label: string;
    title: string;
    titleAccent: string;
    assistantName: string;
    system: string;
    hello: string;
    suggestions: string[];
    error: string;
    placeholder: string;
  };
  faq: {
    label: string;
    title: string;
    items: { q: string; a: string }[];
  };
  footer: {
    description: string;
    youtube: string;
    groups: { title: string; items: { label: string; href: string }[] }[];
    rights: string;
    tagline: string;
  };
};

export const CONTENT: Record<SiteLanguage, SiteContent> = {
  ka: {
    navbar: {
      brand: "ვასილ გაბუნია",
      links: [
        { href: "/videos", label: "ვიდეოები" },
        { href: "#news", label: "სიახლეები" },
        { href: "#chat", label: "AI ჩატი" },
        { href: "#faq", label: "FAQ" },
      ],
      subscribe: "გამოიწერე",
      donate: "დონაცია",
      donateUrl: "https://paypal.me/irinagabunia",
    },
    hero: {
      badge: "🔬 ბიოლოგი & მკვლევარი · გერმანია",
      channelTitle: "Vasil Gabunia's Channel - Exploring Together",
      motto: "მე არა მხოლოდ გიყვებით ისტორიებს, არამედ გიწვევთ მათ ერთობლივ კვლევაში.",
      intro: "კეთილი იყოს თქვენი მობრძანება შემეცნებით სივრცეში, სადაც მეცნიერება და ისტორია ცოცხლდება. როგორც ბიოლოგი და მკვლევარი, ჩემს არხზე გთავაზობთ ექსკლუზიურ, საავტორო კონტენტს.",
      focusTitle: "ძირითადი მიმართულებები",
      focusAreas: [
        "მეცნიერება პირველწყაროდან: ინტერვიუები გამოჩენილ ქართველ მეცნიერებთან და თანამედროვე მსოფლიო მიღწევების ანალიზი.",
        "ბუნების საიდუმლოებანი: შემეცნებითი მოგზაურობა ცოცხალი სამყაროსა და პალეონტოლოგიის სიღრმეებში.",
        "იდუმალი ისტორიები: დოკუმენტური ნარკვევები მოვლენებზე, რომლებიც ახსნას საჭიროებს.",
        "შემეცნებითი გეოგრაფია: ამბები საქართველოსა და მსოფლიოს ქალაქებზე.",
      ],
      audience: "ჩემი ვიდეოები ადაპტირებულია ნებისმიერი ასაკის აუდიტორიისთვის — ის საუკეთესო დამხმარე რესურსია როგორც სკოლის მოსწავლეებისთვის, ასევე სტუდენტებისთვის.",
      joinLine: "შემოუერთდით ჩვენს ინტელექტუალურ საზოგადოებას: გამოიწერეთ არხი და ერთად გავხადოთ მეცნიერება ხელმისაწვდომი ყველასთვის.",
      firstName: "ვასილ",
      lastName: "გაბუნია",
      description: "მეცნიერება, ბუნება, ისტორია და გეოგრაფია — ქართულ ენაზე,",
      description2: "ნებისმიერი ასაკის ცნობისმოყვარე გონებისთვის.",
      subscribe: "YouTube-ზე გამოიწერე",
      watchContent: "კონტენტი ნახე",
      statPills: [
        { n: "78K+", l: "გამომწერი" },
        { n: "8.7M+", l: "ნახვა" },
        { n: "428+", l: "ვიდეო" },
      ],
    },
    stats: [
      { value: 78800, label: "გამომწერი", suffix: "+" },
      { value: 8700000, label: "ნახვა", suffix: "+" },
      { value: 428, label: "ვიდეო", suffix: "" },
      { value: 4, label: "სფერო", suffix: "" },
    ],
    dailyFact: {
      title: "ფაქტი დღის",
      facts: [
        "ადამიანის სხეულში ბაქტერიების რაოდენობა ადამიანის უჯრედებს აჭარბებს 1.3:1 თანაფარდობით.",
        "ტ-რექსი დაახლოებით 30–40 წელს ცხოვრობდა — ცხოვრების ხანგრძლივობა, რომელიც ადამიანის მსგავსია.",
        "ოქტოპუსებს სამი გული აქვს: ერთი სხეულისთვის, ორი ლაყუჩებისთვის.",
        "საქართველო ღვინის სამშობლოა — 8,000 წლის ისტორიით.",
        "ფოტოსინთეზი 3 მილიარდ წელზე მეტი ხნის წინ გაჩნდა — მანამდე დედამიწის ატმოსფეროში ჟანგბადი არ იყო.",
      ],
    },
    categories: {
      label: "YouTube",
      title: "იხილეთ",
      titleAccent: "ვიდეოები",
      items: [
        { id: "science", icon: "🔬", title: "მეცნიერება პირველწყაროდან", desc: "ინტერვიუები გამოჩენილ ქართველ მეცნიერებთან." },
        { id: "nature", icon: "🦕", title: "ბუნების საიდუმლოებანი", desc: "პალეონტოლოგია და ცოცხალი სამყარო." },
        { id: "history", icon: "📜", title: "იდუმალი ისტორიები", desc: "დოკუმენტური ნარკვევები ახსნას მოითხოვ მოვლენებზე." },
        { id: "geography", icon: "🌍", title: "შემეცნებითი გეოგრაფია", desc: "ამბები საქართველოსა და მსოფლიო ქალაქებზე." },
      ],
    },
    quotes: {
      label: "ციტატები",
      items: [
        { text: "მე არა მხოლოდ გიყვებით ისტორიებს, არამედ გიწვევთ მათ ერთობლივ კვლევაში.", author: "ვასილ გაბუნია" },
        { text: "მეცნიერება არ არის მხოლოდ ფაქტები — ის არის კითხვების გზა.", author: "ვასილ გაბუნია" },
        { text: "ყოველი ახალი ფაქტი ახალ კითხვას ბადებს. ეს არის მეცნიერების მოჯადოება.", author: "ვასილ გაბუნია" },
      ],
    },
    membership: {
      label: "მხარდაჭერა",
      title: "შეუერთდი",
      titleAccent: "მეცნიერთა",
      titleSuffix: "საზოგადოებას",
      popular: "ყველაზე პოპულარული",
      perMonth: "/თვე",
      choose: "აირჩიე",
      startNow: "დაიწყე ახლავე →",
      oneTime: "ან ერთჯერადი დონაცია PayPal-ით",
      donate: "გამოაგზავნე სიყვარულით ❤️",
      tiers: [
        { name: "მხარდამჭერი", price: "5", emoji: "🌱", perks: ["ადრეული წვდომა ვიდეოებზე", "სახელის მოხსენიება"] },
        { name: "მკვლევარი", price: "15", emoji: "🔬", perks: ["ყველა ზემოთ", "ექსკლუზიური Q&A", "სპეციალური ბეიჯი"] },
        { name: "მეგობარი", price: "30", emoji: "⭐", perks: ["ყველა ზემოთ", "1:1 შეხვედრა", "PDF სახელმძღვანელოები"] },
      ],
    },
    chat: {
      label: "AI ასისტენტი",
      title: "ჰკითხე",
      titleAccent: "ვასოს ასისტენტს",
      assistantName: "vasil-gabunia-assistant",
      system: `შენ ხარ ვასილ გაბუნიას სამეცნიერო არხის ასისტენტი. ქართულად პასუხობ.
შენ ეხმარები მომხმარებლებს ვიდეოების პოვნაში, მეცნიერულ კითხვებში, და არხის შესახებ ინფორმაციის მიღებაში.
ყოველთვის კეთილი, ინფორმატიული და შემეცნებითი იყავი.
თუ კითხვა მეცნიერებას ეხება, მოკლე, საინტერესო პასუხი გასცი.
ბოლოს ხშირად შეახსენე YouTube-ზე გამოწერა.`,
      hello: "გამარჯობა! 🔬 მე ვარ ვასოს სამეცნიერო ასისტენტი. ჰკითხე ნებისმიერი კითხვა — ბიოლოგია, ისტორია, პალეონტოლოგია!",
      suggestions: ["ბიოლოგია რა არის?", "ტ-რექსი რა ჭამდა?", "ვასო ვინ არის?"],
      error: "ბოდიში, შეცდომა მოხდა. სცადე ხელახლა.",
      placeholder: "დასვი სამეცნიერო კითხვა...",
    },
    faq: {
      label: "FAQ",
      title: "ხშირი კითხვები",
      items: [
        { q: "ვის არის განკუთვნილი ეს არხი?", a: "ნებისმიერი ასაკის ადამიანს — სკოლის მოსწავლიდან სტუდენტამდე და ყველა ცნობისმოყვარე გონებამდე." },
        { q: "სად ცხოვრობს ვასილ გაბუნია?", a: "ვასო ამჟამად გერმანიაშია, მაგრამ კონტენტი ქართულ ენაზე და ქართველი მაყურებლისთვის იქმნება." },
        { q: "შეიძლება თქვენი ვიდეო სკოლაში გამოვიყენო?", a: "დიახ! კონტენტი სპეციალურად ადაპტირებულია სასწავლო პროცესისთვის." },
        { q: "როგორ შეიძლება დახმარება?", a: "PayPal-ით ან მერჩ მაღაზიის მეშვეობით. ყოველი დახმარება ახალ ვიდეოს ქმნის." },
        { q: "რამდენად ხშირად იდება ახალი ვიდეოები?", a: "ახალი ვიდეოები რეგულარულად ქვეყნდება; ზუსტი დრო თემისა და კვლევის სირთულეზეა დამოკიდებული." },
        { q: "შემიძლია ვიდეოს თემის შეთავაზება?", a: "რა თქმა უნდა. კომენტარებში ან სოციალური გვერდების მეშვეობით თემის იდეა მოგვწერეთ და სიამოვნებით განვიხილავთ." },
      ],
    },
    footer: {
      description: "მეცნიერება ყველასთვის — ბიოლოგი და მკვლევარი გერმანიიდან, ქართული სამეცნიერო YouTube-ის პიონერი.",
      youtube: "არხი YouTube-ზე",
      groups: [
        {
          title: "კონტენტი",
          items: [
            { label: "ვიდეოები", href: "/videos" },
            { label: "სიახლეები", href: "#news" },
            { label: "AI ჩატი", href: "#chat" },
            { label: "FAQ", href: "#faq" },
          ],
        },
        {
          title: "სოციალური",
          items: [
            { label: "Donate", href: "https://paypal.me/irinagabunia" },
            { label: "Instagram", href: "https://instagram.com/vaso_gabunia" },
            { label: "TikTok", href: "https://www.tiktok.com/@vasogabuniaofficial" },
          ],
        },
        {
          title: "დამატებითი ინფორმაცია",
          items: [
            { label: "Email", href: "mailto:vasogab.youtu@gmail.com" },
            { label: "YouTube", href: "https://www.youtube.com/@vasil_gabunia" },
          ],
        },
      ],
      rights: "© 2025 Vasil Gabunia · ყველა უფლება დაცულია",
      tagline: "science for everyone",
    },
  },
  en: {
    navbar: {
      brand: "Vasil Gabunia",
      links: [
        { href: "/videos", label: "Videos" },
        { href: "#news", label: "News" },
        { href: "#chat", label: "AI Chat" },
        { href: "#faq", label: "FAQ" },
      ],
      subscribe: "Subscribe",
      donate: "Donate",
      donateUrl: "https://paypal.me/irinagabunia",
    },
    hero: {
      badge: "🔬 Biologist & Researcher · Germany",
      channelTitle: "Vasil Gabunia's Channel - Exploring Together",
      motto: "I do not just tell stories, I invite you to explore them together.",
      intro: "Welcome to an educational space where science and history come alive. As a biologist and researcher, I share exclusive original content on this channel.",
      focusTitle: "Main directions",
      focusAreas: [
        "Science from primary sources: interviews with Georgian scientists and analysis of modern global achievements.",
        "Secrets of nature: an educational journey into the living world and paleontology.",
        "Mysterious histories: documentary essays on events that still need explanation.",
        "Educational geography: stories from Georgia and cities around the world.",
      ],
      audience: "My videos are adapted for all age groups and work as a strong learning resource for school students and university learners.",
      joinLine: "Join our intellectual community: subscribe and let's make science accessible for everyone together.",
      firstName: "Vasil",
      lastName: "Gabunia",
      description: "Science, nature, history and geography in Georgian,",
      description2: "for curious minds of every age.",
      subscribe: "Subscribe on YouTube",
      watchContent: "Explore content",
      statPills: [
        { n: "78K+", l: "subscribers" },
        { n: "8.7M+", l: "views" },
        { n: "428+", l: "videos" },
      ],
    },
    stats: [
      { value: 78800, label: "subscribers", suffix: "+" },
      { value: 8700000, label: "views", suffix: "+" },
      { value: 428, label: "videos", suffix: "" },
      { value: 4, label: "topics", suffix: "" },
    ],
    dailyFact: {
      title: "fact of the day",
      facts: [
        "The number of bacteria in the human body is estimated at a 1.3:1 ratio compared to human cells.",
        "T-Rex lived around 30-40 years, a lifespan comparable to humans.",
        "Octopuses have three hearts: one for the body and two for the gills.",
        "Georgia is one of the birthplaces of wine, with around 8,000 years of history.",
        "Photosynthesis appeared more than 3 billion years ago; before that, Earth had no oxygen-rich atmosphere.",
      ],
    },
    categories: {
      label: "YouTube",
      title: "See",
      titleAccent: "videos",
      items: [
        { id: "science", icon: "🔬", title: "Science from source", desc: "Interviews with prominent Georgian scientists." },
        { id: "nature", icon: "🦕", title: "Secrets of nature", desc: "Paleontology and the living world." },
        { id: "history", icon: "📜", title: "Mysterious stories", desc: "Documentary essays on events that need explanation." },
        { id: "geography", icon: "🌍", title: "Educational geography", desc: "Stories from Georgia and cities around the world." },
      ],
    },
    quotes: {
      label: "Quotes",
      items: [
        { text: "I do not just tell stories, I invite you to explore them together.", author: "Vasil Gabunia" },
        { text: "Science is not only facts, it is a path of questions.", author: "Vasil Gabunia" },
        { text: "Every new fact creates a new question. That is the charm of science.", author: "Vasil Gabunia" },
      ],
    },
    membership: {
      label: "Support",
      title: "Join the",
      titleAccent: "science",
      titleSuffix: "community",
      popular: "most popular",
      perMonth: "/month",
      choose: "Choose",
      startNow: "Start now →",
      oneTime: "Or make a one-time donation via PayPal",
      donate: "Send with love ❤️",
      tiers: [
        { name: "Supporter", price: "5", emoji: "🌱", perks: ["Early access to videos", "Name mention"] },
        { name: "Researcher", price: "15", emoji: "🔬", perks: ["Everything above", "Exclusive Q&A", "Special badge"] },
        { name: "Friend", price: "30", emoji: "⭐", perks: ["Everything above", "1:1 meeting", "PDF guides"] },
      ],
    },
    chat: {
      label: "AI Assistant",
      title: "Ask",
      titleAccent: "Vaso's assistant",
      assistantName: "vasil-gabunia-assistant",
      system: `You are the assistant of Vasil Gabunia's science channel. Reply in English.
You help users find videos, answer science questions, and learn about the channel.
Always be kind, informative, and educational.
If the question is about science, give concise and engaging answers.
Frequently remind users to subscribe on YouTube.`,
      hello: "Hi! 🔬 I am Vaso's science assistant. Ask me anything about biology, history, or paleontology!",
      suggestions: ["What is biology?", "What did T-Rex eat?", "Who is Vaso?"],
      error: "Sorry, something went wrong. Please try again.",
      placeholder: "Ask a science question...",
    },
    faq: {
      label: "FAQ",
      title: "Frequently Asked Questions",
      items: [
        { q: "Who is this channel for?", a: "For all ages, from school students to university learners and every curious mind." },
        { q: "Where does Vasil Gabunia live?", a: "Vaso currently lives in Germany, but the content is created in Georgian for Georgian audiences." },
        { q: "Can I use your videos at school?", a: "Yes. The content is intentionally adapted for educational use." },
        { q: "How can I support the channel?", a: "You can help via PayPal or merch. Every contribution helps produce new videos." },
        { q: "How often are new videos published?", a: "New videos are published regularly; exact timing depends on the topic and research depth." },
        { q: "Can I suggest a topic for a video?", a: "Yes. Share your idea in comments or via social pages, and we will gladly review it." },
      ],
    },
    footer: {
      description: "Science for everyone - biologist and researcher based in Germany, and a pioneer of Georgian science content on YouTube.",
      youtube: "YouTube channel",
      groups: [
        {
          title: "Content",
          items: [
            { label: "Videos", href: "/videos" },
            { label: "News", href: "#news" },
            { label: "AI Chat", href: "#chat" },
            { label: "FAQ", href: "#faq" },
          ],
        },
        {
          title: "Social",
          items: [
            { label: "Donate", href: "https://paypal.me/irinagabunia" },
            { label: "Instagram", href: "https://instagram.com/vaso_gabunia" },
            { label: "TikTok", href: "https://www.tiktok.com/@vasogabuniaofficial" },
          ],
        },
        {
          title: "More info",
          items: [
            { label: "Email", href: "mailto:vasogab.youtu@gmail.com" },
            { label: "YouTube", href: "https://www.youtube.com/@vasil_gabunia" },
          ],
        },
      ],
      rights: "© 2025 Vasil Gabunia · All rights reserved",
      tagline: "science for everyone",
    },
  },
  ru: {
    navbar: {
      brand: "Васил Габуния",
      links: [
        { href: "/videos", label: "Видео" },
        { href: "#news", label: "Новости" },
        { href: "#chat", label: "AI чат" },
        { href: "#faq", label: "FAQ" },
      ],
      subscribe: "Подписаться",
      donate: "Донат",
      donateUrl: "https://paypal.me/irinagabunia",
    },
    hero: {
      badge: "🔬 Биолог и исследователь · Германия",
      channelTitle: "Vasil Gabunia's Channel - Exploring Together",
      motto: "Я не просто рассказываю истории, а приглашаю исследовать их вместе.",
      intro: "Добро пожаловать в познавательное пространство, где наука и история оживают. Как биолог и исследователь, я публикую на канале эксклюзивный авторский контент.",
      focusTitle: "Основные направления",
      focusAreas: [
        "Наука из первых источников: интервью с грузинскими учеными и анализ современных мировых достижений.",
        "Тайны природы: познавательное путешествие в мир живой природы и палеонтологии.",
        "Загадочные истории: документальные очерки о событиях, которые требуют объяснения.",
        "Познавательная география: истории о Грузии и городах мира.",
      ],
      audience: "Видео адаптированы для аудитории любого возраста и полезны как для школьников, так и для студентов.",
      joinLine: "Присоединяйтесь к нашему интеллектуальному сообществу: подписывайтесь на канал и сделаем науку доступной для всех.",
      firstName: "Васил",
      lastName: "Габуния",
      description: "Наука, природа, история и география на грузинском языке,",
      description2: "для любознательных людей любого возраста.",
      subscribe: "Подписаться на YouTube",
      watchContent: "Смотреть контент",
      statPills: [
        { n: "78K+", l: "подписчиков" },
        { n: "8.7M+", l: "просмотров" },
        { n: "428+", l: "видео" },
      ],
    },
    stats: [
      { value: 78800, label: "подписчиков", suffix: "+" },
      { value: 8700000, label: "просмотров", suffix: "+" },
      { value: 428, label: "видео", suffix: "" },
      { value: 4, label: "темы", suffix: "" },
    ],
    dailyFact: {
      title: "факт дня",
      facts: [
        "Количество бактерий в теле человека оценивается как 1,3:1 по отношению к человеческим клеткам.",
        "Тираннозавр жил примерно 30-40 лет - продолжительность жизни сопоставима с человеческой.",
        "У осьминога три сердца: одно для тела и два для жабр.",
        "Грузия - одна из колыбелей вина с историей около 8 000 лет.",
        "Фотосинтез появился более 3 миллиардов лет назад, до этого в атмосфере Земли не было кислорода в современном объеме.",
      ],
    },
    categories: {
      label: "YouTube",
      title: "Смотрите",
      titleAccent: "видео",
      items: [
        { id: "science", icon: "🔬", title: "Наука из первых источников", desc: "Интервью с известными грузинскими учеными." },
        { id: "nature", icon: "🦕", title: "Тайны природы", desc: "Палеонтология и живой мир." },
        { id: "history", icon: "📜", title: "Загадочные истории", desc: "Документальные очерки о событиях, требующих объяснения." },
        { id: "geography", icon: "🌍", title: "Познавательная география", desc: "Истории о Грузии и городах мира." },
      ],
    },
    quotes: {
      label: "Цитаты",
      items: [
        { text: "Я не просто рассказываю истории, я приглашаю вас исследовать их вместе.", author: "Васил Габуния" },
        { text: "Наука - это не только факты, это путь вопросов.", author: "Васил Габуния" },
        { text: "Каждый новый факт рождает новый вопрос. В этом магия науки.", author: "Васил Габуния" },
      ],
    },
    membership: {
      label: "Поддержка",
      title: "Присоединяйся к",
      titleAccent: "научному",
      titleSuffix: "сообществу",
      popular: "самый популярный",
      perMonth: "/месяц",
      choose: "Выбрать",
      startNow: "Начать сейчас →",
      oneTime: "Или разовое пожертвование через PayPal",
      donate: "Отправить с любовью ❤️",
      tiers: [
        { name: "Поддерживающий", price: "5", emoji: "🌱", perks: ["Ранний доступ к видео", "Упоминание имени"] },
        { name: "Исследователь", price: "15", emoji: "🔬", perks: ["Все выше", "Эксклюзивный Q&A", "Специальный бейдж"] },
        { name: "Друг", price: "30", emoji: "⭐", perks: ["Все выше", "Встреча 1:1", "PDF-гайды"] },
      ],
    },
    chat: {
      label: "AI ассистент",
      title: "Спроси",
      titleAccent: "ассистента Васо",
      assistantName: "vasil-gabunia-assistant",
      system: `Ты ассистент научного канала Васила Габуния. Отвечай на русском языке.
Помогай пользователям находить видео, отвечай на научные вопросы и рассказывай о канале.
Всегда будь вежливым, информативным и познавательным.
Если вопрос о науке, отвечай кратко и интересно.
Периодически напоминай подписаться на YouTube.`,
      hello: "Привет! 🔬 Я научный ассистент Васо. Задавай любой вопрос: биология, история, палеонтология!",
      suggestions: ["Что такое биология?", "Чем питался Ти-Рекс?", "Кто такой Васо?"],
      error: "Извините, произошла ошибка. Попробуйте еще раз.",
      placeholder: "Задайте научный вопрос...",
    },
    faq: {
      label: "FAQ",
      title: "Частые вопросы",
      items: [
        { q: "Для кого этот канал?", a: "Для людей любого возраста - от школьников до студентов и всех любознательных." },
        { q: "Где живет Васил Габуния?", a: "Сейчас Васо живет в Германии, но контент создается на грузинском языке для грузинской аудитории." },
        { q: "Можно ли использовать ваши видео в школе?", a: "Да. Контент специально адаптирован для образовательного процесса." },
        { q: "Как можно поддержать канал?", a: "Через PayPal или мерч. Каждая поддержка помогает создавать новые видео." },
        { q: "Как часто выходят новые видео?", a: "Новые видео выходят регулярно; точный график зависит от темы и глубины исследования." },
        { q: "Можно предложить тему для нового видео?", a: "Да, конечно. Напишите идею в комментариях или через соцсети, и мы обязательно рассмотрим." },
      ],
    },
    footer: {
      description: "Наука для всех - биолог и исследователь из Германии, пионер грузинского научного YouTube.",
      youtube: "Канал на YouTube",
      groups: [
        {
          title: "Контент",
          items: [
            { label: "Видео", href: "/videos" },
            { label: "Новости", href: "#news" },
            { label: "AI чат", href: "#chat" },
            { label: "FAQ", href: "#faq" },
          ],
        },
        {
          title: "Соцсети",
          items: [
            { label: "Donate", href: "https://paypal.me/irinagabunia" },
            { label: "Instagram", href: "https://instagram.com/vaso_gabunia" },
            { label: "TikTok", href: "https://www.tiktok.com/@vasogabuniaofficial" },
          ],
        },
        {
          title: "Дополнительно",
          items: [
            { label: "Email", href: "mailto:vasogab.youtu@gmail.com" },
            { label: "YouTube", href: "https://www.youtube.com/@vasil_gabunia" },
          ],
        },
      ],
      rights: "© 2025 Vasil Gabunia · Все права защищены",
      tagline: "science for everyone",
    },
  },
};
