<div align="center">
  <a href="https://vispyr.com">
    <img src="./assets/vispyr-banner.png" alt="Vispyr Banner" width="400">
  </a>
</div>

# Vispyr Demo App

This Demo App was built to provide a quick and easy way for anyone to access Vispyr. When you run the app, you're able to simulate many scenarios that an actual application may inccur in production, and check how those can be observed through Vispyr.

# How to use

Clone this repository to your local environment and change directory:

```
git clone https://github.com/Vispyr/vispyr-demo-app.git && cd vispyr-demo-app
```

Make sure you have the Docker Daemon running on your system, then run the following command:

```
docker compose up -d
```
This will spin up the Demo App locally, along with [Vispyr's backend](https://github.com/Vispyr/vispyr-backend "Go to Vispyr backend") and the whole observability pipeline.

Access the app through port 5173 on your browser:

<div align="center">
  <img src="assets/demo_app.png" alt="Collector Overview" width="600">
</div>

# Learn more

Please refer to the [CLI documentation](https://github.com/Vispyr/vispyr-cli "Go to CLI page") for deployment instructions.

For a more detailed and comprehensive description of Vispyr, along with the motivation for its creation, please read our [case study](https://vispyr.com "Go to Case Study").
