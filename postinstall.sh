cd ./node_modules/framerjs
npm install --only=dev
mkdir -p build
gulp build-release
cd ../..
gulp build
