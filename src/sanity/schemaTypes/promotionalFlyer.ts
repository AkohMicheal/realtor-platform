import { defineField, defineType } from 'sanity';

export const promotionalFlyerType = defineType({
  name: 'promotionalFlyer',
  title: 'Monthly Promotional Flyer',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Flyer Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'month',
      title: 'Active Cycle / Month (e.g. March/April 2026)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Dividend Sheet', value: 'Dividend Sheet' },
          { title: 'Buy To Resell', value: 'Buy To Resell' },
          { title: 'Special Promo', value: 'Special Promo' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Flyer Graphic / Circular',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Summary / Highlights',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'active',
      title: 'Is Currently Active Cycle?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});
