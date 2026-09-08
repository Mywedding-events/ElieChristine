"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

const whishAccountNumber = "20997489-03";

const slideChromeColors = [
  "#2e5882",
  "#294f7b",
  "#31537c",
  "#335a84",
  "#245081",
  "#204e81",
  "#355983",
];

const translations = {
  en: {
    sections: [
      "Welcome",
      "Invitation",
      "Ceremony",
      "Gift List",
      "RSVP",
      "Together",
    ],
    languageLabel: "Choose a language",
    groomName: "Elie",
    brideName: "Christine",
    namesAnd: "&",
    together: "Together is a beautiful place to be",
    startAria: "Start the invitation and play music",
    loading: "Loading",
    invitation: "Invitation",
    click: "Click",
    toStart: "to Start",
    gettingMarried: "Are getting married!",
    date: "Sunday · October 11 · 2026",
    countdown: ["Days", "Hours", "Mins", "Secs"],
    scroll: "Scroll",
    verse: "“What God has joined together, let no one separate.”",
    verseReference: "— Matthew 19:6 —",
    invite: "With great joy, we invite you to celebrate our wedding",
    weddingDate: "Sunday, 11 October 2026",
    ceremony: "Wedding Ceremony",
    ceremonyTime: "October 11 · 7:00 PM",
    church: "St. Fawka Church",
    churchLocation: "Church Location",
    reception: "Followed by Reception & Dinner",
    venue: "Plaza Palace Tabarja",
    venueLocation: "Venue Location",
    giftList: "Wedding Gift List",
    giftIntro: "Your presence is enough of a present to us!",
    giftDetails: "For those who desire, a gift list is available at:",
    account: "Account:",
    copyAccount: "Copy number",
    accountCopied: "Copied!",
    accountCopyError: "Unable to copy. Please copy the number manually.",
    rsvp: "Kindly RSVP",
    confirmBy: "Please confirm before September 30, 2026",
    inviteeCount: "Number of invitees:",
    loadingInvitation: "Loading your invitation...",
    invitationNotFound: "This invitation code was not found.",
    invitationLoadError: "Unable to load this invitation.",
    guest: "Guest",
    accept: "Accept",
    decline: "Decline",
    confirming: "Confirming...",
    confirm: "Press to Confirm",
    submitError: "Unable to submit your RSVP.",
    thankYou: "Thank you. Your response has been noted ♡",
    noCode: "No invitation code was provided.",
    seeYou: "See you there!",
    pauseMusic: "Pause music",
    playMusic: "Play music",
    musicUnavailable: "Music could not be played",
    sectionNavigation: "Invitation sections",
    goToSection: "Go to section",
  },
  ar: {
    sections: [
      "الترحيب",
      "الدعوة",
      "المراسم",
      "لائحة الهدايا",
      "تأكيد الحضور",
      "معًا",
    ],
    languageLabel: "اختر اللغة",
    groomName: "إيلي",
    brideName: "كريستين",
    namesAnd: "و",
    together: "معًا يحلو كل شيء",
    startAria: "ابدأ الدعوة وشغّل الموسيقى",
    loading: "جارٍ التحميل",
    invitation: "الدعوة",
    click: "اضغط",
    toStart: "للبدء",
    gettingMarried: "سيتزوّجان!",
    date: "الأحد · 11 تشرين الأول · 2026",
    countdown: ["يوم", "ساعة", "دقيقة", "ثانية"],
    scroll: "مرّر",
    verse: "«فما جمعه الله لا يفرّقه إنسان.»",
    verseReference: "— متّى 19:6 —",
    invite: "بكل فرح، ندعوكم لمشاركتنا فرحة زفافنا",
    weddingDate: "الأحد، 11 تشرين الأول 2026",
    ceremony: "مراسم الزفاف",
    ceremonyTime: "11 تشرين الأول · الساعة 7:00 مساءً",
    church: "كنيسة مار فوقا",
    churchLocation: "موقع الكنيسة",
    reception: "يلي المراسم حفل استقبال وعشاء",
    venue: "بلازا بالاس",
    venueLocation: "موقع الحفل",
    giftList: "لائحة الهدايا",
    giftIntro: "حضوركم أجمل هدية لنا!",
    giftDetails: "ولمن يرغب، تتوفّر لائحة هدايا لدى:",
    account: "رقم الحساب:",
    copyAccount: "نسخ رقم الحساب",
    accountCopied: "تم النسخ!",
    accountCopyError: "تعذّر النسخ. يرجى نسخ الرقم يدويًا.",
    rsvp: "تأكيد الحضور",
    confirmBy: "يرجى التأكيد قبل 30 أيلول 2026",
    inviteeCount: "عدد المدعوين:",
    loadingInvitation: "جارٍ تحميل دعوتكم...",
    invitationNotFound: "لم يتم العثور على رمز الدعوة هذا.",
    invitationLoadError: "تعذّر تحميل هذه الدعوة.",
    guest: "ضيف",
    accept: "حاضر",
    decline: "معتذر",
    confirming: "جارٍ التأكيد...",
    confirm: "اضغط للتأكيد",
    submitError: "تعذّر إرسال تأكيد الحضور.",
    thankYou: "شكرًا لكم. تم تسجيل ردّكم ♡",
    noCode: "لم يتم إدخال رمز للدعوة.",
    seeYou: "نراكم هناك!",
    pauseMusic: "إيقاف الموسيقى مؤقتًا",
    playMusic: "تشغيل الموسيقى",
    musicUnavailable: "تعذّر تشغيل الموسيقى",
    sectionNavigation: "أقسام الدعوة",
    goToSection: "الانتقال إلى القسم",
  },
} as const;

