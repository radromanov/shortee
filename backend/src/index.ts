import express from "express";
import Application from "./core/Application";

const app = express();

const application = new Application(app);
application.initialize();
application.start();
