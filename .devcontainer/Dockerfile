FROM node:20-slim

ARG UID=1000
ARG GID=1000
RUN groupadd -g $GID appuser && useradd -m -u $UID -g $GID -s /bin/bash appuser

WORKDIR /app
RUN chown appuser:appuser /app
USER appuser