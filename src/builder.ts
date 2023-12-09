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
    String: {
      Input: string;
      Output: string;
    };
  };
  DefaultInputFieldRequiredness: true;
}>({ defaultInputFieldRequiredness: true });

builder.addScalarType("Date", DateResolver, {});
builder.scalarType("File", {
  serialize: () => {
    throw new Error("File Uploads can only be used as input types");
  },
});
builder.queryType({
  fields: (t) => ({
    post: t.field({
      type: "String",
      nullable: true,
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: (root, args) => "",
    }),
  }),
});
builder.mutationType({
  fields: (t) => ({
    post: t.field({
      type: "String",
      nullable: true,
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: (root, args) => "",
    }),
  }),
});
