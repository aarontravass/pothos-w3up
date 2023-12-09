import { builder } from "./builder";
import * as w3 from "@web3-storage/w3up-client";

const w3sUpClient = await w3.create();
type Email = `${string}@${string}`;



/**
 * @param {File} file
 */
async function base64File(file: File) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const text = [...bytes].map((b) => String.fromCharCode(b)).join("");
  const b64 = btoa(text);
  return b64;
}

builder.mutationField("logFile", (t) =>
  t.field({
    args: {
      carFile: t.arg({
        type: "File",
        required: true,
      }),
    },
    type: 'String',
    resolve: async (query, { carFile }, ctx) => {
      console.log(carFile);
      console.warn("base64(car)", await base64File(carFile));
      return "1";
    },
  })
);

builder.mutationField("uploadCar", (t) =>
  t.field({
    args: {
      carFile: t.arg({
        type: "File",
        required: true,
      }),
      email: t.arg.string(),
    },
    type: 'String',
    resolve: async (query, { carFile, email }, ctx) => {
      const space = await w3sUpClient.createSpace("1234567");
      await w3sUpClient.setCurrentSpace(space.did());
      await w3sUpClient.registerSpace(email as Email);
      return (await w3sUpClient.uploadCAR(carFile)).then((cid: any) =>
        cid.toString()
      );
    },
  })
);

builder.mutationField("authorizeEmail", (t) =>
  t.field({
    args: {
      email: t.arg.string(),
    },
    type: "String",
    resolve: (query, { email }, ctx) => {
      w3sUpClient.authorize(email as Email);
      return "Check email";
    },
  })
);