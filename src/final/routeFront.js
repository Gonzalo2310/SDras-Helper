import basic from './basic/helper'
import Example from './Example/helper'

const routes =
  [
    {
      path: '/basic',
      name: 'basic',
      component: basic
    },
    {
      path: '/Example',
      name: 'Example',
      component: Example
    }
  ]
export default routes
