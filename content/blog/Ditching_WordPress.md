---
title: Ditching WordPress for NuxtJS and Netlify
description: Why I broke up with WordPress and my VPS hosting provider, and started using NuxtJS and Netlify entirely for free.
headerImage: /posts/img/NuxtJS_Blog.png
tags:
  - webdev
  - blog
  - vue
  - nuxt
  - netlify
---

If you're reading this, you probably have your own blog, and I bet you've struggled with choosing a framework, static site generator, or hosting provider, and if you're like me, you've probably relocated your blog before.

I think I've found the perfect solution for me, and I expect we'll be using the NuxtJS and Netlify stack for a long time to come. Let's talk about why I broke up with WordPress and my VPS hosting provider, and started using NuxtJS and Netlify entirely for free. What challenges come with leaving a legacy stack like WordPress? And, will it work for me?

The original [TechSquidTV website](https://techsquidtv.com) website was thrown together in mid 2018, around the time I started my YouTube "career" and decided to get more serious about pursing code and development as a career after years of hobby interest. I wanted a place to most share my content in a way that Google could easily find and index it, hopefully promoting my video content through my blog to more search results. The objective was to be quick and get something online that looked good and was ready to work.

<nuxt-picture src="./posts/img/old_tstv_website.png" fit="contain" alt="original techsquidtv website"></nuxt-picture>

## Why I Chose WordPress In The First Place

Allow me to be old for a moment and also highlight that there were not nearly as many excellent blog/cms systems out there as we have today until _relatively_ recently in terms of the web. [Ghost](https://ghost.org/) for instance, a popular NodeJS based "publishing platform", was initially released in 2013. WordPress has a good 10 year head start on the web, releasing in 2003 and is still the most popular CMS out there.

That meant for me at the time, and still means for many people today, that WordPress has the largest ecosystem of plugins and themes out there. You can often one-click install WordPress on many cheap hosting providers, find a free or cheap theme, and claim to hold a fairly professional looking website or blog. In fact growing up, I made some side money setting up WordPress websites for small local businesses, some of which are still online today.

However, it's 2021 and it's hard to believe we're 8 years into platforms like Ghost and there are now many options out there for those looking to build a simple website or blog.

### Static vs Dynamic Sites

Besides WordPress being the familiar choice for many years in the past, there were a few benefits to hosting a "dynamic" website, vs a "static" one. A dynamic website being one where webpages are rendered and served by a webserver at the time they are requested, and a static website being one where all of the available webpages are pre-rendered as static files that are served from a static file server (typically). Static websites are increasingly popular again for smaller websites and blogs where databases may not be necessary.

_"Dynamic"_ websites have the ability to interact with a database in real time, post and receive information, and update the page content accordingly. These are websites you can log into and interact with.

_"Static"_ websites on the other hand are static, they are not interactive. When a static website is loaded, a pre-rendered document is sent to the user's web browser and it is rendered just as it was delivered, maybe with some JavaScript to emulate some level of interactivity.

That means, where it is easy to have a comment system in a WordPress website which has a database to write to, where this is not possible without some outside service with static websites. WordPress also comes with the admin dashboard, a built-in content management system with support for multiple authors, plugins, themes, and more.

Ultimately it was this that lead me to choose WordPress, initially. I was able to get my website up in a weekend. I bought a premium theme for something like $35, added in some plugins for SEO, analytics, social sharing, and more. It quickly becomes addicting to add plugins to a WordPress website which no doubt lead to one of the issues that drove me to choose to leave WordPress recently.

## Why I Left WordPress

So if WordPress has all of the bells and whistles and there are seemingly so many downsides to a static website, why did I leave it?

1. Cost
2. Reliability
3. Maintenance

### Cost

Running any dynamic website is typically going to require a web hosting provider and a database. Now, with the smaller size and traffic of blog like mine, it's possible to get away with using a $5/month VPS (Virtual Private Server) from providers such as Vultr, DigitalOcean, or Linode. This blog was originally hosted with Vultr for $5/month, but WordPress and a database demand more memory than you might think to do things like optimize images when you upload them. Soon after going live, I had to switch to a $10/month VPS amd I threw in $2/month for automatic backups.

So in total, running my blog with a VPS hosting provider was $12/month, or _$144 per year_. No offense, I love you all, thank you for reading this if you are, but I can't justify spending $144 per year on a blog right now with cheaper options available, even if some sacrifices must be made.

This blog (now) has no ads, no tracking JavaScript, and only the rare Amazon Affiliate link. So, this website was not exactly designed to be a profitable venture, but how can we stop losing money in the process?

One option is to look into static-site generation. The low (essentially zero) technical overhead of having _no_ backend, means services such as GitHub Pages and Netlify will host your website entirely for free.

### Reliability

The biggest issue that really dove me to breakup with WordPress was not the $12/month cost, but the lack of reliability that often left my website offline. Now, some smarter deployment or managed hosting could have resolved this but because of some sort of "leak", the server would crash periodically hit 100% CPU and the site would be unavailable.

<nuxt-picture src="./posts/img/vultr-cpu-leak.jpg" alt="cpu max load"></nuxt-picture>

This blog used to be hosted on a VPS using Docker-Compose on a single node server with both the WordPress installation and a database. What would happen, is after several days or weeks of being online, I would come to find my site was offline. When logging into the VPS panel I could see CPU usage had been steadily creeping up and its likely why the docker containers were crashing, though I never bothered to see what kept them from recovering.

With a statically hosted site and no backend to worry about, at essentially infinite scale, there will never be a concern the website will be down (unless it's a DNS issue...).

### Maintenance

Hand-in-hand with reliability, WordPress installations require maintenance. There is always a security risk that some attacker could use a vulnerability in an outdated installation to gain access to the site and attack it. Such attacks are essentially impossible to perform against a static site.

Besides updates to WordPress itself, you'll have updates to your themes, plugins, the operating system on your host, etc. With a static site, we can focus exclusively on the application, meaning our only maintenance is our Node.js packages.

## Why Choose Nuxt?

[Nuxt](https://nuxtjs.org/) is a [Vue.js](https://vuejs.org/) based framework for building modern web applications, and it's a great choice for a static site generator. While Nuxt can be used to build more traditional "server-side rendered" websites, it also has the ability to pre-render your pages to a static site. If you are a react fan you may know the framework Nuxt was inspired by, [Next](https://nextjs.org/).

You may already be more familiar with popular static site generators such as:

- [Hugo](https://gohugo.io/)
- [Jekyll](https://jekyllrb.com/)
- [Gatsby](https://www.gatsbyjs.org/)

So why not use any of the above? Why choose Nuxt instead? While all great choices, and possibly the best choice for your needs, there are a few reasons why I chose Nuxt.

1. **It's built on JavaScript and Vue.js**

This is simply my preferred stack and allows me the most flexability to customize the site. My blog for me acts not only as a place to curate my content and share with others, but also gives me a project to learn on and enhance, something to act as a portfolio project in itself as well. Hugo for instance, is built on [Go](https://golang.org/), and I unfortunately do not have much experience with Go.

Working in my own stack was important for getting the right design for me as well. In the past I had used free and premium themes with varying degrees of satisfaction. Frankly most of the themes available out there for the common static site generators are not very "premium" feeling in my opinion. If you were looking at WordPress themes, you might be shocked to see how common JQuery still is and massive JavaScript bloat from multiple plugins.

This time I wanted to build the theme from the ground up, exactly as I wanted. It would be an excellent project for my portfolio, and great for incorporating learning new technologies such as [tailwindcss](https://tailwindcss.com/) in the process.

2. **Can be switched to SSR**

At any point, a NuxtJS statically generated site can be converted to a SSR (server-side rendered) site. So if at any point in the future I want add full dynamic functionality to the site, I can continue to use the same exact stack and codebase.

## GitHub Pages vs Netlify

So why choose Netlify over GitHub Pages? GitHub Pages seems to be the defacto standard for static site hosting, and for good reason. GitHub Pages is a service available directly in GitHub.com where your code already lives, and it's entirely free.

Netlify however offers a slightly different platform, equally as free but with more features, including one I may pay for personally.

### GitHub Pages

Let's start with a recap of GitHub Pages. You're probably already familiar with it, as it is very much the standard. GitHub will essentially serve a branch of any repository directly as a static website. It is common to render your website from its source to a `gh-pages` branch name. GitHub will allow you to connect up a custom domain with HTTPS, and building and deployment is all handled by GitHub. Much of the benefits of GitHub Pages are realized through plugins via "GitHub Actions". Github Actions can be utilized during the build phase of your website generation to perform tasks such as optimizing images, deploying to a CDN, etc.

There are a few other basic features such as [creating a custom 404 page](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site), but overall there isn't much to write about for GH Pages. It's a simple and free solution for hosting a static site, and GitHub Actions are a fantastic plugin system for building and deploying.

You will also get access to a basic level of analytics, similar to those you will find for any of your GitHub repositories. Visits to each page are tracked over a 30 day period so you can get a rudimentary idea of how your site is performing without any JavaScript or Google Analytics.

### Netlify

Netlify has a more focused approach to building and deploying [Jamstack](https://jamstack.org/) sites, essentially pre-generated or static site applications. One of the most interesting things Netlify does, is allow you to add some interactivity to your application without the need to build any backend services.

For instance, it is possible on Netlify to include [forms](https://www.netlify.com/products/forms/) on your website to allow for user data submission, and you can connect it with integrations to other services such as [Zapier](https://zapier.com/) and [Mailchimp](https://mailchimp.com/). Where before if you wanted to host a local business website with a simple email contact form, it _required_ a backend service to handle the form submission, we now have the option to use Netlify's form integration on a complete static site, still entirely for free.

Maybe the feature that originally sold me as I am migrating off of WordPress and coming to NuxtJS, is the ability to handle custom rewrites and redirects. The old WordPress blog used a different URL schema for the blog posts that I have decided to abandon for a simpler and shorter URL schema. When I was originally considering using GitHub Pages, this meant that every link out there on the internet to my blog currently, would lead to a 404 page, even though I intended to bring 80% of the content over to the new blog. With Netlify, we have a little more control over the server that is actually serving our static content and can handle custom rewrites and redirects.

There's quite a few other features to check out, most of them being entirely free but there is one more feature I have my eye on from Netlify, and it's one of the only features you have to pay for up front. Much like GitHub, Netlify offers an analytics offering that does not require any JavaScript to be added to the page.

Now this is true for both platforms but one nice thing about tracking analytics from the server-side is, these analytics are essentially un-blockable. There may be less personally identifying information, but that's better for the user and their privacy, with the benefit to the site owner of getting accurate data on how users view the site. Especially when so many of my viewers/readers are programmers with AdBlock enabled. I see you 👀.

Now at the time of writing this, Netlify's analytics solution is $9/month. So while my original plan was to use a $5/month VPS to host a WordPress blog, that became $12/month. I tried to solve this by moving to a static site to host for free, and now I may be headed back to $9/month.

You _could_ say that this is a savings of $3/month, on top of the added stability and increased speed.

## Conclusion

Netlify has too many free benefits to fit into this article, but with no downsides to speak of and several advanced features for free, there is reason not to try it for your static site. the free version is more than adequate and clearly superior to the GitHub Pages offering. Best of all there is nothing you stopping you from enjoying the best of both worlds if you wish.

Admittedly, this screen shot was taken after a small optimization pass where I enabled lazy-loading of images and videos. So while not quite my _first_ pass, with little effort we have at minimum matched and in some ways exceeded the performance of the premium WordPress theme.

<nuxt-picture src="./posts/img/nuxt-v-wordpress-speed.jpg" alt="Speed comparison old WordPress Website vs. new Nuxt site" fit="contain" alt="wordpress vs nuxt speed comparison"></nuxt-picture>

With minimal effort from there an a little direction from the reports, I couldn't resist taking one more pass before publishing

<nuxt-picture src="./posts/img/nuxt_performance.jpg" alt="Improved Nuxt performance" fit="contain" alt="wordpress vs nuxt speed comparison"></nuxt-picture>

NuxtJS has been a great choice for me for building the custom experience I want for my blog and will make it easy to tweak and update in the future. There's going to be many more blog posts about how this blog was built and the many changes, optimizations, and improvements that are yet to come.

There were some concerns when migrating from WordPress, but for most roadblocks, alternatives provided an adequate solution. Netlify's [form handling](https://www.netlify.com/docs/form-handling/) is perfect for my email contact form, and I am highly interested in how I can use their [serverless functions](https://www.netlify.com/docs/serverless-functions/).

For comments, my other biggest draw to WordPress, I ended up finding a solution that was absolutely perfect for my developer-focused audience and open source website. [Giscus](https://giscus.app/) is a comment system powered by GitHub's new [Discussions API](https://developer.github.com/v3/discussions/). User's can comment on any post with their GitHub account and the comments are loaded from a synced GitHub Discussion. Try it out here and leave a comment below!

Nuxt might not be the best out-of-the-box choice for a blog or static site, but it has immense flexibility with just enough magic boilerplate to get the job done. If you are looking for something you can fully customize and run on a budget, for Vue and JavaScript developers, you can do no wrong in choosing Nuxt.

Like I mentioned, this website is open source, so follow along on the git repository to watch the progress.
[GitHub Repository](https://github.com/KyleTryon/techsquidtv.com)

Be sure to join **_The Full Stack_** newsletter below to keep up with this project and other excellent content for developers around the web.
