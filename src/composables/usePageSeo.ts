import { pageUrl } from '~/utils/seo'

/** A page's title, description, canonical link and link preview text. nuxt.config.ts's head holds what every page
 *  shares (the preview image, the site name, the language); these replace its home page defaults */
export const usePageSeo = ({ path, title, description }: { path: string; title: string; description: string }) => {
  const url = pageUrl(path)
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    twitterTitle: title,
    twitterDescription: description
  })
  useHead({ link: [{ rel: 'canonical', href: url }] })
}
