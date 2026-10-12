#!/usr/bin/env node
import http from "http"
import fs from "fs"
import path from "path"
import serveHandler from "serve-handler"

const args = process.argv.slice(2)
const port = parseInt(args[0]) || 8080
const publicDir = args[1] || "public"

const server = http.createServer(async (req, res) => {
  let urlPath = (req.url || "/").split("?")[0]
  
  // If requesting a directory with trailing slash, check if index.html exists
  if (urlPath.endsWith("/")) {
    const indexPath = path.join(publicDir, urlPath, "index.html")
    if (fs.existsSync(indexPath)) {
      req.url = urlPath + "index.html"
    }
  } else {
    // If requesting directory without trailing slash, redirect to trailing slash if index.html exists
    const indexPath = path.join(publicDir, urlPath, "index.html")
    const htmlFilePath = path.join(publicDir, urlPath + ".html")
    try {
      if (fs.existsSync(indexPath)) {
        res.writeHead(301, { Location: urlPath + "/" })
        return res.end()
      } else if (fs.existsSync(htmlFilePath)) {
        req.url = urlPath + ".html"
      }
    } catch {}
  }

  await serveHandler(req, res, {
    public: publicDir,
    cleanUrls: false,
    directoryListing: false,
    headers: [
      {
        source: "**/*.*",
        headers: [{ key: "Content-Disposition", value: "inline" }],
      },
      {
        source: "**/*.webp",
        headers: [{ key: "Content-Type", value: "image/webp" }],
      },
      {
        source: "**/*.avif",
        headers: [{ key: "Content-Type", value: "image/avif" }],
      },
    ],
  })
})

server.listen(port, () => {
  console.log(`🚀 Quartz Preview Server running at http://localhost:${port} (Serving: ${publicDir})`)
})
