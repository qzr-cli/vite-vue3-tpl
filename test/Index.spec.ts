import { mount } from '@vue/test-utils'
import Other from '../src/views/Other/index.vue'

test('Other.vue', async () => {
  const wrapper = mount(Other)
  expect(wrapper.html()).toContain('Unit Test Page')
  expect(wrapper.html()).toContain('count is: 0')
  await wrapper.find('button').trigger('click')
  expect(wrapper.html()).toContain('count is: 1')
})
