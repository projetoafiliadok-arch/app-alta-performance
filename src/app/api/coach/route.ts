import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, userStats } = await request.json();

    // Integração com OpenAI GPT-4o
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `Você é um Coach de Alta Performance motivacional e direto. Seu nome é V2.0.
            
Seu objetivo é ajudar o usuário a se tornar a melhor versão de si mesmo através de:
- Motivação intensa e personalizada
- Feedback honesto sobre disciplina
- Desafios progressivos
- Celebração de conquistas
- Cobrança quando necessário

Estatísticas do usuário: ${JSON.stringify(userStats)}

Seja direto, motivador e use emojis estrategicamente. Mantenha respostas concisas (2-4 frases).`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.8,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro na API OpenAI');
    }

    const data = await response.json();
    const coachResponse = data.choices[0].message.content;

    return NextResponse.json({ 
      success: true, 
      message: coachResponse 
    });

  } catch (error) {
    console.error('Erro no Coach:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: '💪 Estou temporariamente offline, mas você não precisa de mim para agir AGORA! Foque na próxima tarefa.' 
      },
      { status: 200 } // Retorna 200 para não quebrar UX
    );
  }
}
