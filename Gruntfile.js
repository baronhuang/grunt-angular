'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var appConfig = {
        app: 'app',     //开发目录
        dist: 'dist'    //部署目录
    };

    /*grunt的所有任务配置*/
    grunt.initConfig({
        appPath: appConfig.app,
        distPath: appConfig.dist,
        /*sprite 配置 用于图片合并*/
        sprite: {
            options: {
                // sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
                imagepath: '<%= appPath %>/images/slice/',
                // 映射CSS中背景路径，支持函数和数组，默认为 null
                imagepath_map: null,
                // 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
                spritedest: '<%= appPath %>/images/',
                // 替换后的背景路径，默认 ../images/
                spritepath: '../images/',
                // 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
                padding: 2,
                // 是否使用 image-set 作为2x图片实现，默认不使用
                useimageset: false,
                //否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
                newsprite: false,
                // 给雪碧图追加时间戳，默认不追加
                spritestamp: true,
                // 在CSS文件末尾追加时间戳，默认不追加
                cssstamp: true,
                // 默认使用二叉树最优排列算法
                algorithm: 'binary-tree',
                // 默认使用`pixelsmith`图像处理引擎
                engine: 'pixelsmith'
            },
            autoSprite: {
                files: [{
                    // 启用动态扩展
                    expand: true,
                    // css文件源的文件夹
                    cwd: '<%= appPath %>/less/',
                    // 匹配规则
                    src: 'sprite.css',
                    // 导出css和sprite的路径地址
                    dest: '<%= appPath %>/less/',
                    // 导出的css名
                    ext: '.less'
                }]
            }
        },
        /*less的配置 用于less编译成css*/
        less: {
            compile: {
                files:[{
                    expand:true,
                    cwd:'<%= appPath %>/less',
                    src: ['./*.less', '!./sprite.less'],
                    ext:'.css',
                    dest:'<%= appPath %>/css/'
                }]
            }
        },
        /*用于把开发目录的文件复制到部署目录*/
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= appPath %>',
                    src: [
                        '*.html',
                        'view/{,*/}*.html',
                        'images/{,*/}*.*'
                    ],
                    dest: '<%= distPath %>'
                },
                {   //专门用于复制bootstrap的font
                    expand: true,
                    cwd: '<%= appPath %>/lib/bootstrap/dist',
                    src: ['fonts/{,*/}*.*'],
                    dest: '<%= distPath %>'
                }]

            }
        },
        /*用于清空dist目录*/
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= distPath %>/{,*/}*'
                    ]
                }]
            }
        },
        /*给angular添加依赖注入，使压缩的时候更加安全*/
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/js',
                    src: ['*.js', '!oldieshim.js'],
                    dest: '.tmp/concat/js'
                }]
            }
        },
        /*给js和css添加MD5，用于部署新版本*/
        filerev: {
            dist: {
                src: [
                    '<%= distPath %>/js/{,*/}*.js',
                    '<%= distPath %>/css/{,*/}*.css'
                ]
            }
        },
        /*给css添加浏览器的前缀*/
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            app: {
                files: [{
                    expand: true,
                    cwd: '<%= appPath %>/css',
                    src: '{,*/}*.css',
                    dest: '<%= appPath %>/css/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= distPath %>',
                    src: 'css/{,*/}*.css',
                    dest: '<%= distPath %>/css/'
                }]
            }
        },
        /*配置js和css的优化任务，主要用于未压缩js、css自动转化成已压缩的js和css*/
        useminPrepare: {
            html: '<%= appPath %>/index.html',
            options: {
                dest: '<%= distPath %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },
        usemin: {
            html: ['<%= distPath %>/{,*/}*.html'],
            options: {
                assetsDirs: ['<%= distPath %>']
            }
        },
        /*压缩html模板*/
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= distPath %>',
                    src: ['*.html', 'view/{,*/}*.html'],
                    dest: '<%= distPath %>'
                }]
            }
        },
        /*配置静态文件服务器*/
        connect: {
            options: {
                hostname: 'localhost',
                livereload: 35729
            },
            app: {
                options: {
                    port: 9000,
                    open: true,
                    base: ['<%= appPath %>']
                }
            },
            dist: {
                options: {
                    port: 9001,
                    open: true,
                    base: ['<%= distPath %>']
                }
            }
        },
        /*配置监听文件*/
        watch: {
            options: {
                livereload: 35729
            },
            all: {
                options: {livereload:true},
                files : ['<%= appPath %>/**/*', '!<%= appPath %>/less/*', '!<%= appPath %>/lib/*']
            },
            less:{
                files:'<%= appPath %>/less/*.less',
                options: {livereload:true},
                tasks:['less']
            }
        }
    });

    /*默认任务，开发的时候用*/
    grunt.registerTask('default', [
        'sprite',
        'less',
        'autoprefixer:app',
        'connect:app',
        'watch'
    ]);

    /*部署的时候用*/
    grunt.registerTask('build', [
        'clean',
        'sprite',
        'less',
        'useminPrepare',
        'autoprefixer:app',
        'concat',
        'ngAnnotate',
        'copy',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin',
        'connect:dist:keepalive'
    ]);

    /*只用来开启静态文件服务器*/
    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['connect:dist:keepalive']);
        }else{
            grunt.task.run(['connect:app:keepalive']);
        }
    });

}