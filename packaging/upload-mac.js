/* eslint no-console: "off", import/no-extraneous-dependencies: 0 */
// Load the SDK
const AWS = require('aws-sdk');
const fs = require('fs');
const version = require('../package.json').version;
const path = require('path');
const SSH = require('ssh2').Client;

const buildsDir = './builds/';
const dmgFile = `SikhiToTheMax-${version}.dmg`;
const zipFile = `SikhiToTheMax-${version}-mac.zip`;
const updateFile = 'latest-mac.json';
const bucketName = 'sttm-releases';
const remoteDir = 'mac-x64/';

AWS.config.update({ region: 'us-west-2' });
const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: bucketName },
});

function updateRemoteVersion() {
  const conn = new SSH();
  conn.on('ready', () => {
    console.log('Client :: ready');
    conn.exec(`echo ${version} > /home/releases/sttm-mac-x64 && cat /home/releases/sttm-mac-x64`, (err, stream) => {
      if (err) throw err;
      stream.on('close', (code, signal) => {
        console.log(`Stream :: close :: code: ${code}, signal: ${signal}`);
        conn.end();
      }).on('data', (data) => {
        console.log(`STDOUT: ${data}`);
      }).stderr.on('data', (data) => {
        console.log(`STDERR: ${data}`);
      });
    });
  }).connect({
    host: 'khalis.net',
    port: 1157,
    username: 'kns',
    privateKey: fs.readFileSync(path.resolve(__dirname, 'id_rsa')),
  });
}

function upload(files) {
  const file = files.splice(0, 1);
  fs.readFile(buildsDir + file, (err, data) => {
    if (err) { throw err; }

    console.log(`Uploading ${file} ...`);
    const request = s3.upload({
      Key: remoteDir + file,
      Body: data,
      ACL: 'public-read',
    }, () => {
      console.log(`Successfully uploaded ${file}`);
      if (files.length > 0) {
        upload(files);
      } else {
        updateRemoteVersion();
      }
    });
    request.on('httpUploadProgress', (evt) => {
      console.log(`Uploaded :: ${(parseInt(evt.loaded, 10) * 100) / parseInt(evt.total, 10)}%`);
    });
  });
}

upload([dmgFile, zipFile, updateFile]);
