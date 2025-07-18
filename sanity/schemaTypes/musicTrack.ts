import {defineField, defineType} from 'sanity'

export const musicTrack = defineType({
  name: 'musicTrack',
  title: 'Music Track',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Track Title',
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
      name: 'artist',
      title: 'Artist Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverArt',
      title: 'Cover Art',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Remixes', value: 'remixes'},
          {title: 'Mashups & Edits', value: 'mashups-edits'},
          {title: 'Full Mixes', value: 'full-mixes'},
        ],
      },
      validation: (Rule) => Rule.required(),
      description: 'Select the category this track belongs to',
    }),
    defineField({
      name: 'trackType',
      title: 'Track Type',
      type: 'string',
      options: {
        list: [
          {title: 'Original', value: 'original'},
          {title: 'Remix', value: 'remix'},
          {title: 'Collaboration', value: 'collaboration'},
        ],
      },
      validation: (Rule) => Rule.required(),
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
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
    }),
    defineField({
      name: 'streamingLinks',
      title: 'Streaming Platform Links',
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
                  {title: 'Spotify', value: 'spotify'},
                  {title: 'Apple Music', value: 'apple-music'},
                  {title: 'SoundCloud', value: 'soundcloud'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'Bandcamp', value: 'bandcamp'},
                  {title: 'Beatport', value: 'beatport'},
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
              name: 'isPrimary',
              title: 'Primary Link',
              type: 'boolean',
              description: 'Mark as the main streaming link',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'downloadLink',
      title: 'Download Link',
      type: 'url',
      description: 'External link for downloading the track (e.g., Bandcamp, personal website)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Track',
      type: 'boolean',
      description: 'Show this track prominently on the home page',
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
      title: 'title',
      artist: 'artist',
      media: 'coverArt',
      category: 'category',
    },
    prepare({title, artist, media, category}) {
      return {
        title,
        subtitle: `by ${artist} • ${category?.replace('-', ' & ').replace(/\b\w/g, (l: string) => l.toUpperCase())}`,
        media,
      }
    },
  },
})
