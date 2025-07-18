import {defineField, defineType} from 'sanity'

export const artist = defineType({
  name: 'artist',
  title: 'Artist Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Artist Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stageName',
      title: 'Stage Name',
      type: 'string',
      description: 'Public performance/brand name',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Large banner image for the home page',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
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
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
      description: 'Brief description for the home page',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City, Country',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'Twitter/X', value: 'twitter'},
                  {title: 'TikTok', value: 'tiktok'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'SoundCloud', value: 'soundcloud'},
                  {title: 'Spotify', value: 'spotify'},
                  {title: 'Bandcamp', value: 'bandcamp'},
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'Other', value: 'other'},
                ],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
            {
              name: 'username',
              title: 'Username',
              type: 'string',
              description: 'Username without @ symbol',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'bookingEmail',
      title: 'Booking Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'genres',
      title: 'Music Genres',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'equipment',
      title: 'Equipment & Tools',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description: 'DAW, instruments, plugins, etc.',
    }),
    defineField({
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Awards, milestones, notable releases',
    }),
    defineField({
      name: 'isActive',
      title: 'Active Profile',
      type: 'boolean',
      initialValue: true,
      description: 'Only one artist profile should be active',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'stageName',
      media: 'profileImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle || 'Artist Profile',
        media,
      }
    },
  },
})
