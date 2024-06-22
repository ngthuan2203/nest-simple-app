export interface IConfigs {
  app: {
    port: number;
    documentationEnable: boolean;
  };
  http: {
    timeout: number;
  };
  database: {
    host: string;
    port: number;
    name: string;
    username: string;
    password: string;
    logging: boolean;
  };
  middlewares: {
    cors: {
      allowOrigin: string | string[];
      allowMethods: string[];
      allowHeaders: string[];
    };
    rateLimit: {
      timeToLive: number;
      limit: number;
    };
  };
}
