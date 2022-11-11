import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId:'her5qjl7',
    dataset:'production',
    apiVersion:'2022-10-11',
    useCdn:true,
    token:process.env.NEXT_PUPLIC_SANITY_TOKEN
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)