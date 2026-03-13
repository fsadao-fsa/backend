// eslint-disable-next-line @typescript-eslint/no-unused-vars
import id from 'zod/v4/locales/id.js';
import { User } from '../entities/user.entity';
import { Validator } from '../shared/validators/validator';
import { uuid, email, z } from 'zod';
import { ZodUtils } from '../../shared/utils/zod-utils';
import { ValidatorDomainException } from '../exceptions/validator-domain.exception';

//Iremos criar um teste para validar todas as nossas açoes, como, criar usuario etc

export class UserZodValidator implements Validator<User> {
  private constructor() {}
  public static create(): UserZodValidator {
    return new UserZodValidator();
  }
  public validate(input: User): void {
    try {
      this.getZodSchema().parse(input);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const message = ZodUtils.formatZodError(error);
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw new ValidatorDomainException(
          `Error While validating user ${input.getId()}: ${message}`,
          `Os dados para criação de usuário são inválidas: ${message}`,
          UserZodValidator.name,
        );
      }
    }
  }

  private getZodSchema() {
    const zodSchema = z.object({
      id: z.string().uuid(),
      email: z.string().email(),
      password: z.string().min(8),
      createdAt: z.date(),
      updatedAt: z.date(),
    });
    return zodSchema;
  }
}
