import { issue } from 'node_modules/zod/v4/core/util';
import { ZodError } from 'zod';

export class ZodUtils {
  public static formatZodError(error: ZodError): string {
    //percorrer o array issues, verificar qual foi o path(o campo) que deu problema e vou
    //pegar a message do erro que deu

    const message = error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; \n ');
    return message;
  }
}
