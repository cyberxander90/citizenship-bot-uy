
# Citizenship Bot UY

**Bot** to notify when there are new coupons for the [Uruguayan Citizenship](https://www.corteelectoral.gub.uy/tramites/carta_de_ciudadania).

## What it does?

Every **30sec** the **Bot** access to the [page](https://www.corteelectoral.gub.uy/tramites/carta_de_ciudadania) to get a coupon for Citizenship, and try to get an appointment.

![](__img__/citizenship-bot.gif)

If the page response something different to `En la oficina seleccionada no hay cupos disponibles` It could be two things:
- the page is down or not responding as expected
- there are coupons ![](__img__/coupons.png)

In any case the **Bot** will post a **Notification** to a configured Slack Account, so you can go and check what's going on.

You can also configure a couple of slot-times to receive a Notification to make sure the Bot is running.

## Run the Bot

The Bot is build on [node.js](https://nodejs.org/en/). First you will need to setup your Slack Account and your slot-times to receive the Bot stills running notifications.

### Configure

The configurations are passed by env variables

- **HOURS**: comma separated numbers of the hour to notify it stills running. It also depends on the `MINS` env variable. Example `11,13,15,19,23`.
- **MINS**: comma separated numbers of the min to notify it stills running. It also depends on the `HOURS` env variable. Example `1,30`.
- **CHANNEL_AUTOMATOR**: Slack webhook channel to post the notification. Example: `https://hooks.slack.com/services/abc/123`. See [how create a Webhook in Slack to receive notification](https://api.slack.com/messaging/webhooks#posting_with_webhooks).

### Start the Bot

```bash
HOURS=8,16 MINS=0 CHANNEL_AUTOMATOR=https://hooks.slack.com/services/abc/123 node index.js

# Start the Bot, every notification will be to https://hooks.slack.com/services/abc/123 and
# send notifications at 8:00 and 16:00 to ensure the bot is still running
```

## Deploy to a DigitalOcean Droplet

### 1- Clone the repo

```sh
> mkdir projects
> cd projects
> git clone https://github.com/cyberxander90/citizenship-bot-uy.git
```

### 2- create the systemd automator

```bash
> nano /lib/systemd/system/automator.service
```

Note: I am assuming node 17 is installed with nvm on `/root/.nvm/versions/node/v17.4.0/bin/node`. If it is not, change by your node path.

Note: I am assuming the project root path is `/root/projects/citizenship-bot-uy`. If it is not, change by your project root path.

```txt
[Unit]
Description=Automator
After=network.target

[Service]
Environment=HOURS=8,16
Environment=MINS=0
Environment=CHANNEL_AUTOMATOR=https://hooks.slack.com/services/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
Type=simple
User=root
ExecStart=/root/.nvm/versions/node/v17.4.0/bin/node /root/projects/citizenship-bot-uy/index.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

### 3- Start the automator

```bash
# apply new services change
> sudo systemctl daemon-reload

# reload or restart
> sudo systemctl reload-or-restart automator.service

# start the service
> sudo systemctl start automator.service

# check the service status
> sudo systemctl status automator.service

# restart the service
# > sudo systemctl restart hello.service

# stop the service
# > sudo systemctl stop hello.service

# make the service start when the machine start
> sudo systemtl enable hello.service
```
