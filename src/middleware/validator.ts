import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";

interface ValidationSchema {
  params?: ObjectSchema;
  query?: ObjectSchema;
  body?: ObjectSchema;
}

const validate = (schema: ValidationSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const dataToValidate: Record<string, unknown> = {};
    const schemaToApply: Record<string, ObjectSchema> = {};

    (["params", "query", "body"] as const).forEach((key) => {
      if (schema[key]) {
        dataToValidate[key] = req[key];
        schemaToApply[key] = schema[key]!;
      }
    });

    const { error, value } = Joi.object(schemaToApply).validate(
      dataToValidate,
      {
        abortEarly: false,
        stripUnknown: true,
      }
    );

    if (error) {
      res.status(400).json({
        message: "Validation Error",
        errors: error.details.map((detail) => ({
          message: detail.message,
          path: detail.path.join("."),
        })),
      });
      return;
    }

    (["params", "query", "body"] as const).forEach((key) => {
      if (value[key]) {
        req[key] = value[key];
      }
    });

    next();
  };

export default validate;