import {defineField, defineType} from 'sanity'

export const samplePack = defineType({
  name: 'samplePack',
  title: 'Sample Pack',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Pack Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'detailedDescription',
      title: 'Detailed Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Number', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'genre',
      title: 'Genre',
      type: 'string',
      options: {
        list: [
          {title: 'Electronic', value: 'electronic'},
          {title: 'Hip Hop', value: 'hip-hop'},
          {title: 'Pop', value: 'pop'},
          {title: 'Rock', value: 'rock'},
          {title: 'Ambient', value: 'ambient'},
          {title: 'House', value: 'house'},
          {title: 'Techno', value: 'techno'},
          {title: 'Trap', value: 'trap'},
          {title: 'R&B', value: 'rnb'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'bpm',
      title: 'BPM Range',
      type: 'string',
      description: 'e.g., "120-140" or "varies"',
    }),
    defineField({
      name: 'key',
      title: 'Key/Scale',
      type: 'string',
      description: 'e.g., "C Minor" or "Various"',
    }),
    defineField({
      name: 'sampleCount',
      title: 'Number of Samples',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'packSize',
      title: 'Pack Size',
      type: 'string',
      description: 'e.g., "150 MB" or "2.5 GB"',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'gumroadUrl',
      title: 'Gumroad Product URL',
      type: 'url',
      description: 'Direct link to the Gumroad product page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gumroadProductId',
      title: 'Gumroad Product ID',
      type: 'string',
      description: 'Product ID from Gumroad for tracking',
    }),
    defineField({
      name: 'previewAudio',
      title: 'Preview Audio',
      type: 'file',
      options: {
        accept: 'audio/*',
      },
      description: 'Audio preview of the sample pack',
    }),
    defineField({
      name: 'previewImages',
      title: 'Preview Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      description: 'Additional images showcasing the pack content',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Pack',
      type: 'boolean',
      description: 'Show this pack prominently on the home page',
    }),
    defineField({
      name: 'isActive',
      title: 'Active for Sale',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to enable/disable sales',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
      media: 'coverImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: `$${subtitle}`,
        media,
      }
    },
  },
})
