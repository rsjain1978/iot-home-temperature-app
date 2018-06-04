## Overview

This is a Mongoose OS app which can be ran on any device supporting Mongoose OS. This app has been tested on esp8266 MCU and does the folowing. It reads the temperature and
humidity data through a DHT11 sensor, creates a JSON message with the these details along with the Device Id and Timestamp. This message is then sent to AWS IOT via the 
MQTT protocol.

## How to install this app

- Clond the app or if you prefer to download then download it.
- Use Mongoose CLI to build and flash it:
