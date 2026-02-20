'use client';

import Image from 'next/image';
import { Download, Mail, Phone, Globe, MapPin } from 'lucide-react';

export default function ConnectContent() {
  const generateVCard = async () => {
    const response = await fetch('/images/jacqueline-amoako.png');
    const imageBlob = await response.blob();
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.readAsDataURL(imageBlob);
    });

    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Amoako;Jacqueline;F.;;',
      'FN:Jacqueline F. Amoako',
      'ORG:ZERA | Digital Growth Systems;',
      'TITLE:Digital Growth Strategist',
      'TEL;type=CELL;type=VOICE;type=pref:+233246492873',
      'EMAIL;type=WORK:jacqueline@zerahq.com',
      'URL;type=WORK:https://zerahq.com',
      'ADR;type=WORK:;;Accra;;;;Ghana',
      `PHOTO;ENCODING=b;TYPE=PNG:${base64}`,
      'NOTE:Engineering Revenue Systems for Global Brands.',
      'END:VCARD',
    ].join('\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'jacqueline-amoako-zera.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Profile Section */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-10 relative">
            <Image
              src="/images/jacqueline-amoako.png"
              alt="Jacqueline F. Amoako"
              width={96}
              height={96}
              className="rounded-full object-cover border-2 border-copper-500"
              priority
            />
          </div>
          <h1 className="font-display text-3xl font-bold mb-2 tracking-tight">
            Jacqueline F. Amoako
          </h1>
          <p className="text-white/60 font-medium mb-1">Digital Growth Strategist</p>
          <p className="text-copper-500 font-semibold text-sm uppercase tracking-wider">
            ZERA | Digital Growth Systems
          </p>
        </div>

        {/* Contact Details */}
        <div className="space-y-3 mb-8">
          <a
            href="mailto:jacqueline@zerahq.com"
            className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 hover:border-copper-500/30"
          >
            <Mail className="h-5 w-5 text-copper-500 flex-shrink-0" />
            <span className="text-white/90">jacqueline@zerahq.com</span>
          </a>

          <a
            href="tel:+233246492873"
            className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 hover:border-copper-500/30"
          >
            <Phone className="h-5 w-5 text-copper-500 flex-shrink-0" />
            <span className="text-white/90">+233246492873</span>
          </a>

          <a
            href="https://zerahq.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 hover:border-copper-500/30"
          >
            <Globe className="h-5 w-5 text-copper-500 flex-shrink-0" />
            <span className="text-white/90">zerahq.com</span>
          </a>

          <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10">
            <MapPin className="h-5 w-5 text-copper-500 flex-shrink-0" />
            <span className="text-white/90">Accra, Ghana</span>
          </div>
        </div>

        {/* Save Contact Button */}
        <button
          onClick={generateVCard}
          className="w-full bg-copper-500 hover:bg-copper-600 text-white font-bold py-4 px-6 shadow-xl transition-all duration-200 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Download className="h-6 w-6" strokeWidth={2.5} />
          <span className="text-lg tracking-wide">SAVE TO CONTACTS</span>
        </button>

        {/* Tagline */}
        <p className="text-center text-white/40 text-sm mt-8 font-light italic">
          Engineering Revenue Systems for Global Brands.
        </p>
      </div>
    </div>
  );
}
