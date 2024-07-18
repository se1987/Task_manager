# Dockerfile
FROM mcr.microsoft.com/playwright:focal

WORKDIR /e2e-test

COPY package.json package-lock.json ./

RUN npm install

# Playwrightの依存関係のインストール
RUN npx playwright install
# RUN npx playwright install-deps

COPY . .

CMD ["npx", "playwright", "test"]
