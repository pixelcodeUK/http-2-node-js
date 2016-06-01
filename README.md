#Testing HTTP 2.0 with Node JS
This repo contains a Vagrantfile that sets up a HTTP 2.0 server (with server push) with Node JS.

##Running the code

```
vagrant up
```
After Vagrant has finished booting:

```
vagrant ssh
```
Then run the server:

```
node /vagrant/server.js
```

In the browser on your host machine, go to *https://localhost:4433*

##How it works

This example serves a static HTML page with a reference to `alert.js`.

If your browser supports HTTP 2.0 push, it will serve the file `alert_push.js` otherwise it will serve `alert.js`.

##Inspecting HTTP 2.0

The provisioning script installs *nghttp*, which allows you to inspect the server:

```
node /vagrant/server.js &
nghttp -uv https://localhost:3001
```