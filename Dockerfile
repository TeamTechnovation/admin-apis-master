FROM node:12.18.3

WORKDIR /APIs

COPY package.json .

RUN npm install 

COPY ./dist /APIs/dist

EXPOSE 4000

CMD [ "npm", "run", "start:prod" ]


# docker build -t RA --build-arg SSH_KEY="$(cat .ssh/id_ed25519)"
# id_ed25519