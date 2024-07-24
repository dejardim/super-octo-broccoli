"use server";

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: Request) {
  const { incident } = await request.json();

  const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
  });

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: generatePrompt("teste") }],
      model: 'gpt-4o',
    });

    return NextResponse.json({ feedback: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error generating feedback' }, { status: 500 });
  }
}

function generatePrompt(incidente: string) {
  return `
  Dado o incidente: "${incidente}", me ajude como comunicar isso gerando um feedback orgânico, estruturado e humano que me ajude a citar o incidente em conversa 1:1 com o colaborador. Separe em 4 camadas: Situação, Problema, Impacto e Sugestão de melhoria.

  Incidência:
  ${incidente}
  `;
}
