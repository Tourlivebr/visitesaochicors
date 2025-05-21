"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Redireciona ao acessar a home
    window.location.href = "/cartao/index-sc"; // Muda para o slug desejado
  }, []);

  return <p>Buscando as melhores atrações para você...</p>;
}
