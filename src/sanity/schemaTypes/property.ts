import { defineField, defineType } from 'sanity';

export const propertyType = defineType({
  name: 'property',
  title: 'Property Listing',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Property Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
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
          { title: 'Off-Plan Development', value: 'off-plan' },
          { title: 'Cooperative Land Banking', value: 'cooperative-land-banking' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (₦)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'priceUnit',
      title: 'Price Unit (e.g., plot, unit, 500sqm)',
      type: 'string',
    }),
    defineField({
      name: 'initialDeposit',
      title: 'Initial Deposit (₦)',
      type: 'number',
    }),
    defineField({
      name: 'monthlyInstallment',
      title: 'Estimated Monthly Installment (₦)',
      type: 'number',
    }),
    defineField({
      name: 'titleType',
      title: 'Legal Title Type (e.g. Governor\'s Consent, C of O, Gazette)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleStatus',
      title: 'Title Verification Status (e.g. Approved & Charted, In View)',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location / Estate Address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities & Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'paymentPlans',
      title: 'Payment Schedules',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Showcase Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Property Photo Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'status',
      title: 'Sales Status',
      type: 'string',
      options: {
        list: [
          { title: 'Verified Available', value: 'available' },
          { title: 'Selling Fast', value: 'selling-fast' },
          { title: 'Sold Out', value: 'sold-out' },
        ],
      },
      initialValue: 'available',
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
