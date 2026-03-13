import { Utils } from '../../shared/utils/utils';
import { Entity } from '../shared/entities/entity';
import { UserValidatorFacatory } from '../factories/user-vadator.factory';

//o que eu preciso de uma pessoa para cadastra-la
export type UserCreateDto = {
  email: string;
  password: string;
};

export class User extends Entity {
  private constructor(
    id: string,
    private email: string,
    private password: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt);
    this.validate();
  }
  public static create({ email, password }: UserCreateDto): User {
    const id = Utils.generateUUID();
    const hashedPassword = Utils.encryptPassword(password);
    const createdAt = new Date();
    const updatedAt = new Date();
    //dessa forma como esta pegando a senha do usuario, esta em testo claro
    //correção: foi encriptado por Utils.encryptPassword(password) e passamos
    //a senha encriptada em hashedPassword
    return new User(id, email, hashedPassword, createdAt, updatedAt);
  }
  protected validate(): void {
    UserValidatorFacatory.create().validate(this);
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public comparePassword(aPassword: string): boolean {
    return Utils.comparePassword(aPassword, this.password);
  }
}
