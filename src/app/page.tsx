"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import Lucide icons
const LucideMessageCircle = dynamic(() => import("lucide-react").then(m => m.MessageCircle), { ssr: false });
const LucideCalendar = dynamic(() => import("lucide-react").then(m => m.Calendar), { ssr: false });
const LucideShieldCheck = dynamic(() => import("lucide-react").then(m => m.ShieldCheck), { ssr: false });
const LucideLanguages = dynamic(() => import("lucide-react").then(m => m.Languages), { ssr: false });

type Message = { sender: string; text: string };

const englishMessages: Message[] = [
  { sender: "Customer", text: "Hey, can I book a haircut for Friday 2 PM?" },
  { sender: "Txt2Book", text: "Hi, sure, we have a spot for you. Can I please have your name to book the appointment?" },
  { sender: "Customer", text: "My name is Fred" },
  { sender: "Txt2Book", text: "Great Fred, a $10 deposit is required to secure your spot. Please proceed here:\nhttps://pay.txt2book.com/secure/12345" },
  { sender: "Txt2Book", text: "Payment received! Thank you Fred, your appointment is now scheduled for Friday at 2:00 pm. See you soon." },
];

const frenchMessages: Message[] = [
  { sender: "Client", text: "Bonjour, puis-je réserver une coupe de cheveux pour vendredi à 14h ?" },
  { sender: "Txt2Book", text: "Bonjour, bien sûr, nous avons une place pour vous. Puis-je avoir votre nom pour réserver le rendez-vous ?" },
  { sender: "Client", text: "Je m'appelle Fred" },
  { sender: "Txt2Book", text: "Parfait Fred, un dépôt de 10$ est requis pour réserver votre place. Veuillez procéder ici :\nhttps://pay.txt2book.com/secure/12345" },
  { sender: "Txt2Book", text: "Paiement reçu ! Merci Fred, votre rendez-vous est confirmé pour vendredi à 14h00. À bientôt." },
];

type TypingChatProps = { messages: Message[]; lang: string };

function TypingChat({ messages, lang }: TypingChatProps) {
  const [displayed, setDisplayed] = useState<Message[]>([]);
  const [typing, setTyping] = useState("");
  const [msgIdx, setMsgIdx] = useState(0);
  useEffect(() => {
    if (msgIdx < messages.length) {
      let i = 0;
      const msg = messages[msgIdx].text;
      setTyping("");
      const interval = setInterval(() => {
        setTyping(msg.slice(0, i + 1));
        i++;
        if (i === msg.length) {
          clearInterval(interval);
          setTimeout(() => {
            setDisplayed((prev) => [...prev, { ...messages[msgIdx], text: msg }]);
            setTyping("");
            setMsgIdx((idx) => idx + 1);
          }, 600);
        }
      }, 18 + Math.random() * 30);
      return () => clearInterval(interval);
    }
  }, [msgIdx, messages]);
  return (
    <div className="w-full max-w-xs mx-auto flex flex-col gap-2">
      {displayed.map((m, idx) => (
        <div
          key={idx}
          className={
            m.sender === (lang === "fr" ? "Client" : "Customer")
              ? "self-start bg-gray-100 text-gray-900 rounded-2xl rounded-bl-sm px-4 py-2 shadow-sm text-left text-base font-medium max-w-[80%]"
              : "self-end bg-blue-600 text-white rounded-2xl rounded-br-sm px-4 py-2 shadow text-left text-base font-semibold max-w-[80%]"
          }
        >
          <span className={
            "block text-xs mb-1 " +
            (m.sender === (lang === "fr" ? "Client" : "Customer") ? "text-gray-400" : "text-blue-200")
          }>
            {m.sender}
          </span>
          {m.text.split("\n").map((line, i) => (
            <span key={i} className={i > 0 ? "block mt-1" : undefined}>{line}</span>
          ))}
        </div>
      ))}
      {typing && (
        <div
          className={
            messages[msgIdx].sender === (lang === "fr" ? "Client" : "Customer")
              ? "self-start bg-gray-100 text-gray-900 rounded-2xl rounded-bl-sm px-4 py-2 shadow-sm text-left text-base font-medium max-w-[80%]"
              : "self-end bg-blue-600 text-white rounded-2xl rounded-br-sm px-4 py-2 shadow text-left text-base font-semibold max-w-[80%]"
          }
        >
          <span className={
            "block text-xs mb-1 " +
            (messages[msgIdx].sender === (lang === "fr" ? "Client" : "Customer") ? "text-gray-400" : "text-blue-200")
          }>
            {messages[msgIdx].sender}
          </span>
          <span className="text-blue-200 underline cursor-pointer select-none break-all">
            {typing}
          </span>
        </div>
      )}
    </div>
  );
}

