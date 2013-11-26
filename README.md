# chata

This repository contains the source code for a simple chat application


On the client side it uses Bootstrap, Angular.js, Gravatar, JQuery(for directives only), Socket.io, and Moment.js
On the server side it uses Node, Express, Mongoose, Socket.io, Moment, EmailJS, and Bcrypt.

Todos:
- replace Emailjs with NodeMailer(more reliable)
- find a good place for the global stuff that currently resides in the directives javascript file(socket addListener, checkCredentials). Move to service layer.
