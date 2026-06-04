# Produkcyjny obraz Next.js — dla Coolify (Hostinger VPS) lub zwykłego Dockera.
# Build wieloetapowy: najpierw kompilacja, potem lekki obraz uruchomieniowy.

FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# UWAGA: zmienne NEXT_PUBLIC_* są wstrzykiwane na etapie build.
# W Coolify ustaw je jako „Build Variable", aby były dostępne podczas `npm run build`.
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Katalog na zamówienia (orders.json). Zamontuj jako TRWAŁY WOLUMEN w Coolify → /app/data,
# inaczej dane przepadną przy ponownym wdrożeniu.
RUN mkdir -p /app/data

EXPOSE 3000
CMD ["npm", "start"]
