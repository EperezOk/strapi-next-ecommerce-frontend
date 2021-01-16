// Lo hacemos asi dado que lo vamos a deployar
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

export const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PK || 'pk_test_npjen0w4e4CKCovV1qBDBt5Q00P297rpi3'

/**
 * Given an image return the Url
 * Works for local and deployed Strapis
 * @param {any} image 
 */
export const fromImageToUrl = image => {
  if (!image) {
    // Devolvemos una imagen por defecto
    return "/vercel.svg"
  }
  if (image.url.indexOf("/") === 0) {
    return `${API_URL}${image.url}`;
  }
  return image.url;
}

