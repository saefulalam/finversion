import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'FV-UI',
  description: 'Apple-style component library. CSS-first, zero dependency.',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/button' },
      { text: 'Pro', link: '/pro/datatable' },
      { text: 'GitHub', link: 'https://github.com/your-repo/fv-ui' }
    ],
    sidebar: {
      '/components': [
        {
          text: 'Components',
          items: [
            { text: 'Button', link: '/components/button' },
            { text: 'Card', link: '/components/card' },
            { text: 'Modal', link: '/components/modal' },
            { text: 'Badge', link: '/components/badge' },
            { text: 'Input', link: '/components/input' },
            { text: 'Toast', link: '/components/toast' }
          ]
        }
      ],
      '/pro': [
        {
          text: 'Pro Components',
          items: [
            { text: 'DataTable', link: '/pro/datatable' },
            { text: 'CommandPalette', link: '/pro/command-palette' }
          ]
        }
      ]
    }
  }
})