type Language = keyof typeof translations;
type InvitationError = "not-found" | "load" | "";
type RsvpError = "submit" | "";
const weddingDate = new Date("2026-10-11T19:00:00+03:00").getTime();

type Countdown = {
  days: string;
  hours: string;
  mins: string;
  secs: string;
};

type RsvpStatus = "pending" | "accepted" | "rejected";

type Invitee = {
  id: string;
  fullName?: string;
  status?: RsvpStatus;
};

type InvitationResponse = {
  invitationCode?: string;
  invitees?: Invitee[];
};

const API_BASE_URL = "https://api.mywedding.events";

function getCountdown(): Countdown {
  const remaining = Math.max(weddingDate - Date.now(), 0);
  const totalSeconds = Math.floor(remaining / 1000);
  const pad = (value: number) => value.toString().padStart(2, "0");

  return {
    days: pad(Math.floor(totalSeconds / 86400)),
    hours: pad(Math.floor((totalSeconds % 86400) / 3600)),
    mins: pad(Math.floor((totalSeconds % 3600) / 60)),
    secs: pad(totalSeconds % 60),
  };
}

function CalendarIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="6"
        y="9"
        width="28"
        height="25"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M6 16h28M13 5v7M27 5v7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LocationIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="40"
      height="44"
      viewBox="0 0 40 44"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 3C12.8 3 7 8.8 7 16c0 9 13 24 13 24s13-15 13-24c0-7.2-5.8-13-13-13z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="20" cy="16" r="4.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function ButtonLink({
  children,
  href,
  className = "",
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <a
      className={`inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-[2px] border border-[var(--gold-line)] bg-white/[0.04] px-[26px] py-[13px] font-serif-wedding text-base uppercase tracking-[0.12em] text-[var(--ink)] no-underline transition duration-300 ease-in-out hover:border-[var(--ink)] hover:bg-white/[0.14] active:scale-95 ${className}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

function RsvpButton({
  label,
  variant,
  active,
  onClick,
}: {
  label: string;
  variant: "accept" | "decline";
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`inline-flex min-w-[82px] cursor-pointer items-center justify-center rounded-[2px] border px-[13px] py-[9px] font-serif-wedding text-xs uppercase tracking-[0.08em] transition duration-300 active:scale-95 ${
        active
          ? variant === "accept"
            ? "border-transparent bg-[oklch(0.82_0.075_78/0.9)] font-semibold text-[#3a2615]"
            : "border-transparent bg-[rgba(252,246,238,0.92)] font-semibold text-[#4a3220]"
          : "border-[var(--gold-line)] bg-white/[0.04] text-[var(--ink)] hover:border-[var(--ink)] hover:bg-white/[0.14]"
      }`}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

const STARTUP_TIMEOUT_MS = 6000;

function waitForWindowLoad(signal: AbortSignal) {
  if (document.readyState === "complete") return Promise.resolve();

  return new Promise<void>((resolve) => {
    const done = () => resolve();
    window.addEventListener("load", done, { once: true, signal });
  });
}

function waitForStylesheet(link: HTMLLinkElement, signal: AbortSignal) {
  if (link.sheet) return Promise.resolve();

  return new Promise<void>((resolve) => {
    const done = () => resolve();
    link.addEventListener("load", done, { once: true, signal });
    link.addEventListener("error", done, { once: true, signal });
  });
}

async function waitForPageAssets(signal: AbortSignal) {
  const stylesheetLinks = Array.from(
    document.querySelectorAll<HTMLLinkElement>('link[rel~="stylesheet"]'),
  );
  const ready = async () => {
    await Promise.all([
      waitForWindowLoad(signal),
      ...stylesheetLinks.map((link) => waitForStylesheet(link, signal)),
    ]);
    if ("fonts" in document) await document.fonts.ready;
  };
  const timeout = new Promise<void>((resolve) =>
    window.setTimeout(resolve, STARTUP_TIMEOUT_MS),
  );

  await Promise.race([ready(), timeout]);
}

export default function WeddingInvitation({
  invitationCode,
  slides,
}: {
  invitationCode?: string;
  slides: string[];
}) {
  const [language, setLanguage] = useState<Language>("en");
  const [appReady, setAppReady] = useState(false);
  const [invitationStarted, setInvitationStarted] = useState(false);
  const [startingInvitation, setStartingInvitation] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicUnavailable, setMusicUnavailable] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [countdown, setCountdown] = useState<Countdown>({
    days: "00",
    hours: "00",
    mins: "00",
    secs: "00",
  });
  const [activeSection, setActiveSection] = useState(0);
  const [cueHidden, setCueHidden] = useState(false);
  const [invitees, setInvitees] = useState<Invitee[]>([]);
  const [rsvps, setRsvps] = useState<Record<string, RsvpStatus>>({});
  const [invitationLoading, setInvitationLoading] = useState(false);
  const [invitationError, setInvitationError] =
    useState<InvitationError>("");
  const [submittingRsvp, setSubmittingRsvp] = useState(false);
  const [rsvpError, setRsvpError] = useState<RsvpError>("");
  const [confirmed, setConfirmed] = useState(false);
  const [accountCopyStatus, setAccountCopyStatus] = useState<
    "idle" | "copied" | "error"
  >("idle");
  const lockRef = useRef(false);
  const currentRef = useRef(0);
  const touchStartRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const sectionIds = useMemo(
    () => Array.from({ length: 6 }, (_, index) => `section-${index + 1}`),
    [],
  );
  const copy = translations[language];
  const isArabic = language === "ar";
  const activeChromeColor =
    slideChromeColors[activeSlide % slideChromeColors.length] ?? "#2e5882";
  const normalizedInvitationCode = invitationCode?.trim();

  async function copyWhishAccount() {
    try {
      await navigator.clipboard.writeText(whishAccountNumber);
      setAccountCopyStatus("copied");
    } catch {
      setAccountCopyStatus("error");
    }
  }

  useEffect(() => {
    if (accountCopyStatus === "idle") return;
    const timeout = window.setTimeout(() => setAccountCopyStatus("idle"), 4000);
    return () => window.clearTimeout(timeout);
  }, [accountCopyStatus]);

  useEffect(() => {
    try {
      const savedLanguage = window.localStorage.getItem("wedding-language");
      if (savedLanguage === "en" || savedLanguage === "ar") {
        setLanguage(savedLanguage);
      } else if (window.navigator.language.toLowerCase().startsWith("ar")) {
        setLanguage("ar");
      }
    } catch {
      // The invitation still works if browser storage is unavailable.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [isArabic, language]);

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    try {
      window.localStorage.setItem("wedding-language", nextLanguage);
    } catch {
      // Keep the current selection for this visit if storage is unavailable.
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    waitForPageAssets(controller.signal)
      .catch(() => undefined)
      .then(() => {
        if (controller.signal.aborted) return;
        document.body.style.visibility = "visible";
        setAppReady(true);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    document.body.style.overflow = invitationStarted ? "" : "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [invitationStarted]);

  useEffect(() => {
    if (!appReady) return;

    const slideTimer =
      slides.length > 1
        ? window.setInterval(() => {
            setActiveSlide((index) => (index + 1) % slides.length);
          }, 3000)
        : undefined;
    setCountdown(getCountdown());
    const countdownTimer = window.setInterval(
      () => setCountdown(getCountdown()),
      1000,
    );

    return () => {
      if (slideTimer !== undefined) window.clearInterval(slideTimer);
      window.clearInterval(countdownTimer);
    };
  }, [appReady, slides.length]);

  useEffect(() => {
    if (!appReady) return;

    const themeColorMeta =
      document.querySelector<HTMLMetaElement>('meta[name="theme-color"]') ??
      document.head.appendChild(document.createElement("meta"));

    themeColorMeta.name = "theme-color";
    themeColorMeta.content = activeChromeColor;
    document.documentElement.style.setProperty(
      "--slide-chrome-color",
      activeChromeColor,
    );
    document.documentElement.style.backgroundColor = activeChromeColor;
    document.body.style.backgroundColor = activeChromeColor;
  }, [activeChromeColor, appReady]);

  useEffect(() => {
    if (!appReady || !invitationStarted) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const dotButtons = Array.from(
      document.querySelectorAll<HTMLButtonElement>("[data-dot]"),
    );

    const revealSection = (section: HTMLElement) => {
      if (section.dataset.revealed === "true") return;
      section.dataset.revealed = "true";
      if (reducedMotion) return;

      section
        .querySelectorAll<HTMLElement>(".reveal")
        .forEach((element, index) => {
          const delay = Math.min(index, 5) * 90;
          element.classList.add("go");
          element.style.transitionDelay = `${delay}ms`;
          window.requestAnimationFrame(() => element.classList.remove("pre"));
          window.setTimeout(() => {
            element.style.transition = "none";
            element.style.transitionDelay = "0ms";
            element.classList.remove("pre");
            element.style.opacity = "1";
            element.style.transform = "none";
          }, 900 + delay);
        });
    };

    if (!reducedMotion) {
      document
        .querySelectorAll(".reveal")
        .forEach((element) => element.classList.add("pre"));
    }

    const syncActiveSection = () => {
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      let best = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      sectionElements.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(
          rect.top + rect.height / 2 - viewportHeight / 2,
        );
        if (distance < bestDistance) {
          best = index;
          bestDistance = distance;
        }
      });

      currentRef.current = best;
      setActiveSection(best);
    };

    const revealVisibleSections = () => {
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      sectionElements.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (
          rect.top < viewportHeight * 0.85 &&
          rect.bottom > viewportHeight * 0.15
        )
          revealSection(section);
      });
      syncActiveSection();
    };

    const goTo = (index: number) => {
      const next = Math.max(0, Math.min(sectionElements.length - 1, index));
      if (next === currentRef.current && lockRef.current) return;
      currentRef.current = next;
      lockRef.current = true;
      revealSection(sectionElements[next]);
      setActiveSection(next);
      window.scrollTo({
        top: sectionElements[next].offsetTop,
        behavior: reducedMotion ? "auto" : "smooth",
      });
      window.setTimeout(() => {
        lockRef.current = false;
      }, 760);
    };

    const canScrollSection = (direction: number) => {
      const section = sectionElements[currentRef.current];
      if (!section?.hasAttribute("data-scrollable")) return false;
      // Finish scrolling the guest list before navigating to another section.
      return direction > 0
        ? section.scrollTop + section.clientHeight < section.scrollHeight - 1
        : direction < 0 && section.scrollTop > 1;
    };

    const onWheel = (event: WheelEvent) => {
      if (canScrollSection(event.deltaY)) return;
      event.preventDefault();
      if (lockRef.current) return;
      if (event.deltaY > 8) goTo(currentRef.current + 1);
      if (event.deltaY < -8) goTo(currentRef.current - 1);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof Element &&
        event.target.closest("button, a, input, textarea, select, [contenteditable]")
      ) {
        return;
      }

      const direction = ["ArrowDown", "PageDown", " ", "End"].includes(event.key)
        ? event.key === " " && event.shiftKey
          ? -1
          : 1
        : ["ArrowUp", "PageUp", "Home"].includes(event.key)
          ? -1
          : 0;

      if (canScrollSection(direction)) {
        event.preventDefault();
        const section = sectionElements[currentRef.current];
        const distance = ["Home", "End"].includes(event.key)
          ? section.scrollHeight
          : event.key.startsWith("Arrow")
            ? 40
            : section.clientHeight * 0.85;
        section.scrollBy({
          top: direction * distance,
          behavior: reducedMotion ? "auto" : "smooth",
        });
        return;
      }

      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        goTo(currentRef.current + direction);
      } else if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goTo(currentRef.current - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goTo(sectionElements.length - 1);
      }
    };

    let scrollingSection = false;

    const onTouchStart = (event: TouchEvent) => {
      scrollingSection = false;
      touchStartRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      const distance =
        (touchStartRef.current ?? 0) - (event.touches[0]?.clientY ?? 0);
      if (scrollingSection || canScrollSection(distance)) {
        // A swipe stays inside the list even if it reaches the end mid-gesture.
        scrollingSection = true;
        return;
      }
      event.preventDefault();
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (scrollingSection || touchStartRef.current === null || lockRef.current) {
        touchStartRef.current = null;
        return;
      }
      const distance =
        touchStartRef.current -
        (event.changedTouches[0]?.clientY ?? touchStartRef.current);
      if (Math.abs(distance) > 40)
        goTo(currentRef.current + (distance > 0 ? 1 : -1));
      touchStartRef.current = null;
    };

    const onResize = () => {
      syncActiveSection();
      window.scrollTo({
        top: sectionElements[currentRef.current]?.offsetTop ?? 0,
      });
      revealVisibleSections();
    };

    const onScroll = () => {
      setCueHidden(window.scrollY > 40);
      revealVisibleSections();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });

    const onDotClick = (event: Event) => {
      const index = Number(
        (event.currentTarget as HTMLButtonElement).dataset.index ?? "0",
      );
      goTo(index);
    };

    dotButtons.forEach((button) =>
      button.addEventListener("click", onDotClick),
    );

    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting)
              revealSection(entry.target as HTMLElement);
          });
          syncActiveSection();
        },
        { threshold: [0, 0.2, 0.6] },
      );
      sectionElements.forEach((section) => observer?.observe(section));
    }

    revealVisibleSections();
    const firstFallback = window.setTimeout(revealVisibleSections, 200);
    const secondFallback = window.setTimeout(revealVisibleSections, 800);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      dotButtons.forEach((button) =>
        button.removeEventListener("click", onDotClick),
      );
      observer?.disconnect();
      window.clearTimeout(firstFallback);
      window.clearTimeout(secondFallback);
    };
  }, [appReady, invitationStarted, sectionIds]);

  useEffect(() => {
    if (!normalizedInvitationCode) {
      setInvitees([]);
      setRsvps({});
      setInvitationError("");
      setConfirmed(false);
      return;
    }

    const controller = new AbortController();

    setInvitationLoading(true);
    setInvitationError("");
    setRsvpError("");
    setConfirmed(false);

    fetch(
      `${API_BASE_URL}/api/invitations/${encodeURIComponent(
        normalizedInvitationCode,
      )}`,
      { signal: controller.signal },
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("not-found");
        }

        return response.json() as Promise<InvitationResponse>;
      })
      .then((invitation) => {
        const fetchedInvitees = invitation.invitees ?? [];
        setInvitees(fetchedInvitees);
        setRsvps(
          Object.fromEntries(
            fetchedInvitees.map((invitee) => [
              invitee.id,
              invitee.status ?? "pending",
            ]),
          ),
        );
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setInvitees([]);
        setRsvps({});
        setInvitationError(
          error instanceof Error && error.message === "not-found"
            ? "not-found"
            : "load",
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) setInvitationLoading(false);
      });

    return () => controller.abort();
  }, [normalizedInvitationCode]);

  const selectRsvp = (inviteeId: string, value: RsvpStatus) => {
    setConfirmed(false);
    setRsvpError("");
    setRsvps((current) => ({ ...current, [inviteeId]: value }));
  };

  const startInvitation = async () => {
    if (startingInvitation || invitationStarted) return;

    setStartingInvitation(true);
    setMusicUnavailable(false);

    try {
      await audioRef.current?.play();
    } catch {
      setMusicUnavailable(true);
    } finally {
      setInvitationStarted(true);
      setStartingInvitation(false);
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    setMusicUnavailable(false);
    try {
      await audio.play();
    } catch {
      setMusicUnavailable(true);
    }
  };

  const submitRsvps = async () => {
    if (!normalizedInvitationCode || invitees.length === 0) return;

    setSubmittingRsvp(true);
    setConfirmed(false);
    setRsvpError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/invitations/${encodeURIComponent(
          normalizedInvitationCode,
        )}/rsvp`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            invitees: invitees.map((invitee) => ({
              inviteeId: invitee.id,
              status: rsvps[invitee.id] ?? "pending",
            })),
          }),
        },
      );

      if (!response.ok) {
        throw new Error("submit");
      }

      const updatedInvitation =
        (await response.json()) as InvitationResponse;
      const updatedInvitees = updatedInvitation.invitees ?? invitees;
      setInvitees(updatedInvitees);
      setRsvps(
        Object.fromEntries(
          updatedInvitees.map((invitee) => [
            invitee.id,
            invitee.status ?? "pending",
          ]),
        ),
      );
      setConfirmed(true);
    } catch {
      setRsvpError("submit");
    } finally {
      setSubmittingRsvp(false);
    }
  };

  return (
    <div
      className={isArabic ? "invitation-language-ar" : undefined}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <audio
        ref={audioRef}
        src="/uploads/music.mp3"
        preload="auto"
        loop
        onPlay={() => setMusicPlaying(true)}
        onPause={() => setMusicPlaying(false)}
        onError={() => {
          setMusicPlaying(false);
          setMusicUnavailable(true);
        }}
      />

      <div
        className="bg-fallback fixed inset-0 z-0"
        style={{ backgroundColor: activeChromeColor }}
        aria-hidden="true"
      >
        {slides.map((slide, index) => (
          <Image
            key={slide}
            src={slide}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover object-[center_30%] transition-opacity duration-[1600ms] ease-in-out ${
              activeSlide === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(180deg,rgba(44,28,18,0.30)_0%,rgba(48,30,20,0.22)_40%,rgba(40,24,16,0.34)_100%)] before:absolute before:inset-0 before:bg-[radial-gradient(130%_100%_at_50%_0%,rgba(58,38,24,0.12),transparent_45%)] after:absolute after:inset-0 after:bg-[radial-gradient(120%_120%_at_50%_120%,rgba(40,24,14,0.38),transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 z-[1] shadow-[inset_0_0_180px_25px_rgba(30,18,10,0.32)]"
        aria-hidden="true"
      />

      <div
        className="fixed right-[18px] top-[18px] z-[60] flex overflow-hidden rounded-full border border-[var(--gold-line)] bg-[rgba(36,24,17,0.46)] p-1 font-serif-wedding text-xs shadow-[0_5px_24px_rgba(20,12,7,0.2)] backdrop-blur-[7px]"
        role="group"
        aria-label={copy.languageLabel}
        dir="ltr"
      >
        {(["en", "ar"] as const).map((option) => (
          <button
            key={option}
            className={`min-w-10 cursor-pointer rounded-full px-2.5 py-1.5 transition duration-300 active:scale-95 ${
              language === option
                ? "bg-[var(--ink)] font-semibold text-[#3a2615]"
                : "text-[var(--ink)] hover:bg-white/[0.12]"
            }`}
            type="button"
            onClick={() => changeLanguage(option)}
            aria-pressed={language === option}
            lang={option}
          >
            {option === "en" ? "EN" : "عربي"}
          </button>
        ))}
      </div>

      <div
        className={`invitation-entry fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-7 py-10 text-center transition-[opacity,visibility] duration-700 ${
          invitationStarted
            ? "pointer-events-none invisible opacity-0"
            : "visible opacity-100"
        }`}
        aria-hidden={invitationStarted}
      >
        <div
          className="absolute inset-0 bg-[rgba(15,12,10,0.72)] backdrop-blur-[10px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(123,101,78,0.18),transparent_44%),linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.35))] shadow-[inset_0_0_180px_35px_rgba(0,0,0,0.56)]"
          aria-hidden="true"
        />

        <div className="invitation-entry-content relative flex w-full max-w-[430px] flex-col items-center">
          <div className="entry-rule w-full" aria-hidden="true" />
          <span className="wedding-diamond mt-11" aria-hidden="true" />

          <h1 className="text-shadow-wedding font-script mt-7 whitespace-nowrap pb-[0.12em] text-[clamp(45px,13vw,66px)] leading-none text-[var(--ink)]">
            {copy.groomName}{" "}
            <span className="text-[var(--gold)]">{copy.namesAnd}</span>{" "}
            {copy.brideName}
          </h1>
          <p className="text-shadow-wedding mt-3 text-[clamp(16px,4.5vw,19px)] italic text-[var(--ink-soft)]">
            {copy.together}
          </p>

          <button
            className="entry-start-button mt-9 flex h-[138px] w-[138px] cursor-pointer items-center justify-center rounded-full border border-[var(--gold-line)] bg-black/10 font-serif-wedding text-[13px] uppercase leading-[1.8] tracking-[0.28em] text-[var(--ink)] transition duration-500 hover:border-[var(--gold)] hover:bg-white/[0.06] hover:shadow-[0_0_42px_rgba(211,178,126,0.12)] active:scale-95 disabled:cursor-wait disabled:opacity-70"
            type="button"
            onClick={startInvitation}
            disabled={!appReady || startingInvitation}
            aria-label={copy.startAria}
          >
            <span>
              {startingInvitation || !appReady ? copy.loading : copy.click}
              <br />
              {startingInvitation || !appReady
                ? copy.invitation
                : copy.toStart}
            </span>
          </button>

          <span className="wedding-diamond mt-8" aria-hidden="true" />
          <div className="entry-rule mt-11 w-full" aria-hidden="true" />
        </div>
      </div>

      <main
        className={`relative z-[2] transition-opacity duration-700 ${
          invitationStarted ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden={!invitationStarted}
      >
        <section
          id={sectionIds[0]}
          className="relative flex min-h-svh flex-col items-center justify-center px-7 pb-[120px] pt-24 text-center"
          data-screen-label="01 Welcome"
        >
          <div className="w-full max-w-[430px]">
            <h1 className="reveal text-shadow-wedding font-script my-[0.12em] flex flex-col items-center pb-[0.08em] text-[clamp(58px,16vw,88px)] leading-[0.9] text-[var(--ink)]">
              <span>{copy.groomName}</span>
              <span className="text-[0.62em] leading-[0.72]">
                {copy.namesAnd}
              </span>
              <span>{copy.brideName}</span>
            </h1>
            <p className="reveal text-shadow-wedding font-serif-wedding text-[clamp(22px,6vw,30px)] italic leading-tight text-(--ink)">
              {copy.gettingMarried}
            </p>
            <div className="wedding-rule reveal" />
            <p className="reveal text-shadow-wedding text-[15px] uppercase tracking-[0.18em] text-[var(--ink-soft)]">
              {copy.date}
            </p>
            <div className="reveal mt-[34px] flex justify-center gap-3.5">
              {copy.countdown.map((label, index) => (
                <div
                  key={label}
                  className="flex min-w-[62px] flex-col items-center"
                >
                  <span className="text-shadow-wedding [font-variant-numeric:tabular-nums] text-[clamp(40px,11vw,52px)] font-medium leading-none text-[var(--ink)]">
                    {
                      [countdown.days, countdown.hours, countdown.mins, countdown.secs][
                        index
                      ]
                    }
                  </span>
                  <span className="mt-[9px] text-[11px] uppercase tracking-[0.26em] text-[var(--ink-soft)]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <button
            className={`text-shadow-wedding absolute bottom-[46px] left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2 text-[var(--ink-soft)] transition-opacity duration-500 ${cueHidden ? "opacity-0" : "opacity-100"}`}
            type="button"
            onClick={() =>
              document
                .getElementById(sectionIds[1])
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="text-[13px] uppercase tracking-[0.3em]">
              {copy.scroll}
            </span>
            <svg
              className="animate-bob"
              width="22"
              height="13"
              viewBox="0 0 22 13"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1l10 10L21 1"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </section>

        <section
          id={sectionIds[1]}
          className="flex min-h-svh flex-col items-center justify-center px-7 pb-[120px] pt-24 text-center"
          data-screen-label="02 Invitation"
        >
          <div className="w-full max-w-[430px]">
            <p className="reveal text-shadow-wedding text-[clamp(19px,5.2vw,22px)] italic leading-[1.7] text-[var(--ink)]">
              {copy.verse}
            </p>
            <p className="reveal text-shadow-wedding mt-2.5 text-[15px] tracking-[0.16em] text-[var(--ink-soft)]">
              {copy.verseReference}
            </p>
            <div className="wedding-rule reveal" />
            <p className="reveal text-shadow-wedding mt-3 text-[clamp(17px,4.5vw,20px)] leading-[1.55] text-[var(--ink)]">
              {copy.invite}
            </p>
            <p className="reveal text-shadow-wedding font-script mt-2 text-[clamp(42px,11vw,58px)] leading-[1.05] text-(--ink)">
              {copy.groomName}
              <br />
              {copy.namesAnd}
              <br />
              {copy.brideName}
            </p>
            <p className="reveal text-shadow-wedding text-[clamp(18px,4.8vw,21px)] leading-[1.75] text-[var(--ink)]">
              {copy.weddingDate}
            </p>
          </div>
        </section>

        <section
          id={sectionIds[2]}
          className="flex min-h-svh flex-col items-center justify-center px-7 py-12 text-center min-[390px]:pb-[120px] min-[390px]:pt-24 max-[380px]:px-5 max-[380px]:py-8 max-[380px]:min-h-dvh"
          data-screen-label="03 Ceremony"
        >
          <div className="flex w-full max-w-[430px] flex-col items-center">
            <h2 className="reveal text-shadow-wedding font-script text-[clamp(42px,12vw,64px)] leading-[1.04] text-(--ink)">
              {copy.ceremony}
            </h2>
            <div className="wedding-rule reveal my-4 max-[380px]:my-3" />
            <CalendarIcon className="reveal mx-auto block h-9 w-9 text-(--ink) drop-shadow-[0_2px_8px_rgba(30,18,10,0.45)] min-[390px]:h-10 min-[390px]:w-10" />
            <p className="reveal text-shadow-wedding mt-1 text-[clamp(17px,4.6vw,21px)] leading-[1.55] tracking-[0.04em] text-(--ink) min-[390px]:mt-1.5 min-[390px]:leading-[1.75]">
              {copy.ceremonyTime}
            </p>
            <LocationIcon className="reveal mx-auto mt-5 block h-10 w-9 text-(--ink) drop-shadow-[0_2px_8px_rgba(30,18,10,0.45)] min-[390px]:mt-[30px] min-[390px]:h-11 min-[390px]:w-10" />
            <p className="reveal text-shadow-wedding mt-1 text-[clamp(17px,4.6vw,21px)] font-semibold leading-[1.55] text-(--ink) min-[390px]:leading-[1.75]">
              {copy.church}
            </p>
            <ButtonLink
              className="reveal mt-4 max-[380px]:px-5 max-[380px]:py-[11px] max-[380px]:text-sm min-[390px]:mt-[22px]"
              href="https://maps.app.goo.gl/wdg6CGrwtx2vHT3d7"
            >
              {copy.churchLocation}
            </ButtonLink>
            <div className="wedding-rule reveal my-4 max-[380px]:my-3" />
            <p className="reveal text-shadow-wedding text-[clamp(17px,4.6vw,21px)] italic leading-[1.55] text-(--ink-soft) min-[390px]:leading-[1.75]">
              {copy.reception}
            </p>
            <p className="reveal text-shadow-wedding mt-2.5 text-[clamp(17px,4.6vw,21px)] font-semibold leading-[1.55] text-(--ink) min-[390px]:mt-3.5 min-[390px]:leading-[1.75]">
              {copy.venue}
            </p>
            <ButtonLink
              className="reveal mt-4 max-[380px]:px-5 max-[380px]:py-[11px] max-[380px]:text-sm min-[390px]:mt-[18px]"
              href="https://maps.app.goo.gl/WjYHt6hGfaGVvx148"
            >
              {copy.venueLocation}
            </ButtonLink>
          </div>
        </section>

        <section
          id={sectionIds[3]}
          className="flex min-h-svh flex-col items-center justify-center px-7 py-12 text-center min-[390px]:pb-[120px] min-[390px]:pt-24 max-[380px]:px-5 max-[380px]:py-8 max-[380px]:min-h-dvh"
          data-screen-label="04 Registry"
        >
          <div className="flex w-full max-w-[430px] flex-col items-center">
            <h2 className="reveal text-shadow-wedding font-script text-[clamp(42px,12vw,64px)] leading-[1.04] text-(--ink)">
              {copy.giftList}
            </h2>
            <div className="wedding-rule reveal my-4 max-[380px]:my-3" />
            <div className="reveal relative w-full overflow-hidden rounded-[3px] border border-(--gold-line) bg-[rgba(76,49,33,0.42)] px-5 py-6 shadow-[0_16px_48px_rgba(24,14,8,0.3)] backdrop-blur-[2px] before:pointer-events-none before:absolute before:inset-[6px] before:border before:border-[rgba(252,246,238,0.16)] min-[390px]:px-6 min-[390px]:py-7 max-[380px]:px-4 max-[380px]:py-5">
              <p className="relative text-shadow-wedding text-[clamp(17px,4.6vw,21px)] italic leading-[1.55] text-(--ink) min-[390px]:leading-[1.75]">
                {copy.giftIntro}
                <br />
                {copy.giftDetails}
              </p>
              <div className="wedding-rule relative my-4 min-[390px]:my-5" />
              <div className="relative text-shadow-wedding">
                <div className="mb-1.5 text-[clamp(19px,5vw,22px)] font-semibold tracking-[0.06em] text-(--ink) min-[390px]:mb-2">
                  <span dir="ltr">Whish Money</span>
                </div>
                <p className="font-registry-numbers text-[clamp(17px,4.5vw,20px)] leading-7 tracking-[0.04em] text-(--ink) min-[390px]:leading-8">
                  {copy.account}{" "}
                  <bdi dir="ltr" className="whitespace-nowrap">{whishAccountNumber}</bdi>
                </p>
                <button
                  type="button"
                  onClick={copyWhishAccount}
                  className={`mt-5 inline-flex min-h-11 min-w-[115px] cursor-pointer items-center justify-center border border-(--gold) bg-transparent px-4 py-3 font-serif-wedding text-[10px] font-normal uppercase text-(--ink) transition hover:bg-white/[0.1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--gold) active:scale-95 ${isArabic ? "tracking-normal" : "tracking-[0.16em]"}`}
                >
                  {copy.copyAccount}
                </button>
                <p role="status" className="mt-1 min-h-5 text-sm text-(--ink)">
                  {accountCopyStatus === "copied"
                    ? copy.accountCopied
                    : accountCopyStatus === "error"
                      ? copy.accountCopyError
                      : ""}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id={sectionIds[4]}
          className="flex h-svh flex-col items-center overflow-y-auto overscroll-y-contain px-7 pb-[120px] pt-24 text-center"
          data-screen-label="05 RSVP"
          data-scrollable
          tabIndex={0}
          aria-label={copy.rsvp}
        >
          <div className="my-auto w-full max-w-[430px] shrink-0">
            <h2 className="reveal text-shadow-wedding font-script text-[clamp(46px,13vw,64px)] leading-[1.04] text-[var(--ink)]">
              {copy.rsvp}
            </h2>
            <p className="reveal text-shadow-wedding mt-1.5 text-[15px] tracking-[0.14em] text-[var(--ink-soft)]">
              {copy.confirmBy}
            </p>
            <div className="wedding-rule reveal" />
            <p className="reveal text-shadow-wedding my-1.5 mb-[18px] text-[17px] tracking-[0.04em] text-[var(--ink-soft)]">
              {copy.inviteeCount}{" "}
              <b className="font-semibold text-[var(--ink)]">
                {invitees.length}
              </b>
            </p>
            {invitationLoading ? (
              <p className="reveal text-shadow-wedding text-[17px] italic text-[var(--ink-soft)]">
                {copy.loadingInvitation}
              </p>
            ) : invitationError ? (
              <p className="reveal text-shadow-wedding text-[17px] italic text-[var(--ink-soft)]">
                {invitationError === "not-found"
                  ? copy.invitationNotFound
                  : copy.invitationLoadError}
              </p>
            ) : invitees.length > 0 ? (
              <>
                <div className="reveal space-y-3">
                  {invitees.map((invitee) => (
                    <div
                      key={invitee.id}
                      className="flex flex-wrap items-center justify-between gap-3 border-y border-[rgba(252,246,238,0.16)] py-3 text-start"
                    >
                      <span className="text-shadow-wedding min-w-0 flex-1 basis-[120px] [overflow-wrap:anywhere] text-[19px] text-[var(--ink)]">
                        {invitee.fullName ?? copy.guest}
                      </span>
                      <div className="flex shrink-0 gap-2">
                        <RsvpButton
                          label={copy.accept}
                          variant="accept"
                          active={rsvps[invitee.id] === "accepted"}
                          onClick={() => selectRsvp(invitee.id, "accepted")}
                        />
                        <RsvpButton
                          label={copy.decline}
                          variant="decline"
                          active={rsvps[invitee.id] === "rejected"}
                          onClick={() => selectRsvp(invitee.id, "rejected")}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="reveal mt-[30px] inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-[2px] border border-[var(--gold-line)] bg-white/[0.04] px-[26px] py-[13px] font-serif-wedding text-base uppercase tracking-[0.12em] text-[var(--ink)] transition duration-300 hover:border-[var(--ink)] hover:bg-white/[0.14] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                  type="button"
                  onClick={submitRsvps}
                  disabled={submittingRsvp}
                >
                  {submittingRsvp ? copy.confirming : copy.confirm}
                </button>
                {rsvpError ? (
                  <p className="text-shadow-wedding mt-5 min-h-6 text-lg italic text-[var(--ink-soft)]">
                    {copy.submitError}
                  </p>
                ) : (
                  <p
                    className={`text-shadow-wedding mt-5 min-h-6 text-lg italic text-[var(--gold)] transition-opacity duration-500 ${confirmed ? "opacity-100" : "opacity-0"}`}
                  >
                    {copy.thankYou}
                  </p>
                )}
              </>
            ) : (
              <p className="reveal text-shadow-wedding text-[17px] italic text-[var(--ink-soft)]">
                {copy.noCode}
              </p>
            )}
          </div>
        </section>

        <section
          id={sectionIds[5]}
          className="flex min-h-svh flex-col items-center justify-center px-7 pb-[120px] pt-24 text-center"
          data-screen-label="06 Together"
        >
          <div className="flex w-full max-w-[430px] flex-col items-center">
            <h2 className="reveal text-shadow-wedding font-script text-[clamp(46px,13vw,62px)] leading-[1.04] text-[var(--ink)]">
              {copy.seeYou}
            </h2>
          </div>
        </section>
      </main>

      <button
        className={`fixed left-[18px] top-[18px] z-30 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[var(--gold-line)] bg-[rgba(36,24,17,0.34)] text-[var(--ink)] shadow-[0_5px_24px_rgba(20,12,7,0.2)] backdrop-blur-[5px] transition duration-300 hover:border-[var(--ink)] hover:bg-white/[0.12] active:scale-95 ${
          invitationStarted
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        type="button"
        onClick={toggleMusic}
        aria-label={musicPlaying ? copy.pauseMusic : copy.playMusic}
        title={musicUnavailable ? copy.musicUnavailable : undefined}
      >
        {musicPlaying ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 18V5l10-2v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 18V5l10-2v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </button>

      <nav
        className={`fixed right-[18px] top-1/2 z-30 flex -translate-y-1/2 flex-col gap-[13px] transition-opacity duration-700 ${
          invitationStarted
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-label={copy.sectionNavigation}
        aria-hidden={!invitationStarted}
      >
        {copy.sections.map((section, index) => (
          <button
            key={section}
            data-dot
            data-index={index}
            className={`h-[9px] w-[9px] cursor-pointer rounded-full border p-0 transition duration-300 ${
              activeSection === index
                ? "scale-125 border-[var(--gold)] bg-[var(--gold)]"
                : "border-[rgba(252,246,238,0.7)] bg-transparent"
            }`}
            type="button"
            aria-label={`${copy.goToSection} ${index + 1}: ${section}`}
          />
        ))}
      </nav>
    </div>
  );
}
