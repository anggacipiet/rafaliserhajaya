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
        name: "project",
        label: "Project",
        path: "content/english/project",
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
            options: ["project"],
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
      {
        name: "spesifikasi",
        label: "Spesifikasi",
        path: "content/english/spesifikasi",
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
            label: "Spesifikasi Image",
          },
          {
            type: "string",
            name: "spesifikasi_type",
            label: "Spesifikasi Type",
            options: ["Mutu", "Standar Produksi", "Produk", "Material"],
          },
          {
            type: "object",
            name: "spesifikasi_details",
            label: "Spesifikasi Details",
            fields: [
              {
                type: "string",
                name: "duration",
                label: "Duration",
              },
              {
                type: "string",
                name: "coverage",
                label: "Coverage",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "requirements",
                label: "Requirements",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "datetime",
                name: "deadline",
                label: "Application Deadline",
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
                name: "eligibility",
                label: "Eligibility Criteria",
                fields: [
                  {
                    type: "string",
                    name: "criteria",
                    label: "Criteria",
                    list: true,
                  },
                ],
              },
              {
                name: "documents",
                label: "Required Documents",
                fields: [
                  {
                    type: "string",
                    name: "documents",
                    label: "Documents",
                    list: true,
                  },
                ],
              },
              {
                name: "process",
                label: "Application Process",
                fields: [
                  {
                    type: "object",
                    name: "steps",
                    label: "Steps",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "title",
                        label: "Step Title",
                      },
                      {
                        type: "string",
                        name: "description",
                        label: "Step Description",
                        ui: {
                          component: "textarea",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                name: "faq",
                label: "FAQ Section",
                fields: [
                  {
                    type: "object",
                    name: "questions",
                    label: "Questions",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "question",
                        label: "Question",
                      },
                      {
                        type: "string",
                        name: "answer",
                        label: "Answer",
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
        name: "sertifikasi",
        label: "Sertifikasi",
        path: "content/english/sertifikasi",
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
            label: "Sertifikat Image",
          },
          {
            type: "string",
            name: "sertifikat_type",
            label: "Jenis Sertifikat",
            options: ["SNI", "ISO", "LPJK", "Lainnya"],
          },
          {
            type: "object",
            name: "sertifikat_details",
            label: "Detail Sertifikat",
            fields: [
              {
                type: "string",
                name: "nomor",
                label: "Nomor Sertifikat",
              },
              {
                type: "datetime",
                name: "tanggal_terbit",
                label: "Tanggal Terbit",
              },
              {
                type: "datetime",
                name: "masa_berlaku",
                label: "Masa Berlaku",
              },
              {
                type: "string",
                name: "penerbit",
                label: "Lembaga Penerbit",
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
        name: "services",
        label: "Services",
        path: "content/english/services",
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
            type: "string",
            name: "type",
            label: "Service Type",
            options: ["info", "pemesanan", "ketentuan", "catalog"],
            required: true,
          },
          {
            type: "object",
            name: "pemesanan_details",
            label: "Detail Pemesanan",
            fields: [
              {
                type: "object",
                name: "steps",
                label: "Langkah-langkah",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Judul Langkah",
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Deskripsi",
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "image",
                    name: "icon",
                    label: "Icon",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "ketentuan_details",
            label: "Detail Ketentuan",
            fields: [
              {
                type: "object",
                name: "terms",
                label: "Ketentuan",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Judul Ketentuan",
                  },
                  {
                    type: "string",
                    name: "content",
                    label: "Isi Ketentuan",
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
            name: "catalog_details",
            label: "Detail Catalog",
            fields: [
              {
                type: "string",
                name: "file_url",
                label: "URL File PDF",
              },
              {
                type: "datetime",
                name: "last_updated",
                label: "Terakhir Diperbarui",
              },
              {
                type: "string",
                name: "version",
                label: "Versi Catalog",
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
        name: "post",
        label: "Blog Post",
        path: "content/english/blog",
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
            type: "image",
            name: "bg_image",
            label: "Background Image",
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image",
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "string",
            name: "meta_title",
            label: "Meta Title (SEO)",
            description: "70 karakter optimal untuk SEO",
          },
          {
            type: "string",
            name: "meta_description",
            label: "Meta Description (SEO)",
            description: "150-160 karakter optimal untuk SEO",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "meta_keywords",
            label: "Meta Keywords",
            description: "Pisahkan dengan koma",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "string",
            name: "categories",
            label: "Categories",
            list: true,
            options: [
              "Box Culvert",
              "U-Ditch",
              "Fence Panel",
              "Precast",
              "Konstruksi",
              "Drainase",
              "Infrastruktur"
            ],
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            options: [
              "SNI",
              "ISO",
              "Quality Control",
              "Spesifikasi Teknis",
              "Panduan Pemasangan",
              "Tips Pemeliharaan",
              "Proyek",
              "Inovasi"
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
    ],
  },
});
