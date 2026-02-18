import {defineField, defineType} from 'sanity'

export const callout = defineType({
  type: 'object',
  name: 'callout',
  title: 'Callout Box',
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      options: {
        list: [
          {title: '💡 Info', value: 'info'},
          {title: '⚠️ Warning', value: 'warning'},
          {title: '✅ Success', value: 'success'},
          {title: '❌ Error', value: 'error'},
        ],
        layout: 'radio',
      },
      initialValue: 'info',
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {
      type: 'type',
      blocks: 'content',
    },
    prepare({type, blocks}) {
      const block = (blocks || [])[0]
      const text = block
        ? block.children
            .filter((child: any) => child._type === 'span')
            .map((span: any) => span.text)
            .join('')
        : 'Empty callout'

      return {
        title: type || 'Callout',
        subtitle: text,
      }
    },
  },
})
