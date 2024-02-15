import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: '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',
});

@Injectable()
export class OpenaiService {
  async main() {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
      model: 'gpt-3.5-turbo',
      max_tokens: 512,
    });

    console.log(completion.choices[0]);
  }
}
