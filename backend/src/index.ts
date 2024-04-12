import Config from "./core/Config";
import express from "express";
import Application from "./core/Application";

const config = new Config();
const app = express();

const application = new Application(config, app);
application.initialize();
application.start();
