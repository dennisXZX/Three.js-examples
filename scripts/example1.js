// wrap the code into an IIFE
const example = (function(){

    "use strict";

    // create a scene
    let scene = new THREE.Scene();

    // create a renderer, which specifies how content will be displayed one the page
    const renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();

    // create a light
    const light = new THREE.AmbientLight(0xffffff);

    let camera;
    let box;

    // initialize the scene
    function initScene() {

        // set the size of the scene
        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

        const element = document.getElementById("webgl-container");
        element.appendChild(renderer.domElement);

        // add the light to the scene
        scene.add(light);

        // define a camera which accepts four params
        // Field of Viev, aspect ratio, near plane, far plane
        camera = new THREE.PerspectiveCamera(
            35, // Field of Viev
            element.offsetWidth  / element.offsetHeight,  // aspect ratio
            1,  // near clipping plane
            1000  // far clipping plane
        );

        camera.position.z = 100;

        // add the camera
        scene.add(camera);

        // define a Mesh
        box = new THREE.Mesh(
            new THREE.BoxGeometry(20, 20, 20),
            new THREE.MeshBasicMaterial({ color: 'red' })
        );

        box.name = "box";

        // add the box to the scene
        scene.add(box);

        render();
    }

    /* helper function for rendering the scene on the page */
    // a recursive function that calls itself
    function render() {
        // rotate the box
        box.rotation.y += 0.01;

        // render the scene on the page
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };

    window.onload = initScene;

    // return the scene object for debugging purpose
    return {
        scene: scene
    }

})();
