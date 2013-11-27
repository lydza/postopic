module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      src: ['routes/**.js', 'models/**.js', 'public/javascripts/**.js', 'app.js']
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  grunt.registerTask('default', ['jshint']);
};
