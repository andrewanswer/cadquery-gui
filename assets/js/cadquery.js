/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*globals $: false, require: false, editor: false*/
'use strict';
var temp = require('temp');
var fs   = require('fs');
var exec = require('child_process').exec;

$(document).ready(function() {
    $('#run-button').on('click', function() {
        // Automatically track and cleanup files at exit
        temp.track();

        // Get the text that the user entered into the editor
        var scriptText = editor.getValue();

        // Create a temporary file that will hold the script so that we can execute it
        temp.open('cqscript', function(err, info) {
          if (!err) {
            fs.write(info.fd, scriptText);
            fs.close(info.fd, function(err) {
              if (err !== null) {
                console.log("Error closing file object: " + err);
              }

              // Execute the script using the python interpreter
              exec("python " + info.path, function(error, stdout, stderr) {
                if (error !== undefined) {
                    console.log(stdout.trim());
                }
                else {
                    console.log(`exec error: ${error}; stderr: ${stderr}`);
                }
              });
            });
          }
        });
    });

    //set up model viewer
    MVIEWER.init({
        initialView: 'ISO',
        width: 800,
        height: 600,
        containerId: "three_container"
    });
});