import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "master";

const isLocal = process.env.NODE_ENV === "development";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "static",
    host: isLocal ? "127.0.0.1" : "rafaliserhajaya.com",
    basePath: "",
  },
  
  media: {
    tina: {
      publicFolder: "static",
      mediaRoot: "images",
      static: false,
    },
    accept: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
      'video/mp4',
    ],
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ['ind']
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "about",
        label: "About",
        path: "content/english/about",
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
            label: "About Image",
          },
          {
            type: "string",
            name: "company_vision",
            label: "Company Vision",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "company_mission",
            label: "Company Mission",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "company_values",
            label: "Company Values",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Value Title",
              },
              {
                type: "string",
                name: "description",
                label: "Value Description",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "vision",
                label: "Vision Section",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Section Title",
                  },
                  {
                    type: "string",
                    name: "vision",
                    label: "Vision Content",
                    ui: {
                      component: "textarea",
                    },
                  },
                ],
              },
              {
                name: "mission",
                label: "Mission Section",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Section Title",
                  },
                  {
                    type: "string",
                    name: "mission",
                    label: "Mission Content",
                    ui: {
                      component: "textarea",
                    },
                  },
                ],
              },
              {
                name: "companyValues",
                label: "Company Values",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Section Title",
                  },
                  {
                    type: "object",
                    name: "values",
                    label: "Values",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "title",
                        label: "Value Title",
                      },
                      {
                        type: "string",
                        name: "description",
                        label: "Value Description",
                        ui: {
                          component: "textarea",
                        },
                      },
                      {
                        type: "string",
                        name: "icon",
                        label: "Icon Class",
                        description: "Example: ti-crown",
                      },
                    ],
                  },
                ],
              },
              {
                name: "successStory",
                label: "Success Story",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Section Title",
                  },
                  {
                    type: "object",
                    name: "stories",
                    label: "Stories",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "title",
                        label: "Story Title",
                      },
                      {
                        type: "string",
                        name: "description",
                        label: "Story Description",
                        ui: {
                          component: "textarea",
                        },
                      },
                      {
                        type: "image",
                        name: "image",
                        label: "Story Image",
                      },
                      {
                        type: "datetime",
                        name: "date",
                        label: "Story Date",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "product",
        label: "Products",
        path: "content/english/product",
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
      {
        name: "success_story",
        label: "Success Stories",
        path: "content/english/success-story",
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
            label: "Story Image",
          },
          {
            type: "string",
            name: "type",
            label: "Type",
            required: true,
            options: ["success-story"],
          },
          {
            type: "string",
            name: "client_name",
            label: "Client Name",
          },
          {
            type: "string",
            name: "project_type",
            label: "Project Type",
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
            name: "location",
            label: "Project Location",
          },
          {
            type: "string",
            name: "duration",
            label: "Project Duration",
          },
          {
            type: "object",
            name: "project_details",
            label: "Project Details",
            list: true,
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label",
              },
              {
                type: "string",
                name: "value",
                label: "Value",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
          {
            type: "object",
            name: "gallery",
            label: "Project Gallery",
            list: true,
            fields: [
              {
                type: "image",
                name: "image",
                label: "Gallery Image",
              },
              {
                type: "string",
                name: "caption",
                label: "Image Caption",
              },
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "challenge",
                label: "Project Challenge",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Challenge Title",
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Challenge Description",
                    ui: {
                      component: "textarea",
                    },
                  },
                ],
              },
              {
                name: "solution",
                label: "Project Solution",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Solution Title",
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Solution Description",
                    ui: {
                      component: "textarea",
                    },
                  },
                ],
              },
              {
                name: "result",
                label: "Project Result",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Result Title",
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Result Description",
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
      {
        name: "contact",
        label: "Contact",
        path: "content/english/contact",
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
            type: "object",
            name: "office",
            label: "Office Information",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Office Title",
              },
              {
                type: "string",
                name: "address",
                label: "Address",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "email",
                label: "Email",
              },
              {
                type: "string",
                name: "whatsapp",
                label: "WhatsApp",
              },
              {
                type: "string",
                name: "maps_embed_url",
                label: "Google Maps Embed URL",
                description: "Format: https://www.google.com/maps/embed?pb=...",
              },
            ],
          },
          {
            type: "object",
            name: "factory",
            label: "Factory Information",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Factory Title",
              },
              {
                type: "string",
                name: "address",
                label: "Address",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "maps_embed_url",
                label: "Google Maps Embed URL",
                description: "Format: https://www.google.com/maps/embed?pb=...",
              },
            ],
          },
          {
            type: "object",
            name: "contact_form",
            label: "Contact Form Settings",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Form Title",
              },
              {
                type: "string",
                name: "success_message",
                label: "Success Message",
              },
              {
                type: "string",
                name: "error_message",
                label: "Error Message",
              },
              {
                type: "string",
                name: "submit_button_text",
                label: "Submit Button Text",
              },
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "banner",
        label: "Banner",
        path: "data/en",
        format: "yml",
        ui: {
          filename: {
            readonly: true,
            slugify: values => {
              return `homepage`
            },
          },
        },
        fields: [
          {
            type: "object",
            name: "slider",
            label: "Slider",
            fields: [
              {
                type: "boolean",
                name: "enable",
                label: "Enable Slider",
              },
              {
                type: "image",
                name: "bg_image",
                label: "Background Image",
              },
              {
                type: "object",
                name: "slider_item",
                label: "Slider Items",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                  },
                  {
                    type: "string",
                    name: "content",
                    label: "Content",
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "string",
                    name: "animation_in",
                    label: "Animation In",
                    options: ["left", "right", "up", "down"],
                  },
                  {
                    type: "string",
                    name: "animation_out",
                    label: "Animation Out",
                    options: ["left", "right", "up", "down"],
                  },
                  {
                    type: "object",
                    name: "button",
                    label: "Button",
                    fields: [
                      {
                        type: "boolean",
                        name: "enable",
                        label: "Enable Button",
                      },
                      {
                        type: "string",
                        name: "label",
                        label: "Button Label",
                      },
                      {
                        type: "string",
                        name: "link",
                        label: "Button Link",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "banner_feature",
            label: "Banner Feature",
            fields: [
              {
                type: "boolean",
                name: "enable",
                label: "Enable Banner Feature",
              },
              {
                type: "image",
                name: "image",
                label: "Banner Image",
              },
              {
                type: "object",
                name: "feature_item",
                label: "Feature Items",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Feature Name",
                  },
                  {
                    type: "string",
                    name: "icon",
                    label: "Feature Icon",
                    description: "Example: ti-book, ti-crown, etc",
                  },
                  {
                    type: "string",
                    name: "content",
                    label: "Feature Content",
                    ui: {
                      component: "textarea",
                    },
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "about",
            label: "About Section",
            fields: [
              {
                type: "boolean",
                name: "enable",
                label: "Enable About Section",
              },
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "image",
                name: "image",
                label: "Image",
              },
              {
                type: "string",
                name: "content",
                label: "Content",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "object",
                name: "button",
                label: "Button",
                fields: [
                  {
                    type: "boolean",
                    name: "enable",
                    label: "Enable Button",
                  },
                  {
                    type: "string",
                    name: "label",
                    label: "Button Label",
                  },
                  {
                    type: "string",
                    name: "link",
                    label: "Button Link",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "success_story",
            label: "Success Story Section",
            fields: [
              {
                type: "boolean",
                name: "enable",
                label: "Enable Success Story",
              },
              {
                type: "image",
                name: "bg_image",
                label: "Background Image",
              },
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "content",
                label: "Content",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "video_link",
                label: "Video Link",
              },
            ],
          },
          {
            type: "object",
            name: "cta",
            label: "Call to Action Section",
            fields: [
              {
                type: "boolean",
                name: "enable",
                label: "Enable CTA",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Subtitle",
              },
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "object",
                name: "button",
                label: "Button",
                fields: [
                  {
                    type: "boolean",
                    name: "enable",
                    label: "Enable Button",
                  },
                  {
                    type: "string",
                    name: "label",
                    label: "Button Label",
                  },
                  {
                    type: "string",
                    name: "link",
                    label: "Button Link",
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
