//fará o meio de campo das validaçoes dos meus objetos

export interface Validator<input> {
  validate(input: input): void;
}
