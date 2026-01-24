import { z } from 'zod';

const configSchema = z.object({
  port: z.number().default(3000),
  nodeEnv: z.enum(['development', 'production', 'test']).default('development'),
  jwt: z.object({
    secret: z.string().min(32),
    refreshSecret: z.string().min(32),
  }),
  database: z.object({
    url: z.string().url(),
  }),
  redis: z.object({
    url: z.string().url(),
  }),
});

const rawConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-secret-key-change-in-production-32chars',
    refreshSecret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET + '_refresh' || 'dev-refresh-key-change-32chars',
  },
  database: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/rotax1',
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },
};

export const config = configSchema.parse(rawConfig);
export type Config = z.infer<typeof configSchema>;
