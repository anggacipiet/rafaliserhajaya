import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "master";

export default defineConfig({
  branch,

  // Get this from tina.io
  //clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  clientId: "20883a00-ef1c-4234-83d9-dc9addde95c0",
  // Get this from tina.io
  //token: process.env.TINA_TOKEN,
  token: "e7c6b98ea4b57d1beba9e53fad23ba2f46fa4dac",

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "static",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "product",
        label: "Products",
        path: "content/english/course",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
          },
          {
            type: "image",
            name: "bg_image",
            label: "Background Image",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "image",
            label: "Product Image",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "Box Culvert",
              "U-Ditch",
              "Fence Panel", 
              "Column Panel", 
              "Column Elbow Panel",
              "Cover U-Ditch Heavy Duty",
              "Cover U-Ditch Light Duty"
            ],
          },
          {
            type: "string",
            name: "whatsapp",
            label: "WhatsApp",
            description: "Format: 0812 XXXX XXXX",
          },
          {
            type: "string",
            name: "email",
            label: "Email",
            description: "Format: example@domain.com",
          },
          {
            type: "string",
            name: "address",
            label: "Alamat",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "duration",
            label: "WHATSAPP",
            description: "Tampilan untuk nomor WhatsApp",
          },
          {
            type: "string",
            name: "weekly",
            label: "EMAIL",
            description: "Tampilan untuk email",
          },
          {
            type: "string",
            name: "fee",
            label: "ALAMAT",
            description: "Tampilan untuk alamat",
          },
          {
            type: "string",
            name: "apply_url",
            label: "WhatsApp Direct URL",
            description: "Format: https://wa.me/62812xxxxxxxx",
            ui: {
              validate: (value: string) => {
                if (!value?.startsWith('https://wa.me/')) {
                  return 'URL harus dimulai dengan https://wa.me/';
                }
                return undefined;
              },
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "productSpecs",
                label: "Product Specifications",
                fields: [
                  {
                    type: "object",
                    name: "specifications",
                    label: "Specifications",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "parameter",
                        label: "Parameter",
                      },
                      {
                        type: "string",
                        name: "value",
                        label: "Value",
                      },
                    ],
                  },
                ],
              },
              {
                name: "dimensionTable",
                label: "Dimension Table",
                fields: [
                  {
                    type: "object",
                    name: "dimensions",
                    label: "Dimensions",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "type",
                        label: "Type",
                      },
                      {
                        type: "string",
                        name: "a",
                        label: "A (Lebar Dalam)",
                      },
                      {
                        type: "string",
                        name: "b",
                        label: "B (Tinggi Dalam)",
                      },
                      {
                        type: "string",
                        name: "c",
                        label: "C (Lebar Luar)",
                      },
                      {
                        type: "string",
                        name: "d",
                        label: "D (Tinggi Luar)",
                      },
                      {
                        type: "string",
                        name: "ta",
                        label: "Ta (Tebal Atas)",
                      },
                      {
                        type: "string",
                        name: "tb",
                        label: "Tb (Tebal Bawah)",
                      },
                      {
                        type: "string",
                        name: "l",
                        label: "L (Panjang)",
                      },
                      {
                        type: "string",
                        name: "weight",
                        label: "Approx Weight (Kg)",
                      },
                    ],
                  },
                ],
              },
              {
                name: "priceList",
                label: "Price List",
                fields: [
                  {
                    type: "object",
                    name: "prices",
                    label: "Product Prices",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "category",
                        label: "Category",
                        options: [
                          "Box Culvert",
                          "U-Ditch",
                          "Fence Panel", 
                          "Column Panel", 
                          "Column Elbow Panel",
                          "Cover U-Ditch Heavy Duty",
                          "Cover U-Ditch Light Duty"
                        ],
                      },
                      {
                        type: "string",
                        name: "type",
                        label: "Type",
                      },
                      {
                        type: "string",
                        name: "size",
                        label: "Size",
                      },
                      {
                        type: "string",
                        name: "thickness",
                        label: "Thickness",
                      },
                      {
                        type: "number",
                        name: "price",
                        label: "Price (Rp)",
                      },
                      {
                        type: "string",
                        name: "loadType",
                        label: "Load Type",
                        options: ["Heavy Duty", "Light Duty"],
                      },
                      {
                        type: "string",
                        name: "note",
                        label: "Note",
                      },
                    ],
                  },
                ],
              },
              {
                name: "features",
                label: "Product Features",
                fields: [
                  {
                    type: "string",
                    name: "features",
                    label: "Features",
                    list: true,
                  },
                ],
              },
              {
                name: "terms",
                label: "Terms & Conditions",
                fields: [
                  {
                    type: "string",
                    name: "terms",
                    label: "Terms",
                    list: true,
                  },
                ],
              },
              {
                name: "contactInfo",
                label: "Contact Information",
                fields: [
                  {
                    type: "object",
                    name: "contact",
                    label: "Contact",
                    fields: [
                      {
                        type: "string",
                        name: "whatsapp",
                        label: "WhatsApp",
                      },
                      {
                        type: "string",
                        name: "email",
                        label: "Email",
                      },
                      {
                        type: "string",
                        name: "address",
                        label: "Address",
                        ui: {
                          component: "textarea",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
