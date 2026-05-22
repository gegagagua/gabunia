import { SiteLanguage } from "@/data/content";

export type NewsCategory = "channel" | "science" | "events" | "education";

export type NewsItem = {
  slug: string;
  category: NewsCategory;
  publishedAt: string;
  title: Record<SiteLanguage, string>;
  summary: Record<SiteLanguage, string>;
  content: Record<SiteLanguage, string[]>;
  images?: string[];
  sourceUrl?: string;
};

export const NEWS_ITEMS: NewsItem[] = [
  {
    slug: "new-studio-format-2026",
    category: "channel",
    publishedAt: "2026-05-18",
    title: {
      ka: "არხზე ახალი სტუდიური ფორმატი იწყება",
      en: "New studio format starts on the channel",
      ru: "На канале запускается новый студийный формат",
    },
    summary: {
      ka: "ახალი ვიზუალური სტილი, მოკლე სეგმენტები და მეტი ინტერაქტივი მაყურებელთან.",
      en: "A fresh visual style, shorter segments, and more interaction with the audience.",
      ru: "Новый визуальный стиль, короткие сегменты и больше интерактива со зрителями.",
    },
    content: {
      ka: [
        "ახალი სეზონიდან ვიდეოები გამოვა განახლებული სტუდიური ფორმატით.",
        "ფოკუსი იქნება მკაფიო სტრუქტურაზე: იდეა, ახსნა, მაგალითი და მოკლე შეჯამება.",
        "ლაივ-ჩართვებში დაემატება თემატური კითხვა-პასუხის ბლოკიც.",
      ],
      en: [
        "From the new season, videos will be released in an updated studio format.",
        "The structure will focus on idea, explanation, example, and a short recap.",
        "Live streams will include a dedicated thematic Q&A segment.",
      ],
      ru: [
        "С нового сезона видео будут выходить в обновленном студийном формате.",
        "Структура сосредоточится на идее, объяснении, примере и коротком итоге.",
        "В прямых эфирах появится отдельный блок тематических вопросов и ответов.",
      ],
    },
  },
  {
    slug: "field-episode-caucasus-fossils",
    category: "science",
    publishedAt: "2026-04-30",
    title: {
      ka: "მზადდება საველე ეპიზოდი კავკასიის ნამარხებზე",
      en: "Field episode on Caucasus fossils is in production",
      ru: "Готовится полевой эпизод о ископаемых Кавказа",
    },
    summary: {
      ka: "ვიდეოში შევეხებით ახალ ლოკაციებს და ბოლო წლებში აღმოჩენილ მასალას.",
      en: "The episode covers new locations and recently discovered material.",
      ru: "В выпуске будут новые локации и материалы, найденные в последние годы.",
    },
    content: {
      ka: [
        "საველე გადაღებები უკვე დაწყებულია რამდენიმე რეგიონში.",
        "გუნდი მუშაობს პალეონტოლოგებთან, რათა მასალა პოპულარულ ენაზე აიხსნას.",
        "ეპიზოდის მიზანია მაყურებელმა უკეთ დაინახოს ადგილობრივი აღმოჩენების მნიშვნელობა.",
      ],
      en: [
        "Field shooting has already started in several regions.",
        "The team collaborates with paleontologists to explain discoveries clearly.",
        "The goal is to highlight the significance of local findings for a broad audience.",
      ],
      ru: [
        "Полевые съемки уже начались в нескольких регионах.",
        "Команда работает с палеонтологами, чтобы объяснить материал простым языком.",
        "Цель выпуска — показать важность местных находок для широкой аудитории.",
      ],
    },
  },
  {
    slug: "live-qa-schedule-update",
    category: "events",
    publishedAt: "2026-04-14",
    title: {
      ka: "ლაივ Q&A-ს განრიგი განახლდა",
      en: "Live Q&A schedule has been updated",
      ru: "Обновлено расписание прямых Q&A",
    },
    summary: {
      ka: "თვის განმავლობაში დაგეგმილია სამი თემატური ლაივი სხვადასხვა დარგზე.",
      en: "Three thematic live sessions are planned for this month.",
      ru: "В этом месяце запланированы три тематических прямых эфира.",
    },
    content: {
      ka: [
        "ლაივები გაიმართება ბიოლოგიის, ისტორიისა და გეოგრაფიის თემებზე.",
        "კითხვების შეგროვება დაიწყება ეთერამდე 48 საათით ადრე.",
        "ყველა ჩანაწერი არხზე დარჩება ღია წვდომით.",
      ],
      en: [
        "Live sessions will focus on biology, history, and geography.",
        "Question collection opens 48 hours before each stream.",
        "All recordings remain publicly available on the channel.",
      ],
      ru: [
        "Эфиры будут посвящены биологии, истории и географии.",
        "Сбор вопросов начинается за 48 часов до каждого стрима.",
        "Все записи останутся в открытом доступе на канале.",
      ],
    },
  },
  {
    slug: "school-pack-launch",
    category: "education",
    publishedAt: "2026-03-25",
    title: {
      ka: "სკოლებისთვის საგანმანათლებლო პაკეტი დაემატა",
      en: "Educational pack for schools has been launched",
      ru: "Запущен образовательный пакет для школ",
    },
    summary: {
      ka: "მასწავლებლებისთვის მზადაა თემატური ვიდეო სია და სამუშაო ფურცლები.",
      en: "Teachers now have themed video lists and printable worksheets.",
      ru: "Для учителей доступны тематические подборки видео и рабочие листы.",
    },
    content: {
      ka: [
        "პაკეტი მოიცავს ასაკობრივად დალაგებულ თემებს.",
        "დაემატა სწრაფი ინსტრუქცია გაკვეთილში ვიდეოს გამოყენებისთვის.",
        "შემდეგ განახლებაში შევა დამატებითი ვიზუალური რესურსები.",
      ],
      en: [
        "The pack includes age-grouped topics for classroom usage.",
        "A quick guide for integrating videos into lessons is now available.",
        "The next update will include additional visual materials.",
      ],
      ru: [
        "Пакет включает темы, распределенные по возрастным группам.",
        "Добавлена краткая инструкция по использованию видео на уроке.",
        "В следующем обновлении появятся дополнительные визуальные материалы.",
      ],
    },
  },
  {
    slug: "community-survey-results",
    category: "channel",
    publishedAt: "2026-03-10",
    title: {
      ka: "საზოგადოებრივი გამოკითხვის შედეგები გამოქვეყნდა",
      en: "Community survey results are published",
      ru: "Опубликованы результаты опроса сообщества",
    },
    summary: {
      ka: "მაყურებლის მოთხოვნაა მეტი პრაქტიკული განმარტება და შედარებითი ანალიზი.",
      en: "Viewers asked for more practical explanations and comparative analysis.",
      ru: "Зрители попросили больше практических объяснений и сравнительного анализа.",
    },
    content: {
      ka: [
        "გამოკითხვაში მონაწილეობა მიიღო ათასზე მეტმა მაყურებელმა.",
        "ყველაზე მოთხოვნადი მიმართულებები იყო ბიოლოგია და მსოფლიო ისტორია.",
        "რედაქციული გეგმა ამ შედეგებზე დაყრდნობით განახლდა.",
      ],
      en: [
        "More than a thousand viewers participated in the survey.",
        "Biology and world history were the most requested directions.",
        "The editorial plan has been updated based on these insights.",
      ],
      ru: [
        "В опросе приняли участие более тысячи зрителей.",
        "Самыми востребованными направлениями стали биология и мировая история.",
        "Редакционный план обновлен с учетом этих результатов.",
      ],
    },
  },
  {
    slug: "guest-scientist-series",
    category: "science",
    publishedAt: "2026-02-22",
    title: {
      ka: "იწყება მოწვეული მეცნიერების ინტერვიუების სერია",
      en: "Guest scientist interview series begins",
      ru: "Стартует серия интервью с приглашенными учеными",
    },
    summary: {
      ka: "თვეში ერთხელ არხს ეწვევა სხვადასხვა მიმართულების ქართველი მკვლევარი.",
      en: "Once a month, Georgian researchers from different fields will join the channel.",
      ru: "Раз в месяц на канале будут выступать грузинские исследователи разных направлений.",
    },
    content: {
      ka: [
        "პირველი ეპიზოდი ეთმობა მიკრობიოლოგიას და თანამედროვე ლაბორატორიულ მეთოდებს.",
        "ფორმატი მოიცავს ინტერვიუს და მოკლე აუდიტორიულ კითხვებს.",
        "სერია მიზნად ისახავს ქართულ სამეცნიერო საზოგადოებასთან კავშირის გაღრმავებას.",
      ],
      en: [
        "The first episode focuses on microbiology and modern lab methods.",
        "The format combines an interview with short audience questions.",
        "The series strengthens ties with the Georgian scientific community.",
      ],
      ru: [
        "Первый выпуск посвящен микробиологии и современным лабораторным методам.",
        "Формат сочетает интервью и короткие вопросы аудитории.",
        "Серия направлена на укрепление связи с грузинским научным сообществом.",
      ],
    },
  },
  {
    slug: "open-lecture-berlin",
    category: "events",
    publishedAt: "2026-01-28",
    title: {
      ka: "ბერლინში ღია ლექცია გაიმართება",
      en: "Open lecture will be held in Berlin",
      ru: "В Берлине пройдет открытая лекция",
    },
    summary: {
      ka: "შეხვედრის თემა იქნება მეცნიერების პოპულარიზაცია ქართულ ენაზე.",
      en: "The talk will focus on science communication in the Georgian language.",
      ru: "Встреча будет посвящена популяризации науки на грузинском языке.",
    },
    content: {
      ka: [
        "ლექცია ღიაა სტუდენტებისთვის და ფართო აუდიტორიისთვის.",
        "შეხვედრის შემდეგ გაიმართება დისკუსია და ქსელური გაცნობა.",
        "დასწრება წინასწარი რეგისტრაციით იქნება შესაძლებელი.",
      ],
      en: [
        "The lecture is open to students and the general audience.",
        "A discussion and networking session follows the talk.",
        "Attendance is available through prior registration.",
      ],
      ru: [
        "Лекция открыта для студентов и широкой аудитории.",
        "После выступления состоятся дискуссия и нетворкинг.",
        "Участие возможно по предварительной регистрации.",
      ],
    },
  },
  {
    slug: "new-geography-mini-series",
    category: "education",
    publishedAt: "2025-12-19",
    title: {
      ka: "გეოგრაფიის ახალი მინი-სერია დაემატა",
      en: "A new geography mini-series was added",
      ru: "Добавлена новая мини-серия по географии",
    },
    summary: {
      ka: "სერია მოკლე ფორმატში ხსნის ქალაქებსა და რეგიონებს რეალური მაგალითებით.",
      en: "This short format explains cities and regions with real-world examples.",
      ru: "Серия в коротком формате объясняет города и регионы на реальных примерах.",
    },
    content: {
      ka: [
        "მინი-სერია შექმნილია სწრაფი სწავლის ფორმატისთვის.",
        "თითო ეპიზოდი ფოკუსირდება ერთ ქალაქზე ან რეგიონზე.",
        "დამატებულია რუკები და შედარებითი გრაფიკული ბლოკები.",
      ],
      en: [
        "The mini-series is designed for fast-learning scenarios.",
        "Each episode focuses on a single city or region.",
        "Maps and comparative visual blocks have been added.",
      ],
      ru: [
        "Мини-серия создана для формата быстрого обучения.",
        "Каждый выпуск фокусируется на одном городе или регионе.",
        "Добавлены карты и сравнительные визуальные блоки.",
      ],
    },
  },
];

export const ORDERED_NEWS = [...NEWS_ITEMS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export function getNewsCategoryLabels(language: SiteLanguage): Record<NewsCategory | "all", string> {
  const dictionary: Record<SiteLanguage, Record<NewsCategory | "all", string>> = {
    ka: {
      all: "ყველა",
      channel: "არხი",
      science: "მეცნიერება",
      events: "ღონისძიებები",
      education: "განათლება",
    },
    en: {
      all: "All",
      channel: "Channel",
      science: "Science",
      events: "Events",
      education: "Education",
    },
    ru: {
      all: "Все",
      channel: "Канал",
      science: "Наука",
      events: "События",
      education: "Образование",
    },
  };
  return dictionary[language];
}
