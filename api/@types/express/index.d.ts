import express from "express";

declare module "express-serve-static-core" {
  interface Request {
    requestTime?: string;
  }
}
