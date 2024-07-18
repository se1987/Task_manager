# Node.js lts image
FROM node:lts

# ワーキングディレクトリを指定
WORKDIR /usr/src/app

# 同一ディレクトリ内のファイルを全てコピー
COPY . .

# パッケージをインストール
RUN npm install

# React の起動
CMD ["npm", "run", "dev"]