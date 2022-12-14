export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      host: process.env.MAILER_SERVICE_HOST,
      port: process.env.MAILER_SERVICE_PORT,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