const features = [
  {
    icon: LucideMessageCircle,
    title: "AI-Powered Replies",
    desc: "Instant, natural SMS conversations with your customers."
  },
  {
    icon: LucideCalendar,
    title: "Calendar Sync",
    desc: "Seamless integration with your existing calendar."
  },
  {
    icon: LucideShieldCheck,
    title: "Payment Protection",
    desc: "Secure deposits and payments to prevent no-shows."
  },
  {
    icon: LucideLanguages,
    title: "Bilingual Support",
    desc: "Serve customers in English and French automatically."
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white transition-colors duration-500">
      <main className="w-full max-w-4xl flex flex-col items-center justify-center px-4 py-24 text-center animate-fade-in">
        <div className="mb-8">
          <span className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-widest uppercase border border-blue-200">
            Early Access Waitlist
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-900 mb-4 leading-tight">
            Stop Losing Money to<br />
            <span className="text-blue-700 block">No-Shows</span>
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium mb-8 max-w-2xl mx-auto">
            Turn text messages into booked appointments. <span className="font-bold text-blue-700">Txt2Book</span> lets your customers book by SMS—AI handles the rest, integrates with your calendar, and secures payments to prevent no-shows.
          </h2>
          <a
            href="#waitlist-form"
            className="inline-block px-8 py-4 rounded-full bg-blue-700 text-white font-bold text-lg shadow-lg hover:bg-blue-900 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Join the Txt2Book Waitlist
          </a>
        </div>
        <div className="relative w-full flex flex-col sm:flex-row justify-center items-center gap-8">
          {/* English chat preview */}
          <div className="relative z-10 p-6 bg-blue-50 rounded-3xl shadow-xl flex flex-col items-center max-w-lg mx-auto border border-blue-100 w-full sm:w-1/2">
            <TypingChat messages={englishMessages} lang="en" />
            <div className="mt-4 text-xs text-gray-400 italic">(SMS conversation preview - English)</div>
          </div>
          {/* French chat preview */}
          <div className="relative z-10 p-6 bg-blue-50 rounded-3xl shadow-xl flex flex-col items-center max-w-lg mx-auto border border-blue-100 w-full sm:w-1/2">
            <TypingChat messages={frenchMessages} lang="fr" />
            <div className="mt-4 text-xs text-gray-400 italic">(Aperçu de conversation SMS - Français)</div>
          </div>
        </div>
        {/* Feature Section */}
        <section className="mt-16 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="flex flex-col items-center p-6 bg-white rounded-2xl shadow border border-blue-50 hover:shadow-lg transition-all">
                <div className="mb-3">
                  <Icon className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="font-bold text-blue-900 text-lg mb-1">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            );
          })}
        </section>
        {/* Embedded Google Form Section */}
        <section id="waitlist-form" className="mt-16 w-full flex flex-col items-center justify-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900 mb-4">Join the Txt2Book Waitlist</h2>
          <div className="w-full max-w-3xl mx-auto">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdfC4AlDeOZ7g4Y2fArhR9fT1CAIvZnYUM2aaBBdt1pevM4zQ/viewform?embedded=true"
              width="100%"
              height="900"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Txt2Book Waitlist"
              className="rounded-xl border border-blue-100 shadow"
            >
              Loading…
            </iframe>
          </div>
        </section>
      </main>
      <footer className="w-full flex justify-center pb-4">
        <p className="text-xs text-gray-400 text-center max-w-xl px-2">
          Disclaimer: Txt2Book is currently in early access. This site is for informational and waitlist purposes only. Joining the waitlist does not guarantee access or service. All trademarks and business names are property of their respective owners.
        </p>
      </footer>
    </div>
  );
}
