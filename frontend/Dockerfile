FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

# Sao chép file build từ stage builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Sao chép cấu hình Nginx (tùy chọn, để đảm bảo SPA hoạt động)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

