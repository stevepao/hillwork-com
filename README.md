# Hillwork

Static React/Vite site for Hillwork, LLC.

The frontend renders entirely in the browser. The direct-message form is handled by a small PHP endpoint that sends mail through SMTP.

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
2. Edit `.env` with your Purelymail SMTP settings, destination address, and Cloudflare Turnstile keys.
3. Build and start the Apache/PHP container:
   `docker compose up --build`
4. Open `http://localhost:8080`

The container serves the production Vite build from Apache and handles form submissions at `/contact.php` using PHPMailer. When Turnstile keys are present, the form verifies the visitor's Turnstile token before sending mail.

## License

Code is licensed under the MIT License. Site content, branding, and images are not licensed for reuse without permission.

Copyright (c) 2026 Hillwork, LLC.

See `LICENSE-CODE.md` for the code license text.
