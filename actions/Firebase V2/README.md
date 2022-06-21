<div align="center">
  <h1>
    <img src="https://silversunset.net/dbm/favicon.ico" width="30px"> Discord Bot Maker Firebase <img src="https://www.gstatic.com/devrel-devsite/prod/vcd1bbe5dda31d2b800805cc4c730b0229f847f2d108be33386b6e78644e79178/firebase/images/favicon.png">
  </h1>
  <p>
    Use the Firebase database on DBM easily and completely.
  </p>
  <a href="https://github.com/cappp/dbm-firebase/releases">
    <img src="https://img.shields.io/github/v/release/cappp/dbm-firebase?style=for-the-badge">
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/github/license/cappp/dbm-firebase?style=for-the-badge">
  </a>
</div>

### Table of contents

- [Getting started](#getting-started)
  - [Configuring DBM bot](#configuring-dbm-bot)
    - [Installing actions folder](#installing-actions-folder)
    - [Installing and setting data folder](#installing-and-setting-data-folder)
    - [Where find the X values of my Firebase project?](#where-find-the-x-values-of-my-firebase-project)
  - [Creating database](#creating-databse)
  - [All finished](#all-finished)
- [Issues](#issues)

## Getting started

We will first start by doing what is necessary.

**1.** We need to login in Firebase website with a Google account. Visit the [Firebase website](https://firebase.com).<br>
**2.** Click on top right button called "Go to console" to go to console of Firebase.

![](https://i.imgur.com/Z1FONuA.png)<br>

**3.** Create a new project and do what is needed.

![](https://i.imgur.com/8ykgybu.png)

**4.** Create a new web app and do what ask.

![](https://i.imgur.com/mVnfFtY.png)

> **Note:** you do not need to click this option, it is optional:

![](https://i.imgur.com/BL8J9T8.png)

All done so far. Let's continue.

### Configuring DBM bot

Now we will prepare your bot to start using the service. Look carefully.

**1.** Download the latest release of Firebase integration mods clicking [here](https://github.com/cappp/dbm-firebase/archive/master.zip) (note: [DBM Mods](https://github.com/dbm-network/mods) must be installed first).<br>
**2.** With the `.zip` file downloaded, extract it and open the first folder.

Looking at the folders, there will be the folder **"actions"** and **"data"**, in actions are DBM mods integrated with Firebase, and in data is where we should configure our database in our bot, there will have the file `fbConfig.json`.

#### Installing actions folder

**1.** Open your Steam Library and open the Softwares tab.<br>
**2.** Choose Discord Bot Maker → Local Files → Browse Local Files<br>
**3.** Now copy the folder `actions` you downloaded out of the zip file into that folder you just opened (please overwrite existing ones).

> **Note:** If you don't run your bot with DBM make sure to copy this actions to your bot's directory too! Same for hosted bots! If you don't do this, missing actions will appear as "XYZ is not an Action" in your console.

#### Installing and setting data folder

**1.** Copy the data folder to your DBM bot main directory (replace existing files).<br>
**2.** In the folder of your bot, now go to the data folder and open the file `fbConfig.json`, in it you will see something like this:<br>
```json
{
  "apiKey": "X",
  "authDomain": "X",
  "databaseURL": "X",
  "projectId": "X",
  "storageBucket": "X",
  "messagingSenderId": "X",
  "appId": "X"
}
```
You must replace each **X** for such a thing as you are saying and then just save.

#### Where find the X values of my Firebase project?

**1.** Access your chosen Firebase project.<br>
**2.** Go to where your project settings are.

![](https://i.imgur.com/ClT2STE.png)

**3.** Scroll down and you will see the apps of your project (create one if you don't have one), go to where is **"Firebase SDK snippet"** and select the **"Config"** option and **copy the value of each field** of that and paste it into your `fbConfig.json`.

![](https://i.imgur.com/kDTm8B6.png)

### Creating database

**1.** In the main part of your Firebase project, select from the **"Database"** side menu.

![](https://i.imgur.com/FwsqNkn.png)

**2.** On the page you will have two database options, I recommend **Realtime** (the below), both have slight differences, but Realtime is already great. Click on **Create Database**.

![](https://i.imgur.com/Uopser3.png)

**3.** Choose whether the DB will be private to write something to and read to certain people or if it will be open to everyone, use open mode (test mode), since if you have a command that uses database, the user will have to be able to register their datas.

![](https://i.imgur.com/fYRn462.png)

### All finished

Now your Firebase database is registered and you can now use the control, check, store and delete mods to control servers, members, and globally your DB in your DBM bot!

> **You can use the following mods:**

- Control Firebase Server Data
- Control Firebase Member Data
- Control Firebase Global Data
- Check Firebase Server Data
- Check Firebase Member Data
- Check Firebase Global Data
- Store Firebase Server Data
- Store Firebase Member Data
- Store Firebase Global Data
- Delete Firebase Server Data
- Delete Firebase Member Data
- Delete Firebase Global Data
- Store Firebase Member Data List

## Issues

If you want to make a suggestion or report a possible bug, open an [issue](https://github.com/cappp/dbm-firebase/issues).
