/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import 'reflect-metadata'
import { type Methods } from './Methods'
import { MetadataKeys } from './MetadataKeys'
import { AppRouter } from '../singletons/AppRouter'

// Defines a decorator factory for creating a class decorator that marks a class as a controller.
// The decorator factory takes a routePrefix argument, specifying the base URL segment for all routes within the controller.
export function controller(routePrefix: string) {
  // Returns the actual decorator function that will be applied to the class. This function takes the class (target) as its argument.
  return function (target: Function) {
    // Gets a singleton instance of the application's router. This ensures that all route registration is centralized.
    const router = AppRouter.getInstance()

    // Iterates over all properties of the class (in this case, methods defined in the class).
    Object.getOwnPropertyNames(target.prototype).forEach((key) => {
      // Retrieves the actual method from the class based on the key (method name).
      const routeHandler = target.prototype[key]

      // Retrieves the path metadata for the method. This metadata was attached by the @get, @post, etc., decorators
      // and represents the specific path to be appended to the routePrefix for this route.
      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key)

      // Retrieves the HTTP method metadata (GET, POST, etc.) for the method. This specifies how the route should be handled.
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key,
      )

      // Retrieves any middleware functions that have been associated with the route.
      // Middleware functions are optional and are specified using their own decorators.
      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        []

      // If the method has path metadata (i.e., it's intended to handle a route), construct the full path for the route
      // by combining the routePrefix with the method-specific path. Then, use the router to register this route,
      // specifying the HTTP method, the full path, any middleware, and the route handler function.
      // This effectively makes the method a route handler for requests to that path.
      if (path) {
        router[method](`${routePrefix}${path}`, ...middlewares, routeHandler)
      }
    })
  }
}
