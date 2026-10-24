import { defineField, defineType } from 'sanity';

export const property = defineType({
  name: 'property',
  title: 'Property Listings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Property Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(90),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Outright Land', value: 'outright-land' },
          { title: 'Completed Housing', value: 'completed-housing' },
          { title: 'Off-Plan', value: 'off-plan' },
          { title: 'Cooperative Land Banking', value: 'cooperative-land-banking' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location Description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleType',
      title: 'Legal Title Document Type',
      type: 'string',
      description: 'E.g., Certificate of Occupancy, Governor’s Consent, Gazette, Excision, Deed of Assignment',
      options: {
        list: [
          { title: 'Certificate of Occupancy (C of O)', value: 'Certificate of Occupancy' },
          { title: "Governor's Consent", value: "Governor's Consent" },
          { title: 'Government Gazette', value: 'Government Gazette' },
          { title: 'Excision in Process / Approved', value: 'Approved Excision' },
          { title: 'Deed of Assignment & Registered Survey', value: 'Deed of Assignment & Survey' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (NGN)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'priceUnit',
      title: 'Price Unit (e.g. per plot, total unit)',
      type: 'string',
      initialValue: 'per plot',
    }),
    defineField({
      name: 'status',
      title: 'Listing Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Selling Fast', value: 'selling-fast' },
          { title: 'Sold Out', value: 'sold-out' },
        ],
      },
      initialValue: 'available',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Detailed Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Feature Cover Image',
      type: 'image',
      description: 'Landscape orientation (16:9) recommended. Max 8MB. JPG or PNG.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text for SEO',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', title: 'Caption', type: 'string' },
            { name: 'alt', title: 'Alt Text', type: 'string' },
          ],
        },
      ],
      options: { layout: 'grid' },
    }),
    defineField({
      name: 'paymentPlans',
      title: 'Approved Payment Schedules',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities & Infrastructure Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'videoWalkthroughUrl',
      title: 'Video Tour URL (YouTube Unlisted / Vimeo)',
      type: 'url',
    }),
    defineField({
      name: 'brochurePdf',
      title: 'Downloadable PDF Brochure / Survey Chart',
      type: 'file',
      options: { accept: 'application/pdf' },
    }),
  ],
});
