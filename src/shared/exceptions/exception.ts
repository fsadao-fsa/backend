export class Exception extends Error {
  private readonly internalMessage: string;
  private readonly externalMessage: string;
  private readonly context: string;

  public constructor(
    internalMessage: string,
    externalMessage: string,
    context?: string,
  ) {
    super(internalMessage);
    this.internalMessage = internalMessage;
    this.externalMessage = externalMessage || '';
    this.context = context || '';
    this.name = Exception.name;
  }

  //mensagem interna serve de log para os desenvolvedores entender e corrigir o que aconteceu
  public getInternalMessage(): string {
    return this.internalMessage;
  }

  //São as mensagens que serão visiveis para o usuario final, aquelas q qqer pessoa
  //consiga ler e entender o que aconteceu, q a pessoa digitou algo errado
  public getExternalMessage(): string {
    return this.externalMessage;
  }

  public getContext(): string {
    return this.context;
  }
}
