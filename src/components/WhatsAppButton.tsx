'use client';

import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=Witam,%20interesuje%20mnie%20najem%20okazjonalny`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Napisz na WhatsApp"
    >
      <div className="relative">
        {/* Tooltip */}
        <div
          className={`
            absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap
            bg-navy-900 text-white px-4 py-2 rounded-lg shadow-lg
            transition-all duration-200
            ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'}
          `}
        >
          <div className="font-semibold text-sm">Napisz na WhatsApp</div>
          <div className="text-xs text-navy-300">Odpowiadamy szybko!</div>
          {/* Arrow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-navy-900" />
        </div>

        {/* Button */}
        <div className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 animate-pulse-slow">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>

        {/* Pulse effect */}
        <div className="absolute inset-0 rounded-full bg-green-500 opacity-75 animate-ping" />
      </div>
    </a>
  );
}
