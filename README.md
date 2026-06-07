# Hillwork

Static React/Vite site for Hillwork, LLC, packaged for Docker deployment behind Nginx Proxy Manager.

The frontend renders entirely in the browser. The direct-message form is handled by a small PHP endpoint that sends mail through SMTP.

## Deployment

This repository is intended to run as a Docker Compose service on a host that already has Nginx Proxy Manager attached to an external Docker network named `proxy-tier`.

The image builds the Vite frontend, serves it from Apache/PHP 8.4, and exposes:

- `/` for the website
- `/contact.php` for contact form submissions through PHPMailer/SMTP
- `/config.php` for public frontend config, currently the Cloudflare Turnstile site key

### Docker Host Setup

1. Clone the repository on the Docker host.
2. Copy the example environment file:
   `cp .env.example .env`
3. Edit `.env` with your SMTP, destination email, Cloudflare Turnstile, and optional local port settings.
4. Ensure the proxy network exists:
   `docker network create proxy-tier`
5. Build and start the service:
   `docker compose up -d --build`

If `proxy-tier` already exists, Docker will report that and you can continue.

### Nginx Proxy Manager

Create a Proxy Host in Nginx Proxy Manager that forwards to:

- Forward Hostname / IP: `hillwork`
- Forward Port: `80`
- Scheme: `http`

The `hillwork` name is provided as a Docker network alias on the external `proxy-tier` network.

### Local Host Port

`APP_PORT` maps a host port to Apache inside the container:

```text
localhost:APP_PORT -> container:80
```

This is useful for direct host-level testing. In production, public traffic should come through Nginx Proxy Manager.

## Frontend-Only Development

For quick React/Vite work without the PHP contact form:

1. Install dependencies:
   `npm install`
2. Start Vite:
   `npm run dev`

The Vite dev server previews the frontend only. The direct-message form requires the Docker/PHP service.

## License

Code is licensed under the MIT License. Site content, branding, and images are not licensed for reuse without permission.

Copyright (c) 2026 Hillwork, LLC.

See `LICENSE-CODE.md` for the code license text.
