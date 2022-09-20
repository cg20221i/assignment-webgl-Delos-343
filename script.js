function draw() {

    var canvas = document.getElementById("adeliAriza");
    var gl = canvas.getContext("webgl");

    // Vertices Positions
    var vertices = [

        // No. 5
        0.25, 0.6,
       -0.1,  0.6,
       -0.1,  0.4,
        0.25, 0.4,
        0.25, 0.1,
       -0.1,  0.1,

        // No. 9
        0.25,  0.25,
       -0.2,   0.25,
       -0.2,   0.5,
        0.25,  0.5,
        0.25,  0.1,
       -0.25,  0.1,

        // Let K.1
       -0.9, -0.9, -1.0,
        0.9, -1.0,  0.0,
       -0.9, -0.1, -0.6,
        1.0, -0.9,  0.0,
        0.2, -0.1,  0.0,
       -0.9, -0.8,  0.0,
       -0.7, -0.3,  0.55,

        // Let K.2
        0.0,  1.0,  0.0,
        0.0,  0.0,  0.0,
        0.0, -0.1, -0.1,
    
    ];

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // VERTEX SHADER
    var vertShaderCode = `
        attribute vec2 aPosition;
        void main () {
            gl_PointSize = 2.5;
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
    `;
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertShaderCode);
    gl.compileShader(vertexShader);

    // FRAGMENT SHADER
    var fragShaderCode = `
        void main() {
            gl_FragColor = vec4(0.0, 0.0, 1.5, 1.0);
        }
    `;
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragShaderCode);
    gl.compileShader(fragmentShader);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // Backround Color
    /* gl.clearColor(0.0, 0.0, 0.9, 1.0); */
    gl.clear(gl.COLOR_BUFFER_BIT);

    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    //Render shapes
    gl.drawArrays(gl.LINE_STRIP, 0, 6); // No. 5
    gl.drawArrays(gl.LINE_STRIP, 6, 6); // No. 9
    gl.drawArrays(gl.TRIANGLE_STRIP, 12, 6); // Let K.1
    gl.drawArrays(gl.TRIANGLES, 19, 3); // Let K.2

}

draw();
