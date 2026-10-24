import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Client Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Investor / Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Location / Investor Profile',
      type: 'string',
      description: 'e.g., Diaspora Investor (London, UK) or HNI Client (Victoria Island)',
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating (1-5)',
      type: 'number',
      initialValue: 5,
    }),
  ],
});
