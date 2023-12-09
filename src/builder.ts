import SchemaBuilder from "@pothos/core";

export const builder = new SchemaBuilder<{
  Scalars: {
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
