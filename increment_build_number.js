#!/usr/bin/env node

// Save hook under `project-root/hooks/before_prepare/`
//
// Don't forget to install xml2js using npm
// `$ npm install xml2js`

var fs = require('fs');
var xml2js = require('xml2js');
var exec = require('child_process').execSync;

function getNpmVersion() {
  var fs = require('fs');
  var obj = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  return obj.version;
}
/* calculated from git commits to give sequential integers */

function getGitVersion() {
  var process = exec("git rev-list master --first-parent --count");
  return parseInt(process)
}


// Read config.xml
fs.readFile('config.xml', 'utf8', function(err, data) {
  if(err) {
    return console.log(err);
  }

  // Get XML
  var xml = data;

  // Parse XML to JS Obj
  xml2js.parseString(xml, function (err, result) {
    if(err) {
      return console.log(err);
    }

    // Get JS Obj
    var obj = result;

    // ios-CFBundleVersion doen't exist in config.xml
    if(typeof obj['widget']['$']['ios-CFBundleVersion'] === 'undefined') {
      obj['widget']['$']['ios-CFBundleVersion'] = 0;
    }

    // android-versionCode doen't exist in config.xml
    if(typeof obj['widget']['$']['android-versionCode'] === 'undefined') {
      obj['widget']['$']['android-versionCode'] = 0;
    }

    // app version doen't exist in config.xml
    if(typeof obj['widget']['$']['android-versionCode'] === 'undefined') {
      obj['widget']['$']['version'] = 0;
    }


    // Increment build numbers (separately for iOS and Android)
    obj['widget']['$']['ios-CFBundleVersion']=getGitVersion();
    obj['widget']['$']['android-versionCode']=getGitVersion();
    obj['widget']['$']['version']=getNpmVersion();

    // Build XML from JS Obj
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(obj);

    // Write config.xml
    fs.writeFile('config.xml', xml, function(err) {
      if(err) {
        return console.log(err);
      }

      console.log('Build number successfully incremented');
    });

  });
});
