import {defineArrayMember, defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Secondary headline',
    }),
    defineField({
      name: 'displayTitle',
      title: 'Display Title (for card)',
      type: 'string',
      description: 'Optional shorter title for article cards. Falls back to main title if empty.',
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
          {title: 'AI Strategy', value: 'AI STRATEGY'},
          {title: 'Technology', value: 'TECHNOLOGY'},
          {title: 'Business', value: 'BUSINESS'},
          {title: 'Innovation', value: 'INNOVATION'},
        ],
      },
    }),
    defineField({
      name: 'date',
      title: 'Display Date',
      type: 'string',
      placeholder: 'FEBRUARY, 2026',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      description: 'Main blog post image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
        },
      ],
    }),
    defineField({
      name: 'cardImage',
      title: 'Card Background Image',
      type: 'image',
      description: 'Image shown on article card (optional, falls back to featured image)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
        },
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Alternative cover image (optional)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'cardGradient',
      title: 'Card Gradient',
      type: 'string',
      description: 'CSS gradient for article card',
      initialValue: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      options: {
        list: [
          {
            title: 'Purple-Blue',
            value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          },
          {
            title: 'Orange-Red',
            value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          },
          {
            title: 'Green-Blue',
            value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          },
          {
            title: 'Pink-Purple',
            value: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
          },
        ],
      },
    }),
    defineField({
      name: 'body',
      title: 'Content',
      description:
        'Paste content from Notion and it will preserve formatting. Use toolbar or markdown shortcuts (##, ###) for headings.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          // This allows each block to be styled independently
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Lead Paragraph', value: 'lead'},
            {title: 'Heading 1', value: 'h1'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Heading 4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet List', value: 'bullet'},
            {title: 'Numbered List', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'},
              {title: 'Highlight', value: 'highlight'},
            ],
            annotations: [
              {
                name: 'textColor',
                type: 'object',
                title: 'Text Color',
                fields: [
                  {
                    name: 'color',
                    type: 'string',
                    title: 'Color',
                    validation: (Rule) => Rule.required(),
                    options: {
                      list: [
                        {title: 'Default', value: 'default'},
                        {title: 'Muted', value: 'muted'},
                        {title: 'Primary', value: 'primary'},
                        {title: 'Success', value: 'success'},
                        {title: 'Warning', value: 'warning'},
                        {title: 'Danger', value: 'danger'},
                      ],
                    },
                    initialValue: 'default',
                  },
                ],
              },
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description: 'Important for SEO and accessibility',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        }),
        defineArrayMember({
          type: 'file',
          title: 'Video',
          options: {
            accept: 'video/*',
            storeOriginalFilename: true,
          },
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        }),
        defineArrayMember({type: 'callout'}),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show in homepage carousel',
      initialValue: false,
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short summary for previews and SEO (150-200 characters)',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'nextPost',
      title: 'Next Post',
      type: 'object',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
        },
        {
          name: 'slug',
          type: 'string',
          title: 'Slug',
          description: 'E.g., /blog/next-post-slug',
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Custom title for search engines (leave blank to use main title)',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'category',
      date: 'date',
    },
    prepare({title, media, subtitle, date}) {
      return {
        title: title,
        subtitle: `${subtitle || 'Uncategorized'} • ${date || 'No date'}`,
        media: media,
      }
    },
  },
})
