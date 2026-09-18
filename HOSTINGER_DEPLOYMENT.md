# Hostinger VPS deployment

## 1. Install the runtime

Install Node.js 20 or newer, Nginx, Git, and PM2 on the VPS.

```bash
sudo npm install --global pm2
```

## 2. Upload and build

Clone the repository into a directory such as `/var/www/unseen-studios`, then run:

```bash
cd /var/www/unseen-studios
npm ci
npm run build
```

Create `/var/www/unseen-studios/.env` from `.env.example`. Set the real domain in `CLIENT_ORIGIN`, use `/api` for `VITE_API_URL`, and keep every secret only in `.env`.

## 3. Start with PM2

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Run the command printed by `pm2 startup` to enable automatic restart after a VPS reboot.

Check the application:

```bash
curl http://127.0.0.1:5001/api/health
pm2 logs unseen-studios
```

The health response should contain `"database":"connected"`.

## 4. Configure Nginx

Copy `deploy/nginx.conf.example` to `/etc/nginx/sites-available/unseen-studios` and enable it:

```bash
sudo ln -s /etc/nginx/sites-available/unseen-studios /etc/nginx/sites-enabled/unseen-studios
sudo nginx -t
sudo systemctl reload nginx
```

## 5. Enable HTTPS

After DNS points to the VPS:

```bash
sudo certbot --nginx -d unseenstudios.co.in -d www.unseenstudios.co.in
```

## Updating the website

```bash
cd /var/www/unseen-studios
git pull
npm ci
npm run build
pm2 restart unseen-studios --update-env
```

The former GitHub Pages and Render deployment configurations were removed because this project now runs as one Node application on the Hostinger VPS.
