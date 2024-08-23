# Use the official PHP 8.2 image as the base image
FROM php:8.2-cli

# Install required dependencies for php-rdkafka
RUN apt-get update && apt-get install -y \
    librdkafka-dev \
    libz-dev \
    libssl-dev \
    unzip \
    git \
    && docker-php-ext-install sockets \
    && pecl install rdkafka \
    && docker-php-ext-enable rdkafka

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set the working directory
WORKDIR /app

# Copy the project files to the working directory
COPY . /app

# Install PHP dependencies using Composer
RUN composer install

# Ensure the command is executed with the right user
CMD ["php", "-a"]
