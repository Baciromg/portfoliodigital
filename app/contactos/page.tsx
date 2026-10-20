export default function ContactosPage() {
  const whatsappNumber = "https://wa.me/qr/JBCCSSOAVJ7YP1"
  const whatsappMessage = encodeURIComponent("Olá! Vi o teu DevPortfolio e gostaria de entrar em contacto.");
  const instagramUsername = "https://www.instagram.com/baciro_djau_mg?stkn=MXhtNHliZXM4b2lyaA%3D%3D&utm_source=qr"

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <div className="text-center mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-1">
          Contacto Direto
        </h2>
        <h1 className="text-4xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl">
          Fale comigo.
        </h1>
        <p className="mt-3 text-lg text-[#86868b] max-w-xl mx-auto">
          Escolha o canal que preferir para iniciar uma conversa ou acompanhar os meus projetos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cartão WhatsApp */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="apple-card p-8 flex flex-col justify-between group cursor-pointer"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center font-bold text-xl mb-6">
              WA
            </div>
            <h3 className="text-2xl font-semibold text-[#1d1d1f]">WhatsApp</h3>
            <p className="mt-2 text-[#86868b] text-sm leading-relaxed">
              Mensagens diretas e respostas rápidas para propostas ou dúvidas.
            </p>
          </div>
          <div className="mt-8 flex items-center text-[#0071e3] font-medium text-sm group-hover:underline">
            Enviar mensagem &rarr;
          </div>
        </a>

        {/* Cartão Instagram */}
        <a
          href={`https://instagram.com/${instagramUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="apple-card p-8 flex flex-col justify-between group cursor-pointer"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center font-bold text-xl mb-6">
              IG
            </div>
            <h3 className="text-2xl font-semibold text-[#1d1d1f]">Instagram</h3>
            <p className="mt-2 text-[#86868b] text-sm leading-relaxed">
              Acompanhe as publicações, histórias e novidades do desenvolvimento.
            </p>
          </div>
          <div className="mt-8 flex items-center text-[#0071e3] font-medium text-sm group-hover:underline">
            Ver perfil &rarr;
          </div>
        </a>
      </div>
    </div>
  );
}