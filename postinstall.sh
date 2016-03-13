cd ./node_modules/framerjs
npm install --dev
mkdir -p build
gulp build-release
cd ../..
gulp build
