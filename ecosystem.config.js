/**
 * Konfiguracja PM2 do uruchomienia aplikacji Next.js na VPS.
 * Użycie:  pm2 start ecosystem.config.js  (z katalogu projektu)
 *          pm2 save && pm2 startup        (autostart po reboot)
 */
module.exports = {
  apps: [
    {
      name: 'najem-okazjonalny',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
      },
    },
  ],
};
