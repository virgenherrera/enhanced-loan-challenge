# Stage 1: Dependency installation and build
FROM node:20 AS builder

WORKDIR /app

# Installs pnpm
RUN npm install -g pnpm

# Copies package definition files and installs dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copies the rest of the application files and builds
COPY . .
RUN pnpm build

# Stage 2: Production image
FROM node:20-alpine AS production

WORKDIR /app

# Installs pnpm in the production environment
RUN npm install -g pnpm

# Copies necessary packages and built files from the previous stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

# Exposes the port and sets the command to run the application
EXPOSE 3000
CMD ["npm", "run","start:prod"]
