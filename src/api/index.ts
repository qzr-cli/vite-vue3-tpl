import { Axios } from './axios'
import APISchema  from './type'
import config from './config'

type RequestFunction<P = Record<string, any> | void, R = any> = (
  params: P
) => Promise<R>;

type CreateRequestClient = {
  [K in keyof APISchema]: RequestFunction<APISchema[K]['req'], Promise<APISchema[K]['res']>>;
}

const target:CreateRequestClient = Object.create(null)

for (const item in config) {
  if (Object.prototype.hasOwnProperty.call(config, item)) {
    const element = config[item]
    const method = element.split(' ')[0]
    const url = element.split(' ')[1]

    target[item] = (param) => {
      return Axios[method](url, param)
    }
  }
}

export default target
