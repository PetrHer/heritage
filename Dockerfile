
FROM node:alpine


WORKDIR /app


# COPY package.json and package-lock.json files
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# COPY
COPY . .

RUN npm install

RUN npm install sharp


# uninstall the current bcrypt modules
RUN npm uninstall bcrypt

# install the bcrypt modules for the machine
RUN npm install bcrypt


RUN npx prisma generate

RUN npm run build

# Set the command to start the application
CMD ["npm", "start"]