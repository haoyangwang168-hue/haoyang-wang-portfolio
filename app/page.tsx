"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import AccordionGallery from "./components/AccordionGallery";
import ParticleText from "./components/ParticleText";

type Language = "zh" | "en";

type LifeCardItem = {
  readonly title: string;
  readonly subtitle: string;
  readonly images: readonly string[];
};

const content = {
  zh: {
    languageLabel: "英文",
    nav: [
      ["关于我", "about"],
      ["精选项目", "projects"],
      ["个人优势", "strengths"],
    ],
    contactButton: "联系我",
    heroEyebrow: "准大一新生 · 个人主页",
    name: "汪昊阳",
    heroTitle: ["准大一新生", "摄影爱好者", "生活探索者"],
    heroStatement: "在出发之前，先成为一个愿意不断尝试的人。",
    heroCta: "了解我",
    heroDirection: "摄影 / 骑行 / 健身 / 探索",
    location: "中国 · 广州",
    status: "向大学生活出发",
    scroll: "向下探索",
    heroIndex: "二〇二六 / 个人档案",
    aboutKicker: "关于我 / 个人经历",
    aboutTitle: "保持好奇，\n也保持行动。",
    aboutBody: [
      "我叫汪昊阳，是一名来自广州的准大一新生。作为一个喜欢社交的 ENFJ，我享受与人连接，也愿意认真倾听不同的声音。",
      "我喜欢把兴趣变成一次次真实的尝试：健身、篮球、骑行、摄影，也曾探索电商、人工智能、调色、拍摄与剪辑。比起给自己贴标签，我更想持续拓宽边界。",
    ],
    profileLabel: "人物档案",
    profileCaption: "海边留影 · 个人照片",
    traits: ["社交与共情", "成长型思维", "自律与好奇", "摄影与审美"],
    contactTitle: "保持联系",
    phoneLabel: "电话",
    emailLabel: "邮箱",
    lifeTitle: "生活的不同切面",
    lifeIntro: "运动让我保持节奏，骑行让我重新观察城市，做饭则让我认真照顾日常；这些经历也慢慢形成了我的表达方式。",
    lifeCards: [
      { title: "街头健身", subtitle: "力量与自律", images: ["/assets/fitness.webp"] },
      {
        title: "骑行",
        subtitle: "城市、夜晚与持续出发",
        images: ["/assets/cycling-pov.webp", "/assets/cycling-night.webp", "/assets/cycling-bike.webp"],
      },
      {
        title: "做饭",
        subtitle: "认真照顾每一餐",
        images: ["/assets/cooking-01.jpg", "/assets/cooking-02.jpg", "/assets/cooking-03.jpg", "/assets/cooking-04.jpg"],
      },
    ],
    projectKicker: "精选项目 / 摄影作品",
    projectTitle: "我看见的世界，\n由光线与瞬间组成。",
    projectIntro: "摄影是我已经确定会继续深挖的能力。下面这些画面来自海岸、城市与旅途，也记录了我对色彩、构图和情绪的理解。",
    projectItems: [
      ["向前", "城市雕塑 · 色彩与动势", "/assets/photo-motion.webp", "wide"],
      ["日落取景", "海岸现场 · 画中画", "/assets/photo-camera.webp", "standard"],
      ["蓝色海面", "黄昏之后 · 留白", "/assets/photo-sea.webp", "standard"],
      ["暮色人群", "海边剪影 · 关系", "/assets/photo-silhouette.webp", "wide"],
      ["山海之间", "海岛俯瞰 · 层次", "/assets/photo-town.webp", "standard"],
      ["松林尽头", "海岸日出 · 框景", "/assets/photo-cliff.webp", "tall"],
    ],
    tapHint: "悬停或点击，让色彩出现",
    performanceTag: "舞台经历",
    performanceTitle: "北京路橱窗剧场展演",
    performanceBody: "参与第 21 期粤港澳大湾区青年展演，在真实舞台与观众面前完成一次表达。对我来说，走上台本身就是主动突破边界。",
    performanceDate: "二〇二五年三月",
    strengthsKicker: "个人优势 / 能力图谱",
    strengthsTitle: "不是固定标签，\n而是持续生长的能力。",
    strengthsIntro: "我的优势来自真实的生活练习：和人相处、独立学习、坚持训练，也愿意为了喜欢的事反复打磨。",
    strengths: [
      ["01", "社交力", "善于主动建立连接，也能在不同性格的人之间找到舒服的相处方式。"],
      ["02", "共情力", "愿意理解他人的处境，关注语言之外的感受与细节。"],
      ["03", "自学力", "遇到感兴趣的领域，会主动寻找方法、快速实践并持续迭代。"],
      ["04", "自律", "健身与骑行让我理解长期投入，也让我更能管理自己的节奏。"],
      ["05", "审美力", "对光线、色彩、构图与声音敏感，并尝试把感受转化成作品。"],
      ["06", "探索欲", "不急着定义自己，愿意在人工智能、影像与更多新领域继续尝试。"],
    ],
    learningTitle: "正在探索",
    learningItems: ["人工智能", "调色", "视频拍摄", "剪辑"],
    footerKicker: "联系 / 一起创造新的可能",
    footerTitle: "很高兴\n认识你。",
    footerBody: "如果你也喜欢摄影、运动、骑行，或者只是想聊聊大学生活与新的想法，欢迎联系我。",
    emailAction: "发送邮件",
    phoneAction: "拨打电话",
    footerLocation: "现居广州 · 即将开启大学生活",
    backTop: "返回顶部",
    copyright: "汪昊阳个人主页 · 二〇二六",
  },
  en: {
    languageLabel: "中文",
    nav: [
      ["About", "about"],
      ["Selected Work", "projects"],
      ["Strengths", "strengths"],
    ],
    contactButton: "Contact",
    heroEyebrow: "Incoming University Student · Personal Homepage",
    name: "Haoyang Wang",
    heroTitle: ["INCOMING", "UNIVERSITY STUDENT", "& VISUAL EXPLORER"],
    heroStatement: "Before setting out, I choose to become someone who keeps trying.",
    heroCta: "About me",
    heroDirection: "Photography / Cycling / Training / Discovery",
    location: "Guangzhou · China",
    status: "Ready for university",
    scroll: "Scroll to explore",
    heroIndex: "2026 / Personal Archive",
    aboutKicker: "About / Personal Journey",
    aboutTitle: "Stay curious.\nKeep moving.",
    aboutBody: [
      "I’m Haoyang Wang, an incoming university student from Guangzhou. As a sociable ENFJ, I enjoy connecting with people while listening closely to perspectives different from my own.",
      "I turn curiosity into real experiments: street workout, basketball, cycling and photography, alongside explorations in e-commerce, AI, color grading, filming and editing. I would rather keep widening my boundaries than settle for a single label.",
    ],
    profileLabel: "Profile",
    profileCaption: "By the coast · Personal portrait",
    traits: ["Connection & empathy", "Growth mindset", "Discipline & curiosity", "Photography & taste"],
    contactTitle: "Stay in touch",
    phoneLabel: "Phone",
    emailLabel: "Email",
    lifeTitle: "Different sides of life",
    lifeIntro: "Training keeps my rhythm steady, cycling helps me see the city again, and cooking keeps me attentive to everyday life. Together, they shape how I express myself.",
    lifeCards: [
      { title: "Street Workout", subtitle: "Strength & discipline", images: ["/assets/fitness.webp"] },
      {
        title: "Cycling",
        subtitle: "City, night and the open road",
        images: ["/assets/cycling-pov.webp", "/assets/cycling-night.webp", "/assets/cycling-bike.webp"],
      },
      {
        title: "Cooking",
        subtitle: "Taking care of every meal",
        images: ["/assets/cooking-01.jpg", "/assets/cooking-02.jpg", "/assets/cooking-03.jpg", "/assets/cooking-04.jpg"],
      },
    ],
    projectKicker: "Selected Work / Photography",
    projectTitle: "My world is made of\nlight and moments.",
    projectIntro: "Photography is a craft I know I want to pursue. These images—from coasts, cities and journeys—reflect how I understand color, composition and emotion.",
    projectItems: [
      ["Forward", "Public sculpture · Color and motion", "/assets/photo-motion.webp", "wide"],
      ["Framing Sunset", "On the coast · A frame within a frame", "/assets/photo-camera.webp", "standard"],
      ["Blue Water", "After dusk · Negative space", "/assets/photo-sea.webp", "standard"],
      ["Figures at Dusk", "Coastal silhouettes · Relationships", "/assets/photo-silhouette.webp", "wide"],
      ["Between Land and Sea", "Island overlook · Layers", "/assets/photo-town.webp", "standard"],
      ["Beyond the Pines", "Coastal sunrise · Natural framing", "/assets/photo-cliff.webp", "tall"],
    ],
    tapHint: "Hover or tap to reveal the color",
    performanceTag: "Stage Experience",
    performanceTitle: "Beijing Road Window Theatre",
    performanceBody: "I took part in the 21st Guangdong–Hong Kong–Macao Greater Bay Area Youth Showcase, performing for a live audience. For me, stepping onto the stage was an act of moving beyond my comfort zone.",
    performanceDate: "March 2025",
    strengthsKicker: "Strengths / Capability Map",
    strengthsTitle: "Not fixed labels,\nbut growing abilities.",
    strengthsIntro: "My strengths come from everyday practice: connecting with people, learning independently, training consistently and refining the things I truly care about.",
    strengths: [
      ["01", "Social confidence", "I initiate connections and adapt comfortably to people with different personalities."],
      ["02", "Empathy", "I try to understand another person’s position and notice feelings beyond words."],
      ["03", "Self-learning", "When a subject interests me, I find a way in, test quickly and keep improving."],
      ["04", "Discipline", "Training and cycling have taught me long-term commitment and rhythm management."],
      ["05", "Visual sense", "I am sensitive to light, color, composition and sound, and turn those feelings into work."],
      ["06", "Exploration", "I resist defining myself too early and keep experimenting with AI, visual media and new fields."],
    ],
    learningTitle: "Now exploring",
    learningItems: ["Artificial intelligence", "Color grading", "Filmmaking", "Editing"],
    footerKicker: "Contact / Let’s create new possibilities",
    footerTitle: "Glad to\nmeet you.",
    footerBody: "If you enjoy photography, training, cycling—or simply want to talk about university life and new ideas—I would love to hear from you.",
    emailAction: "Send an email",
    phoneAction: "Call me",
    footerLocation: "Based in Guangzhou · University life ahead",
    backTop: "Back to top",
    copyright: "Haoyang Wang Personal Homepage · 2026",
  },
} as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function LifeCarouselCard({
  item,
  index,
  language,
  activeImage,
  setActiveImage,
}: {
  item: LifeCardItem;
  index: number;
  language: Language;
  activeImage: string | null;
  setActiveImage: (value: string | null) => void;
}) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const cardKey = item.images.join("|");
  const isCarousel = item.images.length > 1;

  useEffect(() => {
    if (!isCarousel || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % item.images.length);
    }, 3400);

    return () => window.clearInterval(timer);
  }, [isCarousel, item.images.length, paused]);

  const handleCardClick = () => {
    if (isCarousel) {
      setSlideIndex((current) => (current + 1) % item.images.length);
    }
    setActiveImage(activeImage === cardKey ? null : cardKey);
  };

  return (
    <button
      className={`life-card image-color-reveal ${isCarousel ? "has-carousel" : ""} ${activeImage === cardKey ? "is-active" : ""}`}
      type="button"
      onClick={handleCardClick}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-label={isCarousel
        ? language === "zh"
          ? `${item.title}，共 ${item.images.length} 张图片，点击切换下一张`
          : `${item.title}, ${item.images.length} images, click for the next image`
        : item.title}
      aria-pressed={activeImage === cardKey}
      data-reveal
      data-motion="card"
      style={{ "--index": index } as CSSProperties}
    >
      <span className="life-slides">
        {item.images.map((image, imageIndex) => (
          <img
            className={`life-slide ${imageIndex === slideIndex ? "is-current" : ""}`}
            src={image}
            alt={imageIndex === slideIndex ? item.title : ""}
            aria-hidden={imageIndex !== slideIndex}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            key={image}
          />
        ))}
      </span>
      <span className="card-scrim" aria-hidden="true" />
      <span className="life-number">0{index + 1}</span>
      {isCarousel && (
        <span className="life-carousel-status" aria-hidden="true">
          {item.images.map((image, imageIndex) => (
            <i className={imageIndex === slideIndex ? "is-current" : ""} key={image} />
          ))}
        </span>
      )}
      <span className="life-copy">
        <strong>{item.title}</strong>
        <small>{item.subtitle}</small>
        {isCarousel && <span className="life-slide-count">0{slideIndex + 1} / 0{item.images.length}</span>}
      </span>
    </button>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("zh");
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isNavFloating, setIsNavFloating] = useState(false);
  const [isHeroReady, setIsHeroReady] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const copy = content[language];

  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => setIsHeroReady(true));
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    let interactionFallbackActive = true;
    let isVideoVisible = true;

    const resumeVideo = () => {
      if (document.hidden || !isVideoVisible) return;

      video.muted = true;
      const playback = video.play();
      if (!playback) return;

      void playback
        .then(() => {
          if (!interactionFallbackActive) return;
          interactionFallbackActive = false;
          window.removeEventListener("pointerdown", resumeVideo);
          window.removeEventListener("touchstart", resumeVideo);
        })
        .catch(() => {
          interactionFallbackActive = true;
        });
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) resumeVideo();
    };

    const videoObserver = new IntersectionObserver(
      ([entry]) => {
        isVideoVisible = entry.isIntersecting;
        if (isVideoVisible) resumeVideo();
        else video.pause();
      },
      { rootMargin: "120px 0px" },
    );

    video.addEventListener("canplay", resumeVideo);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", resumeVideo);
    window.addEventListener("pageshow", resumeVideo);
    window.addEventListener("pointerdown", resumeVideo, { passive: true });
    window.addEventListener("touchstart", resumeVideo, { passive: true });
    videoObserver.observe(video);
    resumeVideo();

    return () => {
      videoObserver.disconnect();
      video.removeEventListener("canplay", resumeVideo);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", resumeVideo);
      window.removeEventListener("pageshow", resumeVideo);
      window.removeEventListener("pointerdown", resumeVideo);
      window.removeEventListener("touchstart", resumeVideo);
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const parallaxItems = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let animationFrame = 0;

    const updateScrollEffects = () => {
      animationFrame = 0;
      const secondScreen = document.getElementById("about");
      const threshold = (secondScreen?.offsetTop ?? window.innerHeight) - 88;
      const shouldFloat = window.scrollY >= threshold;
      setIsNavFloating((current) => current === shouldFloat ? current : shouldFloat);

      if (reducedMotion.matches || !finePointer.matches) return;

      const viewportCenter = window.innerHeight / 2;
      parallaxItems.forEach((item) => {
        const bounds = item.getBoundingClientRect();
        if (bounds.bottom < -120 || bounds.top > window.innerHeight + 120) return;

        const distance = bounds.top + bounds.height / 2 - viewportCenter;
        const offset = Math.max(-22, Math.min(22, distance * -0.035));
        item.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
      });
    };

    const requestScrollUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateScrollEffects);
    };

    updateScrollEffects();
    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", requestScrollUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestScrollUpdate);
      window.removeEventListener("resize", requestScrollUpdate);
    };
  }, [language]);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5%" },
    );

    revealItems.forEach((item) => {
      item.classList.add("is-pending");
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [language]);

  return (
    <main className="site-shell" key={language}>
      <header className={`hero reference-hero ${isHeroReady ? "is-opened" : "is-opening"}`} id="top">
        <div className="hero-opening-mask" aria-hidden="true">
          <span>WANG HAOYANG</span>
          <strong>PERSONAL PAGE / 2026</strong>
          <i />
        </div>
        <nav
          className={`navigation ${isNavFloating ? "is-floating" : ""}`}
          aria-label={language === "zh" ? "主导航" : "Main navigation"}
        >
          <a className="wordmark" href="#top" aria-label={copy.backTop}>
            <strong>{copy.name}</strong>
            <span>{language === "zh" ? "个人主页" : "Personal Page"}</span>
          </a>

          <div className="nav-links">
            {copy.nav.map(([label, target]) => (
              <a href={`#${target}`} key={target}>
                {label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <button
              className="language-toggle"
              type="button"
              onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
              aria-label={language === "zh" ? "切换为英文" : "Switch to Chinese"}
            >
              <span className="language-dot" aria-hidden="true" />
              {copy.languageLabel}
            </button>
            <a className="contact-pill" href="#contact">
              {copy.contactButton} <Arrow />
            </a>
          </div>
        </nav>

        <div className="particle-hero-main frame">
          <section className="particle-hero-stage">
            <video
              ref={heroVideoRef}
              className="particle-hero-video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            >
              <source src="/assets/hero-background.mp4?v=20260815-1" type="video/mp4" />
            </video>

            <div className="particle-stage-top">
              <p className="hero-eyebrow">{copy.heroEyebrow}</p>
              <span>{language === "zh" ? "移动鼠标 · 点击重组" : "Move pointer · Click to regroup"}</span>
            </div>

            <h1 className="particle-hero-accessible-title">{copy.heroTitle.join(" · ")}</h1>
            <div className="particle-title-stack" aria-hidden="true">
              <div className="particle-title-row">
                <ParticleText
                  text={copy.heroTitle.join(" · ")}
                  particleSize={3.05}
                  density={3.25}
                  color="#ffffff"
                  highlightColor="#c94b36"
                  scatter={180}
                  gatherDuration={1600}
                  stagger={420}
                  pointerRepel={52}
                  repelRadius={150}
                  idleDrift={0.45}
                  trigger="click"
                  fontSize="clamp(4.5rem, 14vw, 11rem)"
                  fontWeight={900}
                  fontFamily='"Microsoft YaHei", "Noto Sans SC", sans-serif'
                  widthRatio={0.985}
                  verticalScale={1.36}
                  glow={false}
                />
              </div>
            </div>
          </section>

          <aside className="particle-hero-aside">
            <div className="particle-aside-index">
              <span>01 / {language === "zh" ? "个人档案" : "Profile"}</span>
              <strong>{language === "zh" ? "二〇二六" : "2026"}</strong>
            </div>

            <div className="particle-aside-copy">
              <p>{language === "zh" ? "你好，我是" : "Hello, I am"}</p>
              <h2>{copy.name}</h2>
              <p>{copy.heroStatement}</p>
            </div>

            <div className="particle-aside-fields">
              {copy.heroDirection.split(" / ").map((field, index) => (
                <span key={field}><i>0{index + 1}</i>{field}</span>
              ))}
            </div>

            <div className="particle-hero-actions">
              <a href="#projects" className="particle-primary-action">
                {language === "zh" ? "查看作品" : "View my work"} <Arrow />
              </a>
              <a href="#about" className="particle-secondary-action">
                {copy.heroCta} <Arrow />
              </a>
            </div>

            <div className="particle-aside-monogram" aria-hidden="true">WH</div>
          </aside>
        </div>

        <div className="reference-hero-meta frame">
          <div>
            <strong>01</strong>
            <span>{copy.heroIndex}</span>
          </div>
          <div>
            <strong>{language === "zh" ? "广州" : "GZ"}</strong>
            <span>{copy.location}</span>
          </div>
          <div>
            <strong>{language === "zh" ? "四项" : "04"}</strong>
            <span>{copy.heroDirection}</span>
          </div>
          <div className="reference-status">
            <span className="status-pulse" aria-hidden="true" />
            <span>{copy.status}</span>
          </div>
          <a href="#about" className="reference-scroll-link">
            {copy.scroll} <span aria-hidden="true">↓</span>
          </a>
        </div>
      </header>

      <section className="about section-light" id="about">
        <div className="ambient ambient-cobalt" aria-hidden="true" />
        <div className="frame section-grid">
          <div className="section-heading" data-reveal data-motion="headline">
            <p className="section-kicker">{copy.aboutKicker}</p>
            <span className="motion-display-word" aria-hidden="true">ABOUT</span>
            <h2>{copy.aboutTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>
          </div>

          <div className="about-layout">
            <figure className="profile-card glass-panel" data-reveal data-motion="card">
              <div className="profile-label">
                <span>{copy.profileLabel}</span>
                <span>01</span>
              </div>
              <div className="image-shell image-color-reveal" data-reveal data-motion="image" data-parallax>
                <img
                  src="/assets/portrait.webp"
                  alt={copy.profileCaption}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
              </div>
              <figcaption>{copy.profileCaption}</figcaption>
            </figure>

            <div className="about-copy" data-reveal data-motion="card" style={{ "--index": 1 } as CSSProperties}>
              {copy.aboutBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <div className="trait-row" aria-label={language === "zh" ? "个人特质" : "Personal traits"}>
                {copy.traits.map((trait) => <span key={trait}>{trait}</span>)}
              </div>

              <div className="contact-card glass-panel">
                <div>
                  <p className="mini-label">{copy.contactTitle}</p>
                  <p className="contact-note">{copy.location}</p>
                </div>
                <div className="contact-lines">
                  <a href="tel:+8619120353235">
                    <span>{copy.phoneLabel}</span>
                    <strong>191 2035 3235</strong>
                  </a>
                  <a href="mailto:haoyangwang168@gmail.com">
                    <span>{copy.emailLabel}</span>
                    <strong>haoyangwang168@gmail.com</strong>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="life-header" data-reveal data-motion="headline">
            <span className="motion-display-word" aria-hidden="true">LIFE</span>
            <h3>{copy.lifeTitle}</h3>
            <p>{copy.lifeIntro}</p>
          </div>

          <div className="life-grid">
            {copy.lifeCards.map((item, index) => item.images.length === 1 ? (
              <LifeCarouselCard
                item={item}
                index={index}
                language={language}
                activeImage={activeImage}
                setActiveImage={setActiveImage}
                key={item.title}
              />
            ) : (
              <article
                className={`life-accordion-story ${index === 2 ? "is-cooking" : "is-cycling"}`}
                data-reveal
                data-motion="card"
                key={item.title}
                style={{ "--index": index } as CSSProperties}
              >
                <div className="life-accordion-heading">
                  <span>0{index + 1}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.subtitle}</small>
                  </div>
                  <em>{language === "zh" ? "悬停或点击展开" : "Hover or tap to expand"}</em>
                </div>

                <AccordionGallery
                  items={item.images.map((image, imageIndex) => ({
                    image,
                    label: language === "zh"
                      ? `${item.title} · 第 ${imageIndex + 1} 幅`
                      : `${item.title} · Frame ${String(imageIndex + 1).padStart(2, "0")}`,
                    alt: language === "zh"
                      ? `${item.title}图集第 ${imageIndex + 1} 张`
                      : `${item.title} gallery image ${imageIndex + 1}`,
                  }))}
                  defaultIndex={index === 1 ? 1 : 0}
                  accentColor={index === 2 ? "#b7432f" : "#dd8619"}
                  overlayColor="#171511"
                  textColor="#f4ead7"
                  height={460}
                  gap={8}
                  radius={2}
                  expandRatio={index === 2 ? 0.57 : 0.62}
                  duration={0.68}
                  parallax={0.55}
                  tilt={3.5}
                  trigger="hover"
                  grayscale
                  ariaLabel={language === "zh" ? `${item.title}手风琴图集` : `${item.title} accordion gallery`}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="projects section-dark" id="projects">
        <div className="ambient ambient-amber" aria-hidden="true" />
        <div className="frame">
          <div className="project-intro" data-reveal data-motion="headline">
            <div className="section-heading section-heading-light">
              <p className="section-kicker">{copy.projectKicker}</p>
              <span className="motion-display-word" aria-hidden="true">SELECTED WORKS</span>
              <h2>{copy.projectTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>
            </div>
            <div className="project-intro-copy">
              <p>{copy.projectIntro}</p>
              <span>{copy.tapHint}</span>
            </div>
          </div>

          <div className="project-accordion-wrap" data-reveal data-motion="image">
            <div className="project-accordion-meta">
              <span>01 — 06</span>
              <span>{language === "zh" ? "移动鼠标或点击展开作品" : "Hover or tap to expand a work"}</span>
            </div>

            <AccordionGallery
              items={copy.projectItems.map(([title, subtitle, image], index) => ({
                image,
                label: `${String(index + 1).padStart(2, "0")} · ${title} · ${subtitle}`,
                alt: language === "zh" ? `${title}，${subtitle}` : `${title}, ${subtitle}`,
              }))}
              defaultIndex={2}
              accentColor="#dd8619"
              overlayColor="#171511"
              textColor="#f4ead7"
              height={620}
              gap={6}
              radius={0}
              expandRatio={0.5}
              duration={0.72}
              parallax={0.65}
              tilt={4}
              trigger="hover"
              grayscale
              className="project-accordion-gallery"
              ariaLabel={language === "zh" ? "摄影作品手风琴图集" : "Photography accordion gallery"}
            />
          </div>

          <article className="performance-card glass-dark" data-reveal data-motion="card">
            <div className="performance-image image-color-reveal" data-reveal data-motion="image" data-parallax>
              <img
                src="/assets/certificate.webp"
                alt={copy.performanceTitle}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
            </div>
            <div className="performance-copy">
              <p className="section-kicker">{copy.performanceTag}</p>
              <h3>{copy.performanceTitle}</h3>
              <p>{copy.performanceBody}</p>
              <div className="performance-meta">
                <span>{copy.performanceDate}</span>
                <span>07 / 07</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="strengths section-light" id="strengths">
        <div className="ambient ambient-rose" aria-hidden="true" />
        <div className="frame">
          <div className="strengths-intro" data-reveal data-motion="headline">
            <div className="section-heading">
              <p className="section-kicker">{copy.strengthsKicker}</p>
              <span className="motion-display-word" aria-hidden="true">STRENGTHS</span>
              <h2>{copy.strengthsTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>
            </div>
            <p>{copy.strengthsIntro}</p>
          </div>

          <div className="strength-grid">
            {copy.strengths.map(([number, title, description], index) => (
              <article
                className={`strength-card glass-panel ${index === 0 ? "has-social-background" : ""} ${index === 1 ? "has-empathy-background" : ""} ${index === 2 ? "has-self-learning-background" : ""} ${index === 3 ? "has-discipline-background" : ""} ${index === 4 ? "has-aesthetic-background" : ""} ${index === 5 ? "has-exploration-background" : ""}`}
                key={number}
                data-reveal
                data-motion="card"
                style={{ "--index": index } as CSSProperties}
              >
                <div className="strength-topline">
                  <span>{number}</span>
                  <span className="strength-mark" aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>

          <div className="learning-strip glass-panel" data-reveal data-motion="card">
            <span className="mini-label">{copy.learningTitle}</span>
            <div>
              {copy.learningItems.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        </div>
      </section>

      <footer className="contact-section" id="contact">
        <div className="contact-orb" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <div className="frame contact-frame">
          <div className="contact-top" data-reveal data-motion="card">
            <p className="section-kicker">{copy.footerKicker}</p>
            <span>{copy.footerLocation}</span>
          </div>

          <div className="contact-main" data-reveal data-motion="headline">
            <span className="motion-display-word" aria-hidden="true">CONTACT</span>
            <h2>{copy.footerTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>
            <p>{copy.footerBody}</p>
          </div>

          <div className="contact-actions" data-reveal data-motion="card">
            <a href="mailto:haoyangwang168@gmail.com" className="primary-contact">
              <span>{copy.emailAction}</span>
              <strong>haoyangwang168@gmail.com</strong>
              <Arrow />
            </a>
            <a href="tel:+8619120353235" className="secondary-contact">
              <span>{copy.phoneAction}</span>
              <strong>191 2035 3235</strong>
              <Arrow />
            </a>
          </div>

          <div className="footer-line">
            <span>{copy.copyright.replace("2026", String(year))}</span>
            <a href="#top">{copy.backTop} ↑</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
