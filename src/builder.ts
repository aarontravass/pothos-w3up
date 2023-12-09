import SchemaBuilder from "@pothos/core";
import { DateResolver } from "graphql-scalars";

export const builder = new SchemaBuilder<{
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
    ID: {
      Input: string;
      Output: string;
    };
    File: {
      Input: File;
      Output: never;
    };
  };
  DefaultInputFieldRequiredness: true;
}>({ defaultInputFieldRequiredness: true });

builder.addScalarType('Date', DateResolver, {})
builder.scalarType('File', {
  serialize: () => {
    throw new Error('File Uploads can only be used as input types')
  }
})