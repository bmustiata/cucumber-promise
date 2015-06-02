/**
 * Grunt project configuration.
 */
module.exports = function(grunt) {
    // configuration for the plugins.
    grunt.initConfig({
        concat: {
            options: {
                sourceMap: true
            },
            dist: {
                files : [
                    {
                        src: [
                            "src/main/node/_requires.js",
                            "src/main/core/**/*.js",
                            "src/main/node/_exports.js"
                        ],
                        dest: "lib/cucumber-promise.js"
                    }
                ]
            }
        },

        clean: {
            dist : [
                "lib/cucumber-promise.js"
            ]
        }
    });

    // load NPM tasks:
    // grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // register our tasks:
    grunt.registerTask('default', ['clean', 'concat']);
};
