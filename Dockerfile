# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY index.html tsconfig.json vite.config.ts ./
COPY src ./src
RUN npm run build

FROM composer:2 AS composer-bin

FROM php:8.4-apache
WORKDIR /var/www

RUN apt-get update \
    && apt-get install -y --no-install-recommends git unzip \
    && rm -rf /var/lib/apt/lists/* \
    && a2enmod rewrite

COPY --from=composer-bin /usr/bin/composer /usr/local/bin/composer

COPY composer.* ./
RUN composer install --no-dev --prefer-dist --no-interaction --no-progress --optimize-autoloader

COPY --from=frontend /app/dist /var/www/html
COPY server/contact.php /var/www/html/contact.php
COPY server/config.php /var/www/html/config.php
COPY docker/apache-site.conf /etc/apache2/sites-available/000-default.conf

RUN chown -R www-data:www-data /var/www/html /var/www/vendor
