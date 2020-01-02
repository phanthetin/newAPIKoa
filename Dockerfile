FROM node:8.15-alpine
ENV NODE_ENV production
WORKDIR /app

RUN apk update && \
    apk add redis && \
    apk add tzdata && \
    cp /usr/share/zoneinfo/Asia/Bangkok /etc/localtime && \
    echo "Asia/Bangkok" > /etc/timezone && \
    date  

WORKDIR /app

EXPOSE 3000
CMD ["/bin/sh", "run-container.sh"]

