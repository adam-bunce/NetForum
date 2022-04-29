# NetForum
[Imageboard](https://en.wikipedia.org/wiki/Imageboard) with aesthetics inspired by Netscape, built with MERN stack.

## Features
- user created threads and posts with text and media content
- media hosted on aws s3 bucket and delivered using cloudfront to minimize load times
- rolling deletion of threads(and contained posts), maximum of 10 threads at a time
- rolling deletion of aws s3 bucket content and mongodb atlas documents (i only have 500mb of storage lol)
- backend hosted on Heroku, frontend hosted on Netlify (Heroku sleeps after a while so starting the site might take a few seconds)

## Video


https://user-images.githubusercontent.com/74341873/165881721-03e7dff7-f3e2-413c-8d7c-b44e84e0530d.mp4

