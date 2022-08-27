export default defineNuxtRouteMiddleware((to, from) => {
    // set the redirect code to 301 Moved Permanently
    if(to.fullPath.includes('/blog/league-of-legends-smurfing-tierlist-for-every-role')) {
        return navigateTo('/blog/league-of-legends-smurfing-tierlist', { redirectCode: 301 })
    }
  })
  