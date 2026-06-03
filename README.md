# Hillwork

Static React/Vite site for Hillwork, LLC.

This app renders entirely in the browser and does not require Google Gemini, Google AI Studio, or any runtime API key.

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

The Vite dev server previews the frontend only. The direct-message form requires the PHP/Apache container below.

## Run With PHP Contact Form

1. Copy the example environment file:
   `cp .env.example .env`
2. Edit `.env` with your Purelymail SMTP username, password, and destination address.
3. Build and start the Apache/PHP container:
   `docker compose up --build`
4. Open `http://localhost:8080`

The container serves the production Vite build from Apache and handles form submissions at `/contact.php` using PHPMailer.
