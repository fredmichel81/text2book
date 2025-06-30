"use client";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white transition-colors duration-500">
      <main className="w-full max-w-4xl flex flex-col items-center justify-center px-4 py-24 text-center animate-fade-in">
        <div className="mb-8">
          <span className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-widest uppercase border border-blue-200">
            Early Access Waitlist
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-900 mb-4">
            Stop Losing Money to No-Shows
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium mb-8 max-w-2xl mx-auto">
            Turn text messages into booked appointments. <span className="font-bold text-blue-700">Txt2Book</span> lets your customers book by SMS—AI handles the rest, integrates with your calendar, and secures payments to prevent no-shows.
          </h2>
          <a
            href="https://forms.gle/your-google-form-link" // TODO: Replace with your actual Google Form link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-full bg-blue-700 text-white font-bold text-lg shadow-lg hover:bg-blue-900 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Join the Txt2Book Waitlist
          </a>
        </div>
        <div className="relative w-full flex flex-col sm:flex-row justify-center items-center gap-8">
          {/* English chat preview */}
          <div className="relative z-10 p-6 bg-blue-50 rounded-3xl shadow-xl flex flex-col items-center max-w-lg mx-auto border border-blue-100 w-full sm:w-1/2">
            <div className="w-full max-w-xs mx-auto flex flex-col gap-2">
              <div className="self-start bg-gray-100 text-gray-900 rounded-2xl rounded-bl-sm px-4 py-2 shadow-sm text-left text-base font-medium max-w-[80%]">
                <span className="block text-xs text-gray-400 mb-1">Customer</span>
                Hey, can I book a haircut for Friday 2 PM?
              </div>
              <div className="self-end bg-blue-600 text-white rounded-2xl rounded-br-sm px-4 py-2 shadow text-left text-base font-semibold max-w-[80%]">
                <span className="block text-xs text-blue-200 mb-1">Txt2Book</span>
                Hi, sure, we have a spot for you. Can I please have your name to book the appointment?
              </div>
              <div className="self-start bg-gray-100 text-gray-900 rounded-2xl rounded-bl-sm px-4 py-2 shadow-sm text-left text-base font-medium max-w-[80%]">
                <span className="block text-xs text-gray-400 mb-1">Customer</span>
                My name is Fred
              </div>
              <div className="self-end bg-blue-600 text-white rounded-2xl rounded-br-sm px-4 py-2 shadow text-left text-base font-semibold max-w-[80%]">
                <span className="block text-xs text-blue-200 mb-1">Txt2Book</span>
                Great Fred, a $10 deposit is required to secure your spot. Please proceed here:
                <span className="block mt-1">
                  <span className="text-blue-200 underline cursor-pointer select-none">https://pay.txt2book.com/secure/12345</span>
                </span>
              </div>
              <div className="self-end bg-blue-600 text-white rounded-2xl rounded-br-sm px-4 py-2 shadow text-left text-base font-semibold max-w-[80%]">
                <span className="block text-xs text-blue-200 mb-1">Txt2Book</span>
                Payment received! Thank you Fred, your appointment is now scheduled for Friday at 2:00 pm. See you soon.
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-400 italic">(SMS conversation preview - English)</div>
          </div>
          {/* French chat preview */}
          <div className="relative z-10 p-6 bg-blue-50 rounded-3xl shadow-xl flex flex-col items-center max-w-lg mx-auto border border-blue-100 w-full sm:w-1/2">
            <div className="w-full max-w-xs mx-auto flex flex-col gap-2">
              <div className="self-start bg-gray-100 text-gray-900 rounded-2xl rounded-bl-sm px-4 py-2 shadow-sm text-left text-base font-medium max-w-[80%]">
                <span className="block text-xs text-gray-400 mb-1">Client</span>
                Bonjour, puis-je réserver une coupe de cheveux pour vendredi à 14h ?
              </div>
              <div className="self-end bg-blue-600 text-white rounded-2xl rounded-br-sm px-4 py-2 shadow text-left text-base font-semibold max-w-[80%]">
                <span className="block text-xs text-blue-200 mb-1">Txt2Book</span>
                Bonjour, bien sûr, nous avons une place pour vous. Puis-je avoir votre nom pour réserver le rendez-vous ?
              </div>
              <div className="self-start bg-gray-100 text-gray-900 rounded-2xl rounded-bl-sm px-4 py-2 shadow-sm text-left text-base font-medium max-w-[80%]">
                <span className="block text-xs text-gray-400 mb-1">Client</span>
                Je m&apos;appelle Fred
              </div>
              <div className="self-end bg-blue-600 text-white rounded-2xl rounded-br-sm px-4 py-2 shadow text-left text-base font-semibold max-w-[80%]">
                <span className="block text-xs text-blue-200 mb-1">Txt2Book</span>
                Parfait Fred, un dépôt de 10$ est requis pour réserver votre place. Veuillez procéder ici :
                <span className="block mt-1">
                  <span className="text-blue-200 underline cursor-pointer select-none">https://pay.txt2book.com/secure/12345</span>
                </span>
              </div>
              <div className="self-end bg-blue-600 text-white rounded-2xl rounded-br-sm px-4 py-2 shadow text-left text-base font-semibold max-w-[80%]">
                <span className="block text-xs text-blue-200 mb-1">Txt2Book</span>
                Paiement reçu ! Merci Fred, votre rendez-vous est confirmé pour vendredi à 14h00. À bientôt.
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-400 italic">(Aperçu de conversation SMS - Français)</div>
          </div>
        </div>
      </main>
      <footer className="w-full flex justify-center pb-4">
        <p className="text-xs text-gray-400 text-center max-w-xl px-2">
          Disclaimer: Txt2Book is currently in early access. This site is for informational and waitlist purposes only. Joining the waitlist does not guarantee access or service. All trademarks and business names are property of their respective owners.
        </p>
      </footer>
    </div>
  );
}
