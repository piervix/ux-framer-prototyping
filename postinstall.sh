cd ./node_modules/framerjs
npm install --only=dev
mkdir -p build
cd ../..
gulp --gulpfile ./node_modules/framerjs/gulpfile.coffee webpack:release
gulp build
