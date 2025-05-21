// Ativa o uso de hooks do React no ambiente do cliente (browser)
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Permite acessar o slug da URL

export default function CartaoPDF() {
  // Captura o nome dinâmico vindo da URL, por exemplo: /cartao/filippi → slug = "filippi"
  const { slug } = useParams();

  // Estado para detectar se é dispositivo móvel
  const [isMobile, setIsMobile] = useState(false);

  // Quando o componente carrega...
  useEffect(() => {
    // Verifica se o usuário está em um dispositivo móvel
    const isMobileDevice = /Mobi|Android|iPhone/i.test(navigator.userAgent);
    setIsMobile(isMobileDevice);

    // Se for mobile, redireciona direto para o PDF (fora do iframe)
    if (isMobileDevice && slug) {
      window.location.href = `/${slug}.pdf`;
    }
  }, [slug]);

  // Enquanto estiver no celular, mostra essa mensagem (rápida antes do redirecionamento)
  if (isMobile) {
    return <p>Buscando as melhores atrações para você...</p>;
  }

  // No desktop, exibe o PDF embutido em tela cheia via iframe
  return (
    <div
      style={{
        position: "fixed",     // ocupa toda a tela
        inset: 0,              // zera margens
        margin: 0,
        padding: 0,
        backgroundColor: "#fff",
        zIndex: 9999,
      }}
    >
      <iframe
        // Carrega o PDF com base no slug da URL
        src={`/${slug}.pdf#toolbar=0&navpanes=0&zoom=FitH&view=FitH&statusbar=0&messages=0&pagemode=none`}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          margin: 0,
          padding: 0,
          display: "block",
        }}
        title={`Cartão - ${slug}`}
      />
    </div>
  );
}
