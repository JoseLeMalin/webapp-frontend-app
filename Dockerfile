# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1@sha256:66ba69deede44e3af5dc542def218fdb3bcad2205900ea761dc5623bf973d2df AS base
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# [optional] tests & build
ENV NODE_ENV=production
RUN bun test
RUN bun run build

# copy production dependencies and source code into final image
FROM base AS release
# COPY --from=install /temp/prod/node_modules node_modules
# # COPY --from=prerelease /usr/src/app/index.tsx .
# # COPY --from=prerelease /usr/src/app/bun.lock .
# COPY --from=prerelease /usr/src/app/dist ./dist
# COPY --from=prerelease /usr/src/app/bun.lock .
# COPY --from=prerelease /usr/src/app/src ./src
# COPY --from=prerelease /usr/src/app/bun.lock .
COPY --from=prerelease /usr/src/app .

# run the app
# USER bun
EXPOSE 3000
# ENTRYPOINT [ "bun", "run", "index.tsx" ]
# ENTRYPOINT [ "bun", "run", "dev" ]
ENTRYPOINT [ "bun", "--watch", "run", "dev" ]
# ENTRYPOINT [ "bun", "--watch", "run", "index.html"]