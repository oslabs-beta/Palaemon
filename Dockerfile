# use the version that corresponds to your electron version
FROM node:16.15

# install electron dependencies or more if your library has other dependencies
RUN apt-get update && apt-get install \
    libx11-xcb1 libxcb-dri3-0 libxtst6 libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 libgbm1 libgl1\
    -yq --no-install-suggests --no-install-recommends \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Electron doesn't like to run as root
RUN useradd -d /palaemon palaemon
USER palaemon

# copy the source into /app
WORKDIR /palaemon
COPY package.json package.json
RUN npm install

# install node modules and perform an electron rebuild
COPY . .
RUN npx electron-rebuild

# build the app
RUN npm run build:production


# Electron needs root for sand boxing
# see https://github.com/electron/electron/issues/17972
USER root
RUN chown root /palaemon/node_modules/electron/dist/chrome-sandbox
RUN chmod 4755 /palaemon/node_modules/electron/dist/chrome-sandbox

# Electron doesn't like to run as root
USER palaemon
CMD ["npm", "run", "start:docker"]