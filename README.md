
# Payroll 

*Payroll is an employee-management app developed using
**React Native** that supports CRUD operations by sending
requests to a **MongoDB** database through a **Node** server.*

<img src="./assets/Home.jpg" height="200" align='center' />
&nbsp;
&nbsp;
&nbsp;
<img src="./assets/Profile.jpg" height="200" align='center' />


## Getting Started
It is recommended to use the **yarn** packet manager for this project. All images uploaded to the application are stored on the online **Cloudinary** platform.

In the main project directory:

1. Install the `npm-run-all` tool to run scripts concurrently :
```
npm install -g npm-run-all
```

2. Install the dependencies for Expo CLI and the Node server with:
```
yarn run dependencies
```

3. Create a `.env` file in the following format for external urls:
``` 
PROXY_URL = [localhost/port-forwarded URL]
CLOUD_URL = [Cloudinary URL]
MONGO_URL = [MongoDB URL]
CLOUD_PIN = [Cloudinary Preset URL]
```
4. Start the application by running Expo CLI and the Node/Express server simultaneously:
```
yarn run dev
```

You can now interact with the application to add or update new entries.
