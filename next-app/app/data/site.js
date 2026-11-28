const productionDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = productionDomain ? new URL(`https://${productionDomain}`) : undefined;
