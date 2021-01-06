## PM2 Control Panel for Node.js
This is a simple web-based tool that allows you to manage pm2 instances.  You can start apps, view running apps, restart an app, stop an app, or delete an app.

To run this this project, you must have Node.js installed, along with npm, the Node.js package manager.

Clone the project:

`git clone https://github.com/Julien-ADDREA/pm2-control-panel`

Install the node module dependencies:

`cd pm2-control-panel && npm install`

Copy your ssl files into ssl directory if you want use ssl:

`cp path/of/your/privatekey.pem ./ssl/privkey.pem`

`cp path/of/your/certificate.pem ./ssl/cert.pem`

Run the app:

`sudo node server.js`

And finally, go to https://localhost:8282/ in your web browser.

I would recommend only running this within a local network, as to prevent the entire internet from having the ability to manage your PM2 instances.
