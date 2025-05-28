// WebGL Tunnel Shader for Hero Background
class HeroShader {
    constructor(canvas) {
        this.canvas = canvas;
        this.gl = null;
        this.program = null;
        this.startTime = Date.now();
        this.animationId = null;
        
        this.vertexShaderSource = `
            attribute vec2 position;
            void main() {
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;
        
        this.fragmentShaderSource = `
            precision highp float;
            
            uniform vec2 iResolution;
            uniform float iTime;
            
            #define PI 3.141592653589793
            #define TAU 6.283185307179586
            
            // from iq / bookofshaders
            float cubicPulse( float c, float w, float x ){
                x = abs(x - c);
                if( x>w ) return 0.0;
                x /= w;
                return 1.0 - x*x*(3.0-2.0*x);
            }
            
            void main() {
                vec2 fragCoord = gl_FragCoord.xy;
                float time = iTime * 0.25;
                
                // Create tunnel coordinates (p) and remap to normal coordinates (uv)
                vec2 p = (-iResolution.xy + 2.0*fragCoord)/iResolution.y;
                vec2 uvOrig = p;
                
                // added twist
                float rotZ = 1. - 0.23 * sin(1. * cos(length(p * 1.5)));
                float cosR = cos(rotZ);
                float sinR = sin(rotZ);
                mat2 rot = mat2(cosR, sinR, -sinR, cosR);
                p = rot * p;
                
                // angle and modified distance
                float a = atan(p.y, p.x);
                float rSquare = pow( pow(p.x*p.x, 4.0) + pow(p.y*p.y, 4.0), 1.0/8.0 );
                float rRound = length(p);
                float r = mix(rSquare, rRound, 0.5 + 0.5 * sin(time * 2.));
                vec2 uv = vec2( 0.3/r + time, a/3.1415927 );
                
                // subdivide to grid
                uv += vec2(0., 0.25 * sin(time + uv.x * 1.2));
                uv /= vec2(1. + 0.0002 * length(uvOrig));
                vec2 uvDraw = fract(uv * 12.);
                
                // draw lines
                float col = cubicPulse(0.5, 0.06, uvDraw.x);
                col = max(col, cubicPulse(0.5, 0.06, uvDraw.y));
                
                // darker towards center, light towards outer
                col = col * r * 0.8;
                col += 0.15 * length(uvOrig);
                
                // Code 8 green theme color - darker for better readability
                col *= 0.3; // Make overall darker
                gl_FragColor = vec4(0., col * 0.6, col * 0.3, 1.);
            }
        `;
    }
    
    init() {
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
        
        if (!this.gl) {
            console.error('WebGL not supported');
            return false;
        }
        
        // Create shaders
        const vertexShader = this.createShader(this.gl.VERTEX_SHADER, this.vertexShaderSource);
        const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, this.fragmentShaderSource);
        
        if (!vertexShader || !fragmentShader) {
            return false;
        }
        
        // Create program
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);
        this.gl.linkProgram(this.program);
        
        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            console.error('Unable to initialize the shader program:', this.gl.getProgramInfoLog(this.program));
            return false;
        }
        
        // Create buffer
        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        const positions = new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
             1,  1,
        ]);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);
        
        // Set up attributes
        const positionLocation = this.gl.getAttribLocation(this.program, 'position');
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
        
        // Get uniform locations
        this.gl.useProgram(this.program);
        this.resolutionLocation = this.gl.getUniformLocation(this.program, 'iResolution');
        this.timeLocation = this.gl.getUniformLocation(this.program, 'iTime');
        
        return true;
    }
    
    createShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('An error occurred compiling the shaders:', this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }
        
        return shader;
    }
    
    resize() {
        const displayWidth = this.canvas.clientWidth;
        const displayHeight = this.canvas.clientHeight;
        
        if (this.canvas.width !== displayWidth || this.canvas.height !== displayHeight) {
            this.canvas.width = displayWidth;
            this.canvas.height = displayHeight;
            this.gl.viewport(0, 0, displayWidth, displayHeight);
        }
    }
    
    render() {
        if (!this.gl || !this.program) return;
        
        this.resize();
        
        const currentTime = (Date.now() - this.startTime) / 1000;
        
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        
        this.gl.useProgram(this.program);
        this.gl.uniform2f(this.resolutionLocation, this.canvas.width, this.canvas.height);
        this.gl.uniform1f(this.timeLocation, currentTime);
        
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }
    
    start() {
        const animate = () => {
            this.render();
            this.animationId = requestAnimationFrame(animate);
        };
        animate();
    }
    
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
}

// Initialize shader when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('hero-shader');
    if (canvas) {
        const shader = new HeroShader(canvas);
        if (shader.init()) {
            shader.start();
            
            // Clean up on page unload
            window.addEventListener('beforeunload', () => {
                shader.stop();
            });
        }
    }
});