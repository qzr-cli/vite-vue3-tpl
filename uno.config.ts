import { defineConfig, presetUno, presetAttributify } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(), // UnoCSS 的默认样式预设
    presetAttributify(), // 属性化模式支持 增加可读性
  ],
  rules: [
    ['flexD', {
      display: 'flex',
      'justify-content': 'center',
      'align-items': 'center',
    }],
    [/^fs-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ 'font-size': `${d}px` })],
  ]
})
