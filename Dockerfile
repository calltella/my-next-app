FROM node:22-bookworm

# Debian/Ubuntuベースのイメージなので apt-get を使用
RUN apt-get update && \
    apt-get install -y git curl sudo && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Debian/Ubuntuではsudoグループが標準で存在
RUN usermod -aG sudo node \
 && echo "%sudo ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/nopasswd \
 && chmod 0440 /etc/sudoers.d/nopasswd

WORKDIR /app

# カレントディレクトリの内容を /app にコピー
COPY --chown=node:node . .

USER node

EXPOSE 8787

# コンテナ作成
# docker build -t cloudflare-next .